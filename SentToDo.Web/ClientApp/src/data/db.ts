import Dexie, { Table } from 'dexie';
import {ToDoTask} from "../api";

export class ApplicationDb extends Dexie {
    tasks!: Table<ToDoTask>;

    constructor() {
        super('database');
        this.version(1).stores({
            tasks: '&timestamp, name, completed'
        });
    }
}

export const db = new ApplicationDb();