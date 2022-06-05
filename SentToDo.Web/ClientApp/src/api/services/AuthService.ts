/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplicationUser } from '../models/ApplicationUser';
import type { JwtData } from '../models/JwtData';
import type { LoginModel } from '../models/LoginModel';
import type { RegisterModel } from '../models/RegisterModel';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * @param requestBody 
     * @returns JwtData Success
     * @throws ApiError
     */
    public static postApiAuthLogin(
requestBody?: LoginModel,
): CancelablePromise<JwtData> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/login',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * @param requestBody 
     * @returns Response Success
     * @throws ApiError
     */
    public static postApiAuthRegister(
requestBody?: RegisterModel,
): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/register',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * @param provider 
     * @returns any Success
     * @throws ApiError
     */
    public static getApiAuthOauth(
provider?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/oauth',
            query: {
                'provider': provider,
            },
        });
    }

    /**
     * @returns ApplicationUser Success
     * @throws ApiError
     */
    public static getApiAuthMe(): CancelablePromise<ApplicationUser> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/me',
        });
    }

}