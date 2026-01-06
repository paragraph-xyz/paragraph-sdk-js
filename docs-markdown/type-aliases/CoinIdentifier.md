[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / CoinIdentifier

# Type Alias: CoinIdentifier

> **CoinIdentifier** = [`SingleCoinIdentifier`](SingleCoinIdentifier.md) \| [`CoinPopularIdentifier`](CoinPopularIdentifier.md)

Defined in: [types.ts:125](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/d2ed1adbc1c090566c9d33bd26077a5d94c8847e/src/types.ts#L125)

A discriminated union of identifiers for retrieving coins.
Use one of the following shapes:
- `{ id: string }` to get a coin by its unique ID (returns single coin in array).
- `{ contractAddress: string }` to get a coin by its on-chain contract address (returns single coin in array).
- `{ sortBy: "popular" }` to get the most popular coins (returns multiple coins).
