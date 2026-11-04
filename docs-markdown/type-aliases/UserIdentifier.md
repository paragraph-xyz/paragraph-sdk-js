[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / UserIdentifier

# Type Alias: UserIdentifier

> **UserIdentifier** = \{ `id`: `string`; \} \| \{ `wallet`: `string`; \}

Defined in: [src/types.ts:121](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/9f34ce20037165eca7f174f7d2e98adedbdf3897/src/types.ts#L121)

A discriminated union of identifiers for retrieving a single user.
Use one of the following shapes:
- `{ id: string }` to get a user by their unique ID.
- `{ wallet: string }` to get a user by their Ethereum wallet address.
