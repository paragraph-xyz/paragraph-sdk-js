[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / deletePostParams

# Variable: deletePostParams

> `const` **deletePostParams**: `ZodObject`\<\{ `postId`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `postId`: `string`; \}, \{ `postId`: `string`; \}\>

Defined in: generated/zod.ts:445

Permanently delete a post from your publication. The publication is identified by the API key provided in the Authorization header.

*Warning:** This action is irreversible. The post and all related data (comments, notifications, drafts) will be permanently deleted.
