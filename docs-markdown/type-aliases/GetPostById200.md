[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / GetPostById200

# Type Alias: GetPostById200

> **GetPostById200** = `object`

Defined in: generated/models/getPostById200.ts:16

## Properties

### authorIds?

> `optional` **authorIds**: `string`[]

Defined in: generated/models/getPostById200.ts:54

IDs of the authors of this post

***

### authors?

> `optional` **authors**: [`GetPostById200AuthorsItem`](GetPostById200AuthorsItem.md)[]

Defined in: generated/models/getPostById200.ts:52

Authors of this post

***

### categories?

> `optional` **categories**: `string`[]

Defined in: generated/models/getPostById200.ts:50

Categories/tags associated with this post

***

### coinId?

> `optional` **coinId**: `string`

Defined in: generated/models/getPostById200.ts:48

ID of the associated coin, if the post is coined

***

### id

> **id**: `string`

Defined in: generated/models/getPostById200.ts:18

Unique identifier for the post

***

### imageUrl?

> `optional` **imageUrl**: `string`

Defined in: generated/models/getPostById200.ts:25

Optional URL to the post's main image

***

### json?

> `optional` **json**: `string`

Defined in: generated/models/getPostById200.ts:44

TipTap JSON representation of the post content structure. This is the source of truth that the staticHtml and markdown is generated from

***

### markdown?

> `optional` **markdown**: `string`

Defined in: generated/models/getPostById200.ts:46

Markdown source of the post content

***

### publishedAt?

> `optional` **publishedAt**: `string`

Defined in: generated/models/getPostById200.ts:27

Epoch timestamp when the post was published

***

### slug

> **slug**: `string`

Defined in: generated/models/getPostById200.ts:40

URL-friendly identifier for the post; accessible at paragraph.com/@[publicationSlug]/[slug]

#### Min Length

1

#### Max Length

256

***

### staticHtml?

> `optional` **staticHtml**: `string`

Defined in: generated/models/getPostById200.ts:42

Rendered HTML content of the post

***

### subtitle?

> `optional` **subtitle**: `string`

Defined in: generated/models/getPostById200.ts:34

Optional subtitle or brief summary

#### Max Length

300

***

### title

> **title**: `string`

Defined in: generated/models/getPostById200.ts:23

Title of the post

#### Max Length

200

***

### updatedAt?

> `optional` **updatedAt**: `string`

Defined in: generated/models/getPostById200.ts:29

Epoch timestamp when the post was last updated
