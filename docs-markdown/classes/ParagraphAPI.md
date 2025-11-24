[**@paragraph_xyz/sdk**](../README.md)

***

[@paragraph_xyz/sdk](../README.md) / ParagraphAPI

# Class: ParagraphAPI

Defined in: [index.ts:30](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/01f7e47f83875ab66014e688e76308c24a25b9e7/src/index.ts#L30)

Paragraph API class wrapper.

Entrypoint into all Paragraph API functionality.

## Constructors

### Constructor

> **new ParagraphAPI**(): `ParagraphAPI`

Defined in: [index.ts:36](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/01f7e47f83875ab66014e688e76308c24a25b9e7/src/index.ts#L36)

Initializes a new instance of the Paragraph API client.

#### Returns

`ParagraphAPI`

## Methods

### getCoin()

> **getCoin**(`id`): `Promise`\<[`GetCoin200`](../type-aliases/GetCoin200.md)\>

Defined in: [index.ts:192](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/01f7e47f83875ab66014e688e76308c24a25b9e7/src/index.ts#L192)

Retrieves metadata about a coin by its Paragraph-internal ID.

#### Parameters

##### id

`string`

The unique identifier for the coin.

#### Returns

`Promise`\<[`GetCoin200`](../type-aliases/GetCoin200.md)\>

A promise that resolves to the coin's data.

***

### getCoinByContract()

> **getCoinByContract**(`contractAddress`): `Promise`\<[`GetCoinByContract200`](../type-aliases/GetCoinByContract200.md)\>

Defined in: [index.ts:202](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/01f7e47f83875ab66014e688e76308c24a25b9e7/src/index.ts#L202)

Retrieves metadata about a coin by its on-chain contract address.

#### Parameters

##### contractAddress

`string`

The Ethereum contract address of the coin.

#### Returns

`Promise`\<[`GetCoinByContract200`](../type-aliases/GetCoinByContract200.md)\>

A promise that resolves to the coin's data.

***

### getCoinHolders()

> **getCoinHolders**(`id`, `params?`): `Promise`\<[`GetCoinHoldersById200`](../type-aliases/GetCoinHoldersById200.md)\>

Defined in: [index.ts:213](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/01f7e47f83875ab66014e688e76308c24a25b9e7/src/index.ts#L213)

Retrieves a paginated list of holders for a given coin ID.

#### Parameters

##### id

`string`

The unique identifier of the coin.

##### params?

[`GetCoinHoldersByIdParams`](../type-aliases/GetCoinHoldersByIdParams.md)

Optional parameters for pagination.

#### Returns

`Promise`\<[`GetCoinHoldersById200`](../type-aliases/GetCoinHoldersById200.md)\>

A promise that resolves to a paginated list of coin holders.

***

### getCoinHoldersByContract()

> **getCoinHoldersByContract**(`contractAddress`, `params?`): `Promise`\<[`GetCoinHoldersByContract200`](../type-aliases/GetCoinHoldersByContract200.md)\>

Defined in: [index.ts:227](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/01f7e47f83875ab66014e688e76308c24a25b9e7/src/index.ts#L227)

Retrieves a paginated list of holders for a given coin contract address.

#### Parameters

##### contractAddress

`string`

The Ethereum contract address of the coin.

##### params?

[`GetCoinHoldersByContractParams`](../type-aliases/GetCoinHoldersByContractParams.md)

Optional parameters for pagination.

#### Returns

`Promise`\<[`GetCoinHoldersByContract200`](../type-aliases/GetCoinHoldersByContract200.md)\>

A promise that resolves to a paginated list of coin holders.

***

### getPost()

> **getPost**(`identifier`, `options?`): `Promise`\<[`GetPostById200`](../type-aliases/GetPostById200.md)\>

Defined in: [index.ts:140](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/01f7e47f83875ab66014e688e76308c24a25b9e7/src/index.ts#L140)

Retrieves a single post using one of several unique identifiers.
This method allows fetching a post by its ID, or by a combination of
publication and post slugs/IDs.

#### Parameters

##### identifier

[`PostIdentifier`](../type-aliases/PostIdentifier.md)

A [PostIdentifier](../type-aliases/PostIdentifier.md) object to specify which post to retrieve.

##### options?

[`GetPostByIdParams`](../type-aliases/GetPostByIdParams.md)

Optional query parameters, e.g., `{ includeContent: boolean }`.

#### Returns

`Promise`\<[`GetPostById200`](../type-aliases/GetPostById200.md)\>

A promise that resolves to the post's data.

#### Example

```ts
const api = new ParagraphAPI();

// Get post by its unique ID
const postById = await api.getPost({ id: "3T2PQZlsdQtigUp4fhlb" });

// Get post by publication ID and post slug
const postByPubIdAndSlug = await api.getPost({
  publicationId: "BMV6abfvCSUl51ErCVzd",
  postSlug: "my-first-post"
});

// Get post by publication slug and post slug
const postBySlugs = await api.getPost({
  publicationSlug: "blog",
  postSlug: "my-first-post"
});

// Include full content
const postWithContent = await api.getPost(
  { id: "3T2PQZlsdQtigUp4fhlb" },
  { includeContent: true }
);
```

***

### getPosts()

> **getPosts**(`publicationId`, `params?`): `Promise`\<[`GetPosts200`](../type-aliases/GetPosts200.md)\>

Defined in: [index.ts:98](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/01f7e47f83875ab66014e688e76308c24a25b9e7/src/index.ts#L98)

Retrieves a paginated list of posts for a given publication.

#### Parameters

##### publicationId

`string`

The unique identifier of the publication.

##### params?

[`GetPostsParams`](../type-aliases/GetPostsParams.md)

Optional parameters for pagination and content inclusion.

#### Returns

`Promise`\<[`GetPosts200`](../type-aliases/GetPosts200.md)\>

A promise that resolves to a paginated list of posts.

***

### getPublication()

> **getPublication**(`publicationId`): `Promise`\<[`GetPublicationById200`](../type-aliases/GetPublicationById200.md)\>

Defined in: [index.ts:44](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/01f7e47f83875ab66014e688e76308c24a25b9e7/src/index.ts#L44)

Retrieves metadata about a Paragraph publication by its unique ID.

#### Parameters

##### publicationId

`string`

The unique identifier for the publication.

#### Returns

`Promise`\<[`GetPublicationById200`](../type-aliases/GetPublicationById200.md)\>

A promise that resolves to the publication's data.

***

### getPublicationByDomain()

> **getPublicationByDomain**(`domain`): `Promise`\<[`GetPublicationByDomain200`](../type-aliases/GetPublicationByDomain200.md)\>

Defined in: [index.ts:77](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/01f7e47f83875ab66014e688e76308c24a25b9e7/src/index.ts#L77)

Retrieves metadata about a Paragraph publication by its custom domain.

#### Parameters

##### domain

`string`

The custom domain of the publication.

#### Returns

`Promise`\<[`GetPublicationByDomain200`](../type-aliases/GetPublicationByDomain200.md)\>

A promise that resolves to the publication's data.

#### Remarks

This should be the domain only (e.g., "blog.mydomain.com"), without "https://"
or any path/querystring.

***

### getPublicationBySlug()

> **getPublicationBySlug**(`slug`): `Promise`\<[`GetPublicationBySlug200`](../type-aliases/GetPublicationBySlug200.md)\>

Defined in: [index.ts:63](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/01f7e47f83875ab66014e688e76308c24a25b9e7/src/index.ts#L63)

Retrieves metadata about a Paragraph publication by its URL-friendly slug.

#### Parameters

##### slug

`string`

The slug of the publication (e.g., "blog").

#### Returns

`Promise`\<[`GetPublicationBySlug200`](../type-aliases/GetPublicationBySlug200.md)\>

A promise that resolves to the publication's data.

#### Remarks

The slug can optionally include a leading "@".

#### Example

```ts
const publication = await api.getPublicationBySlug("blog");
const publication2 = await api.getPublicationBySlug("@blog");
```

***

### getSubscriberCount()

> **getSubscriberCount**(`publicationId`): `Promise`\<[`GetSubscriberCount200`](../type-aliases/GetSubscriberCount200.md)\>

Defined in: [index.ts:87](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/01f7e47f83875ab66014e688e76308c24a25b9e7/src/index.ts#L87)

Gets a total count of subscribers for a given publication ID.

#### Parameters

##### publicationId

`string`

The unique identifier of the publication.

#### Returns

`Promise`\<[`GetSubscriberCount200`](../type-aliases/GetSubscriberCount200.md)\>

A promise that resolves to an object containing the subscriber count.

***

### getUser()

> **getUser**(`userId`): `Promise`\<[`GetUser200`](../type-aliases/GetUser200.md)\>

Defined in: [index.ts:173](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/01f7e47f83875ab66014e688e76308c24a25b9e7/src/index.ts#L173)

Retrieves metadata about a user by their unique user ID.

#### Parameters

##### userId

`string`

The unique identifier for the user.

#### Returns

`Promise`\<[`GetUser200`](../type-aliases/GetUser200.md)\>

A promise that resolves to the user's data.

***

### getUserByWallet()

> **getUserByWallet**(`wallet`): `Promise`\<[`GetUserByWallet200`](../type-aliases/GetUserByWallet200.md)\>

Defined in: [index.ts:182](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/01f7e47f83875ab66014e688e76308c24a25b9e7/src/index.ts#L182)

Retrieves metadata about a user by their wallet address.

#### Parameters

##### wallet

`string`

The user's Ethereum wallet address.

#### Returns

`Promise`\<[`GetUserByWallet200`](../type-aliases/GetUserByWallet200.md)\>

A promise that resolves to the user's data.
