[**@paragraph_xyz/sdk**](../README.md)

***

[@paragraph_xyz/sdk](../README.md) / PublicationIdentifier

# Type Alias: PublicationIdentifier

> **PublicationIdentifier** = \{ `id`: `string`; \} \| \{ `slug`: `string`; \} \| \{ `domain`: `string`; \}

Defined in: [index.ts:52](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/ab30c6498fe1f1fabf58dbd407f5d66c6e8ae4e5/src/index.ts#L52)

A discriminated union of identifiers for retrieving a single publication.
Use one of the following shapes:
- `{ id: string }` to get a publication by its unique ID.
- `{ slug: string }` to get a publication by its URL-friendly slug.
- `{ domain: string }` to get a publication by its custom domain.
