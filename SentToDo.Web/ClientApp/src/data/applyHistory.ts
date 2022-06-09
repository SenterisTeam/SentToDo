import {HistoryAction, ObjectType, SyncData, ToDoHistoryEntry, ToDoTask} from "../api";
import {db} from "./db";
import React from "react";

const c = new BroadcastChannel('update_channel');

export const reviewHistory = (newHistory: ToDoHistoryEntry[], allHistory: ToDoHistoryEntry[]) => {
    if (allHistory.length > 0 && newHistory.length > 0) {
        console.log(newHistory, allHistory)
        const lastTimestamp = newHistory.sort((a, b) => a.timestamp! - b.timestamp!)[0].timestamp
        allHistory.push(...newHistory)
        allHistory = allHistory.sort((a, b) => b.timestamp! - a.timestamp!)
        newHistory = allHistory.filter(e => e.timestamp! >= lastTimestamp!).filter(function(item, pos, ary) {
            return !pos || item != ary[pos - 1];
        });
    }
    return newHistory
}

export const applyHistroyToDb = (h: ToDoHistoryEntry[], allHistory: ToDoHistoryEntry[] = []) => {
    h = reviewHistory(h, allHistory)
    
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

export const applyHistoryToState = (h: ToDoHistoryEntry[], [tasks, setTasks]: [ToDoTask[], React.Dispatch<React.SetStateAction<ToDoTask[]>>], allHistory: ToDoHistoryEntry[] = []) => {
    console.log(h)
    h = reviewHistory(h, allHistory)
    console.log(h)
    
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
    if (socket.readyState == WebSocket.OPEN) {
        //setLastSync(Date.now())
        h.forEach((e) => {
            const data: SyncData = {
                objectType: ObjectType.TO_DO_HISTORY_ENTRY,
                syncObject: e
            }
            socket.send(JSON.stringify(data))
        })
    }
}

export const addHistoryToState = (h: ToDoHistoryEntry[], [history, setHistory]: [ToDoHistoryEntry[], React.Dispatch<ToDoHistoryEntry[]>]) => {
    h.forEach(newHistory => {
        if (history.find(h => h.timestamp == newHistory)) history = history.map(h => h.timestamp == newHistory.timestamp ? newHistory : h)
        else history = history.concat(newHistory)
    })

    setHistory(history)
    return history
}

export const addHistoryToDb = (h: ToDoHistoryEntry[]) => {
    h.forEach(newHistory => {
        db.history.put(newHistory)
    })
}