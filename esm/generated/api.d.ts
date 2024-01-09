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
import type { Configuration } from './configuration.js';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import type { RequestArgs } from './base.js';
import { BaseAPI } from './base.js';
/**
 *
 * @export
 * @interface AndroidAppConfigDeleteReq
 */
export interface AndroidAppConfigDeleteReq {
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof AndroidAppConfigDeleteReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof AndroidAppConfigDeleteReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface AndroidAppConfigItem
 */
export interface AndroidAppConfigItem {
    /**
     * ID of Android app configuration
     * @type {string}
     * @memberof AndroidAppConfigItem
     */
    'id': string;
    /**
     * ID of project
     * @type {string}
     * @memberof AndroidAppConfigItem
     */
    'projectID': string;
    /**
     *
     * @type {string}
     * @memberof AndroidAppConfigItem
     */
    'packageName': string;
    /**
     *
     * @type {string}
     * @memberof AndroidAppConfigItem
     */
    'fingerprint': string;
    /**
     *
     * @type {string}
     * @memberof AndroidAppConfigItem
     */
    'base64URL': string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof AndroidAppConfigItem
     */
    'created': string;
    /**
     * Timestamp of when the entity was last updated in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof AndroidAppConfigItem
     */
    'updated': string;
}
/**
 *
 * @export
 * @interface AndroidAppConfigListRsp
 */
export interface AndroidAppConfigListRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof AndroidAppConfigListRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof AndroidAppConfigListRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof AndroidAppConfigListRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof AndroidAppConfigListRsp
     */
    'runtime': number;
    /**
     *
     * @type {Array<AndroidAppConfigItem>}
     * @memberof AndroidAppConfigListRsp
     */
    'rows': Array<AndroidAppConfigItem>;
    /**
     *
     * @type {Paging}
     * @memberof AndroidAppConfigListRsp
     */
    'paging': Paging;
}
/**
 *
 * @export
 * @interface AndroidAppConfigSaveReq
 */
export interface AndroidAppConfigSaveReq {
    /**
     *
     * @type {string}
     * @memberof AndroidAppConfigSaveReq
     */
    'packageName': string;
    /**
     *
     * @type {string}
     * @memberof AndroidAppConfigSaveReq
     */
    'fingerprint': string;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof AndroidAppConfigSaveReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof AndroidAppConfigSaveReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface AndroidAppConfigSaveRsp
 */
export interface AndroidAppConfigSaveRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof AndroidAppConfigSaveRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof AndroidAppConfigSaveRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof AndroidAppConfigSaveRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof AndroidAppConfigSaveRsp
     */
    'runtime': number;
    /**
     * ID of Android app configuration
     * @type {string}
     * @memberof AndroidAppConfigSaveRsp
     */
    'id': string;
    /**
     * ID of project
     * @type {string}
     * @memberof AndroidAppConfigSaveRsp
     */
    'projectID': string;
    /**
     *
     * @type {string}
     * @memberof AndroidAppConfigSaveRsp
     */
    'packageName': string;
    /**
     *
     * @type {string}
     * @memberof AndroidAppConfigSaveRsp
     */
    'fingerprint': string;
    /**
     *
     * @type {string}
     * @memberof AndroidAppConfigSaveRsp
     */
    'base64URL': string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof AndroidAppConfigSaveRsp
     */
    'created': string;
    /**
     * Timestamp of when the entity was last updated in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof AndroidAppConfigSaveRsp
     */
    'updated': string;
}
/**
 *
 * @export
 * @interface AndroidAppConfigUpdateReq
 */
export interface AndroidAppConfigUpdateReq {
    /**
     *
     * @type {string}
     * @memberof AndroidAppConfigUpdateReq
     */
    'packageName': string;
    /**
     *
     * @type {string}
     * @memberof AndroidAppConfigUpdateReq
     */
    'fingerprint': string;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof AndroidAppConfigUpdateReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof AndroidAppConfigUpdateReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface AndroidAppConfigUpdateRsp
 */
export interface AndroidAppConfigUpdateRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof AndroidAppConfigUpdateRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof AndroidAppConfigUpdateRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof AndroidAppConfigUpdateRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof AndroidAppConfigUpdateRsp
     */
    'runtime': number;
    /**
     * ID of Android app configuration
     * @type {string}
     * @memberof AndroidAppConfigUpdateRsp
     */
    'id': string;
    /**
     * ID of project
     * @type {string}
     * @memberof AndroidAppConfigUpdateRsp
     */
    'projectID': string;
    /**
     *
     * @type {string}
     * @memberof AndroidAppConfigUpdateRsp
     */
    'packageName': string;
    /**
     *
     * @type {string}
     * @memberof AndroidAppConfigUpdateRsp
     */
    'fingerprint': string;
    /**
     *
     * @type {string}
     * @memberof AndroidAppConfigUpdateRsp
     */
    'base64URL': string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof AndroidAppConfigUpdateRsp
     */
    'created': string;
    /**
     * Timestamp of when the entity was last updated in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof AndroidAppConfigUpdateRsp
     */
    'updated': string;
}
/**
 * Application type
 * @export
 * @enum {string}
 */
export declare const AppType: {
    readonly Empty: "empty";
    readonly Web: "web";
    readonly Native: "native";
};
export type AppType = typeof AppType[keyof typeof AppType];
/**
 *
 * @export
 * @interface AssociationTokenCreateReq
 */
export interface AssociationTokenCreateReq {
    /**
     *
     * @type {string}
     * @memberof AssociationTokenCreateReq
     */
    'loginIdentifier': string;
    /**
     *
     * @type {LoginIdentifierType}
     * @memberof AssociationTokenCreateReq
     */
    'loginIdentifierType': LoginIdentifierType;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof AssociationTokenCreateReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof AssociationTokenCreateReq
     */
    'clientInfo': ClientInfo;
}
/**
 *
 * @export
 * @interface AssociationTokenCreateRsp
 */
export interface AssociationTokenCreateRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof AssociationTokenCreateRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof AssociationTokenCreateRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof AssociationTokenCreateRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof AssociationTokenCreateRsp
     */
    'runtime': number;
    /**
     *
     * @type {AssociationTokenCreateRspAllOfData}
     * @memberof AssociationTokenCreateRsp
     */
    'data': AssociationTokenCreateRspAllOfData;
}
/**
 *
 * @export
 * @interface AssociationTokenCreateRspAllOfData
 */
export interface AssociationTokenCreateRspAllOfData {
    /**
     *
     * @type {string}
     * @memberof AssociationTokenCreateRspAllOfData
     */
    'token'?: string;
    /**
     *
     * @type {string}
     * @memberof AssociationTokenCreateRspAllOfData
     */
    'rejectionReason'?: string;
}
/**
 * Authentication methods
 * @export
 * @enum {string}
 */
export declare const AuthMethod: {
    readonly Email: "email";
    readonly PhoneNumber: "phone_number";
    readonly Webauthn: "webauthn";
    readonly Password: "password";
};
export type AuthMethod = typeof AuthMethod[keyof typeof AuthMethod];
/**
 *
 * @export
 * @interface AuthMethodsListReq
 */
export interface AuthMethodsListReq {
    /**
     * Client\'s username
     * @type {string}
     * @memberof AuthMethodsListReq
     */
    'username': string;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof AuthMethodsListReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof AuthMethodsListReq
     */
    'clientInfo': ClientInfo;
}
/**
 *
 * @export
 * @interface AuthMethodsListRsp
 */
export interface AuthMethodsListRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof AuthMethodsListRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof AuthMethodsListRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof AuthMethodsListRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof AuthMethodsListRsp
     */
    'runtime': number;
    /**
     *
     * @type {AuthMethodsListRspAllOfData}
     * @memberof AuthMethodsListRsp
     */
    'data': AuthMethodsListRspAllOfData;
}
/**
 *
 * @export
 * @interface AuthMethodsListRspAllOfData
 */
export interface AuthMethodsListRspAllOfData {
    /**
     *
     * @type {Array<AuthMethod>}
     * @memberof AuthMethodsListRspAllOfData
     */
    'selectMethods': Array<AuthMethod>;
    /**
     *
     * @type {Array<AuthMethod>}
     * @memberof AuthMethodsListRspAllOfData
     */
    'possibleMethods': Array<AuthMethod>;
    /**
     *
     * @type {Paging}
     * @memberof AuthMethodsListRspAllOfData
     */
    'paging': Paging;
}
/**
 *
 * @export
 * @interface AuthTokenValidateReq
 */
export interface AuthTokenValidateReq {
    /**
     *
     * @type {string}
     * @memberof AuthTokenValidateReq
     */
    'token': string;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof AuthTokenValidateReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof AuthTokenValidateReq
     */
    'clientInfo': ClientInfo;
}
/**
 *
 * @export
 * @interface AuthTokenValidateRsp
 */
export interface AuthTokenValidateRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof AuthTokenValidateRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof AuthTokenValidateRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof AuthTokenValidateRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof AuthTokenValidateRsp
     */
    'runtime': number;
    /**
     *
     * @type {SessionTokenVerifyRspAllOfData}
     * @memberof AuthTokenValidateRsp
     */
    'data': SessionTokenVerifyRspAllOfData;
}
/**
 *
 * @export
 * @interface ClientInfo
 */
export interface ClientInfo {
    /**
     * client\'s IP address
     * @type {string}
     * @memberof ClientInfo
     */
    'remoteAddress': string;
    /**
     * client\'s User Agent
     * @type {string}
     * @memberof ClientInfo
     */
    'userAgent': string;
}
/**
 *
 * @export
 * @interface CustomLoginIdentifier
 */
export interface CustomLoginIdentifier {
    /**
     * ID of the phone number
     * @type {string}
     * @memberof CustomLoginIdentifier
     */
    'ID': string;
    /**
     *
     * @type {string}
     * @memberof CustomLoginIdentifier
     */
    'identifier': string;
    /**
     *
     * @type {string}
     * @memberof CustomLoginIdentifier
     */
    'additionalData'?: string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof CustomLoginIdentifier
     */
    'created': string;
    /**
     * Timestamp of when the entity was last updated in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof CustomLoginIdentifier
     */
    'updated': string;
}
/**
 *
 * @export
 * @interface Email
 */
export interface Email {
    /**
     * ID of the email
     * @type {string}
     * @memberof Email
     */
    'ID': string;
    /**
     *
     * @type {string}
     * @memberof Email
     */
    'email': string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof Email
     */
    'created': string;
    /**
     * Timestamp of when the entity was last updated in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof Email
     */
    'updated': string;
    /**
     * Timestamp of when the entity was deleted in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof Email
     */
    'deleted'?: string;
    /**
     *
     * @type {Status}
     * @memberof Email
     */
    'status': Status;
}
/**
 *
 * @export
 * @interface EmailCode
 */
export interface EmailCode {
    /**
     * ID of the email OTP
     * @type {string}
     * @memberof EmailCode
     */
    'ID': string;
    /**
     * ID of the user
     * @type {string}
     * @memberof EmailCode
     */
    'userID': string;
    /**
     *
     * @type {string}
     * @memberof EmailCode
     */
    'email': string;
    /**
     *
     * @type {string}
     * @memberof EmailCode
     */
    'userFullName'?: string;
    /**
     * Additional payload in JSON format
     * @type {string}
     * @memberof EmailCode
     */
    'additionalPayload': string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof EmailCode
     */
    'created': string;
    /**
     * Timestamp of when the entity was last updated in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof EmailCode
     */
    'updated': string;
    /**
     * status values of an email OTP
     * @type {string}
     * @memberof EmailCode
     */
    'status': EmailCodeStatusEnum;
}
export declare const EmailCodeStatusEnum: {
    readonly Active: "active";
    readonly Confirmed: "confirmed";
};
export type EmailCodeStatusEnum = typeof EmailCodeStatusEnum[keyof typeof EmailCodeStatusEnum];
/**
 *
 * @export
 * @interface EmailCodeGetRsp
 */
export interface EmailCodeGetRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof EmailCodeGetRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof EmailCodeGetRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof EmailCodeGetRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof EmailCodeGetRsp
     */
    'runtime': number;
    /**
     *
     * @type {EmailCodeGetRspAllOfData}
     * @memberof EmailCodeGetRsp
     */
    'data': EmailCodeGetRspAllOfData;
}
/**
 *
 * @export
 * @interface EmailCodeGetRspAllOfData
 */
export interface EmailCodeGetRspAllOfData {
    /**
     *
     * @type {EmailCode}
     * @memberof EmailCodeGetRspAllOfData
     */
    'emailCode': EmailCode;
}
/**
 *
 * @export
 * @interface EmailCodeSendReq
 */
export interface EmailCodeSendReq {
    /**
     * Recipient email address
     * @type {string}
     * @memberof EmailCodeSendReq
     */
    'email': string;
    /**
     * Defines if user email should be created if not found
     * @type {boolean}
     * @memberof EmailCodeSendReq
     */
    'create': boolean;
    /**
     * Defines the lifetime of the token that needs to be validated
     * @type {string}
     * @memberof EmailCodeSendReq
     */
    'tokenLifetime'?: string;
    /**
     * Optional user\'s full name to be used if the user wasn\'t found and needs to be created first
     * @type {string}
     * @memberof EmailCodeSendReq
     */
    'userFullName'?: string;
    /**
     * Template name of email to send
     * @type {string}
     * @memberof EmailCodeSendReq
     */
    'templateName'?: string;
    /**
     * Additional payload in JSON format
     * @type {string}
     * @memberof EmailCodeSendReq
     */
    'additionalPayload'?: string;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof EmailCodeSendReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof EmailCodeSendReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface EmailCodeSendRsp
 */
export interface EmailCodeSendRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof EmailCodeSendRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof EmailCodeSendRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof EmailCodeSendRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof EmailCodeSendRsp
     */
    'runtime': number;
    /**
     *
     * @type {EmailCodeSendRspAllOfData}
     * @memberof EmailCodeSendRsp
     */
    'data': EmailCodeSendRspAllOfData;
}
/**
 *
 * @export
 * @interface EmailCodeSendRspAllOfData
 */
export interface EmailCodeSendRspAllOfData {
    /**
     *
     * @type {string}
     * @memberof EmailCodeSendRspAllOfData
     */
    'emailCodeID': string;
}
/**
 *
 * @export
 * @interface EmailCodeValidateReq
 */
export interface EmailCodeValidateReq {
    /**
     * Email OTP to validate
     * @type {string}
     * @memberof EmailCodeValidateReq
     */
    'code': string;
    /**
     *
     * @type {boolean}
     * @memberof EmailCodeValidateReq
     */
    'createLoginToken'?: boolean;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof EmailCodeValidateReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof EmailCodeValidateReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface EmailCodeValidateRsp
 */
export interface EmailCodeValidateRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof EmailCodeValidateRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof EmailCodeValidateRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof EmailCodeValidateRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof EmailCodeValidateRsp
     */
    'runtime': number;
    /**
     * Additional payload in JSON format
     * @type {string}
     * @memberof EmailCodeValidateRsp
     */
    'additionalPayload'?: string;
    /**
     * ID of the user
     * @type {string}
     * @memberof EmailCodeValidateRsp
     */
    'userID': string;
    /**
     *
     * @type {string}
     * @memberof EmailCodeValidateRsp
     */
    'userFullName': string;
    /**
     *
     * @type {string}
     * @memberof EmailCodeValidateRsp
     */
    'userEmail': string;
    /**
     *
     * @type {string}
     * @memberof EmailCodeValidateRsp
     */
    'loginToken'?: string;
}
/**
 *
 * @export
 * @interface EmailLink
 */
export interface EmailLink {
    /**
     * ID of the email magic link
     * @type {string}
     * @memberof EmailLink
     */
    'ID': string;
    /**
     * ID of the user
     * @type {string}
     * @memberof EmailLink
     */
    'userID': string;
    /**
     *
     * @type {string}
     * @memberof EmailLink
     */
    'email': string;
    /**
     *
     * @type {string}
     * @memberof EmailLink
     */
    'userFullName'?: string;
    /**
     *
     * @type {string}
     * @memberof EmailLink
     */
    'purpose'?: string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof EmailLink
     */
    'created': string;
    /**
     * Timestamp of when the entity was last updated in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof EmailLink
     */
    'updated': string;
    /**
     * status values of an email link
     * @type {string}
     * @memberof EmailLink
     */
    'status': EmailLinkStatusEnum;
    /**
     * Additional payload in JSON format
     * @type {string}
     * @memberof EmailLink
     */
    'additionalPayload': string;
}
export declare const EmailLinkStatusEnum: {
    readonly Active: "active";
    readonly Confirmed: "confirmed";
};
export type EmailLinkStatusEnum = typeof EmailLinkStatusEnum[keyof typeof EmailLinkStatusEnum];
/**
 *
 * @export
 * @interface EmailLinkGetRsp
 */
export interface EmailLinkGetRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof EmailLinkGetRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof EmailLinkGetRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof EmailLinkGetRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof EmailLinkGetRsp
     */
    'runtime': number;
    /**
     *
     * @type {EmailLinkGetRspAllOfData}
     * @memberof EmailLinkGetRsp
     */
    'data': EmailLinkGetRspAllOfData;
}
/**
 *
 * @export
 * @interface EmailLinkGetRspAllOfData
 */
export interface EmailLinkGetRspAllOfData {
    /**
     *
     * @type {EmailLink}
     * @memberof EmailLinkGetRspAllOfData
     */
    'emailLink': EmailLink;
}
/**
 *
 * @export
 * @interface EmailLinkSendReq
 */
export interface EmailLinkSendReq {
    /**
     * Recipient email address
     * @type {string}
     * @memberof EmailLinkSendReq
     */
    'email': string;
    /**
     * Defines if user email should be created if not found
     * @type {boolean}
     * @memberof EmailLinkSendReq
     */
    'create': boolean;
    /**
     * Defines the lifetime of the token that needs to be validated
     * @type {string}
     * @memberof EmailLinkSendReq
     */
    'tokenLifetime'?: string;
    /**
     * Optional user\'s full name to be used if the user wasn\'t found and needs to be created first
     * @type {string}
     * @memberof EmailLinkSendReq
     */
    'userFullName'?: string;
    /**
     * Template name of email to send
     * @type {string}
     * @memberof EmailLinkSendReq
     */
    'templateName'?: string;
    /**
     * Purpose of the email link
     * @type {string}
     * @memberof EmailLinkSendReq
     */
    'purpose'?: EmailLinkSendReqPurposeEnum;
    /**
     * Redirect target after user clicks on email magic link
     * @type {string}
     * @memberof EmailLinkSendReq
     */
    'redirect': string;
    /**
     * Additional payload in JSON format
     * @type {string}
     * @memberof EmailLinkSendReq
     */
    'additionalPayload'?: string;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof EmailLinkSendReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof EmailLinkSendReq
     */
    'clientInfo'?: ClientInfo;
}
export declare const EmailLinkSendReqPurposeEnum: {
    readonly Authentication: "authentication";
    readonly Confirmation: "confirmation";
    readonly Invitation: "invitation";
};
export type EmailLinkSendReqPurposeEnum = typeof EmailLinkSendReqPurposeEnum[keyof typeof EmailLinkSendReqPurposeEnum];
/**
 *
 * @export
 * @interface EmailLinkSendRsp
 */
export interface EmailLinkSendRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof EmailLinkSendRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof EmailLinkSendRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof EmailLinkSendRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof EmailLinkSendRsp
     */
    'runtime': number;
    /**
     *
     * @type {EmailLinkSendRspAllOfData}
     * @memberof EmailLinkSendRsp
     */
    'data': EmailLinkSendRspAllOfData;
}
/**
 *
 * @export
 * @interface EmailLinkSendRspAllOfData
 */
export interface EmailLinkSendRspAllOfData {
    /**
     *
     * @type {string}
     * @memberof EmailLinkSendRspAllOfData
     */
    'emailLinkID': string;
}
/**
 *
 * @export
 * @interface EmailLinkValidateRsp
 */
export interface EmailLinkValidateRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof EmailLinkValidateRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof EmailLinkValidateRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof EmailLinkValidateRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof EmailLinkValidateRsp
     */
    'runtime': number;
    /**
     * Additional payload in JSON format
     * @type {string}
     * @memberof EmailLinkValidateRsp
     */
    'additionalPayload'?: string;
    /**
     * ID of the user
     * @type {string}
     * @memberof EmailLinkValidateRsp
     */
    'userID': string;
    /**
     *
     * @type {string}
     * @memberof EmailLinkValidateRsp
     */
    'userFullName': string;
    /**
     *
     * @type {string}
     * @memberof EmailLinkValidateRsp
     */
    'userEmail': string;
    /**
     *
     * @type {string}
     * @memberof EmailLinkValidateRsp
     */
    'loginToken'?: string;
}
/**
 *
 * @export
 * @interface EmailLinksDeleteReq
 */
export interface EmailLinksDeleteReq {
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof EmailLinksDeleteReq
     */
    'requestID': string;
    /**
     *
     * @type {ClientInfo}
     * @memberof EmailLinksDeleteReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface EmailLinksValidateReq
 */
export interface EmailLinksValidateReq {
    /**
     * Token to validate
     * @type {string}
     * @memberof EmailLinksValidateReq
     */
    'token': string;
    /**
     *
     * @type {boolean}
     * @memberof EmailLinksValidateReq
     */
    'createLoginToken'?: boolean;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof EmailLinksValidateReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof EmailLinksValidateReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface EmailTemplateCreateReq
 */
export interface EmailTemplateCreateReq {
    /**
     *
     * @type {string}
     * @memberof EmailTemplateCreateReq
     */
    'lang': EmailTemplateCreateReqLangEnum;
    /**
     *
     * @type {string}
     * @memberof EmailTemplateCreateReq
     */
    'type': EmailTemplateCreateReqTypeEnum;
    /**
     *
     * @type {string}
     * @memberof EmailTemplateCreateReq
     */
    'name': string;
    /**
     *
     * @type {string}
     * @memberof EmailTemplateCreateReq
     */
    'subject': string;
    /**
     *
     * @type {string}
     * @memberof EmailTemplateCreateReq
     */
    'action'?: string;
    /**
     *
     * @type {string}
     * @memberof EmailTemplateCreateReq
     */
    'plainTextBody': string;
    /**
     *
     * @type {string}
     * @memberof EmailTemplateCreateReq
     */
    'htmlTextTitle': string;
    /**
     *
     * @type {string}
     * @memberof EmailTemplateCreateReq
     */
    'htmlTextBody': string;
    /**
     *
     * @type {string}
     * @memberof EmailTemplateCreateReq
     */
    'htmlTextButton': string;
    /**
     *
     * @type {string}
     * @memberof EmailTemplateCreateReq
     */
    'htmlColorFont': string;
    /**
     *
     * @type {string}
     * @memberof EmailTemplateCreateReq
     */
    'htmlColorBackgroundOuter': string;
    /**
     *
     * @type {string}
     * @memberof EmailTemplateCreateReq
     */
    'htmlColorBackgroundInner': string;
    /**
     *
     * @type {string}
     * @memberof EmailTemplateCreateReq
     */
    'htmlColorButton': string;
    /**
     *
     * @type {string}
     * @memberof EmailTemplateCreateReq
     */
    'htmlColorButtonFont': string;
    /**
     *
     * @type {boolean}
     * @memberof EmailTemplateCreateReq
     */
    'isDefault': boolean;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof EmailTemplateCreateReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof EmailTemplateCreateReq
     */
    'clientInfo'?: ClientInfo;
}
export declare const EmailTemplateCreateReqLangEnum: {
    readonly En: "en";
    readonly De: "de";
    readonly Fr: "fr";
};
export type EmailTemplateCreateReqLangEnum = typeof EmailTemplateCreateReqLangEnum[keyof typeof EmailTemplateCreateReqLangEnum];
export declare const EmailTemplateCreateReqTypeEnum: {
    readonly EmailLink: "email_link";
    readonly EmailLinkLogin: "email_link_login";
    readonly LoginNotification: "login_notification";
    readonly PasskeyNotification: "passkey_notification";
    readonly EmailCode: "email_code";
};
export type EmailTemplateCreateReqTypeEnum = typeof EmailTemplateCreateReqTypeEnum[keyof typeof EmailTemplateCreateReqTypeEnum];
/**
 *
 * @export
 * @interface EmailTemplateCreateRsp
 */
export interface EmailTemplateCreateRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof EmailTemplateCreateRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof EmailTemplateCreateRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof EmailTemplateCreateRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof EmailTemplateCreateRsp
     */
    'runtime': number;
    /**
     *
     * @type {EmailTemplateCreateRspAllOfData}
     * @memberof EmailTemplateCreateRsp
     */
    'data': EmailTemplateCreateRspAllOfData;
}
/**
 *
 * @export
 * @interface EmailTemplateCreateRspAllOfData
 */
export interface EmailTemplateCreateRspAllOfData {
    /**
     *
     * @type {string}
     * @memberof EmailTemplateCreateRspAllOfData
     */
    'emailTemplateID': string;
}
/**
 *
 * @export
 * @interface EmailTemplateDeleteReq
 */
export interface EmailTemplateDeleteReq {
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof EmailTemplateDeleteReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof EmailTemplateDeleteReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface EmailValidationResult
 */
export interface EmailValidationResult {
    /**
     *
     * @type {boolean}
     * @memberof EmailValidationResult
     */
    'isValid': boolean;
    /**
     *
     * @type {string}
     * @memberof EmailValidationResult
     */
    'validationCode': EmailValidationResultValidationCodeEnum;
    /**
     *
     * @type {string}
     * @memberof EmailValidationResult
     */
    'suggestion'?: string;
    /**
     *
     * @type {ValidationEmail}
     * @memberof EmailValidationResult
     */
    'email'?: ValidationEmail;
}
export declare const EmailValidationResultValidationCodeEnum: {
    readonly Valid: "valid";
    readonly InvalidSyntax: "invalid_syntax";
    readonly NoSuchHost: "no_such_host";
    readonly NotAllowed: "not_allowed";
    readonly Unknown: "unknown";
};
export type EmailValidationResultValidationCodeEnum = typeof EmailValidationResultValidationCodeEnum[keyof typeof EmailValidationResultValidationCodeEnum];
/**
 *
 * @export
 * @interface EmptyReq
 */
export interface EmptyReq {
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof EmptyReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof EmptyReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface ErrorRsp
 */
export interface ErrorRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof ErrorRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof ErrorRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof ErrorRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof ErrorRsp
     */
    'runtime': number;
    /**
     *
     * @type {object}
     * @memberof ErrorRsp
     */
    'data'?: object;
    /**
     *
     * @type {ErrorRspAllOfError}
     * @memberof ErrorRsp
     */
    'error': ErrorRspAllOfError;
}
/**
 *
 * @export
 * @interface ErrorRspAllOfError
 */
export interface ErrorRspAllOfError {
    /**
     * Type of error
     * @type {string}
     * @memberof ErrorRspAllOfError
     */
    'type': string;
    /**
     * Details of error
     * @type {string}
     * @memberof ErrorRspAllOfError
     */
    'details'?: string;
    /**
     * Validation errors per field
     * @type {Array<ErrorRspAllOfErrorValidation>}
     * @memberof ErrorRspAllOfError
     */
    'validation'?: Array<ErrorRspAllOfErrorValidation>;
    /**
     * Additional links to help understand the error
     * @type {Array<string>}
     * @memberof ErrorRspAllOfError
     */
    'links': Array<string>;
}
/**
 *
 * @export
 * @interface ErrorRspAllOfErrorValidation
 */
export interface ErrorRspAllOfErrorValidation {
    /**
     *
     * @type {string}
     * @memberof ErrorRspAllOfErrorValidation
     */
    'field': string;
    /**
     *
     * @type {string}
     * @memberof ErrorRspAllOfErrorValidation
     */
    'message': string;
}
/**
 *
 * @export
 * @interface ExampleGetRsp
 */
export interface ExampleGetRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof ExampleGetRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof ExampleGetRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof ExampleGetRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof ExampleGetRsp
     */
    'runtime': number;
    /**
     * Base64 encoded data containing the compressed example file
     * @type {string}
     * @memberof ExampleGetRsp
     */
    'data': string;
    /**
     * The extension of the compressed example file
     * @type {string}
     * @memberof ExampleGetRsp
     */
    'extension': ExampleGetRspExtensionEnum;
}
export declare const ExampleGetRspExtensionEnum: {
    readonly Zip: "zip";
    readonly TarGz: "tar.gz";
};
export type ExampleGetRspExtensionEnum = typeof ExampleGetRspExtensionEnum[keyof typeof ExampleGetRspExtensionEnum];
/**
 * User entry with emails and phone numbers
 * @export
 * @interface FullUser
 */
export interface FullUser {
    /**
     * ID of the user
     * @type {string}
     * @memberof FullUser
     */
    'ID': string;
    /**
     *
     * @type {string}
     * @memberof FullUser
     */
    'name': string;
    /**
     *
     * @type {string}
     * @memberof FullUser
     */
    'fullName': string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof FullUser
     */
    'created': string;
    /**
     * Timestamp of when the entity was last updated in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof FullUser
     */
    'updated': string;
    /**
     *
     * @type {Status}
     * @memberof FullUser
     */
    'status': Status;
    /**
     *
     * @type {Array<UserEmail>}
     * @memberof FullUser
     */
    'emails': Array<UserEmail>;
    /**
     *
     * @type {Array<UserPhoneNumber>}
     * @memberof FullUser
     */
    'phoneNumbers': Array<UserPhoneNumber>;
}
/**
 *
 * @export
 * @interface GenericRsp
 */
export interface GenericRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof GenericRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof GenericRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof GenericRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof GenericRsp
     */
    'runtime': number;
}
/**
 *
 * @export
 * @interface IOSAppConfigDeleteReq
 */
