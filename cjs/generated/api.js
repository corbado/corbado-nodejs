"use strict";
/* tslint:disable */
/* eslint-disable */
/**
 * Corbado Backend API
 *  # Introduction This documentation gives an overview of all Corbado Backend API calls to implement passwordless authentication with Passkeys.  The Corbado Backend API is organized around REST principles. It uses resource-oriented URLs with verbs (HTTP methods) and HTTP status codes. Requests need to be valid JSON payloads. We always return JSON.  The Corbado Backend API specification is written in **OpenAPI Version 3.0.3**. You can download it via the download button at the top and use it to generate clients in languages we do not provide officially for example.  # Authentication To authenticate your API requests HTTP Basic Auth is used.  You need to set the projectID as username and the API secret as password. The authorization header looks as follows:  `Basic <<projectID>:<API secret>>`  The **authorization header** needs to be **Base64 encoded** to be working. If the authorization header is missing or incorrect, the API will respond with status code 401.  # Error types As mentioned above we make use of HTTP status codes. **4xx** errors indicate so called client errors, meaning the error occurred on client side and you need to fix it. **5xx** errors indicate server errors, which means the error occurred on server side and outside your control.  Besides HTTP status codes Corbado uses what we call error types which gives more details in error cases and help you to debug your request.  ## internal_error The error type **internal_error** is used when some internal error occurred at Corbado. You can retry your request but usually there is nothing you can do about it. All internal errors get logged and will triggert an alert to our operations team which takes care of the situation as soon as possible.  ## not_found The error type **not_found** is used when you try to get a resource which cannot be found. Most common case is that you provided a wrong ID.  ## method_not_allowed The error type **method_not_allowed** is used when you use a HTTP method (GET for example) on a resource/endpoint which it not supports.   ## validation_error The error type **validation_error** is used when there is validation error on the data you provided in the request payload or path. There will be detailed information in the JSON response about the validation error like what exactly went wrong on what field.   ## project_id_mismatch The error type **project_id_mismatch** is used when there is a project ID you provided mismatch.  ## login_error The error type **login_error** is used when the authentication failed. Most common case is that you provided a wrong pair of project ID and API secret. As mentioned above with use HTTP Basic Auth for authentication.  ## invalid_json The error type **invalid_json** is used when you send invalid JSON as request body. There will be detailed information in the JSON response about what went wrong.  ## rate_limited The error type **rate_limited** is used when ran into rate limiting of the Corbado Backend API. Right now you can do a maximum of **2000 requests** within **10 seconds** from a **single IP**. Throttle your requests and try again. If you think you need more contact support@corbado.com.  ## invalid_origin The error type **invalid_origin** is used when the API has been called from a origin which is not authorized (CORS). Add the origin to your project at https://app.corbado.com/app/settings/credentials/authorized-origins.  ## already_exists The error type **already_exists** is used when you try create a resource which already exists. Most common case is that there is some unique constraint on one of the fields.  # Security and privacy Corbado services are designed, developed, monitored, and updated with security at our core to protect you and your customers’ data and privacy.  ## Security  ### Infrastructure security Corbado leverages highly available and secure cloud infrastructure to ensure that our services are always available and securely delivered. Corbado\'s services are operated in uvensys GmbH\'s data centers in Germany and comply with ISO standard 27001. All data centers have redundant power and internet connections to avoid failure. The main location of the servers used is in Linden and offers 24/7 support. We do not use any AWS, GCP or Azure services.  Each server is monitored 24/7 and in the event of problems, automated information is sent via SMS and e-mail. The monitoring is done by the external service provider Serverguard24 GmbH.   All Corbado hardware and networking is routinely updated and audited to ensure systems are secure and that least privileged access is followed. Additionally we implement robust logging and audit protocols that allow us high visibility into system use.  ### Responsible disclosure program Here at Corbado, we take the security of our user’s data and of our services seriously. As such, we encourage responsible security research on Corbado services and products. If you believe you’ve discovered a potential vulnerability, please let us know by emailing us at [security@corbado.com](mailto:security@corbado.com). We will acknowledge your email within 2 business days. As public disclosures of a security vulnerability could put the entire Corbado community at risk, we ask that you keep such potential vulnerabilities confidential until we are able to address them. We aim to resolve critical issues within 30 days of disclosure. Please make a good faith effort to avoid violating privacy, destroying data, or interrupting or degrading the Corbado service. Please only interact with accounts you own or for which you have explicit permission from the account holder. While researching, please refrain from:  - Distributed Denial of Service (DDoS) - Spamming - Social engineering or phishing of Corbado employees or contractors - Any attacks against Corbado\'s physical property or data centers  Thank you for helping to keep Corbado and our users safe!  ### Rate limiting At Corbado, we apply rate limit policies on our APIs in order to protect your application and user management infrastructure, so your users will have a frictionless non-interrupted experience.  Corbado responds with HTTP status code 429 (too many requests) when the rate limits exceed. Your code logic should be able to handle such cases by checking the status code on the response and recovering from such cases. If a retry is needed, it is best to allow for a back-off to avoid going into an infinite retry loop.  The current rate limit for all our API endpoints is **max. 100 requests per 10 seconds**.  ## Privacy Corbado is committed to protecting the personal data of our customers and their customers. Corbado has in place appropriate data security measures that meet industry standards. We regularly review and make enhancements to our processes, products, documentation, and contracts to help support ours and our customers’ compliance for the processing of personal data.  We try to minimize the usage and processing of personally identifiable information. Therefore, all our services are constructed to avoid unnecessary data consumption.  To make our services work, we only require the following data: - any kind of identifier (e.g. UUID, phone number, email address) - IP address (only temporarily for rate limiting aspects) - User agent (for device management)
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: support@corbado.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.APISecretsApiFactory = exports.APISecretsApiFp = exports.APISecretsApiAxiosParamCreator = exports.WebAuthnRegisterStartRspStatusEnum = exports.WebAuthnRegisterStartReqCredentialStatusEnum = exports.WebAuthnRegisterFinishRspStatusEnum = exports.WebAuthnCredentialRspStatusEnum = exports.WebAuthnCredentialReqStatusEnum = exports.WebAuthnCredentialItemRspStatusEnum = exports.WebAuthnCredentialItemRspTransportEnum = exports.WebAuthnAuthenticateStartRspStatusEnum = exports.WebAuthnAuthenticateFinishRspStatusEnum = exports.WebAuthnAssociateStartRspStatusEnum = exports.UserUpdateReqStatusEnum = exports.TrackingOSDetailedStatsOsPlatformEnum = exports.Status = exports.SmsTemplateCreateReqTypeEnum = exports.SessionConfigUpdateReqLongInactivityUnitEnum = exports.SessionConfigUpdateReqLongLifetimeUnitEnum = exports.SessionConfigUpdateReqShortCookieSameSiteEnum = exports.SessionConfigLongInactivityUnitEnum = exports.SessionConfigLongLifetimeUnitEnum = exports.SessionConfigShortCookieSameSiteEnum = exports.ProjectConfigWebhookTestReqActionEnum = exports.ProjectConfigSaveReqLoginFlowEnum = exports.ProjectConfigSaveReqSignupFlowEnum = exports.ProjectConfigSaveReqBackendLanguageEnum = exports.ProjectConfigSaveReqFrontendFrameworkEnum = exports.ProjectConfigSaveReqEnvironmentEnum = exports.ProjectConfigSaveReqPasskeyAppendIntervalEnum = exports.ProjectConfigSaveReqExternalApplicationProtocolVersionEnum = exports.ProjectConfigStatusEnum = exports.ProjectConfigLoginFlowEnum = exports.ProjectConfigSignupFlowEnum = exports.ProjectConfigBackendLanguageEnum = exports.ProjectConfigFrontendFrameworkEnum = exports.ProjectConfigEnvironmentEnum = exports.ProjectConfigPasskeyAppendIntervalEnum = exports.PhoneNumberValidationResultValidationCodeEnum = exports.LongSessionStatusEnum = exports.LoginIdentifierType = exports.ExampleGetRspExtensionEnum = exports.EmailValidationResultValidationCodeEnum = exports.EmailTemplateCreateReqTypeEnum = exports.EmailTemplateCreateReqLangEnum = exports.EmailLinkSendReqPurposeEnum = exports.EmailLinkStatusEnum = exports.EmailCodeStatusEnum = exports.AuthMethod = exports.AppType = void 0;
exports.PasskeysBiometricsApi = exports.PasskeysBiometricsApiFactory = exports.PasskeysBiometricsApiFp = exports.PasskeysBiometricsApiAxiosParamCreator = exports.LongSessionsApi = exports.LongSessionsApiFactory = exports.LongSessionsApiFp = exports.LongSessionsApiAxiosParamCreator = exports.IOSAppConfigApi = exports.IOSAppConfigApiFactory = exports.IOSAppConfigApiFp = exports.IOSAppConfigApiAxiosParamCreator = exports.ExampleGetFileNameEnum = exports.ExamplesApi = exports.ExamplesApiFactory = exports.ExamplesApiFp = exports.ExamplesApiAxiosParamCreator = exports.EmailTemplatesApi = exports.EmailTemplatesApiFactory = exports.EmailTemplatesApiFp = exports.EmailTemplatesApiAxiosParamCreator = exports.EmailOTPApi = exports.EmailOTPApiFactory = exports.EmailOTPApiFp = exports.EmailOTPApiAxiosParamCreator = exports.EmailMagicLinksApi = exports.EmailMagicLinksApiFactory = exports.EmailMagicLinksApiFp = exports.EmailMagicLinksApiAxiosParamCreator = exports.AuthTokensApi = exports.AuthTokensApiFactory = exports.AuthTokensApiFp = exports.AuthTokensApiAxiosParamCreator = exports.AuthMethodsApi = exports.AuthMethodsApiFactory = exports.AuthMethodsApiFp = exports.AuthMethodsApiAxiosParamCreator = exports.AssociationTokensApi = exports.AssociationTokensApiFactory = exports.AssociationTokensApiFp = exports.AssociationTokensApiAxiosParamCreator = exports.AndroidAppConfigApi = exports.AndroidAppConfigApiFactory = exports.AndroidAppConfigApiFp = exports.AndroidAppConfigApiAxiosParamCreator = exports.AnalyzerApi = exports.AnalyzerApiFactory = exports.AnalyzerApiFp = exports.AnalyzerApiAxiosParamCreator = exports.APISecretsApi = void 0;
exports.WebhookLogsApi = exports.WebhookLogsApiFactory = exports.WebhookLogsApiFp = exports.WebhookLogsApiAxiosParamCreator = exports.ValidationApi = exports.ValidationApiFactory = exports.ValidationApiFp = exports.ValidationApiAxiosParamCreator = exports.UserApi = exports.UserApiFactory = exports.UserApiFp = exports.UserApiAxiosParamCreator = exports.SessionConfigApi = exports.SessionConfigApiFactory = exports.SessionConfigApiFp = exports.SessionConfigApiAxiosParamCreator = exports.SMSTemplatesApi = exports.SMSTemplatesApiFactory = exports.SMSTemplatesApiFp = exports.SMSTemplatesApiAxiosParamCreator = exports.SMSOTPApi = exports.SMSOTPApiFactory = exports.SMSOTPApiFp = exports.SMSOTPApiAxiosParamCreator = exports.RequestLogsApi = exports.RequestLogsApiFactory = exports.RequestLogsApiFp = exports.RequestLogsApiAxiosParamCreator = exports.ProjectConfigApi = exports.ProjectConfigApiFactory = exports.ProjectConfigApiFp = exports.ProjectConfigApiAxiosParamCreator = void 0;
const axios_1 = require("axios");
// Some imports not used depending on template conditions
// @ts-ignore
const common_js_1 = require("./common.js");
// @ts-ignore
const base_js_1 = require("./base.js");
/**
 * Application type
 * @export
 * @enum {string}
 */
exports.AppType = {
    Empty: 'empty',
    Web: 'web',
    Native: 'native'
};
/**
 * Authentication methods
 * @export
 * @enum {string}
 */
exports.AuthMethod = {
    Email: 'email',
    PhoneNumber: 'phone_number',
    Webauthn: 'webauthn',
    Password: 'password'
};
exports.EmailCodeStatusEnum = {
    Active: 'active',
    Confirmed: 'confirmed'
};
exports.EmailLinkStatusEnum = {
    Active: 'active',
    Confirmed: 'confirmed'
};
exports.EmailLinkSendReqPurposeEnum = {
    Authentication: 'authentication',
    Confirmation: 'confirmation',
    Invitation: 'invitation'
};
exports.EmailTemplateCreateReqLangEnum = {
    En: 'en',
    De: 'de',
    Fr: 'fr'
};
exports.EmailTemplateCreateReqTypeEnum = {
    EmailLink: 'email_link',
    EmailLinkLogin: 'email_link_login',
    LoginNotification: 'login_notification',
    PasskeyNotification: 'passkey_notification',
    EmailCode: 'email_code'
};
exports.EmailValidationResultValidationCodeEnum = {
    Valid: 'valid',
    InvalidSyntax: 'invalid_syntax',
    NoSuchHost: 'no_such_host',
    NotAllowed: 'not_allowed',
    Unknown: 'unknown'
};
exports.ExampleGetRspExtensionEnum = {
    Zip: 'zip',
    TarGz: 'tar.gz'
};
/**
 * Login Identifier type
 * @export
 * @enum {string}
 */
exports.LoginIdentifierType = {
    Email: 'email',
    PhoneNumber: 'phone_number',
    Custom: 'custom'
};
exports.LongSessionStatusEnum = {
    Active: 'active',
    LoggedOut: 'logged_out',
    Expired: 'expired',
    InactivityReached: 'inactivity_reached',
    Revoked: 'revoked'
};
exports.PhoneNumberValidationResultValidationCodeEnum = {
    Valid: 'valid',
    InvalidCountryCode: 'invalid_country_code',
    InvalidNumber: 'invalid_number',
    TooLong: 'too_long'
};
exports.ProjectConfigPasskeyAppendIntervalEnum = {
    NotSpecified: 'not_specified',
    _0d: '0d',
    _1d: '1d',
    _3d: '3d',
    _1w: '1w',
    _3w: '3w',
    _1m: '1m',
    _3m: '3m'
};
exports.ProjectConfigEnvironmentEnum = {
    Dev: 'dev',
    Prod: 'prod'
};
exports.ProjectConfigFrontendFrameworkEnum = {
    NotSpecified: 'not_specified',
    React: 'react',
    Vuejs: 'vuejs',
    Vanillajs: 'vanillajs'
};
exports.ProjectConfigBackendLanguageEnum = {
    NotSpecified: 'not_specified',
    Javascript: 'javascript',
    Php: 'php',
    Go: 'go'
};
exports.ProjectConfigSignupFlowEnum = {
    PasskeyWithEmailOtpFallback: 'PasskeyWithEmailOTPFallback',
    EmailOtpSignup: 'EmailOTPSignup'
};
exports.ProjectConfigLoginFlowEnum = {
    PasskeyWithEmailOtpFallback: 'PasskeyWithEmailOTPFallback'
};
exports.ProjectConfigStatusEnum = {
    Active: 'active',
    Configuring: 'configuring'
};
exports.ProjectConfigSaveReqExternalApplicationProtocolVersionEnum = {
    V1: 'v1',
    V2: 'v2'
};
exports.ProjectConfigSaveReqPasskeyAppendIntervalEnum = {
    _0d: '0d',
    _1d: '1d',
    _3d: '3d',
    _1w: '1w',
    _3w: '3w',
    _1m: '1m',
    _3m: '3m'
};
exports.ProjectConfigSaveReqEnvironmentEnum = {
    Dev: 'dev',
    Prod: 'prod'
};
exports.ProjectConfigSaveReqFrontendFrameworkEnum = {
    React: 'react',
    Vuejs: 'vuejs',
    Vanillajs: 'vanillajs'
};
exports.ProjectConfigSaveReqBackendLanguageEnum = {
    Javascript: 'javascript',
    Php: 'php',
    Go: 'go'
};
exports.ProjectConfigSaveReqSignupFlowEnum = {
    PasskeyWithEmailOtpFallback: 'PasskeyWithEmailOTPFallback',
    EmailOtpSignup: 'EmailOTPSignup'
};
exports.ProjectConfigSaveReqLoginFlowEnum = {
    PasskeyWithEmailOtpFallback: 'PasskeyWithEmailOTPFallback'
};
exports.ProjectConfigWebhookTestReqActionEnum = {
    AuthMethods: 'authMethods',
    PasswordVerify: 'passwordVerify'
};
exports.SessionConfigShortCookieSameSiteEnum = {
    Lax: 'lax',
    Strict: 'strict',
    None: 'none'
};
exports.SessionConfigLongLifetimeUnitEnum = {
    Min: 'min',
    Hour: 'hour',
    Day: 'day'
};
exports.SessionConfigLongInactivityUnitEnum = {
    Min: 'min',
    Hour: 'hour',
    Day: 'day'
};
exports.SessionConfigUpdateReqShortCookieSameSiteEnum = {
    Lax: 'lax',
    Strict: 'strict',
    None: 'none'
};
exports.SessionConfigUpdateReqLongLifetimeUnitEnum = {
    Min: 'min',
    Hour: 'hour'
};
exports.SessionConfigUpdateReqLongInactivityUnitEnum = {
    Min: 'min',
    Hour: 'hour'
};
exports.SmsTemplateCreateReqTypeEnum = {
    SmsCode: 'sms_code',
    PasskeyNotification: 'passkey_notification'
};
/**
 * Generic status that can describe Corbado entities
 * @export
 * @enum {string}
 */
exports.Status = {
    Active: 'active',
    Pending: 'pending',
    Deleted: 'deleted'
};
exports.TrackingOSDetailedStatsOsPlatformEnum = {
    Desktop: 'desktop',
    Mobile: 'mobile',
    Unknown: 'unknown'
};
exports.UserUpdateReqStatusEnum = {
    Active: 'active',
    Disabled: 'disabled'
};
exports.WebAuthnAssociateStartRspStatusEnum = {
    Success: 'success',
    Duplicate: 'duplicate'
};
exports.WebAuthnAuthenticateFinishRspStatusEnum = {
    Success: 'success',
    UnconfirmedCredential: 'unconfirmedCredential'
};
exports.WebAuthnAuthenticateStartRspStatusEnum = {
    Success: 'success',
    UnknownDevice: 'unknownDevice',
    UnconfirmedDevice: 'unconfirmedDevice'
};
exports.WebAuthnCredentialItemRspTransportEnum = {
    Usb: 'usb',
    Nfc: 'nfc',
    Ble: 'ble',
    Internal: 'internal',
    Hybrid: 'hybrid',
    SmartCard: 'smart-card'
};
exports.WebAuthnCredentialItemRspStatusEnum = {
    Pending: 'pending',
    Active: 'active'
};
exports.WebAuthnCredentialReqStatusEnum = {
    Pending: 'pending',
    Active: 'active',
    Deleted: 'deleted'
};
exports.WebAuthnCredentialRspStatusEnum = {
    Pending: 'pending',
    Active: 'active',
    Deleted: 'deleted'
};
exports.WebAuthnRegisterFinishRspStatusEnum = {
    Success: 'success',
    Duplicate: 'duplicate'
};
exports.WebAuthnRegisterStartReqCredentialStatusEnum = {
    Active: 'active',
    Pending: 'pending'
};
exports.WebAuthnRegisterStartRspStatusEnum = {
    Success: 'success',
    Duplicate: 'duplicate'
};
/**
 * APISecretsApi - axios parameter creator
 * @export
 */
