// src/index.ts - public entry
import {
  Account,
  Address,
  createPublicClient,
  http,
  parseAbi,
  WalletClient,
} from "viem";
import { getParagraphAPI } from "./generated/api";
import type {
  GetCoin200,
  GetPostById200,
  GetPostsFeed200ItemsItem,
  GetPostsParams,
  GetPostsFeedParams,
  GetPublicationById200,
  GetUser200,
} from "./generated/models";
import { setCurrentApiKey } from "./mutator/custom-axios";
import { base } from "viem/chains";
import { ADDRESSES } from "@whetstone-research/doppler-sdk";
import { signPermit } from "doppler-router/dist/Permit2";
import { CommandBuilder } from "doppler-router";

/**
 * Configuration options for the Paragraph API client.
 */
export interface ParagraphAPIOptions {
  /**
   * API key for authenticating protected endpoints.
   * Required for creating posts, adding subscribers, and importing subscribers.
   * Obtain an API key from your Paragraph publication settings.
   */
  apiKey?: string;
}

/**
 * Pagination information for paginated results.
 */
export interface Pagination {
  /** Cursor for fetching the next page of results */
  cursor?: string;
  /** Whether more results are available */
  hasMore: boolean;
  /** Total number of items available */
  total?: number;
}

/**
 * Result type for paginated queries, containing both items and pagination info.
 */
export interface PaginatedResult<T> {
  /** Array of items in this page */
  items: T[];
  /** Pagination information */
  pagination: Pagination;
}

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
function singleItemResult<T>(item: T): PaginatedResult<T> {
  return {
    items: [item],
    pagination: {
      hasMore: false,
      total: 1,
    },
  };
}

