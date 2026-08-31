[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / UpdateContentBody

# Type Alias: UpdateContentBody

> **UpdateContentBody** = `object`

Defined in: src/generated/models/updateContentBody.ts:16

## Properties

### body?

> `optional` **body?**: [`UpdateContentBodyBody`](UpdateContentBodyBody.md)

Defined in: src/generated/models/updateContentBody.ts:24

The replacement artifact, in the shape this piece's kind uses

***

### bucketId?

> `optional` **bucketId?**: `string`

Defined in: src/generated/models/updateContentBody.ts:26

Group this piece with the post it was made from, so the writer sees them together in Content. Get the id from `POST /v1/posts/{postId}/bucket`. Omit for standalone work that isn't derived from anything.

***

### title?

> `optional` **title?**: `string`

Defined in: src/generated/models/updateContentBody.ts:22

New name for this piece in your library

#### Min Length

1

#### Max Length

200
