[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / PostUpdateIdentifier

# Type Alias: PostUpdateIdentifier

> **PostUpdateIdentifier** = [`PostUpdateById`](PostUpdateById.md) \| [`PostUpdateBySlug`](PostUpdateBySlug.md)

Defined in: [src/types.ts:169](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/9f34ce20037165eca7f174f7d2e98adedbdf3897/src/types.ts#L169)

A discriminated union of identifiers for updating a post.
Use one of the following shapes:
- `{ id: string }` to update a post by its unique ID.
- `{ slug: string }` to update a post by its URL-friendly slug.
