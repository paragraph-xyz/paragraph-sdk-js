[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / updatePostBySlugPathSlugMax

# Variable: updatePostBySlugPathSlugMax

> `const` **updatePostBySlugPathSlugMax**: `256` = `256`

Defined in: generated/zod.ts:688

Update an existing post using its URL slug. The publication is identified by the API key provided in the Authorization header.

*Behavior:**
- Only provided fields are updated; omitted fields remain unchanged
- When `markdown` is provided, it replaces the full content. Rich blocks (embeds, buttons, callouts) created in the editor will be lost
- Set `status` to `"published"` to publish a draft, `"draft"` to unpublish, or `"archived"` to archive
