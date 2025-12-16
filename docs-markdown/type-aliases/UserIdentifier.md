[**@paragraph_xyz/sdk**](../README.md)

***

[@paragraph_xyz/sdk](../README.md) / UserIdentifier

# Type Alias: UserIdentifier

> **UserIdentifier** = \{ `id`: `string`; \} \| \{ `wallet`: `string`; \}

Defined in: [index.ts:75](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/ab30c6498fe1f1fabf58dbd407f5d66c6e8ae4e5/src/index.ts#L75)

A discriminated union of identifiers for retrieving a single user.
Use one of the following shapes:
- `{ id: string }` to get a user by their unique ID.
- `{ wallet: string }` to get a user by their Ethereum wallet address.
