import {HistoryAction, ObjectType, SyncData, ToDoHistoryEntry, ToDoTask} from "../api";
import {db} from "./db";

const c = new BroadcastChannel('update_channel');

export const applyHistroyToDb = (h: ToDoHistoryEntry[]) => {
    h.forEach(e => {
        switch (e.action) {
            case HistoryAction.ADDED:
                if (e.newValue) db.tasks.put(e.newValue)
                break;
            case HistoryAction.MODIFIED:
                if (e.newValue) db.tasks.put(e.newValue)
                break;
            case HistoryAction.DELETED:
                if (e.oldValue && e.oldValue.timestamp) db.tasks.delete(e.oldValue.timestamp)
                break;
        }
    })
}

export const applyHistoryToOtherTabs = (h: ToDoHistoryEntry[]) => {
    c.postMessage({type: "HISTORY", history: h})
}

export const applyHistoryToState = (h: ToDoHistoryEntry[], [tasks, setTasks]: [ToDoTask[], React.Dispatch<React.SetStateAction<ToDoTask[]>>]) => {
    console.log(tasks, h)
    h.forEach(e => {
        switch (e.action) {
            case HistoryAction.ADDED:
                if (e.newValue) {
                    const task = e.newValue
                    if (tasks.find(t => t.timestamp == e.newValue?.timestamp)) tasks = tasks.map(v => v.timestamp == task.timestamp ? task : v)
                    else tasks = tasks.concat(task)
                    
                }
                break;
            case HistoryAction.MODIFIED:
                if (e.newValue) {
                    const t = e.newValue
                    tasks = tasks.map(v => v.timestamp == t.timestamp ? t : v)
                }
                break;
            case HistoryAction.DELETED:
                if (e.oldValue && e.oldValue.timestamp) {
                    const t = e.oldValue
                    tasks = tasks.filter(v => v.timestamp !== t.timestamp)
                }
                break;
        }
    })
    
    setTasks(tasks)
}

export const applyHistoryToServer = (h: ToDoHistoryEntry[], socket: WebSocket, setLastSync: React.Dispatch<number>) => {
    if(socket.readyState == WebSocket.OPEN) {
        setLastSync(Date.now())
        h.forEach((e) => {
            const data: SyncData = {
                objectType: ObjectType.TO_DO_HISTORY_ENTRY,
                syncObject: e
            }
            socket.send(JSON.stringify(data))
        })
    }
}