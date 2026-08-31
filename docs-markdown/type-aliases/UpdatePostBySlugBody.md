[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / UpdatePostBySlugBody

# Type Alias: UpdatePostBySlugBody

> **UpdatePostBySlugBody** = `object`

Defined in: src/generated/models/updatePostBySlugBody.ts:22

## Properties

### authorIds?

> `optional` **authorIds?**: `string`[]

Defined in: src/generated/models/updatePostBySlugBody.ts:55

User ids credited as the post's authors, in byline order. Replaces the full list, so include every author you want kept — read the post's current `authorIds` first and start from those. Each id must be the publication's owner or an active team member; ids from outside the publication are rejected. There is no endpoint that enumerates members, so an id has to come from a post you have read (`authorIds` on a single post, or `authors[].id` on a list) or from the writer.

#### Min Items

1

#### Max Items

20

***

### bodyJson?

> `optional` **bodyJson?**: `string`

Defined in: src/generated/models/updatePostBySlugBody.ts:26

Post content as a Tiptap document, JSON-stringified (e.g. '{"type":"doc","content":[...]}'). This accepts ANY Tiptap node the editor supports — including videos, tweets, link cards, callouts, and buttons — so editing a post by round-tripping the `json` returned by get-post preserves everything markdown would drop. Replaces the FULL body; node-type validity is checked by the renderer and an unusable document is rejected. Provide `markdown` OR `bodyJson`, not both.

***

### canonicalUrl?

> `optional` **canonicalUrl?**: [`UpdatePostBySlugBodyCanonicalUrl`](UpdatePostBySlugBodyCanonicalUrl.md)

Defined in: src/generated/models/updatePostBySlugBody.ts:69

Canonical URL used in rendered metadata. Pass null to clear it. This does not change the post's Paragraph permalink.

#### Max Length

2048

***

### categories?

> `optional` **categories?**: [`UpdatePostBySlugBodyCategories`](UpdatePostBySlugBodyCategories.md)

Defined in: src/generated/models/updatePostBySlugBody.ts:49

Category tags for the post. Can also be a comma-separated string.

***

### clearImage?

> `optional` **clearImage?**: `boolean`

Defined in: src/generated/models/updatePostBySlugBody.ts:86

When true, removes the post's existing cover/hero image. Ignored if imageUrl is also provided.

***

### communityId?

> `optional` **communityId?**: [`UpdatePostBySlugBodyCommunityId`](UpdatePostBySlugBodyCommunityId.md)

Defined in: src/generated/models/updatePostBySlugBody.ts:77

Subscriber segment id for newsletter delivery. Pass null for the general audience. Unavailable or cross-publication segments are rejected rather than broadened.

#### Min Length

1

#### Max Length

128

***

### imageAlt?

> `optional` **imageAlt?**: [`UpdatePostBySlugBodyImageAlt`](UpdatePostBySlugBodyImageAlt.md)

Defined in: src/generated/models/updatePostBySlugBody.ts:91

Alternative text describing the cover image. Set it alongside imageUrl when replacing the image; on its own it re-describes the existing cover. Pass null or an empty string to clear it. Ignored when the post has no cover.

#### Max Length

1000

***

### imageUrl?

> `optional` **imageUrl?**: `string`

Defined in: src/generated/models/updatePostBySlugBody.ts:84

URL of an image to set as the post's cover/hero image. The image is fetched, re-hosted on Paragraph's CDN, and a placeholder is generated. Pass clearImage: true instead to remove the existing cover.

***

### markdown?

> `optional` **markdown?**: `string`

Defined in: src/generated/models/updatePostBySlugBody.ts:24

Post content in Markdown format. Replaces the FULL body. Markdown cannot represent buttons, linked images, or embedded media (videos, tweets, link cards) — replacing a post that has any of those with `markdown` drops them. Use `bodyJson` (round-tripped from get-post) to edit an existing post so nothing is lost. Provide `markdown` OR `bodyJson`, not both.

***

### postPreview?

> `optional` **postPreview?**: `string`

Defined in: src/generated/models/updatePostBySlugBody.ts:47

Preview text for the post

#### Max Length

500

***

### publishedAt?

> `optional` **publishedAt?**: `number`

Defined in: src/generated/models/updatePostBySlugBody.ts:82

Unix timestamp (milliseconds) to set as the post's publish date. Once set, the date is preserved across re-publishes.

#### Minimum

0

***

### publishOnline?

> `optional` **publishOnline?**: `boolean`

Defined in: src/generated/models/updatePostBySlugBody.ts:71

Whether the post should be publicly visible online when published. Set false for newsletter-only delivery.

***

### scheduledAt?

> `optional` **scheduledAt?**: [`UpdatePostBySlugBodyScheduledAt`](UpdatePostBySlugBodyScheduledAt.md)

Defined in: src/generated/models/updatePostBySlugBody.ts:62

Unix timestamp (milliseconds) to schedule the post's first publish at a future time. Must be in the future and at most 30 days out. Only valid for draft posts that haven't been published or already scheduled. Cannot be combined with status: 'draft' or 'archived'. Pass null to cancel a previously scheduled publish. The value 0 is treated the same as omitting the field (no scheduling request); note that on an already-scheduled post, omitting `scheduledAt` while changing `status` cancels the schedule.

#### Minimum

0

***

### sendNewsletter?

> `optional` **sendNewsletter?**: [`UpdatePostBySlugBodySendNewsletter`](UpdatePostBySlugBodySendNewsletter.md)

Defined in: src/generated/models/updatePostBySlugBody.ts:64

Whether to send an email newsletter to subscribers when the post publishes. Only meaningful when publishing (status: 'published') or scheduling (scheduledAt set). Default: false

***

### slug?

> `optional` **slug?**: `string`

Defined in: src/generated/models/updatePostBySlugBody.ts:42

URL-friendly identifier for the post

#### Min Length

1

#### Max Length

256

***

### status?

> `optional` **status?**: [`UpdatePostBySlugBodyStatus`](UpdatePostBySlugBodyStatus.md)

Defined in: src/generated/models/updatePostBySlugBody.ts:57

Set to 'published' to publish a draft or keep an already-live post published after edits, 'draft' to unpublish, or 'archived' to archive

***

### subtitle?

> `optional` **subtitle?**: `string`

Defined in: src/generated/models/updatePostBySlugBody.ts:36

Optional subtitle or brief summary

#### Max Length

300

***

### title?

> `optional` **title?**: `string`

Defined in: src/generated/models/updatePostBySlugBody.ts:31

Title of the post

#### Max Length

200
