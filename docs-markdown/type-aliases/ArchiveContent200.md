[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / ArchiveContent200

# Type Alias: ArchiveContent200

> **ArchiveContent200** = `object`

Defined in: src/generated/models/archiveContent200.ts:22

## Properties

### archivedAt

> **archivedAt**: [`ArchiveContent200ArchivedAt`](ArchiveContent200ArchivedAt.md)

Defined in: src/generated/models/archiveContent200.ts:42

ISO 8601 timestamp of when this piece was archived, or null

***

### body

> **body**: [`ArchiveContent200Body`](ArchiveContent200Body.md)

Defined in: src/generated/models/archiveContent200.ts:50

The artifact itself, in the shape its kind uses

***

### bucketId

> **bucketId**: [`ArchiveContent200BucketId`](ArchiveContent200BucketId.md)

Defined in: src/generated/models/archiveContent200.ts:44

The bucket grouping this piece with the post it was made from, or null when it stands alone. Read it back with `GET /v1/buckets/{bucketId}`.

***

### createdAt

> **createdAt**: `string`

Defined in: src/generated/models/archiveContent200.ts:46

ISO 8601 timestamp of creation

***

### excerpt

> **excerpt**: `string`

Defined in: src/generated/models/archiveContent200.ts:30

First readable line of the body, for listing views

***

### id

> **id**: `string`

Defined in: src/generated/models/archiveContent200.ts:24

Unique identifier for this piece of content

***

### kind

> **kind**: `string`

Defined in: src/generated/models/archiveContent200.ts:26

What this piece is: `tweet`, `linkedin`, `newsletter`, or `x_article`

***

### lockedReason

> **lockedReason**: [`ArchiveContent200LockedReason`](ArchiveContent200LockedReason.md)

Defined in: src/generated/models/archiveContent200.ts:36

Why this piece can't be edited right now, or null when it can. A queued or in-flight send locks the words, because they go out exactly as written.

***

### publishedAt

> **publishedAt**: [`ArchiveContent200PublishedAt`](ArchiveContent200PublishedAt.md)

Defined in: src/generated/models/archiveContent200.ts:38

ISO 8601 timestamp of the first delivery, or null

***

### scheduled

> **scheduled**: `boolean`

Defined in: src/generated/models/archiveContent200.ts:34

Whether a scheduled send is queued against this piece

***

### status

> **status**: [`ArchiveContent200Status`](ArchiveContent200Status.md)

Defined in: src/generated/models/archiveContent200.ts:32

Whether this piece has been delivered, is still a draft, or was archived

***

### title

> **title**: `string`

Defined in: src/generated/models/archiveContent200.ts:28

What this piece is called in your library

***

### updatedAt

> **updatedAt**: `string`

Defined in: src/generated/models/archiveContent200.ts:48

ISO 8601 timestamp of the last change

***

### url

> **url**: [`ArchiveContent200Url`](ArchiveContent200Url.md)

Defined in: src/generated/models/archiveContent200.ts:40

Where this piece went live, from the same delivery `publishedAt` came from. Null when it hasn't been delivered, and null by design for a channel that publishes no page: a custom email renders into the message itself, so there is no address to link to. Never guessed — a delivery whose id isn't shaped like its channel reports null rather than a link that would 404.
