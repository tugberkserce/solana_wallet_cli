# Solana Wallet CLI for Advanced Solana Bootcamp - Web3.js

This Solana Wallet CLI is a powerful command-line tool designed for the Advanced Solana Bootcamp, utilizing Web3.js functionalities.

## Setup

1. Install TypeScript globally:

    ```bash
    npm i -g typescript
    ```

2. Initialize TypeScript configuration:

    ```bash
    tsc --init
    ```

3. Compile the wallet script:

    ```bash
    tsc wallet.ts
    ```

## Available Commands

### `new`

Create a new wallet with a user-specified name and save its JSON file in the local directory.

```bash
node wallet.js new
```
### `balance`

Certainly! Here's a simple Markdown representation of your README:

markdown
Copy code
# Solana Wallet CLI for Advanced Solana Bootcamp - Web3.js

This Solana Wallet CLI is a powerful command-line tool designed for the Advanced Solana Bootcamp, utilizing Web3.js functionalities.

## Setup

1. Install TypeScript globally:

    ```bash
    npm i -g typescript
    ```

2. Initialize TypeScript configuration:

    ```bash
    tsc --init
    ```

3. Compile the wallet script:

    ```bash
    tsc wallet.ts
    ```

## Available Commands

### `new`

Create a new wallet with a user-specified name and save its JSON file in the local directory.

```bash
node wallet.js new
```
### `balance`
Check the balance of the specified wallet by name, if it exists.
```bash
node wallet.js balance
```
### `airdrop [amount]`
Airdrop the desired amount of SOL (default is 1 SOL) to the specified wallet.
```bash
node wallet.js airdrop [amount]
```
### `transfer [otherPublicKey] [amount]`
Transfer SOL from one wallet to another with the specified amount.
```bash
node wallet.js transfer [otherPublicKey] [amount]
```
### `live`
```bash
node wallet.js live
```
