import { ParagraphAPI } from "../src";

// Scheduling posts requires an API key
const api = new ParagraphAPI({ apiKey: "your-api-key" });

async function main() {
  // Create a post scheduled for 24 hours from now
  const scheduled = await api.posts.create({
    title: "Launch Announcement",
    markdown: "# We're launching tomorrow!\n\nStay tuned for the big reveal.",
    scheduledAt: Date.now() + 24 * 60 * 60 * 1000,
    sendNewsletter: true,
  });
  console.log("Scheduled post created:", scheduled.id, scheduled.status);
  // status === "scheduled"

  // Schedule an existing draft for future publication
  await api.posts.update({
    id: "existing-draft-id",
    scheduledAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week from now
  });
  console.log("Draft scheduled");

  // Cancel a scheduled publication (reverts to draft)
  await api.posts.update({
    id: scheduled.id,
    scheduledAt: null,
  });
  console.log("Schedule cancelled");
}

main().catch(console.error);
