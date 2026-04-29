[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / UserIdentifier

# Type Alias: UserIdentifier

> **UserIdentifier** = \{ `id`: `string`; \} \| \{ `wallet`: `string`; \}

Defined in: [src/types.ts:102](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/7e712bc0791b41c54f277db087b57bff8eaccc5e/src/types.ts#L102)

A discriminated union of identifiers for retrieving a single user.
Use one of the following shapes:
- `{ id: string }` to get a user by their unique ID.
- `{ wallet: string }` to get a user by their Ethereum wallet address.
