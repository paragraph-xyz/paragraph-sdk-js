[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / CoinIdentifier

# Type Alias: CoinIdentifier

> **CoinIdentifier** = [`SingleCoinIdentifier`](SingleCoinIdentifier.md) \| [`CoinPopularIdentifier`](CoinPopularIdentifier.md)

Defined in: [types.ts:125](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/cfba7350e3d6fab39d3eab797ebb2d9f87a4bd99/src/types.ts#L125)

A discriminated union of identifiers for retrieving coins.
Use one of the following shapes:
- `{ id: string }` to get a coin by its unique ID (returns single coin in array).
- `{ contractAddress: string }` to get a coin by its on-chain contract address (returns single coin in array).
- `{ sortBy: "popular" }` to get the most popular coins (returns multiple coins).
