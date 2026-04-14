import { ParagraphAPI } from "../src";

// Sending test emails requires an API key
const api = new ParagraphAPI({ apiKey: "your-api-key" });

async function main() {
  // Send a test newsletter email for a draft post
  // The email is sent to the publication owner's email address
  // Only works for draft (unpublished) posts
  await api.posts.sendTestEmail({ id: "draft-post-id" });
  console.log("Test email sent");
}

main().catch(console.error);
