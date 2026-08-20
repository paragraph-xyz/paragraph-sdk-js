import { getParagraphAPI } from "../generated/api";
import type {
  ArchiveContent200,
  CreateContent200,
  CreateContentBody,
  GetContentById200,
  ListContent200,
  ListContentParams,
  RestoreContent200,
  UpdateContent200,
  UpdateContentBody,
} from "../generated/models";
import type { ContentIdentifier } from "../types";

/**
 * Content resource handler.
 * Access via `api.content`
 *
 * The short-form library of a publication: X posts and threads, LinkedIn
 * posts, one-off emails, and X Articles. Everything here is a draft —
 * creating or editing a piece never posts, emails, or schedules it, so a
 * draft you upload can't go out without you. Sending happens in the
 * Paragraph app.
 *
 * Long-form Paragraph posts are a different resource — use `api.posts` for
 * those.
 */
export class ContentResource {
  constructor(private api: ReturnType<typeof getParagraphAPI>) {}

  /**
   * Saves a finished piece of short-form content to your publication's
   * library, where it shows up in the Paragraph app under Content.
   * Requires an API key.
   *
   * **The body:** `body` carries the artifact itself, in the shape its kind
   * uses:
   * - `tweet` — `text` for a single post, or `tweets` for a thread (never
   *   both), each entry at most 280 characters.
   * - `linkedin` — `text`.
   * - `newsletter` — `subject`, `body`, and an optional `preheader`.
   * - `x_article` — `title` (the headline X publishes), `body` as CommonMark
   *   markdown, and an optional `canonicalUrl`.
   *
   * It's validated the same way the Paragraph app validates it, so a thread
   * over 280 characters an entry, or an Article missing its headline, comes
   * back with the same explanation you'd see in the app.
   *
   * **Text only:** media has to be uploaded to X or LinkedIn first, which the
   * API can't do yet. Add images to the draft in the app.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   *
   * // Draft an X thread
   * const thread = await api.content.create({
   *   kind: "tweet",
   *   title: "Thread on writing in public",
   *   body: {
   *     tweets: [
   *       "Writing in public changes what you write.",
   *       "Here's what changed for me.",
   *     ],
   *   },
   * });
   *
   * // Draft a newsletter
   * const newsletter = await api.content.create({
   *   kind: "newsletter",
   *   title: "October update",
   *   body: { subject: "What we shipped in October", body: "Hi everyone," },
   * });
   *
   * // Draft a LinkedIn post
   * const linkedin = await api.content.create({
   *   kind: "linkedin",
   *   title: "Launch note",
   *   body: { text: "We shipped it." },
   * });
   * ```
   *
   * @param body - The piece to save.
   * @param body.kind - `tweet`, `linkedin`, `newsletter`, or `x_article`.
   * @param body.title - What the piece is called in your library (1–200
   * characters). Not published anywhere — for an X Article headline, use
   * `body.title`.
   * @param body.body - The artifact itself, in the shape this kind uses.
   * @returns A promise that resolves to the created draft, with its body.
   */
  create(body: CreateContentBody): Promise<CreateContent200> {
    return this.api.createContent(body);
  }

  /**
   * Lists the short-form content in your publication's library, newest
   * activity first. The publication is identified by the API key.
   * Requires an API key.
   *
   * `status` defaults to `all`, which is everything except the pieces you've
   * archived — a piece that was delivered stays listed whether or not it was
   * archived afterwards.
   *
   * Bodies aren't included; call `get()` to read one.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   *
   * // List everything in the library
   * const { items, pagination } = await api.content.list();
   *
   * // List drafted X posts
   * const { items: drafts } = await api.content.list({
   *   kind: "tweet",
   *   status: "draft",
   * });
   *
   * // Paginate through results
   * if (pagination.hasMore && pagination.cursor) {
   *   const nextPage = await api.content.list({ cursor: pagination.cursor });
   * }
   * ```
   *
   * @param options - Optional filters and pagination parameters.
   * @param options.kind - Filter by kind: `tweet`, `linkedin`, `newsletter`,
   * or `x_article`.
   * @param options.status - Filter by lifecycle: `all` (default), `draft`,
   * `published`, or `archived`.
   * @param options.cursor - Cursor for pagination.
   * @param options.limit - Maximum number of items to return (1–50, default: 20).
   * @returns A promise that resolves to a paginated list of content, without
   * bodies.
   */
  list(options?: ListContentParams): Promise<ListContent200> {
    return this.api.listContent(options);
  }

  /**
   * Retrieves one piece of content with its body. Read it before editing so
   * you rewrite what's actually saved — the draft may have changed in the app.
   * Requires an API key.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   *
   * const draft = await api.content.get({ id: "contentId" });
   * console.log(draft.kind, draft.title, draft.body);
   * ```
   *
   * @param identifier - An object containing the content `id`.
   * @returns A promise that resolves to the piece, with its body.
   */
  get({ id }: ContentIdentifier): Promise<GetContentById200> {
    return this.api.getContentById(id);
  }

  /**
   * Renames a piece of content, replaces its body, or both.
   * Requires an API key.
   *
   * **Replacement, not a merge:** `body` replaces the artifact entirely, in
   * the same shape the kind takes on create. Send the whole thing, not just
   * the part that changed. Media already attached to the draft is the one
   * exception — you can't send it back, so it's carried over rather than
   * dropped.
   *
   * **Scheduled pieces are locked:** if a send is queued or already running
   * for this piece, its words go out exactly as written, so an edit to `body`
   * is refused with an explanation. Cancel the schedule in the app first.
   * Renaming is always allowed — a title isn't published anywhere.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   *
   * // Rewrite a draft
   * const rewritten = await api.content.update({
   *   id: "contentId",
   *   body: { text: "Rewritten, and shorter." },
   * });
   *
   * // Rename a draft
   * await api.content.update({
   *   id: "contentId",
   *   title: "Launch note, second pass",
   * });
   * ```
   *
   * @param params - An object containing the content `id`, plus at least one
   * of `title` or `body`.
   * @returns A promise that resolves to the updated piece, with its body.
   */
  update(
    params: ContentIdentifier & UpdateContentBody
  ): Promise<UpdateContent200> {
    const { id, ...body } = params;
    return this.api.updateContent(id, body);
  }

  /**
   * Puts a piece away without deleting it. Archived content drops out of the
   * default list and out of the writer's Content surface, and `restore()`
   * brings it back. Requires an API key.
   *
   * Any suggestion still proposing the piece is dismissed along with it, so
   * nothing is left offering to send something you've filed away. A piece with
   * a send already queued can't be archived — cancel the schedule first.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   * await api.content.archive({ id: "contentId" });
   * ```
   *
   * @param identifier - An object containing the content `id`.
   * @returns A promise that resolves to the archived piece.
   */
  archive({ id }: ContentIdentifier): Promise<ArchiveContent200> {
    return this.api.archiveContent(id, {});
  }

  /**
   * Brings an archived piece back into your library. Requires an API key.
   *
   * Suggestions dismissed when it was archived stay dismissed — you get the
   * draft back, not the to-do items telling you to ship it.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   * await api.content.restore({ id: "contentId" });
   * ```
   *
   * @param identifier - An object containing the content `id`.
   * @returns A promise that resolves to the restored piece.
   */
  restore({ id }: ContentIdentifier): Promise<RestoreContent200> {
    return this.api.restoreContent(id, {});
  }
}
