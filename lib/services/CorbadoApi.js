const axios = require('axios');
const CorbadoApiError = require('./CorbadoApiError');

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
        };
        options.auth = {
            username: this.projectID,
            password: this.apiSecret,
        };
        try {
            const response = await axios(options);
            return response.data;
        } catch (error) {
            throw new CorbadoApiError(error.response.status, error.response.statusText, error.request.method, error.config.url, error.config.data);
        }
    }
}

module.exports = CorbadoApi;