[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / CoinIdentifier

# Type Alias: CoinIdentifier

> **CoinIdentifier** = [`SingleCoinIdentifier`](SingleCoinIdentifier.md) \| [`CoinPopularIdentifier`](CoinPopularIdentifier.md)

Defined in: [types.ts:132](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/f49f6a3e800b3f0ba716e419a0e937fac972d9c6/src/types.ts#L132)

A discriminated union of identifiers for retrieving coins.
Use one of the following shapes:
- `{ id: string }` to get a coin by its unique ID (returns single coin in array).
- `{ contractAddress: string }` to get a coin by its on-chain contract address (returns single coin in array).
- `{ sortBy: "popular" }` to get the most popular coins (returns multiple coins).
