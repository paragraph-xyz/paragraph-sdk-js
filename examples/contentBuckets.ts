import { ParagraphAPI } from "../src";

// Content groups are scoped to the publication behind the API key
const api = new ParagraphAPI({ apiKey: "your-api-key" });

async function main() {
  // A content group is one identity for a post and everything made out of it.
  // Writers see it as a single stacked row under Content in the app: the post
  // first, then the thread, the LinkedIn version, the newsletter.

  // Seed the group from the post. Safe to repeat — a post that already has a
  // group gets the same id back, and nothing is written.
  const { bucketId } = await api.buckets.createForPost({ postId: "post-id" });

  // Read it first, so you don't draft a version that already exists
  const group = await api.buckets.get({ id: bucketId });
  const channels = new Set(group.members.map((member) => member.channel));

  // Then draft into it, passing the id on everything derived from the post
  if (!channels.has("tweet")) {
    await api.content.create({
      kind: "tweet",
      title: "Thread on writing in public",
      body: {
        tweets: [
          "Writing in public changes what you write.",
          "Here's what changed for me.",
        ],
      },
      bucketId,
    });
  }

  if (!channels.has("linkedin")) {
    await api.content.create({
      kind: "linkedin",
      title: "Writing in public",
      body: { text: "Writing in public changes what you write." },
      bucketId,
    });
  }

  // `kind` says where to read each member back
  const updated = await api.buckets.get({ id: bucketId });
  for (const member of updated.members) {
    console.log(member.channel, member.kind, member.id, member.status);
  }

  // Or walk every group in the publication, most recently active first
  const { items } = await api.buckets.list({ limit: 20 });
  console.log(`${items.length} groups`);
}

main().catch(console.error);
