import { parseEther } from "viem";
import { ParagraphAPI } from "../src";

const api = new ParagraphAPI();

async function main() {
  // Get popular coins (returns paginated result)
  const { items: coins, pagination: coinsPag } = await api.coins.get({ sortBy: "popular" });
  console.log(
    "Popular coins:",
    coins.map((c) => c.contractAddress)
  );
  console.log("Total popular coins:", coinsPag.total);

  // Get a specific coin by ID (use .single() to get a single object)
  const coin = await api.coins.get({ id: "N3j7OrRYuRKZQM1rhYEh" }).single();
  console.log("Coin by ID:", coin.metadata.name, coin.metadata.symbol);

  // Get a coin by its contract address
  // const coinByContract = await api.coins.get({
  //   contractAddress: "0x1234...",
  // }).single();
  // console.log("Coin by contract:", coinByContract.metadata.name);

  // Get a quote for buying a coin (how many tokens for X ETH)
  const quote = await api.coins.getQuote(
    { id: "N3j7OrRYuRKZQM1rhYEh" },
    parseEther("0.001") // 0.001 ETH
  );
  console.log("Quote for 0.001 ETH:", quote);

  // Get coin holders with pagination
  const { items: holders, pagination } = await api.coins.getHolders(
    { id: "N3j7OrRYuRKZQM1rhYEh" },
    { limit: 10 }
  );
  console.log(
    "Top 10 holders:",
    holders.map((h) => h.walletAddress)
  );

  // Get next page of holders
  if (pagination.cursor) {
    const nextHolders = await api.coins.getHolders(
      { id: "N3j7OrRYuRKZQM1rhYEh" },
      { limit: 10, cursor: pagination.cursor }
    );
    console.log(
      "Next 10 holders:",
      nextHolders.items.map((h) => h.walletAddress)
    );
  }
}

main().catch(console.error);
