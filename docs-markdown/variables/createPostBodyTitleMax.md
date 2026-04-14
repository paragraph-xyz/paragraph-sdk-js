[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / createPostBodyTitleMax

# Variable: createPostBodyTitleMax

> `const` **createPostBodyTitleMax**: `200` = `200`

Defined in: generated/zod.ts:591

Create a new post in your publication. The publication is identified by the API key provided in the Authorization header.

*Requirements:**
- `markdown` field is required and will be converted to TipTap JSON format
- `title` field is required

*Behavior:**
- The post will be created as published by default. Set `status` to `"draft"` to create a draft instead
- If `sendNewsletter` is true, an email will be sent to all subscribers when the post publishes
- Set `scheduledAt` (Unix timestamp in milliseconds) to schedule first-publish for a future time. Must be in the future and at most 30 days out. Scheduling cannot be combined with `status: "draft"`. When scheduled, the response `status` is `"scheduled"` and the post publishes (plus sends newsletter, if requested) at the scheduled time.
