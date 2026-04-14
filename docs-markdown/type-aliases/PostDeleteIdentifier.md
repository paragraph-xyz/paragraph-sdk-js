[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / PostDeleteIdentifier

# Type Alias: PostDeleteIdentifier

> **PostDeleteIdentifier** = \{ `id`: `string`; \} \| \{ `slug`: `string`; \}

Defined in: [types.ts:158](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/f49f6a3e800b3f0ba716e419a0e937fac972d9c6/src/types.ts#L158)

A discriminated union of identifiers for deleting a post.
Use one of the following shapes:
- `{ id: string }` to delete a post by its unique ID.
- `{ slug: string }` to delete a post by its URL-friendly slug.
