/**
 * Basic Example: Getting a Post by Slug
 *
 * This example demonstrates the simplest way to use the Paragraph SDK
 * to fetch a single post using the publication and post slugs.
 *
 * No API key is required for reading public posts.
 *
 * @example Run this example:
 * ```bash
 * npx ts-node examples/index.ts
 * ```
 */

import { ParagraphAPI } from "../src";

// Create an API instance (no API key needed for public read operations)
const api = new ParagraphAPI();

async function main() {
  // Fetch a post by publication slug and post slug
  // The slugs are the URL-friendly identifiers you see in the browser:
  // https://paragraph.xyz/@blog/coins -> publicationSlug: "blog", postSlug: "coins"
  // Use .single() to get a single post from the result
  const post = await api.posts
    .get({ publicationSlug: "blog", postSlug: "coins" }, { includeContent: true })
    .single();

  console.log("Post title:", post.title);
  console.log("Post subtitle:", post.subtitle);
  console.log("Published at:", post.publishedAt);

  // The content is available when includeContent is true
  if (post.markdown) {
    console.log("Markdown preview:", post.markdown.substring(0, 200) + "...");
  }
}

main().catch(console.error);

