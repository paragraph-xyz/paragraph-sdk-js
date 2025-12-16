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
import { setApiKey } from "./mutator/custom-axios";
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
 * A discriminated union of identifiers for retrieving a single post.
 * Use one of the following shapes:
 * - `{ id: string }` to get a post by its unique ID.
 * - `{ publicationId: string; postSlug: string }` to get a post by its slug within a known publication ID.
 * - `{ publicationSlug: string; postSlug: string }` to get a post by both the publication's and post's slugs.
 */
export type PostIdentifier =
  | { id: string }
  | { publicationId: string; postSlug: string }
  | { publicationSlug: string; postSlug: string };

/**
 * A discriminated union of identifiers for retrieving a single user.
 * Use one of the following shapes:
 * - `{ id: string }` to get a user by their unique ID.
 * - `{ wallet: string }` to get a user by their Ethereum wallet address.
 */
export type UserIdentifier = { id: string } | { wallet: string };

/**
 * A discriminated union of identifiers for retrieving a single coin.
 * Use one of the following shapes:
 * - `{ id: string }` to get a coin by its unique ID.
 * - `{ contractAddress: string }` to get a coin by its on-chain contract address.
 */
export type CoinIdentifier = { id: string } | { contractAddress: string };

/**
 * A discriminated union of identifiers for listing posts.
 * Use one of the following shapes:
 * - `{ type: "publication", publicationId: string }` to list posts from a specific publication.
 * - `{ type: "feed" }` to get the curated feed from across the platform.
 */
export type PostListIdentifier =
  | { type: "publication"; publicationId: string }
  | { type: "feed" };

/**
 * A discriminated union of identifiers for listing coins.
 * Use one of the following shapes:
 * - `{ type: "popular" }` to get the most popular coins.
 */
