import {Config} from "./config";
import axios, {AxiosInstance} from "axios";
import AuthToken from "./sdk/authToken/authToken";
import Validation from "./sdk/validation/validation";
import User from "./sdk/user/user";
import Session from "./sdk/session/session";
import {AxiosBasicCredentials, AxiosHeaderValue} from "axios";
import EmailLink from "./sdk/emailLink/emailLink";

export default class SDK {

    #authToken: AuthToken
    #emailLink: EmailLink
    #session: Session
    #user: User
    #validation: Validation

    constructor(config: Config) {

        this.#emailLink = new EmailLink(
            this.#createClient(config),
        )

        this.#authToken = new AuthToken(
            this.#createClient(config),
        )

        this.#session = new Session(
            process.env.npm_package_version as string,
            config.ProjectID,
            config.FrontendAPI,
            config.ShortSessionCookieName,
            config.JWTIssuer,
            config.CacheMaxAge,
        )
        this.#user = new User(
            this.#createClient(config)
        )

        this.#validation = new Validation(
            this.#createClient(config)
        )
    }

    #createClient(config: Config): AxiosInstance
    {
        const instance = axios.create()
        instance.defaults.auth = new class implements AxiosBasicCredentials {
            password: string = config.APISecret;
            username: string = config.ProjectID;
        }

        instance.defaults.baseURL = config.BackendAPI
        instance.defaults.headers['X-Corbado-SDK-Version'] = process.env.npm_package_version as AxiosHeaderValue

        return instance
    }

    get EmailLinks(): EmailLink {
        return this.#emailLink
    }

    get authTokens(): AuthToken {
        return this.#authToken;
    }

    get emailLinks(): EmailLink {
        return this.#emailLink;
    }

    get sessions(): Session {
        return this.#session;
    }

    get users(): User {
        return this.#user;
    }

    get validations(): Validation {
        return this.#validation;
    }
}
