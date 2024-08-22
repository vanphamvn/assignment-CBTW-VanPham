import ApiClient from "../utils/apiClient";
import ApiHelper from "./apiHelpers";


class AuthHelper extends ApiHelper {

  readonly loginUrl = "/api/login";
  apiClient = new ApiClient();

  constructor(apiClient: ApiClient) {
    super();
    this.apiClient = apiClient;
  }

  async getAuthToken(credentials: any): Promise<string> {
    await this.apiClient.createContext();

    // Make the POST request to login
    const response = await this.apiClient.post(this.loginUrl, credentials);

    // Check if the response is successful
    if (response.ok()) {
      const responseBody = await response.json();
      return responseBody.token; // Extract and return the token
    } else {
      throw new Error("Failed to authenticate");
    }
  }

  async loginWithPayload(payload) {
    await this.apiClient.createContext();
    return await this.apiClient.post(this.loginUrl, payload);
  }

}

export default AuthHelper;