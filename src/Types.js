"use strict";
// Copyright (c) 2018-2020, The TurtleCoin Developers
//
// Please see the included LICENSE file for more information.
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const turtlecoin_crypto_1 = require("cash2-crypto");
const BigInteger = require("big-integer");
exports.BigInteger = BigInteger;
/** @ignore */
const TurtleCoinCrypto = new turtlecoin_crypto_1.Crypto();
exports.TurtleCoinCrypto = TurtleCoinCrypto;
/** @ignore */
var PortableStorageConstants;
(function (PortableStorageConstants) {
    PortableStorageConstants[PortableStorageConstants["SIGNATURE_A"] = 16847105] = "SIGNATURE_A";
    PortableStorageConstants[PortableStorageConstants["SIGNATURE_B"] = 16908545] = "SIGNATURE_B";
    PortableStorageConstants[PortableStorageConstants["VERSION"] = 1] = "VERSION";
})(PortableStorageConstants = exports.PortableStorageConstants || (exports.PortableStorageConstants = {}));
__export(require("./Types/IExtraNonce"));
__export(require("./Types/IExtraTag"));
__export(require("./Types/ITransactionInput"));
__export(require("./Types/ITransactionOutput"));
__export(require("./Types/ED25519"));
var PortableStorage_1 = require("./Types/PortableStorage");
exports.PortableStorage = PortableStorage_1.PortableStorage;
exports.StorageType = PortableStorage_1.StorageType;
