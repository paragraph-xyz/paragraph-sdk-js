import { ParagraphAPI } from "../src";

// Updating publication settings requires an API key
// The publicationId must match the publication that owns the API key
const api = new ParagraphAPI({ apiKey: "your-api-key" });

const publicationId = "your-publication-id";

async function main() {
  // Update display name, summary, and theming
  await api.publications.update(publicationId, {
    name: "My Blog",
    summary: "Notes on writing, building, and shipping.",
    themeColor: "purple-600",
    headerFont: "serif",
    bodyFont: "default",
  });
  console.log("Updated name and theme");

  // Set a featured post.
  // Use a specific post ID, or one of: "latest", "popular", "disabled".
  // If you pass an ID, the post must belong to this publication.
  await api.publications.update(publicationId, {
    featuredPost: "latest",
  });
  console.log("Featured post set");

  // Pin posts to the top of the homepage.
  // Each ID must belong to this publication. Replaces the existing pinned list.
  // Maximum 50 IDs.
  await api.publications.update(publicationId, {
    pinnedPostIds: ["postId1", "postId2", "postId3"],
  });
  console.log("Pinned posts updated");

  // Email notifications are merged onto existing settings —
  // only the toggles you send are changed.
  await api.publications.update(publicationId, {
    emailNotifications: {
      newSubscriber: true,
      newComment: false,
    },
  });
  console.log("Email notification preferences updated");

  // Comment visibility:
  // - true: disable all comments
  // - false: enable comments
  // - "on-platform": hide on-Paragraph comments while keeping Farcaster comments
  await api.publications.update(publicationId, {
    disableComments: "on-platform",
  });
  console.log("Comment visibility updated");
}

main().catch(console.error);
