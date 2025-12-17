/**
 * Buy Coin with Private Key (Server-side / Scripts)
 *
 * This example demonstrates how to buy a Paragraph coin using a private key.
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
 * - A private key with ETH on Base network
 * - Node.js environment (not browser)
 *
 * @example Run this example:
 * ```bash
 * PRIVATE_KEY=0x... npx ts-node examples/buyCoinWithPrivateKey.ts
 * ```
 */

import { createWalletClient, http, parseEther } from "viem";
import { ParagraphAPI } from "../src";
import { base } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

async function main() {
  // Initialize the API (no API key needed for buying coins)
  const api = new ParagraphAPI();

  // Create an account from a private key
  // In production, load this from an environment variable:
  // const privateKey = process.env.PRIVATE_KEY as `0x${string}`;
  const privateKey = "0x..."; // Replace with your private key (64 hex characters after 0x)
  const account = privateKeyToAccount(privateKey as `0x${string}`);

  console.log("Buying coin with account:", account.address);

  // Create a wallet client with HTTP transport for server-side use
  // You can also use a custom RPC URL:
  // transport: http("https://your-rpc-url.com")
  const client = createWalletClient({
    chain: base, // Paragraph coins are on Base network
    transport: http(),
  });

  // Execute the coin purchase
  const txHash = await api.coins.buy({
    coin: { id: "N3j7OrRYuRKZQM1rhYEh" }, // Can also use { contractAddress: "0x..." }
    client,
    account,
    amount: parseEther("0.0001"), // 0.0001 ETH - adjust as needed
  });

  console.log("Transaction submitted:", txHash);
  console.log(`View on BaseScan: https://basescan.org/tx/${txHash}`);
}

main().catch(console.error);
