import {HistoryAction, ToDoHistoryEntry, ToDoTask} from "../api";
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
    console.log(tasks)
    h.forEach(e => {
        switch (e.action) {
            case HistoryAction.ADDED:
                if (e.newValue) {
                    const t = e.newValue
                    if (tasks.find(t => t.timestamp == e.newValue?.timestamp)) setTasks(tasks.map(v => v.timestamp == t.timestamp ? t : v))
                    else setTasks(tasks.concat(t))
                }
                break;
            case HistoryAction.MODIFIED:
                if (e.newValue) {
                    const t = e.newValue
                    setTasks(tasks.map(v => v.timestamp == t.timestamp ? t : v))
                }
                break;
            case HistoryAction.DELETED:
                if (e.oldValue && e.oldValue.timestamp) {
                    const t = e.oldValue
                    setTasks(tasks.filter(v => v.timestamp !== t.timestamp))
                }
                break;
        }
    })
}

export const applyHistoryToServer = () => {
    // ToDo: Implement
}