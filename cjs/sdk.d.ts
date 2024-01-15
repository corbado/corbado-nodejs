import { AxiosInstance } from 'axios';
import Config from './config.js';
import { AuthToken, EmailOTP, Session, SmsOTP, Validation, EmailLink, User } from './services/index.js';
declare class SDK {
    private axiosClient;
    private authToken;
    private emailLink;
    private emailOTP;
    private session;
    private smsOTP;
    private user;
    private validation;
    constructor(config: Config);
    createClient(config: Config): AxiosInstance;
    authTokens(): AuthToken;
    emailLinks(): EmailLink;
    emailOtp(): EmailOTP;
    sessions(): Session;
    smsOtp(): SmsOTP;
    getusers(): User;
    validations(): Validation;
}
export default SDK;
