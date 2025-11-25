[**@paragraph_xyz/sdk**](../README.md)

***

[@paragraph_xyz/sdk](../README.md) / GetPostById200

# Type Alias: GetPostById200

> **GetPostById200** = `object`

Defined in: generated/models/getPostById200.ts:18

Post details retrieved successfully

## Properties

### coinId?

> `optional` **coinId**: `string`

Defined in: generated/models/getPostById200.ts:50

ID of the associated coin, if the post is coined

***

### id

> **id**: `string`

Defined in: generated/models/getPostById200.ts:20

Unique identifier for the post

***

### imageUrl?

> `optional` **imageUrl**: `string`

Defined in: generated/models/getPostById200.ts:27

Optional URL to the post's main image

***

### json?

> `optional` **json**: `string`

Defined in: generated/models/getPostById200.ts:46

TipTap JSON representation of the post content structure. This is the source of truth that the staticHtml and markdown is generated from

***

### markdown?

> `optional` **markdown**: `string`

Defined in: generated/models/getPostById200.ts:48

Markdown source of the post content

***

### publishedAt?

> `optional` **publishedAt**: `string`

Defined in: generated/models/getPostById200.ts:29

Epoch timestamp when the post was published

***

### slug

> **slug**: `string`

Defined in: generated/models/getPostById200.ts:42

URL-friendly identifier for the post; accessible at paragraph.com/@[publicationSlug]/[slug]

#### Min Length

1

#### Max Length

256

***

### staticHtml?

> `optional` **staticHtml**: `string`

Defined in: generated/models/getPostById200.ts:44

Rendered HTML content of the post

***

### subtitle?

> `optional` **subtitle**: `string`

Defined in: generated/models/getPostById200.ts:36

Optional subtitle or brief summary

#### Max Length

300

***

### title

> **title**: `string`

Defined in: generated/models/getPostById200.ts:25

Title of the post

#### Max Length

200

***

### updatedAt?

> `optional` **updatedAt**: `string`

Defined in: generated/models/getPostById200.ts:31

Epoch timestamp when the post was last updated
