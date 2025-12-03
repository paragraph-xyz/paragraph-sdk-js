[**@paragraph_xyz/sdk**](../README.md)

***

[@paragraph_xyz/sdk](../README.md) / PostQueryOptions

# Type Alias: PostQueryOptions

> **PostQueryOptions** = `Parameters`\<`ReturnType`\<*typeof* `getParagraphAPI`\>\[`"getPostById"`\]\>\[`1`\]

Defined in: [src/index.ts:49](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/f6ee8760fca9880dc4faee73d40c558f3dab439d/src/index.ts#L49)

Type helper to extract the query options for getting a post.
It correctly infers the type from the generated API client's method signature,
ensuring the types are always in sync.
