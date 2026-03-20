import { ParagraphAPI } from "../src";

// Updating posts requires an API key
const api = new ParagraphAPI({ apiKey: "your-api-key" });

async function main() {
  // Update a post by ID
  await api.posts.update({
    id: "3T2PQZlsdQtigUp4fhlb",
    title: "Updated Title",
    markdown: "## New content\n\nUpdated post body.",
    status: "published",
  });
  console.log("Post updated by ID");

  // Update a post by slug
  await api.posts.update({
    slug: "my-first-post",
    title: "Updated Title",
    markdown: "## New content",
  });
  console.log("Post updated by slug");

  // Publish a draft
  await api.posts.update({
    id: "draftPostId",
    status: "published",
  });
  console.log("Draft published");

  // Archive a post
  await api.posts.update({
    slug: "old-post",
    status: "archived",
  });
  console.log("Post archived");
}

main().catch(console.error);
