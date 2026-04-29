[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / GetPublicationBySlug200

# Type Alias: GetPublicationBySlug200

> **GetPublicationBySlug200** = `object`

Defined in: src/generated/models/getPublicationBySlug200.ts:21

## Properties

### bodyFont?

> `optional` **bodyFont?**: [`GetPublicationBySlug200BodyFont`](GetPublicationBySlug200BodyFont.md)

Defined in: src/generated/models/getPublicationBySlug200.ts:50

Font family used for body text

***

### customDomain?

> `optional` **customDomain?**: `string`

Defined in: src/generated/models/getPublicationBySlug200.ts:35

Custom domain configured for this publication

***

### disableComments?

> `optional` **disableComments?**: [`GetPublicationBySlug200DisableComments`](GetPublicationBySlug200DisableComments.md)

Defined in: src/generated/models/getPublicationBySlug200.ts:61

Comment visibility. true disables all comments, false enables them, 'on-platform' hides on-Paragraph comments while keeping Farcaster comments.

***

### disableHighlights?

> `optional` **disableHighlights?**: `boolean`

Defined in: src/generated/models/getPublicationBySlug200.ts:63

Whether to disable highlights on this publication's posts

***

### emailNotifications?

> `optional` **emailNotifications?**: [`GetPublicationBySlug200EmailNotifications`](GetPublicationBySlug200EmailNotifications.md)

Defined in: src/generated/models/getPublicationBySlug200.ts:73

Owner-side email notification toggles

***

### enableSubscribePopup?

> `optional` **enableSubscribePopup?**: `boolean`

Defined in: src/generated/models/getPublicationBySlug200.ts:67

Whether to show the subscribe popup to first-time visitors arriving from external links

***

### enableSubscribeScroll?

> `optional` **enableSubscribeScroll?**: `boolean`

Defined in: src/generated/models/getPublicationBySlug200.ts:69

Whether to show the subscribe popup when first-time visitors scroll a post

***

### enableTableOfContents?

> `optional` **enableTableOfContents?**: `boolean`

Defined in: src/generated/models/getPublicationBySlug200.ts:65

Whether the table of contents is enabled on posts

***

### featuredPost?

> `optional` **featuredPost?**: `string`

Defined in: src/generated/models/getPublicationBySlug200.ts:59

Featured post selector. Use 'latest' for the most recent post, 'popular' for the most-viewed post, 'disabled' to hide the featured slot, or the ID of a specific post in this publication.

#### Min Length

1

***

### headerFont?

> `optional` **headerFont?**: [`GetPublicationBySlug200HeaderFont`](GetPublicationBySlug200HeaderFont.md)

Defined in: src/generated/models/getPublicationBySlug200.ts:48

Font family used for headers

***

### hideStats?

> `optional` **hideStats?**: `boolean`

Defined in: src/generated/models/getPublicationBySlug200.ts:54

Whether to hide stats like subscriber count, post count, and collects

***

### id

> **id**: `string`

Defined in: src/generated/models/getPublicationBySlug200.ts:23

Unique identifier for the publication

***

### logoUrl?

> `optional` **logoUrl?**: `string`

Defined in: src/generated/models/getPublicationBySlug200.ts:42

URL to the publication's logo image

***

### name

> **name**: `string`

Defined in: src/generated/models/getPublicationBySlug200.ts:25

Display name of the publication

***

### ownerUserId

> **ownerUserId**: `string`

Defined in: src/generated/models/getPublicationBySlug200.ts:27

ID of the user who owns this publication

***

### pinnedPostIds?

> `optional` **pinnedPostIds?**: `string`[]

Defined in: src/generated/models/getPublicationBySlug200.ts:71

Ordered list of post IDs pinned to the top of the publication's homepage. Pinned posts render in their own section above the regular feed.

***

### postListType?

> `optional` **postListType?**: [`GetPublicationBySlug200PostListType`](GetPublicationBySlug200PostListType.md)

Defined in: src/generated/models/getPublicationBySlug200.ts:44

Homepage layout. 'feed' is a single-column list of cards, 'grid' is a 3-column grid, 'full-post' shows full posts in a single column.

***

### showMostPopular?

> `optional` **showMostPopular?**: `boolean`

Defined in: src/generated/models/getPublicationBySlug200.ts:52

Whether the 'most popular posts' widget is shown

***

### slug

> **slug**: `string`

Defined in: src/generated/models/getPublicationBySlug200.ts:33

URL-friendly identifier for the publication; accessible at paragraph.com/@[slug]

#### Min Length

1

#### Max Length

256

***

### summary?

> `optional` **summary?**: `string`

Defined in: src/generated/models/getPublicationBySlug200.ts:40

Brief description of the publication (max 500 characters)

#### Max Length

500

***

### themeColor?

> `optional` **themeColor?**: [`GetPublicationBySlug200ThemeColor`](GetPublicationBySlug200ThemeColor.md)

Defined in: src/generated/models/getPublicationBySlug200.ts:46

Theme accent color for the publication
