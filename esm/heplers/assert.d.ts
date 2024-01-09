import { ErrorRsp } from '../generated/index.js';
export declare function validate(condition: boolean, code: number, description: string, isOperational?: boolean): void;
declare class Assert {
    static notNull(data: unknown): void;
    static notEmptyString(data: string): void;
    static stringInSet(data: string, possibleValues: string[]): void;
    static keysInObject(keys: string[], data: Record<string, unknown>): void;
}
export declare function isErrorRsp(obj: unknown): obj is ErrorRsp;
export default Assert;
