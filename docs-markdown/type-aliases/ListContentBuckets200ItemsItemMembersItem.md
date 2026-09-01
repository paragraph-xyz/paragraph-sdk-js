[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / ListContentBuckets200ItemsItemMembersItem

# Type Alias: ListContentBuckets200ItemsItemMembersItem

> **ListContentBuckets200ItemsItemMembersItem** = `object`

Defined in: src/generated/models/listContentBuckets200ItemsItemMembersItem.ts:21

## Properties

### archivedAt

> **archivedAt**: [`ListContentBuckets200ItemsItemMembersItemArchivedAt`](ListContentBuckets200ItemsItemMembersItemArchivedAt.md)

Defined in: src/generated/models/listContentBuckets200ItemsItemMembersItem.ts:39

ISO 8601 timestamp of when this piece was archived, or null

***

### channel

> **channel**: `string`

Defined in: src/generated/models/listContentBuckets200ItemsItemMembersItem.ts:27

Where this piece is meant to go: `post`, `tweet`, `linkedin`, `newsletter`, `x_article`, or `other`

***

### id

> **id**: `string`

Defined in: src/generated/models/listContentBuckets200ItemsItemMembersItem.ts:25

Identifier of the piece itself

***

### kind

> **kind**: [`ListContentBuckets200ItemsItemMembersItemKind`](ListContentBuckets200ItemsItemMembersItemKind.md)

Defined in: src/generated/models/listContentBuckets200ItemsItemMembersItem.ts:23

What `id` addresses: `post` reads with `GET /v1/posts/{id}`, `content` with `GET /v1/content/{id}`, and `other` can't be read through this API

***

### position

> **position**: `number`

Defined in: src/generated/models/listContentBuckets200ItemsItemMembersItem.ts:41

Display order inside the bucket. The post the group was seeded from is always 0.

***

### publishedAt

> **publishedAt**: [`ListContentBuckets200ItemsItemMembersItemPublishedAt`](ListContentBuckets200ItemsItemMembersItemPublishedAt.md)

Defined in: src/generated/models/listContentBuckets200ItemsItemMembersItem.ts:37

ISO 8601 timestamp of the first delivery, or null

***

### scheduled

> **scheduled**: `boolean`

Defined in: src/generated/models/listContentBuckets200ItemsItemMembersItem.ts:33

Whether a scheduled send is queued against this piece

***

### status

> **status**: [`ListContentBuckets200ItemsItemMembersItemStatus`](ListContentBuckets200ItemsItemMembersItemStatus.md)

Defined in: src/generated/models/listContentBuckets200ItemsItemMembersItem.ts:31

Whether the piece has been delivered, is still a draft, or was archived. Null for a member this API can't read.

***

### title

> **title**: [`ListContentBuckets200ItemsItemMembersItemTitle`](ListContentBuckets200ItemsItemMembersItemTitle.md)

Defined in: src/generated/models/listContentBuckets200ItemsItemMembersItem.ts:29

What the piece is called, or null when it has no name yet

***

### updatedAt

> **updatedAt**: `string`

Defined in: src/generated/models/listContentBuckets200ItemsItemMembersItem.ts:43

ISO 8601 timestamp of the last change to the piece itself, not to its grouping

***

### url

> **url**: [`ListContentBuckets200ItemsItemMembersItemUrl`](ListContentBuckets200ItemsItemMembersItemUrl.md)

Defined in: src/generated/models/listContentBuckets200ItemsItemMembersItem.ts:35

Where this piece went live, or null when it hasn't been delivered. Also null by design for a channel that publishes no page.
