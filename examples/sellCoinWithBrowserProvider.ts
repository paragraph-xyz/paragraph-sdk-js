/**
 * Sell Coin with Browser Provider (MetaMask, etc.)
 *
 * This example demonstrates how to sell a Paragraph coin using a browser-based
 * wallet provider like MetaMask. This is the recommended approach for web
 * applications where users connect their own wallets.
 *
 * Requirements:
 * - A browser environment with window.ethereum (MetaMask, Coinbase Wallet, etc.)
 * - User must hold the coin they want to sell
 * - User must approve the Permit2 signature (gasless approval)
 * - User must approve the transaction in their wallet
 *
 * The sell process:
 * 1. User signs a Permit2 message (gasless token approval)
 * 2. Transaction is submitted to swap coins for WETH
 * 3. WETH is received in the user's wallet
 *
 * @example Usage in a React component:
 * ```tsx
 * import { sellCoin } from './sellCoinWithBrowserProvider';
 *
 * function SellButton() {
 *   return <button onClick={sellCoin}>Sell Coin</button>;
 * }
 * ```
 */

import { createWalletClient, custom, parseEther } from "viem";
import { ParagraphAPI } from "../src";
import { base } from "viem/chains";

/**
 * Initiates a coin sale using the browser's wallet provider.
 *
 * @returns The transaction hash of the sale transaction
 * @throws Error if the user rejects the transaction, has insufficient balance,
 *         or if the Permit2 signature fails
 */
async function sellCoin() {
  // Initialize the API (no API key needed for selling coins)
  const api = new ParagraphAPI();

  // Request account access from the wallet provider
  // This will prompt the user to connect their wallet if not already connected
  const [account] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  // Create a wallet client using the browser's wallet provider
  // The client handles signing both the Permit2 message and the transaction
  const client = createWalletClient({
    account,
    chain: base, // Paragraph coins are on Base network
    transport: custom(window.ethereum),
  });

  // Execute the coin sale
  // - coin: Identify the coin by ID or contract address
  // - amount: Amount of coins to sell (in wei, 18 decimals)
  //
  // Note: The user will be prompted to:
  // 1. Sign a Permit2 message (gasless approval)
  // 2. Confirm the swap transaction
  const txHash = await api.coins.sell({
    coin: { id: "N3j7OrRYuRKZQM1rhYEh" }, // Can also use { contractAddress: "0x..." }
    client,
    account,
    amount: parseEther("420"), // 420 coins (with 18 decimals)
  });

  console.log("Transaction submitted:", txHash);
  console.log(`View on BaseScan: https://basescan.org/tx/${txHash}`);

  return txHash;
}

// Export for use in other modules
export { sellCoin };
