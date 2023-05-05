const PasskeyService = require("./services/passkey.service");
const EmailLinkService = require("./services/emaillink.service");
const SessionService = require("./services/session.service");
const WebhookService = require("./services/webhook.service");
const webhookMiddleware = require("./middlewares/webhook.middleware");
const getClientInfo = require("./utils/clientInfo.utils");

const EMAIL_TEMPLATES = {
  EMAIL_SIGN_UP_TEMPLATE: "email_signup_user",
  EMAIL_LOGIN_TEMPLATE: "email_login_user",
  PASSKEY_SIGN_UP_TEMPLATE: "webauthn_signup_user",
  PASSKEY_LOGIN_TEMPLATE: "webauthn_login_user",
};

const API_URL = "https://api.corbado.com/v1/";

/**
 * The Corbado class provides access to various services, including PasskeyService, EmailLinkService, SessionService, WebhookService.
 * It also provides access to utility functions, and middleware, that can help to easily integrate Corbado into your application.
 * @class
 */
class Corbado {
  /**
   * @param {string} projectID Project ID from https://app.corbado.com/
   * @param {string} apiSecret Api secret from https://app.corbado.com/app/settings/credentials/api-keys
   * @param {string} baseURL Optional different api url
   */
  passkeyService;
  emailLinkService;
  sessionService;
  webhookService;
  webhookMiddleware = webhookMiddleware;

  constructor(projectID, apiSecret, baseURL = API_URL) {
    if (!projectID) {
      throw new CorbadoError("Project ID is required");
    } else if (projectID.substr(0, 4) !== "pro-") {
      throw new CorbadoError("Project ID is invalid");
    }

    if (!apiSecret) {
      throw new CorbadoError("API secret is required");
    }

    this.passkeyService = new PasskeyService(projectID, apiSecret, baseURL);
    this.emailLinkService = new EmailLinkService(
      projectID,
      apiSecret,
      baseURL,
      EMAIL_TEMPLATES
    );
    this.sessionService = new SessionService(projectID, apiSecret, baseURL);
    this.webhookService = new WebhookService();
    this.utils = { getClientInfo };
  }
}

module.exports = Corbado;
