[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / PostDeleteIdentifier

# Type Alias: PostDeleteIdentifier

> **PostDeleteIdentifier** = \{ `id`: `string`; \} \| \{ `slug`: `string`; \}

Defined in: [src/types.ts:158](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/7e712bc0791b41c54f277db087b57bff8eaccc5e/src/types.ts#L158)

A discriminated union of identifiers for deleting a post.
Use one of the following shapes:
- `{ id: string }` to delete a post by its unique ID.
- `{ slug: string }` to delete a post by its URL-friendly slug.
