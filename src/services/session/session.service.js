const axios = require('axios');

class SessionService {

    constructor(apiKey, config, internal_config) {

        if (!apiKey) {
            throw new Error('API key is required');
        }

        if (!config) {
            throw new Error('Config is required');
        }

        if (!('projectID' in config)) {
            throw new Error('Project ID (projectID) field in Configuration Object is required');
        }

        if (!('origin' in config)) {
            throw new Error('Origin (origin) field in Configuration Object is required');
        }

        this.apiKey = apiKey;
        this.config = config;

        this.projectID = config.projectID;
        this.origin = config.origin;

        this.apiURL = internal_config.BASE_API_URL + '/' + internal_config.API_VERSION + '/';
    }

    /*
    * Creates a request to Corbado verify the session token
    * 
    * @param {string} sessionToken - the session token obtained as HTTP GET parameter from the Redirect URL
    * @param {object} clientInfo - the clientInfo object containing the browser and device information {remoteAddress, userAgent, origin}
    * @param {string} clientInfo.remoteAddress - IP of the user
    * @param {string} clientInfo.userAgent - User Agent of the user
    * @param {string} clientInfo.origin - Origin of the request
    * 
    * @returns {object} data - the response from the server containing the userData
    */
    sessionTokenVerify = async (sessionToken, clientInfo, requestID = null) => {
        try {
            let params = {
                token: sessionToken,
                origin: this.origin,
                clientInfo: clientInfo,
            }

            if (requestID) {
                params['requestID'] = requestID;
            }

            let {data} = await axios.post(this.apiURL + 'sessions/verify', params,
                {
                    auth: {
                        username: this.projectID,
                        password: this.apiKey
                    }
                });
            return data;
        } catch (e) {
            throw new Error('sessionTokenVerify failed : ' + e.message);
        }
    };
}

module.exports = SessionService;
