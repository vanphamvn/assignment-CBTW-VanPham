import ApiHelper from "./apiHelpers";
import ApiClient from "../utils/apiClient";

class UserHelper extends ApiHelper {
  apiClient = new ApiClient();
  userUrl = "/api/users";

  constructor(apiClient: ApiClient) {
    super();
    this.apiClient = apiClient;
  }

  async getUserById(userId: any) {
    await this.apiClient.createContext();
    const response = await this.apiClient.get(`${this.userUrl}/${userId}`, {}, {
        Authorization: `Bearer ${this.authToken}`,
    });

    return response;
  }

  async getListOfUsers(page: number = 1) {
    await this.apiClient.createContext();
    const response = await this.apiClient.get(this.userUrl, {
      headers: {
        Authorization: `Bearer ${this.authToken}`,
      },
      params: {
        page: page.toString(),
      },
    });

    return response;
  }

  async createUser(payload: any) {
    await this.apiClient.createContext();
    const response = await this.apiClient.post(this.userUrl, payload, {
      Authorization: `Bearer ${this.authToken}`,
      "Content-Type": "application/json",
    });

    return response;
  }

  async updateUser(userId: any, payload: any) {
    await this.apiClient.createContext();
    const response = await this.apiClient.put(
      `${this.userUrl}/${userId}`,
      payload,
      {
        Authorization: `Bearer ${this.authToken}`,
        "Content-Type": "application/json",
      }
    );

    return response;
  }

  async deleteUser(userId: any) {
    await this.apiClient.createContext();
    const response = await this.apiClient.delete(`${this.userUrl}/${userId}`, {
      Authorization: `Bearer ${this.authToken}`,
      "Content-Type": "application/json",
    });

    return response;
  }
}

export default UserHelper;
