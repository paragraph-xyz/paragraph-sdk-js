import { ParagraphAPI } from "../src";

// Deleting posts requires an API key
const api = new ParagraphAPI({ apiKey: "your-api-key" });

async function main() {
  // Delete a post by ID
  await api.posts.delete({ id: "postId" });
  console.log("Post deleted by ID");

  // Delete a post by slug
  await api.posts.delete({ slug: "post-slug" });
  console.log("Post deleted by slug");
}

main().catch(console.error);
