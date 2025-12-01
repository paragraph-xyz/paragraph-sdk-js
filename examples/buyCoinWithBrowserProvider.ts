import { createWalletClient, custom, http, parseEther } from "viem";
import { ParagraphAPI } from "../src";
import { base } from "viem/chains";

/**
 * Buy coin function meant to be used in the context of a web application in the browser.
 */
async function buyCoin() {
  const api = new ParagraphAPI();
  const [account] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const client = createWalletClient({
    account,
    chain: base,
    transport: custom(window.ethereum),
  });

  api
    .buyCoin({
      coinId: "N3j7OrRYuRKZQM1rhYEh",
      client,
      account,
      amount: parseEther("0.0001"),
    })
    .then((txHash) => console.log(txHash));
}
