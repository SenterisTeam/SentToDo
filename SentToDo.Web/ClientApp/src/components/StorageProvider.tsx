import {createContext, useCallback, useContext, useEffect, useRef, useState} from "react";
import {
    CancelablePromise,
    HistoryAction,
    ObjectType,
    OpenAPI,
    SyncData,
    SyncService,
    ToDoHistoryEntry,
    ToDoTask
} from "../api";
import {
    addHistoryToDb, addHistoryToState,
    applyHistoryToOtherTabs,
    applyHistoryToServer,
    applyHistoryToState,
    applyHistroyToDb
} from "../data/applyHistory";
import {db} from "../data/db";
import { useAuth } from "./AuthProvider";
import useDidMountEffect from "./useDidMountEffect";

const c = new BroadcastChannel('update_channel');

export interface Storage {
    tasks: ToDoTask[],
    savingState: SavingState,
    addTask: (t: ToDoTask) => void
    editTask: (t: ToDoTask) => void
    removeTask: (t: ToDoTask) => void
    dataLoaded: boolean
}

export enum SavingState {
    AWAITING_SAVE,
    SAVING,
    SAVED,
    ERROR
}

export enum ConnectinState {
    CONNECTED,
    CONNECTING,
    DISCONNECTED,
    START_CONNECTING
}

const StorageContext = createContext<Storage | undefined>(undefined);
export {StorageContext};

function useStorage() {
    const storage = useContext(StorageContext)
    if (!storage) throw Error()
    return storage;
}

export {useStorage}

function postUpdate() {
    c.postMessage({type: "DB_UPDATED"})
}

