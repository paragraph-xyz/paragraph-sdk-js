[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / CreatePostBody

# Type Alias: CreatePostBody

> **CreatePostBody** = `object`

Defined in: generated/models/createPostBody.ts:18

## Properties

### categories?

> `optional` **categories?**: [`CreatePostBodyCategories`](CreatePostBodyCategories.md)

Defined in: generated/models/createPostBody.ts:49

Optional array of category tags for the post. Can also be a comma-separated string.

***

### imageUrl?

> `optional` **imageUrl?**: `string`

Defined in: generated/models/createPostBody.ts:32

Optional URL to the post's cover image

***

### markdown

> **markdown**: `string`

Defined in: generated/models/createPostBody.ts:20

Post content in Markdown format

***

### postPreview?

> `optional` **postPreview?**: `string`

Defined in: generated/models/createPostBody.ts:47

Optional preview text for the post. If not provided, will be generated from content

#### Max Length

500

***

### sendNewsletter?

> `optional` **sendNewsletter?**: [`CreatePostBodySendNewsletter`](CreatePostBodySendNewsletter.md)

Defined in: generated/models/createPostBody.ts:34

Whether to send an email newsletter to subscribers. Default: false

***

### slug?

> `optional` **slug?**: `string`

Defined in: generated/models/createPostBody.ts:42

Optional URL-friendly identifier for the post. If not provided, will be generated from title

#### Min Length

1

#### Max Length

256

***

### status?

> `optional` **status?**: [`CreatePostBodyStatus`](CreatePostBodyStatus.md)

Defined in: generated/models/createPostBody.ts:36

Status of the post. Default: published

***

### subtitle?

> `optional` **subtitle?**: `string`

Defined in: generated/models/createPostBody.ts:30

Optional subtitle or brief summary

#### Max Length

300

***

### title

> **title**: `string`

Defined in: generated/models/createPostBody.ts:25

Title of the post

#### Max Length

200
