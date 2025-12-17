import { getParagraphAPI } from "../generated/api";
import type { GetPostById200, GetPostsParams } from "../generated/models";
import type { PaginatedResult, PostIdentifier, PostQueryOptions } from "../types";
import { QueryResult, singleItemResult } from "../utils";

/**
 * Posts resource handler.
 * Access via `api.posts`
 */
export class PostsResource {
  constructor(private api: ReturnType<typeof getParagraphAPI>) {}

  /**
   * Retrieves posts using one of several unique identifiers.
   *
   * All queries return a QueryResult with paginated results. Use `.single()` to get a single post.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI();
   *
   * // Get a paginated list of posts from a publication
   * const { items: posts, pagination } = await api.posts.get(
   *   { publicationId: "BMV6abfvCSUl51ErCVzd" },
   *   { limit: 10 }
   * );
   * posts.forEach(post => console.log(post.title));
   *
   * // Paginate through results
   * if (pagination.hasMore && pagination.cursor) {
   *   const nextPage = await api.posts.get(
   *     { publicationId: "BMV6abfvCSUl51ErCVzd" },
   *     { cursor: pagination.cursor }
   *   );
   * }
   *
   * // Get a single post by ID
   * const post = await api.posts.get({ id: "3T2PQZlsdQtigUp4fhlb" }).single();
   *
   * // Get a single post by publication slug and post slug
   * const postBySlugs = await api.posts.get({
   *   publicationSlug: "blog",
   *   postSlug: "my-first-post"
   * }).single();
   *
   * // Include full content
   * const postWithContent = await api.posts.get(
   *   { id: "3T2PQZlsdQtigUp4fhlb" },
   *   { includeContent: true }
   * ).single();
   * ```
   *
   * @param identifier - A {@link PostIdentifier} object to specify which post(s) to retrieve.
   * @param options - Optional query parameters for pagination and content inclusion.
   * @returns A QueryResult with paginated results. Use `.single()` to get a single post.
   */
  get(
    identifier: PostIdentifier,
    options?: GetPostsParams | PostQueryOptions
  ): QueryResult<GetPostById200> {
    // If only publicationId is provided (no postSlug), get list of posts with pagination
    if ("publicationId" in identifier && !("postSlug" in identifier)) {
      return new QueryResult(
        this.api.getPosts(
          identifier.publicationId,
          options as GetPostsParams
        ) as Promise<PaginatedResult<GetPostById200>>
      );
    }

    if ("id" in identifier) {
      return new QueryResult(
        this.api
          .getPostById(identifier.id, options as PostQueryOptions)
          .then(singleItemResult)
      );
    }

    if ("publicationId" in identifier && "postSlug" in identifier) {
      return new QueryResult(
        this.api
          .getPostByPublicationIdAndPostSlug(
            identifier.publicationId,
            identifier.postSlug,
            options as PostQueryOptions
          )
          .then(singleItemResult)
      );
    }

    if ("publicationSlug" in identifier) {
      return new QueryResult(
        this.api
          .getPostByPublicationSlugAndPostSlug(
            identifier.publicationSlug,
            identifier.postSlug,
            options as PostQueryOptions
          )
          .then(singleItemResult)
      );
    }

    throw new Error("Invalid identifier provided to get.");
  }

  /**
   * Creates a new post in the publication associated with the API key.
   * Requires an API key.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   *
   * // Create a basic post
   * const post = await api.posts.create({
   *   title: "My First Post",
   *   markdown: "# Hello World\n\nThis is my first post!"
   * });
   *
   * // Create a post with all options
   * const fullPost = await api.posts.create({
   *   title: "My Full Post",
   *   markdown: "# Content\n\nPost content here...",
   *   subtitle: "A brief summary",
   *   imageUrl: "https://example.com/cover.jpg",
   *   slug: "my-full-post",
   *   postPreview: "Preview text...",
   *   categories: ["tech", "tutorial"],
   *   sendNewsletter: true
   * });
   * ```
   *
   * @param body - The post data including title and markdown content.
   * @returns A promise that resolves to the created post data.
   */
  create(
    body: Parameters<ReturnType<typeof getParagraphAPI>["createPost"]>[0]
  ) {
    return this.api.createPost(body);
  }
}