const APISecretsApiAxiosParamCreator = function (configuration) {
    return {
        /**
         * Creates an API secret
         * @param {ProjectSecretCreateReq} [projectSecretCreateReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        projectSecretCreate: async (projectSecretCreateReq, options = {}) => {
            const localVarPath = `/v1/projectSecrets`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(projectSecretCreateReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Deletes API secret
         * @param {string} secretID Secret ID from create
         * @param {ProjectSecretDeleteReq} [projectSecretDeleteReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        projectSecretDelete: async (secretID, projectSecretDeleteReq, options = {}) => {
            // verify required parameter 'secretID' is not null or undefined
            (0, common_js_1.assertParamExists)('projectSecretDelete', 'secretID', secretID);
            const localVarPath = `/v1/projectSecrets/{secretID}`
                .replace(`{${"secretID"}}`, encodeURIComponent(String(secretID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(projectSecretDeleteReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Lists API secrets
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        projectSecretList: async (options = {}) => {
            const localVarPath = `/v1/projectSecrets`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.APISecretsApiAxiosParamCreator = APISecretsApiAxiosParamCreator;
/**
 * APISecretsApi - functional programming interface
 * @export
 */
const APISecretsApiFp = function (configuration) {
    const localVarAxiosParamCreator = (0, exports.APISecretsApiAxiosParamCreator)(configuration);
    return {
        /**
         * Creates an API secret
         * @param {ProjectSecretCreateReq} [projectSecretCreateReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async projectSecretCreate(projectSecretCreateReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.projectSecretCreate(projectSecretCreateReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['APISecretsApi.projectSecretCreate']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Deletes API secret
         * @param {string} secretID Secret ID from create
         * @param {ProjectSecretDeleteReq} [projectSecretDeleteReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async projectSecretDelete(secretID, projectSecretDeleteReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.projectSecretDelete(secretID, projectSecretDeleteReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['APISecretsApi.projectSecretDelete']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Lists API secrets
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async projectSecretList(options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.projectSecretList(options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['APISecretsApi.projectSecretList']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    };
};
exports.APISecretsApiFp = APISecretsApiFp;
/**
 * APISecretsApi - factory interface
 * @export
 */
const APISecretsApiFactory = function (configuration, basePath, axios) {
    const localVarFp = (0, exports.APISecretsApiFp)(configuration);
    return {
        /**
         * Creates an API secret
         * @param {ProjectSecretCreateReq} [projectSecretCreateReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        projectSecretCreate(projectSecretCreateReq, options) {
            return localVarFp.projectSecretCreate(projectSecretCreateReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Deletes API secret
         * @param {string} secretID Secret ID from create
         * @param {ProjectSecretDeleteReq} [projectSecretDeleteReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        projectSecretDelete(secretID, projectSecretDeleteReq, options) {
            return localVarFp.projectSecretDelete(secretID, projectSecretDeleteReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Lists API secrets
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        projectSecretList(options) {
            return localVarFp.projectSecretList(options).then((request) => request(axios, basePath));
        },
    };
};
exports.APISecretsApiFactory = APISecretsApiFactory;
/**
 * APISecretsApi - object-oriented interface
 * @export
 * @class APISecretsApi
 * @extends {BaseAPI}
 */
class APISecretsApi extends base_js_1.BaseAPI {
    /**
     * Creates an API secret
     * @param {ProjectSecretCreateReq} [projectSecretCreateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof APISecretsApi
     */
    projectSecretCreate(projectSecretCreateReq, options) {
        return (0, exports.APISecretsApiFp)(this.configuration).projectSecretCreate(projectSecretCreateReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Deletes API secret
     * @param {string} secretID Secret ID from create
     * @param {ProjectSecretDeleteReq} [projectSecretDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof APISecretsApi
     */
    projectSecretDelete(secretID, projectSecretDeleteReq, options) {
        return (0, exports.APISecretsApiFp)(this.configuration).projectSecretDelete(secretID, projectSecretDeleteReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Lists API secrets
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof APISecretsApi
     */
    projectSecretList(options) {
        return (0, exports.APISecretsApiFp)(this.configuration).projectSecretList(options).then((request) => request(this.axios, this.basePath));
    }
}
exports.APISecretsApi = APISecretsApi;
/**
 * AnalyzerApi - axios parameter creator
 * @export
 */
const AnalyzerApiAxiosParamCreator = function (configuration) {
    return {
        /**
         * Provides project\'s passkeys raw tracking data per visitor
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackingAllRequest: async (remoteAddress, userAgent, sort, filter, page, pageSize, options = {}) => {
            const localVarPath = `/v1/tracking`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            if (remoteAddress !== undefined) {
                localVarQueryParameter['remoteAddress'] = remoteAddress;
            }
            if (userAgent !== undefined) {
                localVarQueryParameter['userAgent'] = userAgent;
            }
            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
            }
            if (filter) {
                localVarQueryParameter['filter[]'] = filter;
            }
            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }
            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Provides tracking credential backup state data
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackingBackupStateGet: async (remoteAddress, userAgent, options = {}) => {
            const localVarPath = `/v1/tracking/backupState`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            if (remoteAddress !== undefined) {
                localVarQueryParameter['remoteAddress'] = remoteAddress;
            }
            if (userAgent !== undefined) {
                localVarQueryParameter['userAgent'] = userAgent;
            }
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Provides detailed browser tracking data
         * @param {string} granularity Data granularity
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackingBrowserDetailedStatsList: async (granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options = {}) => {
            // verify required parameter 'granularity' is not null or undefined
            (0, common_js_1.assertParamExists)('trackingBrowserDetailedStatsList', 'granularity', granularity);
            const localVarPath = `/v1/tracking/browser/stats/detailed`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            if (remoteAddress !== undefined) {
                localVarQueryParameter['remoteAddress'] = remoteAddress;
            }
            if (userAgent !== undefined) {
                localVarQueryParameter['userAgent'] = userAgent;
            }
            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
            }
            if (filter) {
                localVarQueryParameter['filter[]'] = filter;
            }
            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }
            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }
            if (granularity !== undefined) {
                localVarQueryParameter['granularity'] = granularity;
            }
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Provides browser tracking data
         * @param {string} granularity Data granularity
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackingBrowserStatsList: async (granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options = {}) => {
            // verify required parameter 'granularity' is not null or undefined
            (0, common_js_1.assertParamExists)('trackingBrowserStatsList', 'granularity', granularity);
            const localVarPath = `/v1/tracking/browser/stats`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            if (remoteAddress !== undefined) {
                localVarQueryParameter['remoteAddress'] = remoteAddress;
            }
            if (userAgent !== undefined) {
                localVarQueryParameter['userAgent'] = userAgent;
            }
            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
            }
            if (filter) {
                localVarQueryParameter['filter[]'] = filter;
            }
            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }
            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }
            if (granularity !== undefined) {
                localVarQueryParameter['granularity'] = granularity;
            }
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Provides detailed tracking data
         * @param {string} granularity Data granularity
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackingDetailedStatsList: async (granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options = {}) => {
            // verify required parameter 'granularity' is not null or undefined
            (0, common_js_1.assertParamExists)('trackingDetailedStatsList', 'granularity', granularity);
            const localVarPath = `/v1/tracking/stats/detailed`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            if (remoteAddress !== undefined) {
                localVarQueryParameter['remoteAddress'] = remoteAddress;
            }
            if (userAgent !== undefined) {
                localVarQueryParameter['userAgent'] = userAgent;
            }
            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
            }
            if (filter) {
                localVarQueryParameter['filter[]'] = filter;
            }
            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }
            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }
            if (granularity !== undefined) {
                localVarQueryParameter['granularity'] = granularity;
            }
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Provides tracking enum values
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackingEnumsGet: async (remoteAddress, userAgent, options = {}) => {
            const localVarPath = `/v1/tracking/enums`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            if (remoteAddress !== undefined) {
                localVarQueryParameter['remoteAddress'] = remoteAddress;
            }
            if (userAgent !== undefined) {
                localVarQueryParameter['userAgent'] = userAgent;
            }
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Provides detailed OS tracking data
         * @param {string} granularity Data granularity
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackingOSDetailedStatsList: async (granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options = {}) => {
            // verify required parameter 'granularity' is not null or undefined
            (0, common_js_1.assertParamExists)('trackingOSDetailedStatsList', 'granularity', granularity);
            const localVarPath = `/v1/tracking/os/stats/detailed`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            if (remoteAddress !== undefined) {
                localVarQueryParameter['remoteAddress'] = remoteAddress;
            }
            if (userAgent !== undefined) {
                localVarQueryParameter['userAgent'] = userAgent;
            }
            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
            }
            if (filter) {
                localVarQueryParameter['filter[]'] = filter;
            }
            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }
            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }
            if (granularity !== undefined) {
                localVarQueryParameter['granularity'] = granularity;
            }
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Provides os tracking data
         * @param {string} granularity Data granularity
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackingOSStatsList: async (granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options = {}) => {
            // verify required parameter 'granularity' is not null or undefined
            (0, common_js_1.assertParamExists)('trackingOSStatsList', 'granularity', granularity);
            const localVarPath = `/v1/tracking/os/stats`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            if (remoteAddress !== undefined) {
                localVarQueryParameter['remoteAddress'] = remoteAddress;
            }
            if (userAgent !== undefined) {
                localVarQueryParameter['userAgent'] = userAgent;
            }
            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
            }
            if (filter) {
                localVarQueryParameter['filter[]'] = filter;
            }
            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }
            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }
            if (granularity !== undefined) {
                localVarQueryParameter['granularity'] = granularity;
            }
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Provides aggregated statstics for project\'s passkeys tracking data
         * @param {string} granularity Data granularity
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackingStatsList: async (granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options = {}) => {
            // verify required parameter 'granularity' is not null or undefined
            (0, common_js_1.assertParamExists)('trackingStatsList', 'granularity', granularity);
            const localVarPath = `/v1/tracking/stats`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            if (remoteAddress !== undefined) {
                localVarQueryParameter['remoteAddress'] = remoteAddress;
            }
            if (userAgent !== undefined) {
                localVarQueryParameter['userAgent'] = userAgent;
            }
            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
            }
            if (filter) {
                localVarQueryParameter['filter[]'] = filter;
            }
            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }
            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }
            if (granularity !== undefined) {
                localVarQueryParameter['granularity'] = granularity;
            }
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.AnalyzerApiAxiosParamCreator = AnalyzerApiAxiosParamCreator;
/**
 * AnalyzerApi - functional programming interface
 * @export
 */
const AnalyzerApiFp = function (configuration) {
    const localVarAxiosParamCreator = (0, exports.AnalyzerApiAxiosParamCreator)(configuration);
    return {
        /**
         * Provides project\'s passkeys raw tracking data per visitor
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trackingAllRequest(remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trackingAllRequest(remoteAddress, userAgent, sort, filter, page, pageSize, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['AnalyzerApi.trackingAllRequest']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Provides tracking credential backup state data
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trackingBackupStateGet(remoteAddress, userAgent, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trackingBackupStateGet(remoteAddress, userAgent, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['AnalyzerApi.trackingBackupStateGet']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Provides detailed browser tracking data
         * @param {string} granularity Data granularity
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trackingBrowserDetailedStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trackingBrowserDetailedStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['AnalyzerApi.trackingBrowserDetailedStatsList']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Provides browser tracking data
         * @param {string} granularity Data granularity
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trackingBrowserStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trackingBrowserStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['AnalyzerApi.trackingBrowserStatsList']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Provides detailed tracking data
         * @param {string} granularity Data granularity
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trackingDetailedStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trackingDetailedStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['AnalyzerApi.trackingDetailedStatsList']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Provides tracking enum values
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trackingEnumsGet(remoteAddress, userAgent, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trackingEnumsGet(remoteAddress, userAgent, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['AnalyzerApi.trackingEnumsGet']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Provides detailed OS tracking data
         * @param {string} granularity Data granularity
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trackingOSDetailedStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trackingOSDetailedStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['AnalyzerApi.trackingOSDetailedStatsList']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Provides os tracking data
         * @param {string} granularity Data granularity
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trackingOSStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trackingOSStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['AnalyzerApi.trackingOSStatsList']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Provides aggregated statstics for project\'s passkeys tracking data
         * @param {string} granularity Data granularity
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trackingStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trackingStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['AnalyzerApi.trackingStatsList']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    };
};
exports.AnalyzerApiFp = AnalyzerApiFp;
/**
 * AnalyzerApi - factory interface
 * @export
 */
const AnalyzerApiFactory = function (configuration, basePath, axios) {
    const localVarFp = (0, exports.AnalyzerApiFp)(configuration);
    return {
        /**
         * Provides project\'s passkeys raw tracking data per visitor
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackingAllRequest(remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            return localVarFp.trackingAllRequest(remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(axios, basePath));
        },
        /**
         * Provides tracking credential backup state data
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackingBackupStateGet(remoteAddress, userAgent, options) {
            return localVarFp.trackingBackupStateGet(remoteAddress, userAgent, options).then((request) => request(axios, basePath));
        },
        /**
         * Provides detailed browser tracking data
         * @param {string} granularity Data granularity
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackingBrowserDetailedStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            return localVarFp.trackingBrowserDetailedStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(axios, basePath));
        },
        /**
         * Provides browser tracking data
         * @param {string} granularity Data granularity
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackingBrowserStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            return localVarFp.trackingBrowserStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(axios, basePath));
        },
        /**
         * Provides detailed tracking data
         * @param {string} granularity Data granularity
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackingDetailedStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            return localVarFp.trackingDetailedStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(axios, basePath));
        },
        /**
         * Provides tracking enum values
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackingEnumsGet(remoteAddress, userAgent, options) {
            return localVarFp.trackingEnumsGet(remoteAddress, userAgent, options).then((request) => request(axios, basePath));
        },
        /**
         * Provides detailed OS tracking data
         * @param {string} granularity Data granularity
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackingOSDetailedStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            return localVarFp.trackingOSDetailedStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(axios, basePath));
        },
        /**
         * Provides os tracking data
         * @param {string} granularity Data granularity
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackingOSStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            return localVarFp.trackingOSStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(axios, basePath));
        },
        /**
         * Provides aggregated statstics for project\'s passkeys tracking data
         * @param {string} granularity Data granularity
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackingStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            return localVarFp.trackingStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(axios, basePath));
        },
    };
};
exports.AnalyzerApiFactory = AnalyzerApiFactory;
/**
 * AnalyzerApi - object-oriented interface
 * @export
 * @class AnalyzerApi
 * @extends {BaseAPI}
 */
class AnalyzerApi extends base_js_1.BaseAPI {
    /**
     * Provides project\'s passkeys raw tracking data per visitor
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {string} [sort] Field sorting
     * @param {Array<string>} [filter] Field filtering
     * @param {number} [page] Page number
     * @param {number} [pageSize] Number of items per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyzerApi
     */
    trackingAllRequest(remoteAddress, userAgent, sort, filter, page, pageSize, options) {
        return (0, exports.AnalyzerApiFp)(this.configuration).trackingAllRequest(remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Provides tracking credential backup state data
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyzerApi
     */
    trackingBackupStateGet(remoteAddress, userAgent, options) {
        return (0, exports.AnalyzerApiFp)(this.configuration).trackingBackupStateGet(remoteAddress, userAgent, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Provides detailed browser tracking data
     * @param {string} granularity Data granularity
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {string} [sort] Field sorting
     * @param {Array<string>} [filter] Field filtering
     * @param {number} [page] Page number
     * @param {number} [pageSize] Number of items per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyzerApi
     */
    trackingBrowserDetailedStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options) {
        return (0, exports.AnalyzerApiFp)(this.configuration).trackingBrowserDetailedStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Provides browser tracking data
     * @param {string} granularity Data granularity
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {string} [sort] Field sorting
     * @param {Array<string>} [filter] Field filtering
     * @param {number} [page] Page number
     * @param {number} [pageSize] Number of items per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyzerApi
     */
    trackingBrowserStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options) {
        return (0, exports.AnalyzerApiFp)(this.configuration).trackingBrowserStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Provides detailed tracking data
     * @param {string} granularity Data granularity
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {string} [sort] Field sorting
     * @param {Array<string>} [filter] Field filtering
     * @param {number} [page] Page number
     * @param {number} [pageSize] Number of items per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyzerApi
     */
    trackingDetailedStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options) {
        return (0, exports.AnalyzerApiFp)(this.configuration).trackingDetailedStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Provides tracking enum values
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyzerApi
     */
    trackingEnumsGet(remoteAddress, userAgent, options) {
        return (0, exports.AnalyzerApiFp)(this.configuration).trackingEnumsGet(remoteAddress, userAgent, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Provides detailed OS tracking data
     * @param {string} granularity Data granularity
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {string} [sort] Field sorting
     * @param {Array<string>} [filter] Field filtering
     * @param {number} [page] Page number
     * @param {number} [pageSize] Number of items per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyzerApi
     */
    trackingOSDetailedStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options) {
        return (0, exports.AnalyzerApiFp)(this.configuration).trackingOSDetailedStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Provides os tracking data
     * @param {string} granularity Data granularity
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {string} [sort] Field sorting
     * @param {Array<string>} [filter] Field filtering
     * @param {number} [page] Page number
     * @param {number} [pageSize] Number of items per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyzerApi
     */
    trackingOSStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options) {
        return (0, exports.AnalyzerApiFp)(this.configuration).trackingOSStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Provides aggregated statstics for project\'s passkeys tracking data
     * @param {string} granularity Data granularity
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {string} [sort] Field sorting
     * @param {Array<string>} [filter] Field filtering
     * @param {number} [page] Page number
     * @param {number} [pageSize] Number of items per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyzerApi
     */
    trackingStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options) {
        return (0, exports.AnalyzerApiFp)(this.configuration).trackingStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.AnalyzerApi = AnalyzerApi;
/**
 * AndroidAppConfigApi - axios parameter creator
 * @export
 */
const AndroidAppConfigApiAxiosParamCreator = function (configuration) {
    return {
        /**
         * Creates a new Android App Configuration
         * @param {AndroidAppConfigSaveReq} androidAppConfigSaveReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        androidAppConfigCreate: async (androidAppConfigSaveReq, options = {}) => {
            // verify required parameter 'androidAppConfigSaveReq' is not null or undefined
            (0, common_js_1.assertParamExists)('androidAppConfigCreate', 'androidAppConfigSaveReq', androidAppConfigSaveReq);
            const localVarPath = `/v1/androidappconfig`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(androidAppConfigSaveReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Deletes an Android App Config
         * @param {string} androidAppConfigID Android App Config ID from create
         * @param {AndroidAppConfigDeleteReq} [androidAppConfigDeleteReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        androidAppConfigDelete: async (androidAppConfigID, androidAppConfigDeleteReq, options = {}) => {
            // verify required parameter 'androidAppConfigID' is not null or undefined
            (0, common_js_1.assertParamExists)('androidAppConfigDelete', 'androidAppConfigID', androidAppConfigID);
            const localVarPath = `/v1/androidappconfig/{androidAppConfigID}`
                .replace(`{${"androidAppConfigID"}}`, encodeURIComponent(String(androidAppConfigID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(androidAppConfigDeleteReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Lists Android App Configurations for a project
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        androidAppConfigGet: async (options = {}) => {
            const localVarPath = `/v1/androidappconfig`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Updates an Android app config by id
         * @param {string} androidAppConfigID ID from Android config create
         * @param {AndroidAppConfigUpdateReq} [androidAppConfigUpdateReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        androidAppConfigPut: async (androidAppConfigID, androidAppConfigUpdateReq, options = {}) => {
            // verify required parameter 'androidAppConfigID' is not null or undefined
            (0, common_js_1.assertParamExists)('androidAppConfigPut', 'androidAppConfigID', androidAppConfigID);
            const localVarPath = `/v1/androidappconfig/{androidAppConfigID}`
                .replace(`{${"androidAppConfigID"}}`, encodeURIComponent(String(androidAppConfigID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(androidAppConfigUpdateReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.AndroidAppConfigApiAxiosParamCreator = AndroidAppConfigApiAxiosParamCreator;
/**
 * AndroidAppConfigApi - functional programming interface
 * @export
 */
const AndroidAppConfigApiFp = function (configuration) {
    const localVarAxiosParamCreator = (0, exports.AndroidAppConfigApiAxiosParamCreator)(configuration);
    return {
        /**
         * Creates a new Android App Configuration
         * @param {AndroidAppConfigSaveReq} androidAppConfigSaveReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async androidAppConfigCreate(androidAppConfigSaveReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.androidAppConfigCreate(androidAppConfigSaveReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['AndroidAppConfigApi.androidAppConfigCreate']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Deletes an Android App Config
         * @param {string} androidAppConfigID Android App Config ID from create
         * @param {AndroidAppConfigDeleteReq} [androidAppConfigDeleteReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async androidAppConfigDelete(androidAppConfigID, androidAppConfigDeleteReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.androidAppConfigDelete(androidAppConfigID, androidAppConfigDeleteReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['AndroidAppConfigApi.androidAppConfigDelete']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Lists Android App Configurations for a project
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async androidAppConfigGet(options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.androidAppConfigGet(options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['AndroidAppConfigApi.androidAppConfigGet']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Updates an Android app config by id
         * @param {string} androidAppConfigID ID from Android config create
         * @param {AndroidAppConfigUpdateReq} [androidAppConfigUpdateReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async androidAppConfigPut(androidAppConfigID, androidAppConfigUpdateReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.androidAppConfigPut(androidAppConfigID, androidAppConfigUpdateReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['AndroidAppConfigApi.androidAppConfigPut']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    };
};
exports.AndroidAppConfigApiFp = AndroidAppConfigApiFp;
/**
 * AndroidAppConfigApi - factory interface
 * @export
 */
const AndroidAppConfigApiFactory = function (configuration, basePath, axios) {
    const localVarFp = (0, exports.AndroidAppConfigApiFp)(configuration);
    return {
        /**
         * Creates a new Android App Configuration
         * @param {AndroidAppConfigSaveReq} androidAppConfigSaveReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        androidAppConfigCreate(androidAppConfigSaveReq, options) {
            return localVarFp.androidAppConfigCreate(androidAppConfigSaveReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Deletes an Android App Config
         * @param {string} androidAppConfigID Android App Config ID from create
         * @param {AndroidAppConfigDeleteReq} [androidAppConfigDeleteReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        androidAppConfigDelete(androidAppConfigID, androidAppConfigDeleteReq, options) {
            return localVarFp.androidAppConfigDelete(androidAppConfigID, androidAppConfigDeleteReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Lists Android App Configurations for a project
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        androidAppConfigGet(options) {
            return localVarFp.androidAppConfigGet(options).then((request) => request(axios, basePath));
        },
        /**
         * Updates an Android app config by id
         * @param {string} androidAppConfigID ID from Android config create
         * @param {AndroidAppConfigUpdateReq} [androidAppConfigUpdateReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        androidAppConfigPut(androidAppConfigID, androidAppConfigUpdateReq, options) {
            return localVarFp.androidAppConfigPut(androidAppConfigID, androidAppConfigUpdateReq, options).then((request) => request(axios, basePath));
        },
    };
};
exports.AndroidAppConfigApiFactory = AndroidAppConfigApiFactory;
/**
 * AndroidAppConfigApi - object-oriented interface
 * @export
 * @class AndroidAppConfigApi
 * @extends {BaseAPI}
 */
class AndroidAppConfigApi extends base_js_1.BaseAPI {
    /**
     * Creates a new Android App Configuration
     * @param {AndroidAppConfigSaveReq} androidAppConfigSaveReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AndroidAppConfigApi
     */
    androidAppConfigCreate(androidAppConfigSaveReq, options) {
        return (0, exports.AndroidAppConfigApiFp)(this.configuration).androidAppConfigCreate(androidAppConfigSaveReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Deletes an Android App Config
     * @param {string} androidAppConfigID Android App Config ID from create
     * @param {AndroidAppConfigDeleteReq} [androidAppConfigDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AndroidAppConfigApi
     */
    androidAppConfigDelete(androidAppConfigID, androidAppConfigDeleteReq, options) {
        return (0, exports.AndroidAppConfigApiFp)(this.configuration).androidAppConfigDelete(androidAppConfigID, androidAppConfigDeleteReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Lists Android App Configurations for a project
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AndroidAppConfigApi
     */
    androidAppConfigGet(options) {
        return (0, exports.AndroidAppConfigApiFp)(this.configuration).androidAppConfigGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Updates an Android app config by id
     * @param {string} androidAppConfigID ID from Android config create
     * @param {AndroidAppConfigUpdateReq} [androidAppConfigUpdateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AndroidAppConfigApi
     */
    androidAppConfigPut(androidAppConfigID, androidAppConfigUpdateReq, options) {
        return (0, exports.AndroidAppConfigApiFp)(this.configuration).androidAppConfigPut(androidAppConfigID, androidAppConfigUpdateReq, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.AndroidAppConfigApi = AndroidAppConfigApi;
/**
 * AssociationTokensApi - axios parameter creator
 * @export
 */
const AssociationTokensApiAxiosParamCreator = function (configuration) {
    return {
        /**
         * Creates a new association token
         * @param {AssociationTokenCreateReq} associationTokenCreateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        associationTokenCreate: async (associationTokenCreateReq, options = {}) => {
            // verify required parameter 'associationTokenCreateReq' is not null or undefined
            (0, common_js_1.assertParamExists)('associationTokenCreate', 'associationTokenCreateReq', associationTokenCreateReq);
            const localVarPath = `/v1/associationTokens`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(associationTokenCreateReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.AssociationTokensApiAxiosParamCreator = AssociationTokensApiAxiosParamCreator;
/**
 * AssociationTokensApi - functional programming interface
 * @export
 */
const AssociationTokensApiFp = function (configuration) {
    const localVarAxiosParamCreator = (0, exports.AssociationTokensApiAxiosParamCreator)(configuration);
    return {
        /**
         * Creates a new association token
         * @param {AssociationTokenCreateReq} associationTokenCreateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async associationTokenCreate(associationTokenCreateReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.associationTokenCreate(associationTokenCreateReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['AssociationTokensApi.associationTokenCreate']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    };
};
exports.AssociationTokensApiFp = AssociationTokensApiFp;
/**
 * AssociationTokensApi - factory interface
 * @export
 */
const AssociationTokensApiFactory = function (configuration, basePath, axios) {
    const localVarFp = (0, exports.AssociationTokensApiFp)(configuration);
    return {
        /**
         * Creates a new association token
         * @param {AssociationTokenCreateReq} associationTokenCreateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        associationTokenCreate(associationTokenCreateReq, options) {
            return localVarFp.associationTokenCreate(associationTokenCreateReq, options).then((request) => request(axios, basePath));
        },
    };
};
exports.AssociationTokensApiFactory = AssociationTokensApiFactory;
/**
 * AssociationTokensApi - object-oriented interface
 * @export
 * @class AssociationTokensApi
 * @extends {BaseAPI}
 */
class AssociationTokensApi extends base_js_1.BaseAPI {
    /**
     * Creates a new association token
     * @param {AssociationTokenCreateReq} associationTokenCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AssociationTokensApi
     */
    associationTokenCreate(associationTokenCreateReq, options) {
        return (0, exports.AssociationTokensApiFp)(this.configuration).associationTokenCreate(associationTokenCreateReq, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.AssociationTokensApi = AssociationTokensApi;
/**
 * AuthMethodsApi - axios parameter creator
 * @export
 */
const AuthMethodsApiAxiosParamCreator = function (configuration) {
    return {
        /**
         * Retrieves possible authentication methods for provided username
         * @param {AuthMethodsListReq} authMethodsListReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authMethodsList: async (authMethodsListReq, options = {}) => {
            // verify required parameter 'authMethodsListReq' is not null or undefined
            (0, common_js_1.assertParamExists)('authMethodsList', 'authMethodsListReq', authMethodsListReq);
            const localVarPath = `/v1/authMethods`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(authMethodsListReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.AuthMethodsApiAxiosParamCreator = AuthMethodsApiAxiosParamCreator;
/**
 * AuthMethodsApi - functional programming interface
 * @export
 */
const AuthMethodsApiFp = function (configuration) {
    const localVarAxiosParamCreator = (0, exports.AuthMethodsApiAxiosParamCreator)(configuration);
    return {
        /**
         * Retrieves possible authentication methods for provided username
         * @param {AuthMethodsListReq} authMethodsListReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authMethodsList(authMethodsListReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.authMethodsList(authMethodsListReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['AuthMethodsApi.authMethodsList']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    };
};
exports.AuthMethodsApiFp = AuthMethodsApiFp;
/**
 * AuthMethodsApi - factory interface
 * @export
 */
const AuthMethodsApiFactory = function (configuration, basePath, axios) {
    const localVarFp = (0, exports.AuthMethodsApiFp)(configuration);
    return {
        /**
         * Retrieves possible authentication methods for provided username
         * @param {AuthMethodsListReq} authMethodsListReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authMethodsList(authMethodsListReq, options) {
            return localVarFp.authMethodsList(authMethodsListReq, options).then((request) => request(axios, basePath));
        },
    };
};
exports.AuthMethodsApiFactory = AuthMethodsApiFactory;
/**
 * AuthMethodsApi - object-oriented interface
 * @export
 * @class AuthMethodsApi
 * @extends {BaseAPI}
 */
class AuthMethodsApi extends base_js_1.BaseAPI {
    /**
     * Retrieves possible authentication methods for provided username
     * @param {AuthMethodsListReq} authMethodsListReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthMethodsApi
     */
    authMethodsList(authMethodsListReq, options) {
        return (0, exports.AuthMethodsApiFp)(this.configuration).authMethodsList(authMethodsListReq, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.AuthMethodsApi = AuthMethodsApi;
/**
 * AuthTokensApi - axios parameter creator
 * @export
 */
const AuthTokensApiAxiosParamCreator = function (configuration) {
    return {
        /**
         * Validates auth token and returns attached user data
         * @param {AuthTokenValidateReq} authTokenValidateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authTokenValidate: async (authTokenValidateReq, options = {}) => {
            // verify required parameter 'authTokenValidateReq' is not null or undefined
            (0, common_js_1.assertParamExists)('authTokenValidate', 'authTokenValidateReq', authTokenValidateReq);
            const localVarPath = `/v1/authTokens/validate`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(authTokenValidateReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.AuthTokensApiAxiosParamCreator = AuthTokensApiAxiosParamCreator;
/**
 * AuthTokensApi - functional programming interface
 * @export
 */
const AuthTokensApiFp = function (configuration) {
    const localVarAxiosParamCreator = (0, exports.AuthTokensApiAxiosParamCreator)(configuration);
    return {
        /**
         * Validates auth token and returns attached user data
         * @param {AuthTokenValidateReq} authTokenValidateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authTokenValidate(authTokenValidateReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.authTokenValidate(authTokenValidateReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['AuthTokensApi.authTokenValidate']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    };
};
exports.AuthTokensApiFp = AuthTokensApiFp;
/**
 * AuthTokensApi - factory interface
 * @export
 */
const AuthTokensApiFactory = function (configuration, basePath, axios) {
    const localVarFp = (0, exports.AuthTokensApiFp)(configuration);
    return {
        /**
         * Validates auth token and returns attached user data
         * @param {AuthTokenValidateReq} authTokenValidateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authTokenValidate(authTokenValidateReq, options) {
            return localVarFp.authTokenValidate(authTokenValidateReq, options).then((request) => request(axios, basePath));
        },
    };
};
exports.AuthTokensApiFactory = AuthTokensApiFactory;
/**
 * AuthTokensApi - object-oriented interface
 * @export
 * @class AuthTokensApi
 * @extends {BaseAPI}
 */
class AuthTokensApi extends base_js_1.BaseAPI {
    /**
     * Validates auth token and returns attached user data
     * @param {AuthTokenValidateReq} authTokenValidateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthTokensApi
     */
    authTokenValidate(authTokenValidateReq, options) {
        return (0, exports.AuthTokensApiFp)(this.configuration).authTokenValidate(authTokenValidateReq, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.AuthTokensApi = AuthTokensApi;
/**
 * EmailMagicLinksApi - axios parameter creator
 * @export
 */
const EmailMagicLinksApiAxiosParamCreator = function (configuration) {
    return {
        /**
         * Deletes an email magic link
         * @param {string} emailLinkID ID of email magic link
         * @param {EmailLinksDeleteReq} [emailLinksDeleteReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        emailLinkDelete: async (emailLinkID, emailLinksDeleteReq, options = {}) => {
            // verify required parameter 'emailLinkID' is not null or undefined
            (0, common_js_1.assertParamExists)('emailLinkDelete', 'emailLinkID', emailLinkID);
            const localVarPath = `/v1/emailLinks/{emailLinkID}`
                .replace(`{${"emailLinkID"}}`, encodeURIComponent(String(emailLinkID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(emailLinksDeleteReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Get an email magic link only one time after confirmed
         * @param {string} emailLinkID ID of email magic link
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        emailLinkGet: async (emailLinkID, options = {}) => {
            // verify required parameter 'emailLinkID' is not null or undefined
            (0, common_js_1.assertParamExists)('emailLinkGet', 'emailLinkID', emailLinkID);
            const localVarPath = `/v1/emailLinks/{emailLinkID}`
                .replace(`{${"emailLinkID"}}`, encodeURIComponent(String(emailLinkID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Creates email magic link and sends it to given email address
         * @param {EmailLinkSendReq} emailLinkSendReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        emailLinkSend: async (emailLinkSendReq, options = {}) => {
            // verify required parameter 'emailLinkSendReq' is not null or undefined
            (0, common_js_1.assertParamExists)('emailLinkSend', 'emailLinkSendReq', emailLinkSendReq);
            const localVarPath = `/v1/emailLinks`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(emailLinkSendReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Validates email magic link token
         * @param {string} emailLinkID ID of email magic link
         * @param {EmailLinksValidateReq} emailLinksValidateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        emailLinkValidate: async (emailLinkID, emailLinksValidateReq, options = {}) => {
            // verify required parameter 'emailLinkID' is not null or undefined
            (0, common_js_1.assertParamExists)('emailLinkValidate', 'emailLinkID', emailLinkID);
            // verify required parameter 'emailLinksValidateReq' is not null or undefined
            (0, common_js_1.assertParamExists)('emailLinkValidate', 'emailLinksValidateReq', emailLinksValidateReq);
            const localVarPath = `/v1/emailLinks/{emailLinkID}/validate`
                .replace(`{${"emailLinkID"}}`, encodeURIComponent(String(emailLinkID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(emailLinksValidateReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.EmailMagicLinksApiAxiosParamCreator = EmailMagicLinksApiAxiosParamCreator;
/**
 * EmailMagicLinksApi - functional programming interface
 * @export
 */
const EmailMagicLinksApiFp = function (configuration) {
    const localVarAxiosParamCreator = (0, exports.EmailMagicLinksApiAxiosParamCreator)(configuration);
    return {
        /**
         * Deletes an email magic link
         * @param {string} emailLinkID ID of email magic link
         * @param {EmailLinksDeleteReq} [emailLinksDeleteReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async emailLinkDelete(emailLinkID, emailLinksDeleteReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.emailLinkDelete(emailLinkID, emailLinksDeleteReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['EmailMagicLinksApi.emailLinkDelete']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Get an email magic link only one time after confirmed
         * @param {string} emailLinkID ID of email magic link
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async emailLinkGet(emailLinkID, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.emailLinkGet(emailLinkID, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['EmailMagicLinksApi.emailLinkGet']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Creates email magic link and sends it to given email address
         * @param {EmailLinkSendReq} emailLinkSendReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async emailLinkSend(emailLinkSendReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.emailLinkSend(emailLinkSendReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['EmailMagicLinksApi.emailLinkSend']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Validates email magic link token
         * @param {string} emailLinkID ID of email magic link
         * @param {EmailLinksValidateReq} emailLinksValidateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async emailLinkValidate(emailLinkID, emailLinksValidateReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.emailLinkValidate(emailLinkID, emailLinksValidateReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['EmailMagicLinksApi.emailLinkValidate']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    };
};
exports.EmailMagicLinksApiFp = EmailMagicLinksApiFp;
/**
 * EmailMagicLinksApi - factory interface
 * @export
 */
const EmailMagicLinksApiFactory = function (configuration, basePath, axios) {
    const localVarFp = (0, exports.EmailMagicLinksApiFp)(configuration);
    return {
        /**
         * Deletes an email magic link
         * @param {string} emailLinkID ID of email magic link
         * @param {EmailLinksDeleteReq} [emailLinksDeleteReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        emailLinkDelete(emailLinkID, emailLinksDeleteReq, options) {
            return localVarFp.emailLinkDelete(emailLinkID, emailLinksDeleteReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Get an email magic link only one time after confirmed
         * @param {string} emailLinkID ID of email magic link
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        emailLinkGet(emailLinkID, options) {
            return localVarFp.emailLinkGet(emailLinkID, options).then((request) => request(axios, basePath));
        },
        /**
         * Creates email magic link and sends it to given email address
         * @param {EmailLinkSendReq} emailLinkSendReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        emailLinkSend(emailLinkSendReq, options) {
            return localVarFp.emailLinkSend(emailLinkSendReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Validates email magic link token
         * @param {string} emailLinkID ID of email magic link
         * @param {EmailLinksValidateReq} emailLinksValidateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        emailLinkValidate(emailLinkID, emailLinksValidateReq, options) {
            return localVarFp.emailLinkValidate(emailLinkID, emailLinksValidateReq, options).then((request) => request(axios, basePath));
        },
    };
};
exports.EmailMagicLinksApiFactory = EmailMagicLinksApiFactory;
/**
 * EmailMagicLinksApi - object-oriented interface
 * @export
 * @class EmailMagicLinksApi
 * @extends {BaseAPI}
 */
class EmailMagicLinksApi extends base_js_1.BaseAPI {
    /**
     * Deletes an email magic link
     * @param {string} emailLinkID ID of email magic link
     * @param {EmailLinksDeleteReq} [emailLinksDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmailMagicLinksApi
     */
    emailLinkDelete(emailLinkID, emailLinksDeleteReq, options) {
        return (0, exports.EmailMagicLinksApiFp)(this.configuration).emailLinkDelete(emailLinkID, emailLinksDeleteReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get an email magic link only one time after confirmed
     * @param {string} emailLinkID ID of email magic link
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmailMagicLinksApi
     */
    emailLinkGet(emailLinkID, options) {
        return (0, exports.EmailMagicLinksApiFp)(this.configuration).emailLinkGet(emailLinkID, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Creates email magic link and sends it to given email address
     * @param {EmailLinkSendReq} emailLinkSendReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmailMagicLinksApi
     */
    emailLinkSend(emailLinkSendReq, options) {
        return (0, exports.EmailMagicLinksApiFp)(this.configuration).emailLinkSend(emailLinkSendReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Validates email magic link token
     * @param {string} emailLinkID ID of email magic link
     * @param {EmailLinksValidateReq} emailLinksValidateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmailMagicLinksApi
     */
    emailLinkValidate(emailLinkID, emailLinksValidateReq, options) {
        return (0, exports.EmailMagicLinksApiFp)(this.configuration).emailLinkValidate(emailLinkID, emailLinksValidateReq, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.EmailMagicLinksApi = EmailMagicLinksApi;
/**
 * EmailOTPApi - axios parameter creator
 * @export
 */
const EmailOTPApiAxiosParamCreator = function (configuration) {
    return {
        /**
         * Get an email OTP only one time after confirmed
         * @param {string} emailCodeID ID of email OTP
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        emailCodeGet: async (emailCodeID, options = {}) => {
            // verify required parameter 'emailCodeID' is not null or undefined
            (0, common_js_1.assertParamExists)('emailCodeGet', 'emailCodeID', emailCodeID);
            const localVarPath = `/v1/emailCodes/{emailCodeID}`
                .replace(`{${"emailCodeID"}}`, encodeURIComponent(String(emailCodeID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Creates email code and sends it to given email address
         * @param {EmailCodeSendReq} emailCodeSendReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        emailCodeSend: async (emailCodeSendReq, options = {}) => {
            // verify required parameter 'emailCodeSendReq' is not null or undefined
            (0, common_js_1.assertParamExists)('emailCodeSend', 'emailCodeSendReq', emailCodeSendReq);
            const localVarPath = `/v1/emailCodes`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(emailCodeSendReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Validates email code
         * @param {string} emailCodeID ID of email OTP
         * @param {EmailCodeValidateReq} emailCodeValidateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        emailCodeValidate: async (emailCodeID, emailCodeValidateReq, options = {}) => {
            // verify required parameter 'emailCodeID' is not null or undefined
            (0, common_js_1.assertParamExists)('emailCodeValidate', 'emailCodeID', emailCodeID);
            // verify required parameter 'emailCodeValidateReq' is not null or undefined
            (0, common_js_1.assertParamExists)('emailCodeValidate', 'emailCodeValidateReq', emailCodeValidateReq);
            const localVarPath = `/v1/emailCodes/{emailCodeID}/validate`
                .replace(`{${"emailCodeID"}}`, encodeURIComponent(String(emailCodeID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(emailCodeValidateReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.EmailOTPApiAxiosParamCreator = EmailOTPApiAxiosParamCreator;
/**
 * EmailOTPApi - functional programming interface
 * @export
 */
const EmailOTPApiFp = function (configuration) {
    const localVarAxiosParamCreator = (0, exports.EmailOTPApiAxiosParamCreator)(configuration);
    return {
        /**
         * Get an email OTP only one time after confirmed
         * @param {string} emailCodeID ID of email OTP
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async emailCodeGet(emailCodeID, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.emailCodeGet(emailCodeID, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['EmailOTPApi.emailCodeGet']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Creates email code and sends it to given email address
         * @param {EmailCodeSendReq} emailCodeSendReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async emailCodeSend(emailCodeSendReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.emailCodeSend(emailCodeSendReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['EmailOTPApi.emailCodeSend']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Validates email code
         * @param {string} emailCodeID ID of email OTP
         * @param {EmailCodeValidateReq} emailCodeValidateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async emailCodeValidate(emailCodeID, emailCodeValidateReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.emailCodeValidate(emailCodeID, emailCodeValidateReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['EmailOTPApi.emailCodeValidate']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    };
};
exports.EmailOTPApiFp = EmailOTPApiFp;
/**
 * EmailOTPApi - factory interface
 * @export
 */
const EmailOTPApiFactory = function (configuration, basePath, axios) {
    const localVarFp = (0, exports.EmailOTPApiFp)(configuration);
    return {
        /**
         * Get an email OTP only one time after confirmed
         * @param {string} emailCodeID ID of email OTP
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        emailCodeGet(emailCodeID, options) {
            return localVarFp.emailCodeGet(emailCodeID, options).then((request) => request(axios, basePath));
        },
        /**
         * Creates email code and sends it to given email address
         * @param {EmailCodeSendReq} emailCodeSendReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        emailCodeSend(emailCodeSendReq, options) {
            return localVarFp.emailCodeSend(emailCodeSendReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Validates email code
         * @param {string} emailCodeID ID of email OTP
         * @param {EmailCodeValidateReq} emailCodeValidateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        emailCodeValidate(emailCodeID, emailCodeValidateReq, options) {
            return localVarFp.emailCodeValidate(emailCodeID, emailCodeValidateReq, options).then((request) => request(axios, basePath));
        },
    };
};
exports.EmailOTPApiFactory = EmailOTPApiFactory;
/**
 * EmailOTPApi - object-oriented interface
 * @export
 * @class EmailOTPApi
 * @extends {BaseAPI}
 */
class EmailOTPApi extends base_js_1.BaseAPI {
    /**
     * Get an email OTP only one time after confirmed
     * @param {string} emailCodeID ID of email OTP
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmailOTPApi
     */
    emailCodeGet(emailCodeID, options) {
        return (0, exports.EmailOTPApiFp)(this.configuration).emailCodeGet(emailCodeID, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Creates email code and sends it to given email address
     * @param {EmailCodeSendReq} emailCodeSendReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmailOTPApi
     */
    emailCodeSend(emailCodeSendReq, options) {
        return (0, exports.EmailOTPApiFp)(this.configuration).emailCodeSend(emailCodeSendReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Validates email code
     * @param {string} emailCodeID ID of email OTP
     * @param {EmailCodeValidateReq} emailCodeValidateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmailOTPApi
     */
    emailCodeValidate(emailCodeID, emailCodeValidateReq, options) {
        return (0, exports.EmailOTPApiFp)(this.configuration).emailCodeValidate(emailCodeID, emailCodeValidateReq, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.EmailOTPApi = EmailOTPApi;
/**
 * EmailTemplatesApi - axios parameter creator
 * @export
 */
const EmailTemplatesApiAxiosParamCreator = function (configuration) {
    return {
        /**
         * Creates a new email template
         * @param {EmailTemplateCreateReq} emailTemplateCreateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        emailTemplateCreate: async (emailTemplateCreateReq, options = {}) => {
            // verify required parameter 'emailTemplateCreateReq' is not null or undefined
            (0, common_js_1.assertParamExists)('emailTemplateCreate', 'emailTemplateCreateReq', emailTemplateCreateReq);
            const localVarPath = `/v1/emailTemplates`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(emailTemplateCreateReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Deletes an email template
         * @param {string} emailTemplateID ID of email template
         * @param {EmailTemplateDeleteReq} emailTemplateDeleteReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        emailTemplateDelete: async (emailTemplateID, emailTemplateDeleteReq, options = {}) => {
            // verify required parameter 'emailTemplateID' is not null or undefined
            (0, common_js_1.assertParamExists)('emailTemplateDelete', 'emailTemplateID', emailTemplateID);
            // verify required parameter 'emailTemplateDeleteReq' is not null or undefined
            (0, common_js_1.assertParamExists)('emailTemplateDelete', 'emailTemplateDeleteReq', emailTemplateDeleteReq);
            const localVarPath = `/v1/emailTemplates/{emailTemplateID}`
                .replace(`{${"emailTemplateID"}}`, encodeURIComponent(String(emailTemplateID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(emailTemplateDeleteReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.EmailTemplatesApiAxiosParamCreator = EmailTemplatesApiAxiosParamCreator;
/**
 * EmailTemplatesApi - functional programming interface
 * @export
 */
const EmailTemplatesApiFp = function (configuration) {
    const localVarAxiosParamCreator = (0, exports.EmailTemplatesApiAxiosParamCreator)(configuration);
    return {
        /**
         * Creates a new email template
         * @param {EmailTemplateCreateReq} emailTemplateCreateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async emailTemplateCreate(emailTemplateCreateReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.emailTemplateCreate(emailTemplateCreateReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['EmailTemplatesApi.emailTemplateCreate']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Deletes an email template
         * @param {string} emailTemplateID ID of email template
         * @param {EmailTemplateDeleteReq} emailTemplateDeleteReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async emailTemplateDelete(emailTemplateID, emailTemplateDeleteReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.emailTemplateDelete(emailTemplateID, emailTemplateDeleteReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['EmailTemplatesApi.emailTemplateDelete']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    };
};
exports.EmailTemplatesApiFp = EmailTemplatesApiFp;
/**
 * EmailTemplatesApi - factory interface
 * @export
 */
const EmailTemplatesApiFactory = function (configuration, basePath, axios) {
    const localVarFp = (0, exports.EmailTemplatesApiFp)(configuration);
    return {
        /**
         * Creates a new email template
         * @param {EmailTemplateCreateReq} emailTemplateCreateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        emailTemplateCreate(emailTemplateCreateReq, options) {
            return localVarFp.emailTemplateCreate(emailTemplateCreateReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Deletes an email template
         * @param {string} emailTemplateID ID of email template
         * @param {EmailTemplateDeleteReq} emailTemplateDeleteReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        emailTemplateDelete(emailTemplateID, emailTemplateDeleteReq, options) {
            return localVarFp.emailTemplateDelete(emailTemplateID, emailTemplateDeleteReq, options).then((request) => request(axios, basePath));
        },
    };
};
exports.EmailTemplatesApiFactory = EmailTemplatesApiFactory;
/**
 * EmailTemplatesApi - object-oriented interface
 * @export
 * @class EmailTemplatesApi
 * @extends {BaseAPI}
 */
class EmailTemplatesApi extends base_js_1.BaseAPI {
    /**
     * Creates a new email template
     * @param {EmailTemplateCreateReq} emailTemplateCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmailTemplatesApi
     */
    emailTemplateCreate(emailTemplateCreateReq, options) {
        return (0, exports.EmailTemplatesApiFp)(this.configuration).emailTemplateCreate(emailTemplateCreateReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Deletes an email template
     * @param {string} emailTemplateID ID of email template
     * @param {EmailTemplateDeleteReq} emailTemplateDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmailTemplatesApi
     */
    emailTemplateDelete(emailTemplateID, emailTemplateDeleteReq, options) {
        return (0, exports.EmailTemplatesApiFp)(this.configuration).emailTemplateDelete(emailTemplateID, emailTemplateDeleteReq, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.EmailTemplatesApi = EmailTemplatesApi;
/**
 * ExamplesApi - axios parameter creator
 * @export
 */
const ExamplesApiAxiosParamCreator = function (configuration) {
    return {
        /**
         * Retrieves file containing the named example project
         * @param {ExampleGetFileNameEnum} fileName Name of the example to get
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        exampleGet: async (fileName, options = {}) => {
            // verify required parameter 'fileName' is not null or undefined
            (0, common_js_1.assertParamExists)('exampleGet', 'fileName', fileName);
            const localVarPath = `/v1/examples/{fileName}`
                .replace(`{${"fileName"}}`, encodeURIComponent(String(fileName)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.ExamplesApiAxiosParamCreator = ExamplesApiAxiosParamCreator;
/**
 * ExamplesApi - functional programming interface
 * @export
 */
const ExamplesApiFp = function (configuration) {
    const localVarAxiosParamCreator = (0, exports.ExamplesApiAxiosParamCreator)(configuration);
    return {
        /**
         * Retrieves file containing the named example project
         * @param {ExampleGetFileNameEnum} fileName Name of the example to get
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async exampleGet(fileName, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.exampleGet(fileName, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['ExamplesApi.exampleGet']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    };
};
exports.ExamplesApiFp = ExamplesApiFp;
/**
 * ExamplesApi - factory interface
 * @export
 */
const ExamplesApiFactory = function (configuration, basePath, axios) {
    const localVarFp = (0, exports.ExamplesApiFp)(configuration);
    return {
        /**
         * Retrieves file containing the named example project
         * @param {ExampleGetFileNameEnum} fileName Name of the example to get
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        exampleGet(fileName, options) {
            return localVarFp.exampleGet(fileName, options).then((request) => request(axios, basePath));
        },
    };
};
exports.ExamplesApiFactory = ExamplesApiFactory;
/**
 * ExamplesApi - object-oriented interface
 * @export
 * @class ExamplesApi
 * @extends {BaseAPI}
 */
class ExamplesApi extends base_js_1.BaseAPI {
    /**
     * Retrieves file containing the named example project
     * @param {ExampleGetFileNameEnum} fileName Name of the example to get
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ExamplesApi
     */
    exampleGet(fileName, options) {
        return (0, exports.ExamplesApiFp)(this.configuration).exampleGet(fileName, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.ExamplesApi = ExamplesApi;
/**
 * @export
 */
exports.ExampleGetFileNameEnum = {
    Zip: 'webcomponent-php-symfony.zip',
    TarGz: 'webcomponent-php-symfony.tar.gz'
};
/**
 * IOSAppConfigApi - axios parameter creator
 * @export
 */
const IOSAppConfigApiAxiosParamCreator = function (configuration) {
    return {
        /**
         * Creates a new iOS App Config
         * @param {IOSAppConfigSaveReq} iOSAppConfigSaveReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        iOSAppConfigCreate: async (iOSAppConfigSaveReq, options = {}) => {
            // verify required parameter 'iOSAppConfigSaveReq' is not null or undefined
            (0, common_js_1.assertParamExists)('iOSAppConfigCreate', 'iOSAppConfigSaveReq', iOSAppConfigSaveReq);
            const localVarPath = `/v1/iosappconfig`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(iOSAppConfigSaveReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Deletes an iOS App Config
         * @param {string} iosAppConfigID iOS App Config ID from create
         * @param {IOSAppConfigDeleteReq} [iOSAppConfigDeleteReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        iOSAppConfigDelete: async (iosAppConfigID, iOSAppConfigDeleteReq, options = {}) => {
            // verify required parameter 'iosAppConfigID' is not null or undefined
            (0, common_js_1.assertParamExists)('iOSAppConfigDelete', 'iosAppConfigID', iosAppConfigID);
            const localVarPath = `/v1/iosappconfig/{iosAppConfigID}`
                .replace(`{${"iosAppConfigID"}}`, encodeURIComponent(String(iosAppConfigID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(iOSAppConfigDeleteReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Lists iOS App Configs for a project
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        iOSAppConfigGet: async (options = {}) => {
            const localVarPath = `/v1/iosappconfig`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Updates an iOS app config by id
         * @param {string} iosAppConfigID ID from iOS config create
         * @param {IOSAppConfigUpdateReq} [iOSAppConfigUpdateReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        iOSAppConfigPut: async (iosAppConfigID, iOSAppConfigUpdateReq, options = {}) => {
            // verify required parameter 'iosAppConfigID' is not null or undefined
            (0, common_js_1.assertParamExists)('iOSAppConfigPut', 'iosAppConfigID', iosAppConfigID);
            const localVarPath = `/v1/iosappconfig/{iosAppConfigID}`
                .replace(`{${"iosAppConfigID"}}`, encodeURIComponent(String(iosAppConfigID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(iOSAppConfigUpdateReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.IOSAppConfigApiAxiosParamCreator = IOSAppConfigApiAxiosParamCreator;
/**
 * IOSAppConfigApi - functional programming interface
 * @export
 */
const IOSAppConfigApiFp = function (configuration) {
    const localVarAxiosParamCreator = (0, exports.IOSAppConfigApiAxiosParamCreator)(configuration);
    return {
        /**
         * Creates a new iOS App Config
         * @param {IOSAppConfigSaveReq} iOSAppConfigSaveReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async iOSAppConfigCreate(iOSAppConfigSaveReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.iOSAppConfigCreate(iOSAppConfigSaveReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['IOSAppConfigApi.iOSAppConfigCreate']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Deletes an iOS App Config
         * @param {string} iosAppConfigID iOS App Config ID from create
         * @param {IOSAppConfigDeleteReq} [iOSAppConfigDeleteReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async iOSAppConfigDelete(iosAppConfigID, iOSAppConfigDeleteReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.iOSAppConfigDelete(iosAppConfigID, iOSAppConfigDeleteReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['IOSAppConfigApi.iOSAppConfigDelete']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Lists iOS App Configs for a project
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async iOSAppConfigGet(options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.iOSAppConfigGet(options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['IOSAppConfigApi.iOSAppConfigGet']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Updates an iOS app config by id
         * @param {string} iosAppConfigID ID from iOS config create
         * @param {IOSAppConfigUpdateReq} [iOSAppConfigUpdateReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async iOSAppConfigPut(iosAppConfigID, iOSAppConfigUpdateReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.iOSAppConfigPut(iosAppConfigID, iOSAppConfigUpdateReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['IOSAppConfigApi.iOSAppConfigPut']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    };
};
exports.IOSAppConfigApiFp = IOSAppConfigApiFp;
/**
 * IOSAppConfigApi - factory interface
 * @export
 */
const IOSAppConfigApiFactory = function (configuration, basePath, axios) {
    const localVarFp = (0, exports.IOSAppConfigApiFp)(configuration);
    return {
        /**
         * Creates a new iOS App Config
         * @param {IOSAppConfigSaveReq} iOSAppConfigSaveReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        iOSAppConfigCreate(iOSAppConfigSaveReq, options) {
            return localVarFp.iOSAppConfigCreate(iOSAppConfigSaveReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Deletes an iOS App Config
         * @param {string} iosAppConfigID iOS App Config ID from create
         * @param {IOSAppConfigDeleteReq} [iOSAppConfigDeleteReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        iOSAppConfigDelete(iosAppConfigID, iOSAppConfigDeleteReq, options) {
            return localVarFp.iOSAppConfigDelete(iosAppConfigID, iOSAppConfigDeleteReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Lists iOS App Configs for a project
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        iOSAppConfigGet(options) {
            return localVarFp.iOSAppConfigGet(options).then((request) => request(axios, basePath));
        },
        /**
         * Updates an iOS app config by id
         * @param {string} iosAppConfigID ID from iOS config create
         * @param {IOSAppConfigUpdateReq} [iOSAppConfigUpdateReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        iOSAppConfigPut(iosAppConfigID, iOSAppConfigUpdateReq, options) {
            return localVarFp.iOSAppConfigPut(iosAppConfigID, iOSAppConfigUpdateReq, options).then((request) => request(axios, basePath));
        },
    };
};
exports.IOSAppConfigApiFactory = IOSAppConfigApiFactory;
/**
 * IOSAppConfigApi - object-oriented interface
 * @export
 * @class IOSAppConfigApi
 * @extends {BaseAPI}
 */
class IOSAppConfigApi extends base_js_1.BaseAPI {
    /**
     * Creates a new iOS App Config
     * @param {IOSAppConfigSaveReq} iOSAppConfigSaveReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IOSAppConfigApi
     */
    iOSAppConfigCreate(iOSAppConfigSaveReq, options) {
        return (0, exports.IOSAppConfigApiFp)(this.configuration).iOSAppConfigCreate(iOSAppConfigSaveReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Deletes an iOS App Config
     * @param {string} iosAppConfigID iOS App Config ID from create
     * @param {IOSAppConfigDeleteReq} [iOSAppConfigDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IOSAppConfigApi
     */
    iOSAppConfigDelete(iosAppConfigID, iOSAppConfigDeleteReq, options) {
        return (0, exports.IOSAppConfigApiFp)(this.configuration).iOSAppConfigDelete(iosAppConfigID, iOSAppConfigDeleteReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Lists iOS App Configs for a project
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IOSAppConfigApi
     */
    iOSAppConfigGet(options) {
        return (0, exports.IOSAppConfigApiFp)(this.configuration).iOSAppConfigGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Updates an iOS app config by id
     * @param {string} iosAppConfigID ID from iOS config create
     * @param {IOSAppConfigUpdateReq} [iOSAppConfigUpdateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IOSAppConfigApi
     */
    iOSAppConfigPut(iosAppConfigID, iOSAppConfigUpdateReq, options) {
        return (0, exports.IOSAppConfigApiFp)(this.configuration).iOSAppConfigPut(iosAppConfigID, iOSAppConfigUpdateReq, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.IOSAppConfigApi = IOSAppConfigApi;
/**
 * LongSessionsApi - axios parameter creator
 * @export
 */
const LongSessionsApiAxiosParamCreator = function (configuration) {
    return {
        /**
         * Get a long session by sessionID
         * @param {string} sessionID ID of session
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        longSessionGet: async (sessionID, options = {}) => {
            // verify required parameter 'sessionID' is not null or undefined
            (0, common_js_1.assertParamExists)('longSessionGet', 'sessionID', sessionID);
            const localVarPath = `/v1/longSessions/{sessionID}`
                .replace(`{${"sessionID"}}`, encodeURIComponent(String(sessionID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Lists long sessions by provided filters
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        longSessionList: async (remoteAddress, userAgent, sort, filter, page, pageSize, options = {}) => {
            const localVarPath = `/v1/longSessions`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            if (remoteAddress !== undefined) {
                localVarQueryParameter['remoteAddress'] = remoteAddress;
            }
            if (userAgent !== undefined) {
                localVarQueryParameter['userAgent'] = userAgent;
            }
            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
            }
            if (filter) {
                localVarQueryParameter['filter[]'] = filter;
            }
            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }
            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Revokes an active long session by sessionID
         * @param {string} sessionID ID of session
         * @param {LongSessionRevokeReq} [longSessionRevokeReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        longSessionRevoke: async (sessionID, longSessionRevokeReq, options = {}) => {
            // verify required parameter 'sessionID' is not null or undefined
            (0, common_js_1.assertParamExists)('longSessionRevoke', 'sessionID', sessionID);
            const localVarPath = `/v1/longSessions/{sessionID}/revoke`
                .replace(`{${"sessionID"}}`, encodeURIComponent(String(sessionID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(longSessionRevokeReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.LongSessionsApiAxiosParamCreator = LongSessionsApiAxiosParamCreator;
/**
 * LongSessionsApi - functional programming interface
 * @export
 */
const LongSessionsApiFp = function (configuration) {
    const localVarAxiosParamCreator = (0, exports.LongSessionsApiAxiosParamCreator)(configuration);
    return {
        /**
         * Get a long session by sessionID
         * @param {string} sessionID ID of session
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async longSessionGet(sessionID, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.longSessionGet(sessionID, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['LongSessionsApi.longSessionGet']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Lists long sessions by provided filters
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async longSessionList(remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.longSessionList(remoteAddress, userAgent, sort, filter, page, pageSize, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['LongSessionsApi.longSessionList']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Revokes an active long session by sessionID
         * @param {string} sessionID ID of session
         * @param {LongSessionRevokeReq} [longSessionRevokeReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async longSessionRevoke(sessionID, longSessionRevokeReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.longSessionRevoke(sessionID, longSessionRevokeReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['LongSessionsApi.longSessionRevoke']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    };
};
exports.LongSessionsApiFp = LongSessionsApiFp;
/**
 * LongSessionsApi - factory interface
 * @export
 */
const LongSessionsApiFactory = function (configuration, basePath, axios) {
    const localVarFp = (0, exports.LongSessionsApiFp)(configuration);
    return {
        /**
         * Get a long session by sessionID
         * @param {string} sessionID ID of session
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        longSessionGet(sessionID, options) {
            return localVarFp.longSessionGet(sessionID, options).then((request) => request(axios, basePath));
        },
        /**
         * Lists long sessions by provided filters
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        longSessionList(remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            return localVarFp.longSessionList(remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(axios, basePath));
        },
        /**
         * Revokes an active long session by sessionID
         * @param {string} sessionID ID of session
         * @param {LongSessionRevokeReq} [longSessionRevokeReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        longSessionRevoke(sessionID, longSessionRevokeReq, options) {
            return localVarFp.longSessionRevoke(sessionID, longSessionRevokeReq, options).then((request) => request(axios, basePath));
        },
    };
};
exports.LongSessionsApiFactory = LongSessionsApiFactory;
/**
 * LongSessionsApi - object-oriented interface
 * @export
 * @class LongSessionsApi
 * @extends {BaseAPI}
 */
class LongSessionsApi extends base_js_1.BaseAPI {
    /**
     * Get a long session by sessionID
     * @param {string} sessionID ID of session
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LongSessionsApi
     */
    longSessionGet(sessionID, options) {
        return (0, exports.LongSessionsApiFp)(this.configuration).longSessionGet(sessionID, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Lists long sessions by provided filters
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {string} [sort] Field sorting
     * @param {Array<string>} [filter] Field filtering
     * @param {number} [page] Page number
     * @param {number} [pageSize] Number of items per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LongSessionsApi
     */
    longSessionList(remoteAddress, userAgent, sort, filter, page, pageSize, options) {
        return (0, exports.LongSessionsApiFp)(this.configuration).longSessionList(remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Revokes an active long session by sessionID
     * @param {string} sessionID ID of session
     * @param {LongSessionRevokeReq} [longSessionRevokeReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LongSessionsApi
     */
    longSessionRevoke(sessionID, longSessionRevokeReq, options) {
        return (0, exports.LongSessionsApiFp)(this.configuration).longSessionRevoke(sessionID, longSessionRevokeReq, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.LongSessionsApi = LongSessionsApi;
/**
 * PasskeysBiometricsApi - axios parameter creator
 * @export
 */
const PasskeysBiometricsApiAxiosParamCreator = function (configuration) {
    return {
        /**
         * Starts association token flow for Passkeys (Biometrics)
         * @param {WebAuthnAssociateStartReq} webAuthnAssociateStartReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnAssociateStart: async (webAuthnAssociateStartReq, options = {}) => {
            // verify required parameter 'webAuthnAssociateStartReq' is not null or undefined
            (0, common_js_1.assertParamExists)('webAuthnAssociateStart', 'webAuthnAssociateStartReq', webAuthnAssociateStartReq);
            const localVarPath = `/v1/webauthn/associate/start`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(webAuthnAssociateStartReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Completes authentication of a user for Passkeys (Biometrics)
         * @param {WebAuthnFinishReq} webAuthnFinishReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnAuthenticateFinish: async (webAuthnFinishReq, options = {}) => {
            // verify required parameter 'webAuthnFinishReq' is not null or undefined
            (0, common_js_1.assertParamExists)('webAuthnAuthenticateFinish', 'webAuthnFinishReq', webAuthnFinishReq);
            const localVarPath = `/v1/webauthn/authenticate/finish`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(webAuthnFinishReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Starts authentication of a user for Passkeys (Biometrics)
         * @param {WebAuthnAuthenticateStartReq} webAuthnAuthenticateStartReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnAuthenticateStart: async (webAuthnAuthenticateStartReq, options = {}) => {
            // verify required parameter 'webAuthnAuthenticateStartReq' is not null or undefined
            (0, common_js_1.assertParamExists)('webAuthnAuthenticateStart', 'webAuthnAuthenticateStartReq', webAuthnAuthenticateStartReq);
            const localVarPath = `/v1/webauthn/authenticate/start`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(webAuthnAuthenticateStartReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Update authenticator
         * @param {string} authenticatorID ID of authenticator
         * @param {WebAuthnAuthenticatorUpdateReq} webAuthnAuthenticatorUpdateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnAuthenticatorUpdate: async (authenticatorID, webAuthnAuthenticatorUpdateReq, options = {}) => {
            // verify required parameter 'authenticatorID' is not null or undefined
            (0, common_js_1.assertParamExists)('webAuthnAuthenticatorUpdate', 'authenticatorID', authenticatorID);
            // verify required parameter 'webAuthnAuthenticatorUpdateReq' is not null or undefined
            (0, common_js_1.assertParamExists)('webAuthnAuthenticatorUpdate', 'webAuthnAuthenticatorUpdateReq', webAuthnAuthenticatorUpdateReq);
            const localVarPath = `/v1/webauthn/authenticator/{authenticatorID}`
                .replace(`{${"authenticatorID"}}`, encodeURIComponent(String(authenticatorID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(webAuthnAuthenticatorUpdateReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Delete credential
         * @param {string} userID ID of user
         * @param {string} credentialID ID of credential
         * @param {EmptyReq} emptyReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnCredentialDelete: async (userID, credentialID, emptyReq, options = {}) => {
            // verify required parameter 'userID' is not null or undefined
            (0, common_js_1.assertParamExists)('webAuthnCredentialDelete', 'userID', userID);
            // verify required parameter 'credentialID' is not null or undefined
            (0, common_js_1.assertParamExists)('webAuthnCredentialDelete', 'credentialID', credentialID);
            // verify required parameter 'emptyReq' is not null or undefined
            (0, common_js_1.assertParamExists)('webAuthnCredentialDelete', 'emptyReq', emptyReq);
            const localVarPath = `/v1/users/{userID}/credentials/{credentialID}`
                .replace(`{${"userID"}}`, encodeURIComponent(String(userID)))
                .replace(`{${"credentialID"}}`, encodeURIComponent(String(credentialID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(emptyReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Checks if active webauthn credential exists for provided user and device
         * @param {WebAuthnCredentialExistsReq} webAuthnCredentialExistsReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnCredentialExists: async (webAuthnCredentialExistsReq, options = {}) => {
            // verify required parameter 'webAuthnCredentialExistsReq' is not null or undefined
            (0, common_js_1.assertParamExists)('webAuthnCredentialExists', 'webAuthnCredentialExistsReq', webAuthnCredentialExistsReq);
            const localVarPath = `/v1/webauthn/credential/exists`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(webAuthnCredentialExistsReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Lists webauthn credentials users
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnCredentialList: async (remoteAddress, userAgent, sort, filter, page, pageSize, options = {}) => {
            const localVarPath = `/v1/webauthn/credential`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            if (remoteAddress !== undefined) {
                localVarQueryParameter['remoteAddress'] = remoteAddress;
            }
            if (userAgent !== undefined) {
                localVarQueryParameter['userAgent'] = userAgent;
            }
            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
            }
            if (filter) {
                localVarQueryParameter['filter[]'] = filter;
            }
            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }
            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Update credential
         * @param {string} credentialID ID of credential
         * @param {WebAuthnCredentialReq} webAuthnCredentialReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnCredentialUpdate: async (credentialID, webAuthnCredentialReq, options = {}) => {
            // verify required parameter 'credentialID' is not null or undefined
            (0, common_js_1.assertParamExists)('webAuthnCredentialUpdate', 'credentialID', credentialID);
            // verify required parameter 'webAuthnCredentialReq' is not null or undefined
            (0, common_js_1.assertParamExists)('webAuthnCredentialUpdate', 'webAuthnCredentialReq', webAuthnCredentialReq);
            const localVarPath = `/v1/webauthn/credential/{credentialID}`
                .replace(`{${"credentialID"}}`, encodeURIComponent(String(credentialID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(webAuthnCredentialReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Starts mediation for Passkeys (Biometrics)
         * @param {WebAuthnMediationStartReq} webAuthnMediationStartReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnMediationStart: async (webAuthnMediationStartReq, options = {}) => {
            // verify required parameter 'webAuthnMediationStartReq' is not null or undefined
            (0, common_js_1.assertParamExists)('webAuthnMediationStart', 'webAuthnMediationStartReq', webAuthnMediationStartReq);
            const localVarPath = `/v1/webauthn/mediation/start`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(webAuthnMediationStartReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Completes registration of a user for Passkeys (Biometrics)
         * @param {WebAuthnFinishReq} webAuthnFinishReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnRegisterFinish: async (webAuthnFinishReq, options = {}) => {
            // verify required parameter 'webAuthnFinishReq' is not null or undefined
            (0, common_js_1.assertParamExists)('webAuthnRegisterFinish', 'webAuthnFinishReq', webAuthnFinishReq);
            const localVarPath = `/v1/webauthn/register/finish`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(webAuthnFinishReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Starts registration of a user for Passkeys (Biometrics)
         * @param {WebAuthnRegisterStartReq} [webAuthnRegisterStartReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnRegisterStart: async (webAuthnRegisterStartReq, options = {}) => {
            const localVarPath = `/v1/webauthn/register/start`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(webAuthnRegisterStartReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Creates a new setting for Passkeys (Biometrics)
         * @param {WebauthnSettingCreateReq} [webauthnSettingCreateReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnSettingCreate: async (webauthnSettingCreateReq, options = {}) => {
            const localVarPath = `/v1/webauthn/settings`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(webauthnSettingCreateReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Deletes a setting by id for Passkeys (Biometrics)
         * @param {string} settingID ID from create
         * @param {WebauthnSettingDeleteReq} [webauthnSettingDeleteReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnSettingDelete: async (settingID, webauthnSettingDeleteReq, options = {}) => {
            // verify required parameter 'settingID' is not null or undefined
            (0, common_js_1.assertParamExists)('webAuthnSettingDelete', 'settingID', settingID);
            const localVarPath = `/v1/webauthn/settings/{settingID}`
                .replace(`{${"settingID"}}`, encodeURIComponent(String(settingID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(webauthnSettingDeleteReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Gets a setting by id for Passkeys (Biometrics)
         * @param {string} settingID ID from create
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnSettingGet: async (settingID, options = {}) => {
            // verify required parameter 'settingID' is not null or undefined
            (0, common_js_1.assertParamExists)('webAuthnSettingGet', 'settingID', settingID);
            const localVarPath = `/v1/webauthn/settings/{settingID}`
                .replace(`{${"settingID"}}`, encodeURIComponent(String(settingID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Lists all settings for Passkeys (Biometrics)
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnSettingList: async (remoteAddress, userAgent, sort, filter, page, pageSize, options = {}) => {
            const localVarPath = `/v1/webauthn/settings`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            if (remoteAddress !== undefined) {
                localVarQueryParameter['remoteAddress'] = remoteAddress;
            }
            if (userAgent !== undefined) {
                localVarQueryParameter['userAgent'] = userAgent;
            }
            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
            }
            if (filter) {
                localVarQueryParameter['filter[]'] = filter;
            }
            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }
            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Updates a setting by id for Passkeys (Biometrics)
         * @param {string} settingID ID from create
         * @param {WebauthnSettingUpdateReq} [webauthnSettingUpdateReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnSettingPut: async (settingID, webauthnSettingUpdateReq, options = {}) => {
            // verify required parameter 'settingID' is not null or undefined
            (0, common_js_1.assertParamExists)('webAuthnSettingPut', 'settingID', settingID);
            const localVarPath = `/v1/webauthn/settings/{settingID}`
                .replace(`{${"settingID"}}`, encodeURIComponent(String(settingID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(webauthnSettingUpdateReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.PasskeysBiometricsApiAxiosParamCreator = PasskeysBiometricsApiAxiosParamCreator;
/**
 * PasskeysBiometricsApi - functional programming interface
 * @export
 */
const PasskeysBiometricsApiFp = function (configuration) {
    const localVarAxiosParamCreator = (0, exports.PasskeysBiometricsApiAxiosParamCreator)(configuration);
    return {
        /**
         * Starts association token flow for Passkeys (Biometrics)
         * @param {WebAuthnAssociateStartReq} webAuthnAssociateStartReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async webAuthnAssociateStart(webAuthnAssociateStartReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.webAuthnAssociateStart(webAuthnAssociateStartReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['PasskeysBiometricsApi.webAuthnAssociateStart']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Completes authentication of a user for Passkeys (Biometrics)
         * @param {WebAuthnFinishReq} webAuthnFinishReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async webAuthnAuthenticateFinish(webAuthnFinishReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.webAuthnAuthenticateFinish(webAuthnFinishReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['PasskeysBiometricsApi.webAuthnAuthenticateFinish']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Starts authentication of a user for Passkeys (Biometrics)
         * @param {WebAuthnAuthenticateStartReq} webAuthnAuthenticateStartReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async webAuthnAuthenticateStart(webAuthnAuthenticateStartReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.webAuthnAuthenticateStart(webAuthnAuthenticateStartReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['PasskeysBiometricsApi.webAuthnAuthenticateStart']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Update authenticator
         * @param {string} authenticatorID ID of authenticator
         * @param {WebAuthnAuthenticatorUpdateReq} webAuthnAuthenticatorUpdateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async webAuthnAuthenticatorUpdate(authenticatorID, webAuthnAuthenticatorUpdateReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.webAuthnAuthenticatorUpdate(authenticatorID, webAuthnAuthenticatorUpdateReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['PasskeysBiometricsApi.webAuthnAuthenticatorUpdate']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Delete credential
         * @param {string} userID ID of user
         * @param {string} credentialID ID of credential
         * @param {EmptyReq} emptyReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async webAuthnCredentialDelete(userID, credentialID, emptyReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.webAuthnCredentialDelete(userID, credentialID, emptyReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['PasskeysBiometricsApi.webAuthnCredentialDelete']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Checks if active webauthn credential exists for provided user and device
         * @param {WebAuthnCredentialExistsReq} webAuthnCredentialExistsReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async webAuthnCredentialExists(webAuthnCredentialExistsReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.webAuthnCredentialExists(webAuthnCredentialExistsReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['PasskeysBiometricsApi.webAuthnCredentialExists']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Lists webauthn credentials users
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async webAuthnCredentialList(remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.webAuthnCredentialList(remoteAddress, userAgent, sort, filter, page, pageSize, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['PasskeysBiometricsApi.webAuthnCredentialList']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Update credential
         * @param {string} credentialID ID of credential
         * @param {WebAuthnCredentialReq} webAuthnCredentialReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async webAuthnCredentialUpdate(credentialID, webAuthnCredentialReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.webAuthnCredentialUpdate(credentialID, webAuthnCredentialReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['PasskeysBiometricsApi.webAuthnCredentialUpdate']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Starts mediation for Passkeys (Biometrics)
         * @param {WebAuthnMediationStartReq} webAuthnMediationStartReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async webAuthnMediationStart(webAuthnMediationStartReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.webAuthnMediationStart(webAuthnMediationStartReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['PasskeysBiometricsApi.webAuthnMediationStart']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Completes registration of a user for Passkeys (Biometrics)
         * @param {WebAuthnFinishReq} webAuthnFinishReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async webAuthnRegisterFinish(webAuthnFinishReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.webAuthnRegisterFinish(webAuthnFinishReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['PasskeysBiometricsApi.webAuthnRegisterFinish']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Starts registration of a user for Passkeys (Biometrics)
         * @param {WebAuthnRegisterStartReq} [webAuthnRegisterStartReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async webAuthnRegisterStart(webAuthnRegisterStartReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.webAuthnRegisterStart(webAuthnRegisterStartReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['PasskeysBiometricsApi.webAuthnRegisterStart']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Creates a new setting for Passkeys (Biometrics)
         * @param {WebauthnSettingCreateReq} [webauthnSettingCreateReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async webAuthnSettingCreate(webauthnSettingCreateReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.webAuthnSettingCreate(webauthnSettingCreateReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['PasskeysBiometricsApi.webAuthnSettingCreate']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Deletes a setting by id for Passkeys (Biometrics)
         * @param {string} settingID ID from create
         * @param {WebauthnSettingDeleteReq} [webauthnSettingDeleteReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async webAuthnSettingDelete(settingID, webauthnSettingDeleteReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.webAuthnSettingDelete(settingID, webauthnSettingDeleteReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['PasskeysBiometricsApi.webAuthnSettingDelete']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Gets a setting by id for Passkeys (Biometrics)
         * @param {string} settingID ID from create
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async webAuthnSettingGet(settingID, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.webAuthnSettingGet(settingID, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['PasskeysBiometricsApi.webAuthnSettingGet']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Lists all settings for Passkeys (Biometrics)
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async webAuthnSettingList(remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.webAuthnSettingList(remoteAddress, userAgent, sort, filter, page, pageSize, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['PasskeysBiometricsApi.webAuthnSettingList']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Updates a setting by id for Passkeys (Biometrics)
         * @param {string} settingID ID from create
         * @param {WebauthnSettingUpdateReq} [webauthnSettingUpdateReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async webAuthnSettingPut(settingID, webauthnSettingUpdateReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.webAuthnSettingPut(settingID, webauthnSettingUpdateReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['PasskeysBiometricsApi.webAuthnSettingPut']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    };
};
exports.PasskeysBiometricsApiFp = PasskeysBiometricsApiFp;
/**
 * PasskeysBiometricsApi - factory interface
 * @export
 */
const PasskeysBiometricsApiFactory = function (configuration, basePath, axios) {
    const localVarFp = (0, exports.PasskeysBiometricsApiFp)(configuration);
    return {
        /**
         * Starts association token flow for Passkeys (Biometrics)
         * @param {WebAuthnAssociateStartReq} webAuthnAssociateStartReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnAssociateStart(webAuthnAssociateStartReq, options) {
            return localVarFp.webAuthnAssociateStart(webAuthnAssociateStartReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Completes authentication of a user for Passkeys (Biometrics)
         * @param {WebAuthnFinishReq} webAuthnFinishReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnAuthenticateFinish(webAuthnFinishReq, options) {
            return localVarFp.webAuthnAuthenticateFinish(webAuthnFinishReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Starts authentication of a user for Passkeys (Biometrics)
         * @param {WebAuthnAuthenticateStartReq} webAuthnAuthenticateStartReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnAuthenticateStart(webAuthnAuthenticateStartReq, options) {
            return localVarFp.webAuthnAuthenticateStart(webAuthnAuthenticateStartReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Update authenticator
         * @param {string} authenticatorID ID of authenticator
         * @param {WebAuthnAuthenticatorUpdateReq} webAuthnAuthenticatorUpdateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnAuthenticatorUpdate(authenticatorID, webAuthnAuthenticatorUpdateReq, options) {
            return localVarFp.webAuthnAuthenticatorUpdate(authenticatorID, webAuthnAuthenticatorUpdateReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete credential
         * @param {string} userID ID of user
         * @param {string} credentialID ID of credential
         * @param {EmptyReq} emptyReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnCredentialDelete(userID, credentialID, emptyReq, options) {
            return localVarFp.webAuthnCredentialDelete(userID, credentialID, emptyReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Checks if active webauthn credential exists for provided user and device
         * @param {WebAuthnCredentialExistsReq} webAuthnCredentialExistsReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnCredentialExists(webAuthnCredentialExistsReq, options) {
            return localVarFp.webAuthnCredentialExists(webAuthnCredentialExistsReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Lists webauthn credentials users
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnCredentialList(remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            return localVarFp.webAuthnCredentialList(remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(axios, basePath));
        },
        /**
         * Update credential
         * @param {string} credentialID ID of credential
         * @param {WebAuthnCredentialReq} webAuthnCredentialReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnCredentialUpdate(credentialID, webAuthnCredentialReq, options) {
            return localVarFp.webAuthnCredentialUpdate(credentialID, webAuthnCredentialReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Starts mediation for Passkeys (Biometrics)
         * @param {WebAuthnMediationStartReq} webAuthnMediationStartReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnMediationStart(webAuthnMediationStartReq, options) {
            return localVarFp.webAuthnMediationStart(webAuthnMediationStartReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Completes registration of a user for Passkeys (Biometrics)
         * @param {WebAuthnFinishReq} webAuthnFinishReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnRegisterFinish(webAuthnFinishReq, options) {
            return localVarFp.webAuthnRegisterFinish(webAuthnFinishReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Starts registration of a user for Passkeys (Biometrics)
         * @param {WebAuthnRegisterStartReq} [webAuthnRegisterStartReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnRegisterStart(webAuthnRegisterStartReq, options) {
            return localVarFp.webAuthnRegisterStart(webAuthnRegisterStartReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Creates a new setting for Passkeys (Biometrics)
         * @param {WebauthnSettingCreateReq} [webauthnSettingCreateReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnSettingCreate(webauthnSettingCreateReq, options) {
            return localVarFp.webAuthnSettingCreate(webauthnSettingCreateReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Deletes a setting by id for Passkeys (Biometrics)
         * @param {string} settingID ID from create
         * @param {WebauthnSettingDeleteReq} [webauthnSettingDeleteReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnSettingDelete(settingID, webauthnSettingDeleteReq, options) {
            return localVarFp.webAuthnSettingDelete(settingID, webauthnSettingDeleteReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Gets a setting by id for Passkeys (Biometrics)
         * @param {string} settingID ID from create
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnSettingGet(settingID, options) {
            return localVarFp.webAuthnSettingGet(settingID, options).then((request) => request(axios, basePath));
        },
        /**
         * Lists all settings for Passkeys (Biometrics)
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnSettingList(remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            return localVarFp.webAuthnSettingList(remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(axios, basePath));
        },
        /**
         * Updates a setting by id for Passkeys (Biometrics)
         * @param {string} settingID ID from create
         * @param {WebauthnSettingUpdateReq} [webauthnSettingUpdateReq]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webAuthnSettingPut(settingID, webauthnSettingUpdateReq, options) {
            return localVarFp.webAuthnSettingPut(settingID, webauthnSettingUpdateReq, options).then((request) => request(axios, basePath));
        },
    };
};
exports.PasskeysBiometricsApiFactory = PasskeysBiometricsApiFactory;
/**
 * PasskeysBiometricsApi - object-oriented interface
 * @export
 * @class PasskeysBiometricsApi
 * @extends {BaseAPI}
 */
class PasskeysBiometricsApi extends base_js_1.BaseAPI {
    /**
     * Starts association token flow for Passkeys (Biometrics)
     * @param {WebAuthnAssociateStartReq} webAuthnAssociateStartReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnAssociateStart(webAuthnAssociateStartReq, options) {
        return (0, exports.PasskeysBiometricsApiFp)(this.configuration).webAuthnAssociateStart(webAuthnAssociateStartReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Completes authentication of a user for Passkeys (Biometrics)
     * @param {WebAuthnFinishReq} webAuthnFinishReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnAuthenticateFinish(webAuthnFinishReq, options) {
        return (0, exports.PasskeysBiometricsApiFp)(this.configuration).webAuthnAuthenticateFinish(webAuthnFinishReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Starts authentication of a user for Passkeys (Biometrics)
     * @param {WebAuthnAuthenticateStartReq} webAuthnAuthenticateStartReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnAuthenticateStart(webAuthnAuthenticateStartReq, options) {
        return (0, exports.PasskeysBiometricsApiFp)(this.configuration).webAuthnAuthenticateStart(webAuthnAuthenticateStartReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Update authenticator
     * @param {string} authenticatorID ID of authenticator
     * @param {WebAuthnAuthenticatorUpdateReq} webAuthnAuthenticatorUpdateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnAuthenticatorUpdate(authenticatorID, webAuthnAuthenticatorUpdateReq, options) {
        return (0, exports.PasskeysBiometricsApiFp)(this.configuration).webAuthnAuthenticatorUpdate(authenticatorID, webAuthnAuthenticatorUpdateReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Delete credential
     * @param {string} userID ID of user
     * @param {string} credentialID ID of credential
     * @param {EmptyReq} emptyReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnCredentialDelete(userID, credentialID, emptyReq, options) {
        return (0, exports.PasskeysBiometricsApiFp)(this.configuration).webAuthnCredentialDelete(userID, credentialID, emptyReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Checks if active webauthn credential exists for provided user and device
     * @param {WebAuthnCredentialExistsReq} webAuthnCredentialExistsReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnCredentialExists(webAuthnCredentialExistsReq, options) {
        return (0, exports.PasskeysBiometricsApiFp)(this.configuration).webAuthnCredentialExists(webAuthnCredentialExistsReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Lists webauthn credentials users
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {string} [sort] Field sorting
     * @param {Array<string>} [filter] Field filtering
     * @param {number} [page] Page number
     * @param {number} [pageSize] Number of items per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnCredentialList(remoteAddress, userAgent, sort, filter, page, pageSize, options) {
        return (0, exports.PasskeysBiometricsApiFp)(this.configuration).webAuthnCredentialList(remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Update credential
     * @param {string} credentialID ID of credential
     * @param {WebAuthnCredentialReq} webAuthnCredentialReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnCredentialUpdate(credentialID, webAuthnCredentialReq, options) {
        return (0, exports.PasskeysBiometricsApiFp)(this.configuration).webAuthnCredentialUpdate(credentialID, webAuthnCredentialReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Starts mediation for Passkeys (Biometrics)
     * @param {WebAuthnMediationStartReq} webAuthnMediationStartReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnMediationStart(webAuthnMediationStartReq, options) {
        return (0, exports.PasskeysBiometricsApiFp)(this.configuration).webAuthnMediationStart(webAuthnMediationStartReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Completes registration of a user for Passkeys (Biometrics)
     * @param {WebAuthnFinishReq} webAuthnFinishReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnRegisterFinish(webAuthnFinishReq, options) {
        return (0, exports.PasskeysBiometricsApiFp)(this.configuration).webAuthnRegisterFinish(webAuthnFinishReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Starts registration of a user for Passkeys (Biometrics)
     * @param {WebAuthnRegisterStartReq} [webAuthnRegisterStartReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnRegisterStart(webAuthnRegisterStartReq, options) {
        return (0, exports.PasskeysBiometricsApiFp)(this.configuration).webAuthnRegisterStart(webAuthnRegisterStartReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Creates a new setting for Passkeys (Biometrics)
     * @param {WebauthnSettingCreateReq} [webauthnSettingCreateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnSettingCreate(webauthnSettingCreateReq, options) {
        return (0, exports.PasskeysBiometricsApiFp)(this.configuration).webAuthnSettingCreate(webauthnSettingCreateReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Deletes a setting by id for Passkeys (Biometrics)
     * @param {string} settingID ID from create
     * @param {WebauthnSettingDeleteReq} [webauthnSettingDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnSettingDelete(settingID, webauthnSettingDeleteReq, options) {
        return (0, exports.PasskeysBiometricsApiFp)(this.configuration).webAuthnSettingDelete(settingID, webauthnSettingDeleteReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Gets a setting by id for Passkeys (Biometrics)
     * @param {string} settingID ID from create
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnSettingGet(settingID, options) {
        return (0, exports.PasskeysBiometricsApiFp)(this.configuration).webAuthnSettingGet(settingID, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Lists all settings for Passkeys (Biometrics)
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {string} [sort] Field sorting
     * @param {Array<string>} [filter] Field filtering
     * @param {number} [page] Page number
     * @param {number} [pageSize] Number of items per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnSettingList(remoteAddress, userAgent, sort, filter, page, pageSize, options) {
        return (0, exports.PasskeysBiometricsApiFp)(this.configuration).webAuthnSettingList(remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Updates a setting by id for Passkeys (Biometrics)
     * @param {string} settingID ID from create
     * @param {WebauthnSettingUpdateReq} [webauthnSettingUpdateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnSettingPut(settingID, webauthnSettingUpdateReq, options) {
        return (0, exports.PasskeysBiometricsApiFp)(this.configuration).webAuthnSettingPut(settingID, webauthnSettingUpdateReq, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.PasskeysBiometricsApi = PasskeysBiometricsApi;
/**
 * ProjectConfigApi - axios parameter creator
 * @export
 */
const ProjectConfigApiAxiosParamCreator = function (configuration) {
    return {
        /**
         * Activates the project
         * @param {EmptyReq} emptyReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        projectActivate: async (emptyReq, options = {}) => {
            // verify required parameter 'emptyReq' is not null or undefined
            (0, common_js_1.assertParamExists)('projectActivate', 'emptyReq', emptyReq);
            const localVarPath = `/v1/projects/activate`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(emptyReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Retrieves project config by projectID inferred from authentication
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        projectConfigGet: async (options = {}) => {
            const localVarPath = `/v1/projectConfig`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Saves project config
         * @param {ProjectConfigSaveReq} projectConfigSaveReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        projectConfigSave: async (projectConfigSaveReq, options = {}) => {
            // verify required parameter 'projectConfigSaveReq' is not null or undefined
            (0, common_js_1.assertParamExists)('projectConfigSave', 'projectConfigSaveReq', projectConfigSaveReq);
            const localVarPath = `/v1/projectConfig`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(projectConfigSaveReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Tests webhook backend
         * @param {ProjectConfigWebhookTestReq} projectConfigWebhookTestReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        projectConfigWebhookTest: async (projectConfigWebhookTestReq, options = {}) => {
            // verify required parameter 'projectConfigWebhookTestReq' is not null or undefined
            (0, common_js_1.assertParamExists)('projectConfigWebhookTest', 'projectConfigWebhookTestReq', projectConfigWebhookTestReq);
            const localVarPath = `/v1/projectConfig/testWebhook`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(projectConfigWebhookTestReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.ProjectConfigApiAxiosParamCreator = ProjectConfigApiAxiosParamCreator;
/**
 * ProjectConfigApi - functional programming interface
 * @export
 */
const ProjectConfigApiFp = function (configuration) {
    const localVarAxiosParamCreator = (0, exports.ProjectConfigApiAxiosParamCreator)(configuration);
    return {
        /**
         * Activates the project
         * @param {EmptyReq} emptyReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async projectActivate(emptyReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.projectActivate(emptyReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['ProjectConfigApi.projectActivate']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Retrieves project config by projectID inferred from authentication
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async projectConfigGet(options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.projectConfigGet(options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['ProjectConfigApi.projectConfigGet']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Saves project config
         * @param {ProjectConfigSaveReq} projectConfigSaveReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async projectConfigSave(projectConfigSaveReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.projectConfigSave(projectConfigSaveReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['ProjectConfigApi.projectConfigSave']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Tests webhook backend
         * @param {ProjectConfigWebhookTestReq} projectConfigWebhookTestReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async projectConfigWebhookTest(projectConfigWebhookTestReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.projectConfigWebhookTest(projectConfigWebhookTestReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['ProjectConfigApi.projectConfigWebhookTest']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    };
};
exports.ProjectConfigApiFp = ProjectConfigApiFp;
/**
 * ProjectConfigApi - factory interface
 * @export
 */
const ProjectConfigApiFactory = function (configuration, basePath, axios) {
    const localVarFp = (0, exports.ProjectConfigApiFp)(configuration);
    return {
        /**
         * Activates the project
         * @param {EmptyReq} emptyReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        projectActivate(emptyReq, options) {
            return localVarFp.projectActivate(emptyReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieves project config by projectID inferred from authentication
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        projectConfigGet(options) {
            return localVarFp.projectConfigGet(options).then((request) => request(axios, basePath));
        },
        /**
         * Saves project config
         * @param {ProjectConfigSaveReq} projectConfigSaveReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        projectConfigSave(projectConfigSaveReq, options) {
            return localVarFp.projectConfigSave(projectConfigSaveReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Tests webhook backend
         * @param {ProjectConfigWebhookTestReq} projectConfigWebhookTestReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        projectConfigWebhookTest(projectConfigWebhookTestReq, options) {
            return localVarFp.projectConfigWebhookTest(projectConfigWebhookTestReq, options).then((request) => request(axios, basePath));
        },
    };
};
exports.ProjectConfigApiFactory = ProjectConfigApiFactory;
/**
 * ProjectConfigApi - object-oriented interface
 * @export
 * @class ProjectConfigApi
 * @extends {BaseAPI}
 */
class ProjectConfigApi extends base_js_1.BaseAPI {
    /**
     * Activates the project
     * @param {EmptyReq} emptyReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProjectConfigApi
     */
    projectActivate(emptyReq, options) {
        return (0, exports.ProjectConfigApiFp)(this.configuration).projectActivate(emptyReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Retrieves project config by projectID inferred from authentication
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProjectConfigApi
     */
    projectConfigGet(options) {
        return (0, exports.ProjectConfigApiFp)(this.configuration).projectConfigGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Saves project config
     * @param {ProjectConfigSaveReq} projectConfigSaveReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProjectConfigApi
     */
    projectConfigSave(projectConfigSaveReq, options) {
        return (0, exports.ProjectConfigApiFp)(this.configuration).projectConfigSave(projectConfigSaveReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Tests webhook backend
     * @param {ProjectConfigWebhookTestReq} projectConfigWebhookTestReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProjectConfigApi
     */
    projectConfigWebhookTest(projectConfigWebhookTestReq, options) {
        return (0, exports.ProjectConfigApiFp)(this.configuration).projectConfigWebhookTest(projectConfigWebhookTestReq, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.ProjectConfigApi = ProjectConfigApi;
/**
 * RequestLogsApi - axios parameter creator
 * @export
 */
const RequestLogsApiAxiosParamCreator = function (configuration) {
    return {
        /**
         * Retrieves request log entry by ID. If multiple requests with the same ID are found, the most recent one is returned
         * @param {string} requestID ID of request
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        requestLogGet: async (requestID, remoteAddress, userAgent, options = {}) => {
            // verify required parameter 'requestID' is not null or undefined
            (0, common_js_1.assertParamExists)('requestLogGet', 'requestID', requestID);
            const localVarPath = `/v1/requestLogs/{requestID}`
                .replace(`{${"requestID"}}`, encodeURIComponent(String(requestID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            if (remoteAddress !== undefined) {
                localVarQueryParameter['remoteAddress'] = remoteAddress;
            }
            if (userAgent !== undefined) {
                localVarQueryParameter['userAgent'] = userAgent;
            }
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Lists request logs for given filters
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        requestLogsList: async (remoteAddress, userAgent, sort, filter, page, pageSize, options = {}) => {
            const localVarPath = `/v1/requestLogs`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            if (remoteAddress !== undefined) {
                localVarQueryParameter['remoteAddress'] = remoteAddress;
            }
            if (userAgent !== undefined) {
                localVarQueryParameter['userAgent'] = userAgent;
            }
            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
            }
            if (filter) {
                localVarQueryParameter['filter[]'] = filter;
            }
            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }
            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.RequestLogsApiAxiosParamCreator = RequestLogsApiAxiosParamCreator;
/**
 * RequestLogsApi - functional programming interface
 * @export
 */
const RequestLogsApiFp = function (configuration) {
    const localVarAxiosParamCreator = (0, exports.RequestLogsApiAxiosParamCreator)(configuration);
    return {
        /**
         * Retrieves request log entry by ID. If multiple requests with the same ID are found, the most recent one is returned
         * @param {string} requestID ID of request
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async requestLogGet(requestID, remoteAddress, userAgent, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.requestLogGet(requestID, remoteAddress, userAgent, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['RequestLogsApi.requestLogGet']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Lists request logs for given filters
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async requestLogsList(remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.requestLogsList(remoteAddress, userAgent, sort, filter, page, pageSize, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['RequestLogsApi.requestLogsList']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    };
};
exports.RequestLogsApiFp = RequestLogsApiFp;
/**
 * RequestLogsApi - factory interface
 * @export
 */
const RequestLogsApiFactory = function (configuration, basePath, axios) {
    const localVarFp = (0, exports.RequestLogsApiFp)(configuration);
    return {
        /**
         * Retrieves request log entry by ID. If multiple requests with the same ID are found, the most recent one is returned
         * @param {string} requestID ID of request
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        requestLogGet(requestID, remoteAddress, userAgent, options) {
            return localVarFp.requestLogGet(requestID, remoteAddress, userAgent, options).then((request) => request(axios, basePath));
        },
        /**
         * Lists request logs for given filters
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        requestLogsList(remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            return localVarFp.requestLogsList(remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(axios, basePath));
        },
    };
};
exports.RequestLogsApiFactory = RequestLogsApiFactory;
/**
 * RequestLogsApi - object-oriented interface
 * @export
 * @class RequestLogsApi
 * @extends {BaseAPI}
 */
class RequestLogsApi extends base_js_1.BaseAPI {
    /**
     * Retrieves request log entry by ID. If multiple requests with the same ID are found, the most recent one is returned
     * @param {string} requestID ID of request
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RequestLogsApi
     */
    requestLogGet(requestID, remoteAddress, userAgent, options) {
        return (0, exports.RequestLogsApiFp)(this.configuration).requestLogGet(requestID, remoteAddress, userAgent, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Lists request logs for given filters
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {string} [sort] Field sorting
     * @param {Array<string>} [filter] Field filtering
     * @param {number} [page] Page number
     * @param {number} [pageSize] Number of items per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RequestLogsApi
     */
    requestLogsList(remoteAddress, userAgent, sort, filter, page, pageSize, options) {
        return (0, exports.RequestLogsApiFp)(this.configuration).requestLogsList(remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.RequestLogsApi = RequestLogsApi;
/**
 * SMSOTPApi - axios parameter creator
 * @export
 */
const SMSOTPApiAxiosParamCreator = function (configuration) {
    return {
        /**
         * Creates SMS OTP and sends it to given phone number
         * @param {SmsCodeSendReq} smsCodeSendReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        smsCodeSend: async (smsCodeSendReq, options = {}) => {
            // verify required parameter 'smsCodeSendReq' is not null or undefined
            (0, common_js_1.assertParamExists)('smsCodeSend', 'smsCodeSendReq', smsCodeSendReq);
            const localVarPath = `/v1/smsCodes`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(smsCodeSendReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Validates SMS OTP
         * @param {string} smsCodeID ID of SMS OTP
         * @param {SmsCodeValidateReq} smsCodeValidateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        smsCodeValidate: async (smsCodeID, smsCodeValidateReq, options = {}) => {
            // verify required parameter 'smsCodeID' is not null or undefined
            (0, common_js_1.assertParamExists)('smsCodeValidate', 'smsCodeID', smsCodeID);
            // verify required parameter 'smsCodeValidateReq' is not null or undefined
            (0, common_js_1.assertParamExists)('smsCodeValidate', 'smsCodeValidateReq', smsCodeValidateReq);
            const localVarPath = `/v1/smsCodes/{smsCodeID}/validate`
                .replace(`{${"smsCodeID"}}`, encodeURIComponent(String(smsCodeID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(smsCodeValidateReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.SMSOTPApiAxiosParamCreator = SMSOTPApiAxiosParamCreator;
/**
 * SMSOTPApi - functional programming interface
 * @export
 */
const SMSOTPApiFp = function (configuration) {
    const localVarAxiosParamCreator = (0, exports.SMSOTPApiAxiosParamCreator)(configuration);
    return {
        /**
         * Creates SMS OTP and sends it to given phone number
         * @param {SmsCodeSendReq} smsCodeSendReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async smsCodeSend(smsCodeSendReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.smsCodeSend(smsCodeSendReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['SMSOTPApi.smsCodeSend']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Validates SMS OTP
         * @param {string} smsCodeID ID of SMS OTP
         * @param {SmsCodeValidateReq} smsCodeValidateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async smsCodeValidate(smsCodeID, smsCodeValidateReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.smsCodeValidate(smsCodeID, smsCodeValidateReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['SMSOTPApi.smsCodeValidate']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    };
};
exports.SMSOTPApiFp = SMSOTPApiFp;
/**
 * SMSOTPApi - factory interface
 * @export
 */
const SMSOTPApiFactory = function (configuration, basePath, axios) {
    const localVarFp = (0, exports.SMSOTPApiFp)(configuration);
    return {
        /**
         * Creates SMS OTP and sends it to given phone number
         * @param {SmsCodeSendReq} smsCodeSendReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        smsCodeSend(smsCodeSendReq, options) {
            return localVarFp.smsCodeSend(smsCodeSendReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Validates SMS OTP
         * @param {string} smsCodeID ID of SMS OTP
         * @param {SmsCodeValidateReq} smsCodeValidateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        smsCodeValidate(smsCodeID, smsCodeValidateReq, options) {
            return localVarFp.smsCodeValidate(smsCodeID, smsCodeValidateReq, options).then((request) => request(axios, basePath));
        },
    };
};
exports.SMSOTPApiFactory = SMSOTPApiFactory;
/**
 * SMSOTPApi - object-oriented interface
 * @export
 * @class SMSOTPApi
 * @extends {BaseAPI}
 */
class SMSOTPApi extends base_js_1.BaseAPI {
    /**
     * Creates SMS OTP and sends it to given phone number
     * @param {SmsCodeSendReq} smsCodeSendReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SMSOTPApi
     */
    smsCodeSend(smsCodeSendReq, options) {
        return (0, exports.SMSOTPApiFp)(this.configuration).smsCodeSend(smsCodeSendReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Validates SMS OTP
     * @param {string} smsCodeID ID of SMS OTP
     * @param {SmsCodeValidateReq} smsCodeValidateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SMSOTPApi
     */
    smsCodeValidate(smsCodeID, smsCodeValidateReq, options) {
        return (0, exports.SMSOTPApiFp)(this.configuration).smsCodeValidate(smsCodeID, smsCodeValidateReq, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.SMSOTPApi = SMSOTPApi;
/**
 * SMSTemplatesApi - axios parameter creator
 * @export
 */
const SMSTemplatesApiAxiosParamCreator = function (configuration) {
    return {
        /**
         * Creates a new SMS template
         * @param {SmsTemplateCreateReq} smsTemplateCreateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        smsTemplateCreate: async (smsTemplateCreateReq, options = {}) => {
            // verify required parameter 'smsTemplateCreateReq' is not null or undefined
            (0, common_js_1.assertParamExists)('smsTemplateCreate', 'smsTemplateCreateReq', smsTemplateCreateReq);
            const localVarPath = `/v1/smsTemplates`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(smsTemplateCreateReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Deletes an SMS template
         * @param {string} smsTemplateID ID of SMS template
         * @param {SmsTemplateDeleteReq} smsTemplateDeleteReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        smsTemplateDelete: async (smsTemplateID, smsTemplateDeleteReq, options = {}) => {
            // verify required parameter 'smsTemplateID' is not null or undefined
            (0, common_js_1.assertParamExists)('smsTemplateDelete', 'smsTemplateID', smsTemplateID);
            // verify required parameter 'smsTemplateDeleteReq' is not null or undefined
            (0, common_js_1.assertParamExists)('smsTemplateDelete', 'smsTemplateDeleteReq', smsTemplateDeleteReq);
            const localVarPath = `/v1/smsTemplates/{smsTemplateID}`
                .replace(`{${"smsTemplateID"}}`, encodeURIComponent(String(smsTemplateID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(smsTemplateDeleteReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.SMSTemplatesApiAxiosParamCreator = SMSTemplatesApiAxiosParamCreator;
/**
 * SMSTemplatesApi - functional programming interface
 * @export
 */
const SMSTemplatesApiFp = function (configuration) {
    const localVarAxiosParamCreator = (0, exports.SMSTemplatesApiAxiosParamCreator)(configuration);
    return {
        /**
         * Creates a new SMS template
         * @param {SmsTemplateCreateReq} smsTemplateCreateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async smsTemplateCreate(smsTemplateCreateReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.smsTemplateCreate(smsTemplateCreateReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['SMSTemplatesApi.smsTemplateCreate']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Deletes an SMS template
         * @param {string} smsTemplateID ID of SMS template
         * @param {SmsTemplateDeleteReq} smsTemplateDeleteReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async smsTemplateDelete(smsTemplateID, smsTemplateDeleteReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.smsTemplateDelete(smsTemplateID, smsTemplateDeleteReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['SMSTemplatesApi.smsTemplateDelete']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    };
};
exports.SMSTemplatesApiFp = SMSTemplatesApiFp;
/**
 * SMSTemplatesApi - factory interface
 * @export
 */
const SMSTemplatesApiFactory = function (configuration, basePath, axios) {
    const localVarFp = (0, exports.SMSTemplatesApiFp)(configuration);
    return {
        /**
         * Creates a new SMS template
         * @param {SmsTemplateCreateReq} smsTemplateCreateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        smsTemplateCreate(smsTemplateCreateReq, options) {
            return localVarFp.smsTemplateCreate(smsTemplateCreateReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Deletes an SMS template
         * @param {string} smsTemplateID ID of SMS template
         * @param {SmsTemplateDeleteReq} smsTemplateDeleteReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        smsTemplateDelete(smsTemplateID, smsTemplateDeleteReq, options) {
            return localVarFp.smsTemplateDelete(smsTemplateID, smsTemplateDeleteReq, options).then((request) => request(axios, basePath));
        },
    };
};
exports.SMSTemplatesApiFactory = SMSTemplatesApiFactory;
/**
 * SMSTemplatesApi - object-oriented interface
 * @export
 * @class SMSTemplatesApi
 * @extends {BaseAPI}
 */
class SMSTemplatesApi extends base_js_1.BaseAPI {
    /**
     * Creates a new SMS template
     * @param {SmsTemplateCreateReq} smsTemplateCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SMSTemplatesApi
     */
    smsTemplateCreate(smsTemplateCreateReq, options) {
        return (0, exports.SMSTemplatesApiFp)(this.configuration).smsTemplateCreate(smsTemplateCreateReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Deletes an SMS template
     * @param {string} smsTemplateID ID of SMS template
     * @param {SmsTemplateDeleteReq} smsTemplateDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SMSTemplatesApi
     */
    smsTemplateDelete(smsTemplateID, smsTemplateDeleteReq, options) {
        return (0, exports.SMSTemplatesApiFp)(this.configuration).smsTemplateDelete(smsTemplateID, smsTemplateDeleteReq, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.SMSTemplatesApi = SMSTemplatesApi;
/**
 * SessionConfigApi - axios parameter creator
 * @export
 */
const SessionConfigApiAxiosParamCreator = function (configuration) {
    return {
        /**
         * Retrieves session config by projectID inferred from authentication
         * @param {AppType} [appType] Application type
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sessionConfigGet: async (appType, options = {}) => {
            const localVarPath = `/v1/sessionConfig`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            if (appType !== undefined) {
                localVarQueryParameter['appType'] = appType;
            }
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Updates session config
         * @param {SessionConfigUpdateReq} sessionConfigUpdateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sessionConfigUpdate: async (sessionConfigUpdateReq, options = {}) => {
            // verify required parameter 'sessionConfigUpdateReq' is not null or undefined
            (0, common_js_1.assertParamExists)('sessionConfigUpdate', 'sessionConfigUpdateReq', sessionConfigUpdateReq);
            const localVarPath = `/v1/sessionConfig`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(sessionConfigUpdateReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.SessionConfigApiAxiosParamCreator = SessionConfigApiAxiosParamCreator;
/**
 * SessionConfigApi - functional programming interface
 * @export
 */
const SessionConfigApiFp = function (configuration) {
    const localVarAxiosParamCreator = (0, exports.SessionConfigApiAxiosParamCreator)(configuration);
    return {
        /**
         * Retrieves session config by projectID inferred from authentication
         * @param {AppType} [appType] Application type
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sessionConfigGet(appType, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.sessionConfigGet(appType, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['SessionConfigApi.sessionConfigGet']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Updates session config
         * @param {SessionConfigUpdateReq} sessionConfigUpdateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sessionConfigUpdate(sessionConfigUpdateReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.sessionConfigUpdate(sessionConfigUpdateReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['SessionConfigApi.sessionConfigUpdate']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    };
};
exports.SessionConfigApiFp = SessionConfigApiFp;
/**
 * SessionConfigApi - factory interface
 * @export
 */
const SessionConfigApiFactory = function (configuration, basePath, axios) {
    const localVarFp = (0, exports.SessionConfigApiFp)(configuration);
    return {
        /**
         * Retrieves session config by projectID inferred from authentication
         * @param {AppType} [appType] Application type
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sessionConfigGet(appType, options) {
            return localVarFp.sessionConfigGet(appType, options).then((request) => request(axios, basePath));
        },
        /**
         * Updates session config
         * @param {SessionConfigUpdateReq} sessionConfigUpdateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sessionConfigUpdate(sessionConfigUpdateReq, options) {
            return localVarFp.sessionConfigUpdate(sessionConfigUpdateReq, options).then((request) => request(axios, basePath));
        },
    };
};
exports.SessionConfigApiFactory = SessionConfigApiFactory;
/**
 * SessionConfigApi - object-oriented interface
 * @export
 * @class SessionConfigApi
 * @extends {BaseAPI}
 */
class SessionConfigApi extends base_js_1.BaseAPI {
    /**
     * Retrieves session config by projectID inferred from authentication
     * @param {AppType} [appType] Application type
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SessionConfigApi
     */
    sessionConfigGet(appType, options) {
        return (0, exports.SessionConfigApiFp)(this.configuration).sessionConfigGet(appType, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Updates session config
     * @param {SessionConfigUpdateReq} sessionConfigUpdateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SessionConfigApi
     */
    sessionConfigUpdate(sessionConfigUpdateReq, options) {
        return (0, exports.SessionConfigApiFp)(this.configuration).sessionConfigUpdate(sessionConfigUpdateReq, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.SessionConfigApi = SessionConfigApi;
/**
 * UserApi - axios parameter creator
 * @export
 */
const UserApiAxiosParamCreator = function (configuration) {
    return {
        /**
         * Lists user auth log
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userAuthLogList: async (remoteAddress, userAgent, sort, filter, page, pageSize, options = {}) => {
            const localVarPath = `/v1/userauthlogs`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            if (remoteAddress !== undefined) {
                localVarQueryParameter['remoteAddress'] = remoteAddress;
            }
            if (userAgent !== undefined) {
                localVarQueryParameter['userAgent'] = userAgent;
            }
            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
            }
            if (filter) {
                localVarQueryParameter['filter[]'] = filter;
            }
            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }
            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Creates a new user
         * @param {UserCreateReq} userCreateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userCreate: async (userCreateReq, options = {}) => {
            // verify required parameter 'userCreateReq' is not null or undefined
            (0, common_js_1.assertParamExists)('userCreate', 'userCreateReq', userCreateReq);
            const localVarPath = `/v1/users`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(userCreateReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Add a custom login identifier to an existing user
         * @param {string} userID ID of user
         * @param {UserCustomLoginIdentifierCreateReq} userCustomLoginIdentifierCreateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userCustomLoginIdentifierCreate: async (userID, userCustomLoginIdentifierCreateReq, options = {}) => {
            // verify required parameter 'userID' is not null or undefined
            (0, common_js_1.assertParamExists)('userCustomLoginIdentifierCreate', 'userID', userID);
            // verify required parameter 'userCustomLoginIdentifierCreateReq' is not null or undefined
            (0, common_js_1.assertParamExists)('userCustomLoginIdentifierCreate', 'userCustomLoginIdentifierCreateReq', userCustomLoginIdentifierCreateReq);
            const localVarPath = `/v1/users/{userID}/customLoginIdentifiers`
                .replace(`{${"userID"}}`, encodeURIComponent(String(userID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(userCustomLoginIdentifierCreateReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Delete a user\'s custom login identifier
         * @param {string} userID ID of user
         * @param {string} customLoginIdentifierID ID of custom login identifier
         * @param {UserCustomLoginIdentifierDeleteReq} userCustomLoginIdentifierDeleteReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userCustomLoginIdentifierDelete: async (userID, customLoginIdentifierID, userCustomLoginIdentifierDeleteReq, options = {}) => {
            // verify required parameter 'userID' is not null or undefined
            (0, common_js_1.assertParamExists)('userCustomLoginIdentifierDelete', 'userID', userID);
            // verify required parameter 'customLoginIdentifierID' is not null or undefined
            (0, common_js_1.assertParamExists)('userCustomLoginIdentifierDelete', 'customLoginIdentifierID', customLoginIdentifierID);
            // verify required parameter 'userCustomLoginIdentifierDeleteReq' is not null or undefined
            (0, common_js_1.assertParamExists)('userCustomLoginIdentifierDelete', 'userCustomLoginIdentifierDeleteReq', userCustomLoginIdentifierDeleteReq);
            const localVarPath = `/v1/users/{userID}/customLoginIdentifiers/{customLoginIdentifierID}`
                .replace(`{${"userID"}}`, encodeURIComponent(String(userID)))
                .replace(`{${"customLoginIdentifierID"}}`, encodeURIComponent(String(customLoginIdentifierID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(userCustomLoginIdentifierDeleteReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Get a user\'s custom login identifier
         * @param {string} userID ID of user
         * @param {string} customLoginIdentifierID ID of custom login identifier
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userCustomLoginIdentifierGet: async (userID, customLoginIdentifierID, remoteAddress, userAgent, options = {}) => {
            // verify required parameter 'userID' is not null or undefined
            (0, common_js_1.assertParamExists)('userCustomLoginIdentifierGet', 'userID', userID);
            // verify required parameter 'customLoginIdentifierID' is not null or undefined
            (0, common_js_1.assertParamExists)('userCustomLoginIdentifierGet', 'customLoginIdentifierID', customLoginIdentifierID);
            const localVarPath = `/v1/users/{userID}/customLoginIdentifiers/{customLoginIdentifierID}`
                .replace(`{${"userID"}}`, encodeURIComponent(String(userID)))
                .replace(`{${"customLoginIdentifierID"}}`, encodeURIComponent(String(customLoginIdentifierID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            if (remoteAddress !== undefined) {
                localVarQueryParameter['remoteAddress'] = remoteAddress;
            }
            if (userAgent !== undefined) {
                localVarQueryParameter['userAgent'] = userAgent;
            }
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Deletes a user
         * @param {string} userID ID of user
         * @param {UserDeleteReq} userDeleteReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userDelete: async (userID, userDeleteReq, options = {}) => {
            // verify required parameter 'userID' is not null or undefined
            (0, common_js_1.assertParamExists)('userDelete', 'userID', userID);
            // verify required parameter 'userDeleteReq' is not null or undefined
            (0, common_js_1.assertParamExists)('userDelete', 'userDeleteReq', userDeleteReq);
            const localVarPath = `/v1/users/{userID}`
                .replace(`{${"userID"}}`, encodeURIComponent(String(userID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(userDeleteReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Provides all register devices for given user
         * @param {string} userID ID of user
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userDeviceList: async (userID, remoteAddress, userAgent, sort, filter, page, pageSize, options = {}) => {
            // verify required parameter 'userID' is not null or undefined
            (0, common_js_1.assertParamExists)('userDeviceList', 'userID', userID);
            const localVarPath = `/v1/users/{userID}/devices`
                .replace(`{${"userID"}}`, encodeURIComponent(String(userID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            if (remoteAddress !== undefined) {
                localVarQueryParameter['remoteAddress'] = remoteAddress;
            }
            if (userAgent !== undefined) {
                localVarQueryParameter['userAgent'] = userAgent;
            }
            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
            }
            if (filter) {
                localVarQueryParameter['filter[]'] = filter;
            }
            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }
            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Add an email to an existing user
         * @param {string} userID ID of user
         * @param {UserEmailCreateReq} userEmailCreateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userEmailCreate: async (userID, userEmailCreateReq, options = {}) => {
            // verify required parameter 'userID' is not null or undefined
            (0, common_js_1.assertParamExists)('userEmailCreate', 'userID', userID);
            // verify required parameter 'userEmailCreateReq' is not null or undefined
            (0, common_js_1.assertParamExists)('userEmailCreate', 'userEmailCreateReq', userEmailCreateReq);
            const localVarPath = `/v1/users/{userID}/emails`
                .replace(`{${"userID"}}`, encodeURIComponent(String(userID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(userEmailCreateReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Delete a user\'s email
         * @param {string} userID ID of user
         * @param {string} emailID ID of email
         * @param {UserEmailDeleteReq} userEmailDeleteReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userEmailDelete: async (userID, emailID, userEmailDeleteReq, options = {}) => {
            // verify required parameter 'userID' is not null or undefined
            (0, common_js_1.assertParamExists)('userEmailDelete', 'userID', userID);
            // verify required parameter 'emailID' is not null or undefined
            (0, common_js_1.assertParamExists)('userEmailDelete', 'emailID', emailID);
            // verify required parameter 'userEmailDeleteReq' is not null or undefined
            (0, common_js_1.assertParamExists)('userEmailDelete', 'userEmailDeleteReq', userEmailDeleteReq);
            const localVarPath = `/v1/users/{userID}/emails/{emailID}`
                .replace(`{${"userID"}}`, encodeURIComponent(String(userID)))
                .replace(`{${"emailID"}}`, encodeURIComponent(String(emailID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(userEmailDeleteReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Get a user\'s email
         * @param {string} userID ID of user
         * @param {string} emailID ID of email
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userEmailGet: async (userID, emailID, remoteAddress, userAgent, options = {}) => {
            // verify required parameter 'userID' is not null or undefined
            (0, common_js_1.assertParamExists)('userEmailGet', 'userID', userID);
            // verify required parameter 'emailID' is not null or undefined
            (0, common_js_1.assertParamExists)('userEmailGet', 'emailID', emailID);
            const localVarPath = `/v1/users/{userID}/emails/{emailID}`
                .replace(`{${"userID"}}`, encodeURIComponent(String(userID)))
                .replace(`{${"emailID"}}`, encodeURIComponent(String(emailID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            if (remoteAddress !== undefined) {
                localVarQueryParameter['remoteAddress'] = remoteAddress;
            }
            if (userAgent !== undefined) {
                localVarQueryParameter['userAgent'] = userAgent;
            }
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Get a user by ID
         * @param {string} userID ID of user
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userGet: async (userID, remoteAddress, userAgent, options = {}) => {
            // verify required parameter 'userID' is not null or undefined
            (0, common_js_1.assertParamExists)('userGet', 'userID', userID);
            const localVarPath = `/v1/users/{userID}`
                .replace(`{${"userID"}}`, encodeURIComponent(String(userID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            if (remoteAddress !== undefined) {
                localVarQueryParameter['remoteAddress'] = remoteAddress;
            }
            if (userAgent !== undefined) {
                localVarQueryParameter['userAgent'] = userAgent;
            }
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Lists project users
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userList: async (remoteAddress, userAgent, sort, filter, page, pageSize, options = {}) => {
            const localVarPath = `/v1/users`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            if (remoteAddress !== undefined) {
                localVarQueryParameter['remoteAddress'] = remoteAddress;
            }
            if (userAgent !== undefined) {
                localVarQueryParameter['userAgent'] = userAgent;
            }
            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
            }
            if (filter) {
                localVarQueryParameter['filter[]'] = filter;
            }
            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }
            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Add a phone number to an existing user
         * @param {string} userID ID of user
         * @param {UserPhoneNumberCreateReq} userPhoneNumberCreateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userPhoneNumberCreate: async (userID, userPhoneNumberCreateReq, options = {}) => {
            // verify required parameter 'userID' is not null or undefined
            (0, common_js_1.assertParamExists)('userPhoneNumberCreate', 'userID', userID);
            // verify required parameter 'userPhoneNumberCreateReq' is not null or undefined
            (0, common_js_1.assertParamExists)('userPhoneNumberCreate', 'userPhoneNumberCreateReq', userPhoneNumberCreateReq);
            const localVarPath = `/v1/users/{userID}/phoneNumbers`
                .replace(`{${"userID"}}`, encodeURIComponent(String(userID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(userPhoneNumberCreateReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Delete a user\'s phone number
         * @param {string} userID ID of user
         * @param {string} phoneNumberID ID of phone number
         * @param {UserPhoneNumberDeleteReq} userPhoneNumberDeleteReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userPhoneNumberDelete: async (userID, phoneNumberID, userPhoneNumberDeleteReq, options = {}) => {
            // verify required parameter 'userID' is not null or undefined
            (0, common_js_1.assertParamExists)('userPhoneNumberDelete', 'userID', userID);
            // verify required parameter 'phoneNumberID' is not null or undefined
            (0, common_js_1.assertParamExists)('userPhoneNumberDelete', 'phoneNumberID', phoneNumberID);
            // verify required parameter 'userPhoneNumberDeleteReq' is not null or undefined
            (0, common_js_1.assertParamExists)('userPhoneNumberDelete', 'userPhoneNumberDeleteReq', userPhoneNumberDeleteReq);
            const localVarPath = `/v1/users/{userID}/phoneNumbers/{phoneNumberID}`
                .replace(`{${"userID"}}`, encodeURIComponent(String(userID)))
                .replace(`{${"phoneNumberID"}}`, encodeURIComponent(String(phoneNumberID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(userPhoneNumberDeleteReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Get a user\'s phone number
         * @param {string} userID ID of user
         * @param {string} phoneNumberID ID of phone number
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userPhoneNumberGet: async (userID, phoneNumberID, remoteAddress, userAgent, options = {}) => {
            // verify required parameter 'userID' is not null or undefined
            (0, common_js_1.assertParamExists)('userPhoneNumberGet', 'userID', userID);
            // verify required parameter 'phoneNumberID' is not null or undefined
            (0, common_js_1.assertParamExists)('userPhoneNumberGet', 'phoneNumberID', phoneNumberID);
            const localVarPath = `/v1/users/{userID}/phoneNumbers/{phoneNumberID}`
                .replace(`{${"userID"}}`, encodeURIComponent(String(userID)))
                .replace(`{${"phoneNumberID"}}`, encodeURIComponent(String(phoneNumberID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            if (remoteAddress !== undefined) {
                localVarQueryParameter['remoteAddress'] = remoteAddress;
            }
            if (userAgent !== undefined) {
                localVarQueryParameter['userAgent'] = userAgent;
            }
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Provides aggregated user stats for project
         * @param {string} granularity Data granularity
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userStatsList: async (granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options = {}) => {
            // verify required parameter 'granularity' is not null or undefined
            (0, common_js_1.assertParamExists)('userStatsList', 'granularity', granularity);
            const localVarPath = `/v1/users/stats`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            if (remoteAddress !== undefined) {
                localVarQueryParameter['remoteAddress'] = remoteAddress;
            }
            if (userAgent !== undefined) {
                localVarQueryParameter['userAgent'] = userAgent;
            }
            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
            }
            if (filter) {
                localVarQueryParameter['filter[]'] = filter;
            }
            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }
            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }
            if (granularity !== undefined) {
                localVarQueryParameter['granularity'] = granularity;
            }
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Updates a user
         * @param {string} userID ID of user
         * @param {UserUpdateReq} userUpdateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userUpdate: async (userID, userUpdateReq, options = {}) => {
            // verify required parameter 'userID' is not null or undefined
            (0, common_js_1.assertParamExists)('userUpdate', 'userID', userID);
            // verify required parameter 'userUpdateReq' is not null or undefined
            (0, common_js_1.assertParamExists)('userUpdate', 'userUpdateReq', userUpdateReq);
            const localVarPath = `/v1/users/{userID}`
                .replace(`{${"userID"}}`, encodeURIComponent(String(userID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(userUpdateReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.UserApiAxiosParamCreator = UserApiAxiosParamCreator;
/**
 * UserApi - functional programming interface
 * @export
 */
const UserApiFp = function (configuration) {
    const localVarAxiosParamCreator = (0, exports.UserApiAxiosParamCreator)(configuration);
    return {
        /**
         * Lists user auth log
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userAuthLogList(remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userAuthLogList(remoteAddress, userAgent, sort, filter, page, pageSize, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['UserApi.userAuthLogList']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Creates a new user
         * @param {UserCreateReq} userCreateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userCreate(userCreateReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userCreate(userCreateReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['UserApi.userCreate']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Add a custom login identifier to an existing user
         * @param {string} userID ID of user
         * @param {UserCustomLoginIdentifierCreateReq} userCustomLoginIdentifierCreateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userCustomLoginIdentifierCreate(userID, userCustomLoginIdentifierCreateReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userCustomLoginIdentifierCreate(userID, userCustomLoginIdentifierCreateReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['UserApi.userCustomLoginIdentifierCreate']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Delete a user\'s custom login identifier
         * @param {string} userID ID of user
         * @param {string} customLoginIdentifierID ID of custom login identifier
         * @param {UserCustomLoginIdentifierDeleteReq} userCustomLoginIdentifierDeleteReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userCustomLoginIdentifierDelete(userID, customLoginIdentifierID, userCustomLoginIdentifierDeleteReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userCustomLoginIdentifierDelete(userID, customLoginIdentifierID, userCustomLoginIdentifierDeleteReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['UserApi.userCustomLoginIdentifierDelete']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Get a user\'s custom login identifier
         * @param {string} userID ID of user
         * @param {string} customLoginIdentifierID ID of custom login identifier
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userCustomLoginIdentifierGet(userID, customLoginIdentifierID, remoteAddress, userAgent, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userCustomLoginIdentifierGet(userID, customLoginIdentifierID, remoteAddress, userAgent, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['UserApi.userCustomLoginIdentifierGet']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Deletes a user
         * @param {string} userID ID of user
         * @param {UserDeleteReq} userDeleteReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userDelete(userID, userDeleteReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userDelete(userID, userDeleteReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['UserApi.userDelete']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Provides all register devices for given user
         * @param {string} userID ID of user
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userDeviceList(userID, remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userDeviceList(userID, remoteAddress, userAgent, sort, filter, page, pageSize, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['UserApi.userDeviceList']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Add an email to an existing user
         * @param {string} userID ID of user
         * @param {UserEmailCreateReq} userEmailCreateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userEmailCreate(userID, userEmailCreateReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userEmailCreate(userID, userEmailCreateReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['UserApi.userEmailCreate']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Delete a user\'s email
         * @param {string} userID ID of user
         * @param {string} emailID ID of email
         * @param {UserEmailDeleteReq} userEmailDeleteReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userEmailDelete(userID, emailID, userEmailDeleteReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userEmailDelete(userID, emailID, userEmailDeleteReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['UserApi.userEmailDelete']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Get a user\'s email
         * @param {string} userID ID of user
         * @param {string} emailID ID of email
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userEmailGet(userID, emailID, remoteAddress, userAgent, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userEmailGet(userID, emailID, remoteAddress, userAgent, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['UserApi.userEmailGet']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Get a user by ID
         * @param {string} userID ID of user
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userGet(userID, remoteAddress, userAgent, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userGet(userID, remoteAddress, userAgent, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['UserApi.userGet']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Lists project users
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userList(remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userList(remoteAddress, userAgent, sort, filter, page, pageSize, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['UserApi.userList']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Add a phone number to an existing user
         * @param {string} userID ID of user
         * @param {UserPhoneNumberCreateReq} userPhoneNumberCreateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userPhoneNumberCreate(userID, userPhoneNumberCreateReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userPhoneNumberCreate(userID, userPhoneNumberCreateReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['UserApi.userPhoneNumberCreate']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Delete a user\'s phone number
         * @param {string} userID ID of user
         * @param {string} phoneNumberID ID of phone number
         * @param {UserPhoneNumberDeleteReq} userPhoneNumberDeleteReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userPhoneNumberDelete(userID, phoneNumberID, userPhoneNumberDeleteReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userPhoneNumberDelete(userID, phoneNumberID, userPhoneNumberDeleteReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['UserApi.userPhoneNumberDelete']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Get a user\'s phone number
         * @param {string} userID ID of user
         * @param {string} phoneNumberID ID of phone number
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userPhoneNumberGet(userID, phoneNumberID, remoteAddress, userAgent, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userPhoneNumberGet(userID, phoneNumberID, remoteAddress, userAgent, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['UserApi.userPhoneNumberGet']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Provides aggregated user stats for project
         * @param {string} granularity Data granularity
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['UserApi.userStatsList']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Updates a user
         * @param {string} userID ID of user
         * @param {UserUpdateReq} userUpdateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userUpdate(userID, userUpdateReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userUpdate(userID, userUpdateReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['UserApi.userUpdate']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    };
};
exports.UserApiFp = UserApiFp;
/**
 * UserApi - factory interface
 * @export
 */
const UserApiFactory = function (configuration, basePath, axios) {
    const localVarFp = (0, exports.UserApiFp)(configuration);
    return {
        /**
         * Lists user auth log
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userAuthLogList(remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            return localVarFp.userAuthLogList(remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(axios, basePath));
        },
        /**
         * Creates a new user
         * @param {UserCreateReq} userCreateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userCreate(userCreateReq, options) {
            return localVarFp.userCreate(userCreateReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Add a custom login identifier to an existing user
         * @param {string} userID ID of user
         * @param {UserCustomLoginIdentifierCreateReq} userCustomLoginIdentifierCreateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userCustomLoginIdentifierCreate(userID, userCustomLoginIdentifierCreateReq, options) {
            return localVarFp.userCustomLoginIdentifierCreate(userID, userCustomLoginIdentifierCreateReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete a user\'s custom login identifier
         * @param {string} userID ID of user
         * @param {string} customLoginIdentifierID ID of custom login identifier
         * @param {UserCustomLoginIdentifierDeleteReq} userCustomLoginIdentifierDeleteReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userCustomLoginIdentifierDelete(userID, customLoginIdentifierID, userCustomLoginIdentifierDeleteReq, options) {
            return localVarFp.userCustomLoginIdentifierDelete(userID, customLoginIdentifierID, userCustomLoginIdentifierDeleteReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Get a user\'s custom login identifier
         * @param {string} userID ID of user
         * @param {string} customLoginIdentifierID ID of custom login identifier
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userCustomLoginIdentifierGet(userID, customLoginIdentifierID, remoteAddress, userAgent, options) {
            return localVarFp.userCustomLoginIdentifierGet(userID, customLoginIdentifierID, remoteAddress, userAgent, options).then((request) => request(axios, basePath));
        },
        /**
         * Deletes a user
         * @param {string} userID ID of user
         * @param {UserDeleteReq} userDeleteReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userDelete(userID, userDeleteReq, options) {
            return localVarFp.userDelete(userID, userDeleteReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Provides all register devices for given user
         * @param {string} userID ID of user
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userDeviceList(userID, remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            return localVarFp.userDeviceList(userID, remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(axios, basePath));
        },
        /**
         * Add an email to an existing user
         * @param {string} userID ID of user
         * @param {UserEmailCreateReq} userEmailCreateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userEmailCreate(userID, userEmailCreateReq, options) {
            return localVarFp.userEmailCreate(userID, userEmailCreateReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete a user\'s email
         * @param {string} userID ID of user
         * @param {string} emailID ID of email
         * @param {UserEmailDeleteReq} userEmailDeleteReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userEmailDelete(userID, emailID, userEmailDeleteReq, options) {
            return localVarFp.userEmailDelete(userID, emailID, userEmailDeleteReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Get a user\'s email
         * @param {string} userID ID of user
         * @param {string} emailID ID of email
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userEmailGet(userID, emailID, remoteAddress, userAgent, options) {
            return localVarFp.userEmailGet(userID, emailID, remoteAddress, userAgent, options).then((request) => request(axios, basePath));
        },
        /**
         * Get a user by ID
         * @param {string} userID ID of user
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userGet(userID, remoteAddress, userAgent, options) {
            return localVarFp.userGet(userID, remoteAddress, userAgent, options).then((request) => request(axios, basePath));
        },
        /**
         * Lists project users
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userList(remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            return localVarFp.userList(remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(axios, basePath));
        },
        /**
         * Add a phone number to an existing user
         * @param {string} userID ID of user
         * @param {UserPhoneNumberCreateReq} userPhoneNumberCreateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userPhoneNumberCreate(userID, userPhoneNumberCreateReq, options) {
            return localVarFp.userPhoneNumberCreate(userID, userPhoneNumberCreateReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete a user\'s phone number
         * @param {string} userID ID of user
         * @param {string} phoneNumberID ID of phone number
         * @param {UserPhoneNumberDeleteReq} userPhoneNumberDeleteReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userPhoneNumberDelete(userID, phoneNumberID, userPhoneNumberDeleteReq, options) {
            return localVarFp.userPhoneNumberDelete(userID, phoneNumberID, userPhoneNumberDeleteReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Get a user\'s phone number
         * @param {string} userID ID of user
         * @param {string} phoneNumberID ID of phone number
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userPhoneNumberGet(userID, phoneNumberID, remoteAddress, userAgent, options) {
            return localVarFp.userPhoneNumberGet(userID, phoneNumberID, remoteAddress, userAgent, options).then((request) => request(axios, basePath));
        },
        /**
         * Provides aggregated user stats for project
         * @param {string} granularity Data granularity
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            return localVarFp.userStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(axios, basePath));
        },
        /**
         * Updates a user
         * @param {string} userID ID of user
         * @param {UserUpdateReq} userUpdateReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userUpdate(userID, userUpdateReq, options) {
            return localVarFp.userUpdate(userID, userUpdateReq, options).then((request) => request(axios, basePath));
        },
    };
};
exports.UserApiFactory = UserApiFactory;
/**
 * UserApi - object-oriented interface
 * @export
 * @class UserApi
 * @extends {BaseAPI}
 */
class UserApi extends base_js_1.BaseAPI {
    /**
     * Lists user auth log
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {string} [sort] Field sorting
     * @param {Array<string>} [filter] Field filtering
     * @param {number} [page] Page number
     * @param {number} [pageSize] Number of items per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userAuthLogList(remoteAddress, userAgent, sort, filter, page, pageSize, options) {
        return (0, exports.UserApiFp)(this.configuration).userAuthLogList(remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Creates a new user
     * @param {UserCreateReq} userCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userCreate(userCreateReq, options) {
        return (0, exports.UserApiFp)(this.configuration).userCreate(userCreateReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Add a custom login identifier to an existing user
     * @param {string} userID ID of user
     * @param {UserCustomLoginIdentifierCreateReq} userCustomLoginIdentifierCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userCustomLoginIdentifierCreate(userID, userCustomLoginIdentifierCreateReq, options) {
        return (0, exports.UserApiFp)(this.configuration).userCustomLoginIdentifierCreate(userID, userCustomLoginIdentifierCreateReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Delete a user\'s custom login identifier
     * @param {string} userID ID of user
     * @param {string} customLoginIdentifierID ID of custom login identifier
     * @param {UserCustomLoginIdentifierDeleteReq} userCustomLoginIdentifierDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userCustomLoginIdentifierDelete(userID, customLoginIdentifierID, userCustomLoginIdentifierDeleteReq, options) {
        return (0, exports.UserApiFp)(this.configuration).userCustomLoginIdentifierDelete(userID, customLoginIdentifierID, userCustomLoginIdentifierDeleteReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get a user\'s custom login identifier
     * @param {string} userID ID of user
     * @param {string} customLoginIdentifierID ID of custom login identifier
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userCustomLoginIdentifierGet(userID, customLoginIdentifierID, remoteAddress, userAgent, options) {
        return (0, exports.UserApiFp)(this.configuration).userCustomLoginIdentifierGet(userID, customLoginIdentifierID, remoteAddress, userAgent, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Deletes a user
     * @param {string} userID ID of user
     * @param {UserDeleteReq} userDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userDelete(userID, userDeleteReq, options) {
        return (0, exports.UserApiFp)(this.configuration).userDelete(userID, userDeleteReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Provides all register devices for given user
     * @param {string} userID ID of user
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {string} [sort] Field sorting
     * @param {Array<string>} [filter] Field filtering
     * @param {number} [page] Page number
     * @param {number} [pageSize] Number of items per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userDeviceList(userID, remoteAddress, userAgent, sort, filter, page, pageSize, options) {
        return (0, exports.UserApiFp)(this.configuration).userDeviceList(userID, remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Add an email to an existing user
     * @param {string} userID ID of user
     * @param {UserEmailCreateReq} userEmailCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userEmailCreate(userID, userEmailCreateReq, options) {
        return (0, exports.UserApiFp)(this.configuration).userEmailCreate(userID, userEmailCreateReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Delete a user\'s email
     * @param {string} userID ID of user
     * @param {string} emailID ID of email
     * @param {UserEmailDeleteReq} userEmailDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userEmailDelete(userID, emailID, userEmailDeleteReq, options) {
        return (0, exports.UserApiFp)(this.configuration).userEmailDelete(userID, emailID, userEmailDeleteReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get a user\'s email
     * @param {string} userID ID of user
     * @param {string} emailID ID of email
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userEmailGet(userID, emailID, remoteAddress, userAgent, options) {
        return (0, exports.UserApiFp)(this.configuration).userEmailGet(userID, emailID, remoteAddress, userAgent, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get a user by ID
     * @param {string} userID ID of user
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userGet(userID, remoteAddress, userAgent, options) {
        return (0, exports.UserApiFp)(this.configuration).userGet(userID, remoteAddress, userAgent, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Lists project users
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {string} [sort] Field sorting
     * @param {Array<string>} [filter] Field filtering
     * @param {number} [page] Page number
     * @param {number} [pageSize] Number of items per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userList(remoteAddress, userAgent, sort, filter, page, pageSize, options) {
        return (0, exports.UserApiFp)(this.configuration).userList(remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Add a phone number to an existing user
     * @param {string} userID ID of user
     * @param {UserPhoneNumberCreateReq} userPhoneNumberCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userPhoneNumberCreate(userID, userPhoneNumberCreateReq, options) {
        return (0, exports.UserApiFp)(this.configuration).userPhoneNumberCreate(userID, userPhoneNumberCreateReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Delete a user\'s phone number
     * @param {string} userID ID of user
     * @param {string} phoneNumberID ID of phone number
     * @param {UserPhoneNumberDeleteReq} userPhoneNumberDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userPhoneNumberDelete(userID, phoneNumberID, userPhoneNumberDeleteReq, options) {
        return (0, exports.UserApiFp)(this.configuration).userPhoneNumberDelete(userID, phoneNumberID, userPhoneNumberDeleteReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get a user\'s phone number
     * @param {string} userID ID of user
     * @param {string} phoneNumberID ID of phone number
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userPhoneNumberGet(userID, phoneNumberID, remoteAddress, userAgent, options) {
        return (0, exports.UserApiFp)(this.configuration).userPhoneNumberGet(userID, phoneNumberID, remoteAddress, userAgent, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Provides aggregated user stats for project
     * @param {string} granularity Data granularity
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {string} [sort] Field sorting
     * @param {Array<string>} [filter] Field filtering
     * @param {number} [page] Page number
     * @param {number} [pageSize] Number of items per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options) {
        return (0, exports.UserApiFp)(this.configuration).userStatsList(granularity, remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Updates a user
     * @param {string} userID ID of user
     * @param {UserUpdateReq} userUpdateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userUpdate(userID, userUpdateReq, options) {
        return (0, exports.UserApiFp)(this.configuration).userUpdate(userID, userUpdateReq, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.UserApi = UserApi;
/**
 * ValidationApi - axios parameter creator
 * @export
 */
const ValidationApiAxiosParamCreator = function (configuration) {
    return {
        /**
         * Validates email
         * @param {ValidateEmailReq} validateEmailReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        validateEmail: async (validateEmailReq, options = {}) => {
            // verify required parameter 'validateEmailReq' is not null or undefined
            (0, common_js_1.assertParamExists)('validateEmail', 'validateEmailReq', validateEmailReq);
            const localVarPath = `/v1/validate/email`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(validateEmailReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Validates phone number
         * @param {ValidatePhoneNumberReq} validatePhoneNumberReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        validatePhoneNumber: async (validatePhoneNumberReq, options = {}) => {
            // verify required parameter 'validatePhoneNumberReq' is not null or undefined
            (0, common_js_1.assertParamExists)('validatePhoneNumber', 'validatePhoneNumberReq', validatePhoneNumberReq);
            const localVarPath = `/v1/validate/phoneNumber`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            localVarHeaderParameter['Content-Type'] = 'application/json';
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = (0, common_js_1.serializeDataIfNeeded)(validatePhoneNumberReq, localVarRequestOptions, configuration);
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.ValidationApiAxiosParamCreator = ValidationApiAxiosParamCreator;
/**
 * ValidationApi - functional programming interface
 * @export
 */
const ValidationApiFp = function (configuration) {
    const localVarAxiosParamCreator = (0, exports.ValidationApiAxiosParamCreator)(configuration);
    return {
        /**
         * Validates email
         * @param {ValidateEmailReq} validateEmailReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async validateEmail(validateEmailReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.validateEmail(validateEmailReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['ValidationApi.validateEmail']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Validates phone number
         * @param {ValidatePhoneNumberReq} validatePhoneNumberReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async validatePhoneNumber(validatePhoneNumberReq, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.validatePhoneNumber(validatePhoneNumberReq, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['ValidationApi.validatePhoneNumber']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    };
};
exports.ValidationApiFp = ValidationApiFp;
/**
 * ValidationApi - factory interface
 * @export
 */
const ValidationApiFactory = function (configuration, basePath, axios) {
    const localVarFp = (0, exports.ValidationApiFp)(configuration);
    return {
        /**
         * Validates email
         * @param {ValidateEmailReq} validateEmailReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        validateEmail(validateEmailReq, options) {
            return localVarFp.validateEmail(validateEmailReq, options).then((request) => request(axios, basePath));
        },
        /**
         * Validates phone number
         * @param {ValidatePhoneNumberReq} validatePhoneNumberReq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        validatePhoneNumber(validatePhoneNumberReq, options) {
            return localVarFp.validatePhoneNumber(validatePhoneNumberReq, options).then((request) => request(axios, basePath));
        },
    };
};
exports.ValidationApiFactory = ValidationApiFactory;
/**
 * ValidationApi - object-oriented interface
 * @export
 * @class ValidationApi
 * @extends {BaseAPI}
 */
class ValidationApi extends base_js_1.BaseAPI {
    /**
     * Validates email
     * @param {ValidateEmailReq} validateEmailReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ValidationApi
     */
    validateEmail(validateEmailReq, options) {
        return (0, exports.ValidationApiFp)(this.configuration).validateEmail(validateEmailReq, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Validates phone number
     * @param {ValidatePhoneNumberReq} validatePhoneNumberReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ValidationApi
     */
    validatePhoneNumber(validatePhoneNumberReq, options) {
        return (0, exports.ValidationApiFp)(this.configuration).validatePhoneNumber(validatePhoneNumberReq, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.ValidationApi = ValidationApi;
/**
 * WebhookLogsApi - axios parameter creator
 * @export
 */
const WebhookLogsApiAxiosParamCreator = function (configuration) {
    return {
        /**
         * Lists webhook logs for given filters
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webhookLogsList: async (remoteAddress, userAgent, sort, filter, page, pageSize, options = {}) => {
            const localVarPath = `/v1/webhookLogs`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_js_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            // authentication basicAuth required
            // http basic authentication required
            (0, common_js_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
            // authentication projectID required
            await (0, common_js_1.setApiKeyToObject)(localVarHeaderParameter, "X-Corbado-ProjectID", configuration);
            // authentication bearerAuth required
            // http bearer authentication required
            await (0, common_js_1.setBearerAuthToObject)(localVarHeaderParameter, configuration);
            if (remoteAddress !== undefined) {
                localVarQueryParameter['remoteAddress'] = remoteAddress;
            }
            if (userAgent !== undefined) {
                localVarQueryParameter['userAgent'] = userAgent;
            }
            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
            }
            if (filter) {
                localVarQueryParameter['filter[]'] = filter;
            }
            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }
            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }
            (0, common_js_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: (0, common_js_1.toPathString)(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.WebhookLogsApiAxiosParamCreator = WebhookLogsApiAxiosParamCreator;
/**
 * WebhookLogsApi - functional programming interface
 * @export
 */
const WebhookLogsApiFp = function (configuration) {
    const localVarAxiosParamCreator = (0, exports.WebhookLogsApiAxiosParamCreator)(configuration);
    return {
        /**
         * Lists webhook logs for given filters
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async webhookLogsList(remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.webhookLogsList(remoteAddress, userAgent, sort, filter, page, pageSize, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = base_js_1.operationServerMap['WebhookLogsApi.webhookLogsList']?.[index]?.url;
            return (axios, basePath) => (0, common_js_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_js_1.BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    };
};
exports.WebhookLogsApiFp = WebhookLogsApiFp;
/**
 * WebhookLogsApi - factory interface
 * @export
 */
const WebhookLogsApiFactory = function (configuration, basePath, axios) {
    const localVarFp = (0, exports.WebhookLogsApiFp)(configuration);
    return {
        /**
         * Lists webhook logs for given filters
         * @param {string} [remoteAddress] Client\&#39;s remote address
         * @param {string} [userAgent] Client\&#39;s user agent
         * @param {string} [sort] Field sorting
         * @param {Array<string>} [filter] Field filtering
         * @param {number} [page] Page number
         * @param {number} [pageSize] Number of items per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        webhookLogsList(remoteAddress, userAgent, sort, filter, page, pageSize, options) {
            return localVarFp.webhookLogsList(remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(axios, basePath));
        },
    };
};
exports.WebhookLogsApiFactory = WebhookLogsApiFactory;
/**
 * WebhookLogsApi - object-oriented interface
 * @export
 * @class WebhookLogsApi
 * @extends {BaseAPI}
 */
class WebhookLogsApi extends base_js_1.BaseAPI {
    /**
     * Lists webhook logs for given filters
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {string} [sort] Field sorting
     * @param {Array<string>} [filter] Field filtering
     * @param {number} [page] Page number
     * @param {number} [pageSize] Number of items per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WebhookLogsApi
     */
    webhookLogsList(remoteAddress, userAgent, sort, filter, page, pageSize, options) {
        return (0, exports.WebhookLogsApiFp)(this.configuration).webhookLogsList(remoteAddress, userAgent, sort, filter, page, pageSize, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.WebhookLogsApi = WebhookLogsApi;
//# sourceMappingURL=api.js.map