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
import { base } from "viem/chains";
import { ADDRESSES } from "@whetstone-research/doppler-sdk";
import { signPermit } from "doppler-router/dist/Permit2";
import { CommandBuilder } from "doppler-router";

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
 * Type helper to extract the query options for getting a post.
 * It correctly infers the type from the generated API client's method signature,
 * ensuring the types are always in sync.
 */
export type PostQueryOptions = Parameters<
  ReturnType<typeof getParagraphAPI>["getPostById"]
>[1];

/**
 * Paragraph API class wrapper.
 *
 * Entrypoint into all Paragraph API functionality.
 */
export class ParagraphAPI {
  private api = getParagraphAPI();

  /**
   * Initializes a new instance of the Paragraph API client.
   */
  constructor() {}

  /**
   * Retrieves metadata about a Paragraph publication by its unique ID.
   *
   * @param publicationId - The unique identifier for the publication.
   * @returns A promise that resolves to the publication's data.
   */
  getPublication(publicationId: string) {
    return this.api.getPublicationById(publicationId);
  }

  /**
   * Retrieves metadata about a Paragraph publication by its URL-friendly slug.
   *
   * @remarks
   * The slug can optionally include a leading "@".
   *
   * @example
   * ```ts
   * const publication = await api.getPublicationBySlug("blog");
   * const publication2 = await api.getPublicationBySlug("@blog");
   * ```
   *
   * @param slug - The slug of the publication (e.g., "blog").
   * @returns A promise that resolves to the publication's data.
   */
  getPublicationBySlug(slug: string) {
    return this.api.getPublicationBySlug(slug);
  }

  /**
   * Retrieves metadata about a Paragraph publication by its custom domain.
   *
   * @remarks
   * This should be the domain only (e.g., "blog.mydomain.com"), without "https://"
   * or any path/querystring.
   *
   * @param domain - The custom domain of the publication.
   * @returns A promise that resolves to the publication's data.
   */
  getPublicationByDomain(domain: string) {
    return this.api.getPublicationByDomain(domain);
  }

  /**
   * Gets a total count of subscribers for a given publication ID.
   *
   * @param publicationId - The unique identifier of the publication.
   * @returns A promise that resolves to an object containing the subscriber count.
   */
  getSubscriberCount(publicationId: string) {
    return this.api.getSubscriberCount(publicationId);
  }

