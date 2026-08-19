[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / ListContentParams

# Type Alias: ListContentParams

> **ListContentParams** = `object`

Defined in: src/generated/models/listContentParams.ts:17

## Properties

### cursor?

> `optional` **cursor?**: `string`

Defined in: src/generated/models/listContentParams.ts:21

Cursor for pagination

***

### kind?

> `optional` **kind?**: [`ListContentKind`](ListContentKind.md)

Defined in: src/generated/models/listContentParams.ts:31

Filter by content kind

***

### limit?

> `optional` **limit?**: `number`

Defined in: src/generated/models/listContentParams.ts:27

Maximum number of items to return (1-50, default: 20)

#### Minimum

1

#### Maximum

50

***

### status?

> `optional` **status?**: [`ListContentStatus`](ListContentStatus.md)

Defined in: src/generated/models/listContentParams.ts:35

Filter by lifecycle. `all` (default) is drafts plus delivered pieces; `archived` is the pieces you've put away and never delivered.
