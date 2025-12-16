[**@paragraph_xyz/sdk**](../README.md)

***

[@paragraph_xyz/sdk](../README.md) / ParagraphAPI

# Class: ParagraphAPI

Defined in: [index.ts:783](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/b91f24ea96a32150e998e0acff37668c5305f9d3/src/index.ts#L783)

Paragraph API class wrapper.

Entrypoint into all Paragraph API functionality.

## Example

```ts
// For public endpoints (no API key required)
const api = new ParagraphAPI();

// For protected endpoints (API key required)
const apiWithAuth = new ParagraphAPI({ apiKey: "your-api-key" });

// Publications
const pub = await api.publications.get({ id: "publicationId" });
const pubBySlug = await api.publications.get({ slug: "@blog" });
const pubByDomain = await api.publications.get({ domain: "blog.mydomain.com" });

// Posts
const posts = await api.posts.list({ type: "publication", publicationId: "publicationId" });
const feed = await api.posts.list({ type: "feed" });
const post = await api.posts.get({ id: "postId" });
// Creating posts requires an API key
const newPost = await apiWithAuth.posts.create({ title: "My Post", markdown: "# Hello" });

// Users
const user = await api.users.get({ id: "userId" });
const userByWallet = await api.users.get({ wallet: "0x1234..." });

// Subscribers (mutations require an API key)
const count = await api.subscribers.getCount({ id: "publicationId" });
await apiWithAuth.subscribers.create({ email: "user@example.com" });

// Coins
const coin = await api.coins.get({ id: "coinId" });
const coinByContract = await api.coins.get({ contractAddress: "0x1234..." });
const popular = await api.coins.list({ type: "popular" });
```

## Constructors

### Constructor

> **new ParagraphAPI**(`options?`): `ParagraphAPI`

Defined in: [index.ts:807](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/b91f24ea96a32150e998e0acff37668c5305f9d3/src/index.ts#L807)

Initializes a new instance of the Paragraph API client.

#### Parameters

##### options?

[`ParagraphAPIOptions`](../interfaces/ParagraphAPIOptions.md)

Optional configuration options.

#### Returns

`ParagraphAPI`

## Properties

### coins

> `readonly` **coins**: `CoinsResource`

Defined in: [index.ts:799](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/b91f24ea96a32150e998e0acff37668c5305f9d3/src/index.ts#L799)

Coins resource

***

### posts

> `readonly` **posts**: `PostsResource`

Defined in: [index.ts:793](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/b91f24ea96a32150e998e0acff37668c5305f9d3/src/index.ts#L793)

Posts resource

***

### publications

> `readonly` **publications**: `PublicationsResource`

Defined in: [index.ts:787](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/b91f24ea96a32150e998e0acff37668c5305f9d3/src/index.ts#L787)

Publications resource

***

### subscribers

> `readonly` **subscribers**: `SubscribersResource`

Defined in: [index.ts:790](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/b91f24ea96a32150e998e0acff37668c5305f9d3/src/index.ts#L790)

Subscribers resource

***

### users

> `readonly` **users**: `UsersResource`

Defined in: [index.ts:796](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/b91f24ea96a32150e998e0acff37668c5305f9d3/src/index.ts#L796)

Users resource
