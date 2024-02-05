"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var sol = require("@solana/web3.js");
var fs = require("fs");
var readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
var connection = new sol.Connection('https://api.testnet.solana.com', 'confirmed');
var Wallet = /** @class */ (function () {
    function Wallet(name) {
        this.name = name;
    }
    Wallet.prototype.create = function () {
        return __awaiter(this, void 0, void 0, function () {
            var keypair, data;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        keypair = sol.Keypair.generate();
                        console.log("Creating wallet: ", this.name);
                        _a = {
                            name: this.name,
                            publicKey: keypair.publicKey,
                            secretKey: keypair.secretKey
                        };
                        return [4 /*yield*/, connection.getBalance(keypair.publicKey)];
                    case 1:
                        data = (_a.balance = _b.sent(),
                            _a);
                        fs.writeFileSync(this.name + ".json", JSON.stringify(data, null, 2), 'utf-8');
                        return [2 /*return*/];
                }
            });
        });
    };
    return Wallet;
}());
function updateBalance(walletName, newBalance) {
    return __awaiter(this, void 0, void 0, function () {
        var current;
        return __generator(this, function (_a) {
            current = fs.readFileSync(walletName + ".json", 'utf-8');
            current = JSON.parse(current);
            current.balance = newBalance;
            fs.writeFileSync(walletName + ".json", JSON.stringify(current));
            return [2 /*return*/];
        });
    });
}
function handleCommand(command, params) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, transactionCount, slot;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = command;
                    switch (_a) {
                        case 'new': return [3 /*break*/, 1];
                        case 'balance': return [3 /*break*/, 2];
                        case 'airdrop': return [3 /*break*/, 3];
                        case 'transfer': return [3 /*break*/, 4];
                        case 'live': return [3 /*break*/, 5];
                    }
                    return [3 /*break*/, 8];
                case 1:
                    readline.question('Enter wallet name: ', function (walletName) { return __awaiter(_this, void 0, void 0, function () {
                        var wallet;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    wallet = new Wallet(walletName);
                                    return [4 /*yield*/, wallet.create()];
                                case 1:
                                    _a.sent();
                                    readline.close();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [3 /*break*/, 9];
                case 2:
                    readline.question('Enter wallet name: ', function (walletName) { return __awaiter(_this, void 0, void 0, function () {
                        var current, publicKey, balance;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    current = fs.readFileSync(walletName + ".json", 'utf-8');
                                    current = JSON.parse(current);
                                    publicKey = new sol.PublicKey(current.publicKey);
                                    return [4 /*yield*/, connection.getBalance(publicKey)];
                                case 1:
                                    balance = _a.sent();
                                    console.log('Balance:', balance);
                                    updateBalance(walletName, balance);
                                    readline.close();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [3 /*break*/, 9];
                case 3:
                    readline.question('Enter wallet name: ', function (walletName) { return __awaiter(_this, void 0, void 0, function () {
                        var current, publicKey, airdropAmount, airdropSignature, balance;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    current = JSON.parse(fs.readFileSync(walletName + ".json", 'utf-8'));
                                    publicKey = new sol.PublicKey(current.publicKey);
                                    airdropAmount = params.length > 0 ? parseFloat(params[0]) : 1;
                                    return [4 /*yield*/, connection.requestAirdrop(publicKey, airdropAmount * sol.LAMPORTS_PER_SOL)];
                                case 1:
                                    airdropSignature = _a.sent();
                                    return [4 /*yield*/, connection.confirmTransaction(airdropSignature)];
                                case 2:
                                    _a.sent();
                                    console.log("Airdrop successful. Airdropped ".concat(airdropAmount, " SOL"));
                                    return [4 /*yield*/, connection.getBalance(publicKey)];
                                case 3:
                                    balance = _a.sent();
                                    return [4 /*yield*/, updateBalance(walletName, balance)];
                                case 4:
                                    _a.sent();
                                    console.log('New Balance:', balance);
                                    readline.close();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [3 /*break*/, 9];
                case 4:
                    readline.question("Enter sender wallet name: ", function (walletName) { return __awaiter(_this, void 0, void 0, function () {
                        var sender, secretKey, senderKeypair, senderPublicKey, otherPublicKey, amount, transaction, _a, _b, _c, _d, _e;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    sender = JSON.parse(fs.readFileSync(walletName + ".json", 'utf-8'));
                                    secretKey = new Uint8Array(Object.values(sender.secretKey));
                                    senderKeypair = sol.Keypair.fromSecretKey(secretKey);
                                    senderPublicKey = senderKeypair.publicKey;
                                    otherPublicKey = new sol.PublicKey(params[0]);
                                    amount = params.length > 1 ? parseFloat(params[1]) * sol.LAMPORTS_PER_SOL : 1 * sol.LAMPORTS_PER_SOL;
                                    transaction = new sol.Transaction().add(sol.SystemProgram.transfer({
                                        fromPubkey: senderPublicKey,
                                        toPubkey: otherPublicKey,
                                        lamports: amount,
                                    }));
                                    return [4 /*yield*/, sol.sendAndConfirmTransaction(connection, transaction, [senderKeypair])];
                                case 1:
                                    _f.sent();
                                    _b = (_a = console).log;
                                    _c = ["New balance: "];
                                    return [4 /*yield*/, connection.getBalance(senderPublicKey)];
                                case 2:
                                    _b.apply(_a, _c.concat([_f.sent()]));
                                    _d = updateBalance;
                                    _e = [walletName];
                                    return [4 /*yield*/, connection.getBalance(senderPublicKey)];
                                case 3:
                                    _d.apply(void 0, _e.concat([_f.sent()]));
                                    readline.close();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [3 /*break*/, 9];
                case 5: return [4 /*yield*/, connection.getTransactionCount()];
                case 6:
                    transactionCount = _b.sent();
                    return [4 /*yield*/, connection.getSlot()];
                case 7:
                    slot = _b.sent();
                    console.log('Block Height:', slot);
                    console.log('Transaction count:', transactionCount);
                    console.log('Slot:', slot);
                    return [3 /*break*/, 9];
                case 8:
                    console.log('commands: new | balance |airdrop [amount] | transfer [otherPublicKey] [amount] | live ');
                    _b.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
}
var _a = process.argv.slice(2), command = _a[0], params = _a.slice(1);
handleCommand(command, params);
