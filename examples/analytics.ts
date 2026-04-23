import { ParagraphAPI } from "../src";

// Analytics queries require an API key — queries run scoped to your publication
const api = new ParagraphAPI({ apiKey: "your-api-key" });

async function main() {
  // Discover available tables and columns
  const { tables } = await api.analytics.schema();
  console.log(`Analytics schema has ${tables.length} columns`);

  const byTable = new Map<string, string[]>();
  for (const col of tables) {
    const cols = byTable.get(col.table_name) ?? [];
    cols.push(col.column_name);
    byTable.set(col.table_name, cols);
  }
  for (const [table, cols] of byTable) {
    console.log(`  ${table}: ${cols.slice(0, 5).join(", ")}...`);
  }

  // Top 5 posts by views, with their open rates
  const { rows: topPosts } = await api.analytics.query({
    sql: `
      SELECT title, total_views, open_rate
      FROM post_analytics_summary
      ORDER BY total_views DESC
      LIMIT 5
    `,
  });
  console.log("\nTop posts:");
  topPosts.forEach((post) => {
    console.log(`  ${post.title} — ${post.total_views} views`);
  });

  // Current active subscriber count (single-row view)
  const {
    rows: [subs],
  } = await api.analytics.query({
    sql: "SELECT active_count FROM blog_subscriber_counts",
  });
  console.log("\nActive subscribers:", subs?.active_count ?? 0);

  // Average open rate over the last 30 days
  const {
    rows: [avg],
  } = await api.analytics.query({
    sql: `
      SELECT AVG(open_rate) AS avg_open_rate
      FROM post_analytics_summary
      WHERE published_at > NOW() - INTERVAL '30 days'
    `,
  });
  console.log("30-day avg open rate:", avg?.avg_open_rate);
}

main().catch(console.error);
