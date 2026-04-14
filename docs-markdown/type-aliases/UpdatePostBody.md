[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / UpdatePostBody

# Type Alias: UpdatePostBody

> **UpdatePostBody** = `object`

Defined in: generated/models/updatePostBody.ts:19

## Properties

### categories?

> `optional` **categories?**: [`UpdatePostBodyCategories`](UpdatePostBodyCategories.md)

Defined in: generated/models/updatePostBody.ts:44

Category tags for the post. Can also be a comma-separated string.

***

### markdown?

> `optional` **markdown?**: `string`

Defined in: generated/models/updatePostBody.ts:21

Post content in Markdown format. Replaces full content — rich blocks created in the editor will be lost

***

### postPreview?

> `optional` **postPreview?**: `string`

Defined in: generated/models/updatePostBody.ts:42

Preview text for the post

#### Max Length

500

***

### scheduledAt?

> `optional` **scheduledAt?**: [`UpdatePostBodyScheduledAt`](UpdatePostBodyScheduledAt.md)

Defined in: generated/models/updatePostBody.ts:51

Unix timestamp (milliseconds) to schedule the post's first publish at a future time. Must be in the future and at most 30 days out. Only valid for draft posts that haven't been published or already scheduled. Cannot be combined with status: 'draft' or 'archived'. Pass null to cancel a previously scheduled publish.

#### Minimum

0

***

### sendNewsletter?

> `optional` **sendNewsletter?**: [`UpdatePostBodySendNewsletter`](UpdatePostBodySendNewsletter.md)

Defined in: generated/models/updatePostBody.ts:53

Whether to send an email newsletter to subscribers when the post publishes. Only meaningful when publishing (status: 'published') or scheduling (scheduledAt set). Default: false

***

### slug?

> `optional` **slug?**: `string`

Defined in: generated/models/updatePostBody.ts:37

URL-friendly identifier for the post

#### Min Length

1

#### Max Length

256

***

### status?

> `optional` **status?**: [`UpdatePostBodyStatus`](UpdatePostBodyStatus.md)

Defined in: generated/models/updatePostBody.ts:46

Set to 'published' to publish, 'draft' to unpublish, or 'archived' to archive

***

### subtitle?

> `optional` **subtitle?**: `string`

Defined in: generated/models/updatePostBody.ts:31

Optional subtitle or brief summary

#### Max Length

300

***

### title?

> `optional` **title?**: `string`

Defined in: generated/models/updatePostBody.ts:26

Title of the post

#### Max Length

200
