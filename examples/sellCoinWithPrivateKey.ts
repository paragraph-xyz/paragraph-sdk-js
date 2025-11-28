import { createWalletClient, http, parseEther } from "viem";
import { ParagraphAPI } from "../src";
import { base } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

const api = new ParagraphAPI();
const client = createWalletClient({ chain: base, transport: http() });
const account = privateKeyToAccount("0x.."); // Add your private key for this example to work

api
  .sellCoin({
    coinId: "N3j7OrRYuRKZQM1rhYEh",
    client,
    account,
    amount: parseEther("420"),
  })
  .then((txHash) => console.log(txHash));
