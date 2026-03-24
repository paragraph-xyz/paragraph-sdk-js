[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / UserIdentifier

# Type Alias: UserIdentifier

> **UserIdentifier** = \{ `id`: `string`; \} \| \{ `wallet`: `string`; \}

Defined in: [types.ts:102](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/7a67bd47ae5248b20c215f35d9f2785f77cbd5de/src/types.ts#L102)

A discriminated union of identifiers for retrieving a single user.
Use one of the following shapes:
- `{ id: string }` to get a user by their unique ID.
- `{ wallet: string }` to get a user by their Ethereum wallet address.
