[**@paragraph_xyz/sdk**](../README.md)

***

[@paragraph_xyz/sdk](../README.md) / GetCoin200

# Type Alias: GetCoin200

> **GetCoin200** = `object`

Defined in: src/generated/models/getCoin200.ts:19

Coin details retrieved successfully

## Properties

### blogId

> **blogId**: `string`

Defined in: src/generated/models/getCoin200.ts:35

ID of the blog this coin is associated with

***

### contractAddress

> **contractAddress**: `string`

Defined in: src/generated/models/getCoin200.ts:26

Base contract address for the coin

#### Pattern

^0x[a-fA-F0-9]{40}$

***

### id

> **id**: `string`

Defined in: src/generated/models/getCoin200.ts:21

Unique identifier for the coin

***

### postId?

> `optional` **postId**: `string`

Defined in: src/generated/models/getCoin200.ts:33

ID of the post this coin is associated with

***

### symbol

> **symbol**: `string`

Defined in: src/generated/models/getCoin200.ts:31

Token symbol

#### Pattern

^[A-Z0-9]{3,6}$

***

### type

> **type**: [`GetCoin200Type`](GetCoin200Type.md)

Defined in: src/generated/models/getCoin200.ts:37

The type of the coin, either a post coin or a writer coin
