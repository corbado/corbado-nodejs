export class User {
    #authenticated: Boolean;
    #id: string;
    #name: string;
    #email: string;
    #phoneNumber: string;

    constructor(authenticated: boolean, id: string, name: string, email: string, phoneNumber: string) {
        this.#authenticated = authenticated
        this.#id = id
        this.#name = name
        this.#email = email
        this.#phoneNumber = phoneNumber
    }

    get authenticated() {
        return this.#authenticated;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get email() {
        return this.#email;
    }

    get phoneNumber() {
        return this.#phoneNumber;
    }
}
