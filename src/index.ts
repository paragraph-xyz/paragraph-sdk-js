// src/index.ts - public entry
import { getParagraphAPI } from "./generated/api";
import { setCurrentApiKey } from "./mutator/custom-axios";
import { wrapAPIWithAuth } from "./utils";
import {
  CoinsResource,
  FeedResource,
  PostsResource,
  PublicationsResource,
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
 * ```
 */
export class ParagraphAPI {
  private api: ReturnType<typeof getParagraphAPI>;

  /** The API key for this instance */
  private apiKey: string | undefined;

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

    this.publications = new PublicationsResource(this.api);
    this.subscribers = new SubscribersResource(this.api);
    this.posts = new PostsResource(this.api);
    this.feed = new FeedResource(this.api);
    this.users = new UsersResource(this.api);
    this.coins = new CoinsResource(this.api);
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

// Re-export generated types for consumers
export * from "./generated/models";
