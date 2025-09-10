[**@paragraph_xyz/sdk**](../README.md)

***

[@paragraph_xyz/sdk](../README.md) / PostQueryOptions

# Type Alias: PostQueryOptions

> **PostQueryOptions** = `Parameters`\<`ReturnType`\<*typeof* `getParagraphAPI`\>\[`"getPostById"`\]\>\[`1`\]

Defined in: [index.ts:21](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/086f3a8b7dcd4b61aade984e95936df9babd9141/src/index.ts#L21)

Type helper to extract the query options for getting a post.
It correctly infers the type from the generated API client's method signature,
ensuring the types are always in sync.
