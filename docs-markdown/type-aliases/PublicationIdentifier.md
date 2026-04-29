[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / PublicationIdentifier

# Type Alias: PublicationIdentifier

> **PublicationIdentifier** = \{ `id`: `string`; \} \| \{ `slug`: `string`; \} \| \{ `domain`: `string`; \}

Defined in: [src/types.ts:44](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/7e712bc0791b41c54f277db087b57bff8eaccc5e/src/types.ts#L44)

A discriminated union of identifiers for retrieving a single publication.
Use one of the following shapes:
- `{ id: string }` to get a publication by its unique ID.
- `{ slug: string }` to get a publication by its URL-friendly slug.
- `{ domain: string }` to get a publication by its custom domain.