export type CoinListIdentifier = { type: "popular" };

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
   * // Get publication by its unique ID
   * const pubById = await api.publications.get({ id: "BMV6abfvCSUl51ErCVzd" });
   *
   * // Get publication by its URL-friendly slug
   * const pubBySlug = await api.publications.get({ slug: "blog" });
   * const pubBySlug2 = await api.publications.get({ slug: "@blog" });
   *
   * // Get publication by its custom domain
   * const pubByDomain = await api.publications.get({ domain: "blog.mydomain.com" });
   * ```
   *
   * @param identifier - A {@link PublicationIdentifier} object to specify which publication to retrieve.
   * @returns A promise that resolves to the publication's data.
   */
  get(identifier: PublicationIdentifier) {
    if ("id" in identifier) {
      return this.api.getPublicationById(identifier.id);
    }

    if ("slug" in identifier) {
      return this.api.getPublicationBySlug(identifier.slug);
    }

    if ("domain" in identifier) {
      return this.api.getPublicationByDomain(identifier.domain);
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
  create(body: Parameters<ReturnType<typeof getParagraphAPI>["addSubscriber"]>[0]) {
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
  importCsv(body: Parameters<ReturnType<typeof getParagraphAPI>["importSubscribers"]>[0]) {
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
   * Retrieves a paginated list of posts using one of several sources.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI();
   *
   * // List posts from a specific publication
   * const posts = await api.posts.list({
   *   type: "publication",
   *   publicationId: "BMV6abfvCSUl51ErCVzd"
   * });
   *
   * // Get the curated feed from across the platform
   * const feed = await api.posts.list({ type: "feed" });
   *
   * // With pagination
   * const postsWithPagination = await api.posts.list(
   *   { type: "publication", publicationId: "BMV6abfvCSUl51ErCVzd" },
   *   { limit: 50, cursor: "abc123" }
   * );
   *
   * // Include full content
   * const postsWithContent = await api.posts.list(
   *   { type: "feed" },
   *   { includeContent: true }
   * );
   * ```
   *
   * @param identifier - A {@link PostListIdentifier} object to specify the source of posts.
   * @param options - Optional parameters for pagination and content inclusion.
   * @returns A promise that resolves to a paginated list of posts.
   */
  list(
    identifier: PostListIdentifier,
    options?: Parameters<ReturnType<typeof getParagraphAPI>["getPosts"]>[1]
  ) {
    switch (identifier.type) {
      case "publication":
        return this.api.getPosts(identifier.publicationId, options);
      case "feed":
        return this.api.getPostsFeed(options);
      default:
        throw new Error("Invalid identifier provided to list.");
    }
  }

  /**
   * Retrieves a single post using one of several unique identifiers.
   * This method allows fetching a post by its ID, or by a combination of
   * publication and post slugs/IDs.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI();
   *
   * // Get post by its unique ID
   * const postById = await api.posts.get({ id: "3T2PQZlsdQtigUp4fhlb" });
   *
   * // Get post by publication ID and post slug
   * const postByPubIdAndSlug = await api.posts.get({
   *   publicationId: "BMV6abfvCSUl51ErCVzd",
   *   postSlug: "my-first-post"
   * });
   *
   * // Get post by publication slug and post slug
   * const postBySlugs = await api.posts.get({
   *   publicationSlug: "blog",
   *   postSlug: "my-first-post"
   * });
   *
   * // Include full content
   * const postWithContent = await api.posts.get(
   *   { id: "3T2PQZlsdQtigUp4fhlb" },
   *   { includeContent: true }
   * );
   * ```
   *
   * @param identifier - A {@link PostIdentifier} object to specify which post to retrieve.
   * @param options - Optional query parameters, e.g., `{ includeContent: boolean }`.
   * @returns A promise that resolves to the post's data.
   */
  get(identifier: PostIdentifier, options?: PostQueryOptions) {
    if ("id" in identifier) {
      return this.api.getPostById(identifier.id, options);
    }

    if ("publicationId" in identifier) {
      return this.api.getPostByPublicationIdAndPostSlug(
        identifier.publicationId,
        identifier.postSlug,
        options
      );
    }

    if ("publicationSlug" in identifier) {
      return this.api.getPostByPublicationSlugAndPostSlug(
        identifier.publicationSlug,
        identifier.postSlug,
        options
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
  create(body: Parameters<ReturnType<typeof getParagraphAPI>["createPost"]>[0]) {
    return this.api.createPost(body);
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
   * // Get user by their unique ID
   * const userById = await api.users.get({ id: "user123" });
   *
   * // Get user by their Ethereum wallet address
   * const userByWallet = await api.users.get({ wallet: "0x1234..." });
   * ```
   *
   * @param identifier - A {@link UserIdentifier} object to specify which user to retrieve.
   * @returns A promise that resolves to the user's data.
   */
  get(identifier: UserIdentifier) {
    if ("id" in identifier) {
      return this.api.getUser(identifier.id);
    }

    if ("wallet" in identifier) {
      return this.api.getUserByWallet(identifier.wallet);
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
   * Retrieves metadata about a coin using one of several unique identifiers.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI();
   *
   * // Get coin by its unique ID
   * const coinById = await api.coins.get({ id: "coin123" });
   *
   * // Get coin by its on-chain contract address
   * const coinByContract = await api.coins.get({ contractAddress: "0x1234..." });
   * ```
   *
   * @param identifier - A {@link CoinIdentifier} object to specify which coin to retrieve.
   * @returns A promise that resolves to the coin's data.
   */
  get(identifier: CoinIdentifier) {
    if ("id" in identifier) {
      return this.api.getCoin(identifier.id);
    }

    if ("contractAddress" in identifier) {
      return this.api.getCoinByContract(identifier.contractAddress);
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
   * @param identifier - A {@link CoinIdentifier} object to specify which coin's holders to retrieve.
   * @param params - Optional parameters for pagination.
   * @returns A promise that resolves to a paginated list of coin holders.
   */
  getHolders(
    identifier: CoinIdentifier,
    params?: Parameters<ReturnType<typeof getParagraphAPI>["getCoinHoldersById"]>[1]
  ) {
    if ("id" in identifier) {
      return this.api.getCoinHoldersById(identifier.id, params);
    }

    if ("contractAddress" in identifier) {
      return this.api.getCoinHoldersByContract(identifier.contractAddress, params);
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
   *  - coin: A {@link CoinIdentifier} to specify which coin to buy
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
    coin: CoinIdentifier;
    client: WalletClient;
    account: Account;
    amount: bigint;
  }) {
    const walletAddress = account.address;

    let commands: string | undefined;
    let inputs: string[] | undefined;

    if ("id" in coin) {
      const result = await this.api.getBuyArgsById(coin.id, {
        walletAddress,
        amount: amount.toString(),
      });
      commands = result.commands;
      inputs = result.inputs;
    } else if ("contractAddress" in coin) {
      const result = await this.api.getBuyArgsByContract(coin.contractAddress, {
        walletAddress,
        amount: amount.toString(),
      });
      commands = result.commands;
      inputs = result.inputs;
    } else {
      throw new Error("Invalid identifier provided to buy.");
    }

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
   *  - coin: A {@link CoinIdentifier} to specify which coin to sell
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
    coin: CoinIdentifier;
    client: WalletClient;
    account: Account;
    amount: bigint;
  }) {
    const coinData = await this.get(coin);
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
    identifier: CoinIdentifier,
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
   * @param identifier - A {@link CoinIdentifier} to specify which coin to get a quote for.
   * @param amount - The amount of ETH in wei to be quoted.
   * @returns The amount of coin you would receive in exchange.
   */
  getQuote(identifier: CoinIdentifier, amount: bigint) {
    if ("id" in identifier) {
      return this.api.getQuoteById(identifier.id, { amount: amount.toString() });
    }

    if ("contractAddress" in identifier) {
      return this.api.getQuoteByContract(identifier.contractAddress, {
        amount: amount.toString(),
      });
    }

    throw new Error("Invalid identifier provided to getQuote.");
  }

  /**
   * Retrieves a list of coins using one of several sources.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI();
   *
   * // Get the most popular coins
   * const popular = await api.coins.list({ type: "popular" });
   * ```
   *
   * @param identifier - A {@link CoinListIdentifier} object to specify the source of coins.
   * @returns A promise that resolves to a list of coins.
   */
  list(identifier: CoinListIdentifier) {
    switch (identifier.type) {
      case "popular":
        return this.api.getPopularCoins();
      default:
        throw new Error("Invalid identifier provided to list.");
    }
  }
}

/**
 * Paragraph API class wrapper.
 *
 * Entrypoint into all Paragraph API functionality.
 *
 * @example
 * ```ts
 * // For public endpoints (no API key required)
 * const api = new ParagraphAPI();
 *
 * // For protected endpoints (API key required)
 * const apiWithAuth = new ParagraphAPI({ apiKey: "your-api-key" });
 *
 * // Publications
 * const pub = await api.publications.get({ id: "publicationId" });
 * const pubBySlug = await api.publications.get({ slug: "@blog" });
 * const pubByDomain = await api.publications.get({ domain: "blog.mydomain.com" });
 *
 * // Posts
 * const posts = await api.posts.list({ type: "publication", publicationId: "publicationId" });
 * const feed = await api.posts.list({ type: "feed" });
 * const post = await api.posts.get({ id: "postId" });
 * // Creating posts requires an API key
 * const newPost = await apiWithAuth.posts.create({ title: "My Post", markdown: "# Hello" });
 *
 * // Users
 * const user = await api.users.get({ id: "userId" });
 * const userByWallet = await api.users.get({ wallet: "0x1234..." });
 *
 * // Subscribers (mutations require an API key)
 * const count = await api.subscribers.getCount({ id: "publicationId" });
 * await apiWithAuth.subscribers.create({ email: "user@example.com" });
 *
 * // Coins
 * const coin = await api.coins.get({ id: "coinId" });
 * const coinByContract = await api.coins.get({ contractAddress: "0x1234..." });
 * const popular = await api.coins.list({ type: "popular" });
 * ```
 */
export class ParagraphAPI {
  private api = getParagraphAPI();

  /** Publications resource */
  public readonly publications: PublicationsResource;

  /** Subscribers resource */
  public readonly subscribers: SubscribersResource;

  /** Posts resource */
  public readonly posts: PostsResource;

  /** Users resource */
  public readonly users: UsersResource;

  /** Coins resource */
  public readonly coins: CoinsResource;

  /**
   * Initializes a new instance of the Paragraph API client.
   *
   * @param options - Optional configuration options.
   * @param options.apiKey - API key for authenticating protected endpoints.
   */
  constructor(options?: ParagraphAPIOptions) {
    if (options?.apiKey) {
      setApiKey(options.apiKey);
    }
    this.publications = new PublicationsResource(this.api);
    this.subscribers = new SubscribersResource(this.api);
    this.posts = new PostsResource(this.api);
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
