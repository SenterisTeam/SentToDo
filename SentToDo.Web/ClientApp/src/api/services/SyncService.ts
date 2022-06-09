/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SyncData } from '../models/SyncData';
import type { ToDoHistoryEntry } from '../models/ToDoHistoryEntry';
import type { ToDoTask } from '../models/ToDoTask';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SyncService {

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static getApiSyncWs(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/sync/ws',
        });
    }

    /**
     * @param requestBody 
     * @returns SyncData Success
     * @throws ApiError
     */
    public static postApiSyncPostdata(
requestBody?: SyncData,
): CancelablePromise<SyncData> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/sync/postdata',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * @returns ToDoTask Success
     * @throws ApiError
     */
    public static getApiSyncGettasks(): CancelablePromise<Array<ToDoTask>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/sync/gettasks',
        });
    }

    /**
     * @param from 
     * @param to 
     * @returns ToDoHistoryEntry Success
     * @throws ApiError
     */
    public static getApiSyncGethistory(
from?: number,
to?: number,
): CancelablePromise<Array<ToDoHistoryEntry>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/sync/gethistory',
            query: {
                'from': from,
                'to': to,
            },
        });
    }

}