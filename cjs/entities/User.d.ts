declare class User {
    #private;
    constructor(authenticated?: boolean, id?: string, fullName?: string | unknown, email?: string | unknown, phoneNumber?: string | unknown);
    get authenticated(): boolean | undefined;
    get id(): string | undefined;
    get name(): unknown;
    get email(): unknown;
    get phoneNumber(): unknown;
}
export default User;
