[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / PostDeleteIdentifier

# Type Alias: PostDeleteIdentifier

> **PostDeleteIdentifier** = \{ `id`: `string`; \} \| \{ `slug`: `string`; \}

Defined in: [src/types.ts:177](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/9f34ce20037165eca7f174f7d2e98adedbdf3897/src/types.ts#L177)

A discriminated union of identifiers for deleting a post.
Use one of the following shapes:
- `{ id: string }` to delete a post by its unique ID.
- `{ slug: string }` to delete a post by its URL-friendly slug.
