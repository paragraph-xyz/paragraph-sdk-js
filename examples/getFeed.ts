import { ParagraphAPI } from "../src";

const api = new ParagraphAPI();

async function main() {
  // Get the curated feed from across the platform (with pagination info)
  const { items: feedItems, pagination } = await api.feed.get();
  console.log("Feed posts:", feedItems.length);
  console.log("Has more:", pagination.hasMore);

  // Each feed item contains post, publication, and user data
  feedItems.forEach((item) => {
    console.log(`- ${item.post.title} by ${item.user.name || item.user.farcaster?.displayName}`);
    console.log(`  Publication: ${item.publication.name}`);
  });

  // Paginate through results
  if (pagination.hasMore && pagination.cursor) {
    console.log("\nFetching next page...");
    const { items: nextItems, pagination: nextPagination } = await api.feed.get(
      { cursor: pagination.cursor }
    );
    console.log("Next page posts:", nextItems.length);
    console.log("Has more:", nextPagination.hasMore);
  }

  // Get feed with custom limit
  const { items: limitedItems } = await api.feed.get({ limit: 5 });
  console.log("\nLimited feed (5 items):", limitedItems.length);
}

main().catch(console.error);
