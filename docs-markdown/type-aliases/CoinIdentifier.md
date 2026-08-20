[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / CoinIdentifier

# Type Alias: CoinIdentifier

> **CoinIdentifier** = [`SingleCoinIdentifier`](SingleCoinIdentifier.md) \| [`CoinPopularIdentifier`](CoinPopularIdentifier.md)

Defined in: [src/types.ts:138](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/9af51a10ecc9b27c229e13a34e1b2fed4c13405d/src/types.ts#L138)

A discriminated union of identifiers for retrieving coins.
Use one of the following shapes:
- `{ id: string }` to get a coin by its unique ID (returns single coin in array).
- `{ contractAddress: string }` to get a coin by its on-chain contract address (returns single coin in array).
- `{ sortBy: "popular" }` to get the most popular coins (returns multiple coins).
