import { test } from "../src/fixtures/baseTest";
import { getUserByIdData } from "../test-data/request/singleUser/userTestCaseData";
import loginRequests from "../test-data/request/login/loginRequests.json";
import updateUserRequests from "../test-data/request/singleUser/updateUserRequests.json";
import updatedUserResponse from "../test-data/response/singleUser/updatedUserResponse.json";

test.describe("Update an existing user", () => {
  let response;
  let authToken;
  let userId = getUserByIdData[0].userId

  test.beforeEach(async ({authHelper, userHelper}) => {
    authToken = await authHelper.getAuthToken(loginRequests.loginSuccessfulMemberRequest);
    userHelper.setAuthToken(authToken);
  });

  test.afterEach(async ({apiClient}) => {
    await apiClient.teardown();
  });

  test('PUT update user successfully - Status code 200  @regression', async ({ userHelper, apiHelper }) => {
    const payload = updateUserRequests.updateUserRequest;

    await test.step("Update user", async () => {
      response = await userHelper.updateUser(userId, payload);
    });

    await test.step("Verify response status code and body", async () => {
      apiHelper.verifyStatusCode(response, 200);
      const ignoredKeys = ['updatedAt'];
      await apiHelper.verifyApiResponseIgnoreKey(response, updatedUserResponse.updatedUserSuccessfulResponse, ignoredKeys);
    });
  });

  test('PUT update new user with wrong format - Status code 400', async ({ userHelper, apiHelper }) => {
    const payload = updateUserRequests.updateUserWrongFormatRequest;

    await test.step("Update new user with wrong format body", async () => {
      response = await userHelper.updateUser(userId, payload);
    });

    await test.step("Verify response status code", async () => {
      apiHelper.verifyStatusCode(response, 400);
    });
  });

  test('PUT update new user with minimum body - Status code 200', async ({ userHelper, apiHelper }) => {
    const payload = updateUserRequests.updateUserMinimalRequest;

    await test.step("Update new user with minimum body", async () => {
      response = await userHelper.updateUser(userId, payload);
    });

    await test.step("Verify response status code and body", async () => {
      apiHelper.verifyStatusCode(response, 200);
      const ignoredKeys = ['updatedAt'];
      await apiHelper.verifyApiResponseIgnoreKey(response, updatedUserResponse.updatedUserMinimumResponse, ignoredKeys);
    });
  });
  
})