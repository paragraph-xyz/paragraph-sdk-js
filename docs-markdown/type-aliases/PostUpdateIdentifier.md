[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / PostUpdateIdentifier

# Type Alias: PostUpdateIdentifier

> **PostUpdateIdentifier** = [`PostUpdateById`](PostUpdateById.md) \| [`PostUpdateBySlug`](PostUpdateBySlug.md)

Defined in: [src/types.ts:150](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/d989030ad9d3ed49131b9e29152befc83c85808d/src/types.ts#L150)

A discriminated union of identifiers for updating a post.
Use one of the following shapes:
- `{ id: string }` to update a post by its unique ID.
- `{ slug: string }` to update a post by its URL-friendly slug.
