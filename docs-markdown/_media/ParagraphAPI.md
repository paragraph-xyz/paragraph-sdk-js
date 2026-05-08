[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / ParagraphAPI

# Class: ParagraphAPI

Defined in: [src/index.ts:94](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/db15d993366bd62616ed96be00bdac784280a436/src/index.ts#L94)

Paragraph API class wrapper.

Entrypoint into all Paragraph API functionality.
All get() methods return a QueryResult with paginated results.
Use `.single()` to get a single item, or await directly to get `{ items, pagination }`.

## Example

```ts
// For public endpoints (no API key required)
const api = new ParagraphAPI();

// For protected endpoints (API key required)
const apiWithAuth = new ParagraphAPI({ apiKey: "your-api-key" });

// Publications (use .single() for single object)
const pub = await api.publications.get({ id: "publicationId" }).single();
const pubBySlug = await api.publications.get({ slug: "@blog" }).single();

// Posts (paginated list or use .single() for single post)
const { items: posts, pagination } = await api.posts.get({ publicationId: "publicationId" });
const post = await api.posts.get({ id: "postId" }).single();
// Creating posts requires an API key
const newPost = await apiWithAuth.posts.create({ title: "My Post", markdown: "# Hello" });
// List your own posts (requires API key)
const { items: drafts } = await apiWithAuth.posts.list({ status: "draft" });
// Update a post (requires API key)
await apiWithAuth.posts.update({ id: "postId", title: "Updated Title" });
// Delete a post (requires API key)
await apiWithAuth.posts.delete({ id: "postId" });

// Me - get your authenticated publication (requires API key)
const myPub = await apiWithAuth.me.get();

// Feed (paginated)
const { items: feedItems, pagination: feedPag } = await api.feed.get();

// Users (use .single() for single object)
const user = await api.users.get({ id: "userId" }).single();
const userByWallet = await api.users.get({ wallet: "0x1234..." }).single();

// Subscribers (get and mutations require an API key)
const { items: subscribers, pagination: subPag } = await apiWithAuth.subscribers.get();
const count = await api.subscribers.getCount({ id: "publicationId" });
await apiWithAuth.subscribers.create({ email: "user@example.com" });

// Coins (use .single() for single coin)
const coin = await api.coins.get({ id: "coinId" }).single();
const { items: popular } = await api.coins.get({ sortBy: "popular" });

// Search
const posts = await api.search.posts("ethereum");
const coins = await api.search.coins("test");
const blogs = await api.search.blogs("crypto");

// Emails - send a custom email to a list of recipients (requires API key)
const { accepted, skipped } = await apiWithAuth.emails.send({
  subject: "Hello from Paragraph",
  body: "# Welcome\n\nThanks for reading.",
  emails: ["reader@example.com"],
});

// Analytics - SQL queries against your publication's analytics schema (requires API key)
const { rows } = await apiWithAuth.analytics.query({
  sql: "SELECT title, open_rate FROM post_analytics_summary ORDER BY total_views DESC LIMIT 5",
});
const { tables } = await apiWithAuth.analytics.schema();

// Auth - browser-based auth sessions for CLI/API clients
const session = await api.auth.createSession({ deviceName: "my-cli" });
console.log("Open this URL:", session.verificationUrl);
const status = await api.auth.getSession(session.sessionId);
```

## Constructors

### Constructor

> **new ParagraphAPI**(`options?`): `ParagraphAPI`

Defined in: [src/index.ts:141](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/db15d993366bd62616ed96be00bdac784280a436/src/index.ts#L141)

Initializes a new instance of the Paragraph API client.
Each instance has its own isolated authentication context, allowing
multiple instances with different API keys to coexist.

#### Parameters

##### options?

[`ParagraphAPIOptions`](../interfaces/ParagraphAPIOptions.md)

Optional configuration options.

#### Returns

`ParagraphAPI`

## Properties

### analytics

> `readonly` **analytics**: `AnalyticsResource`

Defined in: [src/index.ts:101](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/db15d993366bd62616ed96be00bdac784280a436/src/index.ts#L101)

Analytics resource - SQL queries against your publication's analytics schema

***

### auth

> `readonly` **auth**: `AuthResource`

Defined in: [src/index.ts:104](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/db15d993366bd62616ed96be00bdac784280a436/src/index.ts#L104)

Auth resource - browser-based auth sessions

***

### coins

> `readonly` **coins**: `CoinsResource`

Defined in: [src/index.ts:122](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/db15d993366bd62616ed96be00bdac784280a436/src/index.ts#L122)

Coins resource

***

### emails

> `readonly` **emails**: `EmailsResource`

Defined in: [src/index.ts:125](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/db15d993366bd62616ed96be00bdac784280a436/src/index.ts#L125)

Emails resource - send custom emails to a list of recipients

***

### feed

> `readonly` **feed**: `FeedResource`

Defined in: [src/index.ts:116](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/db15d993366bd62616ed96be00bdac784280a436/src/index.ts#L116)

Feed resource

***

### me

> `readonly` **me**: `MeResource`

Defined in: [src/index.ts:131](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/db15d993366bd62616ed96be00bdac784280a436/src/index.ts#L131)

Me resource - authenticated publication info

***

### posts

> `readonly` **posts**: `PostsResource`

Defined in: [src/index.ts:113](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/db15d993366bd62616ed96be00bdac784280a436/src/index.ts#L113)

Posts resource

***

### publications

> `readonly` **publications**: `PublicationsResource`

Defined in: [src/index.ts:107](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/db15d993366bd62616ed96be00bdac784280a436/src/index.ts#L107)

Publications resource

***

### search

> `readonly` **search**: `SearchResource`

Defined in: [src/index.ts:128](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/db15d993366bd62616ed96be00bdac784280a436/src/index.ts#L128)

Search resource

***

### subscribers

> `readonly` **subscribers**: `SubscribersResource`

Defined in: [src/index.ts:110](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/db15d993366bd62616ed96be00bdac784280a436/src/index.ts#L110)

Subscribers resource

***

### users

> `readonly` **users**: `UsersResource`

Defined in: [src/index.ts:119](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/db15d993366bd62616ed96be00bdac784280a436/src/index.ts#L119)

Users resource
