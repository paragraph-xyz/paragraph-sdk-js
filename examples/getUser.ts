import { ParagraphAPI } from "../src";

const api = new ParagraphAPI();

async function main() {
  // Get user by their Ethereum wallet address (use .single() to get a single object)
  const userByWallet = await api.users
    .get({
      wallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", // vitalik.eth
    })
    .single();
  console.log("User by wallet:", userByWallet);

  // Get user by their unique ID (if you have it)
  // const userById = await api.users.get({ id: "user123" }).single();
  // console.log("User by ID:", userById);

  // Or get the full paginated result
  const { items, pagination } = await api.users.get({
    wallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  });
  console.log("User from paginated result:", items[0]);
  console.log("Has more:", pagination.hasMore);
}

main().catch(console.error);