  /**
   * Retrieves a paginated list of posts for a given publication.
   *
   * @param publicationId - The unique identifier of the publication.
   * @param params - Optional parameters for pagination and content inclusion.
   * @returns A promise that resolves to a paginated list of posts.
   */
  getPosts(
    publicationId: string,
    params?: Parameters<typeof this.api.getPosts>[1]
  ) {
    return this.api.getPosts(publicationId, params);
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
   * const postById = await api.getPost({ id: "3T2PQZlsdQtigUp4fhlb" });
   *
   * // Get post by publication ID and post slug
   * const postByPubIdAndSlug = await api.getPost({
   *   publicationId: "BMV6abfvCSUl51ErCVzd",
   *   postSlug: "my-first-post"
   * });
   *
   * // Get post by publication slug and post slug
   * const postBySlugs = await api.getPost({
   *   publicationSlug: "blog",
   *   postSlug: "my-first-post"
   * });
   *
   * // Include full content
   * const postWithContent = await api.getPost(
   *   { id: "3T2PQZlsdQtigUp4fhlb" },
   *   { includeContent: true }
   * );
   * ```
   *
   * @param identifier - A {@link PostIdentifier} object to specify which post to retrieve.
   * @param options - Optional query parameters, e.g., `{ includeContent: boolean }`.
   * @returns A promise that resolves to the post's data.
   */
  getPost(identifier: PostIdentifier, options?: PostQueryOptions) {
    if ("id" in identifier) {
      return this.api.getPostById(identifier.id, options);
    }

    if ("publicationId" in identifier) {
      // CORRECTED CALL: Pass properties as separate arguments
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

    // This part of the code should be unreachable due to TypeScript's discriminated union type checking.
    // It is included as a safeguard.
    throw new Error("Invalid identifier provided to getPost.");
  }

  /**
   * Retrieves metadata about a user by their unique user ID.
   *
   * @param userId - The unique identifier for the user.
   * @returns A promise that resolves to the user's data.
   */
  getUser(userId: string) {
    return this.api.getUser(userId);
  }

  /**
   * Retrieves metadata about a user by their wallet address.
   *
   * @param wallet - The user's Ethereum wallet address.
   * @returns A promise that resolves to the user's data.
   */
  getUserByWallet(wallet: string) {
    return this.api.getUserByWallet(wallet);
  }

  /**
   * Retrieves metadata about a coin by its Paragraph-internal ID.
   *
   * @param id - The unique identifier for the coin.
   * @returns A promise that resolves to the coin's data.
   */
  getCoin(id: string) {
    return this.api.getCoin(id);
  }

  /**
   * Retrieves metadata about a coin by its on-chain contract address.
   *
   * @param contractAddress - The Ethereum contract address of the coin.
   * @returns A promise that resolves to the coin's data.
   */
  getCoinByContract(contractAddress: string) {
    return this.api.getCoinByContract(contractAddress);
  }

  /**
   * Retrieves a paginated list of holders for a given coin ID.
   *
   * @param id - The unique identifier of the coin.
   * @param params - Optional parameters for pagination.
   * @returns A promise that resolves to a paginated list of coin holders.
   */
  getCoinHolders(
    id: string,
    params?: Parameters<typeof this.api.getCoinHoldersById>[1]
  ) {
    return this.api.getCoinHoldersById(id, params);
  }

  /**
   * Retrieves a paginated list of holders for a given coin contract address.
   *
   * @param contractAddress - The Ethereum contract address of the coin.
   * @param params - Optional parameters for pagination.
   * @returns A promise that resolves to a paginated list of coin holders.
   */
  getCoinHoldersByContract(
    contractAddress: string,
    params?: Parameters<typeof this.api.getCoinHoldersByContract>[1]
  ) {
    return this.api.getCoinHoldersByContract(contractAddress, params);
  }

  /**
   * Allows the user to buy a Pargraph coin
   *
   * @param
   *  - coinId: ID of the coin to buy
   *  - client: the Client object that is going to make the transaction
   *  - account: the Account of the buyer
   *  - amount: the amount of ETH in wei that is going to be swapped for the coin
   * @returns
   */
  async buyCoin({
    coinId,
    client,
    account,
    amount,
  }: {
    coinId: string;
    client: WalletClient;
    account: Account;
    amount: bigint;
  }) {
    const walletAddress = account.address;
    const { commands, inputs } = await this.api.getBuyArgsById(coinId, {
      walletAddress,
      amount: amount.toString(),
    });

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
   * Allows the user to buy a Pargraph coin using the coin's contract
   *
   * @param
   *  - coinAddress: address of the coin to buy
   *  - client: the Client object that is going to make the transaction
   *  - account: the Account of the buyer
   *  - amount: the amount of ETH in wei that is going to be swapped for the coin
   * @returns
   */
  async buyCoinByContract({
    coinAddress,
    client,
    account,
    amount,
  }: {
    coinAddress: Address;
    client: WalletClient;
    account: Account;
    amount: bigint;
  }) {
    const walletAddress = account.address;
    const { commands, inputs } = await this.api.getBuyArgsByContract(
      coinAddress,
      {
        walletAddress,
        amount: amount.toString(),
      }
    );

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
   * Allows the user to sell a Pargraph coin
   *
   * @param
   *  - coinId: ID of the coin to sell
   *  - client: the Client object that is going to make the transaction
   *  - account: the Account of the seller
   *  - amount: the amount of coin in wei that is going to be swapped for WETH
   * @returns
   */
  async sellCoin({
    coinId,
    client,
    account,
    amount,
  }: {
    coinId: string;
    client: WalletClient;
    account: Account;
    amount: bigint;
  }) {
    const coin = await this.api.getCoin(coinId);
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
          coin.contractAddress as Address,
          ADDRESSES[base.id].universalRouter,
        ],
      }),
    ]);
    if (!block || !allowance)
      throw new Error("API error: Missing block or allowance");
    const permit = {
      details: {
        token: coin.contractAddress as Address,
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
    const { commands: sellCommands, inputs: sellInputs } =
      await this.api.getSellArgsById(coinId, {
        walletAddress: account.address,
        amount: amount.toString(),
      });
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

  /**
   * Allows the user to sell a Pargraph coin
   *
   * @param
   *  - coinContract: contract address of the coin to sell
   *  - client: the Client object that is going to make the transaction
   *  - account: the Account of the seller
   *  - amount: the amount of coin in wei that is going to be swapped for WETH
   * @returns
   */
  async sellCoinByContract({
    coinContract,
    client,
    account,
    amount,
  }: {
    coinContract: Address;
    client: WalletClient;
    account: Account;
    amount: bigint;
  }) {
    const coin = await this.api.getCoinByContract(coinContract);
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
          coin.contractAddress as Address,
          ADDRESSES[base.id].universalRouter,
        ],
      }),
    ]);
    const permit = {
      details: {
        token: coin.contractAddress as Address,
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
    const commandBuilder = new CommandBuilder();
    commandBuilder.addPermit2Permit(permit, signature);
    const [signCommands, signInputs] = commandBuilder.build();
    const { commands: sellCommands, inputs: sellInputs } =
      await this.api.getSellArgsByContract(coinContract, {
        walletAddress: account.address,
        amount: amount.toString(),
      });
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

  /**
   * Retrieves the amount of coin with coinId you would get in exchange of the amount of ETH in wei.
   *
   * @param coinId The id of the coin
   * @param amount The amount of ETH in wei to be quoted
   * @returns The amount of coin you would receive in exchange
   */
  getQuote(coinId: string, amount: bigint) {
    return this.api.getQuoteById(coinId, { amount: amount.toString() });
  }

  /**
   * Retrieves the amount of coin with coinId you would get in exchange of the amount of ETH in wei.
   *
   * @param coinContract The contract address of the coin
   * @param amount The amount of ETH in wei to be quoted
   * @returns The amount of coin you would receive in exchange
   */
  getQuoteByContract(coinContract: string, amount: bigint) {
    return this.api.getQuoteByContract(coinContract, {
      amount: amount.toString(),
    });
  }

  /**
   * Retrieves the 50 most popular coins.
   *
   * @returns An array of coin objects
   */
  getPopularCoins() {
    return this.api.getPopularCoins();
  }
}

/**
 * Optional factory function to create an instance of the API client.
 *
 * @remarks
 * This function is tree-shakeable.
 *
 * @returns A new instance of the {@link ParagraphAPI}.
 */
export const createParagraphAPI = () => new ParagraphAPI();

// Re-export generated types for consumers
export * from "./generated/models";
