[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / GetPosts200ItemsItem

# Type Alias: GetPosts200ItemsItem

> **GetPosts200ItemsItem** = `object`

Defined in: src/generated/models/getPosts200ItemsItem.ts:17

## Properties

### authorIds?

> `optional` **authorIds?**: `string`[]

Defined in: src/generated/models/getPosts200ItemsItem.ts:55

IDs of the authors of this post

***

### authors?

> `optional` **authors?**: [`GetPosts200ItemsItemAuthorsItem`](GetPosts200ItemsItemAuthorsItem.md)[]

Defined in: src/generated/models/getPosts200ItemsItem.ts:53

Authors of this post

***

### categories?

> `optional` **categories?**: `string`[]

Defined in: src/generated/models/getPosts200ItemsItem.ts:51

Categories/tags associated with this post

***

### coinId?

> `optional` **coinId?**: `string`

Defined in: src/generated/models/getPosts200ItemsItem.ts:49

ID of the associated coin, if the post is coined

***

### id

> **id**: `string`

Defined in: src/generated/models/getPosts200ItemsItem.ts:19

Unique identifier for the post

***

### imageUrl?

> `optional` **imageUrl?**: `string`

Defined in: src/generated/models/getPosts200ItemsItem.ts:26

Optional URL to the post's main image

***

### json?

> `optional` **json?**: `string`

Defined in: src/generated/models/getPosts200ItemsItem.ts:45

TipTap JSON representation of the post content structure. This is the source of truth that the staticHtml and markdown is generated from

***

### markdown?

> `optional` **markdown?**: `string`

Defined in: src/generated/models/getPosts200ItemsItem.ts:47

Markdown source of the post content

***

### publishedAt?

> `optional` **publishedAt?**: `string`

Defined in: src/generated/models/getPosts200ItemsItem.ts:28

Epoch timestamp when the post was published

***

### slug

> **slug**: `string`

Defined in: src/generated/models/getPosts200ItemsItem.ts:41

URL-friendly identifier for the post; accessible at paragraph.com/@[publicationSlug]/[slug]

#### Min Length

1

#### Max Length

256

***

### staticHtml?

> `optional` **staticHtml?**: `string`

Defined in: src/generated/models/getPosts200ItemsItem.ts:43

Rendered HTML content of the post

***

### status?

> `optional` **status?**: [`GetPosts200ItemsItemStatus`](GetPosts200ItemsItemStatus.md)

Defined in: src/generated/models/getPosts200ItemsItem.ts:59

Current publish status. Only set on authenticated endpoints (listOwn, getById for your own post). Use this instead of publishedAt to determine publish state — publishedAt is preserved across unpublishing.

***

### subtitle?

> `optional` **subtitle?**: `string`

Defined in: src/generated/models/getPosts200ItemsItem.ts:35

Optional subtitle or brief summary

#### Max Length

300

***

### title

> **title**: `string`

Defined in: src/generated/models/getPosts200ItemsItem.ts:24

Title of the post

#### Max Length

200

***

### updatedAt?

> `optional` **updatedAt?**: `string`

Defined in: src/generated/models/getPosts200ItemsItem.ts:30

Epoch timestamp when the post was last updated

***

### views?

> `optional` **views?**: `number`

Defined in: src/generated/models/getPosts200ItemsItem.ts:57

Total page views. Only included when fetching your own posts via GET /v1/posts
