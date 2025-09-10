[**@paragraph_xyz/sdk**](../README.md)

***

[@paragraph_xyz/sdk](../README.md) / PostIdentifier

# Type Alias: PostIdentifier

> **PostIdentifier** = \{ `id`: `string`; \} \| \{ `postSlug`: `string`; `publicationId`: `string`; \} \| \{ `postSlug`: `string`; `publicationSlug`: `string`; \}

Defined in: [index.ts:11](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/086f3a8b7dcd4b61aade984e95936df9babd9141/src/index.ts#L11)

A discriminated union of identifiers for retrieving a single post.
Use one of the following shapes:
- `{ id: string }` to get a post by its unique ID.
- `{ publicationId: string; postSlug: string }` to get a post by its slug within a known publication ID.
- `{ publicationSlug: string; postSlug: string }` to get a post by both the publication's and post's slugs.
