[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / GetContentBucketById200MembersItem

# Type Alias: GetContentBucketById200MembersItem

> **GetContentBucketById200MembersItem** = `object`

Defined in: src/generated/models/getContentBucketById200MembersItem.ts:21

## Properties

### archivedAt

> **archivedAt**: [`GetContentBucketById200MembersItemArchivedAt`](GetContentBucketById200MembersItemArchivedAt.md)

Defined in: src/generated/models/getContentBucketById200MembersItem.ts:39

ISO 8601 timestamp of when this piece was archived, or null

***

### channel

> **channel**: `string`

Defined in: src/generated/models/getContentBucketById200MembersItem.ts:27

Where this piece is meant to go: `post`, `tweet`, `linkedin`, `newsletter`, `x_article`, or `other`

***

### id

> **id**: `string`

Defined in: src/generated/models/getContentBucketById200MembersItem.ts:25

Identifier of the piece itself

***

### kind

> **kind**: [`GetContentBucketById200MembersItemKind`](GetContentBucketById200MembersItemKind.md)

Defined in: src/generated/models/getContentBucketById200MembersItem.ts:23

What `id` addresses: `post` reads with `GET /v1/posts/{id}`, `content` with `GET /v1/content/{id}`, and `other` can't be read through this API

***

### position

> **position**: `number`

Defined in: src/generated/models/getContentBucketById200MembersItem.ts:41

Display order inside the bucket. The post the group was seeded from is always 0.

***

### publishedAt

> **publishedAt**: [`GetContentBucketById200MembersItemPublishedAt`](GetContentBucketById200MembersItemPublishedAt.md)

Defined in: src/generated/models/getContentBucketById200MembersItem.ts:37

ISO 8601 timestamp of the first delivery, or null

***

### scheduled

> **scheduled**: `boolean`

Defined in: src/generated/models/getContentBucketById200MembersItem.ts:33

Whether a scheduled send is queued against this piece

***

### status

> **status**: [`GetContentBucketById200MembersItemStatus`](GetContentBucketById200MembersItemStatus.md)

Defined in: src/generated/models/getContentBucketById200MembersItem.ts:31

Whether the piece has been delivered, is still a draft, or was archived. Null for a member this API can't read.

***

### title

> **title**: [`GetContentBucketById200MembersItemTitle`](GetContentBucketById200MembersItemTitle.md)

Defined in: src/generated/models/getContentBucketById200MembersItem.ts:29

What the piece is called, or null when it has no name yet

***

### updatedAt

> **updatedAt**: `string`

Defined in: src/generated/models/getContentBucketById200MembersItem.ts:43

ISO 8601 timestamp of the last change to the piece itself, not to its grouping

***

### url

> **url**: [`GetContentBucketById200MembersItemUrl`](GetContentBucketById200MembersItemUrl.md)

Defined in: src/generated/models/getContentBucketById200MembersItem.ts:35

Where this piece went live, or null when it hasn't been delivered. Also null by design for a channel that publishes no page.
