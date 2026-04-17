[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / ListOwnPostsParams

# Type Alias: ListOwnPostsParams

> **ListOwnPostsParams** = `object`

Defined in: src/generated/models/listOwnPostsParams.ts:16

## Properties

### cursor?

> `optional` **cursor?**: `string`

Defined in: src/generated/models/listOwnPostsParams.ts:20

Cursor for pagination

***

### includeContent?

> `optional` **includeContent?**: `boolean` \| `string`

Defined in: src/generated/models/listOwnPostsParams.ts:30

Include full content fields (markdown, json, staticHtml). Default: false

***

### limit?

> `optional` **limit?**: `number`

Defined in: src/generated/models/listOwnPostsParams.ts:26

Maximum number of items to return (1-100, default: 10)

#### Minimum

1

#### Maximum

100

***

### status?

> `optional` **status?**: [`ListOwnPostsStatus`](ListOwnPostsStatus.md)

Defined in: src/generated/models/listOwnPostsParams.ts:34

Filter by post status. Default: published
