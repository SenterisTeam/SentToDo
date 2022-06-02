/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HistoryAction } from './HistoryAction';
import type { ToDoTask } from './ToDoTask';

export type ToDoHistoryEntry = {
    id?: number;
    timestamp?: number;
    oldValue?: ToDoTask;
    newValue?: ToDoTask;
    action?: HistoryAction;
};