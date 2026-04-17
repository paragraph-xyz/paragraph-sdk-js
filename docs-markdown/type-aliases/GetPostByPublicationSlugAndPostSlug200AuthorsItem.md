[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / GetPostByPublicationSlugAndPostSlug200AuthorsItem

# Type Alias: GetPostByPublicationSlugAndPostSlug200AuthorsItem

> **GetPostByPublicationSlugAndPostSlug200AuthorsItem** = `object`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200AuthorsItem.ts:16

## Properties

### avatarUrl?

> `optional` **avatarUrl?**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200AuthorsItem.ts:25

URL to the user's avatar image

***

### bio?

> `optional` **bio?**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200AuthorsItem.ts:34

Brief biography of the user (max 500 characters)

#### Max Length

500

***

### farcaster?

> `optional` **farcaster?**: [`GetPostByPublicationSlugAndPostSlug200AuthorsItemFarcaster`](GetPostByPublicationSlugAndPostSlug200AuthorsItemFarcaster.md)

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200AuthorsItem.ts:36

Farcaster profile information, if linked

***

### id

> **id**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200AuthorsItem.ts:18

Unique identifier for the user

***

### name?

> `optional` **name?**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200AuthorsItem.ts:29

Display name of the user

***

### publicationId

> **publicationId**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200AuthorsItem.ts:27

ID of the publication this user belongs to

***

### walletAddress?

> `optional` **walletAddress?**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200AuthorsItem.ts:23

Wallet address of the user

#### Pattern

^0x[a-fA-F0-9]{40}$
