import { ParagraphAPI } from "../src";

/**
 * This example demonstrates how to use multiple ParagraphAPI instances
 * with different API keys. Each instance maintains its own authentication
 * context, so they don't interfere with each other.
 *
 * This is useful when you need to:
 * - Manage multiple publications from the same application
 * - Use different credentials for different operations
 * - Build multi-tenant applications
 */

async function main() {
  // Create an unauthenticated instance for public read operations
  const publicApi = new ParagraphAPI();

  // Create authenticated instances for different publications
  const publication1Api = new ParagraphAPI({
    apiKey: "api-key-for-publication-1",
  });
  const publication2Api = new ParagraphAPI({
    apiKey: "api-key-for-publication-2",
  });

  // Public operations work without an API key
  const { items: feedItems } = await publicApi.feed.get();
  console.log("Public feed posts:", feedItems.length);

  // Each authenticated instance uses its own API key
  // Posts created with publication1Api go to publication 1
  // const post1 = await publication1Api.posts.create({
  //   title: "Post for Publication 1",
  //   markdown: "# Hello from Publication 1",
  // });

  // Posts created with publication2Api go to publication 2
  // const post2 = await publication2Api.posts.create({
  //   title: "Post for Publication 2",
  //   markdown: "# Hello from Publication 2",
  // });

  // Subscribers added with different instances go to different publications
  // await publication1Api.subscribers.create({ email: "user@pub1.com" });
  // await publication2Api.subscribers.create({ email: "user@pub2.com" });

  console.log("Multiple instances work independently!");
}

main().catch(console.error);