function StorageProvider(props: { children: React.ReactNode | ((s: Storage) => React.ReactNode) }) {
    const [tasks, setTasks] = useState<ToDoTask[]>([])
    const [savingState, setSavingState] = useState<SavingState>(SavingState.SAVED)
    const savingTimeout = useRef<number | undefined>(undefined)
    const [history, setHistory] = useState<ToDoHistoryEntry[]>([])
    const pendingHistory = useRef<ToDoHistoryEntry[]>([])
    
    const auth = useAuth()
    const [socket, setSocket] = useState<WebSocket>();
    const [connectionState, setConnectionState] = useState<ConnectinState>(ConnectinState.DISCONNECTED)
    const reconnectTimeout = useRef<number | undefined>(undefined)
    const [lastSync, setLastSync] = useState<number>(localStorage.getItem('lastSync') ? parseInt(localStorage.getItem('lastSync') as string) : 0)
    const [loading, setLoading] = useState<boolean>(true)
    const [loaded, setLoaded] = useState<boolean>(false)
    const loadDataRequest = useRef<CancelablePromise<any> | undefined>(undefined)

    const onMessage = (ev: MessageEvent) => {
        console.log("Message received", ev.data)
        if (ev.data.type == "HISTORY" && ev.source != window) applyHistoryToState(ev.data.history, [tasks, setTasks])
    };

    useEffect(() => {
        c.addEventListener("message", onMessage)
        return () => c.removeEventListener("message", onMessage)
    }, [tasks])
    
    const onBeforeUnload = (ev: BeforeUnloadEvent) => {
        if (savingState != SavingState.AWAITING_SAVE) return;
        ev.preventDefault();
        ev.returnValue = "";
        return "";
        
        //navigator.sendBeacon("/api/Test", JSON.stringify(pendingHistory.current))
    }
    
    useEffect(() => {
        window.addEventListener("beforeunload", onBeforeUnload)
        return () => window.removeEventListener("beforeunload", onBeforeUnload)
    }, [savingState])
    
    const startAwaiting = () => {
        setSavingState(SavingState.AWAITING_SAVE)
        if (savingTimeout.current) clearTimeout(savingTimeout.current)
        savingTimeout.current = setTimeout(() => {
            setSavingState(SavingState.SAVING)
            setHistory(history.concat(pendingHistory.current))
            db.history.bulkPut(pendingHistory.current)
            
            applyHistroyToDb(pendingHistory.current)
            applyHistoryToOtherTabs(pendingHistory.current)
            if (socket) applyHistoryToServer(pendingHistory.current, socket, setLastSync)
            
            pendingHistory.current = []
            setSavingState(SavingState.SAVED)
        }, 1000)
    }
    useEffect(() => {
        Promise.all([
            db.tasks.toArray().then((t) => setTasks(t)),
            db.history.toArray().then((h) => setHistory(h))
        ]).then(() => setLoading(false))
    }, [])

    const addTask = (t: ToDoTask) => {
        if (!t.timestamp) t.timestamp = Date.now()

        const historyEntry: ToDoHistoryEntry = {
            timestamp: Date.now(),
            action: HistoryAction.ADDED,
            oldValue: undefined,
            newValue: t
        }
        pendingHistory.current.push(historyEntry)
        
        applyHistoryToOtherTabs([historyEntry])
        applyHistoryToState([historyEntry], [tasks, setTasks])
        
        startAwaiting()
    }

    const editTask = (t: ToDoTask) => {
        const oldHistoryEntry = pendingHistory.current.find(v => v.oldValue?.timestamp == t.timestamp)
        const historyEntry: ToDoHistoryEntry = {
            timestamp: Date.now(),
            action: HistoryAction.MODIFIED,
            oldValue: oldHistoryEntry ? oldHistoryEntry.oldValue : tasks.find(v => v.timestamp == t.timestamp),
            newValue: t
        }
        pendingHistory.current = (oldHistoryEntry ? pendingHistory.current.map(v => v.oldValue?.timestamp == t.timestamp ? historyEntry : v) : pendingHistory.current.concat(historyEntry))

        applyHistoryToOtherTabs([historyEntry])
        applyHistoryToState([historyEntry], [tasks, setTasks])
        
        startAwaiting()
    }

    const removeTask = (t: ToDoTask) => {
        if (t.timestamp) {
            const historyEntry: ToDoHistoryEntry = {
                timestamp: Date.now(),
                action: HistoryAction.DELETED,
                oldValue: t,
                newValue: undefined
            }
            pendingHistory.current.push(historyEntry)

            applyHistoryToOtherTabs([historyEntry])
            applyHistoryToState([historyEntry], [tasks, setTasks])
            
            startAwaiting()
        }
    }
    
    useEffect(() => {
        localStorage.setItem('lastSync', lastSync.toString())
    }, [lastSync])
    
    useEffect(() => {
        if (lastSync == 0 && auth.isAuthenticated && !auth.userLoading && !loading && !loaded) {
            console.log("Loading from server", lastSync)
            setLoading(true)
            const sync = Date.now()
            
            console.log(OpenAPI.TOKEN)
            SyncService.getApiSyncGettasks().then(data => {
                if(data) {
                    const history = data.map(t => ({
                        timestamp: Date.now(),
                        action: HistoryAction.ADDED,
                        oldValue: undefined,
                        newValue: t
                    }))
                    
                    applyHistoryToState(history, [tasks, setTasks])
                    applyHistroyToDb(history)
                    applyHistoryToOtherTabs(history)

                    setLoaded(true)
                    setLastSync(sync)
                }
            }).finally(() => setLoading(false))
        }
        
        console.log("Loading", lastSync != 0 , auth.isAuthenticated , !auth.userLoading , !loading , !loaded)
        
        if (lastSync != 0 && auth.isAuthenticated && !auth.userLoading && !loading && !loaded) {
            console.log(OpenAPI.TOKEN)
            setLoading(true)
            const sync = Date.now()

            loadDataRequest.current = SyncService.getApiSyncGethistory(lastSync)

            loadDataRequest.current.then(data => {
                const allHistory = addHistoryToState(data, [tasks, setTasks])
                addHistoryToDb(data)

                applyHistoryToState(data, [tasks, setTasks], allHistory)
                applyHistroyToDb(data, allHistory)

                setLastSync(sync)
                setLoaded(true)
                setLoading(false)
            }).catch(() => {
                console.log("Error loading history", loading)
                setLoading(false)
            })
        }
        
        if (!auth.isAuthenticated && !auth.userLoading) {
            console.log("Logging out")
            setLastSync(0);
        }
    }, [lastSync, auth.isAuthenticated, auth.userLoading, tasks, history, loading, loaded])
    
    useEffect(() => {
        if (auth.isAuthenticated && connectionState == ConnectinState.START_CONNECTING) {
            const url = new URL(window.location.href)
            console.log(window.location.href)
            url.protocol = url.protocol === "http:" ? "ws:" : "wss:"
            url.pathname = "/api/sync/ws"
            
            setSocket(new WebSocket(url, ["client", `Bearer-${auth.token}`]))
            setConnectionState(ConnectinState.CONNECTING)
        } else {
            if (connectionState == ConnectinState.DISCONNECTED || !auth.isAuthenticated) {
                socket?.close()
                setSocket(undefined)
                setConnectionState(ConnectinState.DISCONNECTED)
            }
        }
    }, [auth.isAuthenticated, connectionState])
    
    useEffect(() => {
        if (auth.isAuthenticated && connectionState == ConnectinState.DISCONNECTED && !reconnectTimeout.current) {
            setTimeout(() => {setConnectionState(ConnectinState.START_CONNECTING)}, 1000)
        } else {
            if (!auth.isAuthenticated || connectionState != ConnectinState.DISCONNECTED && reconnectTimeout.current) clearTimeout(reconnectTimeout.current)
        }
        
        return () => {if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current)}
    }, [auth.isAuthenticated, connectionState])
    
    useEffect(() => {
        if (socket) {
            socket.onopen = () => {
                setConnectionState(ConnectinState.CONNECTED)
                console.log("Connected to server")
                
                setLoaded(false)
                applyHistoryToServer(history.filter(h => !h.id), socket, setLastSync)
            }

            socket.onmessage = (e) => {
                loadDataRequest.current?.cancel()
                var syncData = JSON.parse(e.data) as SyncData
                console.log(syncData)
                if (syncData.objectType && syncData.syncObject) {
                    setLastSync(Date.now())
                    switch (syncData.objectType) {
                        case ObjectType.TO_DO_HISTORY_ENTRY:
                            const newHistoryEntry = syncData.syncObject as ToDoHistoryEntry
                            
                            addHistoryToState([newHistoryEntry], [history, setHistory])
                            
                            addHistoryToDb([newHistoryEntry])
                            
                            applyHistoryToState([newHistoryEntry], [tasks, setTasks], history)
                            applyHistroyToDb([newHistoryEntry], history)
                            
                            break;
                        case ObjectType.TO_DO_HISTORY_ENTRYES:
                            const newHistory = syncData.syncObject as ToDoHistoryEntry[]

                            addHistoryToState(newHistory, [history, setHistory])

                            addHistoryToDb(newHistory)

                            applyHistoryToState(newHistory, [tasks, setTasks], history)
                            applyHistroyToDb(newHistory, history)

                            break;
                    }
                }
            }

            socket.onclose = (e) => {
                console.log(e)
                setConnectionState(ConnectinState.DISCONNECTED)
            }
        }
    }, [socket, history])
    
    const storage: Storage = {tasks: tasks || [], addTask, editTask, removeTask, savingState, dataLoaded: loaded}
    return <StorageContext.Provider
        value={storage}>{typeof props.children == "function" ? props.children(storage) : props.children}</StorageContext.Provider>
}

export default StorageProvider;