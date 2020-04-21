export declare namespace ED25519 {
    /**
     * Represents a ED25519 Key Pair (private & public) and provides a few methods
     * for generating new key pairs including deterministic methods.
     */
    class KeyPair {
        private m_privateKey?;
        private m_publicKey?;
        /**
         * Constructs a new KeyPair object
         * @param publicKey
         * @param privateKey
         * @param entropy
         * @param iterations
         */
        constructor(publicKey?: string, privateKey?: string, entropy?: string, iterations?: number);
        /**
         * Returns the private key
         */
        get privateKey(): string;
        /**
         * Sets the private key or reduces the value to a private key
         * @param key
         */
        set privateKey(key: string);
        /**
         * Returns the public key
         */
        get publicKey(): string;
        /**
         * Sets the public key
         * @param key
         */
        set publicKey(key: string);
        /**
         * Returns if the public key belongs to the private key
         */
        get isPaired(): boolean;
    }
    /**
     * Represents a set of ED25519 key pairs (view and spend) used by TurtleCoin wallets
     */
    class Keys {
        private m_spendKeys;
        private m_viewKeys;
        /**
         * Creates a new instance of a set of Keys
         * @param spendKeys the spend key pair
         * @param viewKeys the view key pair
         */
        constructor(spendKeys?: KeyPair, viewKeys?: KeyPair);
        /**
         * Returns the spend keys
         */
        get spend(): KeyPair;
        /**
         * Sets the spend keys
         * @param keys
         */
        set spend(keys: KeyPair);
        /**
         * Returns the view keys
         */
        get view(): KeyPair;
        /**
         * Sets the view keys
         * @param keys
         */
        set view(keys: KeyPair);
    }
}
