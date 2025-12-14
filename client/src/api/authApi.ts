import Api from "./api";

interface User {
  email: string;
  password: string;
  fullName?: string;
}

export class AuthApi extends Api {
  static api_url = Api.api_url + "/auth";

  static async register(user: User) {
    // Api.request() already returns parsed JSON data, not a Response object
    const data = await this.request(`${this.api_url}/register`, {
      method: "POST",
      body: JSON.stringify(user),
    });
    return data;
  }

  static async login(user: User) {
    // Api.request() already returns parsed JSON data, not a Response object
    const data = await this.request(`${this.api_url}/login`, {
      method: "POST",
      body: JSON.stringify(user),
    });
    return data;
  }
}
