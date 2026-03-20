import { getParagraphAPI } from "../generated/api";
import type { GetMe200 } from "../generated/models";

/**
 * Me resource handler.
 * Access via `api.me`
 */
export class MeResource {
  constructor(private api: ReturnType<typeof getParagraphAPI>) {}

  /**
   * Returns the publication associated with the authenticated API key.
   * Useful for verifying your API key and retrieving your publication details.
   * Requires an API key.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   * const publication = await api.me.get();
   * console.log(publication.name, publication.slug);
   * ```
   *
   * @returns A promise that resolves to the authenticated publication.
   */
  get(): Promise<GetMe200> {
    return this.api.getMe();
  }
}
