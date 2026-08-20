[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / PostUpdateIdentifier

# Type Alias: PostUpdateIdentifier

> **PostUpdateIdentifier** = [`PostUpdateById`](PostUpdateById.md) \| [`PostUpdateBySlug`](PostUpdateBySlug.md)

Defined in: [src/types.ts:156](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/9af51a10ecc9b27c229e13a34e1b2fed4c13405d/src/types.ts#L156)

A discriminated union of identifiers for updating a post.
Use one of the following shapes:
- `{ id: string }` to update a post by its unique ID.
- `{ slug: string }` to update a post by its URL-friendly slug.
