// Copyright (c) 2018-2020, The TurtleCoin Developers
//
// Please see the included LICENSE file for more information.
import { Base58 } from 'cash2-base58';
import { Reader, Writer } from 'bytestream-helper';
/** @ignore */
export var SIZES;
(function (SIZES) {
    SIZES[SIZES["KEY"] = 32] = "KEY";
    SIZES[SIZES["CHECKSUM"] = 4] = "CHECKSUM";
})(SIZES || (SIZES = {}));
/** @ignore */
const Config = require('../config.json');
/**
 * Represents a TurtleCoin address prefix
 */
export class AddressPrefix {
    /**
     * Creates a new address prefix object
     * @param [decimal] the decimal representation of the address prefix
     * @param [base58] the Base58 representation of the address prefix
     */
    constructor(decimal, base58) {
        this.m_decimal = Config.addressPrefix || 3914525;
        if (decimal) {
            this.m_decimal = decimal;
        }
        if (base58) {
            this.m_base58 = base58;
        }
    }
    /**
     * The Base58 encoded address prefix
     */
    get base58() {
        if (this.m_base58) {
            return this.m_base58;
        }
        return Base58.encode(this.hex);
    }
    /**
     * The decimal encoded address prefix
     */
    get decimal() {
        return this.m_decimal || 0;
    }
    /**
     * The hexadecimal encoded address prefix
     */
    get hex() {
        return this.varint.toString('hex');
    }
    /**
     * The varint encoded address prefix
     */
    get varint() {
        const writer = new Writer();
        writer.varint(this.decimal);
        return writer.buffer;
    }
    /**
     * The size of the address prefix in bytes
     */
    get size() {
        return this.varint.length;
    }
    /**
     * Creates a new address prefix object from a Base58 encoded address
     * @param address the public wallet address to decode to obtain the address prefix
     * @returns the address prefix
     */
    static from(address) {
        let decodedAddress = Base58.decode(address);
        /* Chop off the checksum */
        decodedAddress = decodedAddress.slice(0, -(SIZES.CHECKSUM * 2));
        const prefixLength = decodedAddress.length % (SIZES.KEY * 2);
        const prefixDecoded = decodedAddress.slice(0, prefixLength);
        const reader = new Reader(prefixDecoded);
        const prefixDecimal = reader.varint().toJSNumber();
        /* This starts a bit of hackery to deal with the block encoding
         * used by Base58 and the fact that the prefix may not be exactly
         * one data block long */
        let offset = (prefixDecimal.toString().length % 2 === 0) ? 1 : 0;
        if (prefixDecimal.toString().length > 10) {
            offset += Math.floor((prefixDecimal.toString().length % 10) / 2);
        }
        const prefixEncoded = address.slice(0, Math.ceil(prefixDecimal.toString().length / 2) + offset);
        return new AddressPrefix(prefixDecimal, prefixEncoded);
    }
}
