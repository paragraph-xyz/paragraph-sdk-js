[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / PostDeleteIdentifier

# Type Alias: PostDeleteIdentifier

> **PostDeleteIdentifier** = \{ `id`: `string`; \} \| \{ `slug`: `string`; \}

Defined in: [src/types.ts:164](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/9af51a10ecc9b27c229e13a34e1b2fed4c13405d/src/types.ts#L164)

A discriminated union of identifiers for deleting a post.
Use one of the following shapes:
- `{ id: string }` to delete a post by its unique ID.
- `{ slug: string }` to delete a post by its URL-friendly slug.
