import { parseAbi } from "viem";
import type { PaginatedResult } from "./types";

/**
 * A wrapper class for query results that provides a consistent interface
 * for both single-item and multi-item queries.
 *
 * All get() methods return a QueryResult, which can be awaited directly
 * to get the paginated result, or use `.single()` to extract a single item.
 *
 * @example
 * ```ts
 * // Get paginated results
 * const { items, pagination } = await api.posts.get({ publicationId: "..." });
 *
 * // Get a single item
 * const post = await api.posts.get({ id: "..." }).single();
 * ```
 */
export class QueryResult<T> implements PromiseLike<PaginatedResult<T>> {
  constructor(private promise: Promise<PaginatedResult<T>>) {}

  /**
   * Implements PromiseLike interface, allowing QueryResult to be awaited directly.
   */
  then<TResult1 = PaginatedResult<T>, TResult2 = never>(
    onfulfilled?:
      | ((value: PaginatedResult<T>) => TResult1 | PromiseLike<TResult1>)
      | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    return this.promise.then(onfulfilled, onrejected);
  }

  /**
   * Returns the first item from the result.
   * Use this when you expect a single result (e.g., getting by ID).
   *
   * @throws Error if no items are returned
   * @returns A promise that resolves to a single item
   */
  async single(): Promise<T> {
    const result = await this.promise;
    if (result.items.length === 0) {
      throw new Error("No items found");
    }
    return result.items[0];
  }
}

/**
 * Helper function to create a paginated result for a single item.
 * Used internally to wrap single-item API responses in a consistent format.
 */
export function singleItemResult<T>(item: T): PaginatedResult<T> {
  return {
    items: [item],
    pagination: {
      hasMore: false,
      total: 1,
    },
  };
}

/**
 * Wraps an API object to set the current API key context before each method call.
 * This ensures instance isolation when multiple ParagraphAPI instances exist.
 */
export function wrapAPIWithAuth<T>(
  api: T,
  apiKey: string | undefined,
  setCurrentApiKey: (apiKey: string | undefined) => void
): T {
  const wrapped: Record<string, unknown> = {};
  for (const [key, method] of Object.entries(api as Record<string, unknown>)) {
    if (typeof method === "function") {
      wrapped[key] = (...args: unknown[]) => {
        setCurrentApiKey(apiKey);
        return (method as Function)(...args);
      };
    }
  }
  return wrapped as T;
}

/**
 * ABI for the Universal Router execute function.
 * Used for coin buy/sell operations.
 */
export const executeAbi = [
  {
    type: "function",
    name: "execute",
    inputs: [
      { name: "commands", type: "bytes", internalType: "bytes" },
      { name: "inputs", type: "bytes[]", internalType: "bytes[]" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
] as const;

/**
 * ABI for the Permit2 allowance function.
 * Used for checking token allowances in coin sell operations.
 */
export const permit2Abi = parseAbi([
  "function allowance(address user, address token, address spender) external view returns (uint160 amount, uint48 expiration, uint48 nonce)",
]);
