import Api from "./api";

export class AiApi extends Api {
  static get api_url() {
    return Api.api_url + "/ai";
  }

  // Get user profile
  static async reframe(data: { thought: string }) {
    return this.request(`${this.api_url}/reframe`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

export interface ReframeResponse {
  success: boolean;
  data: {
    originalThought: string;
    reframedThought: string;
    reasoning: string;
  };
}