export interface IOSAppConfigDeleteReq {
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof IOSAppConfigDeleteReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof IOSAppConfigDeleteReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface IOSAppConfigItem
 */
export interface IOSAppConfigItem {
    /**
     * ID of iOS app
     * @type {string}
     * @memberof IOSAppConfigItem
     */
    'id': string;
    /**
     * ID of project
     * @type {string}
     * @memberof IOSAppConfigItem
     */
    'projectID': string;
    /**
     *
     * @type {string}
     * @memberof IOSAppConfigItem
     */
    'appIDPrefix': string;
    /**
     *
     * @type {string}
     * @memberof IOSAppConfigItem
     */
    'bundleID': string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof IOSAppConfigItem
     */
    'created': string;
    /**
     * Timestamp of when the entity was last updated in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof IOSAppConfigItem
     */
    'updated': string;
}
/**
 *
 * @export
 * @interface IOSAppConfigListRsp
 */
export interface IOSAppConfigListRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof IOSAppConfigListRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof IOSAppConfigListRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof IOSAppConfigListRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof IOSAppConfigListRsp
     */
    'runtime': number;
    /**
     *
     * @type {Array<IOSAppConfigItem>}
     * @memberof IOSAppConfigListRsp
     */
    'rows': Array<IOSAppConfigItem>;
    /**
     *
     * @type {Paging}
     * @memberof IOSAppConfigListRsp
     */
    'paging': Paging;
}
/**
 *
 * @export
 * @interface IOSAppConfigSaveReq
 */
export interface IOSAppConfigSaveReq {
    /**
     *
     * @type {string}
     * @memberof IOSAppConfigSaveReq
     */
    'appIDPrefix': string;
    /**
     *
     * @type {string}
     * @memberof IOSAppConfigSaveReq
     */
    'bundleID': string;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof IOSAppConfigSaveReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof IOSAppConfigSaveReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface IOSAppConfigSaveRsp
 */
export interface IOSAppConfigSaveRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof IOSAppConfigSaveRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof IOSAppConfigSaveRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof IOSAppConfigSaveRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof IOSAppConfigSaveRsp
     */
    'runtime': number;
    /**
     * ID of iOS app
     * @type {string}
     * @memberof IOSAppConfigSaveRsp
     */
    'id': string;
    /**
     * ID of project
     * @type {string}
     * @memberof IOSAppConfigSaveRsp
     */
    'projectID': string;
    /**
     *
     * @type {string}
     * @memberof IOSAppConfigSaveRsp
     */
    'appIDPrefix': string;
    /**
     *
     * @type {string}
     * @memberof IOSAppConfigSaveRsp
     */
    'bundleID': string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof IOSAppConfigSaveRsp
     */
    'created': string;
    /**
     * Timestamp of when the entity was last updated in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof IOSAppConfigSaveRsp
     */
    'updated': string;
}
/**
 *
 * @export
 * @interface IOSAppConfigUpdateReq
 */
export interface IOSAppConfigUpdateReq {
    /**
     *
     * @type {string}
     * @memberof IOSAppConfigUpdateReq
     */
    'appIDPrefix': string;
    /**
     *
     * @type {string}
     * @memberof IOSAppConfigUpdateReq
     */
    'bundleID': string;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof IOSAppConfigUpdateReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof IOSAppConfigUpdateReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface IOSAppConfigUpdateRsp
 */
export interface IOSAppConfigUpdateRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof IOSAppConfigUpdateRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof IOSAppConfigUpdateRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof IOSAppConfigUpdateRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof IOSAppConfigUpdateRsp
     */
    'runtime': number;
    /**
     * ID of iOS app
     * @type {string}
     * @memberof IOSAppConfigUpdateRsp
     */
    'id': string;
    /**
     * ID of project
     * @type {string}
     * @memberof IOSAppConfigUpdateRsp
     */
    'projectID': string;
    /**
     *
     * @type {string}
     * @memberof IOSAppConfigUpdateRsp
     */
    'appIDPrefix': string;
    /**
     *
     * @type {string}
     * @memberof IOSAppConfigUpdateRsp
     */
    'bundleID': string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof IOSAppConfigUpdateRsp
     */
    'created': string;
    /**
     * Timestamp of when the entity was last updated in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof IOSAppConfigUpdateRsp
     */
    'updated': string;
}
/**
 * Login Identifier type
 * @export
 * @enum {string}
 */
export declare const LoginIdentifierType: {
    readonly Email: "email";
    readonly PhoneNumber: "phone_number";
    readonly Custom: "custom";
};
export type LoginIdentifierType = typeof LoginIdentifierType[keyof typeof LoginIdentifierType];
/**
 *
 * @export
 * @interface LongSession
 */
export interface LongSession {
    /**
     *
     * @type {string}
     * @memberof LongSession
     */
    'ID': string;
    /**
     * ID of the user
     * @type {string}
     * @memberof LongSession
     */
    'userID': string;
    /**
     *
     * @type {string}
     * @memberof LongSession
     */
    'userIdentifier': string;
    /**
     *
     * @type {string}
     * @memberof LongSession
     */
    'userFullName': string;
    /**
     * ID of the device
     * @type {string}
     * @memberof LongSession
     */
    'deviceID': string;
    /**
     *
     * @type {string}
     * @memberof LongSession
     */
    'browserName': string;
    /**
     *
     * @type {string}
     * @memberof LongSession
     */
    'browserVersion': string;
    /**
     *
     * @type {string}
     * @memberof LongSession
     */
    'osName': string;
    /**
     *
     * @type {string}
     * @memberof LongSession
     */
    'osVersion': string;
    /**
     * Timestamp of when long session expires in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof LongSession
     */
    'expires': string;
    /**
     * Timestamp of when last action was done on long session in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof LongSession
     */
    'lastAction': string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof LongSession
     */
    'created': string;
    /**
     * Timestamp of when the entity was last updated in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof LongSession
     */
    'updated': string;
    /**
     * status values of a long session
     * @type {string}
     * @memberof LongSession
     */
    'status': LongSessionStatusEnum;
}
export declare const LongSessionStatusEnum: {
    readonly Active: "active";
    readonly LoggedOut: "logged_out";
    readonly Expired: "expired";
    readonly InactivityReached: "inactivity_reached";
    readonly Revoked: "revoked";
};
export type LongSessionStatusEnum = typeof LongSessionStatusEnum[keyof typeof LongSessionStatusEnum];
/**
 *
 * @export
 * @interface LongSessionGetRsp
 */
export interface LongSessionGetRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof LongSessionGetRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof LongSessionGetRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof LongSessionGetRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof LongSessionGetRsp
     */
    'runtime': number;
    /**
     *
     * @type {LongSessionGetRspAllOfData}
     * @memberof LongSessionGetRsp
     */
    'data': LongSessionGetRspAllOfData;
}
/**
 *
 * @export
 * @interface LongSessionGetRspAllOfData
 */
export interface LongSessionGetRspAllOfData {
    /**
     *
     * @type {LongSession}
     * @memberof LongSessionGetRspAllOfData
     */
    'longSession': LongSession;
}
/**
 *
 * @export
 * @interface LongSessionListRsp
 */
export interface LongSessionListRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof LongSessionListRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof LongSessionListRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof LongSessionListRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof LongSessionListRsp
     */
    'runtime': number;
    /**
     *
     * @type {LongSessionListRspAllOfData}
     * @memberof LongSessionListRsp
     */
    'data': LongSessionListRspAllOfData;
}
/**
 *
 * @export
 * @interface LongSessionListRspAllOfData
 */
export interface LongSessionListRspAllOfData {
    /**
     *
     * @type {Array<LongSession>}
     * @memberof LongSessionListRspAllOfData
     */
    'longSessions': Array<LongSession>;
    /**
     *
     * @type {Paging}
     * @memberof LongSessionListRspAllOfData
     */
    'paging': Paging;
}
/**
 *
 * @export
 * @interface LongSessionRevokeReq
 */
export interface LongSessionRevokeReq {
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof LongSessionRevokeReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof LongSessionRevokeReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface Paging
 */
export interface Paging {
    /**
     * current page returned in response
     * @type {number}
     * @memberof Paging
     */
    'page': number;
    /**
     * total number of pages available
     * @type {number}
     * @memberof Paging
     */
    'totalPages': number;
    /**
     * total number of items available
     * @type {number}
     * @memberof Paging
     */
    'totalItems': number;
}
/**
 *
 * @export
 * @interface PhoneNumber
 */
export interface PhoneNumber {
    /**
     * ID of the phone number
     * @type {string}
     * @memberof PhoneNumber
     */
    'ID': string;
    /**
     *
     * @type {string}
     * @memberof PhoneNumber
     */
    'phoneNumber': string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof PhoneNumber
     */
    'created': string;
    /**
     * Timestamp of when the entity was last updated in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof PhoneNumber
     */
    'updated': string;
    /**
     *
     * @type {Status}
     * @memberof PhoneNumber
     */
    'status': Status;
}
/**
 *
 * @export
 * @interface PhoneNumberValidationResult
 */
export interface PhoneNumberValidationResult {
    /**
     *
     * @type {boolean}
     * @memberof PhoneNumberValidationResult
     */
    'isValid': boolean;
    /**
     *
     * @type {string}
     * @memberof PhoneNumberValidationResult
     */
    'validationCode': PhoneNumberValidationResultValidationCodeEnum;
    /**
     *
     * @type {ValidationPhoneNumber}
     * @memberof PhoneNumberValidationResult
     */
    'phoneNumber'?: ValidationPhoneNumber;
}
export declare const PhoneNumberValidationResultValidationCodeEnum: {
    readonly Valid: "valid";
    readonly InvalidCountryCode: "invalid_country_code";
    readonly InvalidNumber: "invalid_number";
    readonly TooLong: "too_long";
};
export type PhoneNumberValidationResultValidationCodeEnum = typeof PhoneNumberValidationResultValidationCodeEnum[keyof typeof PhoneNumberValidationResultValidationCodeEnum];
/**
 *
 * @export
 * @interface ProjectConfig
 */
export interface ProjectConfig {
    /**
     * ID of project
     * @type {string}
     * @memberof ProjectConfig
     */
    'projectID': string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'externalName': string;
    /**
     *
     * @type {AppType}
     * @memberof ProjectConfig
     */
    'appType': AppType;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'productKey': string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'emailFrom': string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'smsFrom': string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'externalApplicationProtocolVersion': string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'webhookURL': string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'webhookUsername': string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'webhookPassword': string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'webhookTestInvalidUsername': string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'webhookTestValidUsername': string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'webhookTestValidPassword': string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'externalApplicationUsername': string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'externalApplicationPassword': string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'legacyAuthMethodsUrl': string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'passwordVerifyUrl': string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'authSuccessRedirectUrl': string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'passwordResetUrl': string;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfig
     */
    'allowUserRegistration': boolean;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfig
     */
    'allowIPStickiness': boolean;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'passkeyAppendInterval': ProjectConfigPasskeyAppendIntervalEnum;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'cliSecret': string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'fallbackLanguage': string;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfig
     */
    'autoDetectLanguage': boolean;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfig
     */
    'integrationModeHosted': boolean;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfig
     */
    'integrationModeAPI': boolean;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfig
     */
    'integrationModeWebComponent': boolean;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfig
     */
    'hasExistingUsers': boolean;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfig
     */
    'hasVerifiedSession': boolean;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfig
     */
    'hasGeneratedSession': boolean;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfig
     */
    'hasStartedUsingPasskeys': boolean;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfig
     */
    'hasStartedUsingSessions': boolean;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'environment': ProjectConfigEnvironmentEnum;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'frontendFramework': ProjectConfigFrontendFrameworkEnum;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'backendLanguage': ProjectConfigBackendLanguageEnum;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'backendAPIUrl': string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'frontendAPIUrl': string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'applicationUrl': string;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfig
     */
    'useCli': boolean;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfig
     */
    'doubleOptIn': boolean;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfig
     */
    'userFullNameRequired': boolean;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'webauthnRPID': string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'domain': string;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfig
     */
    'webComponentDebug': boolean;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfig
     */
    'smtpUseCustom': boolean;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'smtpHost': string;
    /**
     *
     * @type {number}
     * @memberof ProjectConfig
     */
    'smtpPort': number;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'smtpUsername': string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'smtpPassword': string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'supportEmail': string;
    /**
     *
     * @type {Array<string>}
     * @memberof ProjectConfig
     */
    'webhookActions': Array<string>;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'signupFlow': ProjectConfigSignupFlowEnum;
    /**
     *
     * @type {object}
     * @memberof ProjectConfig
     */
    'signupFlowOptions': object;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'loginFlow': ProjectConfigLoginFlowEnum;
    /**
     *
     * @type {object}
     * @memberof ProjectConfig
     */
    'loginFlowOptions': object;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof ProjectConfig
     */
    'created': string;
    /**
     * Timestamp of when the entity was last updated in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof ProjectConfig
     */
    'updated': string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfig
     */
    'status': ProjectConfigStatusEnum;
}
export declare const ProjectConfigPasskeyAppendIntervalEnum: {
    readonly NotSpecified: "not_specified";
    readonly _0d: "0d";
    readonly _1d: "1d";
    readonly _3d: "3d";
    readonly _1w: "1w";
    readonly _3w: "3w";
    readonly _1m: "1m";
    readonly _3m: "3m";
};
export type ProjectConfigPasskeyAppendIntervalEnum = typeof ProjectConfigPasskeyAppendIntervalEnum[keyof typeof ProjectConfigPasskeyAppendIntervalEnum];
export declare const ProjectConfigEnvironmentEnum: {
    readonly Dev: "dev";
    readonly Prod: "prod";
};
export type ProjectConfigEnvironmentEnum = typeof ProjectConfigEnvironmentEnum[keyof typeof ProjectConfigEnvironmentEnum];
export declare const ProjectConfigFrontendFrameworkEnum: {
    readonly NotSpecified: "not_specified";
    readonly React: "react";
    readonly Vuejs: "vuejs";
    readonly Vanillajs: "vanillajs";
};
export type ProjectConfigFrontendFrameworkEnum = typeof ProjectConfigFrontendFrameworkEnum[keyof typeof ProjectConfigFrontendFrameworkEnum];
export declare const ProjectConfigBackendLanguageEnum: {
    readonly NotSpecified: "not_specified";
    readonly Javascript: "javascript";
    readonly Php: "php";
    readonly Go: "go";
};
export type ProjectConfigBackendLanguageEnum = typeof ProjectConfigBackendLanguageEnum[keyof typeof ProjectConfigBackendLanguageEnum];
export declare const ProjectConfigSignupFlowEnum: {
    readonly PasskeyWithEmailOtpFallback: "PasskeyWithEmailOTPFallback";
    readonly EmailOtpSignup: "EmailOTPSignup";
};
export type ProjectConfigSignupFlowEnum = typeof ProjectConfigSignupFlowEnum[keyof typeof ProjectConfigSignupFlowEnum];
export declare const ProjectConfigLoginFlowEnum: {
    readonly PasskeyWithEmailOtpFallback: "PasskeyWithEmailOTPFallback";
};
export type ProjectConfigLoginFlowEnum = typeof ProjectConfigLoginFlowEnum[keyof typeof ProjectConfigLoginFlowEnum];
export declare const ProjectConfigStatusEnum: {
    readonly Active: "active";
    readonly Configuring: "configuring";
};
export type ProjectConfigStatusEnum = typeof ProjectConfigStatusEnum[keyof typeof ProjectConfigStatusEnum];
/**
 *
 * @export
 * @interface ProjectConfigGetRsp
 */
export interface ProjectConfigGetRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof ProjectConfigGetRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigGetRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof ProjectConfigGetRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof ProjectConfigGetRsp
     */
    'runtime': number;
    /**
     *
     * @type {ProjectConfig}
     * @memberof ProjectConfigGetRsp
     */
    'data': ProjectConfig;
}
/**
 *
 * @export
 * @interface ProjectConfigSaveReq
 */
export interface ProjectConfigSaveReq {
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'externalName'?: string;
    /**
     *
     * @type {AppType}
     * @memberof ProjectConfigSaveReq
     */
    'appType'?: AppType;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'productKey'?: string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'emailFrom'?: string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'smsFrom'?: string;
    /**
     * Defines which version of webhook is used
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'externalApplicationProtocolVersion'?: ProjectConfigSaveReqExternalApplicationProtocolVersionEnum;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'webhookURL'?: string;
    /**
     *
     * @type {Array<string>}
     * @memberof ProjectConfigSaveReq
     */
    'webhookActions'?: Array<string>;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'webhookUsername'?: string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'webhookPassword'?: string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'webhookTestInvalidUsername'?: string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'webhookTestValidUsername'?: string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'webhookTestValidPassword'?: string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'externalApplicationUsername'?: string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'externalApplicationPassword'?: string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'legacyAuthMethodsUrl'?: string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'passwordVerifyUrl'?: string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'authSuccessRedirectUrl'?: string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'passwordResetUrl'?: string;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfigSaveReq
     */
    'allowUserRegistration'?: boolean;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfigSaveReq
     */
    'allowIPStickiness'?: boolean;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'passkeyAppendInterval'?: ProjectConfigSaveReqPasskeyAppendIntervalEnum;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'fallbackLanguage'?: string;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfigSaveReq
     */
    'autoDetectLanguage'?: boolean;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfigSaveReq
     */
    'integrationModeHosted'?: boolean;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfigSaveReq
     */
    'integrationModeAPI'?: boolean;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfigSaveReq
     */
    'integrationModeWebComponent'?: boolean;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfigSaveReq
     */
    'hasExistingUsers'?: boolean;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfigSaveReq
     */
    'hasVerifiedSession'?: boolean;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfigSaveReq
     */
    'hasGeneratedSession'?: boolean;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfigSaveReq
     */
    'hasStartedUsingPasskeys'?: boolean;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfigSaveReq
     */
    'hasStartedUsingSessions'?: boolean;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'applicationUrl'?: string;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfigSaveReq
     */
    'useCli'?: boolean;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfigSaveReq
     */
    'doubleOptIn'?: boolean;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfigSaveReq
     */
    'userFullNameRequired'?: boolean;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'webauthnRPID'?: string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'domain'?: string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'environment'?: ProjectConfigSaveReqEnvironmentEnum;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'frontendFramework'?: ProjectConfigSaveReqFrontendFrameworkEnum;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'backendLanguage'?: ProjectConfigSaveReqBackendLanguageEnum;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfigSaveReq
     */
    'webComponentDebug'?: boolean;
    /**
     *
     * @type {boolean}
     * @memberof ProjectConfigSaveReq
     */
    'smtpUseCustom'?: boolean;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'smtpHost'?: string;
    /**
     *
     * @type {number}
     * @memberof ProjectConfigSaveReq
     */
    'smtpPort'?: number;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'smtpUsername'?: string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'smtpPassword'?: string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'supportEmail'?: string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'signupFlow'?: ProjectConfigSaveReqSignupFlowEnum;
    /**
     *
     * @type {object}
     * @memberof ProjectConfigSaveReq
     */
    'signupFlowOptions'?: object;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'loginFlow'?: ProjectConfigSaveReqLoginFlowEnum;
    /**
     *
     * @type {object}
     * @memberof ProjectConfigSaveReq
     */
    'loginFlowOptions'?: object;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof ProjectConfigSaveReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof ProjectConfigSaveReq
     */
    'clientInfo'?: ClientInfo;
}
export declare const ProjectConfigSaveReqExternalApplicationProtocolVersionEnum: {
    readonly V1: "v1";
    readonly V2: "v2";
};
export type ProjectConfigSaveReqExternalApplicationProtocolVersionEnum = typeof ProjectConfigSaveReqExternalApplicationProtocolVersionEnum[keyof typeof ProjectConfigSaveReqExternalApplicationProtocolVersionEnum];
export declare const ProjectConfigSaveReqPasskeyAppendIntervalEnum: {
    readonly _0d: "0d";
    readonly _1d: "1d";
    readonly _3d: "3d";
    readonly _1w: "1w";
    readonly _3w: "3w";
    readonly _1m: "1m";
    readonly _3m: "3m";
};
export type ProjectConfigSaveReqPasskeyAppendIntervalEnum = typeof ProjectConfigSaveReqPasskeyAppendIntervalEnum[keyof typeof ProjectConfigSaveReqPasskeyAppendIntervalEnum];
export declare const ProjectConfigSaveReqEnvironmentEnum: {
    readonly Dev: "dev";
    readonly Prod: "prod";
};
export type ProjectConfigSaveReqEnvironmentEnum = typeof ProjectConfigSaveReqEnvironmentEnum[keyof typeof ProjectConfigSaveReqEnvironmentEnum];
export declare const ProjectConfigSaveReqFrontendFrameworkEnum: {
    readonly React: "react";
    readonly Vuejs: "vuejs";
    readonly Vanillajs: "vanillajs";
};
export type ProjectConfigSaveReqFrontendFrameworkEnum = typeof ProjectConfigSaveReqFrontendFrameworkEnum[keyof typeof ProjectConfigSaveReqFrontendFrameworkEnum];
export declare const ProjectConfigSaveReqBackendLanguageEnum: {
    readonly Javascript: "javascript";
    readonly Php: "php";
    readonly Go: "go";
};
export type ProjectConfigSaveReqBackendLanguageEnum = typeof ProjectConfigSaveReqBackendLanguageEnum[keyof typeof ProjectConfigSaveReqBackendLanguageEnum];
export declare const ProjectConfigSaveReqSignupFlowEnum: {
    readonly PasskeyWithEmailOtpFallback: "PasskeyWithEmailOTPFallback";
    readonly EmailOtpSignup: "EmailOTPSignup";
};
export type ProjectConfigSaveReqSignupFlowEnum = typeof ProjectConfigSaveReqSignupFlowEnum[keyof typeof ProjectConfigSaveReqSignupFlowEnum];
export declare const ProjectConfigSaveReqLoginFlowEnum: {
    readonly PasskeyWithEmailOtpFallback: "PasskeyWithEmailOTPFallback";
};
export type ProjectConfigSaveReqLoginFlowEnum = typeof ProjectConfigSaveReqLoginFlowEnum[keyof typeof ProjectConfigSaveReqLoginFlowEnum];
/**
 *
 * @export
 * @interface ProjectConfigWebhookTestReq
 */
export interface ProjectConfigWebhookTestReq {
    /**
     *
     * @type {string}
     * @memberof ProjectConfigWebhookTestReq
     */
    'action': ProjectConfigWebhookTestReqActionEnum;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof ProjectConfigWebhookTestReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof ProjectConfigWebhookTestReq
     */
    'clientInfo'?: ClientInfo;
}
export declare const ProjectConfigWebhookTestReqActionEnum: {
    readonly AuthMethods: "authMethods";
    readonly PasswordVerify: "passwordVerify";
};
export type ProjectConfigWebhookTestReqActionEnum = typeof ProjectConfigWebhookTestReqActionEnum[keyof typeof ProjectConfigWebhookTestReqActionEnum];
/**
 *
 * @export
 * @interface ProjectConfigWebhookTestRsp
 */
export interface ProjectConfigWebhookTestRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof ProjectConfigWebhookTestRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigWebhookTestRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof ProjectConfigWebhookTestRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof ProjectConfigWebhookTestRsp
     */
    'runtime': number;
    /**
     *
     * @type {ProjectConfigWebhookTestRspAllOfData}
     * @memberof ProjectConfigWebhookTestRsp
     */
    'data': ProjectConfigWebhookTestRspAllOfData;
}
/**
 *
 * @export
 * @interface ProjectConfigWebhookTestRspAllOfData
 */
export interface ProjectConfigWebhookTestRspAllOfData {
    /**
     *
     * @type {string}
     * @memberof ProjectConfigWebhookTestRspAllOfData
     */
    'code': string;
    /**
     *
     * @type {string}
     * @memberof ProjectConfigWebhookTestRspAllOfData
     */
    'details': string;
    /**
     *
     * @type {number}
     * @memberof ProjectConfigWebhookTestRspAllOfData
     */
    'runtime': number;
}
/**
 *
 * @export
 * @interface ProjectSecretCreateReq
 */
export interface ProjectSecretCreateReq {
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof ProjectSecretCreateReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof ProjectSecretCreateReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface ProjectSecretCreateRsp
 */
export interface ProjectSecretCreateRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof ProjectSecretCreateRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof ProjectSecretCreateRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof ProjectSecretCreateRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof ProjectSecretCreateRsp
     */
    'runtime': number;
    /**
     * ID of project secret
     * @type {string}
     * @memberof ProjectSecretCreateRsp
     */
    'id': string;
    /**
     * Server-side generated secret. Only filled on create
     * @type {string}
     * @memberof ProjectSecretCreateRsp
     */
    'secret'?: string;
    /**
     * Hint of the server-side generated secret. First 3 characters and last 3 characters
     * @type {string}
     * @memberof ProjectSecretCreateRsp
     */
    'hint': string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof ProjectSecretCreateRsp
     */
    'created': string;
}
/**
 *
 * @export
 * @interface ProjectSecretDeleteReq
 */
