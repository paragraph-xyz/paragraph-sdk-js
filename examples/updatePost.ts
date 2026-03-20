import { ParagraphAPI } from "../src";

// Updating posts requires an API key
const api = new ParagraphAPI({ apiKey: "your-api-key" });

async function main() {
  // Update a post by ID
  await api.posts.update({
    id: "postId",
    title: "Updated Title",
    markdown: "## New content\n\nUpdated post body.",
    status: "published",
  });
  console.log("Post updated by ID");

  // Update a post by slug
  await api.posts.update({
    slug: "post-slug",
    title: "Updated Title",
    markdown: "## New content",
  });
  console.log("Post updated by slug");

  // Publish a draft
  await api.posts.update({
    id: "draft-post-id",
    status: "published",
  });
  console.log("Draft published");

  // Archive a post
  await api.posts.update({
    slug: "post-slug-to-archive",
    status: "archived",
  });
  console.log("Post archived");
}

main().catch(console.error);
