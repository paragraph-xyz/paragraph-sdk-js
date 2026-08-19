[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / CreateContentBody

# Type Alias: CreateContentBody

> **CreateContentBody** = `object`

Defined in: src/generated/models/createContentBody.ts:17

## Properties

### body

> **body**: [`CreateContentBodyBody`](CreateContentBodyBody.md)

Defined in: src/generated/models/createContentBody.ts:27

The artifact itself, in the shape this kind uses

***

### kind

> **kind**: [`CreateContentBodyKind`](CreateContentBodyKind.md)

Defined in: src/generated/models/createContentBody.ts:19

What kind of piece this is

***

### title

> **title**: `string`

Defined in: src/generated/models/createContentBody.ts:25

What this piece is called in your library. Sentence case, no trailing period. Not published anywhere — for an X Article headline, use `body.title`.

#### Min Length

1

#### Max Length

200
