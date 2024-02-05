# Solana Wallet CLI for Advanced Solana Bootcamp - Web3.js

npm i -g typescript

tsc --init

tsc wallet.ts

<commands>
new
balance
airdrop [amount]
transfer [otherPublicKey] [amount]
live []
<commands>
  
## node wallet.js new
Creates new wallet with desired name and saves its own json file on local directory.

## node wallet.js balance
You can check the desired wallet's balance with its name, if it exists.

## node wallet.js airdrop [amount]
Airdrops desired amounts of SOL / default 1 SOL

## node wallet.js transfer [otherPublicKey] [amount]
Transfers SOL one to Another with the entered amount

## node wallet.js live
Shows Solana live stats.