export interface ProjectSecretDeleteReq {
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof ProjectSecretDeleteReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof ProjectSecretDeleteReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface ProjectSecretItem
 */
export interface ProjectSecretItem {
    /**
     * ID of project secret
     * @type {string}
     * @memberof ProjectSecretItem
     */
    'id': string;
    /**
     * Server-side generated secret. Only filled on create
     * @type {string}
     * @memberof ProjectSecretItem
     */
    'secret'?: string;
    /**
     * Hint of the server-side generated secret. First 3 characters and last 3 characters
     * @type {string}
     * @memberof ProjectSecretItem
     */
    'hint': string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof ProjectSecretItem
     */
    'created': string;
}
/**
 *
 * @export
 * @interface ProjectSecretListRsp
 */
export interface ProjectSecretListRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof ProjectSecretListRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof ProjectSecretListRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof ProjectSecretListRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof ProjectSecretListRsp
     */
    'runtime': number;
    /**
     *
     * @type {Array<ProjectSecretItem>}
     * @memberof ProjectSecretListRsp
     */
    'rows': Array<ProjectSecretItem>;
    /**
     *
     * @type {Paging}
     * @memberof ProjectSecretListRsp
     */
    'paging': Paging;
}
/**
 * Data about the request itself, can be used for debugging
 * @export
 * @interface RequestData
 */
export interface RequestData {
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof RequestData
     */
    'requestID': string;
    /**
     * Link to dashboard with details about request
     * @type {string}
     * @memberof RequestData
     */
    'link': string;
}
/**
 * Request log entry
 * @export
 * @interface RequestLog
 */
export interface RequestLog {
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof RequestLog
     */
    'requestID': string;
    /**
     * ID of project
     * @type {string}
     * @memberof RequestLog
     */
    'projectID': string;
    /**
     * ID of the user
     * @type {string}
     * @memberof RequestLog
     */
    'userID': string;
    /**
     * Application this request was processed with
     * @type {string}
     * @memberof RequestLog
     */
    'application': string;
    /**
     * HTTP method (such as GET and POST)
     * @type {string}
     * @memberof RequestLog
     */
    'method': string;
    /**
     * Endpoint that was requested
     * @type {string}
     * @memberof RequestLog
     */
    'endpoint': string;
    /**
     * Request source
     * @type {string}
     * @memberof RequestLog
     */
    'source': string;
    /**
     * Request JSON data
     * @type {string}
     * @memberof RequestLog
     */
    'request': string;
    /**
     * Request headers
     * @type {{ [key: string]: string; }}
     * @memberof RequestLog
     */
    'requestHeaders': {
        [key: string]: string;
    };
    /**
     * Request query parameters
     * @type {string}
     * @memberof RequestLog
     */
    'queryParams': string;
    /**
     * Response HTTP status
     * @type {number}
     * @memberof RequestLog
     */
    'responseStatus': number;
    /**
     * Response JSON data
     * @type {string}
     * @memberof RequestLog
     */
    'response': string;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof RequestLog
     */
    'runtime': number;
    /**
     * Caller remote address
     * @type {string}
     * @memberof RequestLog
     */
    'remoteAddress': string;
    /**
     * Timestamp of when the request was performed in RFC3339 format
     * @type {string}
     * @memberof RequestLog
     */
    'created': string;
    /**
     * Arbitrary tags attached to this request
     * @type {object}
     * @memberof RequestLog
     */
    'tags': object;
    /**
     * Any freetext additional information attached to this request. Additional logs, errors, etc.
     * @type {Array<string>}
     * @memberof RequestLog
     */
    'details': Array<string>;
}
/**
 *
 * @export
 * @interface RequestLogGetRsp
 */
export interface RequestLogGetRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof RequestLogGetRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof RequestLogGetRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof RequestLogGetRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof RequestLogGetRsp
     */
    'runtime': number;
    /**
     *
     * @type {RequestLog}
     * @memberof RequestLogGetRsp
     */
    'data': RequestLog;
}
/**
 *
 * @export
 * @interface RequestLogsListRsp
 */
export interface RequestLogsListRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof RequestLogsListRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof RequestLogsListRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof RequestLogsListRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof RequestLogsListRsp
     */
    'runtime': number;
    /**
     *
     * @type {RequestLogsListRspAllOfData}
     * @memberof RequestLogsListRsp
     */
    'data': RequestLogsListRspAllOfData;
}
/**
 *
 * @export
 * @interface RequestLogsListRspAllOfData
 */
export interface RequestLogsListRspAllOfData {
    /**
     *
     * @type {Array<RequestLog>}
     * @memberof RequestLogsListRspAllOfData
     */
    'logs': Array<RequestLog>;
    /**
     *
     * @type {Paging}
     * @memberof RequestLogsListRspAllOfData
     */
    'paging': Paging;
}
/**
 *
 * @export
 * @interface SessionConfig
 */
export interface SessionConfig {
    /**
     * ID of project
     * @type {string}
     * @memberof SessionConfig
     */
    'projectID': string;
    /**
     *
     * @type {AppType}
     * @memberof SessionConfig
     */
    'appType': AppType;
    /**
     *
     * @type {boolean}
     * @memberof SessionConfig
     */
    'active'?: boolean;
    /**
     *
     * @type {number}
     * @memberof SessionConfig
     */
    'shortLifetimeMinutes': number;
    /**
     *
     * @type {string}
     * @memberof SessionConfig
     */
    'shortCookieDomain': string;
    /**
     *
     * @type {boolean}
     * @memberof SessionConfig
     */
    'shortCookieSecure': boolean;
    /**
     *
     * @type {string}
     * @memberof SessionConfig
     */
    'shortCookieSameSite': SessionConfigShortCookieSameSiteEnum;
    /**
     *
     * @type {number}
     * @memberof SessionConfig
     */
    'longLifetimeValue': number;
    /**
     *
     * @type {string}
     * @memberof SessionConfig
     */
    'longLifetimeUnit': SessionConfigLongLifetimeUnitEnum;
    /**
     *
     * @type {number}
     * @memberof SessionConfig
     */
    'longInactivityValue': number;
    /**
     *
     * @type {string}
     * @memberof SessionConfig
     */
    'longInactivityUnit': SessionConfigLongInactivityUnitEnum;
    /**
     *
     * @type {string}
     * @memberof SessionConfig
     */
    'jwtAudience': string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof SessionConfig
     */
    'created': string;
    /**
     * Timestamp of when the entity was last updated in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof SessionConfig
     */
    'updated': string;
}
export declare const SessionConfigShortCookieSameSiteEnum: {
    readonly Lax: "lax";
    readonly Strict: "strict";
    readonly None: "none";
};
export type SessionConfigShortCookieSameSiteEnum = typeof SessionConfigShortCookieSameSiteEnum[keyof typeof SessionConfigShortCookieSameSiteEnum];
export declare const SessionConfigLongLifetimeUnitEnum: {
    readonly Min: "min";
    readonly Hour: "hour";
    readonly Day: "day";
};
export type SessionConfigLongLifetimeUnitEnum = typeof SessionConfigLongLifetimeUnitEnum[keyof typeof SessionConfigLongLifetimeUnitEnum];
export declare const SessionConfigLongInactivityUnitEnum: {
    readonly Min: "min";
    readonly Hour: "hour";
    readonly Day: "day";
};
export type SessionConfigLongInactivityUnitEnum = typeof SessionConfigLongInactivityUnitEnum[keyof typeof SessionConfigLongInactivityUnitEnum];
/**
 *
 * @export
 * @interface SessionConfigGetRsp
 */
export interface SessionConfigGetRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof SessionConfigGetRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof SessionConfigGetRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof SessionConfigGetRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof SessionConfigGetRsp
     */
    'runtime': number;
    /**
     *
     * @type {SessionConfig}
     * @memberof SessionConfigGetRsp
     */
    'data': SessionConfig;
}
/**
 *
 * @export
 * @interface SessionConfigUpdateReq
 */
export interface SessionConfigUpdateReq {
    /**
     *
     * @type {AppType}
     * @memberof SessionConfigUpdateReq
     */
    'appType': AppType;
    /**
     *
     * @type {boolean}
     * @memberof SessionConfigUpdateReq
     */
    'active'?: boolean;
    /**
     *
     * @type {number}
     * @memberof SessionConfigUpdateReq
     */
    'shortLifetimeMinutes'?: number;
    /**
     *
     * @type {string}
     * @memberof SessionConfigUpdateReq
     */
    'shortCookieDomain'?: string;
    /**
     *
     * @type {boolean}
     * @memberof SessionConfigUpdateReq
     */
    'shortCookieSecure'?: boolean;
    /**
     *
     * @type {string}
     * @memberof SessionConfigUpdateReq
     */
    'shortCookieSameSite'?: SessionConfigUpdateReqShortCookieSameSiteEnum;
    /**
     *
     * @type {number}
     * @memberof SessionConfigUpdateReq
     */
    'longLifetimeValue'?: number;
    /**
     *
     * @type {string}
     * @memberof SessionConfigUpdateReq
     */
    'longLifetimeUnit'?: SessionConfigUpdateReqLongLifetimeUnitEnum;
    /**
     *
     * @type {number}
     * @memberof SessionConfigUpdateReq
     */
    'longInactivityValue'?: number;
    /**
     *
     * @type {string}
     * @memberof SessionConfigUpdateReq
     */
    'longInactivityUnit'?: SessionConfigUpdateReqLongInactivityUnitEnum;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof SessionConfigUpdateReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof SessionConfigUpdateReq
     */
    'clientInfo'?: ClientInfo;
}
export declare const SessionConfigUpdateReqShortCookieSameSiteEnum: {
    readonly Lax: "lax";
    readonly Strict: "strict";
    readonly None: "none";
};
export type SessionConfigUpdateReqShortCookieSameSiteEnum = typeof SessionConfigUpdateReqShortCookieSameSiteEnum[keyof typeof SessionConfigUpdateReqShortCookieSameSiteEnum];
export declare const SessionConfigUpdateReqLongLifetimeUnitEnum: {
    readonly Min: "min";
    readonly Hour: "hour";
};
export type SessionConfigUpdateReqLongLifetimeUnitEnum = typeof SessionConfigUpdateReqLongLifetimeUnitEnum[keyof typeof SessionConfigUpdateReqLongLifetimeUnitEnum];
export declare const SessionConfigUpdateReqLongInactivityUnitEnum: {
    readonly Min: "min";
    readonly Hour: "hour";
};
export type SessionConfigUpdateReqLongInactivityUnitEnum = typeof SessionConfigUpdateReqLongInactivityUnitEnum[keyof typeof SessionConfigUpdateReqLongInactivityUnitEnum];
/**
 *
 * @export
 * @interface SessionTokenCreateReq
 */
export interface SessionTokenCreateReq {
    /**
     * ID of the user
     * @type {string}
     * @memberof SessionTokenCreateReq
     */
    'userID': string;
    /**
     * Additional user data in JSON format
     * @type {string}
     * @memberof SessionTokenCreateReq
     */
    'userData': string;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof SessionTokenCreateReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof SessionTokenCreateReq
     */
    'clientInfo': ClientInfo;
}
/**
 *
 * @export
 * @interface SessionTokenCreateRsp
 */
export interface SessionTokenCreateRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof SessionTokenCreateRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof SessionTokenCreateRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof SessionTokenCreateRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof SessionTokenCreateRsp
     */
    'runtime': number;
    /**
     *
     * @type {SessionTokenCreateRspAllOfData}
     * @memberof SessionTokenCreateRsp
     */
    'data': SessionTokenCreateRspAllOfData;
}
/**
 *
 * @export
 * @interface SessionTokenCreateRspAllOfData
 */
export interface SessionTokenCreateRspAllOfData {
    /**
     *
     * @type {string}
     * @memberof SessionTokenCreateRspAllOfData
     */
    'token': string;
}
/**
 *
 * @export
 * @interface SessionTokenVerifyReq
 */
export interface SessionTokenVerifyReq {
    /**
     *
     * @type {string}
     * @memberof SessionTokenVerifyReq
     */
    'token': string;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof SessionTokenVerifyReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof SessionTokenVerifyReq
     */
    'clientInfo': ClientInfo;
}
/**
 *
 * @export
 * @interface SessionTokenVerifyRsp
 */
export interface SessionTokenVerifyRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof SessionTokenVerifyRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof SessionTokenVerifyRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof SessionTokenVerifyRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof SessionTokenVerifyRsp
     */
    'runtime': number;
    /**
     *
     * @type {SessionTokenVerifyRspAllOfData}
     * @memberof SessionTokenVerifyRsp
     */
    'data': SessionTokenVerifyRspAllOfData;
}
/**
 *
 * @export
 * @interface SessionTokenVerifyRspAllOfData
 */
export interface SessionTokenVerifyRspAllOfData {
    /**
     * ID of the user
     * @type {string}
     * @memberof SessionTokenVerifyRspAllOfData
     */
    'userID': string;
    /**
     *
     * @type {FullUser}
     * @memberof SessionTokenVerifyRspAllOfData
     */
    'user': FullUser;
    /**
     *
     * @type {string}
     * @memberof SessionTokenVerifyRspAllOfData
     */
    'userData': string;
}
/**
 *
 * @export
 * @interface SmsCodeSendReq
 */
export interface SmsCodeSendReq {
    /**
     * Recipient phone number
     * @type {string}
     * @memberof SmsCodeSendReq
     */
    'phoneNumber': string;
    /**
     * Defines if user phone number should be created if not found
     * @type {boolean}
     * @memberof SmsCodeSendReq
     */
    'create': boolean;
    /**
     * Optional user\'s full name to be used if the user wasn\'t found and needs to be created first
     * @type {string}
     * @memberof SmsCodeSendReq
     */
    'userFullName'?: string;
    /**
     * Template name of SMS to send
     * @type {string}
     * @memberof SmsCodeSendReq
     */
    'templateName'?: string;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof SmsCodeSendReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof SmsCodeSendReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface SmsCodeSendRsp
 */
export interface SmsCodeSendRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof SmsCodeSendRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof SmsCodeSendRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof SmsCodeSendRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof SmsCodeSendRsp
     */
    'runtime': number;
    /**
     *
     * @type {SmsCodeSendRspAllOfData}
     * @memberof SmsCodeSendRsp
     */
    'data': SmsCodeSendRspAllOfData;
}
/**
 *
 * @export
 * @interface SmsCodeSendRspAllOfData
 */
export interface SmsCodeSendRspAllOfData {
    /**
     *
     * @type {string}
     * @memberof SmsCodeSendRspAllOfData
     */
    'smsCodeID': string;
}
/**
 *
 * @export
 * @interface SmsCodeValidateReq
 */
export interface SmsCodeValidateReq {
    /**
     * SMS OTP to validate
     * @type {string}
     * @memberof SmsCodeValidateReq
     */
    'smsCode': string;
    /**
     *
     * @type {boolean}
     * @memberof SmsCodeValidateReq
     */
    'createLoginToken'?: boolean;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof SmsCodeValidateReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof SmsCodeValidateReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface SmsCodeValidateRsp
 */
export interface SmsCodeValidateRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof SmsCodeValidateRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof SmsCodeValidateRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof SmsCodeValidateRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof SmsCodeValidateRsp
     */
    'runtime': number;
    /**
     *
     * @type {string}
     * @memberof SmsCodeValidateRsp
     */
    'loginToken'?: string;
}
/**
 *
 * @export
 * @interface SmsTemplateCreateReq
 */
export interface SmsTemplateCreateReq {
    /**
     *
     * @type {string}
     * @memberof SmsTemplateCreateReq
     */
    'type': SmsTemplateCreateReqTypeEnum;
    /**
     *
     * @type {string}
     * @memberof SmsTemplateCreateReq
     */
    'name': string;
    /**
     *
     * @type {string}
     * @memberof SmsTemplateCreateReq
     */
    'textPlain': string;
    /**
     *
     * @type {boolean}
     * @memberof SmsTemplateCreateReq
     */
    'isDefault': boolean;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof SmsTemplateCreateReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof SmsTemplateCreateReq
     */
    'clientInfo'?: ClientInfo;
}
export declare const SmsTemplateCreateReqTypeEnum: {
    readonly SmsCode: "sms_code";
    readonly PasskeyNotification: "passkey_notification";
};
export type SmsTemplateCreateReqTypeEnum = typeof SmsTemplateCreateReqTypeEnum[keyof typeof SmsTemplateCreateReqTypeEnum];
/**
 *
 * @export
 * @interface SmsTemplateCreateRsp
 */
export interface SmsTemplateCreateRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof SmsTemplateCreateRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof SmsTemplateCreateRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof SmsTemplateCreateRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof SmsTemplateCreateRsp
     */
    'runtime': number;
    /**
     *
     * @type {SmsTemplateCreateRspAllOfData}
     * @memberof SmsTemplateCreateRsp
     */
    'data': SmsTemplateCreateRspAllOfData;
}
/**
 *
 * @export
 * @interface SmsTemplateCreateRspAllOfData
 */
export interface SmsTemplateCreateRspAllOfData {
    /**
     *
     * @type {string}
     * @memberof SmsTemplateCreateRspAllOfData
     */
    'smsTemplateID': string;
}
/**
 *
 * @export
 * @interface SmsTemplateDeleteReq
 */
export interface SmsTemplateDeleteReq {
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof SmsTemplateDeleteReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof SmsTemplateDeleteReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 * Generic status that can describe Corbado entities
 * @export
 * @enum {string}
 */
export declare const Status: {
    readonly Active: "active";
    readonly Pending: "pending";
    readonly Deleted: "deleted";
};
export type Status = typeof Status[keyof typeof Status];
/**
 *
 * @export
 * @interface TrackingBackupState
 */
export interface TrackingBackupState {
    /**
     *
     * @type {number}
     * @memberof TrackingBackupState
     */
    'backedUp': number;
    /**
     *
     * @type {number}
     * @memberof TrackingBackupState
     */
    'notBackedUp': number;
}
/**
 *
 * @export
 * @interface TrackingBackupStateGetRsp
 */
export interface TrackingBackupStateGetRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof TrackingBackupStateGetRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof TrackingBackupStateGetRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof TrackingBackupStateGetRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof TrackingBackupStateGetRsp
     */
    'runtime': number;
    /**
     *
     * @type {TrackingBackupState}
     * @memberof TrackingBackupStateGetRsp
     */
    'data': TrackingBackupState;
}
/**
 *
 * @export
 * @interface TrackingBrowserDetailedStats
 */
export interface TrackingBrowserDetailedStats {
    /**
     *
     * @type {string}
     * @memberof TrackingBrowserDetailedStats
     */
    'timePoint': string;
    /**
     *
     * @type {string}
     * @memberof TrackingBrowserDetailedStats
     */
    'browserName': string;
    /**
     *
     * @type {string}
     * @memberof TrackingBrowserDetailedStats
     */
    'browserVersion': string;
    /**
     *
     * @type {number}
     * @memberof TrackingBrowserDetailedStats
     */
    'cnt': number;
    /**
     *
     * @type {number}
     * @memberof TrackingBrowserDetailedStats
     */
    'webauthn': number;
    /**
     *
     * @type {number}
     * @memberof TrackingBrowserDetailedStats
     */
    'platform': number;
    /**
     *
     * @type {number}
     * @memberof TrackingBrowserDetailedStats
     */
    'conditional_ui': number;
}
/**
 *
 * @export
 * @interface TrackingBrowserDetailedStatsListRsp
 */
export interface TrackingBrowserDetailedStatsListRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof TrackingBrowserDetailedStatsListRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof TrackingBrowserDetailedStatsListRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof TrackingBrowserDetailedStatsListRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof TrackingBrowserDetailedStatsListRsp
     */
    'runtime': number;
    /**
     *
     * @type {TrackingBrowserDetailedStatsListRspAllOfData}
     * @memberof TrackingBrowserDetailedStatsListRsp
     */
    'data': TrackingBrowserDetailedStatsListRspAllOfData;
}
/**
 *
 * @export
 * @interface TrackingBrowserDetailedStatsListRspAllOfData
 */
export interface TrackingBrowserDetailedStatsListRspAllOfData {
    /**
     *
     * @type {Array<TrackingBrowserDetailedStats>}
     * @memberof TrackingBrowserDetailedStatsListRspAllOfData
     */
    'stats': Array<TrackingBrowserDetailedStats>;
    /**
     *
     * @type {Paging}
     * @memberof TrackingBrowserDetailedStatsListRspAllOfData
     */
    'paging': Paging;
}
/**
 *
 * @export
 * @interface TrackingBrowserStats
 */
export interface TrackingBrowserStats {
    /**
     *
     * @type {string}
     * @memberof TrackingBrowserStats
     */
    'timePoint': string;
    /**
     *
     * @type {number}
     * @memberof TrackingBrowserStats
     */
    'chrome': number;
    /**
     *
     * @type {number}
     * @memberof TrackingBrowserStats
     */
    'safari': number;
    /**
     *
     * @type {number}
     * @memberof TrackingBrowserStats
     */
    'edge': number;
    /**
     *
     * @type {number}
     * @memberof TrackingBrowserStats
     */
    'firefox': number;
    /**
     *
     * @type {number}
     * @memberof TrackingBrowserStats
     */
    'other': number;
}
/**
 *
 * @export
 * @interface TrackingBrowserStatsListRsp
 */
export interface TrackingBrowserStatsListRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof TrackingBrowserStatsListRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof TrackingBrowserStatsListRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof TrackingBrowserStatsListRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof TrackingBrowserStatsListRsp
     */
    'runtime': number;
    /**
     *
     * @type {TrackingBrowserStatsListRspAllOfData}
     * @memberof TrackingBrowserStatsListRsp
     */
    'data': TrackingBrowserStatsListRspAllOfData;
}
/**
 *
 * @export
 * @interface TrackingBrowserStatsListRspAllOfData
 */
export interface TrackingBrowserStatsListRspAllOfData {
    /**
     *
     * @type {Array<TrackingBrowserStats>}
     * @memberof TrackingBrowserStatsListRspAllOfData
     */
    'stats': Array<TrackingBrowserStats>;
    /**
     *
     * @type {Paging}
     * @memberof TrackingBrowserStatsListRspAllOfData
     */
    'paging': Paging;
}
/**
 *
 * @export
 * @interface TrackingDetailedStats
 */
export interface TrackingDetailedStats {
    /**
     *
     * @type {string}
     * @memberof TrackingDetailedStats
     */
    'timePoint': string;
    /**
     *
     * @type {number}
     * @memberof TrackingDetailedStats
     */
    'visits': number;
    /**
     *
     * @type {number}
     * @memberof TrackingDetailedStats
     */
    'webauthn': number;
    /**
     *
     * @type {number}
     * @memberof TrackingDetailedStats
     */
    'platform': number;
    /**
     *
     * @type {number}
     * @memberof TrackingDetailedStats
     */
    'conditionalUi': number;
}
/**
 *
 * @export
 * @interface TrackingDetailedStatsListRsp
 */
export interface TrackingDetailedStatsListRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof TrackingDetailedStatsListRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof TrackingDetailedStatsListRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof TrackingDetailedStatsListRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof TrackingDetailedStatsListRsp
     */
    'runtime': number;
    /**
     *
     * @type {TrackingDetailedStatsListRspAllOfData}
     * @memberof TrackingDetailedStatsListRsp
     */
    'data': TrackingDetailedStatsListRspAllOfData;
}
/**
 *
 * @export
 * @interface TrackingDetailedStatsListRspAllOfData
 */
export interface TrackingDetailedStatsListRspAllOfData {
    /**
     *
     * @type {Array<TrackingDetailedStats>}
     * @memberof TrackingDetailedStatsListRspAllOfData
     */
    'stats': Array<TrackingDetailedStats>;
    /**
     *
     * @type {Paging}
     * @memberof TrackingDetailedStatsListRspAllOfData
     */
    'paging': Paging;
}
/**
 *
 * @export
 * @interface TrackingEnums
 */
export interface TrackingEnums {
    /**
     *
     * @type {Array<string>}
     * @memberof TrackingEnums
     */
    'browserNames': Array<string>;
    /**
     *
     * @type {Array<string>}
     * @memberof TrackingEnums
     */
    'osNames': Array<string>;
    /**
     *
     * @type {Array<string>}
     * @memberof TrackingEnums
     */
    'osPlatforms': Array<string>;
}
/**
 *
 * @export
 * @interface TrackingEnumsGetRsp
 */
export interface TrackingEnumsGetRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof TrackingEnumsGetRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof TrackingEnumsGetRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof TrackingEnumsGetRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof TrackingEnumsGetRsp
     */
    'runtime': number;
    /**
     *
     * @type {TrackingEnums}
     * @memberof TrackingEnumsGetRsp
     */
    'data': TrackingEnums;
}
/**
 *
 * @export
 * @interface TrackingOSDetailedStats
 */
export interface TrackingOSDetailedStats {
    /**
     *
     * @type {string}
     * @memberof TrackingOSDetailedStats
     */
    'timePoint': string;
    /**
     *
     * @type {string}
     * @memberof TrackingOSDetailedStats
     */
    'osName': string;
    /**
     *
     * @type {string}
     * @memberof TrackingOSDetailedStats
     */
    'osVersion': string;
    /**
     *
     * @type {string}
     * @memberof TrackingOSDetailedStats
     */
    'osPlatform': TrackingOSDetailedStatsOsPlatformEnum;
    /**
     *
     * @type {number}
     * @memberof TrackingOSDetailedStats
     */
    'cnt': number;
    /**
     *
     * @type {number}
     * @memberof TrackingOSDetailedStats
     */
    'webauthn': number;
    /**
     *
     * @type {number}
     * @memberof TrackingOSDetailedStats
     */
    'platform': number;
    /**
     *
     * @type {number}
     * @memberof TrackingOSDetailedStats
     */
    'conditional_ui': number;
}
export declare const TrackingOSDetailedStatsOsPlatformEnum: {
    readonly Desktop: "desktop";
    readonly Mobile: "mobile";
    readonly Unknown: "unknown";
};
export type TrackingOSDetailedStatsOsPlatformEnum = typeof TrackingOSDetailedStatsOsPlatformEnum[keyof typeof TrackingOSDetailedStatsOsPlatformEnum];
/**
 *
 * @export
 * @interface TrackingOSDetailedStatsListRsp
 */
export interface TrackingOSDetailedStatsListRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof TrackingOSDetailedStatsListRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof TrackingOSDetailedStatsListRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof TrackingOSDetailedStatsListRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof TrackingOSDetailedStatsListRsp
     */
    'runtime': number;
    /**
     *
     * @type {TrackingOSDetailedStatsListRspAllOfData}
     * @memberof TrackingOSDetailedStatsListRsp
     */
    'data': TrackingOSDetailedStatsListRspAllOfData;
}
/**
 *
 * @export
 * @interface TrackingOSDetailedStatsListRspAllOfData
 */
