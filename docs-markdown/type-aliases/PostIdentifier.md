[**@paragraph_xyz/sdk**](../README.md)

***

[@paragraph_xyz/sdk](../README.md) / PostIdentifier

# Type Alias: PostIdentifier

> **PostIdentifier** = \{ `id`: `string`; \} \| \{ `postSlug`: `string`; `publicationId`: `string`; \} \| \{ `postSlug`: `string`; `publicationSlug`: `string`; \}

Defined in: [src/index.ts:39](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/f6ee8760fca9880dc4faee73d40c558f3dab439d/src/index.ts#L39)

A discriminated union of identifiers for retrieving a single post.
Use one of the following shapes:
- `{ id: string }` to get a post by its unique ID.
- `{ publicationId: string; postSlug: string }` to get a post by its slug within a known publication ID.
- `{ publicationSlug: string; postSlug: string }` to get a post by both the publication's and post's slugs.
