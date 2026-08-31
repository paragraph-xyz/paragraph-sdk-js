[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / PostQueryOptions

# Type Alias: PostQueryOptions

> **PostQueryOptions** = `Parameters`\<`ReturnType`\<*typeof* `getParagraphAPI`\>\[`"getPostById"`\]\>\[`1`\]

Defined in: [src/types.ts:171](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/55b58ecdf1963fab4be76a1b97a1c839e1d4c4fd/src/types.ts#L171)

Type helper to extract the query options for getting a post.
It correctly infers the type from the generated API client's method signature,
ensuring the types are always in sync.
