import Api from "./api";

export class GameApi extends Api {
  static get api_url() {
    return Api.api_url + "/game";
  }

  static async recordEvent(data: { type: "WIN" | "LOSS"; level: number }) {
    return this.request(`${this.api_url}/event`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
