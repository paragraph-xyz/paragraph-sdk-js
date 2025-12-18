import { ParagraphAPI } from "../src";

// Listing subscribers requires an API key
// Get your API key from your Paragraph publication settings
const api = new ParagraphAPI({ apiKey: "your-api-key" });

async function main() {
  // Get first page of subscribers
  const { items: subscribers, pagination } = await api.subscribers.get();
  console.log("Subscribers:", subscribers.length);
  console.log("Has more:", pagination.hasMore);
  console.log("Total:", pagination.total);

  // Display subscriber info
  subscribers.forEach((sub) => {
    const identifier = sub.email || sub.walletAddress || "unknown";
    const date = new Date(sub.createdAt).toLocaleDateString();
    console.log(`  - ${identifier} (subscribed: ${date})`);
  });

  // Get subscribers with custom limit
  const { items: limitedSubs, pagination: pag } = await api.subscribers.get({
    limit: 5,
  });
  console.log(
    "\nFirst 5 subscribers:",
    limitedSubs.map((s) => s.email || s.walletAddress)
  );

  // Get next page using cursor
  if (pag.hasMore && pag.cursor) {
    console.log("\nFetching next page...");
    const { items: nextSubs, pagination: nextPag } = await api.subscribers.get({
      limit: 5,
      cursor: pag.cursor,
    });
    console.log(
      "Next 5 subscribers:",
      nextSubs.map((s) => s.email || s.walletAddress)
    );
    console.log("Has more after this page:", nextPag.hasMore);
  }
}

main().catch(console.error);
