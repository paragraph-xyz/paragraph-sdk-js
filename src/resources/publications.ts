import { getParagraphAPI } from "../generated/api";
import type { GetPublicationById200 } from "../generated/models";
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
}
