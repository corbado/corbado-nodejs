import { AxiosInstance } from 'axios';
import Configuration from './config.js';
import { AuthToken, EmailOTP, Session, SmsOTP, Validation, EmailLink, User } from './services/index.js';
declare class SDK {
    private authToken;
    private emailLink;
    private emailOTP;
    private session;
    private smsOTP;
    private user;
    private validation;
    constructor(config: Configuration);
    createClient(config: Configuration): AxiosInstance;
    authTokens(): AuthToken;
    emailLinks(): EmailLink;
    emailOtp(): EmailOTP;
    sessions(): Session;
    smsOtp(): SmsOTP;
    getusers(): User;
    validations(): Validation;
}
export default SDK;
