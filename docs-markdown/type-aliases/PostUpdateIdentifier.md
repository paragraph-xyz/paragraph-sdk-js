[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / PostUpdateIdentifier

# Type Alias: PostUpdateIdentifier

> **PostUpdateIdentifier** = [`PostUpdateById`](PostUpdateById.md) \| [`PostUpdateBySlug`](PostUpdateBySlug.md)

Defined in: [src/types.ts:169](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/8cc21ba1222dac3f2789e3ca1fd182ea53b383a8/src/types.ts#L169)

A discriminated union of identifiers for updating a post.
Use one of the following shapes:
- `{ id: string }` to update a post by its unique ID.
- `{ slug: string }` to update a post by its URL-friendly slug.
