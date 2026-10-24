[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / UserIdentifier

# Type Alias: UserIdentifier

> **UserIdentifier** = \{ `id`: `string`; \} \| \{ `wallet`: `string`; \}

Defined in: [src/types.ts:135](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/446db9a3237991e0c10dd3ec5377be553fb49407/src/types.ts#L135)

A discriminated union of identifiers for retrieving a single user.
Use one of the following shapes:
- `{ id: string }` to get a user by their unique ID.
- `{ wallet: string }` to get a user by their Ethereum wallet address.
