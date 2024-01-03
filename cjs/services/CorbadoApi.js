"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// convert this file to typescript (.ts) and add types
const axios_1 = require("axios");
const CorbadoApiError_js_1 = require("./CorbadoApiError.js");
class CorbadoApi {
    constructor(projectID, apiSecret, apiURL) {
        this.projectID = projectID;
        this.apiSecret = apiSecret;
        this.apiURL = apiURL;
    }
    async request(endpoint, method = 'GET', params = {}) {
        const options = {
            method: method,
            url: this.apiURL + endpoint,
            headers: {
                'Content-Type': 'application/json',
            },
            data: params,
            auth: { username: this.projectID, password: this.apiSecret }
        };
        // options.auth = {
        //     username: this.projectID,
        //     password: this.apiSecret,
        // };
        try {
            const response = await (0, axios_1.default)(options);
            return response.data;
        }
        catch (error) {
            console.log(error);
            throw new CorbadoApiError_js_1.default(error.status, error.statusText, error.method, error.url, error.data);
        }
    }
}
exports.default = CorbadoApi;
//# sourceMappingURL=CorbadoApi.js.map