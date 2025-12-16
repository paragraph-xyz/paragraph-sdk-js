[**@paragraph_xyz/sdk**](../README.md)

***

[@paragraph_xyz/sdk](../README.md) / PostListIdentifier

# Type Alias: PostListIdentifier

> **PostListIdentifier** = \{ `publicationId`: `string`; `type`: `"publication"`; \} \| \{ `type`: `"feed"`; \}

Defined in: [index.ts:91](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/b91f24ea96a32150e998e0acff37668c5305f9d3/src/index.ts#L91)

A discriminated union of identifiers for listing posts.
Use one of the following shapes:
- `{ type: "publication", publicationId: string }` to list posts from a specific publication.
- `{ type: "feed" }` to get the curated feed from across the platform.