export interface TrackingOSDetailedStatsListRspAllOfData {
    /**
     *
     * @type {Array<TrackingOSDetailedStats>}
     * @memberof TrackingOSDetailedStatsListRspAllOfData
     */
    'stats': Array<TrackingOSDetailedStats>;
    /**
     *
     * @type {Paging}
     * @memberof TrackingOSDetailedStatsListRspAllOfData
     */
    'paging': Paging;
}
/**
 *
 * @export
 * @interface TrackingOSStats
 */
export interface TrackingOSStats {
    /**
     *
     * @type {string}
     * @memberof TrackingOSStats
     */
    'timePoint': string;
    /**
     *
     * @type {number}
     * @memberof TrackingOSStats
     */
    'macos': number;
    /**
     *
     * @type {number}
     * @memberof TrackingOSStats
     */
    'windows': number;
    /**
     *
     * @type {number}
     * @memberof TrackingOSStats
     */
    'ios': number;
    /**
     *
     * @type {number}
     * @memberof TrackingOSStats
     */
    'android': number;
    /**
     *
     * @type {number}
     * @memberof TrackingOSStats
     */
    'other': number;
}
/**
 *
 * @export
 * @interface TrackingOSStatsListRsp
 */
export interface TrackingOSStatsListRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof TrackingOSStatsListRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof TrackingOSStatsListRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof TrackingOSStatsListRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof TrackingOSStatsListRsp
     */
    'runtime': number;
    /**
     *
     * @type {TrackingOSStatsListRspAllOfData}
     * @memberof TrackingOSStatsListRsp
     */
    'data': TrackingOSStatsListRspAllOfData;
}
/**
 *
 * @export
 * @interface TrackingOSStatsListRspAllOfData
 */
export interface TrackingOSStatsListRspAllOfData {
    /**
     *
     * @type {Array<TrackingOSStats>}
     * @memberof TrackingOSStatsListRspAllOfData
     */
    'stats': Array<TrackingOSStats>;
    /**
     *
     * @type {Paging}
     * @memberof TrackingOSStatsListRspAllOfData
     */
    'paging': Paging;
}
/**
 *
 * @export
 * @interface TrackingRawListRow
 */
export interface TrackingRawListRow {
    /**
     *
     * @type {string}
     * @memberof TrackingRawListRow
     */
    'timePoint': string;
    /**
     *
     * @type {boolean}
     * @memberof TrackingRawListRow
     */
    'hasWebauthn': boolean;
    /**
     *
     * @type {boolean}
     * @memberof TrackingRawListRow
     */
    'hasPlatformAuth': boolean;
    /**
     *
     * @type {boolean}
     * @memberof TrackingRawListRow
     */
    'hasConditionalUi': boolean;
    /**
     *
     * @type {string}
     * @memberof TrackingRawListRow
     */
    'osId': string;
    /**
     *
     * @type {string}
     * @memberof TrackingRawListRow
     */
    'browserId': string;
}
/**
 *
 * @export
 * @interface TrackingRawListRsp
 */
export interface TrackingRawListRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof TrackingRawListRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof TrackingRawListRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof TrackingRawListRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof TrackingRawListRsp
     */
    'runtime': number;
    /**
     *
     * @type {Array<TrackingRawListRow>}
     * @memberof TrackingRawListRsp
     */
    'rows': Array<TrackingRawListRow>;
    /**
     *
     * @type {Paging}
     * @memberof TrackingRawListRsp
     */
    'paging': Paging;
}
/**
 *
 * @export
 * @interface TrackingStats
 */
export interface TrackingStats {
    /**
     *
     * @type {string}
     * @memberof TrackingStats
     */
    'timePoint': string;
    /**
     *
     * @type {number}
     * @memberof TrackingStats
     */
    'aggregateVisits': number;
    /**
     *
     * @type {number}
     * @memberof TrackingStats
     */
    'aggregateWebauthn': number;
    /**
     *
     * @type {number}
     * @memberof TrackingStats
     */
    'aggregatePlatform': number;
    /**
     *
     * @type {number}
     * @memberof TrackingStats
     */
    'aggregateConditionalUi': number;
}
/**
 *
 * @export
 * @interface TrackingStatsListRsp
 */
export interface TrackingStatsListRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof TrackingStatsListRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof TrackingStatsListRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof TrackingStatsListRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof TrackingStatsListRsp
     */
    'runtime': number;
    /**
     *
     * @type {TrackingStatsListRspAllOfData}
     * @memberof TrackingStatsListRsp
     */
    'data': TrackingStatsListRspAllOfData;
}
/**
 *
 * @export
 * @interface TrackingStatsListRspAllOfData
 */
export interface TrackingStatsListRspAllOfData {
    /**
     *
     * @type {Array<TrackingStats>}
     * @memberof TrackingStatsListRspAllOfData
     */
    'stats': Array<TrackingStats>;
    /**
     *
     * @type {Paging}
     * @memberof TrackingStatsListRspAllOfData
     */
    'paging': Paging;
}
/**
 * User entry
 * @export
 * @interface User
 */
export interface User {
    /**
     * ID of the user
     * @type {string}
     * @memberof User
     */
    'ID': string;
    /**
     *
     * @type {string}
     * @memberof User
     */
    'name': string;
    /**
     *
     * @type {string}
     * @memberof User
     */
    'fullName': string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof User
     */
    'created': string;
    /**
     * Timestamp of when the entity was last updated in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof User
     */
    'updated': string;
    /**
     *
     * @type {string}
     * @memberof User
     */
    'status': string;
}
/**
 *
 * @export
 * @interface UserAuthLog
 */
export interface UserAuthLog {
    /**
     * ID of the user
     * @type {string}
     * @memberof UserAuthLog
     */
    'userID': string;
    /**
     *
     * @type {string}
     * @memberof UserAuthLog
     */
    'userName': string;
    /**
     *
     * @type {string}
     * @memberof UserAuthLog
     */
    'method': string;
    /**
     *
     * @type {string}
     * @memberof UserAuthLog
     */
    'eventType': string;
    /**
     *
     * @type {string}
     * @memberof UserAuthLog
     */
    'status': string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof UserAuthLog
     */
    'created': string;
}
/**
 *
 * @export
 * @interface UserAuthLogListRsp
 */
export interface UserAuthLogListRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof UserAuthLogListRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof UserAuthLogListRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof UserAuthLogListRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof UserAuthLogListRsp
     */
    'runtime': number;
    /**
     *
     * @type {UserAuthLogListRspAllOfData}
     * @memberof UserAuthLogListRsp
     */
    'data': UserAuthLogListRspAllOfData;
}
/**
 *
 * @export
 * @interface UserAuthLogListRspAllOfData
 */
export interface UserAuthLogListRspAllOfData {
    /**
     *
     * @type {Array<UserAuthLog>}
     * @memberof UserAuthLogListRspAllOfData
     */
    'rows': Array<UserAuthLog>;
    /**
     *
     * @type {Paging}
     * @memberof UserAuthLogListRspAllOfData
     */
    'paging': Paging;
}
/**
 *
 * @export
 * @interface UserCreateReq
 */
export interface UserCreateReq {
    /**
     *
     * @type {string}
     * @memberof UserCreateReq
     */
    'name': string;
    /**
     *
     * @type {string}
     * @memberof UserCreateReq
     */
    'fullName'?: string;
    /**
     *
     * @type {string}
     * @memberof UserCreateReq
     */
    'email'?: string;
    /**
     *
     * @type {string}
     * @memberof UserCreateReq
     */
    'phoneNumber'?: string;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof UserCreateReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof UserCreateReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface UserCreateRsp
 */
export interface UserCreateRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof UserCreateRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof UserCreateRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof UserCreateRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof UserCreateRsp
     */
    'runtime': number;
    /**
     *
     * @type {UserCreateRspAllOfData}
     * @memberof UserCreateRsp
     */
    'data': UserCreateRspAllOfData;
}
/**
 *
 * @export
 * @interface UserCreateRspAllOfData
 */
export interface UserCreateRspAllOfData {
    /**
     *
     * @type {string}
     * @memberof UserCreateRspAllOfData
     */
    'userID': string;
    /**
     *
     * @type {string}
     * @memberof UserCreateRspAllOfData
     */
    'emailID': string;
    /**
     *
     * @type {string}
     * @memberof UserCreateRspAllOfData
     */
    'phoneNumberID': string;
}
/**
 *
 * @export
 * @interface UserCustomLoginIdentifierCreateReq
 */
export interface UserCustomLoginIdentifierCreateReq {
    /**
     *
     * @type {string}
     * @memberof UserCustomLoginIdentifierCreateReq
     */
    'customLoginIdentifier': string;
    /**
     *
     * @type {string}
     * @memberof UserCustomLoginIdentifierCreateReq
     */
    'additionalData'?: string;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof UserCustomLoginIdentifierCreateReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof UserCustomLoginIdentifierCreateReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface UserCustomLoginIdentifierCreateRsp
 */
export interface UserCustomLoginIdentifierCreateRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof UserCustomLoginIdentifierCreateRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof UserCustomLoginIdentifierCreateRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof UserCustomLoginIdentifierCreateRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof UserCustomLoginIdentifierCreateRsp
     */
    'runtime': number;
    /**
     *
     * @type {UserCustomLoginIdentifierCreateRspAllOfData}
     * @memberof UserCustomLoginIdentifierCreateRsp
     */
    'data': UserCustomLoginIdentifierCreateRspAllOfData;
}
/**
 *
 * @export
 * @interface UserCustomLoginIdentifierCreateRspAllOfData
 */
export interface UserCustomLoginIdentifierCreateRspAllOfData {
    /**
     *
     * @type {string}
     * @memberof UserCustomLoginIdentifierCreateRspAllOfData
     */
    'customLoginIdentifierID': string;
}
/**
 *
 * @export
 * @interface UserCustomLoginIdentifierDeleteReq
 */
export interface UserCustomLoginIdentifierDeleteReq {
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof UserCustomLoginIdentifierDeleteReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof UserCustomLoginIdentifierDeleteReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface UserCustomLoginIdentifierGetRsp
 */
export interface UserCustomLoginIdentifierGetRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof UserCustomLoginIdentifierGetRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof UserCustomLoginIdentifierGetRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof UserCustomLoginIdentifierGetRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof UserCustomLoginIdentifierGetRsp
     */
    'runtime': number;
    /**
     *
     * @type {UserCustomLoginIdentifierGetRspAllOfData}
     * @memberof UserCustomLoginIdentifierGetRsp
     */
    'data': UserCustomLoginIdentifierGetRspAllOfData;
}
/**
 *
 * @export
 * @interface UserCustomLoginIdentifierGetRspAllOfData
 */
export interface UserCustomLoginIdentifierGetRspAllOfData {
    /**
     *
     * @type {CustomLoginIdentifier}
     * @memberof UserCustomLoginIdentifierGetRspAllOfData
     */
    'customLoginIdentifier': CustomLoginIdentifier;
}
/**
 *
 * @export
 * @interface UserDeleteReq
 */
export interface UserDeleteReq {
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof UserDeleteReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof UserDeleteReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface UserDevice
 */
export interface UserDevice {
    /**
     *
     * @type {string}
     * @memberof UserDevice
     */
    'name': string;
    /**
     *
     * @type {string}
     * @memberof UserDevice
     */
    'fingerprint': string;
    /**
     *
     * @type {string}
     * @memberof UserDevice
     */
    'status': string;
    /**
     *
     * @type {string}
     * @memberof UserDevice
     */
    'device': string;
    /**
     *
     * @type {string}
     * @memberof UserDevice
     */
    'created': string;
    /**
     *
     * @type {string}
     * @memberof UserDevice
     */
    'browserName': string;
    /**
     *
     * @type {string}
     * @memberof UserDevice
     */
    'browserVersion': string;
    /**
     *
     * @type {string}
     * @memberof UserDevice
     */
    'osName': string;
    /**
     *
     * @type {string}
     * @memberof UserDevice
     */
    'osVersion': string;
}
/**
 *
 * @export
 * @interface UserDeviceListRsp
 */
export interface UserDeviceListRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof UserDeviceListRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof UserDeviceListRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof UserDeviceListRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof UserDeviceListRsp
     */
    'runtime': number;
    /**
     *
     * @type {Array<UserDevice>}
     * @memberof UserDeviceListRsp
     */
    'devices': Array<UserDevice>;
    /**
     *
     * @type {Paging}
     * @memberof UserDeviceListRsp
     */
    'paging': Paging;
}
/**
 * User\'s email
 * @export
 * @interface UserEmail
 */
export interface UserEmail {
    /**
     * generic ID
     * @type {string}
     * @memberof UserEmail
     */
    'ID': string;
    /**
     *
     * @type {string}
     * @memberof UserEmail
     */
    'email': string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof UserEmail
     */
    'created': string;
    /**
     * Timestamp of when the entity was last updated in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof UserEmail
     */
    'updated': string;
    /**
     *
     * @type {Status}
     * @memberof UserEmail
     */
    'status': Status;
}
/**
 *
 * @export
 * @interface UserEmailCreateReq
 */
export interface UserEmailCreateReq {
    /**
     *
     * @type {string}
     * @memberof UserEmailCreateReq
     */
    'email': string;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof UserEmailCreateReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof UserEmailCreateReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface UserEmailCreateRsp
 */
export interface UserEmailCreateRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof UserEmailCreateRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof UserEmailCreateRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof UserEmailCreateRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof UserEmailCreateRsp
     */
    'runtime': number;
    /**
     *
     * @type {UserEmailCreateRspAllOfData}
     * @memberof UserEmailCreateRsp
     */
    'data': UserEmailCreateRspAllOfData;
}
/**
 *
 * @export
 * @interface UserEmailCreateRspAllOfData
 */
export interface UserEmailCreateRspAllOfData {
    /**
     *
     * @type {string}
     * @memberof UserEmailCreateRspAllOfData
     */
    'emailID': string;
}
/**
 *
 * @export
 * @interface UserEmailDeleteReq
 */
export interface UserEmailDeleteReq {
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof UserEmailDeleteReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof UserEmailDeleteReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface UserEmailGetRsp
 */
export interface UserEmailGetRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof UserEmailGetRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof UserEmailGetRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof UserEmailGetRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof UserEmailGetRsp
     */
    'runtime': number;
    /**
     *
     * @type {UserEmailGetRspAllOfData}
     * @memberof UserEmailGetRsp
     */
    'data': UserEmailGetRspAllOfData;
}
/**
 *
 * @export
 * @interface UserEmailGetRspAllOfData
 */
export interface UserEmailGetRspAllOfData {
    /**
     *
     * @type {Email}
     * @memberof UserEmailGetRspAllOfData
     */
    'email': Email;
}
/**
 *
 * @export
 * @interface UserGetRsp
 */
export interface UserGetRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof UserGetRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof UserGetRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof UserGetRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof UserGetRsp
     */
    'runtime': number;
    /**
     *
     * @type {FullUser}
     * @memberof UserGetRsp
     */
    'data': FullUser;
}
/**
 *
 * @export
 * @interface UserListRsp
 */
export interface UserListRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof UserListRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof UserListRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof UserListRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof UserListRsp
     */
    'runtime': number;
    /**
     *
     * @type {UserListRspAllOfData}
     * @memberof UserListRsp
     */
    'data': UserListRspAllOfData;
}
/**
 *
 * @export
 * @interface UserListRspAllOfData
 */
export interface UserListRspAllOfData {
    /**
     *
     * @type {Array<FullUser>}
     * @memberof UserListRspAllOfData
     */
    'users': Array<FullUser>;
    /**
     *
     * @type {Paging}
     * @memberof UserListRspAllOfData
     */
    'paging': Paging;
}
/**
 * User\'s phone number
 * @export
 * @interface UserPhoneNumber
 */
export interface UserPhoneNumber {
    /**
     * generic ID
     * @type {string}
     * @memberof UserPhoneNumber
     */
    'ID': string;
    /**
     *
     * @type {string}
     * @memberof UserPhoneNumber
     */
    'phoneNumber': string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof UserPhoneNumber
     */
    'created': string;
    /**
     * Timestamp of when the entity was last updated in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof UserPhoneNumber
     */
    'updated': string;
    /**
     *
     * @type {Status}
     * @memberof UserPhoneNumber
     */
    'status': Status;
}
/**
 *
 * @export
 * @interface UserPhoneNumberCreateReq
 */
export interface UserPhoneNumberCreateReq {
    /**
     *
     * @type {string}
     * @memberof UserPhoneNumberCreateReq
     */
    'phoneNumber': string;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof UserPhoneNumberCreateReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof UserPhoneNumberCreateReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface UserPhoneNumberCreateRsp
 */
export interface UserPhoneNumberCreateRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof UserPhoneNumberCreateRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof UserPhoneNumberCreateRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof UserPhoneNumberCreateRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof UserPhoneNumberCreateRsp
     */
    'runtime': number;
    /**
     *
     * @type {UserPhoneNumberCreateRspAllOfData}
     * @memberof UserPhoneNumberCreateRsp
     */
    'data': UserPhoneNumberCreateRspAllOfData;
}
/**
 *
 * @export
 * @interface UserPhoneNumberCreateRspAllOfData
 */
export interface UserPhoneNumberCreateRspAllOfData {
    /**
     *
     * @type {string}
     * @memberof UserPhoneNumberCreateRspAllOfData
     */
    'phoneNumberID': string;
}
/**
 *
 * @export
 * @interface UserPhoneNumberDeleteReq
 */
export interface UserPhoneNumberDeleteReq {
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof UserPhoneNumberDeleteReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof UserPhoneNumberDeleteReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface UserPhoneNumberGetRsp
 */
export interface UserPhoneNumberGetRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof UserPhoneNumberGetRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof UserPhoneNumberGetRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof UserPhoneNumberGetRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof UserPhoneNumberGetRsp
     */
    'runtime': number;
    /**
     *
     * @type {UserPhoneNumberGetRspAllOfData}
     * @memberof UserPhoneNumberGetRsp
     */
    'data': UserPhoneNumberGetRspAllOfData;
}
/**
 *
 * @export
 * @interface UserPhoneNumberGetRspAllOfData
 */
export interface UserPhoneNumberGetRspAllOfData {
    /**
     *
     * @type {PhoneNumber}
     * @memberof UserPhoneNumberGetRspAllOfData
     */
    'phoneNumber': PhoneNumber;
}
/**
 *
 * @export
 * @interface UserStats
 */
export interface UserStats {
    /**
     *
     * @type {string}
     * @memberof UserStats
     */
    'timePoint': string;
    /**
     *
     * @type {number}
     * @memberof UserStats
     */
    'totalUsers': number;
    /**
     *
     * @type {number}
     * @memberof UserStats
     */
    'signUps': number;
    /**
     *
     * @type {number}
     * @memberof UserStats
     */
    'activeUsers': number;
    /**
     *
     * @type {number}
     * @memberof UserStats
     */
    'countPasskeyLogin': number;
    /**
     *
     * @type {number}
     * @memberof UserStats
     */
    'countEmailLogin': number;
    /**
     *
     * @type {number}
     * @memberof UserStats
     */
    'countPasswordLogin': number;
    /**
     *
     * @type {number}
     * @memberof UserStats
     */
    'successfulLogins': number;
    /**
     *
     * @type {number}
     * @memberof UserStats
     */
    'failedLogins': number;
}
/**
 *
 * @export
 * @interface UserStatsListRsp
 */
export interface UserStatsListRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof UserStatsListRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof UserStatsListRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof UserStatsListRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof UserStatsListRsp
     */
    'runtime': number;
    /**
     *
     * @type {UserStatsListRspAllOfData}
     * @memberof UserStatsListRsp
     */
    'data': UserStatsListRspAllOfData;
}
/**
 *
 * @export
 * @interface UserStatsListRspAllOfData
 */
export interface UserStatsListRspAllOfData {
    /**
     *
     * @type {Array<UserStats>}
     * @memberof UserStatsListRspAllOfData
     */
    'stats': Array<UserStats>;
    /**
     *
     * @type {Paging}
     * @memberof UserStatsListRspAllOfData
     */
    'paging': Paging;
}
/**
 *
 * @export
 * @interface UserUpdateReq
 */
export interface UserUpdateReq {
    /**
     *
     * @type {string}
     * @memberof UserUpdateReq
     */
    'name'?: string;
    /**
     *
     * @type {string}
     * @memberof UserUpdateReq
     */
    'fullName'?: string;
    /**
     *
     * @type {string}
     * @memberof UserUpdateReq
     */
    'status'?: UserUpdateReqStatusEnum;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof UserUpdateReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof UserUpdateReq
     */
    'clientInfo'?: ClientInfo;
}
export declare const UserUpdateReqStatusEnum: {
    readonly Active: "active";
    readonly Disabled: "disabled";
};
export type UserUpdateReqStatusEnum = typeof UserUpdateReqStatusEnum[keyof typeof UserUpdateReqStatusEnum];
/**
 *
 * @export
 * @interface UserUpdateRsp
 */
export interface UserUpdateRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof UserUpdateRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof UserUpdateRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof UserUpdateRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof UserUpdateRsp
     */
    'runtime': number;
    /**
     *
     * @type {User}
     * @memberof UserUpdateRsp
     */
    'data': User;
}
/**
 *
 * @export
 * @interface ValidateEmailReq
 */
export interface ValidateEmailReq {
    /**
     * Email to validate
     * @type {string}
     * @memberof ValidateEmailReq
     */
    'email': string;
    /**
     * perform SMTP check for domain
     * @type {boolean}
     * @memberof ValidateEmailReq
     */
    'smtpCheck'?: boolean;
    /**
     * enables domain suggestion for misspelled domains
     * @type {boolean}
     * @memberof ValidateEmailReq
     */
    'suggestDomain'?: boolean;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof ValidateEmailReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof ValidateEmailReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface ValidateEmailRsp
 */
export interface ValidateEmailRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof ValidateEmailRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof ValidateEmailRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof ValidateEmailRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof ValidateEmailRsp
     */
    'runtime': number;
    /**
     *
     * @type {EmailValidationResult}
     * @memberof ValidateEmailRsp
     */
    'data': EmailValidationResult;
}
/**
 *
 * @export
 * @interface ValidatePhoneNumberReq
 */
export interface ValidatePhoneNumberReq {
    /**
     * ISO country or region code
     * @type {string}
     * @memberof ValidatePhoneNumberReq
     */
    'regionCode'?: string;
    /**
     * Phone number to validate
     * @type {string}
     * @memberof ValidatePhoneNumberReq
     */
    'phoneNumber': string;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof ValidatePhoneNumberReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof ValidatePhoneNumberReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface ValidatePhoneNumberRsp
 */
export interface ValidatePhoneNumberRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof ValidatePhoneNumberRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof ValidatePhoneNumberRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof ValidatePhoneNumberRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof ValidatePhoneNumberRsp
     */
    'runtime': number;
    /**
     *
     * @type {PhoneNumberValidationResult}
     * @memberof ValidatePhoneNumberRsp
     */
    'data': PhoneNumberValidationResult;
}
/**
 *
 * @export
 * @interface ValidationEmail
 */
export interface ValidationEmail {
    /**
     *
     * @type {string}
     * @memberof ValidationEmail
     */
    'username': string;
    /**
     *
     * @type {string}
     * @memberof ValidationEmail
     */
    'domain': string;
    /**
     *
     * @type {string}
     * @memberof ValidationEmail
     */
    'reachable': string;
    /**
     *
     * @type {boolean}
     * @memberof ValidationEmail
     */
    'disposable': boolean;
    /**
     *
     * @type {boolean}
     * @memberof ValidationEmail
     */
    'free': boolean;
    /**
     *
     * @type {boolean}
     * @memberof ValidationEmail
     */
    'hasMxRecords': boolean;
}
/**
 *
 * @export
 * @interface ValidationPhoneNumber
 */
export interface ValidationPhoneNumber {
    /**
     *
     * @type {number}
     * @memberof ValidationPhoneNumber
     */
    'nationalNumber': number;
    /**
     *
     * @type {number}
     * @memberof ValidationPhoneNumber
     */
    'countryCode': number;
    /**
     *
     * @type {string}
     * @memberof ValidationPhoneNumber
     */
    'regionCode': string;
    /**
     *
     * @type {string}
     * @memberof ValidationPhoneNumber
     */
    'nationalFormatted': string;
    /**
     *
     * @type {string}
     * @memberof ValidationPhoneNumber
     */
    'internationalFormatted': string;
}
/**
 *
 * @export
 * @interface WebAuthnAssociateStartReq
 */
export interface WebAuthnAssociateStartReq {
    /**
     *
     * @type {string}
     * @memberof WebAuthnAssociateStartReq
     */
    'associationToken': string;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof WebAuthnAssociateStartReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof WebAuthnAssociateStartReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface WebAuthnAssociateStartRsp
 */
export interface WebAuthnAssociateStartRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof WebAuthnAssociateStartRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof WebAuthnAssociateStartRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof WebAuthnAssociateStartRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof WebAuthnAssociateStartRsp
     */
    'runtime': number;
    /**
     * Status represents information if user signup was successful or the user with its credentials already exists
     * @type {string}
     * @memberof WebAuthnAssociateStartRsp
     */
    'status': WebAuthnAssociateStartRspStatusEnum;
    /**
     * Contains JSON payload data to start Passkeys (Biometrics) sign up challenge
     * @type {string}
     * @memberof WebAuthnAssociateStartRsp
     */
    'publicKeyCredentialCreationOptions': string;
}
export declare const WebAuthnAssociateStartRspStatusEnum: {
    readonly Success: "success";
    readonly Duplicate: "duplicate";
};
export type WebAuthnAssociateStartRspStatusEnum = typeof WebAuthnAssociateStartRspStatusEnum[keyof typeof WebAuthnAssociateStartRspStatusEnum];
/**
 *
 * @export
 * @interface WebAuthnAuthenticateFinishRsp
 */
export interface WebAuthnAuthenticateFinishRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof WebAuthnAuthenticateFinishRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof WebAuthnAuthenticateFinishRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof WebAuthnAuthenticateFinishRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof WebAuthnAuthenticateFinishRsp
     */
    'runtime': number;
    /**
     * ID of the user
     * @type {string}
     * @memberof WebAuthnAuthenticateFinishRsp
     */
    'userID': string;
    /**
     * Username of current challenge
     * @type {string}
     * @memberof WebAuthnAuthenticateFinishRsp
     */
    'username': string;
    /**
     * Used credential ID
     * @type {string}
     * @memberof WebAuthnAuthenticateFinishRsp
     */
    'credentialID': string;
    /**
     * Optional user\'s full name to be used if the user wasn\'t found and needs to be created first
     * @type {string}
     * @memberof WebAuthnAuthenticateFinishRsp
     */
    'userFullName'?: string;
    /**
     * Status represents information if user signup was successful or the user with its credentials already exists
     * @type {string}
     * @memberof WebAuthnAuthenticateFinishRsp
     */
    'status': WebAuthnAuthenticateFinishRspStatusEnum;
}
export declare const WebAuthnAuthenticateFinishRspStatusEnum: {
    readonly Success: "success";
    readonly UnconfirmedCredential: "unconfirmedCredential";
};
export type WebAuthnAuthenticateFinishRspStatusEnum = typeof WebAuthnAuthenticateFinishRspStatusEnum[keyof typeof WebAuthnAuthenticateFinishRspStatusEnum];
/**
 *
 * @export
 * @interface WebAuthnAuthenticateStartReq
 */
