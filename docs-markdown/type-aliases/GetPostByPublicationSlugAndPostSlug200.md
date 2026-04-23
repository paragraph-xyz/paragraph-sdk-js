[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / GetPostByPublicationSlugAndPostSlug200

# Type Alias: GetPostByPublicationSlugAndPostSlug200

> **GetPostByPublicationSlugAndPostSlug200** = `object`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:17

## Properties

### authorIds?

> `optional` **authorIds?**: `string`[]

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:55

IDs of the authors of this post

***

### authors?

> `optional` **authors?**: [`GetPostByPublicationSlugAndPostSlug200AuthorsItem`](GetPostByPublicationSlugAndPostSlug200AuthorsItem.md)[]

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:53

Authors of this post

***

### categories?

> `optional` **categories?**: `string`[]

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:51

Categories/tags associated with this post

***

### coinId?

> `optional` **coinId?**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:49

ID of the associated coin, if the post is coined

***

### id

> **id**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:19

Unique identifier for the post

***

### imageUrl?

> `optional` **imageUrl?**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:26

Optional URL to the post's main image

***

### json?

> `optional` **json?**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:45

TipTap JSON representation of the post content structure. This is the source of truth that the staticHtml and markdown is generated from

***

### markdown?

> `optional` **markdown?**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:47

Markdown source of the post content

***

### publishedAt?

> `optional` **publishedAt?**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:28

Epoch timestamp when the post was published

***

### slug

> **slug**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:41

URL-friendly identifier for the post; accessible at paragraph.com/@[publicationSlug]/[slug]

#### Min Length

1

#### Max Length

256

***

### staticHtml?

> `optional` **staticHtml?**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:43

Rendered HTML content of the post

***

### status?

> `optional` **status?**: [`GetPostByPublicationSlugAndPostSlug200Status`](GetPostByPublicationSlugAndPostSlug200Status.md)

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:59

Current publish status. Only set on authenticated endpoints (listOwn, getById for your own post). Use this instead of publishedAt to determine publish state — publishedAt is preserved across unpublishing.

***

### subtitle?

> `optional` **subtitle?**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:35

Optional subtitle or brief summary

#### Max Length

300

***

### title

> **title**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:24

Title of the post

#### Max Length

200

***

### updatedAt?

> `optional` **updatedAt?**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:30

Epoch timestamp when the post was last updated

***

### views?

> `optional` **views?**: `number`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:57

Total views. Only included when fetching your own posts via GET /v1/posts
