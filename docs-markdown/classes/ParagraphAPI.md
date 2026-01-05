[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / ParagraphAPI

# Class: ParagraphAPI

Defined in: [index.ts:57](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/d2ed1adbc1c090566c9d33bd26077a5d94c8847e/src/index.ts#L57)

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

// Subscribers (get and mutations require an API key)
const { items: subscribers, pagination: subPag } = await apiWithAuth.subscribers.get();
const count = await api.subscribers.getCount({ id: "publicationId" });
await apiWithAuth.subscribers.create({ email: "user@example.com" });

// Coins (use .single() for single coin)
const coin = await api.coins.get({ id: "coinId" }).single();
const { items: popular } = await api.coins.get({ sortBy: "popular" });
```

## Constructors

### Constructor

> **new ParagraphAPI**(`options?`): `ParagraphAPI`

Defined in: [index.ts:89](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/d2ed1adbc1c090566c9d33bd26077a5d94c8847e/src/index.ts#L89)

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

Defined in: [index.ts:79](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/d2ed1adbc1c090566c9d33bd26077a5d94c8847e/src/index.ts#L79)

Coins resource

***

### feed

> `readonly` **feed**: `FeedResource`

Defined in: [index.ts:73](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/d2ed1adbc1c090566c9d33bd26077a5d94c8847e/src/index.ts#L73)

Feed resource

***

### posts

> `readonly` **posts**: `PostsResource`

Defined in: [index.ts:70](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/d2ed1adbc1c090566c9d33bd26077a5d94c8847e/src/index.ts#L70)

Posts resource

***

### publications

> `readonly` **publications**: `PublicationsResource`

Defined in: [index.ts:64](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/d2ed1adbc1c090566c9d33bd26077a5d94c8847e/src/index.ts#L64)

Publications resource

***

### subscribers

> `readonly` **subscribers**: `SubscribersResource`

Defined in: [index.ts:67](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/d2ed1adbc1c090566c9d33bd26077a5d94c8847e/src/index.ts#L67)

Subscribers resource

***

### users

> `readonly` **users**: `UsersResource`

Defined in: [index.ts:76](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/d2ed1adbc1c090566c9d33bd26077a5d94c8847e/src/index.ts#L76)

Users resource
