// Copyright (c) 2018-2020, The TurtleCoin Developers
//
// Please see the included LICENSE file for more information.
import { Common } from '../Common';
import { TurtleCoinCrypto } from '../Types';
import { Mnemonics } from 'cash2-mnemonics';
/** @ignore */
const Config = require('../../config.json');
/** @ignore */
const SecureRandomString = require('secure-random-string');
export var ED25519;
(function (ED25519) {
    /**
     * Represents a ED25519 Key Pair (private & public) and provides a few methods
     * for generating new key pairs including deterministic methods.
     */
    class KeyPair {
        /**
         * Constructs a new KeyPair object
         * @param publicKey
         * @param privateKey
         * @param entropy
         * @param iterations
         */
        constructor(publicKey, privateKey, entropy, iterations) {
            if (!publicKey && !privateKey && !entropy && !iterations) {
                return;
            }
            if (publicKey && TurtleCoinCrypto.checkKey(publicKey)) {
                this.m_publicKey = publicKey;
            }
            if (privateKey && TurtleCoinCrypto.checkScalar(privateKey)) {
                this.m_privateKey = privateKey;
            }
            if (!publicKey && !privateKey) {
                /* If no entropy was supplied, we'll go find our own */
                entropy = entropy || SecureRandomString({ length: 256 });
                this.privateKey = simpleKdf(entropy + rand32(), iterations || Config.keccakIterations);
            }
            if (this.m_privateKey && !this.m_publicKey) {
                /* If we supplied a private key but no public key, and we said 1 iteration
                we are probably looking to generate the deterministic view key for the
                specified private spend key */
                if (iterations && iterations === 1) {
                    this.privateKey = TurtleCoinCrypto.cn_fast_hash(this.m_privateKey);
                }
                this.m_publicKey = TurtleCoinCrypto.secretKeyToPublicKey(this.m_privateKey);
            }
        }
        /**
         * Returns the private key
         */
        get privateKey() {
            return (this.m_privateKey) ? this.m_privateKey : '';
        }
        /**
         * Sets the private key or reduces the value to a private key
         * @param key
         */
        set privateKey(key) {
            this.m_privateKey = (TurtleCoinCrypto.checkScalar(key)) ?
                key : TurtleCoinCrypto.scReduce32(key);
        }
        /**
         * Returns the public key
         */
        get publicKey() {
            return (this.m_publicKey) ? this.m_publicKey : '';
        }
        /**
         * Sets the public key
         * @param key
         */
        set publicKey(key) {
            if (TurtleCoinCrypto.checkKey(key)) {
                this.m_publicKey = key;
            }
            else {
                throw new Error('Not a public key');
            }
        }
        /**
         * Returns if the public key belongs to the private key
         */
        get isPaired() {
            if (this.publicKey.length === 0 || this.privateKey.length === 0) {
                return false;
            }
            return (TurtleCoinCrypto.secretKeyToPublicKey(this.privateKey) === this.publicKey);
        }
    }
    ED25519.KeyPair = KeyPair;
    /**
     * Represents a set of ED25519 key pairs (view and spend) used by TurtleCoin wallets
     */
    class Keys {
        /**
         * Creates a new instance of a set of Keys
         * @param spendKeys the spend key pair
         * @param viewKeys the view key pair
         */
        constructor(spendKeys, viewKeys) {
            this.m_spendKeys = new KeyPair();
            this.m_viewKeys = new KeyPair();
            if (spendKeys) {
                this.m_spendKeys = spendKeys;
            }
            if (viewKeys) {
                this.m_viewKeys = viewKeys;
            }
            if (!spendKeys && !viewKeys) {
                this.m_spendKeys = new KeyPair();
                this.m_viewKeys = new KeyPair(undefined, this.m_spendKeys.privateKey, undefined, 1);
            }
        }
        /**
         * Returns the spend keys
         */
        get spend() {
            return this.m_spendKeys;
        }
        /**
         * Sets the spend keys
         * @param keys
         */
        set spend(keys) {
            this.m_spendKeys = keys;
        }
        /**
         * Returns the view keys
         */
        get view() {
            return this.m_viewKeys;
        }
        /**
         * Sets the view keys
         * @param keys
         */
        set view(keys) {
            this.m_viewKeys = keys;
        }
    }
    ED25519.Keys = Keys;
})(ED25519 || (ED25519 = {}));
/** @ignore */
function rand32() {
    try {
        return Mnemonics.random(256);
    }
    catch (error) {
        throw new Error('Could not retrieve 32-bytes of random data: ' + error.toString());
    }
}
/** @ignore */
function simpleKdf(value, iterations) {
    /** This is a very simple implementation of a pseudo PBKDF2 function */
    let hex = Common.bin2hex(Common.str2bin(value));
    for (let i = 0; i < iterations; i++) {
        hex = TurtleCoinCrypto.cn_fast_hash(hex);
    }
    return hex;
}
