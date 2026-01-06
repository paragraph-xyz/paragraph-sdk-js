import { ParagraphAPI } from "../src";

const api = new ParagraphAPI();

async function main() {
  // Get posts from a specific publication (with pagination info)
  const { items: posts, pagination } = await api.posts.get({
    publicationId: "BMV6abfvCSUl51ErCVzd",
  });
  console.log("Posts from publication:", posts.length);
  console.log("Has more:", pagination.hasMore);
  console.log("Total:", pagination.total);

  // Get posts with pagination options
  const { items: paginatedPosts, pagination: pag } = await api.posts.get(
    { publicationId: "BMV6abfvCSUl51ErCVzd" },
    { limit: 5 }
  );
  console.log(
    "\nFirst 5 posts:",
    paginatedPosts.map((p) => p.title)
  );

  // Get next page using cursor
  if (pag.hasMore && pag.cursor) {
    console.log("\nFetching next page...");
    const { items: nextPosts, pagination: nextPag } = await api.posts.get(
      { publicationId: "BMV6abfvCSUl51ErCVzd" },
      { limit: 5, cursor: pag.cursor }
    );
    console.log(
      "Next 5 posts:",
      nextPosts.map((p) => p.title)
    );
    console.log("Has more after this page:", nextPag.hasMore);
  }

  // Get a single post by ID (use .single() to get a single object)
  const postById = await api.posts.get({ id: "3T2PQZlsdQtigUp4fhlb" }).single();
  console.log("\nPost by ID:", postById.title);

  // Get a post by publication slug and post slug
  const postBySlugs = await api.posts
    .get({
      publicationSlug: "blog",
      postSlug: "coins",
    })
    .single();
  console.log("Post by slugs:", postBySlugs.title);

  // Get a post with full content included
  const postWithContent = await api.posts
    .get({ publicationSlug: "blog", postSlug: "coins" }, { includeContent: true })
    .single();
  console.log("Post with content:", postWithContent.title);
  console.log("Content preview:", postWithContent.json?.substring(0, 100));

  // Get posts by tag
  const { items: taggedPosts, pagination: tagPag } = await api.posts.get(
    { tag: "web3" },
    { limit: 5 }
  );
  console.log("\nPosts with 'web3' tag:", taggedPosts.length);
  console.log(
    "Tagged post titles:",
    taggedPosts.map((p) => p.title)
  );
  console.log("Has more tagged posts:", tagPag.hasMore);
}

main().catch(console.error);
