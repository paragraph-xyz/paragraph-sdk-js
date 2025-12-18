[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / GetPostsFeed200ItemsItemPost

# Type Alias: GetPostsFeed200ItemsItemPost

> **GetPostsFeed200ItemsItemPost** = `object`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:18

The post content

## Properties

### coinId?

> `optional` **coinId**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:50

ID of the associated coin, if the post is coined

***

### id

> **id**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:20

Unique identifier for the post

***

### imageUrl?

> `optional` **imageUrl**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:27

Optional URL to the post's main image

***

### json?

> `optional` **json**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:46

TipTap JSON representation of the post content structure. This is the source of truth that the staticHtml and markdown is generated from

***

### markdown?

> `optional` **markdown**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:48

Markdown source of the post content

***

### publishedAt?

> `optional` **publishedAt**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:29

Epoch timestamp when the post was published

***

### slug

> **slug**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:42

URL-friendly identifier for the post; accessible at paragraph.com/@[publicationSlug]/[slug]

#### Min Length

1

#### Max Length

256

***

### staticHtml?

> `optional` **staticHtml**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:44

Rendered HTML content of the post

***

### subtitle?

> `optional` **subtitle**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:36

Optional subtitle or brief summary

#### Max Length

300

***

### title

> **title**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:25

Title of the post

#### Max Length

200

***

### updatedAt?

> `optional` **updatedAt**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:31

Epoch timestamp when the post was last updated