const executeAbi = [
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
const permit2Abi = parseAbi([
  "function allowance(address user, address token, address spender) external view returns (uint160 amount, uint48 expiration, uint48 nonce)",
]);

/**
 * A discriminated union of identifiers for retrieving a single publication.
 * Use one of the following shapes:
 * - `{ id: string }` to get a publication by its unique ID.
 * - `{ slug: string }` to get a publication by its URL-friendly slug.
 * - `{ domain: string }` to get a publication by its custom domain.
 */
export type PublicationIdentifier =
  | { id: string }
  | { slug: string }
  | { domain: string };

/**
 * Identifier for getting a single post by ID.
 */
export type PostIdIdentifier = { id: string };

/**
 * Identifier for getting a single post by publication ID and post slug.
 */
export type PostByPubIdAndSlugIdentifier = {
  publicationId: string;
  postSlug: string;
};

/**
 * Identifier for getting a single post by publication slug and post slug.
 */
export type PostByPubSlugAndSlugIdentifier = {
  publicationSlug: string;
  postSlug: string;
};

/**
 * Identifier for getting a list of posts from a publication.
 */
export type PostsByPublicationIdIdentifier = { publicationId: string };

/**
 * A discriminated union of identifiers for retrieving posts.
 * Use one of the following shapes:
 * - `{ id: string }` to get a post by its unique ID (returns single post in array).
 * - `{ publicationId: string; postSlug: string }` to get a post by its slug within a known publication ID (returns single post in array).
 * - `{ publicationSlug: string; postSlug: string }` to get a post by both the publication's and post's slugs (returns single post in array).
 * - `{ publicationId: string }` to get a list of posts from a publication (returns multiple posts).
 */
export type PostIdentifier =
  | PostIdIdentifier
  | PostByPubIdAndSlugIdentifier
  | PostByPubSlugAndSlugIdentifier
  | PostsByPublicationIdIdentifier;

/**
 * A discriminated union of identifiers for retrieving a single user.
 * Use one of the following shapes:
 * - `{ id: string }` to get a user by their unique ID.
 * - `{ wallet: string }` to get a user by their Ethereum wallet address.
 */
export type UserIdentifier = { id: string } | { wallet: string };

/**
 * Identifier for getting a single coin by ID.
 */
export type CoinIdIdentifier = { id: string };

/**
 * Identifier for getting a single coin by contract address.
 */
export type CoinByContractIdentifier = { contractAddress: string };

/**
 * Identifier for getting a list of popular coins.
 */
export type CoinPopularIdentifier = { sortBy: "popular" };

/**
 * Identifier for a single coin (by ID or contract address).
 * Used for operations that require a specific coin.
 */
export type SingleCoinIdentifier = CoinIdIdentifier | CoinByContractIdentifier;

/**
 * A discriminated union of identifiers for retrieving coins.
 * Use one of the following shapes:
 * - `{ id: string }` to get a coin by its unique ID (returns single coin in array).
 * - `{ contractAddress: string }` to get a coin by its on-chain contract address (returns single coin in array).
 * - `{ sortBy: "popular" }` to get the most popular coins (returns multiple coins).
 */
export type CoinIdentifier = SingleCoinIdentifier | CoinPopularIdentifier;

/**
 * Type helper to extract the query options for getting a post.
 * It correctly infers the type from the generated API client's method signature,
 * ensuring the types are always in sync.
 */
export type PostQueryOptions = Parameters<
  ReturnType<typeof getParagraphAPI>["getPostById"]
>[1];

/**
 * Publications resource handler.
 * Access via `api.publications`
 */
class PublicationsResource {
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

/**
 * Subscribers resource handler.
 * Access via `api.subscribers`
 */
class SubscribersResource {
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

/**
 * Posts resource handler.
 * Access via `api.posts`
 */
class PostsResource {
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

/**
 * Feed resource handler.
 * Access via `api.feed`
 */
class FeedResource {
  constructor(private api: ReturnType<typeof getParagraphAPI>) {}

  /**
   * Retrieves the curated feed of posts from across the platform.
   * Returns a QueryResult with paginated feed items and pagination info.
   * Each item contains post data along with publication and user information.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI();
   *
   * // Get the curated feed with pagination info
   * const { items: feedItems, pagination } = await api.feed.get();
   * feedItems.forEach(item => {
   *   console.log(item.post.title);
   *   console.log(item.publication.name);
   *   console.log(item.user.displayName);
   * });
   *
   * // Paginate through results
   * if (pagination.hasMore && pagination.cursor) {
   *   const nextPage = await api.feed.get({ cursor: pagination.cursor });
   * }
   *
   * // With custom limit
   * const { items, pagination: pagInfo } = await api.feed.get({ limit: 10 });
   * ```
   *
   * @param options - Optional parameters for pagination and content inclusion.
   * @returns A QueryResult with paginated feed items and pagination info.
   */
  get(options?: GetPostsFeedParams): QueryResult<GetPostsFeed200ItemsItem> {
    return new QueryResult(
      this.api.getPostsFeed(options) as Promise<PaginatedResult<GetPostsFeed200ItemsItem>>
    );
  }
}

/**
 * Users resource handler.
 * Access via `api.users`
 */
class UsersResource {
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

/**
 * Coins resource handler.
 * Access via `api.coins`
 */
class CoinsResource {
  constructor(private api: ReturnType<typeof getParagraphAPI>) {}

  /**
   * Retrieves coins using one of several unique identifiers.
   *
   * All queries return a QueryResult with paginated results. Use `.single()` to get a single coin.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI();
   *
   * // Get popular coins
   * const { items: popularCoins, pagination } = await api.coins.get({ sortBy: "popular" });
   * popularCoins.forEach(coin => console.log(coin.metadata.name));
   *
   * // Get coin by its unique ID (use .single() for single object)
   * const coinById = await api.coins.get({ id: "coin123" }).single();
   *
   * // Get coin by its on-chain contract address
   * const coinByContract = await api.coins.get({ contractAddress: "0x1234..." }).single();
   * ```
   *
   * @param identifier - A {@link CoinIdentifier} object to specify which coin(s) to retrieve.
   * @returns A QueryResult with paginated results. Use `.single()` to get a single coin.
   */
  get(identifier: CoinIdentifier): QueryResult<GetCoin200> {
    if ("sortBy" in identifier && identifier.sortBy === "popular") {
      return new QueryResult(
        this.api.getPopularCoins().then((result) => ({
          items: result.coins as GetCoin200[],
          pagination: {
            hasMore: false,
            total: result.coins.length,
          },
        }))
      );
    }

    if ("id" in identifier) {
      return new QueryResult(
        this.api.getCoin(identifier.id).then(singleItemResult)
      );
    }

    if ("contractAddress" in identifier) {
      return new QueryResult(
        this.api.getCoinByContract(identifier.contractAddress).then(singleItemResult)
      );
    }

    throw new Error("Invalid identifier provided to get.");
  }

  /**
   * Retrieves a paginated list of holders for a given coin.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI();
   *
   * // Get holders by coin ID
   * const holdersById = await api.coins.getHolders({ id: "coin123" });
   *
   * // Get holders by contract address
   * const holdersByContract = await api.coins.getHolders({ contractAddress: "0x1234..." });
   *
   * // With pagination
   * const holdersWithPagination = await api.coins.getHolders(
   *   { id: "coin123" },
   *   { limit: 50, cursor: "abc123" }
   * );
   * ```
   *
   * @param identifier - A {@link SingleCoinIdentifier} object to specify which coin's holders to retrieve.
   * @param params - Optional parameters for pagination.
   * @returns A promise that resolves to a paginated list of coin holders.
   */
  getHolders(
    identifier: SingleCoinIdentifier,
    params?: Parameters<
      ReturnType<typeof getParagraphAPI>["getCoinHoldersById"]
    >[1]
  ) {
    if ("id" in identifier) {
      return this.api.getCoinHoldersById(identifier.id, params);
    }

    if ("contractAddress" in identifier) {
      return this.api.getCoinHoldersByContract(
        identifier.contractAddress,
        params
      );
    }

    throw new Error("Invalid identifier provided to getHolders.");
  }

  /**
   * Allows the user to buy a Paragraph coin.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI();
   *
   * // Buy by coin ID
   * const txHash = await api.coins.buy({
   *   coin: { id: "coin123" },
   *   client,
   *   account,
   *   amount: 1000000000000000000n // 1 ETH in wei
   * });
   *
   * // Buy by contract address
   * const txHash2 = await api.coins.buy({
   *   coin: { contractAddress: "0x1234..." },
   *   client,
   *   account,
   *   amount: 1000000000000000000n
   * });
   * ```
   *
   * @param options
   *  - coin: A {@link SingleCoinIdentifier} to specify which coin to buy
   *  - client: the Client object that is going to make the transaction
   *  - account: the Account of the buyer
   *  - amount: the amount of ETH in wei that is going to be swapped for the coin
   * @returns The transaction hash
   */
  async buy({
    coin,
    client,
    account,
    amount,
  }: {
    coin: SingleCoinIdentifier;
    client: WalletClient;
    account: Account;
    amount: bigint;
  }) {
    const buyArgs = await this.getBuyArgs(coin, {
      walletAddress: account.address,
      amount: amount.toString(),
    });

    const { commands, inputs } = buyArgs;
    if (!commands || !inputs) throw new Error("API error: Missing args");

    const txHash = await client.writeContract({
      account,
      address: ADDRESSES[base.id].universalRouter,
      abi: executeAbi,
      functionName: "execute",
      args: [commands as `0x${string}`, inputs as `0x${string}`[]],
      value: amount,
      chain: base,
    });

    return txHash;
  }

  private getBuyArgs(
    identifier: SingleCoinIdentifier,
    params: Parameters<ReturnType<typeof getParagraphAPI>["getBuyArgsById"]>[1]
  ) {
    if ("id" in identifier) {
      return this.api.getBuyArgsById(identifier.id, params);
    }

    if ("contractAddress" in identifier) {
      return this.api.getBuyArgsByContract(identifier.contractAddress, params);
    }

    throw new Error("Invalid identifier provided to getBuyArgs.");
  }

  /**
   * Allows the user to sell a Paragraph coin.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI();
   *
   * // Sell by coin ID
   * const txHash = await api.coins.sell({
   *   coin: { id: "coin123" },
   *   client,
   *   account,
   *   amount: 1000000000000000000n // amount of coin in wei
   * });
   *
   * // Sell by contract address
   * const txHash2 = await api.coins.sell({
   *   coin: { contractAddress: "0x1234..." },
   *   client,
   *   account,
   *   amount: 1000000000000000000n
   * });
   * ```
   *
   * @param options
   *  - coin: A {@link SingleCoinIdentifier} to specify which coin to sell
   *  - client: the Client object that is going to make the transaction
   *  - account: the Account of the seller
   *  - amount: the amount of coin in wei that is going to be swapped for WETH
   * @returns The transaction hash
   */
  async sell({
    coin,
    client,
    account,
    amount,
  }: {
    coin: SingleCoinIdentifier;
    client: WalletClient;
    account: Account;
    amount: bigint;
  }) {
    const coinData = await this.get(coin).single();
    const sellArgs = await this.getSellArgs(coin, {
      walletAddress: account.address,
      amount: amount.toString(),
    });

    const publicClient = createPublicClient({
      chain: base,
      transport: http(),
    });
    const [block, allowance] = await Promise.all([
      publicClient.getBlock(),
      publicClient.readContract({
        address: ADDRESSES[base.id].permit2,
        abi: permit2Abi,
        functionName: "allowance",
        args: [
          account.address,
          coinData.contractAddress as Address,
          ADDRESSES[base.id].universalRouter,
        ],
      }),
    ]);
    if (!block || !allowance)
      throw new Error("API error: Missing block or allowance");
    const permit = {
      details: {
        token: coinData.contractAddress as Address,
        amount,
        expiration: block.timestamp + 3600n,
        nonce: BigInt(allowance[2]),
      },
      spender: ADDRESSES[base.id].universalRouter,
      sigDeadline: block.timestamp + 3600n,
    };
    client.account = account;
    const signature = await signPermit(
      permit,
      client,
      base.id,
      ADDRESSES[base.id].permit2
    );
    if (!signature) throw new Error("API error: Missing signature");
    const commandBuilder = new CommandBuilder();
    commandBuilder.addPermit2Permit(permit, signature);
    const [signCommands, signInputs] = commandBuilder.build();

    const { commands: sellCommands, inputs: sellInputs } = sellArgs;
    if (!sellCommands || !sellInputs)
      throw new Error("API error: Missing args");
    const commands = `${signCommands}${sellCommands.substring(
      2
    )}` as `0x${string}`;
    const inputs = [...signInputs, ...sellInputs] as `0x${string}`[];
    const txHash = await client.writeContract({
      account,
      address: ADDRESSES[base.id].universalRouter,
      abi: executeAbi,
      functionName: "execute",
      args: [commands, inputs],
      chain: base,
    });
    return txHash;
  }

  private getSellArgs(
    identifier: SingleCoinIdentifier,
    params: Parameters<ReturnType<typeof getParagraphAPI>["getSellArgsById"]>[1]
  ) {
    if ("id" in identifier) {
      return this.api.getSellArgsById(identifier.id, params);
    }

    if ("contractAddress" in identifier) {
      return this.api.getSellArgsByContract(identifier.contractAddress, params);
    }

    throw new Error("Invalid identifier provided to getSellArgs.");
  }

  /**
   * Retrieves the amount of coin you would get in exchange for the amount of ETH in wei.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI();
   *
   * // Get quote by coin ID
   * const quoteById = await api.coins.getQuote({ id: "coin123" }, 1000000000000000000n);
   *
   * // Get quote by contract address
   * const quoteByContract = await api.coins.getQuote(
   *   { contractAddress: "0x1234..." },
   *   1000000000000000000n
   * );
   * ```
   *
   * @param identifier - A {@link SingleCoinIdentifier} to specify which coin to get a quote for.
   * @param amount - The amount of ETH in wei to be quoted.
   * @returns The amount of coin you would receive in exchange.
   */
  getQuote(identifier: SingleCoinIdentifier, amount: bigint) {
    if ("id" in identifier) {
      return this.api.getQuoteById(identifier.id, {
        amount: amount.toString(),
      });
    }

    if ("contractAddress" in identifier) {
      return this.api.getQuoteByContract(identifier.contractAddress, {
        amount: amount.toString(),
      });
    }

    throw new Error("Invalid identifier provided to getQuote.");
  }
}

/**
 * Paragraph API class wrapper.
 *
 * Entrypoint into all Paragraph API functionality.
 * All get() methods return a QueryResult with paginated results.
 * Use `.single()` to get a single item, or await directly to get `{ items, pagination }`.
 *
 * @example
 * ```ts
 * // For public endpoints (no API key required)
 * const api = new ParagraphAPI();
 *
 * // For protected endpoints (API key required)
 * const apiWithAuth = new ParagraphAPI({ apiKey: "your-api-key" });
 *
 * // Publications (use .single() for single object)
 * const pub = await api.publications.get({ id: "publicationId" }).single();
 * const pubBySlug = await api.publications.get({ slug: "@blog" }).single();
 *
 * // Posts (paginated list or use .single() for single post)
 * const { items: posts, pagination } = await api.posts.get({ publicationId: "publicationId" });
 * const post = await api.posts.get({ id: "postId" }).single();
 * // Creating posts requires an API key
 * const newPost = await apiWithAuth.posts.create({ title: "My Post", markdown: "# Hello" });
 *
 * // Feed (paginated)
 * const { items: feedItems, pagination: feedPag } = await api.feed.get();
 *
 * // Users (use .single() for single object)
 * const user = await api.users.get({ id: "userId" }).single();
 * const userByWallet = await api.users.get({ wallet: "0x1234..." }).single();
 *
 * // Subscribers (mutations require an API key)
 * const count = await api.subscribers.getCount({ id: "publicationId" });
 * await apiWithAuth.subscribers.create({ email: "user@example.com" });
 *
 * // Coins (use .single() for single coin)
 * const coin = await api.coins.get({ id: "coinId" }).single();
 * const { items: popular } = await api.coins.get({ sortBy: "popular" });
 * ```
 */
/**
 * Wraps an API object to set the current API key context before each method call.
 * This ensures instance isolation when multiple ParagraphAPI instances exist.
 */
function wrapAPIWithAuth<T>(api: T, apiKey: string | undefined): T {
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

export class ParagraphAPI {
  private api: ReturnType<typeof getParagraphAPI>;

  /** The API key for this instance */
  private apiKey: string | undefined;

  /** Publications resource */
  public readonly publications: PublicationsResource;

  /** Subscribers resource */
  public readonly subscribers: SubscribersResource;

  /** Posts resource */
  public readonly posts: PostsResource;

  /** Feed resource */
  public readonly feed: FeedResource;

  /** Users resource */
  public readonly users: UsersResource;

  /** Coins resource */
  public readonly coins: CoinsResource;

  /**
   * Initializes a new instance of the Paragraph API client.
   * Each instance has its own isolated authentication context, allowing
   * multiple instances with different API keys to coexist.
   *
   * @param options - Optional configuration options.
   * @param options.apiKey - API key for authenticating protected endpoints.
   */
  constructor(options?: ParagraphAPIOptions) {
    this.apiKey = options?.apiKey;
    // Wrap the API to set the current API key context before each call
    this.api = wrapAPIWithAuth(getParagraphAPI(), this.apiKey);

    this.publications = new PublicationsResource(this.api);
    this.subscribers = new SubscribersResource(this.api);
    this.posts = new PostsResource(this.api);
    this.feed = new FeedResource(this.api);
    this.users = new UsersResource(this.api);
    this.coins = new CoinsResource(this.api);
  }
}

/**
 * Optional factory function to create an instance of the API client.
 *
 * @remarks
 * This function is tree-shakeable.
 *
 * @param options - Optional configuration options.
 * @returns A new instance of the {@link ParagraphAPI}.
 */
export const createParagraphAPI = (options?: ParagraphAPIOptions) =>
  new ParagraphAPI(options);

// Re-export generated types for consumers
export * from "./generated/models";
