import Dexie, { Table } from 'dexie';
import {ToDoHistoryEntry, ToDoTask} from "../api";

export class ApplicationDb extends Dexie {
    tasks!: Table<ToDoTask>;
    history!: Table<ToDoHistoryEntry>;

    constructor() {
        super('database');
        this.version(1).stores({
            tasks: '&timestamp, name, completed'
        });
        this.version(2).stores({
            history: '&timestamp, action, id'
        });
        this.version(3).stores({
            tasks: '&timestamp, name, completed, priority'
        }).upgrade((t) => {
            t.table("tasks").toCollection().modify((t: ToDoTask) => {
                t.priority = 0;
            })
        })
    }
}

export const db = new ApplicationDb();