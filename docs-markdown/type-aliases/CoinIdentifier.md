[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / CoinIdentifier

# Type Alias: CoinIdentifier

> **CoinIdentifier** = [`SingleCoinIdentifier`](SingleCoinIdentifier.md) \| [`CoinPopularIdentifier`](CoinPopularIdentifier.md)

Defined in: [src/types.ts:165](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/446db9a3237991e0c10dd3ec5377be553fb49407/src/types.ts#L165)

A discriminated union of identifiers for retrieving coins.
Use one of the following shapes:
- `{ id: string }` to get a coin by its unique ID (returns single coin in array).
- `{ contractAddress: string }` to get a coin by its on-chain contract address (returns single coin in array).
- `{ sortBy: "popular" }` to get the most popular coins (returns multiple coins).
