import Api from "./api";

export class CheckInApi extends Api {
  static get api_url() {
    return Api.api_url + "/check-in";
  }

  // Get user profile
  static async createCheckIn(data: any) {
    return this.request(`${this.api_url}/create`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
