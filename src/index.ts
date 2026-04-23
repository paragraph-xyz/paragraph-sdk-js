// src/index.ts - public entry
import { getParagraphAPI } from "./generated/api";
import { setCurrentApiKey } from "./mutator/custom-axios";
import { wrapAPIWithAuth } from "./utils";
import {
  AnalyticsResource,
  AuthResource,
  CoinsResource,
  FeedResource,
  MeResource,
  PostsResource,
  PublicationsResource,
  SearchResource,
  SubscribersResource,
  UsersResource,
} from "./resources";
import type { ParagraphAPIOptions } from "./types";

/**
 * Paragraph API class wrapper.
 *
 * Entrypoint into all Paragraph API functionality.
 * All get() methods return a QueryResult with paginated results.
 * Use `.single()` to get a single item, or await directly to get `{ items, pagination }`.
 *
 * @example
 * ```ts
 * // For public endpoints (no API key required)
 * const api = new ParagraphAPI();
 *
 * // For protected endpoints (API key required)
 * const apiWithAuth = new ParagraphAPI({ apiKey: "your-api-key" });
 *
 * // Publications (use .single() for single object)
 * const pub = await api.publications.get({ id: "publicationId" }).single();
 * const pubBySlug = await api.publications.get({ slug: "@blog" }).single();
 *
 * // Posts (paginated list or use .single() for single post)
 * const { items: posts, pagination } = await api.posts.get({ publicationId: "publicationId" });
 * const post = await api.posts.get({ id: "postId" }).single();
 * // Creating posts requires an API key
 * const newPost = await apiWithAuth.posts.create({ title: "My Post", markdown: "# Hello" });
 * // List your own posts (requires API key)
 * const { items: drafts } = await apiWithAuth.posts.list({ status: "draft" });
 * // Update a post (requires API key)
 * await apiWithAuth.posts.update({ id: "postId", title: "Updated Title" });
 * // Delete a post (requires API key)
 * await apiWithAuth.posts.delete({ id: "postId" });
 *
 * // Me - get your authenticated publication (requires API key)
 * const myPub = await apiWithAuth.me.get();
 *
 * // Feed (paginated)
 * const { items: feedItems, pagination: feedPag } = await api.feed.get();
 *
 * // Users (use .single() for single object)
 * const user = await api.users.get({ id: "userId" }).single();
 * const userByWallet = await api.users.get({ wallet: "0x1234..." }).single();
 *
 * // Subscribers (get and mutations require an API key)
 * const { items: subscribers, pagination: subPag } = await apiWithAuth.subscribers.get();
 * const count = await api.subscribers.getCount({ id: "publicationId" });
 * await apiWithAuth.subscribers.create({ email: "user@example.com" });
 *
 * // Coins (use .single() for single coin)
 * const coin = await api.coins.get({ id: "coinId" }).single();
 * const { items: popular } = await api.coins.get({ sortBy: "popular" });
 *
 * // Search
 * const posts = await api.search.posts("ethereum");
 * const coins = await api.search.coins("test");
 * const blogs = await api.search.blogs("crypto");
 *
 * // Analytics - SQL queries against your publication's analytics schema (requires API key)
 * const { rows } = await apiWithAuth.analytics.query({
 *   sql: "SELECT title, open_rate FROM post_analytics_summary ORDER BY total_views DESC LIMIT 5",
 * });
 * const { tables } = await apiWithAuth.analytics.schema();
 *
 * // Auth - browser-based auth sessions for CLI/API clients
 * const session = await api.auth.createSession({ deviceName: "my-cli" });
 * console.log("Open this URL:", session.verificationUrl);
 * const status = await api.auth.getSession(session.sessionId);
 * ```
 */
export class ParagraphAPI {
  private api: ReturnType<typeof getParagraphAPI>;

  /** The API key for this instance */
  private apiKey: string | undefined;

  /** Analytics resource - SQL queries against your publication's analytics schema */
  public readonly analytics: AnalyticsResource;

  /** Auth resource - browser-based auth sessions */
  public readonly auth: AuthResource;

  /** Publications resource */
  public readonly publications: PublicationsResource;

  /** Subscribers resource */
  public readonly subscribers: SubscribersResource;

  /** Posts resource */
  public readonly posts: PostsResource;

  /** Feed resource */
  public readonly feed: FeedResource;

  /** Users resource */
  public readonly users: UsersResource;

  /** Coins resource */
  public readonly coins: CoinsResource;

  /** Search resource */
  public readonly search: SearchResource;

  /** Me resource - authenticated publication info */
  public readonly me: MeResource;

  /**
   * Initializes a new instance of the Paragraph API client.
   * Each instance has its own isolated authentication context, allowing
   * multiple instances with different API keys to coexist.
   *
   * @param options - Optional configuration options.
   * @param options.apiKey - API key for authenticating protected endpoints.
   */
  constructor(options?: ParagraphAPIOptions) {
    this.apiKey = options?.apiKey;
    // Wrap the API to set the current API key context before each call
    this.api = wrapAPIWithAuth(getParagraphAPI(), this.apiKey, setCurrentApiKey);

    this.analytics = new AnalyticsResource(this.api);
    this.auth = new AuthResource(this.api);
    this.publications = new PublicationsResource(this.api);
    this.subscribers = new SubscribersResource(this.api);
    this.posts = new PostsResource(this.api);
    this.feed = new FeedResource(this.api);
    this.users = new UsersResource(this.api);
    this.coins = new CoinsResource(this.api);
    this.search = new SearchResource(this.api);
    this.me = new MeResource(this.api);
  }
}

/**
 * Optional factory function to create an instance of the API client.
 *
 * @remarks
 * This function is tree-shakeable.
 *
 * @param options - Optional configuration options.
 * @returns A new instance of the {@link ParagraphAPI}.
 */
export const createParagraphAPI = (options?: ParagraphAPIOptions) =>
  new ParagraphAPI(options);

// Re-export types for consumers
export * from "./types";
export { QueryResult } from "./utils";
export { ParagraphApiError } from "./mutator/custom-axios";

// Re-export generated types for consumers
export * from "./generated/models";
