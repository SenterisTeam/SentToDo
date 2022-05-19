import {useLiveQuery} from "dexie-react-hooks";
import {createContext, useContext} from "react";
import {ToDoTask} from "../api";
import {db} from "../data/db";

export interface Storage {
    tasks: ToDoTask[],
    addTask: (t: ToDoTask) => void
    editTask: (t: ToDoTask) => void
    removeTask: (t: ToDoTask) => void
}

const StorageContext = createContext<Storage | undefined>(undefined);
export {StorageContext};

function useStorage() {
    const storage = useContext(StorageContext)
    if (!storage) throw Error()
    return storage;
}

export {useStorage}

function StorageProvider(props: { children: React.ReactNode }) {
    const tasks = useLiveQuery(
        () => db.tasks.toArray()
    );

    const addTask = (t: ToDoTask) => {
        if (!t.timestamp) t.timestamp = Date.now()
        db.tasks.add(t)
    }

    const editTask = (t: ToDoTask) => {
        db.tasks.put(t)
    }

    const removeTask = (t: ToDoTask) => {
        if (t.timestamp) db.tasks.delete(t.timestamp)
    }

    return <StorageContext.Provider value={{tasks: tasks || [], addTask, editTask, removeTask}}>{props.children}</StorageContext.Provider>
}

export default StorageProvider;