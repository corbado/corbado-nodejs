declare class Configuration {
    #private;
    constructor(projectID: string, apiSecret: string);
    get projectID(): string;
    get apiSecret(): string;
    set backendAPI(value: string);
    get backendAPI(): string;
    set frontendAPI(value: string);
    get frontendAPI(): string;
    get shortSessionCookieName(): string;
    set shortSessionCookieName(value: string);
    get cacheMaxAge(): number;
    set cacheMaxAge(value: number);
    get client(): null;
    set client(client: null);
    get emailTemplates(): {
        EMAIL_SIGN_UP_TEMPLATE: string;
        EMAIL_LOGIN_TEMPLATE: string;
        PASSKEY_SIGN_UP_TEMPLATE: string;
        PASSKEY_LOGIN_TEMPLATE: string;
    };
    set emailTemplates(value: {
        EMAIL_SIGN_UP_TEMPLATE: string;
        EMAIL_LOGIN_TEMPLATE: string;
        PASSKEY_SIGN_UP_TEMPLATE: string;
        PASSKEY_LOGIN_TEMPLATE: string;
    });
    get webhookUsername(): string;
    set webhookUsername(webhookUsername: string);
    get webhookPassword(): string;
    set webhookPassword(webhookPassword: string);
}
export default Configuration;
