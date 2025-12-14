import Api from "./api";

export class TimelineApi extends Api {
    static api_url = Api.api_url + "/timeline";

    static async getTimeline() {
        return this.request(this.api_url, {
            method: "GET",
        });
    }
}
