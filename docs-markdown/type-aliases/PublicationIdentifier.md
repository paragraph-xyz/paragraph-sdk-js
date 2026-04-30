[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / PublicationIdentifier

# Type Alias: PublicationIdentifier

> **PublicationIdentifier** = \{ `id`: `string`; \} \| \{ `slug`: `string`; \} \| \{ `domain`: `string`; \}

Defined in: [src/types.ts:44](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/d989030ad9d3ed49131b9e29152befc83c85808d/src/types.ts#L44)

A discriminated union of identifiers for retrieving a single publication.
Use one of the following shapes:
- `{ id: string }` to get a publication by its unique ID.
- `{ slug: string }` to get a publication by its URL-friendly slug.
- `{ domain: string }` to get a publication by its custom domain.
