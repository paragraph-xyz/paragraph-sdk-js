/**
 * Buy Coin with Browser Provider (MetaMask, etc.)
 *
 * This example demonstrates how to buy a Paragraph coin using a browser-based
 * wallet provider like MetaMask. This is the recommended approach for web
 * applications where users connect their own wallets.
 *
 * Requirements:
 * - A browser environment with window.ethereum (MetaMask, Coinbase Wallet, etc.)
 * - User must have ETH on Base network for the purchase
 * - User must approve the transaction in their wallet
 *
 * The coin purchase is executed on the Base network using the Universal Router.
 *
 * @example Usage in a React component:
 * ```tsx
 * import { buyCoin } from './buyCoinWithBrowserProvider';
 *
 * function BuyButton() {
 *   return <button onClick={buyCoin}>Buy Coin</button>;
 * }
 * ```
 */

import { createWalletClient, custom, parseEther } from "viem";
import { ParagraphAPI } from "../src";
import { base } from "viem/chains";

/**
 * Initiates a coin purchase using the browser's wallet provider.
 *
 * @returns The transaction hash of the purchase transaction
 * @throws Error if the user rejects the transaction or if there's insufficient funds
 */
async function buyCoin() {
  // Initialize the API (no API key needed for buying coins)
  const api = new ParagraphAPI();

  // Request account access from the wallet provider
  // This will prompt the user to connect their wallet if not already connected
  const [account] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  // Create a wallet client using the browser's wallet provider
  // The client handles signing transactions
  const client = createWalletClient({
    account,
    chain: base, // Paragraph coins are on Base network
    transport: custom(window.ethereum),
  });

  // Execute the coin purchase
  // - coin: Identify the coin by ID or contract address
  // - amount: Amount of ETH to spend (in wei)
  const txHash = await api.coins.buy({
    coin: { id: "N3j7OrRYuRKZQM1rhYEh" }, // Can also use { contractAddress: "0x..." }
    client,
    account,
    amount: parseEther("0.0001"), // 0.0001 ETH
  });

  console.log("Transaction submitted:", txHash);
  console.log(`View on BaseScan: https://basescan.org/tx/${txHash}`);

  return txHash;
}

// Export for use in other modules
export { buyCoin };
