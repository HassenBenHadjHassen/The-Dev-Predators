import Api from "./api";

export class DailyLogApi extends Api {
  static get api_url() {
    return Api.api_url + "/daily-log";
  }

  static async createLog(content: string) {
    return this.request(`${this.api_url}/create`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  }

  static async getLogs() {
    return this.request(`${this.api_url}/`, {
      method: "GET",
    });
  }
}
