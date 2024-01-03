import EmailLinks from './services/emaillinks.service.js';
import AuthTokens from './services/authtokens.service.js';
import Session from './services/session.service.js';
import Webhooks from "./services/webhooks.service.js";
import UsersService from "./services/users.service.js";
import AssociationTokens from "./services/associationtokens.service.js";
import Configuration from './config/configuration.js';
/**
 * The SDK class provides access to various services, including PasskeyService, EmailLinkService, SessionService, WebhookService.
 * It also provides access to utility functions, and middleware, that can help to easily integrate SDK into your application.
 * @class
 */
declare class SDK {
    #private;
    /**
     *
     * @param {Configuration} config
     */
    constructor(config: Configuration, utils: any);
    /**
     *
     * @returns {*}
     */
    get passkeys(): any;
    /**
     *
     * @returns {null}
     */
    get emailLinks(): EmailLinks | undefined;
    get users(): UsersService | null;
    get associationTokens(): AssociationTokens;
    get authTokens(): AuthTokens;
    /**
     *
     * @returns {null}
     */
    get session(): Session;
    /**
     *
     * @returns {null}
     */
    get webhooks(): Webhooks;
    /**
     *
     * @returns {null}
     */
    get utils(): null;
}
export default SDK;
