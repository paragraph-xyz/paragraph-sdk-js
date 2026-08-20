[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / CreatePostBody

# Type Alias: CreatePostBody

> **CreatePostBody** = `object`

Defined in: src/generated/models/createPostBody.ts:18

## Properties

### authorIds?

> `optional` **authorIds?**: `string`[]

Defined in: src/generated/models/createPostBody.ts:57

Optional user ids to credit as the post's authors, in byline order. Each id must be the publication's owner or an active team member — ids from outside the publication are rejected. Defaults to the API key's own user.

#### Min Items

1

#### Max Items

20

***

### bodyJson?

> `optional` **bodyJson?**: `string`

Defined in: src/generated/models/createPostBody.ts:22

Post content as a Tiptap document, JSON-stringified (e.g. '{"type":"doc","content":[...]}'). Use instead of `markdown` when the body needs Subscribe/Share/custom buttons or linked images. Validated server-side; an invalid document is rejected. Provide `markdown` OR `bodyJson`, not both.

***

### categories?

> `optional` **categories?**: [`CreatePostBodyCategories`](CreatePostBodyCategories.md)

Defined in: src/generated/models/createPostBody.ts:51

Optional array of category tags for the post. Can also be a comma-separated string.

***

### imageUrl?

> `optional` **imageUrl?**: `string`

Defined in: src/generated/models/createPostBody.ts:34

Optional URL to the post's cover image

***

### markdown?

> `optional` **markdown?**: `string`

Defined in: src/generated/models/createPostBody.ts:20

Post content in Markdown format. Provide `markdown` OR `bodyJson`, not both. Markdown cannot represent buttons or linked images — use `bodyJson` for those.

***

### postPreview?

> `optional` **postPreview?**: `string`

Defined in: src/generated/models/createPostBody.ts:49

Optional preview text for the post. If not provided, will be generated from content

#### Max Length

500

***

### scheduledAt?

> `optional` **scheduledAt?**: `number`

Defined in: src/generated/models/createPostBody.ts:62

Optional Unix timestamp (milliseconds) to schedule first-publish of the post at a future time. Must be in the future. Cannot be combined with status: 'draft'. When set, the post is created and queued to publish (and send newsletter, if requested) at the specified time. Pass 0 or omit the field for an unscheduled post.

#### Minimum

0

***

### sendNewsletter?

> `optional` **sendNewsletter?**: [`CreatePostBodySendNewsletter`](CreatePostBodySendNewsletter.md)

Defined in: src/generated/models/createPostBody.ts:36

Whether to send an email newsletter to subscribers. Default: false

***

### slug?

> `optional` **slug?**: `string`

Defined in: src/generated/models/createPostBody.ts:44

Optional URL-friendly identifier for the post. If not provided, will be generated from title

#### Min Length

1

#### Max Length

256

***

### status?

> `optional` **status?**: [`CreatePostBodyStatus`](CreatePostBodyStatus.md)

Defined in: src/generated/models/createPostBody.ts:38

Status of the post. Default: published

***

### subtitle?

> `optional` **subtitle?**: `string`

Defined in: src/generated/models/createPostBody.ts:32

Optional subtitle or brief summary

#### Max Length

300

***

### title

> **title**: `string`

Defined in: src/generated/models/createPostBody.ts:27

Title of the post

#### Max Length

200
