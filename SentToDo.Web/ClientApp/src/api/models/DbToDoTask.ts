/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationUser } from './ApplicationUser';

export type DbToDoTask = {
    id?: number;
    user?: ApplicationUser;
    timestamp?: number;
    name?: string | null;
    completed?: boolean;
};