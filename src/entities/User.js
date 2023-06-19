class User {

    #authenticated;
    #id;
    #name;
    #email;
    #phoneNumber;

    constructor(authenticated, id, name, email, phoneNumber) {
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
