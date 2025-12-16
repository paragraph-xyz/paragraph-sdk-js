import { ParagraphAPI } from "../src";

const api = new ParagraphAPI();

async function main() {
  // Get user by their Ethereum wallet address
  const userByWallet = await api.users.get({
    wallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", // vitalik.eth
  });
  console.log("User by wallet:", userByWallet);

  // Get user by their unique ID (if you have it)
  // const userById = await api.users.get({ id: "user123" });
  // console.log("User by ID:", userById);
}

main().catch(console.error);
