import { test } from "../../src/fixtures/baseTest";
import userResponse from "../../test-data/response/singleUser/userResponse.json";
import loginRequests from "../../test-data/request/login/loginRequests.json";
import createUserRequests from "../../test-data/request/singleUser/createUserRequests.json";
import createdUserResponse from "../../test-data/response/singleUser/createdUserResponse.json";
import updateUserRequests from "../../test-data/request/singleUser/updateUserRequests.json";

test.describe("Create a new user", () => {
  let response;
  let authToken;

  test.beforeEach(async ({authHelper}) => {
    authToken = await authHelper.getAuthToken(loginRequests.loginSuccessfulMemberRequest);
  });

  test.afterEach(async ({apiClient}) => {
    await apiClient.teardown();
  });

  test('ETE: Log in, create a user, delete the user, and confirm that the user can no longer be retrieved.', async ({authHelper, userHelper, apiHelper}) => {
    const payload = createUserRequests.createUserRequest;
    userHelper.setAuthToken(authToken);

    await test.step("Create new user", async () => {
      response = await userHelper.createUser(payload);
    });

    await test.step("Verify user is created", async () => {
      apiHelper.verifyStatusCode(response, 201);
      const ignoredKeys = ['id','createdAt'];
      apiHelper.verifyApiResponseIgnoreKey(response, createdUserResponse.createdUserSuccessfulResponse, ignoredKeys);
    });

    await test.step("Get user information", async () => {
      const userId = response.body.id;
      response = await userHelper.getUserById(userId);
      apiHelper.verifyStatusCode(response, 200);
      apiHelper.verifyApiResponse(response, userResponse.success);
    });

    await test.step("Delete user", async () => {
      const userId = response.body.id;
      response = await userHelper.deleteUser(userId);
      apiHelper.verifyStatusCode(response, 204);
    });

    await test.step("Verify user is deleted and cannot be found", async () => {
      const userId = response.body.id;
      response = await userHelper.getUserById(userId);
      apiHelper.verifyStatusCode(response, 404);
    });
  });


  test('ETE: Log in, create a user, retrieve the users details, update users information, and verify changes', async ({authHelper, userHelper, apiHelper}) => {
    const payload = createUserRequests.createUserRequest;
    let userId;
    userHelper.setAuthToken(authToken);

    await test.step("Create new user", async () => {
      response = await userHelper.createUser(payload);
      apiHelper.verifyStatusCode(response, 201);
      const ignoredKeys = ['id','createdAt'];
      apiHelper.verifyApiResponseIgnoreKey(response, createdUserResponse.createdUserSuccessfulResponse, ignoredKeys);
    });

    await test.step("Get user information", async () => {
      userId = response.body.id;
      response = await userHelper.getUserById(userId);
      apiHelper.verifyStatusCode(response, 200);
      apiHelper.verifyApiResponse(response, userResponse.success);
    });

    await test.step("Update user information", async () => {
      const payload = updateUserRequests.updateUserRequest;
      payload.job = 'qa';
      payload.name = 'vholt99';
      response = await userHelper.updateUser(userId, payload);
      apiHelper.verifyStatusCode(response, 200);
      const ignoredKeys = ['updatedAt'];
      apiHelper.verifyApiResponseIgnoreKey(response, payload, ignoredKeys);
    });

    await test.step("Verify updated user information", async () => {
      response = await userHelper.getUserById(userId);
      apiHelper.verifyStatusCode(response, 200);
      apiHelper.verifyApiResponse(response, userResponse.updated);
    });
  });
  
})