[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / GetPostsFeed200ItemsItemPost

# Type Alias: GetPostsFeed200ItemsItemPost

> **GetPostsFeed200ItemsItemPost** = `object`

Defined in: src/generated/models/getPostsFeed200ItemsItemPost.ts:20

The post content

## Properties

### authorIds?

> `optional` **authorIds?**: `string`[]

Defined in: src/generated/models/getPostsFeed200ItemsItemPost.ts:58

IDs of the authors of this post

***

### authors?

> `optional` **authors?**: [`GetPostsFeed200ItemsItemPostAuthorsItem`](GetPostsFeed200ItemsItemPostAuthorsItem.md)[]

Defined in: src/generated/models/getPostsFeed200ItemsItemPost.ts:56

Authors of this post

***

### categories?

> `optional` **categories?**: `string`[]

Defined in: src/generated/models/getPostsFeed200ItemsItemPost.ts:54

Categories/tags associated with this post

***

### coinId?

> `optional` **coinId?**: `string`

Defined in: src/generated/models/getPostsFeed200ItemsItemPost.ts:52

ID of the associated coin, if the post is coined

***

### id

> **id**: `string`

Defined in: src/generated/models/getPostsFeed200ItemsItemPost.ts:22

Unique identifier for the post

***

### imageUrl?

> `optional` **imageUrl?**: `string`

Defined in: src/generated/models/getPostsFeed200ItemsItemPost.ts:29

Optional URL to the post's main image

***

### json?

> `optional` **json?**: `string`

Defined in: src/generated/models/getPostsFeed200ItemsItemPost.ts:48

TipTap JSON representation of the post content structure. This is the source of truth that the staticHtml and markdown is generated from

***

### markdown?

> `optional` **markdown?**: `string`

Defined in: src/generated/models/getPostsFeed200ItemsItemPost.ts:50

Markdown source of the post content

***

### publishedAt?

> `optional` **publishedAt?**: `string`

Defined in: src/generated/models/getPostsFeed200ItemsItemPost.ts:31

Epoch timestamp when the post was published

***

### slug

> **slug**: `string`

Defined in: src/generated/models/getPostsFeed200ItemsItemPost.ts:44

URL-friendly identifier for the post; accessible at paragraph.com/@[publicationSlug]/[slug]

#### Min Length

1

#### Max Length

256

***

### staticHtml?

> `optional` **staticHtml?**: `string`

Defined in: src/generated/models/getPostsFeed200ItemsItemPost.ts:46

Rendered HTML content of the post

***

### status?

> `optional` **status?**: [`GetPostsFeed200ItemsItemPostStatus`](GetPostsFeed200ItemsItemPostStatus.md)

Defined in: src/generated/models/getPostsFeed200ItemsItemPost.ts:62

Current publish status. Only set on authenticated endpoints (listOwn, getById for your own post). Use this instead of publishedAt to determine publish state — publishedAt is preserved across unpublishing.

***

### subtitle?

> `optional` **subtitle?**: `string`

Defined in: src/generated/models/getPostsFeed200ItemsItemPost.ts:38

Optional subtitle or brief summary

#### Max Length

300

***

### title

> **title**: `string`

Defined in: src/generated/models/getPostsFeed200ItemsItemPost.ts:27

Title of the post

#### Max Length

200

***

### updatedAt?

> `optional` **updatedAt?**: `string`

Defined in: src/generated/models/getPostsFeed200ItemsItemPost.ts:33

Epoch timestamp when the post was last updated

***

### views?

> `optional` **views?**: `number`

Defined in: src/generated/models/getPostsFeed200ItemsItemPost.ts:60

Total views. Only included when fetching your own posts via GET /v1/posts
