/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DataPackage } from '../models/DataPackage';
import type { SyncData } from '../models/SyncData';

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
     * @returns DataPackage Success
     * @throws ApiError
     */
    public static getApiSyncGetcurrentdata(): CancelablePromise<DataPackage> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/sync/getcurrentdata',
        });
    }

}