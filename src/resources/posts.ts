import { getParagraphAPI } from "../generated/api";
import type {
  GetPostById200,
  GetPostsByTagParams,
  GetPostsParams,
  ListOwnPostsParams,
  UpdatePostBody,
} from "../generated/models";
import type {
  PaginatedResult,
  PostDeleteIdentifier,
  PostIdentifier,
  PostQueryOptions,
  PostUpdateIdentifier,
} from "../types";
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
   *
   * // Get posts by tag
   * const { items: taggedPosts } = await api.posts.get(
   *   { tag: "web3" },
   *   { limit: 10 }
   * );
   * ```
   *
   * @param identifier - A {@link PostIdentifier} object to specify which post(s) to retrieve.
   * @param options - Optional query parameters for pagination and content inclusion.
   * @returns A QueryResult with paginated results. Use `.single()` to get a single post.
   */
  get(
    identifier: PostIdentifier,
    options?: GetPostsParams | GetPostsByTagParams | PostQueryOptions
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

    if ("tag" in identifier) {
      return new QueryResult(
        this.api.getPostsByTag(
          identifier.tag,
          options as GetPostsByTagParams
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
   * Lists posts from your publication, with optional status filtering.
   * The publication is identified by the API key. Requires an API key.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   *
   * // List published posts (default)
   * const { items: posts, pagination } = await api.posts.list();
   *
   * // List drafts
   * const { items: drafts } = await api.posts.list({ status: "draft" });
   *
   * // Paginate with content included
   * const { items, pagination } = await api.posts.list({
   *   limit: 20,
   *   includeContent: true,
   *   status: "published"
   * });
   * ```
   *
   * @param options - Optional query parameters for pagination, content inclusion, and status filtering.
   * @returns A promise that resolves to paginated post results.
   */
  list(options?: ListOwnPostsParams): Promise<PaginatedResult<GetPostById200>> {
    return this.api.listOwnPosts(options) as Promise<
      PaginatedResult<GetPostById200>
    >;
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

  /**
   * Updates an existing post in your publication.
   * Only provided fields are updated; omitted fields remain unchanged.
   * Requires an API key.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   *
   * // Update by ID
   * await api.posts.update({
   *   id: "postId",
   *   title: "Updated Title",
   *   markdown: "## New content\n\nUpdated post body.",
   *   status: "published"
   * });
   *
   * // Update by slug
   * await api.posts.update({
   *   slug: "my-first-post",
   *   title: "Updated Title",
   *   markdown: "## New content"
   * });
   * ```
   *
   * @param params - An object containing either `id` or `slug` to identify the post, plus the fields to update.
   * @returns A promise that resolves to `{ success: true }` on success.
   */
  update(params: PostUpdateIdentifier & UpdatePostBody) {
    if ("id" in params) {
      const { id, ...body } = params;
      return this.api.updatePost(id, body);
    }

    if ("slug" in params) {
      const { slug, ...body } = params;
      return this.api.updatePostBySlug(slug, body);
    }

    throw new Error(
      "Invalid identifier provided to update. Provide either { id } or { slug }."
    );
  }

  /**
   * Permanently deletes a post from your publication.
   * This action is irreversible. Requires an API key.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   *
   * // Delete by ID
   * await api.posts.delete({ id: "postId" });
   *
   * // Delete by slug
   * await api.posts.delete({ slug: "my-first-post" });
   * ```
   *
   * @param identifier - An object containing either `id` or `slug` to identify the post to delete.
   * @returns A promise that resolves to `{ success: true }` on success.
   */
  delete(identifier: PostDeleteIdentifier) {
    if ("id" in identifier) {
      return this.api.deletePost(identifier.id, {});
    }

    if ("slug" in identifier) {
      return this.api.deletePostBySlug(identifier.slug, {});
    }

    throw new Error(
      "Invalid identifier provided to delete. Provide either { id } or { slug }."
    );
  }

  /**
   * Sends a test newsletter email for a draft post to the publication owner's email.
   * Useful for previewing how a post will look as a newsletter before publishing.
   * Only works for draft posts. Requires an API key.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   * await api.posts.sendTestEmail({ id: "postId" });
   * ```
   *
   * @param identifier - An object containing the post `id`.
   * @returns A promise that resolves to `{ success: true }` on success.
   */
  sendTestEmail(identifier: { id: string }) {
    return this.api.sendTestEmail(identifier.id, {});
  }
}
