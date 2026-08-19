[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / GetPostsFeed200ItemsItemPublication

# Type Alias: GetPostsFeed200ItemsItemPublication

> **GetPostsFeed200ItemsItemPublication** = `object`

Defined in: src/generated/models/getPostsFeed200ItemsItemPublication.ts:23

The publication this post belongs to

## Properties

### bodyFont?

> `optional` **bodyFont?**: [`GetPostsFeed200ItemsItemPublicationBodyFont`](GetPostsFeed200ItemsItemPublicationBodyFont.md)

Defined in: src/generated/models/getPostsFeed200ItemsItemPublication.ts:52

Font family used for body text

***

### customDomain?

> `optional` **customDomain?**: `string`

Defined in: src/generated/models/getPostsFeed200ItemsItemPublication.ts:37

Custom domain configured for this publication

***

### emailNotifications?

> `optional` **emailNotifications?**: [`GetPostsFeed200ItemsItemPublicationEmailNotifications`](GetPostsFeed200ItemsItemPublicationEmailNotifications.md)

Defined in: src/generated/models/getPostsFeed200ItemsItemPublication.ts:71

Owner-side email notification toggles

***

### enableSubscribePopup?

> `optional` **enableSubscribePopup?**: `boolean`

Defined in: src/generated/models/getPostsFeed200ItemsItemPublication.ts:65

Whether to show the subscribe popup to first-time visitors arriving from external links

***

### enableSubscribeScroll?

> `optional` **enableSubscribeScroll?**: `boolean`

Defined in: src/generated/models/getPostsFeed200ItemsItemPublication.ts:67

Whether to show the subscribe popup when first-time visitors scroll a post

***

### enableTableOfContents?

> `optional` **enableTableOfContents?**: `boolean`

Defined in: src/generated/models/getPostsFeed200ItemsItemPublication.ts:63

Whether the table of contents is enabled on posts

***

### featuredPost?

> `optional` **featuredPost?**: `string`

Defined in: src/generated/models/getPostsFeed200ItemsItemPublication.ts:61

Featured post selector. Use 'latest' for the most recent post, 'popular' for the most-viewed post, 'disabled' to hide the featured slot, or the ID of a specific post in this publication.

#### Min Length

1

***

### headerFont?

> `optional` **headerFont?**: [`GetPostsFeed200ItemsItemPublicationHeaderFont`](GetPostsFeed200ItemsItemPublicationHeaderFont.md)

Defined in: src/generated/models/getPostsFeed200ItemsItemPublication.ts:50

Font family used for headers

***

### hideStats?

> `optional` **hideStats?**: `boolean`

Defined in: src/generated/models/getPostsFeed200ItemsItemPublication.ts:56

Whether to hide stats like subscriber count, post count, and collects

***

### id

> **id**: `string`

Defined in: src/generated/models/getPostsFeed200ItemsItemPublication.ts:25

Unique identifier for the publication

***

### logoUrl?

> `optional` **logoUrl?**: `string`

Defined in: src/generated/models/getPostsFeed200ItemsItemPublication.ts:44

URL to the publication's logo image

***

### name

> **name**: `string`

Defined in: src/generated/models/getPostsFeed200ItemsItemPublication.ts:27

Display name of the publication

***

### ownerUserId

> **ownerUserId**: `string`

Defined in: src/generated/models/getPostsFeed200ItemsItemPublication.ts:29

ID of the user who owns this publication

***

### pinnedPostIds?

> `optional` **pinnedPostIds?**: `string`[]

Defined in: src/generated/models/getPostsFeed200ItemsItemPublication.ts:69

Ordered list of post IDs pinned to the top of the publication's homepage. Pinned posts render in their own section above the regular feed.

***

### postListType?

> `optional` **postListType?**: [`GetPostsFeed200ItemsItemPublicationPostListType`](GetPostsFeed200ItemsItemPublicationPostListType.md)

Defined in: src/generated/models/getPostsFeed200ItemsItemPublication.ts:46

Homepage layout. 'feed' is a single-column list of cards, 'grid' is a 3-column grid, 'full-post' shows full posts in a single column.

***

### showMostPopular?

> `optional` **showMostPopular?**: `boolean`

Defined in: src/generated/models/getPostsFeed200ItemsItemPublication.ts:54

Whether the 'most popular posts' widget is shown

***

### slug

> **slug**: `string`

Defined in: src/generated/models/getPostsFeed200ItemsItemPublication.ts:35

URL-friendly identifier for the publication; accessible at paragraph.com/@[slug]

#### Min Length

1

#### Max Length

256

***

### summary?

> `optional` **summary?**: `string`

Defined in: src/generated/models/getPostsFeed200ItemsItemPublication.ts:42

Brief description of the publication (max 500 characters)

#### Max Length

500

***

### themeColor?

> `optional` **themeColor?**: [`GetPostsFeed200ItemsItemPublicationThemeColor`](GetPostsFeed200ItemsItemPublicationThemeColor.md)

Defined in: src/generated/models/getPostsFeed200ItemsItemPublication.ts:48

Theme accent color for the publication
