[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / UserIdentifier

# Type Alias: UserIdentifier

> **UserIdentifier** = \{ `id`: `string`; \} \| \{ `wallet`: `string`; \}

Defined in: [types.ts:95](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/d2ed1adbc1c090566c9d33bd26077a5d94c8847e/src/types.ts#L95)

A discriminated union of identifiers for retrieving a single user.
Use one of the following shapes:
- `{ id: string }` to get a user by their unique ID.
- `{ wallet: string }` to get a user by their Ethereum wallet address.
