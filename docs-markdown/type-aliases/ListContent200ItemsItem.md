[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / ListContent200ItemsItem

# Type Alias: ListContent200ItemsItem

> **ListContent200ItemsItem** = `object`

Defined in: src/generated/models/listContent200ItemsItem.ts:20

## Properties

### archivedAt

> **archivedAt**: [`ListContent200ItemsItemArchivedAt`](ListContent200ItemsItemArchivedAt.md)

Defined in: src/generated/models/listContent200ItemsItem.ts:40

ISO 8601 timestamp of when this piece was archived, or null

***

### createdAt

> **createdAt**: `string`

Defined in: src/generated/models/listContent200ItemsItem.ts:42

ISO 8601 timestamp of creation

***

### excerpt

> **excerpt**: `string`

Defined in: src/generated/models/listContent200ItemsItem.ts:28

First readable line of the body, for listing views

***

### id

> **id**: `string`

Defined in: src/generated/models/listContent200ItemsItem.ts:22

Unique identifier for this piece of content

***

### kind

> **kind**: `string`

Defined in: src/generated/models/listContent200ItemsItem.ts:24

What this piece is: `tweet`, `linkedin`, `newsletter`, or `x_article`

***

### lockedReason

> **lockedReason**: [`ListContent200ItemsItemLockedReason`](ListContent200ItemsItemLockedReason.md)

Defined in: src/generated/models/listContent200ItemsItem.ts:34

Why this piece can't be edited right now, or null when it can. A queued or in-flight send locks the words, because they go out exactly as written.

***

### publishedAt

> **publishedAt**: [`ListContent200ItemsItemPublishedAt`](ListContent200ItemsItemPublishedAt.md)

Defined in: src/generated/models/listContent200ItemsItem.ts:36

ISO 8601 timestamp of the first delivery, or null

***

### scheduled

> **scheduled**: `boolean`

Defined in: src/generated/models/listContent200ItemsItem.ts:32

Whether a scheduled send is queued against this piece

***

### status

> **status**: [`ListContent200ItemsItemStatus`](ListContent200ItemsItemStatus.md)

Defined in: src/generated/models/listContent200ItemsItem.ts:30

Whether this piece has been delivered, is still a draft, or was archived

***

### title

> **title**: `string`

Defined in: src/generated/models/listContent200ItemsItem.ts:26

What this piece is called in your library

***

### updatedAt

> **updatedAt**: `string`

Defined in: src/generated/models/listContent200ItemsItem.ts:44

ISO 8601 timestamp of the last change

***

### url

> **url**: [`ListContent200ItemsItemUrl`](ListContent200ItemsItemUrl.md)

Defined in: src/generated/models/listContent200ItemsItem.ts:38

Where this piece went live, from the same delivery `publishedAt` came from. Null when it hasn't been delivered, and null by design for a channel that publishes no page: a custom email renders into the message itself, so there is no address to link to. Never guessed — a delivery whose id isn't shaped like its channel reports null rather than a link that would 404.
