/**
 * Sell Coin with Private Key (Server-side / Scripts)
 *
 * This example demonstrates how to sell a Paragraph coin using a private key.
 * This approach is suitable for:
 * - Server-side applications
 * - Automated scripts
 * - Backend services
 * - CLI tools
 *
 * ⚠️  SECURITY WARNING:
 * - NEVER commit private keys to version control
 * - NEVER expose private keys in client-side code
 * - Use environment variables or secure key management systems
 * - Consider using a hardware wallet for production
 *
 * Requirements:
 * - A private key that holds the coin to sell
 * - Node.js environment (not browser)
 *
 * The sell process:
 * 1. Signs a Permit2 message (gasless token approval)
 * 2. Submits transaction to swap coins for WETH
 * 3. WETH is received in the wallet
 *
 * @example Run this example:
 * ```bash
 * PRIVATE_KEY=0x... npx ts-node examples/sellCoinWithPrivateKey.ts
 * ```
 */

import { createWalletClient, http, parseEther } from "viem";
import { ParagraphAPI } from "../src";
import { base } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

async function main() {
  // Initialize the API (no API key needed for selling coins)
  const api = new ParagraphAPI();

  // Create an account from a private key
  // In production, load this from an environment variable:
  // const privateKey = process.env.PRIVATE_KEY as `0x${string}`;
  const privateKey = "0x..."; // Replace with your private key (64 hex characters after 0x)
  const account = privateKeyToAccount(privateKey as `0x${string}`);

  console.log("Selling coin from account:", account.address);

  // Create a wallet client with HTTP transport for server-side use
  // You can also use a custom RPC URL:
  // transport: http("https://your-rpc-url.com")
  const client = createWalletClient({
    chain: base, // Paragraph coins are on Base network
    transport: http(),
  });

  // Execute the coin sale
  // - coin: Identify the coin by ID or contract address
  // - amount: Amount of coins to sell (in wei, 18 decimals)
  //
  // This will automatically:
  // 1. Sign a Permit2 message for token approval
  // 2. Submit the swap transaction
  const txHash = await api.coins.sell({
    coin: { id: "N3j7OrRYuRKZQM1rhYEh" }, // Can also use { contractAddress: "0x..." }
    client,
    account,
    amount: parseEther("420"), // 420 coins (with 18 decimals)
  });

  console.log("Transaction submitted:", txHash);
  console.log(`View on BaseScan: https://basescan.org/tx/${txHash}`);
}

main().catch(console.error);
