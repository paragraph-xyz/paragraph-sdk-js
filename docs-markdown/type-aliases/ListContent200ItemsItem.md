[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / ListContent200ItemsItem

# Type Alias: ListContent200ItemsItem

> **ListContent200ItemsItem** = `object`

Defined in: src/generated/models/listContent200ItemsItem.ts:19

## Properties

### archivedAt

> **archivedAt**: [`ListContent200ItemsItemArchivedAt`](ListContent200ItemsItemArchivedAt.md)

Defined in: src/generated/models/listContent200ItemsItem.ts:37

ISO 8601 timestamp of when this piece was archived, or null

***

### createdAt

> **createdAt**: `string`

Defined in: src/generated/models/listContent200ItemsItem.ts:39

ISO 8601 timestamp of creation

***

### excerpt

> **excerpt**: `string`

Defined in: src/generated/models/listContent200ItemsItem.ts:27

First readable line of the body, for listing views

***

### id

> **id**: `string`

Defined in: src/generated/models/listContent200ItemsItem.ts:21

Unique identifier for this piece of content

***

### kind

> **kind**: `string`

Defined in: src/generated/models/listContent200ItemsItem.ts:23

What this piece is: `tweet`, `linkedin`, `newsletter`, or `x_article`

***

### lockedReason

> **lockedReason**: [`ListContent200ItemsItemLockedReason`](ListContent200ItemsItemLockedReason.md)

Defined in: src/generated/models/listContent200ItemsItem.ts:33

Why this piece can't be edited right now, or null when it can. A queued or in-flight send locks the words, because they go out exactly as written.

***

### publishedAt

> **publishedAt**: [`ListContent200ItemsItemPublishedAt`](ListContent200ItemsItemPublishedAt.md)

Defined in: src/generated/models/listContent200ItemsItem.ts:35

ISO 8601 timestamp of the first delivery, or null

***

### scheduled

> **scheduled**: `boolean`

Defined in: src/generated/models/listContent200ItemsItem.ts:31

Whether a scheduled send is queued against this piece

***

### status

> **status**: [`ListContent200ItemsItemStatus`](ListContent200ItemsItemStatus.md)

Defined in: src/generated/models/listContent200ItemsItem.ts:29

Whether this piece has been delivered, is still a draft, or was archived

***

### title

> **title**: `string`

Defined in: src/generated/models/listContent200ItemsItem.ts:25

What this piece is called in your library

***

### updatedAt

> **updatedAt**: `string`

Defined in: src/generated/models/listContent200ItemsItem.ts:41

ISO 8601 timestamp of the last change
