[**@paragraph_xyz/sdk**](../README.md)

***

[@paragraph_xyz/sdk](../README.md) / GetUser200

# Type Alias: GetUser200

> **GetUser200** = `object`

Defined in: generated/models/getUser200.ts:16

## Properties

### avatarUrl?

> `optional` **avatarUrl**: `string`

Defined in: generated/models/getUser200.ts:25

URL to the user's avatar image

***

### bio?

> `optional` **bio**: `string`

Defined in: generated/models/getUser200.ts:34

Brief biography of the user (max 500 characters)

#### Max Length

500

***

### farcaster?

> `optional` **farcaster**: [`GetUser200Farcaster`](GetUser200Farcaster.md)

Defined in: generated/models/getUser200.ts:36

Farcaster profile information, if linked

***

### id

> **id**: `string`

Defined in: generated/models/getUser200.ts:18

Unique identifier for the user

***

### name?

> `optional` **name**: `string`

Defined in: generated/models/getUser200.ts:29

Display name of the user

***

### publicationId

> **publicationId**: `string`

Defined in: generated/models/getUser200.ts:27

ID of the publication this user belongs to

***

### walletAddress?

> `optional` **walletAddress**: `string`

Defined in: generated/models/getUser200.ts:23

Wallet address of the user

#### Pattern

^0x[a-fA-F0-9]{40}$
