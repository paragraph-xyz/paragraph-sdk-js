import { getParagraphAPI } from "../generated/api";
import type {
  GetPublicationById200,
  UpdatePublicationBody,
} from "../generated/models";
import type { PublicationIdentifier } from "../types";
import { QueryResult, singleItemResult } from "../utils";

/**
 * Publications resource handler.
 * Access via `api.publications`
 */
export class PublicationsResource {
  constructor(private api: ReturnType<typeof getParagraphAPI>) {}

  /**
   * Retrieves metadata about a Paragraph publication using one of several unique identifiers.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI();
   *
   * // Get publication by its unique ID (use .single() for single object)
   * const pub = await api.publications.get({ id: "BMV6abfvCSUl51ErCVzd" }).single();
   *
   * // Or get the full paginated result
   * const { items, pagination } = await api.publications.get({ slug: "blog" });
   * const pubBySlug = items[0];
   *
   * // Get publication by its custom domain
   * const pubByDomain = await api.publications.get({ domain: "blog.mydomain.com" }).single();
   * ```
   *
   * @param identifier - A {@link PublicationIdentifier} object to specify which publication to retrieve.
   * @returns A QueryResult that resolves to a paginated result. Use `.single()` to get just the publication.
   */
  get(identifier: PublicationIdentifier): QueryResult<GetPublicationById200> {
    if ("id" in identifier) {
      return new QueryResult(
        this.api.getPublicationById(identifier.id).then(singleItemResult)
      );
    }

    if ("slug" in identifier) {
      return new QueryResult(
        this.api.getPublicationBySlug(identifier.slug).then(singleItemResult)
      );
    }

    if ("domain" in identifier) {
      return new QueryResult(
        this.api.getPublicationByDomain(identifier.domain).then(singleItemResult)
      );
    }

    throw new Error("Invalid identifier provided to get.");
  }

  /**
   * Updates settings for the publication associated with the API key.
   * Only provided fields are updated; omitted fields remain unchanged.
   * Requires an API key, and `publicationId` must match the publication that owns the key.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   *
   * // Update name and theme
   * await api.publications.update("publicationId", {
   *   name: "My Blog",
   *   themeColor: "purple-600",
   *   headerFont: "serif",
   * });
   *
   * // Pin posts to the top of the homepage (replaces the existing pinned list, max 50)
   * await api.publications.update("publicationId", {
   *   pinnedPostIds: ["postId1", "postId2"],
   * });
   *
   * // Set a featured post — use a post ID, "latest", "popular", or "disabled"
   * await api.publications.update("publicationId", {
   *   featuredPost: "latest",
   * });
   *
   * // Email notifications are merged onto existing settings; only the toggles you send change
   * await api.publications.update("publicationId", {
   *   emailNotifications: { newSubscriber: true },
   * });
   * ```
   *
   * @param publicationId - The unique identifier of the publication to update.
   * @param body - The fields to update. See {@link UpdatePublicationBody}.
   * @returns A promise that resolves to the updated publication.
   */
  update(publicationId: string, body: UpdatePublicationBody) {
    return this.api.updatePublication(publicationId, body);
  }
}
