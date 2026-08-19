[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / GetPublicationByDomain200

# Type Alias: GetPublicationByDomain200

> **GetPublicationByDomain200** = `object`

Defined in: src/generated/models/getPublicationByDomain200.ts:20

## Properties

### bodyFont?

> `optional` **bodyFont?**: [`GetPublicationByDomain200BodyFont`](GetPublicationByDomain200BodyFont.md)

Defined in: src/generated/models/getPublicationByDomain200.ts:49

Font family used for body text

***

### customDomain?

> `optional` **customDomain?**: `string`

Defined in: src/generated/models/getPublicationByDomain200.ts:34

Custom domain configured for this publication

***

### emailNotifications?

> `optional` **emailNotifications?**: [`GetPublicationByDomain200EmailNotifications`](GetPublicationByDomain200EmailNotifications.md)

Defined in: src/generated/models/getPublicationByDomain200.ts:68

Owner-side email notification toggles

***

### enableSubscribePopup?

> `optional` **enableSubscribePopup?**: `boolean`

Defined in: src/generated/models/getPublicationByDomain200.ts:62

Whether to show the subscribe popup to first-time visitors arriving from external links

***

### enableSubscribeScroll?

> `optional` **enableSubscribeScroll?**: `boolean`

Defined in: src/generated/models/getPublicationByDomain200.ts:64

Whether to show the subscribe popup when first-time visitors scroll a post

***

### enableTableOfContents?

> `optional` **enableTableOfContents?**: `boolean`

Defined in: src/generated/models/getPublicationByDomain200.ts:60

Whether the table of contents is enabled on posts

***

### featuredPost?

> `optional` **featuredPost?**: `string`

Defined in: src/generated/models/getPublicationByDomain200.ts:58

Featured post selector. Use 'latest' for the most recent post, 'popular' for the most-viewed post, 'disabled' to hide the featured slot, or the ID of a specific post in this publication.

#### Min Length

1

***

### headerFont?

> `optional` **headerFont?**: [`GetPublicationByDomain200HeaderFont`](GetPublicationByDomain200HeaderFont.md)

Defined in: src/generated/models/getPublicationByDomain200.ts:47

Font family used for headers

***

### hideStats?

> `optional` **hideStats?**: `boolean`

Defined in: src/generated/models/getPublicationByDomain200.ts:53

Whether to hide stats like subscriber count, post count, and collects

***

### id

> **id**: `string`

Defined in: src/generated/models/getPublicationByDomain200.ts:22

Unique identifier for the publication

***

### logoUrl?

> `optional` **logoUrl?**: `string`

Defined in: src/generated/models/getPublicationByDomain200.ts:41

URL to the publication's logo image

***

### name

> **name**: `string`

Defined in: src/generated/models/getPublicationByDomain200.ts:24

Display name of the publication

***

### ownerUserId

> **ownerUserId**: `string`

Defined in: src/generated/models/getPublicationByDomain200.ts:26

ID of the user who owns this publication

***

### pinnedPostIds?

> `optional` **pinnedPostIds?**: `string`[]

Defined in: src/generated/models/getPublicationByDomain200.ts:66

Ordered list of post IDs pinned to the top of the publication's homepage. Pinned posts render in their own section above the regular feed.

***

### postListType?

> `optional` **postListType?**: [`GetPublicationByDomain200PostListType`](GetPublicationByDomain200PostListType.md)

Defined in: src/generated/models/getPublicationByDomain200.ts:43

Homepage layout. 'feed' is a single-column list of cards, 'grid' is a 3-column grid, 'full-post' shows full posts in a single column.

***

### showMostPopular?

> `optional` **showMostPopular?**: `boolean`

Defined in: src/generated/models/getPublicationByDomain200.ts:51

Whether the 'most popular posts' widget is shown

***

### slug

> **slug**: `string`

Defined in: src/generated/models/getPublicationByDomain200.ts:32

URL-friendly identifier for the publication; accessible at paragraph.com/@[slug]

#### Min Length

1

#### Max Length

256

***

### summary?

> `optional` **summary?**: `string`

Defined in: src/generated/models/getPublicationByDomain200.ts:39

Brief description of the publication (max 500 characters)

#### Max Length

500

***

### themeColor?

> `optional` **themeColor?**: [`GetPublicationByDomain200ThemeColor`](GetPublicationByDomain200ThemeColor.md)

Defined in: src/generated/models/getPublicationByDomain200.ts:45

Theme accent color for the publication
