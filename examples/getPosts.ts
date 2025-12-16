import { ParagraphAPI } from "../src";

const api = new ParagraphAPI();

async function main() {
  // List posts from a specific publication
  const posts = await api.posts.list({
    type: "publication",
    publicationId: "BMV6abfvCSUl51ErCVzd",
  });
  console.log("Posts from publication:", posts.items.length);

  // Get the curated feed from across the platform
  const feed = await api.posts.list({ type: "feed" });
  console.log("Feed posts:", feed.items.length);

  // List posts with pagination
  const paginatedPosts = await api.posts.list(
    { type: "publication", publicationId: "BMV6abfvCSUl51ErCVzd" },
    { limit: 5 }
  );
  console.log(
    "First 5 posts:",
    paginatedPosts.items.map((i) => i.title)
  );

  // Get next page using cursor
  if (paginatedPosts.pagination.cursor) {
    const nextPage = await api.posts.list(
      { type: "publication", publicationId: "BMV6abfvCSUl51ErCVzd" },
      { limit: 5, cursor: paginatedPosts.pagination.cursor }
    );
    console.log(
      "Next 5 posts:",
      nextPage.items.map((p) => p.title)
    );
  }

  // Get a single post by ID
  const postById = await api.posts.get({ id: "3T2PQZlsdQtigUp4fhlb" });
  console.log("Post by ID:", postById.title);

  // Get a post by publication slug and post slug
  const postBySlugs = await api.posts.get({
    publicationSlug: "blog",
    postSlug: "coins",
  });
  console.log("Post by slugs:", postBySlugs.title);

  // Get a post with full content included
  const postWithContent = await api.posts.get(
    { publicationSlug: "blog", postSlug: "coins" },
    { includeContent: true }
  );
  console.log("Post with content:", postWithContent.title);
  console.log("Content preview:", postWithContent.json?.substring(0, 100));
}

main().catch(console.error);
