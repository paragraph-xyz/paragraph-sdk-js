[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / GetPostsFeed200ItemsItemPostAuthorsItem

# Type Alias: GetPostsFeed200ItemsItemPostAuthorsItem

> **GetPostsFeed200ItemsItemPostAuthorsItem** = `object`

Defined in: generated/models/getPostsFeed200ItemsItemPostAuthorsItem.ts:16

## Properties

### avatarUrl?

> `optional` **avatarUrl**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPostAuthorsItem.ts:25

URL to the user's avatar image

***

### bio?

> `optional` **bio**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPostAuthorsItem.ts:34

Brief biography of the user (max 500 characters)

#### Max Length

500

***

### farcaster?

> `optional` **farcaster**: [`GetPostsFeed200ItemsItemPostAuthorsItemFarcaster`](GetPostsFeed200ItemsItemPostAuthorsItemFarcaster.md)

Defined in: generated/models/getPostsFeed200ItemsItemPostAuthorsItem.ts:36

Farcaster profile information, if linked

***

### id

> **id**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPostAuthorsItem.ts:18

Unique identifier for the user

***

### name?

> `optional` **name**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPostAuthorsItem.ts:29

Display name of the user

***

### publicationId

> **publicationId**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPostAuthorsItem.ts:27

ID of the publication this user belongs to

***

### walletAddress?

> `optional` **walletAddress**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPostAuthorsItem.ts:23

Wallet address of the user

#### Pattern

^0x[a-fA-F0-9]{40}$
