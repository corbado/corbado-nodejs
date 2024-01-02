// convert this file to typescript (.ts) and add types
import axios from 'axios';
import CorbadoApiError from './CorbadoApiError.js';

class CorbadoApi {
    projectID: string;
    apiSecret: string;
    apiURL: string;
    constructor(projectID: string, apiSecret: string, apiURL: string) {
        this.projectID = projectID;
        this.apiSecret = apiSecret;
        this.apiURL = apiURL;
    }

    async request(endpoint: string, method = 'GET', params = {}) {
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
            const response = await axios(options);
            return response.data;
        } catch (error: any) {
            console.log(error);
            throw new CorbadoApiError(error.status, error.statusText, error.method, error.url, error.data);
        }
    }
}

export default CorbadoApi;
