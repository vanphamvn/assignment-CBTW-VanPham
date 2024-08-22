import { test as base } from '@playwright/test';
import AuthHelper from '../helpers/authHelper';
import UserHelper from '../helpers/userHelper';
import ApiHelper from '../helpers/apiHelpers';
import ApiClient from '../utils/apiClient';

type TestFixtures = {
    apiClient: ApiClient;
    authHelper: AuthHelper;
    userHelper: UserHelper;
    apiHelper: ApiHelper;
};

export const test = base.extend<TestFixtures>({
    apiClient: async ({}, use) => {
        const client = new ApiClient();
        await client.createContext();
        console.log(`Environment URL:${client.baseURL}`);
        await use(client);
    },
    authHelper: async ({ apiClient }, use) => {
        const helper = new AuthHelper(apiClient);
        await use(helper);
    },
    userHelper: async ({ apiClient}, use) => {
        const helper = new UserHelper(apiClient);
        await use(helper);
    },
    apiHelper: async ({}, use) => {
        const helper = new ApiHelper();
        await use(helper);
    }
});
