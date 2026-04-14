[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / updatePostBySlugPathSlugMax

# Variable: updatePostBySlugPathSlugMax

> `const` **updatePostBySlugPathSlugMax**: `256` = `256`

Defined in: generated/zod.ts:699

Update an existing post using its URL slug. The publication is identified by the API key provided in the Authorization header.

*Behavior:**
- Only provided fields are updated; omitted fields remain unchanged
- When `markdown` is provided, it replaces the full content. Rich blocks (embeds, buttons, callouts) created in the editor will be lost
- Set `status` to `"published"` to publish a draft, `"draft"` to unpublish, or `"archived"` to archive
- Set `scheduledAt` (Unix timestamp in milliseconds) to schedule a draft's first-publish for a future time. Must be in the future and at most 30 days out. Only valid for posts that haven't been published or already scheduled. Pass `scheduledAt: null` to cancel a previously scheduled publish (or to reschedule: cancel first, then schedule again with the new time). Set `sendNewsletter: true` alongside `scheduledAt` to email subscribers when the post publishes.
