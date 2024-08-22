import { test } from "../src/fixtures/baseTest";
import loginResponses from "../test-data/response/login/loginResponses.json";
import loginRequests from "../test-data/request/login/loginRequests.json";
import { getConfig } from "../src/config/config";

test.describe("Login tests", () => {
  let response;

  test("POST Login successfully - Status code 200 @smoke", async ({authHelper, apiHelper}) => {
    const payload = loginRequests.loginSuccessfulRequest;

    await test.step("Login with correct payload", async () => {
      response = await authHelper.loginWithPayload(payload);
    });

    await test.step("Verify response status code and body", async () => {
      apiHelper.verifyStatusCode(response, 200);
      apiHelper.verifyApiResponse(response, loginResponses.loginSuccessfulResponse);
    });
  });

  test("POST Login unsuccessful due to missing password - Status code 400", async ({authHelper, apiHelper}) => {
    const payload = loginRequests.loginMissingPasswordRequest;

    await test.step("Login with incorrect payload", async () => {
      response = await authHelper.loginWithPayload(payload);
    });

    await test.step("Verify response status code and body", async () => {
      apiHelper.verifyStatusCode(response, 400);
      apiHelper.verifyApiResponse(response, loginResponses.loginMissingPasswordResponse);
    });
  });

  test("POST Login unsuccessful without credentials - Status code 400", async ({authHelper, apiHelper}) => {
    const payload = loginRequests.loginMissingUsernameRequest;

    await test.step("Login with incorrect payload", async () => {
      response = await authHelper.loginWithPayload(payload);
    });

    await test.step("Verify response status code and body", async () => {
      apiHelper.verifyStatusCode(response, 400);
      apiHelper.verifyApiResponse(response, loginResponses.loginMissingUsernameResponse);
    });
  });

  test("POST Login incorrect credentials - Status code 400", async ({authHelper, apiHelper}) => {
    const payload = loginRequests.loginUserNotFoundRequest;

    await test.step("Login with incorrect credentials", async () => {
      response = await authHelper.loginWithPayload(payload);
    });

    await test.step("Verify response status code and body", async () => {
      apiHelper.verifyStatusCode(response, 400);
      apiHelper.verifyApiResponse(response, loginResponses.loginUserNotFoundResponse);
    });
  });

  test.afterEach(async ({apiClient}) => {
    await apiClient.teardown();
  });
  
});
