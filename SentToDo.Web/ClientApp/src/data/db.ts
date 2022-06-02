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
    }
}

export const db = new ApplicationDb();