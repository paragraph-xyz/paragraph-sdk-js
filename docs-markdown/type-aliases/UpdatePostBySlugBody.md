[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / UpdatePostBySlugBody

# Type Alias: UpdatePostBySlugBody

> **UpdatePostBySlugBody** = `object`

Defined in: src/generated/models/updatePostBySlugBody.ts:19

## Properties

### authorIds?

> `optional` **authorIds?**: `string`[]

Defined in: src/generated/models/updatePostBySlugBody.ts:52

User ids credited as the post's authors, in byline order. Replaces the full list, so include every author you want kept — read the post's current `authorIds` first and start from those. Each id must be the publication's owner or an active team member; ids from outside the publication are rejected. There is no endpoint that enumerates members, so an id has to come from a post you have read (`authorIds` on a single post, or `authors[].id` on a list) or from the writer.

#### Min Items

1

#### Max Items

20

***

### bodyJson?

> `optional` **bodyJson?**: `string`

Defined in: src/generated/models/updatePostBySlugBody.ts:23

Post content as a Tiptap document, JSON-stringified (e.g. '{"type":"doc","content":[...]}'). This accepts ANY Tiptap node the editor supports — including videos, tweets, link cards, callouts, and buttons — so editing a post by round-tripping the `json` returned by get-post preserves everything markdown would drop. Replaces the FULL body; node-type validity is checked by the renderer and an unusable document is rejected. Provide `markdown` OR `bodyJson`, not both.

***

### categories?

> `optional` **categories?**: [`UpdatePostBySlugBodyCategories`](UpdatePostBySlugBodyCategories.md)

Defined in: src/generated/models/updatePostBySlugBody.ts:46

Category tags for the post. Can also be a comma-separated string.

***

### clearImage?

> `optional` **clearImage?**: `boolean`

Defined in: src/generated/models/updatePostBySlugBody.ts:70

When true, removes the post's existing cover/hero image. Ignored if imageUrl is also provided.

***

### imageUrl?

> `optional` **imageUrl?**: `string`

Defined in: src/generated/models/updatePostBySlugBody.ts:68

URL of an image to set as the post's cover/hero image. The image is fetched, re-hosted on Paragraph's CDN, and a placeholder is generated. Pass clearImage: true instead to remove the existing cover.

***

### markdown?

> `optional` **markdown?**: `string`

Defined in: src/generated/models/updatePostBySlugBody.ts:21

Post content in Markdown format. Replaces the FULL body. Markdown cannot represent buttons, linked images, or embedded media (videos, tweets, link cards) — replacing a post that has any of those with `markdown` drops them. Use `bodyJson` (round-tripped from get-post) to edit an existing post so nothing is lost. Provide `markdown` OR `bodyJson`, not both.

***

### postPreview?

> `optional` **postPreview?**: `string`

Defined in: src/generated/models/updatePostBySlugBody.ts:44

Preview text for the post

#### Max Length

500

***

### publishedAt?

> `optional` **publishedAt?**: `number`

Defined in: src/generated/models/updatePostBySlugBody.ts:66

Unix timestamp (milliseconds) to set as the post's publish date. Once set, the date is preserved across re-publishes.

#### Minimum

0

***

### scheduledAt?

> `optional` **scheduledAt?**: [`UpdatePostBySlugBodyScheduledAt`](UpdatePostBySlugBodyScheduledAt.md)

Defined in: src/generated/models/updatePostBySlugBody.ts:59

Unix timestamp (milliseconds) to schedule the post's first publish at a future time. Must be in the future and at most 30 days out. Only valid for draft posts that haven't been published or already scheduled. Cannot be combined with status: 'draft' or 'archived'. Pass null to cancel a previously scheduled publish. The value 0 is treated the same as omitting the field (no scheduling request); note that on an already-scheduled post, omitting `scheduledAt` while changing `status` cancels the schedule.

#### Minimum

0

***

### sendNewsletter?

> `optional` **sendNewsletter?**: [`UpdatePostBySlugBodySendNewsletter`](UpdatePostBySlugBodySendNewsletter.md)

Defined in: src/generated/models/updatePostBySlugBody.ts:61

Whether to send an email newsletter to subscribers when the post publishes. Only meaningful when publishing (status: 'published') or scheduling (scheduledAt set). Default: false

***

### slug?

> `optional` **slug?**: `string`

Defined in: src/generated/models/updatePostBySlugBody.ts:39

URL-friendly identifier for the post

#### Min Length

1

#### Max Length

256

***

### status?

> `optional` **status?**: [`UpdatePostBySlugBodyStatus`](UpdatePostBySlugBodyStatus.md)

Defined in: src/generated/models/updatePostBySlugBody.ts:54

Set to 'published' to publish a draft or keep an already-live post published after edits, 'draft' to unpublish, or 'archived' to archive

***

### subtitle?

> `optional` **subtitle?**: `string`

Defined in: src/generated/models/updatePostBySlugBody.ts:33

Optional subtitle or brief summary

#### Max Length

300

***

### title?

> `optional` **title?**: `string`

Defined in: src/generated/models/updatePostBySlugBody.ts:28

Title of the post

#### Max Length

200
