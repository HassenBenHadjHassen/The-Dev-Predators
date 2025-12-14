import Api from "./api";

export class TimelineApi extends Api {
    static api_url = Api.api_url + "/timeline";

    static async getTimeline() {
        return this.request(this.api_url, {
            method: "GET",
        });
    }

    static async createEvent(data: { title: string; type: string; description?: string; stressChange?: number }) {
        return this.request(this.api_url + "/create", {
            method: "POST",
            body: JSON.stringify(data),
        });
    }
}
