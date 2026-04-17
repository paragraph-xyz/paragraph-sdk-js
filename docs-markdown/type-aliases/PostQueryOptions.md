[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / PostQueryOptions

# Type Alias: PostQueryOptions

> **PostQueryOptions** = `Parameters`\<`ReturnType`\<*typeof* `getParagraphAPI`\>\[`"getPostById"`\]\>\[`1`\]

Defined in: [src/types.ts:165](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/e15009bc89c1d201aa38ea9cccb188b784897166/src/types.ts#L165)

Type helper to extract the query options for getting a post.
It correctly infers the type from the generated API client's method signature,
ensuring the types are always in sync.
