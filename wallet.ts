import * as sol from "@solana/web3.js";
import * as fs from "fs";
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
const connection = new sol.Connection('https://api.testnet.solana.com', 'confirmed');
class Wallet {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    async create() {
        let keypair = sol.Keypair.generate();
        console.log("Creating wallet: ", this.name);
        let data = {
            name: this.name,
            publicKey: keypair.publicKey,
            secretKey: keypair.secretKey,
            balance: await connection.getBalance(keypair.publicKey),
        }
        fs.writeFileSync(this.name + ".json", JSON.stringify(data, null, 2), 'utf-8');
    }
}
async function updateBalance(walletName: string, newBalance: number) {
    let current: any = fs.readFileSync(walletName + ".json", 'utf-8');
    current = JSON.parse(current);
    current.balance = newBalance;
    fs.writeFileSync(walletName + ".json", JSON.stringify(current));
}
async function handleCommand(command: string, params: string[]) {
    switch (command) {
        case 'new': // Creating a new wallet with its name
            readline.question('Enter wallet name: ', async (walletName: string) => {
                let wallet = new Wallet(walletName);
                await wallet.create();
                readline.close();
            });
            break;
        case 'balance': // Getting and updating current balance of selected wallet
            readline.question('Enter wallet name: ', async (walletName: string) => {
                let current: any = fs.readFileSync(walletName + ".json", 'utf-8');
                current = JSON.parse(current);
                const publicKey = new sol.PublicKey(current.publicKey);
                let balance = await connection.getBalance(publicKey);
                console.log('Balance:', balance);
                updateBalance(walletName, balance);
                readline.close();
            });
            break;
        case 'airdrop': // Airdrop SOL - default 1 SOL
            readline.question('Enter wallet name: ', async (walletName: string) => {
                const current: any = JSON.parse(fs.readFileSync(walletName + ".json", 'utf-8'));
                const publicKey = new sol.PublicKey(current.publicKey);
                let airdropAmount = params.length > 0 ? parseFloat(params[0]) : 1;
                const airdropSignature = await connection.requestAirdrop(publicKey, airdropAmount * sol.LAMPORTS_PER_SOL);
                await connection.confirmTransaction(airdropSignature);
                console.log(`Airdrop successful. Airdropped ${airdropAmount} SOL`);
                let balance = await connection.getBalance(publicKey);
                await updateBalance(walletName, balance);
                console.log('New Balance:', balance);
                readline.close();
            });
            break;
        case 'transfer': // Transferring SOL one to another
            readline.question("Enter sender wallet name: ", async (walletName: string) => {
                const sender: any = JSON.parse(fs.readFileSync(walletName + ".json", 'utf-8'));
                const secretKey = new Uint8Array(Object.values(sender.secretKey))
                const senderKeypair = sol.Keypair.fromSecretKey(secretKey);
                const senderPublicKey = senderKeypair.publicKey;
                const otherPublicKey = new sol.PublicKey(params[0]);
                const amount = params.length > 1 ? parseFloat(params[1]) * sol.LAMPORTS_PER_SOL : 1 * sol.LAMPORTS_PER_SOL;
                const transaction = new sol.Transaction().add(sol.SystemProgram.transfer({
                    fromPubkey: senderPublicKey,
                    toPubkey: otherPublicKey,
                    lamports: amount,
                }));
                await sol.sendAndConfirmTransaction(connection, transaction, [senderKeypair]);
                console.log("New balance: ", await connection.getBalance(senderPublicKey));
                updateBalance(walletName, await connection.getBalance(senderPublicKey));
                readline.close();
            });
            break;
        case 'live': // Live Stats
            const epoch = await connection.getEpochInfo();
            const slot = await connection.getSlot();
            console.log('Epoch:', epoch.epoch);
            console.log('Absolute Slot: ', epoch.absoluteSlot);
            console.log('Block Height:', epoch.blockHeight);
            console.log('Transaction count:', epoch.transactionCount);
            console.log('Slot Index:', epoch.slotIndex);
            console.log('Slots in Epoch:', epoch.slotsInEpoch);
            console.log('Slot:', slot);
            break;
        default:
            console.log('commands: new | balance |airdrop [amount] | transfer [otherPublicKey] [amount] | live ');
    }
}
const [command, ...params] = process.argv.slice(2);
handleCommand(command, params);