import Api from "./api";

export class UserApi extends Api {
  static get api_url() {
    return Api.api_url + "/users";
  }
  // Get user profile
  static async getUser() {
    return this.request(`${Api.api_url}/auth/me`, {
      method: "GET",
    });
  }

  // Update user profile
  static async updateProfile(data: any) {
    return this.request(`${this.api_url}/update`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }
}
