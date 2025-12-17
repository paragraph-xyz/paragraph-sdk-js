import { ParagraphAPI } from "../src";

const api = new ParagraphAPI();

async function main() {
  // Get publication by its unique ID (use .single() to get a single object)
  const pubById = await api.publications.get({ id: "BMV6abfvCSUl51ErCVzd" }).single();
  console.log("Publication by ID:", pubById.name);

  // Get publication by its URL-friendly slug
  const pubBySlug = await api.publications.get({ slug: "blog" }).single();
  console.log("Publication by slug:", pubBySlug.name);

  // Get publication by its custom domain (if configured)
  // const pubByDomain = await api.publications.get({ domain: "blog.mydomain.com" }).single();
  // console.log("Publication by domain:", pubByDomain.name);

  // Or get the full paginated result
  const { items, pagination } = await api.publications.get({ slug: "blog" });
  console.log("Publication from paginated result:", items[0].name);
  console.log("Has more:", pagination.hasMore);

  // Get subscriber count for a publication
  const subscriberCount = await api.subscribers.getCount({ id: pubById.id });
  console.log("Subscriber count:", subscriberCount.count);
}

main().catch(console.error);
