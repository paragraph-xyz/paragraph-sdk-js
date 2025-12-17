import {
  Account,
  Address,
  createPublicClient,
  http,
  WalletClient,
} from "viem";
import { base } from "viem/chains";
import { ADDRESSES } from "@whetstone-research/doppler-sdk";
import { signPermit } from "doppler-router/dist/Permit2";
import { CommandBuilder } from "doppler-router";

import { getParagraphAPI } from "../generated/api";
import type { GetCoin200 } from "../generated/models";
import type { CoinIdentifier, SingleCoinIdentifier } from "../types";
import { QueryResult, singleItemResult, executeAbi, permit2Abi } from "../utils";

/**
 * Coins resource handler.
 * Access via `api.coins`
 */
export class CoinsResource {
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
