import { getParagraphAPI } from "../generated/api";
import type { GetPostsFeed200ItemsItem, GetPostsFeedParams } from "../generated/models";
import type { PaginatedResult } from "../types";
import { QueryResult } from "../utils";

/**
 * Feed resource handler.
 * Access via `api.feed`
 */
export class FeedResource {
  constructor(private api: ReturnType<typeof getParagraphAPI>) {}

  /**
   * Retrieves the curated feed of posts from across the platform.
   * Returns a QueryResult with paginated feed items and pagination info.
   * Each item contains post data along with publication and user information.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI();
   *
   * // Get the curated feed with pagination info
   * const { items: feedItems, pagination } = await api.feed.get();
   * feedItems.forEach(item => {
   *   console.log(item.post.title);
   *   console.log(item.publication.name);
   *   console.log(item.user.name);
   * });
   *
   * // Paginate through results
   * if (pagination.hasMore && pagination.cursor) {
   *   const nextPage = await api.feed.get({ cursor: pagination.cursor });
   * }
   *
   * // With custom limit
   * const { items, pagination: pagInfo } = await api.feed.get({ limit: 10 });
   * ```
   *
   * @param options - Optional parameters for pagination and content inclusion.
   * @returns A QueryResult with paginated feed items and pagination info.
   */
  get(options?: GetPostsFeedParams): QueryResult<GetPostsFeed200ItemsItem> {
    return new QueryResult(
      this.api.getPostsFeed(options) as Promise<PaginatedResult<GetPostsFeed200ItemsItem>>
    );
  }
}
