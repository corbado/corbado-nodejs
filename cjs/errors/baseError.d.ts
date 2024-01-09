declare class BaseError extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor(name: string, statusCode: number, description: string, isOperational?: boolean);
}
export default BaseError;
