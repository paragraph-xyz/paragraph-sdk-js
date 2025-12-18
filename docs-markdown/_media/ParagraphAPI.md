[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / ParagraphAPI

# Class: ParagraphAPI

Defined in: [index.ts:56](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/cfba7350e3d6fab39d3eab797ebb2d9f87a4bd99/src/index.ts#L56)

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

// Feed (paginated)
const { items: feedItems, pagination: feedPag } = await api.feed.get();

// Users (use .single() for single object)
const user = await api.users.get({ id: "userId" }).single();
const userByWallet = await api.users.get({ wallet: "0x1234..." }).single();

// Subscribers (mutations require an API key)
const count = await api.subscribers.getCount({ id: "publicationId" });
await apiWithAuth.subscribers.create({ email: "user@example.com" });

// Coins (use .single() for single coin)
const coin = await api.coins.get({ id: "coinId" }).single();
const { items: popular } = await api.coins.get({ sortBy: "popular" });
```

## Constructors

### Constructor

> **new ParagraphAPI**(`options?`): `ParagraphAPI`

Defined in: [index.ts:88](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/cfba7350e3d6fab39d3eab797ebb2d9f87a4bd99/src/index.ts#L88)

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

### coins

> `readonly` **coins**: `CoinsResource`

Defined in: [index.ts:78](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/cfba7350e3d6fab39d3eab797ebb2d9f87a4bd99/src/index.ts#L78)

Coins resource

***

### feed

> `readonly` **feed**: `FeedResource`

Defined in: [index.ts:72](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/cfba7350e3d6fab39d3eab797ebb2d9f87a4bd99/src/index.ts#L72)

Feed resource

***

### posts

> `readonly` **posts**: `PostsResource`

Defined in: [index.ts:69](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/cfba7350e3d6fab39d3eab797ebb2d9f87a4bd99/src/index.ts#L69)

Posts resource

***

### publications

> `readonly` **publications**: `PublicationsResource`

Defined in: [index.ts:63](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/cfba7350e3d6fab39d3eab797ebb2d9f87a4bd99/src/index.ts#L63)

Publications resource

***

### subscribers

> `readonly` **subscribers**: `SubscribersResource`

Defined in: [index.ts:66](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/cfba7350e3d6fab39d3eab797ebb2d9f87a4bd99/src/index.ts#L66)

Subscribers resource

***

### users

> `readonly` **users**: `UsersResource`

Defined in: [index.ts:75](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/cfba7350e3d6fab39d3eab797ebb2d9f87a4bd99/src/index.ts#L75)

Users resource
