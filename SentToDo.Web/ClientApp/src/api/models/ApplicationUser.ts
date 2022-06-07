/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DbToDoHistoryEntry } from './DbToDoHistoryEntry';
import type { DbToDoTask } from './DbToDoTask';

export type ApplicationUser = {
    toDoTasks?: Array<DbToDoTask> | null;
    toDoHistory?: Array<DbToDoHistoryEntry> | null;
    id?: string | null;
    userName?: string | null;
    normalizedUserName?: string | null;
    email?: string | null;
    normalizedEmail?: string | null;
    emailConfirmed?: boolean;
    passwordHash?: string | null;
    securityStamp?: string | null;
    concurrencyStamp?: string | null;
    phoneNumber?: string | null;
    phoneNumberConfirmed?: boolean;
    twoFactorEnabled?: boolean;
    lockoutEnd?: string | null;
    lockoutEnabled?: boolean;
    accessFailedCount?: number;
};