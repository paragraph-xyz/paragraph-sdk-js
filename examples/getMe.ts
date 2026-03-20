import { ParagraphAPI } from "../src";

// Requires an API key
const api = new ParagraphAPI({ apiKey: "your-api-key" });

async function main() {
  // Get the publication associated with your API key
  const publication = await api.me.get();
  console.log("Publication name:", publication.name);
  console.log("Publication slug:", publication.slug);
  console.log("Owner user ID:", publication.ownerUserId);

  if (publication.customDomain) {
    console.log("Custom domain:", publication.customDomain);
  }

  if (publication.summary) {
    console.log("Summary:", publication.summary);
  }
}

main().catch(console.error);
