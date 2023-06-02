const CorbadoApi = require('./CorbadoApi');

class SessionService {
    constructor(projectID, apiSecret, apiURL) {
        this.corbadoApi = new CorbadoApi(projectID, apiSecret,apiURL);
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
    async verify(sessionToken, clientInfo, requestID = null) {
        if (!sessionToken) {
            throw new Error('SessionToken is required');
        }

        const params = {
            token: sessionToken,
            clientInfo,
        }

        if (requestID) {
            params.requestID = requestID;
        }
        return await this.corbadoApi.request('/sessions/verify', 'POST', params);
    }
}

module.exports = SessionService;
