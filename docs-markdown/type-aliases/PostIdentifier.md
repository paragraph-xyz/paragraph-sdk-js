[**@paragraph_xyz/sdk**](../README.md)

***

[@paragraph_xyz/sdk](../README.md) / PostIdentifier

# Type Alias: PostIdentifier

> **PostIdentifier** = \{ `id`: `string`; \} \| \{ `postSlug`: `string`; `publicationId`: `string`; \} \| \{ `postSlug`: `string`; `publicationSlug`: `string`; \}

Defined in: [src/index.ts:39](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/fd5fe7cabad7f03f42683ab1800fc5e29d4af516/src/index.ts#L39)

A discriminated union of identifiers for retrieving a single post.
Use one of the following shapes:
- `{ id: string }` to get a post by its unique ID.
- `{ publicationId: string; postSlug: string }` to get a post by its slug within a known publication ID.
- `{ publicationSlug: string; postSlug: string }` to get a post by both the publication's and post's slugs.
