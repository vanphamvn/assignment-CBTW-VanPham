import { test } from "../src/fixtures/baseTest";
import { getUserByIdData } from "../test-data/request/singleUser/userTestCaseData";
import loginRequests from "../test-data/request/login/loginRequests.json";

test.describe("Delete a new user", () => {
  let response;
  let authToken;
  let userId = getUserByIdData[0].userId

  test.beforeEach(async ({authHelper}) => {
    authToken = await authHelper.getAuthToken(loginRequests.loginSuccessfulMemberRequest);
  });

  test.afterEach(async ({apiClient}) => {
    await apiClient.teardown();
  });

  test('DELETE existing user successfully - Status code 204', async ({ userHelper, apiHelper }) => {

    userHelper.setAuthToken(authToken);

    await test.step("Delete user", async () => {
      response = await userHelper.deleteUser(userId);
    });

    await test.step("Verify response status code and body", async () => {
      apiHelper.verifyStatusCode(response, 204);
    });
  });

  test('DELETE existing user without authorization token - Status code 403', async ({ userHelper, apiHelper }) => {

    await test.step("Delete user", async () => {
      response = await userHelper.deleteUser(userId);
    });

    await test.step("Verify response status code and body", async () => {
      apiHelper.verifyStatusCode(response, 403);
    });
  });

  test('DELETE existing user with incorrect userId - Status code 204', async ({ userHelper, apiHelper }) => {

    userHelper.setAuthToken(authToken);

    await test.step("Delete user", async () => {
      response = await userHelper.deleteUser('invalidUserId');
    });

    await test.step("Verify response status code and body", async () => {
      apiHelper.verifyStatusCode(response, 400);
    });
  });
  
})