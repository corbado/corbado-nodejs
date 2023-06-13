class UserService {

    #authenticated;
    #id;
    #name;
    #email;
    #phoneNumber;

    constructor(authenticated, id = '', name = '', email = '', phoneNumber = '') {
        this.#authenticated = authenticated;
        this.#id = id;
        this.#name = name;
        this.#email = email;
        this.#phoneNumber = phoneNumber;
    }

    isAuthenticated = () => {
        return this.#authenticated;
    }

    getID = () => {
        if (this.isAuthenticated() === false) {
            throw new Error('UserService is not authenticated');
        }

        return this.#id;
    }

    getName = () => {
        if (this.isAuthenticated() === false) {
            throw new Error('UserService is not authenticated');
        }

        return this.#name;
    }

    getEmail = () => {
        if (this.isAuthenticated() === false) {
            throw new Error('UserService is not authenticated');
        }

        return this.#email;
    }

    getPhoneNumber = () => {
        if (this.isAuthenticated() === false) {
            throw new Error('UserService is not authenticated');
        }

        return this.#phoneNumber;
    }
}

export default UserService;
