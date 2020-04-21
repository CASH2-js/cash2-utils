// Copyright (c) 2018-2020, The TurtleCoin Developers
//
// Please see the included LICENSE file for more information.
import { Writer } from 'bytestream-helper';
import { BigInteger } from './Types';
/** @ignore */
export class Common {
    static absoluteToRelativeOffsets(offsets) {
        const offsetsCopy = [];
        for (const offset of offsets) {
            if (typeof offset === 'string') {
                offsetsCopy.push(BigInteger(offset));
            }
            else if (typeof offset === 'number') {
                offsetsCopy.push(BigInteger(offset));
            }
            else {
                offsetsCopy.push(offset);
            }
        }
        if (offsetsCopy.length === 1) {
            return offsetsCopy;
        }
        for (let i = offsetsCopy.length - 1; i >= 1; --i) {
            offsetsCopy[i] = offsetsCopy[i].subtract(offsetsCopy[i - 1]);
        }
        return offsetsCopy;
    }
    static relativeToAbsoluteOffsets(offsets) {
        const offsetsCopy = [];
        for (const offset of offsets) {
            if (typeof offset === 'string') {
                offsetsCopy.push(BigInteger(offset));
            }
            else if (typeof offset === 'number') {
                offsetsCopy.push(BigInteger(offset));
            }
            else {
                offsetsCopy.push(offset);
            }
        }
        if (offsetsCopy.length === 1) {
            return offsetsCopy;
        }
        for (let i = 1; i < offsetsCopy.length; i++) {
            offsetsCopy[i] = offsetsCopy[i - 1].add(offsetsCopy[i]);
        }
        return offsetsCopy;
    }
    static bin2hex(bin) {
        const result = [];
        for (const b of bin) {
            result.push(('0' + b.toString(16)).slice(-2));
        }
        return result.join('');
    }
    static isHex(value) {
        if (value.length % 2 !== 0) {
            return false;
        }
        const regex = new RegExp('^[0-9a-fA-F]{' + value.length + '}$');
        return regex.test(value);
    }
    static isHex64(value) {
        return (Common.isHex(value) && value.length === 64);
    }
    static isHex128(value) {
        return (Common.isHex(value) && value.length === 128);
    }
    static str2bin(str) {
        const result = new Uint8Array(str.length);
        for (let i = 0; i < str.length; i++) {
            result[i] = str.charCodeAt(i);
        }
        return result;
    }
    static varintLength(value) {
        if (typeof value === 'number') {
            value = BigInteger(value);
        }
        const writer = new Writer();
        writer.varint(value);
        return writer.length;
    }
}
