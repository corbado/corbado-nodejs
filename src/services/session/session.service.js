const axios = require('axios');

class SessionService {
    constructor(projectID, apiSecret, apiURL) {

        this.projectID = projectID;
        this.apiSecret = apiSecret;
        this.apiURL = apiURL;
    }

    /**
     * Verifies a session token by sending a request to Corbado.
     *
     * @param {string} sessionToken - The session token obtained as an HTTP GET parameter from the Redirect URL.
     * @param {object} clientInfo - The clientInfo object containing the browser and device information {remoteAddress, userAgent, origin}.
     * @param {string|null} requestID - An optional request ID to send to Corbado.
     *
     * @returns {object} - The response from the server containing the userData.
     * @throws {Error} - If the request fails.
     */
    sessionTokenVerify = async (sessionToken, clientInfo, requestID = null) => {
        try {
            let params = {
                token: sessionToken,
                clientInfo,
            }

            if (requestID) {
                params['requestID'] = requestID;
            }

            const {data} = await axios.post(this.apiURL + 'sessions/verify', params,
                {
                    auth: {
                        username: this.projectID,
                        password: this.apiSecret
                    }
                });
            return data;
        } catch (error) {
            throw new Error(error);
        }
    };
}

module.exports = SessionService;
