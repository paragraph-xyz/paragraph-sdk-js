import { getParagraphAPI } from "../generated/api";
import type {
  AnalyticsQuery200,
  AnalyticsQueryBody,
  AnalyticsSchema200,
} from "../generated/models";

/**
 * Analytics resource handler.
 * Access via `api.analytics`
 *
 * Runs read-only SQL queries against your publication's analytics schema.
 * The publication is identified by the API key; Row-Level Security ensures
 * queries only see rows belonging to that publication.
 *
 * Common use cases: open rate, click-through rate, subscriber count,
 * top posts by views, engagement over time.
 */
export class AnalyticsResource {
  constructor(private api: ReturnType<typeof getParagraphAPI>) {}

  /**
   * Executes a read-only SQL query against the analytics schema for your
   * publication. The query runs in a transaction scoped to your publication —
   * you do not need to (and cannot) reference a blog id in the SQL. Requires
   * an API key.
   *
   * **SQL requirements:**
   * - `SELECT` or `WITH` (CTE) statements only
   * - Reference tables unprefixed (e.g. `FROM posts`) — the `analytics`
   *   schema is the default `search_path`
   * - No semicolons, writes, DDL, or superuser functions
   * - Hard limit of 10,000 rows; excess rows are truncated and
   *   `truncated: true` is returned
   * - 30-second statement timeout
   *
   * Call {@link AnalyticsResource.schema} first if you need to discover the
   * available tables and columns.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   *
   * // Top 5 posts by views
   * const { rows } = await api.analytics.query({
   *   sql: `
   *     SELECT title, total_views, open_rate
   *     FROM post_analytics_summary
   *     ORDER BY total_views DESC
   *     LIMIT 5
   *   `,
   * });
   * rows.forEach(r => console.log(r.title, r.total_views));
   *
   * // Subscriber count
   * const { rows: [counts] } = await api.analytics.query({
   *   sql: "SELECT active_count FROM blog_subscriber_counts",
   * });
   * console.log("Active subscribers:", counts.active_count);
   *
   * // Average open rate across the last 30 days
   * const { rows: [avg] } = await api.analytics.query({
   *   sql: `
   *     SELECT AVG(open_rate) AS avg_open_rate
   *     FROM post_analytics_summary
   *     WHERE published_at > NOW() - INTERVAL '30 days'
   *   `,
   * });
   * ```
   *
   * @param body - An object containing the SQL string.
   * @param body.sql - A `SELECT` or `WITH` query against the analytics schema.
   * @returns A promise that resolves to an object with `rows`, `rowCount`,
   * `fields` (column names), and `truncated` (whether the 10,000-row cap was hit).
   */
  query(body: AnalyticsQueryBody): Promise<AnalyticsQuery200> {
    return this.api.analyticsQuery(body);
  }

  /**
   * Returns column metadata for every table and view in the analytics schema.
   * Useful for discovering available tables and columns before writing a query.
   * Requires an API key.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   *
   * const { tables } = await api.analytics.schema();
   *
   * // Group columns by table
   * const byTable = new Map<string, string[]>();
   * for (const col of tables) {
   *   const cols = byTable.get(col.table_name) ?? [];
   *   cols.push(`${col.column_name} (${col.data_type})`);
   *   byTable.set(col.table_name, cols);
   * }
   * for (const [table, cols] of byTable) {
   *   console.log(`\n${table}:`);
   *   cols.forEach(c => console.log(`  - ${c}`));
   * }
   * ```
   *
   * @returns A promise that resolves to an object with a `tables` array,
   * where each item describes one column (`table_name`, `column_name`,
   * `data_type`, `is_nullable`).
   */
  schema(): Promise<AnalyticsSchema200> {
    return this.api.analyticsSchema();
  }
}
