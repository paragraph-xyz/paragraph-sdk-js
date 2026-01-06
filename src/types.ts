import { getParagraphAPI } from "./generated/api";

/**
 * Configuration options for the Paragraph API client.
 */
export interface ParagraphAPIOptions {
  /**
   * API key for authenticating protected endpoints.
   * Required for creating posts, adding subscribers, and importing subscribers.
   * Obtain an API key from your Paragraph publication settings.
   */
  apiKey?: string;
}

/**
 * Pagination information for paginated results.
 */
export interface Pagination {
  /** Cursor for fetching the next page of results */
  cursor?: string;
  /** Whether more results are available */
  hasMore: boolean;
  /** Total number of items available */
  total?: number;
}

/**
 * Result type for paginated queries, containing both items and pagination info.
 */
export interface PaginatedResult<T> {
  /** Array of items in this page */
  items: T[];
  /** Pagination information */
  pagination: Pagination;
}

/**
 * A discriminated union of identifiers for retrieving a single publication.
 * Use one of the following shapes:
 * - `{ id: string }` to get a publication by its unique ID.
 * - `{ slug: string }` to get a publication by its URL-friendly slug.
 * - `{ domain: string }` to get a publication by its custom domain.
 */
export type PublicationIdentifier =
  | { id: string }
  | { slug: string }
  | { domain: string };

/**
 * Identifier for getting a single post by ID.
 */
export type PostIdIdentifier = { id: string };

/**
 * Identifier for getting a single post by publication ID and post slug.
 */
export type PostByPubIdAndSlugIdentifier = {
  publicationId: string;
  postSlug: string;
};

/**
 * Identifier for getting a single post by publication slug and post slug.
 */
export type PostByPubSlugAndSlugIdentifier = {
  publicationSlug: string;
  postSlug: string;
};

/**
 * Identifier for getting a list of posts from a publication.
 */
export type PostsByPublicationIdIdentifier = { publicationId: string };

/**
 * Identifier for getting a list of posts by tag.
 */
export type PostsByTagIdentifier = { tag: string };

/**
 * A discriminated union of identifiers for retrieving posts.
 * Use one of the following shapes:
 * - `{ id: string }` to get a post by its unique ID (returns single post in array).
 * - `{ publicationId: string; postSlug: string }` to get a post by its slug within a known publication ID (returns single post in array).
 * - `{ publicationSlug: string; postSlug: string }` to get a post by both the publication's and post's slugs (returns single post in array).
 * - `{ publicationId: string }` to get a list of posts from a publication (returns multiple posts).
 * - `{ tag: string }` to get a list of posts with a specific tag (returns multiple posts).
 */
export type PostIdentifier =
  | PostIdIdentifier
  | PostByPubIdAndSlugIdentifier
  | PostByPubSlugAndSlugIdentifier
  | PostsByPublicationIdIdentifier
  | PostsByTagIdentifier;

/**
 * A discriminated union of identifiers for retrieving a single user.
 * Use one of the following shapes:
 * - `{ id: string }` to get a user by their unique ID.
 * - `{ wallet: string }` to get a user by their Ethereum wallet address.
 */
export type UserIdentifier = { id: string } | { wallet: string };

/**
 * Identifier for getting a single coin by ID.
 */
export type CoinIdIdentifier = { id: string };

/**
 * Identifier for getting a single coin by contract address.
 */
export type CoinByContractIdentifier = { contractAddress: string };

/**
 * Identifier for getting a list of popular coins.
 */
export type CoinPopularIdentifier = { sortBy: "popular" };

/**
 * Identifier for a single coin (by ID or contract address).
 * Used for operations that require a specific coin.
 */
export type SingleCoinIdentifier = CoinIdIdentifier | CoinByContractIdentifier;

/**
 * A discriminated union of identifiers for retrieving coins.
 * Use one of the following shapes:
 * - `{ id: string }` to get a coin by its unique ID (returns single coin in array).
 * - `{ contractAddress: string }` to get a coin by its on-chain contract address (returns single coin in array).
 * - `{ sortBy: "popular" }` to get the most popular coins (returns multiple coins).
 */
export type CoinIdentifier = SingleCoinIdentifier | CoinPopularIdentifier;

/**
 * Type helper to extract the query options for getting a post.
 * It correctly infers the type from the generated API client's method signature,
 * ensuring the types are always in sync.
 */
export type PostQueryOptions = Parameters<
  ReturnType<typeof getParagraphAPI>["getPostById"]
>[1];
