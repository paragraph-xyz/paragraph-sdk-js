import { getParagraphAPI } from "../generated/api";
import type { SearchPosts200Item } from "../generated/models/searchPosts200Item";
import type { SearchCoins200Item } from "../generated/models/searchCoins200Item";
import type { SearchBlogs200Item } from "../generated/models/searchBlogs200Item";

/**
 * Search resource handler.
 * Access via `api.search`
 */
export class SearchResource {
  constructor(private api: ReturnType<typeof getParagraphAPI>) {}

  /**
   * Searches for posts across the platform.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI();
   *
   * const posts = await api.search.posts("ethereum");
   * posts.forEach(result => {
   *   console.log(result.note.title);
   *   console.log(result.blog.name);
   * });
   * ```
   *
   * @param query - The search query string.
   * @returns A promise that resolves to an array of post search results.
   */
  posts(query: string): Promise<SearchPosts200Item[]> {
    return this.api.searchPosts({ q: query });
  }

  /**
   * Searches for coins across the platform.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI();
   *
   * const coins = await api.search.coins("test");
   * coins.forEach(result => {
   *   console.log(result.coin.ticker);
   *   console.log(result.blog.name);
   * });
   * ```
   *
   * @param query - The search query string.
   * @returns A promise that resolves to an array of coin search results.
   */
  coins(query: string): Promise<SearchCoins200Item[]> {
    return this.api.searchCoins({ q: query });
  }

  /**
   * Searches for blogs across the platform.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI();
   *
   * const blogs = await api.search.blogs("crypto");
   * blogs.forEach(result => {
   *   console.log(result.blog.name);
   *   console.log(result.activeSubscriberCount);
   * });
   * ```
   *
   * @param query - The search query string.
   * @returns A promise that resolves to an array of blog search results.
   */
  blogs(query: string): Promise<SearchBlogs200Item[]> {
    return this.api.searchBlogs({ q: query });
  }
}
