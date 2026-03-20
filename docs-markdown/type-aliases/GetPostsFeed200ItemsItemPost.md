[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / GetPostsFeed200ItemsItemPost

# Type Alias: GetPostsFeed200ItemsItemPost

> **GetPostsFeed200ItemsItemPost** = `object`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:19

The post content

## Properties

### authorIds?

> `optional` **authorIds**: `string`[]

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:57

IDs of the authors of this post

***

### authors?

> `optional` **authors**: [`GetPostsFeed200ItemsItemPostAuthorsItem`](GetPostsFeed200ItemsItemPostAuthorsItem.md)[]

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:55

Authors of this post

***

### categories?

> `optional` **categories**: `string`[]

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:53

Categories/tags associated with this post

***

### coinId?

> `optional` **coinId**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:51

ID of the associated coin, if the post is coined

***

### id

> **id**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:21

Unique identifier for the post

***

### imageUrl?

> `optional` **imageUrl**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:28

Optional URL to the post's main image

***

### json?

> `optional` **json**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:47

TipTap JSON representation of the post content structure. This is the source of truth that the staticHtml and markdown is generated from

***

### markdown?

> `optional` **markdown**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:49

Markdown source of the post content

***

### publishedAt?

> `optional` **publishedAt**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:30

Epoch timestamp when the post was published

***

### slug

> **slug**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:43

URL-friendly identifier for the post; accessible at paragraph.com/@[publicationSlug]/[slug]

#### Min Length

1

#### Max Length

256

***

### staticHtml?

> `optional` **staticHtml**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:45

Rendered HTML content of the post

***

### subtitle?

> `optional` **subtitle**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:37

Optional subtitle or brief summary

#### Max Length

300

***

### title

> **title**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:26

Title of the post

#### Max Length

200

***

### updatedAt?

> `optional` **updatedAt**: `string`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:32

Epoch timestamp when the post was last updated

***

### views?

> `optional` **views**: `number`

Defined in: generated/models/getPostsFeed200ItemsItemPost.ts:59

Total page views. Only included when fetching your own posts via GET /v1/posts
