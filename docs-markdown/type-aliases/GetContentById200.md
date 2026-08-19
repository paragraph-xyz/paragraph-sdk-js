[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / GetContentById200

# Type Alias: GetContentById200

> **GetContentById200** = `object`

Defined in: src/generated/models/getContentById200.ts:20

## Properties

### archivedAt

> **archivedAt**: [`GetContentById200ArchivedAt`](GetContentById200ArchivedAt.md)

Defined in: src/generated/models/getContentById200.ts:38

ISO 8601 timestamp of when this piece was archived, or null

***

### body

> **body**: [`GetContentById200Body`](GetContentById200Body.md)

Defined in: src/generated/models/getContentById200.ts:44

The artifact itself, in the shape its kind uses

***

### createdAt

> **createdAt**: `string`

Defined in: src/generated/models/getContentById200.ts:40

ISO 8601 timestamp of creation

***

### excerpt

> **excerpt**: `string`

Defined in: src/generated/models/getContentById200.ts:28

First readable line of the body, for listing views

***

### id

> **id**: `string`

Defined in: src/generated/models/getContentById200.ts:22

Unique identifier for this piece of content

***

### kind

> **kind**: `string`

Defined in: src/generated/models/getContentById200.ts:24

What this piece is: `tweet`, `linkedin`, `newsletter`, or `x_article`

***

### lockedReason

> **lockedReason**: [`GetContentById200LockedReason`](GetContentById200LockedReason.md)

Defined in: src/generated/models/getContentById200.ts:34

Why this piece can't be edited right now, or null when it can. A queued or in-flight send locks the words, because they go out exactly as written.

***

### publishedAt

> **publishedAt**: [`GetContentById200PublishedAt`](GetContentById200PublishedAt.md)

Defined in: src/generated/models/getContentById200.ts:36

ISO 8601 timestamp of the first delivery, or null

***

### scheduled

> **scheduled**: `boolean`

Defined in: src/generated/models/getContentById200.ts:32

Whether a scheduled send is queued against this piece

***

### status

> **status**: [`GetContentById200Status`](GetContentById200Status.md)

Defined in: src/generated/models/getContentById200.ts:30

Whether this piece has been delivered, is still a draft, or was archived

***

### title

> **title**: `string`

Defined in: src/generated/models/getContentById200.ts:26

What this piece is called in your library

***

### updatedAt

> **updatedAt**: `string`

Defined in: src/generated/models/getContentById200.ts:42

ISO 8601 timestamp of the last change
