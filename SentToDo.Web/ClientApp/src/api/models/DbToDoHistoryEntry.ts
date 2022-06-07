/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationUser } from './ApplicationUser';
import type { HistoryAction } from './HistoryAction';
import type { ToDoTask } from './ToDoTask';

export type DbToDoHistoryEntry = {
    user?: ApplicationUser;
    id?: number;
    timestamp?: number;
    oldValue?: ToDoTask;
    newValue?: ToDoTask;
    action?: HistoryAction;
};