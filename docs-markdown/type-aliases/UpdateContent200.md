[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / UpdateContent200

# Type Alias: UpdateContent200

> **UpdateContent200** = `object`

Defined in: src/generated/models/updateContent200.ts:21

## Properties

### archivedAt

> **archivedAt**: [`UpdateContent200ArchivedAt`](UpdateContent200ArchivedAt.md)

Defined in: src/generated/models/updateContent200.ts:41

ISO 8601 timestamp of when this piece was archived, or null

***

### body

> **body**: [`UpdateContent200Body`](UpdateContent200Body.md)

Defined in: src/generated/models/updateContent200.ts:47

The artifact itself, in the shape its kind uses

***

### createdAt

> **createdAt**: `string`

Defined in: src/generated/models/updateContent200.ts:43

ISO 8601 timestamp of creation

***

### excerpt

> **excerpt**: `string`

Defined in: src/generated/models/updateContent200.ts:29

First readable line of the body, for listing views

***

### id

> **id**: `string`

Defined in: src/generated/models/updateContent200.ts:23

Unique identifier for this piece of content

***

### kind

> **kind**: `string`

Defined in: src/generated/models/updateContent200.ts:25

What this piece is: `tweet`, `linkedin`, `newsletter`, or `x_article`

***

### lockedReason

> **lockedReason**: [`UpdateContent200LockedReason`](UpdateContent200LockedReason.md)

Defined in: src/generated/models/updateContent200.ts:35

Why this piece can't be edited right now, or null when it can. A queued or in-flight send locks the words, because they go out exactly as written.

***

### publishedAt

> **publishedAt**: [`UpdateContent200PublishedAt`](UpdateContent200PublishedAt.md)

Defined in: src/generated/models/updateContent200.ts:37

ISO 8601 timestamp of the first delivery, or null

***

### scheduled

> **scheduled**: `boolean`

Defined in: src/generated/models/updateContent200.ts:33

Whether a scheduled send is queued against this piece

***

### status

> **status**: [`UpdateContent200Status`](UpdateContent200Status.md)

Defined in: src/generated/models/updateContent200.ts:31

Whether this piece has been delivered, is still a draft, or was archived

***

### title

> **title**: `string`

Defined in: src/generated/models/updateContent200.ts:27

What this piece is called in your library

***

### updatedAt

> **updatedAt**: `string`

Defined in: src/generated/models/updateContent200.ts:45

ISO 8601 timestamp of the last change

***

### url

> **url**: [`UpdateContent200Url`](UpdateContent200Url.md)

Defined in: src/generated/models/updateContent200.ts:39

Where this piece went live, from the same delivery `publishedAt` came from. Null when it hasn't been delivered, and null by design for a channel that publishes no page: a custom email renders into the message itself, so there is no address to link to. Never guessed — a delivery whose id isn't shaped like its channel reports null rather than a link that would 404.
