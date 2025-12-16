import { ParagraphAPI } from "../src";

// Creating posts requires an API key
// Get your API key from your Paragraph publication settings
const api = new ParagraphAPI({ apiKey: "your-api-key" });

async function main() {
  // Create a basic post
  const basicPost = await api.posts.create({
    title: "My First Post",
    markdown: "# Hello World\n\nThis is my first post created via the SDK!",
  });
  console.log("Created basic post:", basicPost.id, basicPost.slug);

  // Create a post with all options
  const fullPost = await api.posts.create({
    title: "My Full Post",
    markdown: `
# Welcome to My Blog

This is a comprehensive post with all the bells and whistles.

## Section 1

Some content here...

## Section 2

More content here...
    `.trim(),
    subtitle: "A comprehensive guide to using the Paragraph SDK",
    slug: "my-full-post", // Custom URL slug
    imageUrl: "https://example.com/cover-image.jpg", // Cover image
    postPreview: "Learn how to use the Paragraph SDK to create amazing posts...",
    categories: ["tutorial", "sdk", "development"],
    sendNewsletter: false, // Set to true to email subscribers
  });
  console.log("Created full post:", fullPost.id, fullPost.slug);
}

main().catch(console.error);
