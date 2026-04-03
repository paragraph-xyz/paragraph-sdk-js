[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / UpdatePostBody

# Type Alias: UpdatePostBody

> **UpdatePostBody** = `object`

Defined in: generated/models/updatePostBody.ts:17

## Properties

### categories?

> `optional` **categories?**: [`UpdatePostBodyCategories`](UpdatePostBodyCategories.md)

Defined in: generated/models/updatePostBody.ts:42

Category tags for the post. Can also be a comma-separated string.

***

### markdown?

> `optional` **markdown?**: `string`

Defined in: generated/models/updatePostBody.ts:19

Post content in Markdown format. Replaces full content — rich blocks created in the editor will be lost

***

### postPreview?

> `optional` **postPreview?**: `string`

Defined in: generated/models/updatePostBody.ts:40

Preview text for the post

#### Max Length

500

***

### slug?

> `optional` **slug?**: `string`

Defined in: generated/models/updatePostBody.ts:35

URL-friendly identifier for the post

#### Min Length

1

#### Max Length

256

***

### status?

> `optional` **status?**: [`UpdatePostBodyStatus`](UpdatePostBodyStatus.md)

Defined in: generated/models/updatePostBody.ts:44

Set to 'published' to publish, 'draft' to unpublish, or 'archived' to archive

***

### subtitle?

> `optional` **subtitle?**: `string`

Defined in: generated/models/updatePostBody.ts:29

Optional subtitle or brief summary

#### Max Length

300

***

### title?

> `optional` **title?**: `string`

Defined in: generated/models/updatePostBody.ts:24

Title of the post

#### Max Length

200
