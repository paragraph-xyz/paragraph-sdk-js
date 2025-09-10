[**@paragraph_xyz/sdk**](../README.md)

***

[@paragraph_xyz/sdk](../README.md) / GetUserByWallet200

# Type Alias: GetUserByWallet200

> **GetUserByWallet200** = `object`

Defined in: generated/models/getUserByWallet200.ts:19

User details retrieved successfully

## Properties

### avatarUrl?

> `optional` **avatarUrl**: `string`

Defined in: generated/models/getUserByWallet200.ts:28

URL to the user's avatar image

***

### bio?

> `optional` **bio**: `string`

Defined in: generated/models/getUserByWallet200.ts:37

Brief biography of the user (max 500 characters)

#### Max Length

500

***

### farcaster?

> `optional` **farcaster**: [`GetUserByWallet200Farcaster`](GetUserByWallet200Farcaster.md)

Defined in: generated/models/getUserByWallet200.ts:39

Farcaster profile information, if linked

***

### id

> **id**: `string`

Defined in: generated/models/getUserByWallet200.ts:21

Unique identifier for the user

***

### name?

> `optional` **name**: `string`

Defined in: generated/models/getUserByWallet200.ts:32

Display name of the user

***

### publicationId

> **publicationId**: `string`

Defined in: generated/models/getUserByWallet200.ts:30

ID of the publication this user belongs to

***

### walletAddress?

> `optional` **walletAddress**: `string`

Defined in: generated/models/getUserByWallet200.ts:26

Wallet address of the user

#### Pattern

^0x[a-fA-F0-9]{40}$
