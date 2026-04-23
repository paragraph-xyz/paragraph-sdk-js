[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / PostIdentifier

# Type Alias: PostIdentifier

> **PostIdentifier** = [`PostIdIdentifier`](PostIdIdentifier.md) \| [`PostByPubIdAndSlugIdentifier`](PostByPubIdAndSlugIdentifier.md) \| [`PostByPubSlugAndSlugIdentifier`](PostByPubSlugAndSlugIdentifier.md) \| [`PostsByPublicationIdIdentifier`](PostsByPublicationIdIdentifier.md) \| [`PostsByTagIdentifier`](PostsByTagIdentifier.md)

Defined in: [src/types.ts:89](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/ea353856e30eeea324d589cf9d3dee88da4d4f47/src/types.ts#L89)

A discriminated union of identifiers for retrieving posts.
Use one of the following shapes:
- `{ id: string }` to get a post by its unique ID (returns single post in array).
- `{ publicationId: string; postSlug: string }` to get a post by its slug within a known publication ID (returns single post in array).
- `{ publicationSlug: string; postSlug: string }` to get a post by both the publication's and post's slugs (returns single post in array).
- `{ publicationId: string }` to get a list of posts from a publication (returns multiple posts).
- `{ tag: string }` to get a list of posts with a specific tag (returns multiple posts).
