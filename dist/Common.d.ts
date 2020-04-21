import { BigInteger } from './Types';
/** @ignore */
export declare class Common {
    static absoluteToRelativeOffsets(offsets: BigInteger.BigInteger[] | number[] | string[]): BigInteger.BigInteger[];
    static relativeToAbsoluteOffsets(offsets: BigInteger.BigInteger[] | number[] | string[]): BigInteger.BigInteger[];
    static bin2hex(bin: Uint8Array): string;
    static isHex(value: string): boolean;
    static isHex64(value: string): boolean;
    static isHex128(value: string): boolean;
    static str2bin(str: string): Uint8Array;
    static varintLength(value: BigInteger.BigInteger | number): number;
}
