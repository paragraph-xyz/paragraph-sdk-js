[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / GetPostsFeed200ItemsItemUser

# Type Alias: GetPostsFeed200ItemsItemUser

> **GetPostsFeed200ItemsItemUser** = `object`

Defined in: generated/models/getPostsFeed200ItemsItemUser.ts:19

The user who owns the publication this post belongs to

## Properties

### avatarUrl?

> `optional` **avatarUrl**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemUser.ts:28

URL to the user's avatar image

***

### bio?

> `optional` **bio**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemUser.ts:37

Brief biography of the user (max 500 characters)

#### Max Length

500

***

### farcaster?

> `optional` **farcaster**: [`GetPostsFeed200ItemsItemUserFarcaster`](GetPostsFeed200ItemsItemUserFarcaster.md)

Defined in: generated/models/getPostsFeed200ItemsItemUser.ts:39

Farcaster profile information, if linked

***

### id

> **id**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemUser.ts:21

Unique identifier for the user

***

### name?

> `optional` **name**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemUser.ts:32

Display name of the user

***

### publicationId

> **publicationId**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemUser.ts:30

ID of the publication this user belongs to

***

### walletAddress?

> `optional` **walletAddress**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemUser.ts:26

Wallet address of the user

#### Pattern

^0x[a-fA-F0-9]{40}$
