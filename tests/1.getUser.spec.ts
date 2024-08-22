import { test } from "../src/fixtures/baseTest";
import userResponse from "../test-data/response/singleUser/userResponse.json";
import { getUserByIdData } from "../test-data/request/singleUser/userTestCaseData";
import loginRequests from "../test-data/request/login/loginRequests.json";

test.describe("Get a single user", () => {
  let response;
  let authToken;

  test.beforeEach(async ({authHelper, userHelper}) => {
    authToken = await authHelper.getAuthToken(loginRequests.loginSuccessfulMemberRequest);
    userHelper.setAuthToken(authToken);
  });

  test.afterEach(async ({apiClient}) => {
    await apiClient.teardown();
  });

  getUserByIdData.forEach(({ userId, expected }) => {
    test(`GET user with ID ${userId} - Status code ${expected}`, async ({ userHelper, apiHelper }) => {
      await test.step("Get user information", async () => {
        response = await userHelper.getUserById(userId);
      });

      await test.step("Validate user information", async () => {
        apiHelper.verifyStatusCode(response, expected);
        if (expected === 200) {
          apiHelper.verifyApiResponse(response, userResponse.success);
        } else if (expected === 404) {
          apiHelper.verifyApiResponse(response, userResponse.notFound);
        }
      });
    });
  });
});