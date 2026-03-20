import { ParagraphAPI } from "../src";

// Listing your own posts requires an API key
const api = new ParagraphAPI({ apiKey: "your-api-key" });

async function main() {
  // List published posts (default)
  const { items: published, pagination } = await api.posts.list();
  console.log("Published posts:", published.length);
  console.log("Total:", pagination.total);

  // List draft posts
  const { items: drafts } = await api.posts.list({ status: "draft" });
  console.log("\nDrafts:", drafts.length);
  drafts.forEach((d) => console.log(`  - ${d.title}`));

  // List with content included and pagination
  const { items: posts, pagination: pag } = await api.posts.list({
    status: "published",
    limit: 5,
    includeContent: true,
  });
  posts.forEach((p) => {
    console.log(`\n${p.title}`);
    console.log(`  Views: ${p.views ?? "N/A"}`);
    console.log(`  Content preview: ${p.markdown?.substring(0, 80)}...`);
  });

  // Paginate through results
  if (pag.hasMore && pag.cursor) {
    const { items: nextPage } = await api.posts.list({
      status: "published",
      limit: 5,
      cursor: pag.cursor,
    });
    console.log("\nNext page:", nextPage.length, "posts");
  }
}

main().catch(console.error);
