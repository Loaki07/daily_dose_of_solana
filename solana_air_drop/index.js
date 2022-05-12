const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

// creating a new wallet account
const wallet = new Keypair();

const publicKey = new PublicKey(wallet._keypair.publicKey);

// to be hidden
const secretKey = wallet._keypair.secretKey;

/**
 * function the get the wallet balance
 */
const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletBalance = await connection.getBalance(publicKey);

        console.log(`wallet balance is ${walletBalance}`);
    } catch (error) {
        console.error(err);
    }
};

/**
 * function to airdrop sol into a wallet account
 */
const airDropSol = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        // 1sol is 1 billion lamports(10 ^ 9)
        const fromAirDropSignature = await connection.requestAirdrop(
            publicKey,
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (error) {
        console.error(err);
    }
};

const main = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
};

main();
