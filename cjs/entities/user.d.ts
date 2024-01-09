declare class User {
    private authenticated;
    private id;
    private name;
    private email;
    private phoneNumber;
    constructor(authenticated: boolean, id?: string, name?: string, email?: string, phoneNumber?: string);
    private ensureAuthenticated;
    isAuthenticated(): boolean;
    getID(): string;
    getName(): string;
    getEmail(): string;
    getPhoneNumber(): string;
}
export default User;
