import { getParagraphAPI } from "../generated/api";

/**
 * Subscribers resource handler.
 * Access via `api.subscribers`
 */
export class SubscribersResource {
  constructor(private api: ReturnType<typeof getParagraphAPI>) {}

  /**
   * Gets a total count of subscribers for a given publication ID.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI();
   *
   * // Get subscriber count for a publication
   * const result = await api.subscribers.getCount({ id: "publicationId" });
   * console.log(result.count);
   * ```
   *
   * @param options - An object containing the publication ID.
   * @param options.id - The unique identifier of the publication.
   * @returns A promise that resolves to an object containing the subscriber count.
   */
  getCount({ id }: { id: string }) {
    return this.api.getSubscriberCount(id);
  }

  /**
   * Creates a new subscriber in the publication associated with the API key.
   * Requires an API key.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   *
   * // Create subscriber by email
   * await api.subscribers.create({ email: "user@example.com" });
   *
   * // Create subscriber by wallet
   * await api.subscribers.create({ wallet: "0x1234..." });
   *
   * // Create subscriber with both email and wallet
   * await api.subscribers.create({
   *   email: "user@example.com",
   *   wallet: "0x1234..."
   * });
   * ```
   *
   * @param body - The subscriber data. At least one of email or wallet must be provided.
   * @returns A promise that resolves to the result of the operation.
   */
  create(
    body: Parameters<ReturnType<typeof getParagraphAPI>["addSubscriber"]>[0]
  ) {
    return this.api.addSubscriber(body);
  }

  /**
   * Imports subscribers from a CSV file into the publication associated with the API key.
   * Requires an API key.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   *
   * // Import from CSV file
   * const file = new File([csvContent], "subscribers.csv", { type: "text/csv" });
   * await api.subscribers.importCsv({ file });
   * ```
   *
   * @param body - An object containing the CSV file to import.
   * @returns A promise that resolves to the result of the import operation.
   */
  importCsv(
    body: Parameters<ReturnType<typeof getParagraphAPI>["importSubscribers"]>[0]
  ) {
    return this.api.importSubscribers(body);
  }
}
