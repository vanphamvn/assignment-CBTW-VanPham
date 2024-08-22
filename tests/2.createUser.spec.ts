import { test } from "../src/fixtures/baseTest";
import loginRequests from "../test-data/request/login/loginRequests.json";
import createUserRequests from "../test-data/request/singleUser/createUserRequests.json";
import createdUserResponse from "../test-data/response/singleUser/createdUserResponse.json";

test.describe("Create a new user", () => {
  let response;
  let authToken;

  test.beforeEach(async ({authHelper, userHelper}) => {
    authToken = await authHelper.getAuthToken(loginRequests.loginSuccessfulMemberRequest);
    userHelper.setAuthToken(authToken);
  });

  test.afterEach(async ({apiClient}) => {
    await apiClient.teardown();
  });

  test('POST create new user successfully - Status code 201 @smoke @regression', async ({ userHelper, apiHelper }) => {
    const payload = createUserRequests.createUserRequest;

    await test.step("Create new user", async () => {
      response = await userHelper.createUser(payload);
    });

    await test.step("Verify response status code and body", async () => {
      apiHelper.verifyStatusCode(response, 201);
      const ignoredKeys = ['id','createdAt'];
      apiHelper.verifyApiResponseIgnoreKey(response, createdUserResponse.createdUserSuccessfulResponse, ignoredKeys);
    });
  });

  test('POST create new user with wrong format - Status code 400', async ({ userHelper, apiHelper }) => {
    const payload = createUserRequests.createUserWrongFormatRequest;

    await test.step("Create new user with wrong format body", async () => {
      response = await userHelper.createUser(payload);
    });

    await test.step("Verify response status code", async () => {
      apiHelper.verifyStatusCode(response, 400);
    });
  });

  test('POST create new user with empty body - Status code 400', async ({ userHelper, apiHelper }) => {
    const payload = createUserRequests.createUserMinimalRequest;

    await test.step("Create new user with minimum body", async () => {
      response = await userHelper.createUser(payload);
    });

    await test.step("Verify response status code and body", async () => {
      apiHelper.verifyStatusCode(response, 400);
    });
  });
  
})