[**@paragraph_xyz/sdk**](../README.md)

***

[@paragraph_xyz/sdk](../README.md) / CoinIdentifier

# Type Alias: CoinIdentifier

> **CoinIdentifier** = \{ `id`: `string`; \} \| \{ `contractAddress`: `string`; \}

Defined in: [index.ts:70](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/19159302f21740c44dbd814879a33877efafec25/src/index.ts#L70)

A discriminated union of identifiers for retrieving a single coin.
Use one of the following shapes:
- `{ id: string }` to get a coin by its unique ID.
- `{ contractAddress: string }` to get a coin by its on-chain contract address.
