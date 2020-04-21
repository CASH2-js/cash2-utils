/// <reference types="node" />
import { BigInteger, ED25519, ExtraTag, TransactionInputs, TransactionOutputs } from './Types';
/** @ignore */
interface Cache {
    prefix: string;
    blob: string;
    prefixHash: string;
    hash: string;
}
/**
 * Represents a TurtleCoin Transaction
 */
export declare class Transaction {
    /**
     * Returns the total amount of the transaction inputs
     */
    get amount(): number;
    /**
     * Returns the transaction extra as a buffer
     */
    get extra(): Buffer;
    /**
     * Returns the structured arbitrary data found in the transaction extra
     */
    get extraData(): Buffer;
    /**
     * Returns the fee of the transaction
     */
    get fee(): number;
    /**
     * Returns the transaction hash
     */
    get hash(): string;
    /**
     * Returns the merged mining tag found within the transaction
     */
    get mergedMining(): ExtraTag.ExtraMergedMining | undefined;
    /**
     * Returns the payment ID found within the transaction
     */
    get paymentId(): string | undefined;
    /**
     * Returns the transaction prefix in hexadecimal (blob) form
     */
    get prefix(): string;
    /**
     * Returns the transaction prefix hash
     */
    get prefixHash(): string;
    /**
     * Returns the transaction public key
     */
    get publicKey(): string | undefined;
    /**
     * Returns the transaction size in bytes
     */
    get size(): number;
    /**
     * The unlock time (or block height) for when the funds in the transaction are made available.
     * Returns a BigInteger only if the value exceeds MAX_SAFE_INTEGER
     */
    get unlockTime(): BigInteger.BigInteger | number;
    set unlockTime(value: BigInteger.BigInteger | number);
    /**
     * Whether the transaction data is read only
     * This is only set if the transaction is created from a blob as it is unlikely that
     * we will be changing data after a transaction is created and signed as it would
     * invalidate the transaction signatures
     */
    get readonly(): boolean;
    /**
     * Constructs a new transaction from an existing transaction blob
     * @param data the transaction data blob
     * @returns the new transaction object
     */
    static from(data: Buffer | string): Transaction;
    version: number;
    inputs: TransactionInputs.ITransactionInput[];
    outputs: TransactionOutputs.ITransactionOutput[];
    signatures: string[][];
    ignoredField: number;
    transactionKeys: ED25519.KeyPair;
    protected m_unlockTime: BigInteger.BigInteger;
    protected m_rawExtra: Buffer;
    protected m_readonly: boolean;
    protected m_extra: ExtraTag.IExtraTag[];
    protected m_cached: Cache;
    /** @ignore */
    parseExtra(extra: Buffer): void;
    /**
     * Adds the arbitrary data supplied to the transaction extra field
     * @param data arbitrary data to be included
     */
    addData(data: Buffer): void;
    /**
     * Adds a merged minging tag with the supplied values to the transaction
     * @param depth the depth of the blockchain branch in the merkle root
     * @param merkleRoot the merkle root value
     */
    addMergedMining(depth: number, merkleRoot: string): void;
    /**
     * Adds the supplied payment ID to the transaction extra field
     * @param paymentId the payment Id to include
     */
    addPaymentId(paymentId: string): void;
    /**
     * Adds the public key for the transaction to the transaction extra field
     * @param publicKey the public key of the transaction
     */
    addPublicKey(publicKey: string): void;
    /**
     * Returns a buffer representation of the transaction object
     * @param [headerOnly] whether we should return just the prefix or not
     * @returns the buffer representation
     */
    toBuffer(headerOnly?: boolean): Buffer;
    /**
     * Returns the hexadecimal (blob) representation of the transaction object
     * @param [headerOnly] whether we should return just the prefix or not
     * @returns the hexadecimal (blob)  representation
     */
    toString(headerOnly?: boolean): string;
}
export {};
