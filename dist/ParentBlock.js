// Copyright (c) 2018-2020, The TurtleCoin Developers
//
// Please see the included LICENSE file for more information.
import { Transaction } from './Transaction';
/**
 * Represents a parent block object
 */
export class ParentBlock {
    constructor() {
        /**
         * The major block version number
         */
        this.majorVersion = 0;
        /**
         * The minor block version number
         */
        this.minorVersion = 0;
        /**
         * The previous block hash
         */
        this.previousBlockHash = ''.padStart(64, '0');
        /**
         * The number of transactions in the block
         */
        this.transactionCount = 0;
        /**
         * The base transaction branches
         */
        this.baseTransactionBranch = [];
        /**
         * The miner reward transaction
         */
        this.minerTransaction = new Transaction();
        /**
         * The blockchain branches
         */
        this.blockchainBranch = [];
    }
}
