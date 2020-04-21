// Copyright (c) 2018-2020, The TurtleCoin Developers
//
// Please see the included LICENSE file for more information.
import { BigInteger } from '../Types';
import { Writer } from 'bytestream-helper';
export var TransactionOutputs;
(function (TransactionOutputs) {
    /**
     * Transaction Output Type
     */
    let OutputType;
    (function (OutputType) {
        OutputType[OutputType["KEY"] = 2] = "KEY";
    })(OutputType = TransactionOutputs.OutputType || (TransactionOutputs.OutputType = {}));
    /**
     * Abstract interface for structured transaction outputs
     */
    class ITransactionOutput {
    }
    TransactionOutputs.ITransactionOutput = ITransactionOutput;
    /**
     * Represents an output to a set of keys (wallet)
     */
    class KeyOutput {
        /**
         * Creates a new key output using the specified values
         * @param amount the output amount
         * @param key the one-time output key of the output
         */
        constructor(amount, key) {
            this.m_type = OutputType.KEY;
            this.m_amount = BigInteger.zero;
            this.m_key = '';
            if (typeof amount === 'number') {
                amount = BigInteger(amount);
            }
            this.m_amount = amount;
            this.m_key = key;
        }
        /**
         * The output type
         */
        get type() {
            return this.m_type;
        }
        /**
         * The output amount
         */
        get amount() {
            return this.m_amount;
        }
        /**
         * The one-time output key of the output
         */
        get key() {
            return this.m_key;
        }
        /**
         * Represents the output as a Buffer
         * @returns the Buffer representation of the object
         */
        toBuffer() {
            const writer = new Writer();
            writer.varint(this.amount);
            writer.uint8_t(this.type);
            writer.hash(this.key);
            return writer.buffer;
        }
        /**
         * Represents the output as a hexadecimal string (blob)
         * @returns the hexadecimal (blob) representation of the object
         */
        toString() {
            return this.toBuffer().toString('hex');
        }
    }
    TransactionOutputs.KeyOutput = KeyOutput;
})(TransactionOutputs || (TransactionOutputs = {}));
