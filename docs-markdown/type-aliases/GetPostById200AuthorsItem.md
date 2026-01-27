[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / GetPostById200AuthorsItem

# Type Alias: GetPostById200AuthorsItem

> **GetPostById200AuthorsItem** = `object`

Defined in: generated/models/getPostById200AuthorsItem.ts:16

## Properties

### avatarUrl?

> `optional` **avatarUrl**: `string`

Defined in: generated/models/getPostById200AuthorsItem.ts:25

URL to the user's avatar image

***

### bio?

> `optional` **bio**: `string`

Defined in: generated/models/getPostById200AuthorsItem.ts:34

Brief biography of the user (max 500 characters)

#### Max Length

500

***

### farcaster?

> `optional` **farcaster**: [`GetPostById200AuthorsItemFarcaster`](GetPostById200AuthorsItemFarcaster.md)

Defined in: generated/models/getPostById200AuthorsItem.ts:36

Farcaster profile information, if linked

***

### id

> **id**: `string`

Defined in: generated/models/getPostById200AuthorsItem.ts:18

Unique identifier for the user

***

### name?

> `optional` **name**: `string`

Defined in: generated/models/getPostById200AuthorsItem.ts:29

Display name of the user

***

### publicationId?

> `optional` **publicationId**: `string`

Defined in: generated/models/getPostById200AuthorsItem.ts:27

ID of the publication this user belongs to

***

### walletAddress?

> `optional` **walletAddress**: `string`

Defined in: generated/models/getPostById200AuthorsItem.ts:23

Wallet address of the user

#### Pattern

^0x[a-fA-F0-9]{40}$
