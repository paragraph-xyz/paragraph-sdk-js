[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / updatePostParams

# Variable: updatePostParams

> `const` **updatePostParams**: `ZodObject`\<\{ `postId`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `postId`: `string`; \}, \{ `postId`: `string`; \}\>

Defined in: generated/zod.ts:405

Update an existing post in your publication. The publication is identified by the API key provided in the Authorization header.

*Behavior:**
- Only provided fields are updated; omitted fields remain unchanged
- When `markdown` is provided, it replaces the full content. Rich blocks (embeds, buttons, callouts) created in the editor will be lost — the markdown to editor conversion is lossy for blocks without a markdown equivalent
- Set `status` to `"published"` to publish a draft, `"draft"` to unpublish, or `"archived"` to archive
