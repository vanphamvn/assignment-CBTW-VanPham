import { APIRequestContext, request } from '@playwright/test';
import { getConfig } from '../config/config';

class ApiClient {
    baseURL: string;
    apiContext: APIRequestContext | null;

    constructor() {
        this.baseURL = getConfig().baseURL;
        this.apiContext = null;
    }

    // Initialize the API context
    async createContext(extraHeaders = {}) {
        this.apiContext = await request.newContext({
            baseURL: this.baseURL,
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
                ...extraHeaders,
            },
        });
    }

    async teardown() {
        if (this.apiContext) {
            await this.apiContext.dispose();
        }
        this.apiContext = null;
    }

    // Perform a GET request
    async get(endpoint: string, params = {}, headers = {}) {
        if (!this.apiContext) {
            throw new Error('API context has not been created. Call createContext() first.');
        }
        const url = new URL(endpoint, this.baseURL);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        const response = await this.apiContext.get(url.toString(), { headers });
        return response;
    }

    // Perform a POST request
    async post(endpoint: string, data = {}, headers = {}) {
        if (!this.apiContext) {
            throw new Error('API context has not been created. Call createContext() first.');
        }
        
        const response = await this.apiContext.post(endpoint, {
            data: data,
            headers: headers,
        });
        return response;
    }

    // Perform a PUT request
    async put(endpoint: string, data = {}, headers = {}) {
        if (!this.apiContext) {
            throw new Error('API context has not been created. Call createContext() first.');
        }
        const response = await this.apiContext.put(endpoint, {
            data: data,
            headers: headers,
        });
        return response;
    }

    // Perform a DELETE request
    async delete(endpoint: string, headers = {}) {
        if (!this.apiContext) {
            throw new Error('API context has not been created. Call createContext() first.');
        }
        const response = await this.apiContext.delete(endpoint, { headers: headers });
        return response;
    }
}

export default ApiClient;
