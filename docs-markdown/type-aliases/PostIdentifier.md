[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / PostIdentifier

# Type Alias: PostIdentifier

> **PostIdentifier** = [`PostIdIdentifier`](PostIdIdentifier.md) \| [`PostByPubIdAndSlugIdentifier`](PostByPubIdAndSlugIdentifier.md) \| [`PostByPubSlugAndSlugIdentifier`](PostByPubSlugAndSlugIdentifier.md) \| [`PostsByPublicationIdIdentifier`](PostsByPublicationIdIdentifier.md)

Defined in: [types.ts:83](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/d2ed1adbc1c090566c9d33bd26077a5d94c8847e/src/types.ts#L83)

A discriminated union of identifiers for retrieving posts.
Use one of the following shapes:
- `{ id: string }` to get a post by its unique ID (returns single post in array).
- `{ publicationId: string; postSlug: string }` to get a post by its slug within a known publication ID (returns single post in array).
- `{ publicationSlug: string; postSlug: string }` to get a post by both the publication's and post's slugs (returns single post in array).
- `{ publicationId: string }` to get a list of posts from a publication (returns multiple posts).
