declare class UsersService {
    #private;
    constructor(authenticated: null, id?: string, name?: string, email?: string, phoneNumber?: string);
    isAuthenticated: () => null;
    getID: () => string;
    getName: () => string;
    getEmail: () => string;
    getPhoneNumber: () => string;
}
export default UsersService;
