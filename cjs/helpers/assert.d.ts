import { ErrorRsp } from '../generated/index.js';
export declare function validate(condition: boolean, errorName: string, code: number, description: string, isOperational?: boolean): void;
declare class Assert {
    static notNull(data: unknown, errorName: string): void;
    static notEmptyString(data: string, errorName: string): void;
    static stringInSet(data: string, possibleValues: string[], errorName: string): void;
    static keysInObject(keys: string[], data: Record<string, unknown>, errorName: string): void;
}
export declare function isErrorRsp(obj: unknown): obj is ErrorRsp;
export default Assert;
