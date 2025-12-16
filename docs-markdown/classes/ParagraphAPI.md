[**@paragraph_xyz/sdk**](../README.md)

***

[@paragraph_xyz/sdk](../README.md) / ParagraphAPI

# Class: ParagraphAPI

Defined in: [index.ts:616](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/19159302f21740c44dbd814879a33877efafec25/src/index.ts#L616)

Paragraph API class wrapper.

Entrypoint into all Paragraph API functionality.

## Example

```ts
const api = new ParagraphAPI();

// Publications
const pub = await api.publications.get({ id: "publicationId" });
const pubBySlug = await api.publications.get({ slug: "@blog" });
const pubByDomain = await api.publications.get({ domain: "blog.mydomain.com" });

// Posts
const posts = await api.posts.list("publicationId");
const post = await api.posts.get({ id: "postId" });

// Users
const user = await api.users.get({ id: "userId" });
const userByWallet = await api.users.get({ wallet: "0x1234..." });

// Subscribers
const count = await api.subscribers.getCount({ id: "publicationId" });

// Coins
const coin = await api.coins.get({ id: "coinId" });
const coinByContract = await api.coins.get({ contractAddress: "0x1234..." });
const popular = await api.coins.popular();
```

## Constructors

### Constructor

> **new ParagraphAPI**(): `ParagraphAPI`

Defined in: [index.ts:637](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/19159302f21740c44dbd814879a33877efafec25/src/index.ts#L637)

Initializes a new instance of the Paragraph API client.

#### Returns

`ParagraphAPI`

## Properties

### coins

> `readonly` **coins**: `CoinsResource`

Defined in: [index.ts:632](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/19159302f21740c44dbd814879a33877efafec25/src/index.ts#L632)

Coins resource

***

### posts

> `readonly` **posts**: `PostsResource`

Defined in: [index.ts:626](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/19159302f21740c44dbd814879a33877efafec25/src/index.ts#L626)

Posts resource

***

### publications

> `readonly` **publications**: `PublicationsResource`

Defined in: [index.ts:620](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/19159302f21740c44dbd814879a33877efafec25/src/index.ts#L620)

Publications resource

***

### subscribers

> `readonly` **subscribers**: `SubscribersResource`

Defined in: [index.ts:623](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/19159302f21740c44dbd814879a33877efafec25/src/index.ts#L623)

Subscribers resource

***

### users

> `readonly` **users**: `UsersResource`

Defined in: [index.ts:629](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/19159302f21740c44dbd814879a33877efafec25/src/index.ts#L629)

Users resource