export interface WebAuthnAuthenticateStartReq {
    /**
     *
     * @type {string}
     * @memberof WebAuthnAuthenticateStartReq
     */
    'username': string;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof WebAuthnAuthenticateStartReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof WebAuthnAuthenticateStartReq
     */
    'clientInfo': ClientInfo;
}
/**
 *
 * @export
 * @interface WebAuthnAuthenticateStartRsp
 */
export interface WebAuthnAuthenticateStartRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof WebAuthnAuthenticateStartRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof WebAuthnAuthenticateStartRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof WebAuthnAuthenticateStartRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof WebAuthnAuthenticateStartRsp
     */
    'runtime': number;
    /**
     * Contains JSON payload data to start Passkeys (Biometrics) login challenge
     * @type {string}
     * @memberof WebAuthnAuthenticateStartRsp
     */
    'publicKeyCredentialRequestOptions': string;
    /**
     * Status represents information if authenticate start was successful or device is unknown
     * @type {string}
     * @memberof WebAuthnAuthenticateStartRsp
     */
    'status': WebAuthnAuthenticateStartRspStatusEnum;
}
export declare const WebAuthnAuthenticateStartRspStatusEnum: {
    readonly Success: "success";
    readonly UnknownDevice: "unknownDevice";
    readonly UnconfirmedDevice: "unconfirmedDevice";
};
export type WebAuthnAuthenticateStartRspStatusEnum = typeof WebAuthnAuthenticateStartRspStatusEnum[keyof typeof WebAuthnAuthenticateStartRspStatusEnum];
/**
 *
 * @export
 * @interface WebAuthnAuthenticateSuccess
 */
export interface WebAuthnAuthenticateSuccess {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof WebAuthnAuthenticateSuccess
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof WebAuthnAuthenticateSuccess
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof WebAuthnAuthenticateSuccess
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof WebAuthnAuthenticateSuccess
     */
    'runtime': number;
    /**
     * ID of the user
     * @type {string}
     * @memberof WebAuthnAuthenticateSuccess
     */
    'userID': string;
    /**
     * Username of current challenge
     * @type {string}
     * @memberof WebAuthnAuthenticateSuccess
     */
    'username': string;
    /**
     * Used credential ID
     * @type {string}
     * @memberof WebAuthnAuthenticateSuccess
     */
    'credentialID': string;
    /**
     * Optional user\'s full name to be used if the user wasn\'t found and needs to be created first
     * @type {string}
     * @memberof WebAuthnAuthenticateSuccess
     */
    'userFullName'?: string;
}
/**
 *
 * @export
 * @interface WebAuthnAuthenticatorUpdateReq
 */
export interface WebAuthnAuthenticatorUpdateReq {
    /**
     *
     * @type {string}
     * @memberof WebAuthnAuthenticatorUpdateReq
     */
    'name': string;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof WebAuthnAuthenticatorUpdateReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof WebAuthnAuthenticatorUpdateReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface WebAuthnCredentialExistsReq
 */
export interface WebAuthnCredentialExistsReq {
    /**
     *
     * @type {string}
     * @memberof WebAuthnCredentialExistsReq
     */
    'loginIdentifier': string;
    /**
     *
     * @type {LoginIdentifierType}
     * @memberof WebAuthnCredentialExistsReq
     */
    'loginIdentifierType': LoginIdentifierType;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof WebAuthnCredentialExistsReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof WebAuthnCredentialExistsReq
     */
    'clientInfo': ClientInfo;
}
/**
 *
 * @export
 * @interface WebAuthnCredentialExistsRsp
 */
export interface WebAuthnCredentialExistsRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof WebAuthnCredentialExistsRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof WebAuthnCredentialExistsRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof WebAuthnCredentialExistsRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof WebAuthnCredentialExistsRsp
     */
    'runtime': number;
    /**
     *
     * @type {boolean}
     * @memberof WebAuthnCredentialExistsRsp
     */
    'exists': boolean;
}
/**
 *
 * @export
 * @interface WebAuthnCredentialItemRsp
 */
export interface WebAuthnCredentialItemRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof WebAuthnCredentialItemRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof WebAuthnCredentialItemRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof WebAuthnCredentialItemRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof WebAuthnCredentialItemRsp
     */
    'runtime': number;
    /**
     * Credential ID
     * @type {string}
     * @memberof WebAuthnCredentialItemRsp
     */
    'id': string;
    /**
     *
     * @type {string}
     * @memberof WebAuthnCredentialItemRsp
     */
    'credentialHash': string;
    /**
     *
     * @type {string}
     * @memberof WebAuthnCredentialItemRsp
     */
    'aaguid': string;
    /**
     *
     * @type {string}
     * @memberof WebAuthnCredentialItemRsp
     */
    'attestationType': string;
    /**
     * Backup state
     * @type {boolean}
     * @memberof WebAuthnCredentialItemRsp
     */
    'backupState'?: boolean;
    /**
     * Backup eligible
     * @type {boolean}
     * @memberof WebAuthnCredentialItemRsp
     */
    'backupEligible': boolean;
    /**
     * Transport
     * @type {Array<string>}
     * @memberof WebAuthnCredentialItemRsp
     */
    'transport': Array<WebAuthnCredentialItemRspTransportEnum>;
    /**
     * Status
     * @type {string}
     * @memberof WebAuthnCredentialItemRsp
     */
    'status': WebAuthnCredentialItemRspStatusEnum;
    /**
     * User agent
     * @type {string}
     * @memberof WebAuthnCredentialItemRsp
     */
    'userAgent': string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof WebAuthnCredentialItemRsp
     */
    'created': string;
    /**
     * Authenticator ID
     * @type {string}
     * @memberof WebAuthnCredentialItemRsp
     */
    'authenticatorID': string;
    /**
     *
     * @type {string}
     * @memberof WebAuthnCredentialItemRsp
     */
    'authenticatorName': string;
    /**
     * Timestamp of when the passkey was last used in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof WebAuthnCredentialItemRsp
     */
    'lastUsed': string;
    /**
     *
     * @type {string}
     * @memberof WebAuthnCredentialItemRsp
     */
    'lastUsedDeviceName': string;
}
export declare const WebAuthnCredentialItemRspTransportEnum: {
    readonly Usb: "usb";
    readonly Nfc: "nfc";
    readonly Ble: "ble";
    readonly Internal: "internal";
    readonly Hybrid: "hybrid";
    readonly SmartCard: "smart-card";
};
export type WebAuthnCredentialItemRspTransportEnum = typeof WebAuthnCredentialItemRspTransportEnum[keyof typeof WebAuthnCredentialItemRspTransportEnum];
export declare const WebAuthnCredentialItemRspStatusEnum: {
    readonly Pending: "pending";
    readonly Active: "active";
};
export type WebAuthnCredentialItemRspStatusEnum = typeof WebAuthnCredentialItemRspStatusEnum[keyof typeof WebAuthnCredentialItemRspStatusEnum];
/**
 *
 * @export
 * @interface WebAuthnCredentialListRsp
 */
export interface WebAuthnCredentialListRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof WebAuthnCredentialListRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof WebAuthnCredentialListRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof WebAuthnCredentialListRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof WebAuthnCredentialListRsp
     */
    'runtime': number;
    /**
     *
     * @type {Array<WebAuthnCredentialItemRsp>}
     * @memberof WebAuthnCredentialListRsp
     */
    'rows': Array<WebAuthnCredentialItemRsp>;
    /**
     *
     * @type {Paging}
     * @memberof WebAuthnCredentialListRsp
     */
    'paging': Paging;
}
/**
 *
 * @export
 * @interface WebAuthnCredentialReq
 */
export interface WebAuthnCredentialReq {
    /**
     *
     * @type {string}
     * @memberof WebAuthnCredentialReq
     */
    'status': WebAuthnCredentialReqStatusEnum;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof WebAuthnCredentialReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof WebAuthnCredentialReq
     */
    'clientInfo'?: ClientInfo;
}
export declare const WebAuthnCredentialReqStatusEnum: {
    readonly Pending: "pending";
    readonly Active: "active";
    readonly Deleted: "deleted";
};
export type WebAuthnCredentialReqStatusEnum = typeof WebAuthnCredentialReqStatusEnum[keyof typeof WebAuthnCredentialReqStatusEnum];
/**
 *
 * @export
 * @interface WebAuthnCredentialRsp
 */
export interface WebAuthnCredentialRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof WebAuthnCredentialRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof WebAuthnCredentialRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof WebAuthnCredentialRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof WebAuthnCredentialRsp
     */
    'runtime': number;
    /**
     * Status
     * @type {string}
     * @memberof WebAuthnCredentialRsp
     */
    'status': WebAuthnCredentialRspStatusEnum;
}
export declare const WebAuthnCredentialRspStatusEnum: {
    readonly Pending: "pending";
    readonly Active: "active";
    readonly Deleted: "deleted";
};
export type WebAuthnCredentialRspStatusEnum = typeof WebAuthnCredentialRspStatusEnum[keyof typeof WebAuthnCredentialRspStatusEnum];
/**
 *
 * @export
 * @interface WebAuthnFinishReq
 */
export interface WebAuthnFinishReq {
    /**
     * Contains JSON payload data for Passkeys (Biometrics) login finish challenge
     * @type {string}
     * @memberof WebAuthnFinishReq
     */
    'publicKeyCredential': string;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof WebAuthnFinishReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof WebAuthnFinishReq
     */
    'clientInfo': ClientInfo;
}
/**
 *
 * @export
 * @interface WebAuthnMediationStartReq
 */
export interface WebAuthnMediationStartReq {
    /**
     * Optional limits possible credentials matching to username
     * @type {string}
     * @memberof WebAuthnMediationStartReq
     */
    'username'?: string;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof WebAuthnMediationStartReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof WebAuthnMediationStartReq
     */
    'clientInfo': ClientInfo;
}
/**
 *
 * @export
 * @interface WebAuthnMediationStartRsp
 */
export interface WebAuthnMediationStartRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof WebAuthnMediationStartRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof WebAuthnMediationStartRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof WebAuthnMediationStartRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof WebAuthnMediationStartRsp
     */
    'runtime': number;
    /**
     * Contains JSON payload data to start Passkeys (Biometrics) login challenge
     * @type {string}
     * @memberof WebAuthnMediationStartRsp
     */
    'challenge': string;
}
/**
 *
 * @export
 * @interface WebAuthnRegisterFinishRsp
 */
export interface WebAuthnRegisterFinishRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof WebAuthnRegisterFinishRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof WebAuthnRegisterFinishRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof WebAuthnRegisterFinishRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof WebAuthnRegisterFinishRsp
     */
    'runtime': number;
    /**
     * ID of the user
     * @type {string}
     * @memberof WebAuthnRegisterFinishRsp
     */
    'userID': string;
    /**
     * Username of current challenge
     * @type {string}
     * @memberof WebAuthnRegisterFinishRsp
     */
    'username': string;
    /**
     * Used credential ID
     * @type {string}
     * @memberof WebAuthnRegisterFinishRsp
     */
    'credentialID': string;
    /**
     * Optional user\'s full name to be used if the user wasn\'t found and needs to be created first
     * @type {string}
     * @memberof WebAuthnRegisterFinishRsp
     */
    'userFullName'?: string;
    /**
     * Status represents information if user sign up was successful or if the user with provided credentials already exists
     * @type {string}
     * @memberof WebAuthnRegisterFinishRsp
     */
    'status': WebAuthnRegisterFinishRspStatusEnum;
}
export declare const WebAuthnRegisterFinishRspStatusEnum: {
    readonly Success: "success";
    readonly Duplicate: "duplicate";
};
export type WebAuthnRegisterFinishRspStatusEnum = typeof WebAuthnRegisterFinishRspStatusEnum[keyof typeof WebAuthnRegisterFinishRspStatusEnum];
/**
 *
 * @export
 * @interface WebAuthnRegisterStartReq
 */
export interface WebAuthnRegisterStartReq {
    /**
     *
     * @type {string}
     * @memberof WebAuthnRegisterStartReq
     */
    'username': string;
    /**
     * Optional user\'s full name to be used if the user wasn\'t found and needs to be created first
     * @type {string}
     * @memberof WebAuthnRegisterStartReq
     */
    'userFullName'?: string;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof WebAuthnRegisterStartReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof WebAuthnRegisterStartReq
     */
    'clientInfo': ClientInfo;
    /**
     * Sets credential status into active and pending. Pending status dont allow a login until the credential gets confirmed by an api call.
     * @type {string}
     * @memberof WebAuthnRegisterStartReq
     */
    'credentialStatus'?: WebAuthnRegisterStartReqCredentialStatusEnum;
}
export declare const WebAuthnRegisterStartReqCredentialStatusEnum: {
    readonly Active: "active";
    readonly Pending: "pending";
};
export type WebAuthnRegisterStartReqCredentialStatusEnum = typeof WebAuthnRegisterStartReqCredentialStatusEnum[keyof typeof WebAuthnRegisterStartReqCredentialStatusEnum];
/**
 *
 * @export
 * @interface WebAuthnRegisterStartRsp
 */
export interface WebAuthnRegisterStartRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof WebAuthnRegisterStartRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof WebAuthnRegisterStartRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof WebAuthnRegisterStartRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof WebAuthnRegisterStartRsp
     */
    'runtime': number;
    /**
     * Status represents information if user signup was successful or the user with its credentials already exists
     * @type {string}
     * @memberof WebAuthnRegisterStartRsp
     */
    'status': WebAuthnRegisterStartRspStatusEnum;
    /**
     * Contains JSON payload data to start Passkeys (Biometrics) sign up challenge
     * @type {string}
     * @memberof WebAuthnRegisterStartRsp
     */
    'publicKeyCredentialCreationOptions': string;
}
export declare const WebAuthnRegisterStartRspStatusEnum: {
    readonly Success: "success";
    readonly Duplicate: "duplicate";
};
export type WebAuthnRegisterStartRspStatusEnum = typeof WebAuthnRegisterStartRspStatusEnum[keyof typeof WebAuthnRegisterStartRspStatusEnum];
/**
 *
 * @export
 * @interface WebauthnSettingCreate
 */
export interface WebauthnSettingCreate {
    /**
     * Name of this setting
     * @type {string}
     * @memberof WebauthnSettingCreate
     */
    'name': string;
    /**
     * Define here either a url incl. schema or an android-apk-key-hash
     * @type {string}
     * @memberof WebauthnSettingCreate
     */
    'origin': string;
}
/**
 *
 * @export
 * @interface WebauthnSettingCreateReq
 */
export interface WebauthnSettingCreateReq {
    /**
     * Name of this setting
     * @type {string}
     * @memberof WebauthnSettingCreateReq
     */
    'name': string;
    /**
     * Define here either a url incl. schema or an android-apk-key-hash
     * @type {string}
     * @memberof WebauthnSettingCreateReq
     */
    'origin': string;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof WebauthnSettingCreateReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof WebauthnSettingCreateReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface WebauthnSettingCreateRsp
 */
export interface WebauthnSettingCreateRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof WebauthnSettingCreateRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof WebauthnSettingCreateRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof WebauthnSettingCreateRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof WebauthnSettingCreateRsp
     */
    'runtime': number;
    /**
     * Name of this setting
     * @type {string}
     * @memberof WebauthnSettingCreateRsp
     */
    'name': string;
    /**
     * Define here either a url incl. schema or an android-apk-key-hash
     * @type {string}
     * @memberof WebauthnSettingCreateRsp
     */
    'origin': string;
    /**
     * ID of WebAuthn setting
     * @type {string}
     * @memberof WebauthnSettingCreateRsp
     */
    'id': string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof WebauthnSettingCreateRsp
     */
    'created': string;
    /**
     * Timestamp of when the entity was last updated in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof WebauthnSettingCreateRsp
     */
    'updated': string;
}
/**
 *
 * @export
 * @interface WebauthnSettingDeleteReq
 */
export interface WebauthnSettingDeleteReq {
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof WebauthnSettingDeleteReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof WebauthnSettingDeleteReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface WebauthnSettingGetRsp
 */
export interface WebauthnSettingGetRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof WebauthnSettingGetRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof WebauthnSettingGetRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof WebauthnSettingGetRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof WebauthnSettingGetRsp
     */
    'runtime': number;
    /**
     * Name of this setting
     * @type {string}
     * @memberof WebauthnSettingGetRsp
     */
    'name': string;
    /**
     * Define here either a url incl. schema or an android-apk-key-hash
     * @type {string}
     * @memberof WebauthnSettingGetRsp
     */
    'origin': string;
    /**
     * ID of WebAuthn setting
     * @type {string}
     * @memberof WebauthnSettingGetRsp
     */
    'id': string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof WebauthnSettingGetRsp
     */
    'created': string;
    /**
     * Timestamp of when the entity was last updated in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof WebauthnSettingGetRsp
     */
    'updated': string;
}
/**
 *
 * @export
 * @interface WebauthnSettingItem
 */
export interface WebauthnSettingItem {
    /**
     * Name of this setting
     * @type {string}
     * @memberof WebauthnSettingItem
     */
    'name': string;
    /**
     * Define here either a url incl. schema or an android-apk-key-hash
     * @type {string}
     * @memberof WebauthnSettingItem
     */
    'origin': string;
    /**
     * ID of WebAuthn setting
     * @type {string}
     * @memberof WebauthnSettingItem
     */
    'id': string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof WebauthnSettingItem
     */
    'created': string;
    /**
     * Timestamp of when the entity was last updated in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof WebauthnSettingItem
     */
    'updated': string;
}
/**
 *
 * @export
 * @interface WebauthnSettingListRsp
 */
export interface WebauthnSettingListRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof WebauthnSettingListRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof WebauthnSettingListRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof WebauthnSettingListRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof WebauthnSettingListRsp
     */
    'runtime': number;
    /**
     *
     * @type {Array<WebauthnSettingItem>}
     * @memberof WebauthnSettingListRsp
     */
    'rows': Array<WebauthnSettingItem>;
    /**
     *
     * @type {Paging}
     * @memberof WebauthnSettingListRsp
     */
    'paging': Paging;
}
/**
 *
 * @export
 * @interface WebauthnSettingUpdateReq
 */
export interface WebauthnSettingUpdateReq {
    /**
     * Name of this setting
     * @type {string}
     * @memberof WebauthnSettingUpdateReq
     */
    'name': string;
    /**
     * Define here either a url incl. schema or an android-apk-key-hash
     * @type {string}
     * @memberof WebauthnSettingUpdateReq
     */
    'origin': string;
    /**
     * Unique ID of request, you can provide your own while making the request, if not the ID will be randomly generated on server side
     * @type {string}
     * @memberof WebauthnSettingUpdateReq
     */
    'requestID'?: string;
    /**
     *
     * @type {ClientInfo}
     * @memberof WebauthnSettingUpdateReq
     */
    'clientInfo'?: ClientInfo;
}
/**
 *
 * @export
 * @interface WebauthnSettingUpdateRsp
 */
export interface WebauthnSettingUpdateRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof WebauthnSettingUpdateRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof WebauthnSettingUpdateRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof WebauthnSettingUpdateRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof WebauthnSettingUpdateRsp
     */
    'runtime': number;
    /**
     * Name of this setting
     * @type {string}
     * @memberof WebauthnSettingUpdateRsp
     */
    'name': string;
    /**
     * Define here either a url incl. schema or an android-apk-key-hash
     * @type {string}
     * @memberof WebauthnSettingUpdateRsp
     */
    'origin': string;
    /**
     * ID of WebAuthn setting
     * @type {string}
     * @memberof WebauthnSettingUpdateRsp
     */
    'id': string;
    /**
     * Timestamp of when the entity was created in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof WebauthnSettingUpdateRsp
     */
    'created': string;
    /**
     * Timestamp of when the entity was last updated in yyyy-MM-dd\'T\'HH:mm:ss format
     * @type {string}
     * @memberof WebauthnSettingUpdateRsp
     */
    'updated': string;
}
/**
 * Webhook log entry
 * @export
 * @interface WebhookLog
 */
export interface WebhookLog {
    /**
     * Unique ID of webhook request which will be randomly generated on server side
     * @type {string}
     * @memberof WebhookLog
     */
    'webhookID': string;
    /**
     * ID of project
     * @type {string}
     * @memberof WebhookLog
     */
    'projectID': string;
    /**
     * Webhook action
     * @type {string}
     * @memberof WebhookLog
     */
    'action': string;
    /**
     * Unique ID of response, you can provide your own while responding to the webhook, if not the ID will be randomly generated on server side. This has the same meaning as overriding requestID for API requests.
     * @type {string}
     * @memberof WebhookLog
     */
    'responseID': string;
    /**
     * Absolute request URL of webhook backend
     * @type {string}
     * @memberof WebhookLog
     */
    'requestURL': string;
    /**
     * Request contents that were sent to webhook backend
     * @type {string}
     * @memberof WebhookLog
     */
    'requestBody': string;
    /**
     * Response HTTP status that was returned by webhook backend
     * @type {number}
     * @memberof WebhookLog
     */
    'responseStatus': number;
    /**
     * Response HTTP headers that were returned by webhook backend
     * @type {object}
     * @memberof WebhookLog
     */
    'responseHeaders': object;
    /**
     * Response body JSON data that was returned by webhook backend
     * @type {string}
     * @memberof WebhookLog
     */
    'responseBody': string;
    /**
     * Response error if present
     * @type {string}
     * @memberof WebhookLog
     */
    'responseError': string;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof WebhookLog
     */
    'runtime': number;
    /**
     * Timestamp of when the request was performed in RFC3339 format
     * @type {string}
     * @memberof WebhookLog
     */
    'created': string;
}
/**
 *
 * @export
 * @interface WebhookLogsListRsp
 */
export interface WebhookLogsListRsp {
    /**
     * HTTP status code of operation
     * @type {number}
     * @memberof WebhookLogsListRsp
     */
    'httpStatusCode': number;
    /**
     *
     * @type {string}
     * @memberof WebhookLogsListRsp
     */
    'message': string;
    /**
     *
     * @type {RequestData}
     * @memberof WebhookLogsListRsp
     */
    'requestData': RequestData;
    /**
     * Runtime in seconds for this request
     * @type {number}
     * @memberof WebhookLogsListRsp
     */
    'runtime': number;
    /**
     *
     * @type {WebhookLogsListRspAllOfData}
     * @memberof WebhookLogsListRsp
     */
    'data': WebhookLogsListRspAllOfData;
}
/**
 *
 * @export
 * @interface WebhookLogsListRspAllOfData
 */
export interface WebhookLogsListRspAllOfData {
    /**
     *
     * @type {Array<WebhookLog>}
     * @memberof WebhookLogsListRspAllOfData
     */
    'logs': Array<WebhookLog>;
    /**
     *
     * @type {Paging}
     * @memberof WebhookLogsListRspAllOfData
     */
    'paging': Paging;
}
/**
 * APISecretsApi - axios parameter creator
 * @export
 */
