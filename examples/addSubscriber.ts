import { ParagraphAPI } from "../src";

// Managing subscribers requires an API key
// Get your API key from your Paragraph publication settings
const api = new ParagraphAPI({ apiKey: "your-api-key" });

async function main() {
  // Add a subscriber by email
  const emailSubscriber = await api.subscribers.create({
    email: "user@example.com",
  });
  console.log("Added email subscriber:", emailSubscriber);

  // Add a subscriber by wallet address
  const walletSubscriber = await api.subscribers.create({
    wallet: "0x1234567890123456789012345678901234567890",
  });
  console.log("Added wallet subscriber:", walletSubscriber);

  // Add a subscriber with both email and wallet
  const fullSubscriber = await api.subscribers.create({
    email: "user@example.com",
    wallet: "0x1234567890123456789012345678901234567890",
  });
  console.log("Added full subscriber:", fullSubscriber);

  // Import subscribers from a CSV file (Node.js environment)
  // The CSV should have columns: email, wallet_address (at least one required)
  // const fs = await import("fs");
  // const csvContent = fs.readFileSync("subscribers.csv");
  // const file = new File([csvContent], "subscribers.csv", { type: "text/csv" });
  // const importResult = await api.subscribers.importCsv({ file });
  // console.log("Import result:", importResult);
}

main().catch(console.error);
