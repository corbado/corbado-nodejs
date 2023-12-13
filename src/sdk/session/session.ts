import * as jose from "jose";
import { RemoteJWKSetOptions} from "jose";
import {User} from "./User";

export default class Session {

    #projectID: string
    #frontendAPI: string
    #shortSessionCookieName: string
    #issuer: string
    #jwks: any

    constructor(version: string, projectID: string, frontendAPI: string, shortSessionCookieName: string, issuer: string, cacheMaxAge: number) {
        this.#projectID = projectID
        this.#frontendAPI = frontendAPI
        this.#shortSessionCookieName = shortSessionCookieName
        this.#issuer = issuer


        const jwkSetUrl = new URL(frontendAPI + "/.well-known/jwks")
        const joseOptions = new class implements RemoteJWKSetOptions {
            cacheMaxAge: number = cacheMaxAge;
            headers: Record<string, string> = {"X-Corbado-SDK-Version": version};
        }

        this.#jwks = jose.createRemoteJWKSet(
            jwkSetUrl,
            joseOptions,
        )

    }

    async ValidateShortSessionValue(shortSession: string): Promise<User>
    {
        if (shortSession === "" || shortSession === undefined) {
            return new User(false, "", "", "", "")
        }

        const options = {
            issuer: this.#issuer,
        }

        const {payload} = await jose.jwtVerify(shortSession, this.#jwks, options)

        let issuerValid = false;
        if (payload.iss === this.#issuer) {
            issuerValid = true;
        } else {
            throw new Error('Mismatch in issuer (configured through Frontend API: "' +
                this.#issuer + '", JWT: "' + payload.iss + ')')
        }

        if (issuerValid){
            return new User(
                true,
                payload.sub as string,
                payload.name as string,
                payload.email as string,
                payload.phoneNumber as string,
            )
        }

        return new User(false, "", "", "", "")
    }

}
