// convert this file to typescript (.ts) and add types

class User {

    #authenticated;
    #id;
    #name;
    #email;
    #phoneNumber;

    constructor(authenticated?: boolean, id?: string, name?: string | unknown, email?: string | unknown, phoneNumber?: string | unknown) {
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

export default User
