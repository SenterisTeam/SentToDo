import {createContext, useCallback, useContext, useEffect, useRef, useState} from "react";
import {HistoryAction, ToDoHistoryEntry, ToDoTask} from "../api";
import {db} from "../data/db";

const c = new BroadcastChannel('update_channel');

export interface Storage {
    tasks: ToDoTask[],
    savingState: SavingState,
    addTask: (t: ToDoTask) => void
    editTask: (t: ToDoTask) => void
    removeTask: (t: ToDoTask) => void
}

export enum SavingState {
    AWAITING_SAVE,
    SAVING,
    SAVED,
    ERROR
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

    const onMessage = (ev: MessageEvent) => {
        if (ev.data.type == "DB_UPDATED" && ev.source != window) db.tasks.toArray().then((t) => setTasks(t))
    };

    useEffect(() => {
        c.addEventListener("message", onMessage)
        return () => c.removeEventListener("message", onMessage)
    }, [])
    
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
            pendingHistory.current = []
            setSavingState(SavingState.SAVED)
        }, 5000)
    }
    useEffect(() => {
        db.tasks.toArray().then((t) => setTasks(t))
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
        
        db.tasks.add(t).then(postUpdate)
        setTasks(tasks.concat(t))
        
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
        
        db.tasks.put(t).then(postUpdate)
        setTasks(tasks.map(v => v.timestamp == t.timestamp ? t : v))
        
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
            
            db.tasks.delete(t.timestamp).then(postUpdate)
            setTasks(tasks.filter(v => v.timestamp !== t.timestamp))
            
            startAwaiting()
        }
    }
    
    const storage: Storage = {tasks: tasks || [], addTask, editTask, removeTask, savingState}
    return <StorageContext.Provider
        value={storage}>{typeof props.children == "function" ? props.children(storage) : props.children}</StorageContext.Provider>
}

export default StorageProvider;