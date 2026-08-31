import { getParagraphAPI } from "../generated/api";
import type {
  CreatePostContentBucket200,
  GetContentBucketById200,
  GetPostContentBucket200,
  ListContentBuckets200,
  ListContentBucketsParams,
} from "../generated/models";
import type {
  ContentBucketIdentifier,
  PostBucketIdentifier,
} from "../types";

/**
 * Content groups resource handler.
 * Access via `api.buckets`
 *
 * A group is one identity for a post and everything made out of it — the post,
 * the X thread drawn from it, the LinkedIn version, the newsletter. It's what
 * a writer sees as a single stacked row under Content in the Paragraph app.
 *
 * Seed a group from the post with `createForPost()`, then pass the id as
 * `bucketId` on every `api.content.create()` derived from it. Taking a piece
 * back out of a group is done in the app.
 */
export class BucketsResource {
  constructor(private api: ReturnType<typeof getParagraphAPI>) {}

  /**
   * Lists the content groups in your publication, most recently active first.
   * The publication is identified by the API key. Requires an API key.
   *
   * Each group lists its members in display order, with the post it was seeded
   * from first. Bodies aren't included — read a member with `api.content.get()`
   * or `api.posts.get()`.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   *
   * const { items, pagination } = await api.buckets.list({ limit: 20 });
   *
   * for (const group of items) {
   *   const channels = group.members.map((m) => m.channel).join(", ");
   *   console.log(group.title, "→", channels);
   * }
   *
   * if (pagination.hasMore && pagination.cursor) {
   *   const next = await api.buckets.list({ cursor: pagination.cursor });
   * }
   * ```
   *
   * @param options - Optional pagination parameters.
   * @param options.cursor - Cursor for pagination.
   * @param options.limit - Maximum number of groups to return (1–50, default: 20).
   * @returns A promise that resolves to a paginated list of groups, each with
   * its members.
   */
  list(options?: ListContentBucketsParams): Promise<ListContentBuckets200> {
    return this.api.listContentBuckets(options);
  }

  /**
   * Retrieves one content group with its members.
   * Requires an API key.
   *
   * Read it before adding to it, so you don't draft a version that already
   * exists. Each member's `kind` says where to read it: `post` fetches with
   * `api.posts.get({ id })`, `content` with `api.content.get({ id })`, and
   * `other` isn't fetchable through this API.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   *
   * const group = await api.buckets.get({ id: "bucketId" });
   * const hasThread = group.members.some((m) => m.channel === "tweet");
   * ```
   *
   * @param identifier - An object containing the group `id`.
   * @returns A promise that resolves to the group, with its members.
   */
  get({ id }: ContentBucketIdentifier): Promise<GetContentBucketById200> {
    return this.api.getContentBucketById(id);
  }

  /**
   * Finds the group a post belongs to, without creating one.
   * Requires an API key.
   *
   * Answers `{ bucketId: null }` when nothing has been made from the post yet.
   * To attach something, call `createForPost()` instead.
   *
   * A post you've reopened for editing resolves to the live post's group, so a
   * draft id and its published id give the same answer.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   *
   * const { bucketId } = await api.buckets.forPost({ postId: "postId" });
   * if (bucketId === null) console.log("Nothing made from this post yet");
   * ```
   *
   * @param identifier - An object containing the `postId`.
   * @returns A promise that resolves to the group id, or null.
   */
  forPost({ postId }: PostBucketIdentifier): Promise<GetPostContentBucket200> {
    return this.api.getPostContentBucket(postId);
  }

  /**
   * Gets the group a post belongs to, creating it if this is the first thing
   * made from that post. Requires an API key.
   *
   * This is the first call in a repurposing pipeline: seed the group from the
   * post, then pass the id as `bucketId` on everything you draft from it.
   *
   * Safe to call repeatedly — a post that already has a group gets the same id
   * back, and nothing is written.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   *
   * const { bucketId } = await api.buckets.createForPost({ postId: "postId" });
   *
   * await api.content.create({
   *   kind: "tweet",
   *   title: "Thread on writing in public",
   *   body: { tweets: ["Writing in public changes what you write."] },
   *   bucketId,
   * });
   * ```
   *
   * @param identifier - An object containing the `postId`.
   * @returns A promise that resolves to the group id.
   */
  createForPost({
    postId,
  }: PostBucketIdentifier): Promise<CreatePostContentBucket200> {
    return this.api.createPostContentBucket(postId, {});
  }
}
