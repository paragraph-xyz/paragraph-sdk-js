import { ParagraphAPI } from "../src";

// Removing subscribers requires an API key
const api = new ParagraphAPI({ apiKey: "your-api-key" });

async function main() {
  // Remove a subscriber by email
  const byEmail = await api.subscribers.remove({
    email: "user@example.com",
  });
  if (byEmail.success) {
    console.log("Subscriber removed by email");
  }

  // Remove a subscriber by wallet
  const byWallet = await api.subscribers.remove({
    wallet: "0x1234567890123456789012345678901234567890",
  });
  if (byWallet.success) {
    console.log("Subscriber removed by wallet");
  }

  // You can pass both, but they must resolve to the same user.
  // If the email and wallet point to different subscribers, the request fails.
  const both = await api.subscribers.remove({
    email: "user@example.com",
    wallet: "0x1234567890123456789012345678901234567890",
  });
  if (both.success) {
    console.log("Subscriber removed (matched by email and wallet)");
  }
}

main().catch(console.error);
