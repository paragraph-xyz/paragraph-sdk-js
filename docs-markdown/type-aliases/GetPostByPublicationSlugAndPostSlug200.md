[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / GetPostByPublicationSlugAndPostSlug200

# Type Alias: GetPostByPublicationSlugAndPostSlug200

> **GetPostByPublicationSlugAndPostSlug200** = `object`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:17

## Properties

### authorIds?

> `optional` **authorIds?**: `string`[]

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:63

IDs of the authors of this post

***

### authors?

> `optional` **authors?**: [`GetPostByPublicationSlugAndPostSlug200AuthorsItem`](GetPostByPublicationSlugAndPostSlug200AuthorsItem.md)[]

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:61

Authors of this post

***

### canonicalUrl?

> `optional` **canonicalUrl?**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:55

Canonical URL used in rendered metadata. This does not change the Paragraph permalink.

***

### categories?

> `optional` **categories?**: `string`[]

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:53

Categories/tags associated with this post

***

### coinId?

> `optional` **coinId?**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:51

ID of the associated coin, if the post is coined

***

### communityId?

> `optional` **communityId?**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:59

Subscriber segment id selected for newsletter delivery

***

### id

> **id**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:19

Unique identifier for the post

***

### imageAlt?

> `optional` **imageAlt?**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:28

Alternative text describing the cover image, shown to screen readers and when the image fails to load

***

### imageUrl?

> `optional` **imageUrl?**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:26

Optional URL to the post's main image

***

### json?

> `optional` **json?**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:47

TipTap JSON representation of the post content structure. This is the source of truth that the staticHtml and markdown is generated from

***

### markdown?

> `optional` **markdown?**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:49

Markdown source of the post content

***

### publishedAt?

> `optional` **publishedAt?**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:30

Epoch timestamp when the post was published

***

### publishOnline?

> `optional` **publishOnline?**: `boolean`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:57

Whether the published post is visible on the public website

***

### slug

> **slug**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:43

URL-friendly identifier for the post; accessible at paragraph.com/@[publicationSlug]/[slug]

#### Min Length

1

#### Max Length

256

***

### staticHtml?

> `optional` **staticHtml?**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:45

Rendered HTML content of the post

***

### status?

> `optional` **status?**: [`GetPostByPublicationSlugAndPostSlug200Status`](GetPostByPublicationSlugAndPostSlug200Status.md)

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:67

Current publish status. Only set on authenticated endpoints (listOwn, getById for your own post). Use this instead of publishedAt to determine publish state — publishedAt is preserved across unpublishing.

***

### subtitle?

> `optional` **subtitle?**: `string`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:37

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

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:32

Epoch timestamp when the post was last updated

***

### views?

> `optional` **views?**: `number`

Defined in: src/generated/models/getPostByPublicationSlugAndPostSlug200.ts:65

Total views. Only included when fetching your own posts via GET /v1/posts
