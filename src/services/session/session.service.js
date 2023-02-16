const axios = require('axios');

class SessionService {

    constructor(projectID, apiSecret, internal_config) {

        this.projectID = projectID;
        this.apiSecret = apiSecret;

        this.apiURL = internal_config.BASE_API_URL + '/' + internal_config.API_VERSION + '/';
    }

    /*
    * Creates a request to Corbado verify the session token
    * 
    * @param {string} sessionToken - the session token obtained as HTTP GET parameter from the Redirect URL
    * @param {object} clientInfo - the clientInfo object containing the browser and device information {remoteAddress, userAgent, origin}
    * 
    * @returns {object} data - the response from the server containing the userData
    */
    sessionTokenVerify = async (sessionToken, clientInfo, requestID = null) => {
        try {
            let params = {
                token: sessionToken,
                clientInfo: clientInfo,
            }

            if (requestID) {
                params['requestID'] = requestID;
            }

            let {data} = await axios.post(this.apiURL + 'sessions/verify', params,
                {
                    auth: {
                        username: this.projectID,
                        password: this.apiSecret
                    }
                });
            return data;
        } catch (e) {
            throw new Error('sessionTokenVerify failed : ' + e.message);
        }
    };
}

module.exports = SessionService;
