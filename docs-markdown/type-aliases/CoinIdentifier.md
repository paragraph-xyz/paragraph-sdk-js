[**@paragraph_xyz/sdk**](../README.md)

***

[@paragraph_xyz/sdk](../README.md) / CoinIdentifier

# Type Alias: CoinIdentifier

> **CoinIdentifier** = \{ `id`: `string`; \} \| \{ `contractAddress`: `string`; \}

Defined in: [index.ts:83](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/ab30c6498fe1f1fabf58dbd407f5d66c6e8ae4e5/src/index.ts#L83)

A discriminated union of identifiers for retrieving a single coin.
Use one of the following shapes:
- `{ id: string }` to get a coin by its unique ID.
- `{ contractAddress: string }` to get a coin by its on-chain contract address.
