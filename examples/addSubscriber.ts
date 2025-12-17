import { ParagraphAPI } from "../src";

// Managing subscribers requires an API key
// Get your API key from your Paragraph publication settings
const api = new ParagraphAPI({ apiKey: "your-api-key" });

async function main() {
  // Add a subscriber by email
  const emailResult = await api.subscribers.create({
    email: "user@example.com",
  });
  if (emailResult.success) {
    console.log("Successfully added email subscriber!");
  } else {
    console.log("Failed to add email subscriber");
  }

  // Add a subscriber by wallet address
  const walletResult = await api.subscribers.create({
    wallet: "0x1234567890123456789012345678901234567890",
  });
  if (walletResult.success) {
    console.log("Successfully added wallet subscriber!");
  } else {
    console.log("Failed to add wallet subscriber");
  }

  // Add a subscriber with both email and wallet
  const fullResult = await api.subscribers.create({
    email: "user@example.com",
    wallet: "0x1234567890123456789012345678901234567890",
  });
  if (fullResult.success) {
    console.log("Successfully added subscriber with email and wallet!");
  } else {
    console.log("Failed to add subscriber");
  }

  // Import subscribers from a CSV file (Node.js environment)
  // The CSV should have columns: email, wallet_address (at least one required)
  // const fs = await import("fs");
  // const csvContent = fs.readFileSync("subscribers.csv");
  // const file = new File([csvContent], "subscribers.csv", { type: "text/csv" });
  // const importResult = await api.subscribers.importCsv({ file });
  // if (importResult.success) {
  //   console.log("Successfully started CSV import!");
  // } else {
  //   console.log("Failed to start CSV import");
  // }
}

main().catch(console.error);
