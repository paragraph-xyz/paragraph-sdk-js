[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / ParagraphAPI

# Class: ParagraphAPI

Defined in: [index.ts:79](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/89c6ec6af81e223cf3c6f30a664c3d5f3b0bb394/src/index.ts#L79)

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

// Auth - browser-based auth sessions for CLI/API clients
const session = await api.auth.createSession({ deviceName: "my-cli" });
console.log("Open this URL:", session.verificationUrl);
const status = await api.auth.getSession(session.sessionId);
```

## Constructors

### Constructor

> **new ParagraphAPI**(`options?`): `ParagraphAPI`

Defined in: [index.ts:120](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/89c6ec6af81e223cf3c6f30a664c3d5f3b0bb394/src/index.ts#L120)

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

### auth

> `readonly` **auth**: `AuthResource`

Defined in: [index.ts:86](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/89c6ec6af81e223cf3c6f30a664c3d5f3b0bb394/src/index.ts#L86)

Auth resource - browser-based auth sessions

***

### coins

> `readonly` **coins**: `CoinsResource`

Defined in: [index.ts:104](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/89c6ec6af81e223cf3c6f30a664c3d5f3b0bb394/src/index.ts#L104)

Coins resource

***

### feed

> `readonly` **feed**: `FeedResource`

Defined in: [index.ts:98](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/89c6ec6af81e223cf3c6f30a664c3d5f3b0bb394/src/index.ts#L98)

Feed resource

***

### me

> `readonly` **me**: `MeResource`

Defined in: [index.ts:110](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/89c6ec6af81e223cf3c6f30a664c3d5f3b0bb394/src/index.ts#L110)

Me resource - authenticated publication info

***

### posts

> `readonly` **posts**: `PostsResource`

Defined in: [index.ts:95](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/89c6ec6af81e223cf3c6f30a664c3d5f3b0bb394/src/index.ts#L95)

Posts resource

***

### publications

> `readonly` **publications**: `PublicationsResource`

Defined in: [index.ts:89](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/89c6ec6af81e223cf3c6f30a664c3d5f3b0bb394/src/index.ts#L89)

Publications resource

***

### search

> `readonly` **search**: `SearchResource`

Defined in: [index.ts:107](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/89c6ec6af81e223cf3c6f30a664c3d5f3b0bb394/src/index.ts#L107)

Search resource

***

### subscribers

> `readonly` **subscribers**: `SubscribersResource`

Defined in: [index.ts:92](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/89c6ec6af81e223cf3c6f30a664c3d5f3b0bb394/src/index.ts#L92)

Subscribers resource

***

### users

> `readonly` **users**: `UsersResource`

Defined in: [index.ts:101](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/89c6ec6af81e223cf3c6f30a664c3d5f3b0bb394/src/index.ts#L101)

Users resource