export declare const APISecretsApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     * Creates an API secret
     * @param {ProjectSecretCreateReq} [projectSecretCreateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectSecretCreate: (projectSecretCreateReq?: ProjectSecretCreateReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Deletes API secret
     * @param {string} secretID Secret ID from create
     * @param {ProjectSecretDeleteReq} [projectSecretDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectSecretDelete: (secretID: string, projectSecretDeleteReq?: ProjectSecretDeleteReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Lists API secrets
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectSecretList: (options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
/**
 * APISecretsApi - functional programming interface
 * @export
 */
export declare const APISecretsApiFp: (configuration?: Configuration) => {
    /**
     * Creates an API secret
     * @param {ProjectSecretCreateReq} [projectSecretCreateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectSecretCreate(projectSecretCreateReq?: ProjectSecretCreateReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ProjectSecretCreateRsp>>;
    /**
     * Deletes API secret
     * @param {string} secretID Secret ID from create
     * @param {ProjectSecretDeleteReq} [projectSecretDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectSecretDelete(secretID: string, projectSecretDeleteReq?: ProjectSecretDeleteReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GenericRsp>>;
    /**
     * Lists API secrets
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectSecretList(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ProjectSecretListRsp>>;
};
/**
 * APISecretsApi - factory interface
 * @export
 */
export declare const APISecretsApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    /**
     * Creates an API secret
     * @param {ProjectSecretCreateReq} [projectSecretCreateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectSecretCreate(projectSecretCreateReq?: ProjectSecretCreateReq, options?: any): AxiosPromise<ProjectSecretCreateRsp>;
    /**
     * Deletes API secret
     * @param {string} secretID Secret ID from create
     * @param {ProjectSecretDeleteReq} [projectSecretDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectSecretDelete(secretID: string, projectSecretDeleteReq?: ProjectSecretDeleteReq, options?: any): AxiosPromise<GenericRsp>;
    /**
     * Lists API secrets
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectSecretList(options?: any): AxiosPromise<ProjectSecretListRsp>;
};
/**
 * APISecretsApi - object-oriented interface
 * @export
 * @class APISecretsApi
 * @extends {BaseAPI}
 */
export declare class APISecretsApi extends BaseAPI {
    /**
     * Creates an API secret
     * @param {ProjectSecretCreateReq} [projectSecretCreateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof APISecretsApi
     */
    projectSecretCreate(projectSecretCreateReq?: ProjectSecretCreateReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<ProjectSecretCreateRsp, any>>;
    /**
     * Deletes API secret
     * @param {string} secretID Secret ID from create
     * @param {ProjectSecretDeleteReq} [projectSecretDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof APISecretsApi
     */
    projectSecretDelete(secretID: string, projectSecretDeleteReq?: ProjectSecretDeleteReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<GenericRsp, any>>;
    /**
     * Lists API secrets
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof APISecretsApi
     */
    projectSecretList(options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<ProjectSecretListRsp, any>>;
}
/**
 * AnalyzerApi - axios parameter creator
 * @export
 */
export declare const AnalyzerApiAxiosParamCreator: (configuration?: Configuration) => {
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
    trackingAllRequest: (remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Provides tracking credential backup state data
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    trackingBackupStateGet: (remoteAddress?: string, userAgent?: string, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
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
    trackingBrowserDetailedStatsList: (granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
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
    trackingBrowserStatsList: (granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
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
    trackingDetailedStatsList: (granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Provides tracking enum values
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    trackingEnumsGet: (remoteAddress?: string, userAgent?: string, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
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
    trackingOSDetailedStatsList: (granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
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
    trackingOSStatsList: (granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
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
    trackingStatsList: (granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
/**
 * AnalyzerApi - functional programming interface
 * @export
 */
export declare const AnalyzerApiFp: (configuration?: Configuration) => {
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
    trackingAllRequest(remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TrackingRawListRsp>>;
    /**
     * Provides tracking credential backup state data
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    trackingBackupStateGet(remoteAddress?: string, userAgent?: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TrackingBackupStateGetRsp>>;
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
    trackingBrowserDetailedStatsList(granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TrackingBrowserDetailedStatsListRsp>>;
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
    trackingBrowserStatsList(granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TrackingBrowserStatsListRsp>>;
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
    trackingDetailedStatsList(granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TrackingDetailedStatsListRsp>>;
    /**
     * Provides tracking enum values
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    trackingEnumsGet(remoteAddress?: string, userAgent?: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TrackingEnumsGetRsp>>;
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
    trackingOSDetailedStatsList(granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TrackingOSDetailedStatsListRsp>>;
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
    trackingOSStatsList(granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TrackingOSStatsListRsp>>;
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
    trackingStatsList(granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TrackingStatsListRsp>>;
};
/**
 * AnalyzerApi - factory interface
 * @export
 */
export declare const AnalyzerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
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
    trackingAllRequest(remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: any): AxiosPromise<TrackingRawListRsp>;
    /**
     * Provides tracking credential backup state data
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    trackingBackupStateGet(remoteAddress?: string, userAgent?: string, options?: any): AxiosPromise<TrackingBackupStateGetRsp>;
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
    trackingBrowserDetailedStatsList(granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: any): AxiosPromise<TrackingBrowserDetailedStatsListRsp>;
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
    trackingBrowserStatsList(granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: any): AxiosPromise<TrackingBrowserStatsListRsp>;
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
    trackingDetailedStatsList(granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: any): AxiosPromise<TrackingDetailedStatsListRsp>;
    /**
     * Provides tracking enum values
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    trackingEnumsGet(remoteAddress?: string, userAgent?: string, options?: any): AxiosPromise<TrackingEnumsGetRsp>;
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
    trackingOSDetailedStatsList(granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: any): AxiosPromise<TrackingOSDetailedStatsListRsp>;
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
    trackingOSStatsList(granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: any): AxiosPromise<TrackingOSStatsListRsp>;
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
    trackingStatsList(granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: any): AxiosPromise<TrackingStatsListRsp>;
};
/**
 * AnalyzerApi - object-oriented interface
 * @export
 * @class AnalyzerApi
 * @extends {BaseAPI}
 */
export declare class AnalyzerApi extends BaseAPI {
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
    trackingAllRequest(remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<TrackingRawListRsp, any>>;
    /**
     * Provides tracking credential backup state data
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyzerApi
     */
    trackingBackupStateGet(remoteAddress?: string, userAgent?: string, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<TrackingBackupStateGetRsp, any>>;
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
    trackingBrowserDetailedStatsList(granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<TrackingBrowserDetailedStatsListRsp, any>>;
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
    trackingBrowserStatsList(granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<TrackingBrowserStatsListRsp, any>>;
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
    trackingDetailedStatsList(granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<TrackingDetailedStatsListRsp, any>>;
    /**
     * Provides tracking enum values
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyzerApi
     */
    trackingEnumsGet(remoteAddress?: string, userAgent?: string, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<TrackingEnumsGetRsp, any>>;
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
    trackingOSDetailedStatsList(granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<TrackingOSDetailedStatsListRsp, any>>;
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
    trackingOSStatsList(granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<TrackingOSStatsListRsp, any>>;
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
    trackingStatsList(granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<TrackingStatsListRsp, any>>;
}
/**
 * AndroidAppConfigApi - axios parameter creator
 * @export
 */
export declare const AndroidAppConfigApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     * Creates a new Android App Configuration
     * @param {AndroidAppConfigSaveReq} androidAppConfigSaveReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    androidAppConfigCreate: (androidAppConfigSaveReq: AndroidAppConfigSaveReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Deletes an Android App Config
     * @param {string} androidAppConfigID Android App Config ID from create
     * @param {AndroidAppConfigDeleteReq} [androidAppConfigDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    androidAppConfigDelete: (androidAppConfigID: string, androidAppConfigDeleteReq?: AndroidAppConfigDeleteReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Lists Android App Configurations for a project
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    androidAppConfigGet: (options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Updates an Android app config by id
     * @param {string} androidAppConfigID ID from Android config create
     * @param {AndroidAppConfigUpdateReq} [androidAppConfigUpdateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    androidAppConfigPut: (androidAppConfigID: string, androidAppConfigUpdateReq?: AndroidAppConfigUpdateReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
/**
 * AndroidAppConfigApi - functional programming interface
 * @export
 */
export declare const AndroidAppConfigApiFp: (configuration?: Configuration) => {
    /**
     * Creates a new Android App Configuration
     * @param {AndroidAppConfigSaveReq} androidAppConfigSaveReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    androidAppConfigCreate(androidAppConfigSaveReq: AndroidAppConfigSaveReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AndroidAppConfigSaveRsp>>;
    /**
     * Deletes an Android App Config
     * @param {string} androidAppConfigID Android App Config ID from create
     * @param {AndroidAppConfigDeleteReq} [androidAppConfigDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    androidAppConfigDelete(androidAppConfigID: string, androidAppConfigDeleteReq?: AndroidAppConfigDeleteReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GenericRsp>>;
    /**
     * Lists Android App Configurations for a project
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    androidAppConfigGet(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AndroidAppConfigListRsp>>;
    /**
     * Updates an Android app config by id
     * @param {string} androidAppConfigID ID from Android config create
     * @param {AndroidAppConfigUpdateReq} [androidAppConfigUpdateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    androidAppConfigPut(androidAppConfigID: string, androidAppConfigUpdateReq?: AndroidAppConfigUpdateReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AndroidAppConfigUpdateRsp>>;
};
/**
 * AndroidAppConfigApi - factory interface
 * @export
 */
export declare const AndroidAppConfigApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    /**
     * Creates a new Android App Configuration
     * @param {AndroidAppConfigSaveReq} androidAppConfigSaveReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    androidAppConfigCreate(androidAppConfigSaveReq: AndroidAppConfigSaveReq, options?: any): AxiosPromise<AndroidAppConfigSaveRsp>;
    /**
     * Deletes an Android App Config
     * @param {string} androidAppConfigID Android App Config ID from create
     * @param {AndroidAppConfigDeleteReq} [androidAppConfigDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    androidAppConfigDelete(androidAppConfigID: string, androidAppConfigDeleteReq?: AndroidAppConfigDeleteReq, options?: any): AxiosPromise<GenericRsp>;
    /**
     * Lists Android App Configurations for a project
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    androidAppConfigGet(options?: any): AxiosPromise<AndroidAppConfigListRsp>;
    /**
     * Updates an Android app config by id
     * @param {string} androidAppConfigID ID from Android config create
     * @param {AndroidAppConfigUpdateReq} [androidAppConfigUpdateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    androidAppConfigPut(androidAppConfigID: string, androidAppConfigUpdateReq?: AndroidAppConfigUpdateReq, options?: any): AxiosPromise<AndroidAppConfigUpdateRsp>;
};
/**
 * AndroidAppConfigApi - object-oriented interface
 * @export
 * @class AndroidAppConfigApi
 * @extends {BaseAPI}
 */
export declare class AndroidAppConfigApi extends BaseAPI {
    /**
     * Creates a new Android App Configuration
     * @param {AndroidAppConfigSaveReq} androidAppConfigSaveReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AndroidAppConfigApi
     */
    androidAppConfigCreate(androidAppConfigSaveReq: AndroidAppConfigSaveReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<AndroidAppConfigSaveRsp, any>>;
    /**
     * Deletes an Android App Config
     * @param {string} androidAppConfigID Android App Config ID from create
     * @param {AndroidAppConfigDeleteReq} [androidAppConfigDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AndroidAppConfigApi
     */
    androidAppConfigDelete(androidAppConfigID: string, androidAppConfigDeleteReq?: AndroidAppConfigDeleteReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<GenericRsp, any>>;
    /**
     * Lists Android App Configurations for a project
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AndroidAppConfigApi
     */
    androidAppConfigGet(options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<AndroidAppConfigListRsp, any>>;
    /**
     * Updates an Android app config by id
     * @param {string} androidAppConfigID ID from Android config create
     * @param {AndroidAppConfigUpdateReq} [androidAppConfigUpdateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AndroidAppConfigApi
     */
    androidAppConfigPut(androidAppConfigID: string, androidAppConfigUpdateReq?: AndroidAppConfigUpdateReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<AndroidAppConfigUpdateRsp, any>>;
}
/**
 * AssociationTokensApi - axios parameter creator
 * @export
 */
export declare const AssociationTokensApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     * Creates a new association token
     * @param {AssociationTokenCreateReq} associationTokenCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    associationTokenCreate: (associationTokenCreateReq: AssociationTokenCreateReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
/**
 * AssociationTokensApi - functional programming interface
 * @export
 */
export declare const AssociationTokensApiFp: (configuration?: Configuration) => {
    /**
     * Creates a new association token
     * @param {AssociationTokenCreateReq} associationTokenCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    associationTokenCreate(associationTokenCreateReq: AssociationTokenCreateReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AssociationTokenCreateRsp>>;
};
/**
 * AssociationTokensApi - factory interface
 * @export
 */
export declare const AssociationTokensApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    /**
     * Creates a new association token
     * @param {AssociationTokenCreateReq} associationTokenCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    associationTokenCreate(associationTokenCreateReq: AssociationTokenCreateReq, options?: any): AxiosPromise<AssociationTokenCreateRsp>;
};
/**
 * AssociationTokensApi - object-oriented interface
 * @export
 * @class AssociationTokensApi
 * @extends {BaseAPI}
 */
export declare class AssociationTokensApi extends BaseAPI {
    /**
     * Creates a new association token
     * @param {AssociationTokenCreateReq} associationTokenCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AssociationTokensApi
     */
    associationTokenCreate(associationTokenCreateReq: AssociationTokenCreateReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<AssociationTokenCreateRsp, any>>;
}
/**
 * AuthMethodsApi - axios parameter creator
 * @export
 */
export declare const AuthMethodsApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     * Retrieves possible authentication methods for provided username
     * @param {AuthMethodsListReq} authMethodsListReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    authMethodsList: (authMethodsListReq: AuthMethodsListReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
/**
 * AuthMethodsApi - functional programming interface
 * @export
 */
export declare const AuthMethodsApiFp: (configuration?: Configuration) => {
    /**
     * Retrieves possible authentication methods for provided username
     * @param {AuthMethodsListReq} authMethodsListReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    authMethodsList(authMethodsListReq: AuthMethodsListReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuthMethodsListRsp>>;
};
/**
 * AuthMethodsApi - factory interface
 * @export
 */
export declare const AuthMethodsApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    /**
     * Retrieves possible authentication methods for provided username
     * @param {AuthMethodsListReq} authMethodsListReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    authMethodsList(authMethodsListReq: AuthMethodsListReq, options?: any): AxiosPromise<AuthMethodsListRsp>;
};
/**
 * AuthMethodsApi - object-oriented interface
 * @export
 * @class AuthMethodsApi
 * @extends {BaseAPI}
 */
export declare class AuthMethodsApi extends BaseAPI {
    /**
     * Retrieves possible authentication methods for provided username
     * @param {AuthMethodsListReq} authMethodsListReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthMethodsApi
     */
    authMethodsList(authMethodsListReq: AuthMethodsListReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<AuthMethodsListRsp, any>>;
}
/**
 * AuthTokensApi - axios parameter creator
 * @export
 */
export declare const AuthTokensApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     * Validates auth token and returns attached user data
     * @param {AuthTokenValidateReq} authTokenValidateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    authTokenValidate: (authTokenValidateReq: AuthTokenValidateReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
/**
 * AuthTokensApi - functional programming interface
 * @export
 */
export declare const AuthTokensApiFp: (configuration?: Configuration) => {
    /**
     * Validates auth token and returns attached user data
     * @param {AuthTokenValidateReq} authTokenValidateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    authTokenValidate(authTokenValidateReq: AuthTokenValidateReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuthTokenValidateRsp>>;
};
/**
 * AuthTokensApi - factory interface
 * @export
 */
export declare const AuthTokensApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    /**
     * Validates auth token and returns attached user data
     * @param {AuthTokenValidateReq} authTokenValidateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    authTokenValidate(authTokenValidateReq: AuthTokenValidateReq, options?: any): AxiosPromise<AuthTokenValidateRsp>;
};
/**
 * AuthTokensApi - object-oriented interface
 * @export
 * @class AuthTokensApi
 * @extends {BaseAPI}
 */
export declare class AuthTokensApi extends BaseAPI {
    /**
     * Validates auth token and returns attached user data
     * @param {AuthTokenValidateReq} authTokenValidateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthTokensApi
     */
    authTokenValidate(authTokenValidateReq: AuthTokenValidateReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<AuthTokenValidateRsp, any>>;
}
/**
 * EmailMagicLinksApi - axios parameter creator
 * @export
 */
export declare const EmailMagicLinksApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     * Deletes an email magic link
     * @param {string} emailLinkID ID of email magic link
     * @param {EmailLinksDeleteReq} [emailLinksDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailLinkDelete: (emailLinkID: string, emailLinksDeleteReq?: EmailLinksDeleteReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Get an email magic link only one time after confirmed
     * @param {string} emailLinkID ID of email magic link
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailLinkGet: (emailLinkID: string, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Creates email magic link and sends it to given email address
     * @param {EmailLinkSendReq} emailLinkSendReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailLinkSend: (emailLinkSendReq: EmailLinkSendReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Validates email magic link token
     * @param {string} emailLinkID ID of email magic link
     * @param {EmailLinksValidateReq} emailLinksValidateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailLinkValidate: (emailLinkID: string, emailLinksValidateReq: EmailLinksValidateReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
/**
 * EmailMagicLinksApi - functional programming interface
 * @export
 */
export declare const EmailMagicLinksApiFp: (configuration?: Configuration) => {
    /**
     * Deletes an email magic link
     * @param {string} emailLinkID ID of email magic link
     * @param {EmailLinksDeleteReq} [emailLinksDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailLinkDelete(emailLinkID: string, emailLinksDeleteReq?: EmailLinksDeleteReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<EmailLinkValidateRsp>>;
    /**
     * Get an email magic link only one time after confirmed
     * @param {string} emailLinkID ID of email magic link
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailLinkGet(emailLinkID: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<EmailLinkGetRsp>>;
    /**
     * Creates email magic link and sends it to given email address
     * @param {EmailLinkSendReq} emailLinkSendReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailLinkSend(emailLinkSendReq: EmailLinkSendReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<EmailLinkSendRsp>>;
    /**
     * Validates email magic link token
     * @param {string} emailLinkID ID of email magic link
     * @param {EmailLinksValidateReq} emailLinksValidateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailLinkValidate(emailLinkID: string, emailLinksValidateReq: EmailLinksValidateReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<EmailLinkValidateRsp>>;
};
/**
 * EmailMagicLinksApi - factory interface
 * @export
 */
export declare const EmailMagicLinksApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    /**
     * Deletes an email magic link
     * @param {string} emailLinkID ID of email magic link
     * @param {EmailLinksDeleteReq} [emailLinksDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailLinkDelete(emailLinkID: string, emailLinksDeleteReq?: EmailLinksDeleteReq, options?: any): AxiosPromise<EmailLinkValidateRsp>;
    /**
     * Get an email magic link only one time after confirmed
     * @param {string} emailLinkID ID of email magic link
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailLinkGet(emailLinkID: string, options?: any): AxiosPromise<EmailLinkGetRsp>;
    /**
     * Creates email magic link and sends it to given email address
     * @param {EmailLinkSendReq} emailLinkSendReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailLinkSend(emailLinkSendReq: EmailLinkSendReq, options?: any): AxiosPromise<EmailLinkSendRsp>;
    /**
     * Validates email magic link token
     * @param {string} emailLinkID ID of email magic link
     * @param {EmailLinksValidateReq} emailLinksValidateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailLinkValidate(emailLinkID: string, emailLinksValidateReq: EmailLinksValidateReq, options?: any): AxiosPromise<EmailLinkValidateRsp>;
};
/**
 * EmailMagicLinksApi - object-oriented interface
 * @export
 * @class EmailMagicLinksApi
 * @extends {BaseAPI}
 */
export declare class EmailMagicLinksApi extends BaseAPI {
    /**
     * Deletes an email magic link
     * @param {string} emailLinkID ID of email magic link
     * @param {EmailLinksDeleteReq} [emailLinksDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmailMagicLinksApi
     */
    emailLinkDelete(emailLinkID: string, emailLinksDeleteReq?: EmailLinksDeleteReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<EmailLinkValidateRsp, any>>;
    /**
     * Get an email magic link only one time after confirmed
     * @param {string} emailLinkID ID of email magic link
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmailMagicLinksApi
     */
    emailLinkGet(emailLinkID: string, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<EmailLinkGetRsp, any>>;
    /**
     * Creates email magic link and sends it to given email address
     * @param {EmailLinkSendReq} emailLinkSendReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmailMagicLinksApi
     */
    emailLinkSend(emailLinkSendReq: EmailLinkSendReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<EmailLinkSendRsp, any>>;
    /**
     * Validates email magic link token
     * @param {string} emailLinkID ID of email magic link
     * @param {EmailLinksValidateReq} emailLinksValidateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmailMagicLinksApi
     */
    emailLinkValidate(emailLinkID: string, emailLinksValidateReq: EmailLinksValidateReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<EmailLinkValidateRsp, any>>;
}
/**
 * EmailOTPApi - axios parameter creator
 * @export
 */
export declare const EmailOTPApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     * Get an email OTP only one time after confirmed
     * @param {string} emailCodeID ID of email OTP
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailCodeGet: (emailCodeID: string, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Creates email code and sends it to given email address
     * @param {EmailCodeSendReq} emailCodeSendReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailCodeSend: (emailCodeSendReq: EmailCodeSendReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Validates email code
     * @param {string} emailCodeID ID of email OTP
     * @param {EmailCodeValidateReq} emailCodeValidateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailCodeValidate: (emailCodeID: string, emailCodeValidateReq: EmailCodeValidateReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
/**
 * EmailOTPApi - functional programming interface
 * @export
 */
export declare const EmailOTPApiFp: (configuration?: Configuration) => {
    /**
     * Get an email OTP only one time after confirmed
     * @param {string} emailCodeID ID of email OTP
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailCodeGet(emailCodeID: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<EmailCodeGetRsp>>;
    /**
     * Creates email code and sends it to given email address
     * @param {EmailCodeSendReq} emailCodeSendReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailCodeSend(emailCodeSendReq: EmailCodeSendReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<EmailCodeSendRsp>>;
    /**
     * Validates email code
     * @param {string} emailCodeID ID of email OTP
     * @param {EmailCodeValidateReq} emailCodeValidateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailCodeValidate(emailCodeID: string, emailCodeValidateReq: EmailCodeValidateReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<EmailCodeValidateRsp>>;
};
/**
 * EmailOTPApi - factory interface
 * @export
 */
export declare const EmailOTPApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    /**
     * Get an email OTP only one time after confirmed
     * @param {string} emailCodeID ID of email OTP
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailCodeGet(emailCodeID: string, options?: any): AxiosPromise<EmailCodeGetRsp>;
    /**
     * Creates email code and sends it to given email address
     * @param {EmailCodeSendReq} emailCodeSendReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailCodeSend(emailCodeSendReq: EmailCodeSendReq, options?: any): AxiosPromise<EmailCodeSendRsp>;
    /**
     * Validates email code
     * @param {string} emailCodeID ID of email OTP
     * @param {EmailCodeValidateReq} emailCodeValidateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailCodeValidate(emailCodeID: string, emailCodeValidateReq: EmailCodeValidateReq, options?: any): AxiosPromise<EmailCodeValidateRsp>;
};
/**
 * EmailOTPApi - object-oriented interface
 * @export
 * @class EmailOTPApi
 * @extends {BaseAPI}
 */
export declare class EmailOTPApi extends BaseAPI {
    /**
     * Get an email OTP only one time after confirmed
     * @param {string} emailCodeID ID of email OTP
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmailOTPApi
     */
    emailCodeGet(emailCodeID: string, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<EmailCodeGetRsp, any>>;
    /**
     * Creates email code and sends it to given email address
     * @param {EmailCodeSendReq} emailCodeSendReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmailOTPApi
     */
    emailCodeSend(emailCodeSendReq: EmailCodeSendReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<EmailCodeSendRsp, any>>;
    /**
     * Validates email code
     * @param {string} emailCodeID ID of email OTP
     * @param {EmailCodeValidateReq} emailCodeValidateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmailOTPApi
     */
    emailCodeValidate(emailCodeID: string, emailCodeValidateReq: EmailCodeValidateReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<EmailCodeValidateRsp, any>>;
}
/**
 * EmailTemplatesApi - axios parameter creator
 * @export
 */
export declare const EmailTemplatesApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     * Creates a new email template
     * @param {EmailTemplateCreateReq} emailTemplateCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailTemplateCreate: (emailTemplateCreateReq: EmailTemplateCreateReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Deletes an email template
     * @param {string} emailTemplateID ID of email template
     * @param {EmailTemplateDeleteReq} emailTemplateDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailTemplateDelete: (emailTemplateID: string, emailTemplateDeleteReq: EmailTemplateDeleteReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
/**
 * EmailTemplatesApi - functional programming interface
 * @export
 */
export declare const EmailTemplatesApiFp: (configuration?: Configuration) => {
    /**
     * Creates a new email template
     * @param {EmailTemplateCreateReq} emailTemplateCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailTemplateCreate(emailTemplateCreateReq: EmailTemplateCreateReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<EmailTemplateCreateRsp>>;
    /**
     * Deletes an email template
     * @param {string} emailTemplateID ID of email template
     * @param {EmailTemplateDeleteReq} emailTemplateDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailTemplateDelete(emailTemplateID: string, emailTemplateDeleteReq: EmailTemplateDeleteReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GenericRsp>>;
};
/**
 * EmailTemplatesApi - factory interface
 * @export
 */
export declare const EmailTemplatesApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    /**
     * Creates a new email template
     * @param {EmailTemplateCreateReq} emailTemplateCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailTemplateCreate(emailTemplateCreateReq: EmailTemplateCreateReq, options?: any): AxiosPromise<EmailTemplateCreateRsp>;
    /**
     * Deletes an email template
     * @param {string} emailTemplateID ID of email template
     * @param {EmailTemplateDeleteReq} emailTemplateDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    emailTemplateDelete(emailTemplateID: string, emailTemplateDeleteReq: EmailTemplateDeleteReq, options?: any): AxiosPromise<GenericRsp>;
};
/**
 * EmailTemplatesApi - object-oriented interface
 * @export
 * @class EmailTemplatesApi
 * @extends {BaseAPI}
 */
export declare class EmailTemplatesApi extends BaseAPI {
    /**
     * Creates a new email template
     * @param {EmailTemplateCreateReq} emailTemplateCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmailTemplatesApi
     */
    emailTemplateCreate(emailTemplateCreateReq: EmailTemplateCreateReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<EmailTemplateCreateRsp, any>>;
    /**
     * Deletes an email template
     * @param {string} emailTemplateID ID of email template
     * @param {EmailTemplateDeleteReq} emailTemplateDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmailTemplatesApi
     */
    emailTemplateDelete(emailTemplateID: string, emailTemplateDeleteReq: EmailTemplateDeleteReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<GenericRsp, any>>;
}
/**
 * ExamplesApi - axios parameter creator
 * @export
 */
export declare const ExamplesApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     * Retrieves file containing the named example project
     * @param {ExampleGetFileNameEnum} fileName Name of the example to get
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    exampleGet: (fileName: ExampleGetFileNameEnum, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
/**
 * ExamplesApi - functional programming interface
 * @export
 */
export declare const ExamplesApiFp: (configuration?: Configuration) => {
    /**
     * Retrieves file containing the named example project
     * @param {ExampleGetFileNameEnum} fileName Name of the example to get
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    exampleGet(fileName: ExampleGetFileNameEnum, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ExampleGetRsp>>;
};
/**
 * ExamplesApi - factory interface
 * @export
 */
export declare const ExamplesApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    /**
     * Retrieves file containing the named example project
     * @param {ExampleGetFileNameEnum} fileName Name of the example to get
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    exampleGet(fileName: ExampleGetFileNameEnum, options?: any): AxiosPromise<ExampleGetRsp>;
};
/**
 * ExamplesApi - object-oriented interface
 * @export
 * @class ExamplesApi
 * @extends {BaseAPI}
 */
export declare class ExamplesApi extends BaseAPI {
    /**
     * Retrieves file containing the named example project
     * @param {ExampleGetFileNameEnum} fileName Name of the example to get
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ExamplesApi
     */
    exampleGet(fileName: ExampleGetFileNameEnum, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<ExampleGetRsp, any>>;
}
/**
 * @export
 */
export declare const ExampleGetFileNameEnum: {
    readonly Zip: "webcomponent-php-symfony.zip";
    readonly TarGz: "webcomponent-php-symfony.tar.gz";
};
export type ExampleGetFileNameEnum = typeof ExampleGetFileNameEnum[keyof typeof ExampleGetFileNameEnum];
/**
 * IOSAppConfigApi - axios parameter creator
 * @export
 */
export declare const IOSAppConfigApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     * Creates a new iOS App Config
     * @param {IOSAppConfigSaveReq} iOSAppConfigSaveReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    iOSAppConfigCreate: (iOSAppConfigSaveReq: IOSAppConfigSaveReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Deletes an iOS App Config
     * @param {string} iosAppConfigID iOS App Config ID from create
     * @param {IOSAppConfigDeleteReq} [iOSAppConfigDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    iOSAppConfigDelete: (iosAppConfigID: string, iOSAppConfigDeleteReq?: IOSAppConfigDeleteReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Lists iOS App Configs for a project
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    iOSAppConfigGet: (options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Updates an iOS app config by id
     * @param {string} iosAppConfigID ID from iOS config create
     * @param {IOSAppConfigUpdateReq} [iOSAppConfigUpdateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    iOSAppConfigPut: (iosAppConfigID: string, iOSAppConfigUpdateReq?: IOSAppConfigUpdateReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
/**
 * IOSAppConfigApi - functional programming interface
 * @export
 */
export declare const IOSAppConfigApiFp: (configuration?: Configuration) => {
    /**
     * Creates a new iOS App Config
     * @param {IOSAppConfigSaveReq} iOSAppConfigSaveReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    iOSAppConfigCreate(iOSAppConfigSaveReq: IOSAppConfigSaveReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<IOSAppConfigSaveRsp>>;
    /**
     * Deletes an iOS App Config
     * @param {string} iosAppConfigID iOS App Config ID from create
     * @param {IOSAppConfigDeleteReq} [iOSAppConfigDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    iOSAppConfigDelete(iosAppConfigID: string, iOSAppConfigDeleteReq?: IOSAppConfigDeleteReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GenericRsp>>;
    /**
     * Lists iOS App Configs for a project
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    iOSAppConfigGet(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<IOSAppConfigListRsp>>;
    /**
     * Updates an iOS app config by id
     * @param {string} iosAppConfigID ID from iOS config create
     * @param {IOSAppConfigUpdateReq} [iOSAppConfigUpdateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    iOSAppConfigPut(iosAppConfigID: string, iOSAppConfigUpdateReq?: IOSAppConfigUpdateReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<IOSAppConfigUpdateRsp>>;
};
/**
 * IOSAppConfigApi - factory interface
 * @export
 */
export declare const IOSAppConfigApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    /**
     * Creates a new iOS App Config
     * @param {IOSAppConfigSaveReq} iOSAppConfigSaveReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    iOSAppConfigCreate(iOSAppConfigSaveReq: IOSAppConfigSaveReq, options?: any): AxiosPromise<IOSAppConfigSaveRsp>;
    /**
     * Deletes an iOS App Config
     * @param {string} iosAppConfigID iOS App Config ID from create
     * @param {IOSAppConfigDeleteReq} [iOSAppConfigDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    iOSAppConfigDelete(iosAppConfigID: string, iOSAppConfigDeleteReq?: IOSAppConfigDeleteReq, options?: any): AxiosPromise<GenericRsp>;
    /**
     * Lists iOS App Configs for a project
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    iOSAppConfigGet(options?: any): AxiosPromise<IOSAppConfigListRsp>;
    /**
     * Updates an iOS app config by id
     * @param {string} iosAppConfigID ID from iOS config create
     * @param {IOSAppConfigUpdateReq} [iOSAppConfigUpdateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    iOSAppConfigPut(iosAppConfigID: string, iOSAppConfigUpdateReq?: IOSAppConfigUpdateReq, options?: any): AxiosPromise<IOSAppConfigUpdateRsp>;
};
/**
 * IOSAppConfigApi - object-oriented interface
 * @export
 * @class IOSAppConfigApi
 * @extends {BaseAPI}
 */
export declare class IOSAppConfigApi extends BaseAPI {
    /**
     * Creates a new iOS App Config
     * @param {IOSAppConfigSaveReq} iOSAppConfigSaveReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IOSAppConfigApi
     */
    iOSAppConfigCreate(iOSAppConfigSaveReq: IOSAppConfigSaveReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<IOSAppConfigSaveRsp, any>>;
    /**
     * Deletes an iOS App Config
     * @param {string} iosAppConfigID iOS App Config ID from create
     * @param {IOSAppConfigDeleteReq} [iOSAppConfigDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IOSAppConfigApi
     */
    iOSAppConfigDelete(iosAppConfigID: string, iOSAppConfigDeleteReq?: IOSAppConfigDeleteReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<GenericRsp, any>>;
    /**
     * Lists iOS App Configs for a project
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IOSAppConfigApi
     */
    iOSAppConfigGet(options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<IOSAppConfigListRsp, any>>;
    /**
     * Updates an iOS app config by id
     * @param {string} iosAppConfigID ID from iOS config create
     * @param {IOSAppConfigUpdateReq} [iOSAppConfigUpdateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IOSAppConfigApi
     */
    iOSAppConfigPut(iosAppConfigID: string, iOSAppConfigUpdateReq?: IOSAppConfigUpdateReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<IOSAppConfigUpdateRsp, any>>;
}
/**
 * LongSessionsApi - axios parameter creator
 * @export
 */
export declare const LongSessionsApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     * Get a long session by sessionID
     * @param {string} sessionID ID of session
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    longSessionGet: (sessionID: string, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
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
    longSessionList: (remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Revokes an active long session by sessionID
     * @param {string} sessionID ID of session
     * @param {LongSessionRevokeReq} [longSessionRevokeReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    longSessionRevoke: (sessionID: string, longSessionRevokeReq?: LongSessionRevokeReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
/**
 * LongSessionsApi - functional programming interface
 * @export
 */
export declare const LongSessionsApiFp: (configuration?: Configuration) => {
    /**
     * Get a long session by sessionID
     * @param {string} sessionID ID of session
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    longSessionGet(sessionID: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LongSessionGetRsp>>;
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
    longSessionList(remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LongSessionListRsp>>;
    /**
     * Revokes an active long session by sessionID
     * @param {string} sessionID ID of session
     * @param {LongSessionRevokeReq} [longSessionRevokeReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    longSessionRevoke(sessionID: string, longSessionRevokeReq?: LongSessionRevokeReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GenericRsp>>;
};
/**
 * LongSessionsApi - factory interface
 * @export
 */
export declare const LongSessionsApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    /**
     * Get a long session by sessionID
     * @param {string} sessionID ID of session
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    longSessionGet(sessionID: string, options?: any): AxiosPromise<LongSessionGetRsp>;
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
    longSessionList(remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: any): AxiosPromise<LongSessionListRsp>;
    /**
     * Revokes an active long session by sessionID
     * @param {string} sessionID ID of session
     * @param {LongSessionRevokeReq} [longSessionRevokeReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    longSessionRevoke(sessionID: string, longSessionRevokeReq?: LongSessionRevokeReq, options?: any): AxiosPromise<GenericRsp>;
};
/**
 * LongSessionsApi - object-oriented interface
 * @export
 * @class LongSessionsApi
 * @extends {BaseAPI}
 */
export declare class LongSessionsApi extends BaseAPI {
    /**
     * Get a long session by sessionID
     * @param {string} sessionID ID of session
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LongSessionsApi
     */
    longSessionGet(sessionID: string, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<LongSessionGetRsp, any>>;
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
    longSessionList(remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<LongSessionListRsp, any>>;
    /**
     * Revokes an active long session by sessionID
     * @param {string} sessionID ID of session
     * @param {LongSessionRevokeReq} [longSessionRevokeReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LongSessionsApi
     */
    longSessionRevoke(sessionID: string, longSessionRevokeReq?: LongSessionRevokeReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<GenericRsp, any>>;
}
/**
 * PasskeysBiometricsApi - axios parameter creator
 * @export
 */
export declare const PasskeysBiometricsApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     * Starts association token flow for Passkeys (Biometrics)
     * @param {WebAuthnAssociateStartReq} webAuthnAssociateStartReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnAssociateStart: (webAuthnAssociateStartReq: WebAuthnAssociateStartReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Completes authentication of a user for Passkeys (Biometrics)
     * @param {WebAuthnFinishReq} webAuthnFinishReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnAuthenticateFinish: (webAuthnFinishReq: WebAuthnFinishReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Starts authentication of a user for Passkeys (Biometrics)
     * @param {WebAuthnAuthenticateStartReq} webAuthnAuthenticateStartReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnAuthenticateStart: (webAuthnAuthenticateStartReq: WebAuthnAuthenticateStartReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Update authenticator
     * @param {string} authenticatorID ID of authenticator
     * @param {WebAuthnAuthenticatorUpdateReq} webAuthnAuthenticatorUpdateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnAuthenticatorUpdate: (authenticatorID: string, webAuthnAuthenticatorUpdateReq: WebAuthnAuthenticatorUpdateReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Delete credential
     * @param {string} userID ID of user
     * @param {string} credentialID ID of credential
     * @param {EmptyReq} emptyReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnCredentialDelete: (userID: string, credentialID: string, emptyReq: EmptyReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Checks if active webauthn credential exists for provided user and device
     * @param {WebAuthnCredentialExistsReq} webAuthnCredentialExistsReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnCredentialExists: (webAuthnCredentialExistsReq: WebAuthnCredentialExistsReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
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
    webAuthnCredentialList: (remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Update credential
     * @param {string} credentialID ID of credential
     * @param {WebAuthnCredentialReq} webAuthnCredentialReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnCredentialUpdate: (credentialID: string, webAuthnCredentialReq: WebAuthnCredentialReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Starts mediation for Passkeys (Biometrics)
     * @param {WebAuthnMediationStartReq} webAuthnMediationStartReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnMediationStart: (webAuthnMediationStartReq: WebAuthnMediationStartReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Completes registration of a user for Passkeys (Biometrics)
     * @param {WebAuthnFinishReq} webAuthnFinishReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnRegisterFinish: (webAuthnFinishReq: WebAuthnFinishReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Starts registration of a user for Passkeys (Biometrics)
     * @param {WebAuthnRegisterStartReq} [webAuthnRegisterStartReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnRegisterStart: (webAuthnRegisterStartReq?: WebAuthnRegisterStartReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Creates a new setting for Passkeys (Biometrics)
     * @param {WebauthnSettingCreateReq} [webauthnSettingCreateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnSettingCreate: (webauthnSettingCreateReq?: WebauthnSettingCreateReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Deletes a setting by id for Passkeys (Biometrics)
     * @param {string} settingID ID from create
     * @param {WebauthnSettingDeleteReq} [webauthnSettingDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnSettingDelete: (settingID: string, webauthnSettingDeleteReq?: WebauthnSettingDeleteReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Gets a setting by id for Passkeys (Biometrics)
     * @param {string} settingID ID from create
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnSettingGet: (settingID: string, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
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
    webAuthnSettingList: (remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Updates a setting by id for Passkeys (Biometrics)
     * @param {string} settingID ID from create
     * @param {WebauthnSettingUpdateReq} [webauthnSettingUpdateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnSettingPut: (settingID: string, webauthnSettingUpdateReq?: WebauthnSettingUpdateReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
/**
 * PasskeysBiometricsApi - functional programming interface
 * @export
 */
export declare const PasskeysBiometricsApiFp: (configuration?: Configuration) => {
    /**
     * Starts association token flow for Passkeys (Biometrics)
     * @param {WebAuthnAssociateStartReq} webAuthnAssociateStartReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnAssociateStart(webAuthnAssociateStartReq: WebAuthnAssociateStartReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WebAuthnAssociateStartRsp>>;
    /**
     * Completes authentication of a user for Passkeys (Biometrics)
     * @param {WebAuthnFinishReq} webAuthnFinishReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnAuthenticateFinish(webAuthnFinishReq: WebAuthnFinishReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WebAuthnAuthenticateFinishRsp>>;
    /**
     * Starts authentication of a user for Passkeys (Biometrics)
     * @param {WebAuthnAuthenticateStartReq} webAuthnAuthenticateStartReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnAuthenticateStart(webAuthnAuthenticateStartReq: WebAuthnAuthenticateStartReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WebAuthnAuthenticateStartRsp>>;
    /**
     * Update authenticator
     * @param {string} authenticatorID ID of authenticator
     * @param {WebAuthnAuthenticatorUpdateReq} webAuthnAuthenticatorUpdateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnAuthenticatorUpdate(authenticatorID: string, webAuthnAuthenticatorUpdateReq: WebAuthnAuthenticatorUpdateReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GenericRsp>>;
    /**
     * Delete credential
     * @param {string} userID ID of user
     * @param {string} credentialID ID of credential
     * @param {EmptyReq} emptyReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnCredentialDelete(userID: string, credentialID: string, emptyReq: EmptyReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GenericRsp>>;
    /**
     * Checks if active webauthn credential exists for provided user and device
     * @param {WebAuthnCredentialExistsReq} webAuthnCredentialExistsReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnCredentialExists(webAuthnCredentialExistsReq: WebAuthnCredentialExistsReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WebAuthnCredentialExistsRsp>>;
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
    webAuthnCredentialList(remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WebAuthnCredentialListRsp>>;
    /**
     * Update credential
     * @param {string} credentialID ID of credential
     * @param {WebAuthnCredentialReq} webAuthnCredentialReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnCredentialUpdate(credentialID: string, webAuthnCredentialReq: WebAuthnCredentialReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WebAuthnCredentialRsp>>;
    /**
     * Starts mediation for Passkeys (Biometrics)
     * @param {WebAuthnMediationStartReq} webAuthnMediationStartReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnMediationStart(webAuthnMediationStartReq: WebAuthnMediationStartReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WebAuthnMediationStartRsp>>;
    /**
     * Completes registration of a user for Passkeys (Biometrics)
     * @param {WebAuthnFinishReq} webAuthnFinishReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnRegisterFinish(webAuthnFinishReq: WebAuthnFinishReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WebAuthnRegisterFinishRsp>>;
    /**
     * Starts registration of a user for Passkeys (Biometrics)
     * @param {WebAuthnRegisterStartReq} [webAuthnRegisterStartReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnRegisterStart(webAuthnRegisterStartReq?: WebAuthnRegisterStartReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WebAuthnRegisterStartRsp>>;
    /**
     * Creates a new setting for Passkeys (Biometrics)
     * @param {WebauthnSettingCreateReq} [webauthnSettingCreateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnSettingCreate(webauthnSettingCreateReq?: WebauthnSettingCreateReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WebauthnSettingCreateRsp>>;
    /**
     * Deletes a setting by id for Passkeys (Biometrics)
     * @param {string} settingID ID from create
     * @param {WebauthnSettingDeleteReq} [webauthnSettingDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnSettingDelete(settingID: string, webauthnSettingDeleteReq?: WebauthnSettingDeleteReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GenericRsp>>;
    /**
     * Gets a setting by id for Passkeys (Biometrics)
     * @param {string} settingID ID from create
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnSettingGet(settingID: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WebauthnSettingGetRsp>>;
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
    webAuthnSettingList(remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WebauthnSettingListRsp>>;
    /**
     * Updates a setting by id for Passkeys (Biometrics)
     * @param {string} settingID ID from create
     * @param {WebauthnSettingUpdateReq} [webauthnSettingUpdateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnSettingPut(settingID: string, webauthnSettingUpdateReq?: WebauthnSettingUpdateReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WebauthnSettingUpdateRsp>>;
};
/**
 * PasskeysBiometricsApi - factory interface
 * @export
 */
export declare const PasskeysBiometricsApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    /**
     * Starts association token flow for Passkeys (Biometrics)
     * @param {WebAuthnAssociateStartReq} webAuthnAssociateStartReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnAssociateStart(webAuthnAssociateStartReq: WebAuthnAssociateStartReq, options?: any): AxiosPromise<WebAuthnAssociateStartRsp>;
    /**
     * Completes authentication of a user for Passkeys (Biometrics)
     * @param {WebAuthnFinishReq} webAuthnFinishReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnAuthenticateFinish(webAuthnFinishReq: WebAuthnFinishReq, options?: any): AxiosPromise<WebAuthnAuthenticateFinishRsp>;
    /**
     * Starts authentication of a user for Passkeys (Biometrics)
     * @param {WebAuthnAuthenticateStartReq} webAuthnAuthenticateStartReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnAuthenticateStart(webAuthnAuthenticateStartReq: WebAuthnAuthenticateStartReq, options?: any): AxiosPromise<WebAuthnAuthenticateStartRsp>;
    /**
     * Update authenticator
     * @param {string} authenticatorID ID of authenticator
     * @param {WebAuthnAuthenticatorUpdateReq} webAuthnAuthenticatorUpdateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnAuthenticatorUpdate(authenticatorID: string, webAuthnAuthenticatorUpdateReq: WebAuthnAuthenticatorUpdateReq, options?: any): AxiosPromise<GenericRsp>;
    /**
     * Delete credential
     * @param {string} userID ID of user
     * @param {string} credentialID ID of credential
     * @param {EmptyReq} emptyReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnCredentialDelete(userID: string, credentialID: string, emptyReq: EmptyReq, options?: any): AxiosPromise<GenericRsp>;
    /**
     * Checks if active webauthn credential exists for provided user and device
     * @param {WebAuthnCredentialExistsReq} webAuthnCredentialExistsReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnCredentialExists(webAuthnCredentialExistsReq: WebAuthnCredentialExistsReq, options?: any): AxiosPromise<WebAuthnCredentialExistsRsp>;
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
    webAuthnCredentialList(remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: any): AxiosPromise<WebAuthnCredentialListRsp>;
    /**
     * Update credential
     * @param {string} credentialID ID of credential
     * @param {WebAuthnCredentialReq} webAuthnCredentialReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnCredentialUpdate(credentialID: string, webAuthnCredentialReq: WebAuthnCredentialReq, options?: any): AxiosPromise<WebAuthnCredentialRsp>;
    /**
     * Starts mediation for Passkeys (Biometrics)
     * @param {WebAuthnMediationStartReq} webAuthnMediationStartReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnMediationStart(webAuthnMediationStartReq: WebAuthnMediationStartReq, options?: any): AxiosPromise<WebAuthnMediationStartRsp>;
    /**
     * Completes registration of a user for Passkeys (Biometrics)
     * @param {WebAuthnFinishReq} webAuthnFinishReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnRegisterFinish(webAuthnFinishReq: WebAuthnFinishReq, options?: any): AxiosPromise<WebAuthnRegisterFinishRsp>;
    /**
     * Starts registration of a user for Passkeys (Biometrics)
     * @param {WebAuthnRegisterStartReq} [webAuthnRegisterStartReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnRegisterStart(webAuthnRegisterStartReq?: WebAuthnRegisterStartReq, options?: any): AxiosPromise<WebAuthnRegisterStartRsp>;
    /**
     * Creates a new setting for Passkeys (Biometrics)
     * @param {WebauthnSettingCreateReq} [webauthnSettingCreateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnSettingCreate(webauthnSettingCreateReq?: WebauthnSettingCreateReq, options?: any): AxiosPromise<WebauthnSettingCreateRsp>;
    /**
     * Deletes a setting by id for Passkeys (Biometrics)
     * @param {string} settingID ID from create
     * @param {WebauthnSettingDeleteReq} [webauthnSettingDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnSettingDelete(settingID: string, webauthnSettingDeleteReq?: WebauthnSettingDeleteReq, options?: any): AxiosPromise<GenericRsp>;
    /**
     * Gets a setting by id for Passkeys (Biometrics)
     * @param {string} settingID ID from create
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnSettingGet(settingID: string, options?: any): AxiosPromise<WebauthnSettingGetRsp>;
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
    webAuthnSettingList(remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: any): AxiosPromise<WebauthnSettingListRsp>;
    /**
     * Updates a setting by id for Passkeys (Biometrics)
     * @param {string} settingID ID from create
     * @param {WebauthnSettingUpdateReq} [webauthnSettingUpdateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    webAuthnSettingPut(settingID: string, webauthnSettingUpdateReq?: WebauthnSettingUpdateReq, options?: any): AxiosPromise<WebauthnSettingUpdateRsp>;
};
/**
 * PasskeysBiometricsApi - object-oriented interface
 * @export
 * @class PasskeysBiometricsApi
 * @extends {BaseAPI}
 */
export declare class PasskeysBiometricsApi extends BaseAPI {
    /**
     * Starts association token flow for Passkeys (Biometrics)
     * @param {WebAuthnAssociateStartReq} webAuthnAssociateStartReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnAssociateStart(webAuthnAssociateStartReq: WebAuthnAssociateStartReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<WebAuthnAssociateStartRsp, any>>;
    /**
     * Completes authentication of a user for Passkeys (Biometrics)
     * @param {WebAuthnFinishReq} webAuthnFinishReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnAuthenticateFinish(webAuthnFinishReq: WebAuthnFinishReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<WebAuthnAuthenticateFinishRsp, any>>;
    /**
     * Starts authentication of a user for Passkeys (Biometrics)
     * @param {WebAuthnAuthenticateStartReq} webAuthnAuthenticateStartReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnAuthenticateStart(webAuthnAuthenticateStartReq: WebAuthnAuthenticateStartReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<WebAuthnAuthenticateStartRsp, any>>;
    /**
     * Update authenticator
     * @param {string} authenticatorID ID of authenticator
     * @param {WebAuthnAuthenticatorUpdateReq} webAuthnAuthenticatorUpdateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnAuthenticatorUpdate(authenticatorID: string, webAuthnAuthenticatorUpdateReq: WebAuthnAuthenticatorUpdateReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<GenericRsp, any>>;
    /**
     * Delete credential
     * @param {string} userID ID of user
     * @param {string} credentialID ID of credential
     * @param {EmptyReq} emptyReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnCredentialDelete(userID: string, credentialID: string, emptyReq: EmptyReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<GenericRsp, any>>;
    /**
     * Checks if active webauthn credential exists for provided user and device
     * @param {WebAuthnCredentialExistsReq} webAuthnCredentialExistsReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnCredentialExists(webAuthnCredentialExistsReq: WebAuthnCredentialExistsReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<WebAuthnCredentialExistsRsp, any>>;
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
    webAuthnCredentialList(remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<WebAuthnCredentialListRsp, any>>;
    /**
     * Update credential
     * @param {string} credentialID ID of credential
     * @param {WebAuthnCredentialReq} webAuthnCredentialReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnCredentialUpdate(credentialID: string, webAuthnCredentialReq: WebAuthnCredentialReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<WebAuthnCredentialRsp, any>>;
    /**
     * Starts mediation for Passkeys (Biometrics)
     * @param {WebAuthnMediationStartReq} webAuthnMediationStartReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnMediationStart(webAuthnMediationStartReq: WebAuthnMediationStartReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<WebAuthnMediationStartRsp, any>>;
    /**
     * Completes registration of a user for Passkeys (Biometrics)
     * @param {WebAuthnFinishReq} webAuthnFinishReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnRegisterFinish(webAuthnFinishReq: WebAuthnFinishReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<WebAuthnRegisterFinishRsp, any>>;
    /**
     * Starts registration of a user for Passkeys (Biometrics)
     * @param {WebAuthnRegisterStartReq} [webAuthnRegisterStartReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnRegisterStart(webAuthnRegisterStartReq?: WebAuthnRegisterStartReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<WebAuthnRegisterStartRsp, any>>;
    /**
     * Creates a new setting for Passkeys (Biometrics)
     * @param {WebauthnSettingCreateReq} [webauthnSettingCreateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnSettingCreate(webauthnSettingCreateReq?: WebauthnSettingCreateReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<WebauthnSettingCreateRsp, any>>;
    /**
     * Deletes a setting by id for Passkeys (Biometrics)
     * @param {string} settingID ID from create
     * @param {WebauthnSettingDeleteReq} [webauthnSettingDeleteReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnSettingDelete(settingID: string, webauthnSettingDeleteReq?: WebauthnSettingDeleteReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<GenericRsp, any>>;
    /**
     * Gets a setting by id for Passkeys (Biometrics)
     * @param {string} settingID ID from create
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnSettingGet(settingID: string, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<WebauthnSettingGetRsp, any>>;
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
    webAuthnSettingList(remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<WebauthnSettingListRsp, any>>;
    /**
     * Updates a setting by id for Passkeys (Biometrics)
     * @param {string} settingID ID from create
     * @param {WebauthnSettingUpdateReq} [webauthnSettingUpdateReq]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PasskeysBiometricsApi
     */
    webAuthnSettingPut(settingID: string, webauthnSettingUpdateReq?: WebauthnSettingUpdateReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<WebauthnSettingUpdateRsp, any>>;
}
/**
 * ProjectConfigApi - axios parameter creator
 * @export
 */
export declare const ProjectConfigApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     * Activates the project
     * @param {EmptyReq} emptyReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectActivate: (emptyReq: EmptyReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Retrieves project config by projectID inferred from authentication
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectConfigGet: (options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Saves project config
     * @param {ProjectConfigSaveReq} projectConfigSaveReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectConfigSave: (projectConfigSaveReq: ProjectConfigSaveReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Tests webhook backend
     * @param {ProjectConfigWebhookTestReq} projectConfigWebhookTestReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectConfigWebhookTest: (projectConfigWebhookTestReq: ProjectConfigWebhookTestReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
/**
 * ProjectConfigApi - functional programming interface
 * @export
 */
export declare const ProjectConfigApiFp: (configuration?: Configuration) => {
    /**
     * Activates the project
     * @param {EmptyReq} emptyReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectActivate(emptyReq: EmptyReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GenericRsp>>;
    /**
     * Retrieves project config by projectID inferred from authentication
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectConfigGet(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ProjectConfigGetRsp>>;
    /**
     * Saves project config
     * @param {ProjectConfigSaveReq} projectConfigSaveReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectConfigSave(projectConfigSaveReq: ProjectConfigSaveReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GenericRsp>>;
    /**
     * Tests webhook backend
     * @param {ProjectConfigWebhookTestReq} projectConfigWebhookTestReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectConfigWebhookTest(projectConfigWebhookTestReq: ProjectConfigWebhookTestReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ProjectConfigWebhookTestRsp>>;
};
/**
 * ProjectConfigApi - factory interface
 * @export
 */
export declare const ProjectConfigApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    /**
     * Activates the project
     * @param {EmptyReq} emptyReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectActivate(emptyReq: EmptyReq, options?: any): AxiosPromise<GenericRsp>;
    /**
     * Retrieves project config by projectID inferred from authentication
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectConfigGet(options?: any): AxiosPromise<ProjectConfigGetRsp>;
    /**
     * Saves project config
     * @param {ProjectConfigSaveReq} projectConfigSaveReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectConfigSave(projectConfigSaveReq: ProjectConfigSaveReq, options?: any): AxiosPromise<GenericRsp>;
    /**
     * Tests webhook backend
     * @param {ProjectConfigWebhookTestReq} projectConfigWebhookTestReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectConfigWebhookTest(projectConfigWebhookTestReq: ProjectConfigWebhookTestReq, options?: any): AxiosPromise<ProjectConfigWebhookTestRsp>;
};
/**
 * ProjectConfigApi - object-oriented interface
 * @export
 * @class ProjectConfigApi
 * @extends {BaseAPI}
 */
export declare class ProjectConfigApi extends BaseAPI {
    /**
     * Activates the project
     * @param {EmptyReq} emptyReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProjectConfigApi
     */
    projectActivate(emptyReq: EmptyReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<GenericRsp, any>>;
    /**
     * Retrieves project config by projectID inferred from authentication
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProjectConfigApi
     */
    projectConfigGet(options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<ProjectConfigGetRsp, any>>;
    /**
     * Saves project config
     * @param {ProjectConfigSaveReq} projectConfigSaveReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProjectConfigApi
     */
    projectConfigSave(projectConfigSaveReq: ProjectConfigSaveReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<GenericRsp, any>>;
    /**
     * Tests webhook backend
     * @param {ProjectConfigWebhookTestReq} projectConfigWebhookTestReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProjectConfigApi
     */
    projectConfigWebhookTest(projectConfigWebhookTestReq: ProjectConfigWebhookTestReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<ProjectConfigWebhookTestRsp, any>>;
}
/**
 * RequestLogsApi - axios parameter creator
 * @export
 */
export declare const RequestLogsApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     * Retrieves request log entry by ID. If multiple requests with the same ID are found, the most recent one is returned
     * @param {string} requestID ID of request
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    requestLogGet: (requestID: string, remoteAddress?: string, userAgent?: string, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
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
    requestLogsList: (remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
/**
 * RequestLogsApi - functional programming interface
 * @export
 */
export declare const RequestLogsApiFp: (configuration?: Configuration) => {
    /**
     * Retrieves request log entry by ID. If multiple requests with the same ID are found, the most recent one is returned
     * @param {string} requestID ID of request
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    requestLogGet(requestID: string, remoteAddress?: string, userAgent?: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RequestLogGetRsp>>;
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
    requestLogsList(remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RequestLogsListRsp>>;
};
/**
 * RequestLogsApi - factory interface
 * @export
 */
export declare const RequestLogsApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    /**
     * Retrieves request log entry by ID. If multiple requests with the same ID are found, the most recent one is returned
     * @param {string} requestID ID of request
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    requestLogGet(requestID: string, remoteAddress?: string, userAgent?: string, options?: any): AxiosPromise<RequestLogGetRsp>;
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
    requestLogsList(remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: any): AxiosPromise<RequestLogsListRsp>;
};
/**
 * RequestLogsApi - object-oriented interface
 * @export
 * @class RequestLogsApi
 * @extends {BaseAPI}
 */
export declare class RequestLogsApi extends BaseAPI {
    /**
     * Retrieves request log entry by ID. If multiple requests with the same ID are found, the most recent one is returned
     * @param {string} requestID ID of request
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RequestLogsApi
     */
    requestLogGet(requestID: string, remoteAddress?: string, userAgent?: string, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<RequestLogGetRsp, any>>;
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
    requestLogsList(remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<RequestLogsListRsp, any>>;
}
/**
 * SMSOTPApi - axios parameter creator
 * @export
 */
export declare const SMSOTPApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     * Creates SMS OTP and sends it to given phone number
     * @param {SmsCodeSendReq} smsCodeSendReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    smsCodeSend: (smsCodeSendReq: SmsCodeSendReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Validates SMS OTP
     * @param {string} smsCodeID ID of SMS OTP
     * @param {SmsCodeValidateReq} smsCodeValidateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    smsCodeValidate: (smsCodeID: string, smsCodeValidateReq: SmsCodeValidateReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
/**
 * SMSOTPApi - functional programming interface
 * @export
 */
export declare const SMSOTPApiFp: (configuration?: Configuration) => {
    /**
     * Creates SMS OTP and sends it to given phone number
     * @param {SmsCodeSendReq} smsCodeSendReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    smsCodeSend(smsCodeSendReq: SmsCodeSendReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SmsCodeSendRsp>>;
    /**
     * Validates SMS OTP
     * @param {string} smsCodeID ID of SMS OTP
     * @param {SmsCodeValidateReq} smsCodeValidateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    smsCodeValidate(smsCodeID: string, smsCodeValidateReq: SmsCodeValidateReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SmsCodeValidateRsp>>;
};
/**
 * SMSOTPApi - factory interface
 * @export
 */
export declare const SMSOTPApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    /**
     * Creates SMS OTP and sends it to given phone number
     * @param {SmsCodeSendReq} smsCodeSendReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    smsCodeSend(smsCodeSendReq: SmsCodeSendReq, options?: any): AxiosPromise<SmsCodeSendRsp>;
    /**
     * Validates SMS OTP
     * @param {string} smsCodeID ID of SMS OTP
     * @param {SmsCodeValidateReq} smsCodeValidateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    smsCodeValidate(smsCodeID: string, smsCodeValidateReq: SmsCodeValidateReq, options?: any): AxiosPromise<SmsCodeValidateRsp>;
};
/**
 * SMSOTPApi - object-oriented interface
 * @export
 * @class SMSOTPApi
 * @extends {BaseAPI}
 */
export declare class SMSOTPApi extends BaseAPI {
    /**
     * Creates SMS OTP and sends it to given phone number
     * @param {SmsCodeSendReq} smsCodeSendReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SMSOTPApi
     */
    smsCodeSend(smsCodeSendReq: SmsCodeSendReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<SmsCodeSendRsp, any>>;
    /**
     * Validates SMS OTP
     * @param {string} smsCodeID ID of SMS OTP
     * @param {SmsCodeValidateReq} smsCodeValidateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SMSOTPApi
     */
    smsCodeValidate(smsCodeID: string, smsCodeValidateReq: SmsCodeValidateReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<SmsCodeValidateRsp, any>>;
}
/**
 * SMSTemplatesApi - axios parameter creator
 * @export
 */
export declare const SMSTemplatesApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     * Creates a new SMS template
     * @param {SmsTemplateCreateReq} smsTemplateCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    smsTemplateCreate: (smsTemplateCreateReq: SmsTemplateCreateReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Deletes an SMS template
     * @param {string} smsTemplateID ID of SMS template
     * @param {SmsTemplateDeleteReq} smsTemplateDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    smsTemplateDelete: (smsTemplateID: string, smsTemplateDeleteReq: SmsTemplateDeleteReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
/**
 * SMSTemplatesApi - functional programming interface
 * @export
 */
export declare const SMSTemplatesApiFp: (configuration?: Configuration) => {
    /**
     * Creates a new SMS template
     * @param {SmsTemplateCreateReq} smsTemplateCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    smsTemplateCreate(smsTemplateCreateReq: SmsTemplateCreateReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SmsTemplateCreateRsp>>;
    /**
     * Deletes an SMS template
     * @param {string} smsTemplateID ID of SMS template
     * @param {SmsTemplateDeleteReq} smsTemplateDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    smsTemplateDelete(smsTemplateID: string, smsTemplateDeleteReq: SmsTemplateDeleteReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GenericRsp>>;
};
/**
 * SMSTemplatesApi - factory interface
 * @export
 */
export declare const SMSTemplatesApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    /**
     * Creates a new SMS template
     * @param {SmsTemplateCreateReq} smsTemplateCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    smsTemplateCreate(smsTemplateCreateReq: SmsTemplateCreateReq, options?: any): AxiosPromise<SmsTemplateCreateRsp>;
    /**
     * Deletes an SMS template
     * @param {string} smsTemplateID ID of SMS template
     * @param {SmsTemplateDeleteReq} smsTemplateDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    smsTemplateDelete(smsTemplateID: string, smsTemplateDeleteReq: SmsTemplateDeleteReq, options?: any): AxiosPromise<GenericRsp>;
};
/**
 * SMSTemplatesApi - object-oriented interface
 * @export
 * @class SMSTemplatesApi
 * @extends {BaseAPI}
 */
export declare class SMSTemplatesApi extends BaseAPI {
    /**
     * Creates a new SMS template
     * @param {SmsTemplateCreateReq} smsTemplateCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SMSTemplatesApi
     */
    smsTemplateCreate(smsTemplateCreateReq: SmsTemplateCreateReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<SmsTemplateCreateRsp, any>>;
    /**
     * Deletes an SMS template
     * @param {string} smsTemplateID ID of SMS template
     * @param {SmsTemplateDeleteReq} smsTemplateDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SMSTemplatesApi
     */
    smsTemplateDelete(smsTemplateID: string, smsTemplateDeleteReq: SmsTemplateDeleteReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<GenericRsp, any>>;
}
/**
 * SessionConfigApi - axios parameter creator
 * @export
 */
export declare const SessionConfigApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     * Retrieves session config by projectID inferred from authentication
     * @param {AppType} [appType] Application type
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    sessionConfigGet: (appType?: AppType, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Updates session config
     * @param {SessionConfigUpdateReq} sessionConfigUpdateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    sessionConfigUpdate: (sessionConfigUpdateReq: SessionConfigUpdateReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
/**
 * SessionConfigApi - functional programming interface
 * @export
 */
export declare const SessionConfigApiFp: (configuration?: Configuration) => {
    /**
     * Retrieves session config by projectID inferred from authentication
     * @param {AppType} [appType] Application type
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    sessionConfigGet(appType?: AppType, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SessionConfigGetRsp>>;
    /**
     * Updates session config
     * @param {SessionConfigUpdateReq} sessionConfigUpdateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    sessionConfigUpdate(sessionConfigUpdateReq: SessionConfigUpdateReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GenericRsp>>;
};
/**
 * SessionConfigApi - factory interface
 * @export
 */
export declare const SessionConfigApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    /**
     * Retrieves session config by projectID inferred from authentication
     * @param {AppType} [appType] Application type
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    sessionConfigGet(appType?: AppType, options?: any): AxiosPromise<SessionConfigGetRsp>;
    /**
     * Updates session config
     * @param {SessionConfigUpdateReq} sessionConfigUpdateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    sessionConfigUpdate(sessionConfigUpdateReq: SessionConfigUpdateReq, options?: any): AxiosPromise<GenericRsp>;
};
/**
 * SessionConfigApi - object-oriented interface
 * @export
 * @class SessionConfigApi
 * @extends {BaseAPI}
 */
export declare class SessionConfigApi extends BaseAPI {
    /**
     * Retrieves session config by projectID inferred from authentication
     * @param {AppType} [appType] Application type
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SessionConfigApi
     */
    sessionConfigGet(appType?: AppType, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<SessionConfigGetRsp, any>>;
    /**
     * Updates session config
     * @param {SessionConfigUpdateReq} sessionConfigUpdateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SessionConfigApi
     */
    sessionConfigUpdate(sessionConfigUpdateReq: SessionConfigUpdateReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<GenericRsp, any>>;
}
/**
 * UserApi - axios parameter creator
 * @export
 */
export declare const UserApiAxiosParamCreator: (configuration?: Configuration) => {
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
    userAuthLogList: (remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Creates a new user
     * @param {UserCreateReq} userCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userCreate: (userCreateReq: UserCreateReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Add a custom login identifier to an existing user
     * @param {string} userID ID of user
     * @param {UserCustomLoginIdentifierCreateReq} userCustomLoginIdentifierCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userCustomLoginIdentifierCreate: (userID: string, userCustomLoginIdentifierCreateReq: UserCustomLoginIdentifierCreateReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Delete a user\'s custom login identifier
     * @param {string} userID ID of user
     * @param {string} customLoginIdentifierID ID of custom login identifier
     * @param {UserCustomLoginIdentifierDeleteReq} userCustomLoginIdentifierDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userCustomLoginIdentifierDelete: (userID: string, customLoginIdentifierID: string, userCustomLoginIdentifierDeleteReq: UserCustomLoginIdentifierDeleteReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Get a user\'s custom login identifier
     * @param {string} userID ID of user
     * @param {string} customLoginIdentifierID ID of custom login identifier
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userCustomLoginIdentifierGet: (userID: string, customLoginIdentifierID: string, remoteAddress?: string, userAgent?: string, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Deletes a user
     * @param {string} userID ID of user
     * @param {UserDeleteReq} userDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userDelete: (userID: string, userDeleteReq: UserDeleteReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
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
    userDeviceList: (userID: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Add an email to an existing user
     * @param {string} userID ID of user
     * @param {UserEmailCreateReq} userEmailCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userEmailCreate: (userID: string, userEmailCreateReq: UserEmailCreateReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Delete a user\'s email
     * @param {string} userID ID of user
     * @param {string} emailID ID of email
     * @param {UserEmailDeleteReq} userEmailDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userEmailDelete: (userID: string, emailID: string, userEmailDeleteReq: UserEmailDeleteReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Get a user\'s email
     * @param {string} userID ID of user
     * @param {string} emailID ID of email
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userEmailGet: (userID: string, emailID: string, remoteAddress?: string, userAgent?: string, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Get a user by ID
     * @param {string} userID ID of user
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGet: (userID: string, remoteAddress?: string, userAgent?: string, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
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
    userList: (remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Add a phone number to an existing user
     * @param {string} userID ID of user
     * @param {UserPhoneNumberCreateReq} userPhoneNumberCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userPhoneNumberCreate: (userID: string, userPhoneNumberCreateReq: UserPhoneNumberCreateReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Delete a user\'s phone number
     * @param {string} userID ID of user
     * @param {string} phoneNumberID ID of phone number
     * @param {UserPhoneNumberDeleteReq} userPhoneNumberDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userPhoneNumberDelete: (userID: string, phoneNumberID: string, userPhoneNumberDeleteReq: UserPhoneNumberDeleteReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Get a user\'s phone number
     * @param {string} userID ID of user
     * @param {string} phoneNumberID ID of phone number
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userPhoneNumberGet: (userID: string, phoneNumberID: string, remoteAddress?: string, userAgent?: string, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
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
    userStatsList: (granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Updates a user
     * @param {string} userID ID of user
     * @param {UserUpdateReq} userUpdateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userUpdate: (userID: string, userUpdateReq: UserUpdateReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
/**
 * UserApi - functional programming interface
 * @export
 */
export declare const UserApiFp: (configuration?: Configuration) => {
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
    userAuthLogList(remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserAuthLogListRsp>>;
    /**
     * Creates a new user
     * @param {UserCreateReq} userCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userCreate(userCreateReq: UserCreateReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserCreateRsp>>;
    /**
     * Add a custom login identifier to an existing user
     * @param {string} userID ID of user
     * @param {UserCustomLoginIdentifierCreateReq} userCustomLoginIdentifierCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userCustomLoginIdentifierCreate(userID: string, userCustomLoginIdentifierCreateReq: UserCustomLoginIdentifierCreateReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserCustomLoginIdentifierCreateRsp>>;
    /**
     * Delete a user\'s custom login identifier
     * @param {string} userID ID of user
     * @param {string} customLoginIdentifierID ID of custom login identifier
     * @param {UserCustomLoginIdentifierDeleteReq} userCustomLoginIdentifierDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userCustomLoginIdentifierDelete(userID: string, customLoginIdentifierID: string, userCustomLoginIdentifierDeleteReq: UserCustomLoginIdentifierDeleteReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GenericRsp>>;
    /**
     * Get a user\'s custom login identifier
     * @param {string} userID ID of user
     * @param {string} customLoginIdentifierID ID of custom login identifier
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userCustomLoginIdentifierGet(userID: string, customLoginIdentifierID: string, remoteAddress?: string, userAgent?: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserCustomLoginIdentifierGetRsp>>;
    /**
     * Deletes a user
     * @param {string} userID ID of user
     * @param {UserDeleteReq} userDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userDelete(userID: string, userDeleteReq: UserDeleteReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GenericRsp>>;
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
    userDeviceList(userID: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserDeviceListRsp>>;
    /**
     * Add an email to an existing user
     * @param {string} userID ID of user
     * @param {UserEmailCreateReq} userEmailCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userEmailCreate(userID: string, userEmailCreateReq: UserEmailCreateReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserEmailCreateRsp>>;
    /**
     * Delete a user\'s email
     * @param {string} userID ID of user
     * @param {string} emailID ID of email
     * @param {UserEmailDeleteReq} userEmailDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userEmailDelete(userID: string, emailID: string, userEmailDeleteReq: UserEmailDeleteReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GenericRsp>>;
    /**
     * Get a user\'s email
     * @param {string} userID ID of user
     * @param {string} emailID ID of email
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userEmailGet(userID: string, emailID: string, remoteAddress?: string, userAgent?: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserEmailGetRsp>>;
    /**
     * Get a user by ID
     * @param {string} userID ID of user
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGet(userID: string, remoteAddress?: string, userAgent?: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserGetRsp>>;
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
    userList(remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserListRsp>>;
    /**
     * Add a phone number to an existing user
     * @param {string} userID ID of user
     * @param {UserPhoneNumberCreateReq} userPhoneNumberCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userPhoneNumberCreate(userID: string, userPhoneNumberCreateReq: UserPhoneNumberCreateReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserPhoneNumberCreateRsp>>;
    /**
     * Delete a user\'s phone number
     * @param {string} userID ID of user
     * @param {string} phoneNumberID ID of phone number
     * @param {UserPhoneNumberDeleteReq} userPhoneNumberDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userPhoneNumberDelete(userID: string, phoneNumberID: string, userPhoneNumberDeleteReq: UserPhoneNumberDeleteReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GenericRsp>>;
    /**
     * Get a user\'s phone number
     * @param {string} userID ID of user
     * @param {string} phoneNumberID ID of phone number
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userPhoneNumberGet(userID: string, phoneNumberID: string, remoteAddress?: string, userAgent?: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserPhoneNumberGetRsp>>;
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
    userStatsList(granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserStatsListRsp>>;
    /**
     * Updates a user
     * @param {string} userID ID of user
     * @param {UserUpdateReq} userUpdateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userUpdate(userID: string, userUpdateReq: UserUpdateReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserUpdateRsp>>;
};
/**
 * UserApi - factory interface
 * @export
 */
export declare const UserApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
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
    userAuthLogList(remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: any): AxiosPromise<UserAuthLogListRsp>;
    /**
     * Creates a new user
     * @param {UserCreateReq} userCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userCreate(userCreateReq: UserCreateReq, options?: any): AxiosPromise<UserCreateRsp>;
    /**
     * Add a custom login identifier to an existing user
     * @param {string} userID ID of user
     * @param {UserCustomLoginIdentifierCreateReq} userCustomLoginIdentifierCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userCustomLoginIdentifierCreate(userID: string, userCustomLoginIdentifierCreateReq: UserCustomLoginIdentifierCreateReq, options?: any): AxiosPromise<UserCustomLoginIdentifierCreateRsp>;
    /**
     * Delete a user\'s custom login identifier
     * @param {string} userID ID of user
     * @param {string} customLoginIdentifierID ID of custom login identifier
     * @param {UserCustomLoginIdentifierDeleteReq} userCustomLoginIdentifierDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userCustomLoginIdentifierDelete(userID: string, customLoginIdentifierID: string, userCustomLoginIdentifierDeleteReq: UserCustomLoginIdentifierDeleteReq, options?: any): AxiosPromise<GenericRsp>;
    /**
     * Get a user\'s custom login identifier
     * @param {string} userID ID of user
     * @param {string} customLoginIdentifierID ID of custom login identifier
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userCustomLoginIdentifierGet(userID: string, customLoginIdentifierID: string, remoteAddress?: string, userAgent?: string, options?: any): AxiosPromise<UserCustomLoginIdentifierGetRsp>;
    /**
     * Deletes a user
     * @param {string} userID ID of user
     * @param {UserDeleteReq} userDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userDelete(userID: string, userDeleteReq: UserDeleteReq, options?: any): AxiosPromise<GenericRsp>;
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
    userDeviceList(userID: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: any): AxiosPromise<UserDeviceListRsp>;
    /**
     * Add an email to an existing user
     * @param {string} userID ID of user
     * @param {UserEmailCreateReq} userEmailCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userEmailCreate(userID: string, userEmailCreateReq: UserEmailCreateReq, options?: any): AxiosPromise<UserEmailCreateRsp>;
    /**
     * Delete a user\'s email
     * @param {string} userID ID of user
     * @param {string} emailID ID of email
     * @param {UserEmailDeleteReq} userEmailDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userEmailDelete(userID: string, emailID: string, userEmailDeleteReq: UserEmailDeleteReq, options?: any): AxiosPromise<GenericRsp>;
    /**
     * Get a user\'s email
     * @param {string} userID ID of user
     * @param {string} emailID ID of email
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userEmailGet(userID: string, emailID: string, remoteAddress?: string, userAgent?: string, options?: any): AxiosPromise<UserEmailGetRsp>;
    /**
     * Get a user by ID
     * @param {string} userID ID of user
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGet(userID: string, remoteAddress?: string, userAgent?: string, options?: any): AxiosPromise<UserGetRsp>;
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
    userList(remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: any): AxiosPromise<UserListRsp>;
    /**
     * Add a phone number to an existing user
     * @param {string} userID ID of user
     * @param {UserPhoneNumberCreateReq} userPhoneNumberCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userPhoneNumberCreate(userID: string, userPhoneNumberCreateReq: UserPhoneNumberCreateReq, options?: any): AxiosPromise<UserPhoneNumberCreateRsp>;
    /**
     * Delete a user\'s phone number
     * @param {string} userID ID of user
     * @param {string} phoneNumberID ID of phone number
     * @param {UserPhoneNumberDeleteReq} userPhoneNumberDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userPhoneNumberDelete(userID: string, phoneNumberID: string, userPhoneNumberDeleteReq: UserPhoneNumberDeleteReq, options?: any): AxiosPromise<GenericRsp>;
    /**
     * Get a user\'s phone number
     * @param {string} userID ID of user
     * @param {string} phoneNumberID ID of phone number
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userPhoneNumberGet(userID: string, phoneNumberID: string, remoteAddress?: string, userAgent?: string, options?: any): AxiosPromise<UserPhoneNumberGetRsp>;
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
    userStatsList(granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: any): AxiosPromise<UserStatsListRsp>;
    /**
     * Updates a user
     * @param {string} userID ID of user
     * @param {UserUpdateReq} userUpdateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userUpdate(userID: string, userUpdateReq: UserUpdateReq, options?: any): AxiosPromise<UserUpdateRsp>;
};
/**
 * UserApi - object-oriented interface
 * @export
 * @class UserApi
 * @extends {BaseAPI}
 */
export declare class UserApi extends BaseAPI {
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
    userAuthLogList(remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<UserAuthLogListRsp, any>>;
    /**
     * Creates a new user
     * @param {UserCreateReq} userCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userCreate(userCreateReq: UserCreateReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<UserCreateRsp, any>>;
    /**
     * Add a custom login identifier to an existing user
     * @param {string} userID ID of user
     * @param {UserCustomLoginIdentifierCreateReq} userCustomLoginIdentifierCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userCustomLoginIdentifierCreate(userID: string, userCustomLoginIdentifierCreateReq: UserCustomLoginIdentifierCreateReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<UserCustomLoginIdentifierCreateRsp, any>>;
    /**
     * Delete a user\'s custom login identifier
     * @param {string} userID ID of user
     * @param {string} customLoginIdentifierID ID of custom login identifier
     * @param {UserCustomLoginIdentifierDeleteReq} userCustomLoginIdentifierDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userCustomLoginIdentifierDelete(userID: string, customLoginIdentifierID: string, userCustomLoginIdentifierDeleteReq: UserCustomLoginIdentifierDeleteReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<GenericRsp, any>>;
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
    userCustomLoginIdentifierGet(userID: string, customLoginIdentifierID: string, remoteAddress?: string, userAgent?: string, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<UserCustomLoginIdentifierGetRsp, any>>;
    /**
     * Deletes a user
     * @param {string} userID ID of user
     * @param {UserDeleteReq} userDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userDelete(userID: string, userDeleteReq: UserDeleteReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<GenericRsp, any>>;
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
    userDeviceList(userID: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<UserDeviceListRsp, any>>;
    /**
     * Add an email to an existing user
     * @param {string} userID ID of user
     * @param {UserEmailCreateReq} userEmailCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userEmailCreate(userID: string, userEmailCreateReq: UserEmailCreateReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<UserEmailCreateRsp, any>>;
    /**
     * Delete a user\'s email
     * @param {string} userID ID of user
     * @param {string} emailID ID of email
     * @param {UserEmailDeleteReq} userEmailDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userEmailDelete(userID: string, emailID: string, userEmailDeleteReq: UserEmailDeleteReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<GenericRsp, any>>;
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
    userEmailGet(userID: string, emailID: string, remoteAddress?: string, userAgent?: string, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<UserEmailGetRsp, any>>;
    /**
     * Get a user by ID
     * @param {string} userID ID of user
     * @param {string} [remoteAddress] Client\&#39;s remote address
     * @param {string} [userAgent] Client\&#39;s user agent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userGet(userID: string, remoteAddress?: string, userAgent?: string, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<UserGetRsp, any>>;
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
    userList(remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<UserListRsp, any>>;
    /**
     * Add a phone number to an existing user
     * @param {string} userID ID of user
     * @param {UserPhoneNumberCreateReq} userPhoneNumberCreateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userPhoneNumberCreate(userID: string, userPhoneNumberCreateReq: UserPhoneNumberCreateReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<UserPhoneNumberCreateRsp, any>>;
    /**
     * Delete a user\'s phone number
     * @param {string} userID ID of user
     * @param {string} phoneNumberID ID of phone number
     * @param {UserPhoneNumberDeleteReq} userPhoneNumberDeleteReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userPhoneNumberDelete(userID: string, phoneNumberID: string, userPhoneNumberDeleteReq: UserPhoneNumberDeleteReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<GenericRsp, any>>;
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
    userPhoneNumberGet(userID: string, phoneNumberID: string, remoteAddress?: string, userAgent?: string, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<UserPhoneNumberGetRsp, any>>;
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
    userStatsList(granularity: string, remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<UserStatsListRsp, any>>;
    /**
     * Updates a user
     * @param {string} userID ID of user
     * @param {UserUpdateReq} userUpdateReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    userUpdate(userID: string, userUpdateReq: UserUpdateReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<UserUpdateRsp, any>>;
}
/**
 * ValidationApi - axios parameter creator
 * @export
 */
export declare const ValidationApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     * Validates email
     * @param {ValidateEmailReq} validateEmailReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    validateEmail: (validateEmailReq: ValidateEmailReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    /**
     * Validates phone number
     * @param {ValidatePhoneNumberReq} validatePhoneNumberReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    validatePhoneNumber: (validatePhoneNumberReq: ValidatePhoneNumberReq, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
/**
 * ValidationApi - functional programming interface
 * @export
 */
export declare const ValidationApiFp: (configuration?: Configuration) => {
    /**
     * Validates email
     * @param {ValidateEmailReq} validateEmailReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    validateEmail(validateEmailReq: ValidateEmailReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ValidateEmailRsp>>;
    /**
     * Validates phone number
     * @param {ValidatePhoneNumberReq} validatePhoneNumberReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    validatePhoneNumber(validatePhoneNumberReq: ValidatePhoneNumberReq, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ValidatePhoneNumberRsp>>;
};
/**
 * ValidationApi - factory interface
 * @export
 */
export declare const ValidationApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    /**
     * Validates email
     * @param {ValidateEmailReq} validateEmailReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    validateEmail(validateEmailReq: ValidateEmailReq, options?: any): AxiosPromise<ValidateEmailRsp>;
    /**
     * Validates phone number
     * @param {ValidatePhoneNumberReq} validatePhoneNumberReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    validatePhoneNumber(validatePhoneNumberReq: ValidatePhoneNumberReq, options?: any): AxiosPromise<ValidatePhoneNumberRsp>;
};
/**
 * ValidationApi - object-oriented interface
 * @export
 * @class ValidationApi
 * @extends {BaseAPI}
 */
export declare class ValidationApi extends BaseAPI {
    /**
     * Validates email
     * @param {ValidateEmailReq} validateEmailReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ValidationApi
     */
    validateEmail(validateEmailReq: ValidateEmailReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<ValidateEmailRsp, any>>;
    /**
     * Validates phone number
     * @param {ValidatePhoneNumberReq} validatePhoneNumberReq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ValidationApi
     */
    validatePhoneNumber(validatePhoneNumberReq: ValidatePhoneNumberReq, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<ValidatePhoneNumberRsp, any>>;
}
/**
 * WebhookLogsApi - axios parameter creator
 * @export
 */
export declare const WebhookLogsApiAxiosParamCreator: (configuration?: Configuration) => {
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
    webhookLogsList: (remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
/**
 * WebhookLogsApi - functional programming interface
 * @export
 */
export declare const WebhookLogsApiFp: (configuration?: Configuration) => {
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
    webhookLogsList(remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WebhookLogsListRsp>>;
};
/**
 * WebhookLogsApi - factory interface
 * @export
 */
export declare const WebhookLogsApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
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
    webhookLogsList(remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: any): AxiosPromise<WebhookLogsListRsp>;
};
/**
 * WebhookLogsApi - object-oriented interface
 * @export
 * @class WebhookLogsApi
 * @extends {BaseAPI}
 */
export declare class WebhookLogsApi extends BaseAPI {
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
    webhookLogsList(remoteAddress?: string, userAgent?: string, sort?: string, filter?: Array<string>, page?: number, pageSize?: number, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<WebhookLogsListRsp, any>>;
}
