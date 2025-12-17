import { getParagraphAPI } from "../generated/api";
import type { GetUser200 } from "../generated/models";
import type { UserIdentifier } from "../types";
import { QueryResult, singleItemResult } from "../utils";

/**
 * Users resource handler.
 * Access via `api.users`
 */
export class UsersResource {
  constructor(private api: ReturnType<typeof getParagraphAPI>) {}

  /**
   * Retrieves metadata about a user using one of several unique identifiers.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI();
   *
   * // Get user by their unique ID (use .single() to get single object)
   * const userById = await api.users.get({ id: "user123" }).single();
   *
   * // Get user by their Ethereum wallet address
   * const userByWallet = await api.users.get({ wallet: "0x1234..." }).single();
   *
   * // Or get the full paginated result
   * const { items, pagination } = await api.users.get({ wallet: "0x1234..." });
   * ```
   *
   * @param identifier - A {@link UserIdentifier} object to specify which user to retrieve.
   * @returns A QueryResult that resolves to a paginated result. Use `.single()` to get just the user.
   */
  get(identifier: UserIdentifier): QueryResult<GetUser200> {
    if ("id" in identifier) {
      return new QueryResult(
        this.api.getUser(identifier.id).then(singleItemResult)
      );
    }

    if ("wallet" in identifier) {
      return new QueryResult(
        this.api.getUserByWallet(identifier.wallet).then(singleItemResult)
      );
    }

    throw new Error("Invalid identifier provided to get.");
  }
}
