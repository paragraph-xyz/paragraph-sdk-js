[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / UpdatePublicationBody

# Type Alias: UpdatePublicationBody

> **UpdatePublicationBody** = `object`

Defined in: src/generated/models/updatePublicationBody.ts:21

## Properties

### bodyFont?

> `optional` **bodyFont?**: [`UpdatePublicationBodyBodyFont`](UpdatePublicationBodyBodyFont.md)

Defined in: src/generated/models/updatePublicationBody.ts:40

Font family used for body text

***

### disableComments?

> `optional` **disableComments?**: [`UpdatePublicationBodyDisableComments`](UpdatePublicationBodyDisableComments.md)

Defined in: src/generated/models/updatePublicationBody.ts:51

Comment visibility. true disables all comments, false enables them, 'on-platform' hides on-Paragraph comments while keeping Farcaster comments.

***

### disableHighlights?

> `optional` **disableHighlights?**: `boolean`

Defined in: src/generated/models/updatePublicationBody.ts:53

Whether to disable highlights on posts

***

### emailNotifications?

> `optional` **emailNotifications?**: [`UpdatePublicationBodyEmailNotifications`](UpdatePublicationBodyEmailNotifications.md)

Defined in: src/generated/models/updatePublicationBody.ts:66

Owner-side email notification toggles

***

### enableSubscribePopup?

> `optional` **enableSubscribePopup?**: `boolean`

Defined in: src/generated/models/updatePublicationBody.ts:57

Whether to show the subscribe popup to first-time visitors arriving from external links

***

### enableSubscribeScroll?

> `optional` **enableSubscribeScroll?**: `boolean`

Defined in: src/generated/models/updatePublicationBody.ts:59

Whether to show the subscribe popup when first-time visitors scroll a post

***

### enableTableOfContents?

> `optional` **enableTableOfContents?**: `boolean`

Defined in: src/generated/models/updatePublicationBody.ts:55

Whether the table of contents is enabled on posts

***

### featuredPost?

> `optional` **featuredPost?**: `string`

Defined in: src/generated/models/updatePublicationBody.ts:49

Featured post selector. Use 'latest' for the most recent post, 'popular' for the most-viewed post, 'disabled' to hide the featured slot, or the ID of a specific post in this publication.

#### Min Length

1

***

### headerFont?

> `optional` **headerFont?**: [`UpdatePublicationBodyHeaderFont`](UpdatePublicationBodyHeaderFont.md)

Defined in: src/generated/models/updatePublicationBody.ts:38

Font family used for headers

***

### hideStats?

> `optional` **hideStats?**: `boolean`

Defined in: src/generated/models/updatePublicationBody.ts:44

Whether to hide stats like subscriber count, post count, and collects

***

### name?

> `optional` **name?**: `string`

Defined in: src/generated/models/updatePublicationBody.ts:27

Display name of the publication

#### Min Length

1

#### Max Length

100

***

### pinnedPostIds?

> `optional` **pinnedPostIds?**: `string`[]

Defined in: src/generated/models/updatePublicationBody.ts:64

Ordered list of post IDs to pin to the top of the homepage. Each ID must belong to this publication. Replaces the existing pinned list. Maximum 50 IDs.

#### Max Items

50

***

### postListType?

> `optional` **postListType?**: [`UpdatePublicationBodyPostListType`](UpdatePublicationBodyPostListType.md)

Defined in: src/generated/models/updatePublicationBody.ts:34

Homepage layout. 'feed' is a single-column list of cards, 'grid' is a 3-column grid, 'full-post' shows full posts in a single column.

***

### showMostPopular?

> `optional` **showMostPopular?**: `boolean`

Defined in: src/generated/models/updatePublicationBody.ts:42

Whether to show the 'most popular posts' widget

***

### summary?

> `optional` **summary?**: `string`

Defined in: src/generated/models/updatePublicationBody.ts:32

Brief description of the publication (max 500 characters)

#### Max Length

500

***

### themeColor?

> `optional` **themeColor?**: [`UpdatePublicationBodyThemeColor`](UpdatePublicationBodyThemeColor.md)

Defined in: src/generated/models/updatePublicationBody.ts:36

Theme accent color for the publication
