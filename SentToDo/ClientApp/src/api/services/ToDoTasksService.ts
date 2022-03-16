/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ToDoTask } from '../models/ToDoTask';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ToDoTasksService {

    /**
     * @returns ToDoTask Success
     * @throws ApiError
     */
    public static get(): CancelablePromise<Array<ToDoTask>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ToDoTasks',
        });
    }

    /**
     * @param requestBody 
     * @returns ToDoTask Success
     * @throws ApiError
     */
    public static post(
requestBody?: ToDoTask,
): CancelablePromise<ToDoTask> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ToDoTasks',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns ToDoTask Success
     * @throws ApiError
     */
    public static get1(
id: number,
): CancelablePromise<ToDoTask> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ToDoTasks/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static put(
id: number,
requestBody?: ToDoTask,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/ToDoTasks/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public static delete(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/ToDoTasks/{id}',
            path: {
                'id': id,
            },
        });
    }

}