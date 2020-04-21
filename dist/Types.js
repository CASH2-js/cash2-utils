// Copyright (c) 2018-2020, The TurtleCoin Developers
//
// Please see the included LICENSE file for more information.
import { Crypto } from 'cash2-crypto';
import * as BigInteger from 'big-integer';
/** @ignore */
const TurtleCoinCrypto = new Crypto();
export { TurtleCoinCrypto };
/** @ignore */
export var PortableStorageConstants;
(function (PortableStorageConstants) {
    PortableStorageConstants[PortableStorageConstants["SIGNATURE_A"] = 16847105] = "SIGNATURE_A";
    PortableStorageConstants[PortableStorageConstants["SIGNATURE_B"] = 16908545] = "SIGNATURE_B";
    PortableStorageConstants[PortableStorageConstants["VERSION"] = 1] = "VERSION";
})(PortableStorageConstants || (PortableStorageConstants = {}));
export * from './Types/IExtraNonce';
export * from './Types/IExtraTag';
export * from './Types/ITransactionInput';
export * from './Types/ITransactionOutput';
export * from './Types/ED25519';
export { PortableStorage, StorageType } from './Types/PortableStorage';
export { BigInteger };
