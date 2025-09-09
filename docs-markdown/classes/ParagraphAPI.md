[**@paragraph_xyz/sdk**](../README.md)

***

[@paragraph_xyz/sdk](../README.md) / ParagraphAPI

# Class: ParagraphAPI

Defined in: [index.ts:16](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/f8993c54c2ea9d13f3484b45ba7df3f1f2a8d8d6/src/index.ts#L16)

Paragraph API class wrapper.

Entrypoint into all Paragraph API functiohnality.

## Constructors

### Constructor

> **new ParagraphAPI**(): `ParagraphAPI`

Defined in: [index.ts:19](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/f8993c54c2ea9d13f3484b45ba7df3f1f2a8d8d6/src/index.ts#L19)

#### Returns

`ParagraphAPI`

## Methods

### getCoin()

> **getCoin**(`contractAddress`): `Promise`\<[`GetCoin200`](../type-aliases/GetCoin200.md)\>

Defined in: [index.ts:96](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/f8993c54c2ea9d13f3484b45ba7df3f1f2a8d8d6/src/index.ts#L96)

Get metadata about a coin by its contract address.

#### Parameters

##### contractAddress

`string`

#### Returns

`Promise`\<[`GetCoin200`](../type-aliases/GetCoin200.md)\>

***

### getCoinHolders()

> **getCoinHolders**(`id`, `params?`): `Promise`\<[`GetCoinHoldersById200`](../type-aliases/GetCoinHoldersById200.md)\>

Defined in: [index.ts:102](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/f8993c54c2ea9d13f3484b45ba7df3f1f2a8d8d6/src/index.ts#L102)

Get a list of holders for a given coin contract address.

#### Parameters

##### id

`string`

##### params?

[`GetCoinHoldersByIdParams`](../type-aliases/GetCoinHoldersByIdParams.md)

#### Returns

`Promise`\<[`GetCoinHoldersById200`](../type-aliases/GetCoinHoldersById200.md)\>

***

### getCoinHoldersByContract()

> **getCoinHoldersByContract**(`contractAddress`, `params?`): `Promise`\<[`GetCoinHoldersByContract200`](../type-aliases/GetCoinHoldersByContract200.md)\>

Defined in: [index.ts:110](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/f8993c54c2ea9d13f3484b45ba7df3f1f2a8d8d6/src/index.ts#L110)

Get a list of holders for a given coin contract address.

#### Parameters

##### contractAddress

`string`

##### params?

[`GetCoinHoldersByContractParams`](../type-aliases/GetCoinHoldersByContractParams.md)

#### Returns

`Promise`\<[`GetCoinHoldersByContract200`](../type-aliases/GetCoinHoldersByContract200.md)\>

***

### getPost()

> **getPost**(`postId`): `Promise`\<[`GetPost200`](../type-aliases/GetPost200.md)\>

Defined in: [index.ts:68](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/f8993c54c2ea9d13f3484b45ba7df3f1f2a8d8d6/src/index.ts#L68)

Get a single post by its ID.

#### Parameters

##### postId

`string`

#### Returns

`Promise`\<[`GetPost200`](../type-aliases/GetPost200.md)\>

***

### getPostBySlug()

> **getPostBySlug**(`publicationId`, `slug`): `Promise`\<[`GetPostBySlug200`](../type-aliases/GetPostBySlug200.md)\>

Defined in: [index.ts:76](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/f8993c54c2ea9d13f3484b45ba7df3f1f2a8d8d6/src/index.ts#L76)

Get a single post by its slug within a given publication.

#### Parameters

##### publicationId

`string`

##### slug

`string`

#### Returns

`Promise`\<[`GetPostBySlug200`](../type-aliases/GetPostBySlug200.md)\>

***

### getPosts()

> **getPosts**(`publicationId`, `params?`): `Promise`\<[`GetPosts200`](../type-aliases/GetPosts200.md)\>

Defined in: [index.ts:61](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/f8993c54c2ea9d13f3484b45ba7df3f1f2a8d8d6/src/index.ts#L61)

Get a list of posts for a given publication.

#### Parameters

##### publicationId

`string`

##### params?

[`GetPostsParams`](../type-aliases/GetPostsParams.md)

#### Returns

`Promise`\<[`GetPosts200`](../type-aliases/GetPosts200.md)\>

***

### getPublication()

> **getPublication**(`publicationId`): `Promise`\<[`GetPublication200`](../type-aliases/GetPublication200.md)\>

Defined in: [index.ts:25](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/f8993c54c2ea9d13f3484b45ba7df3f1f2a8d8d6/src/index.ts#L25)

Get metadata about a Paragraph publication by it's ID.

#### Parameters

##### publicationId

`string`

#### Returns

`Promise`\<[`GetPublication200`](../type-aliases/GetPublication200.md)\>

***

### getPublicationByDomain()

> **getPublicationByDomain**(`domain`): `Promise`\<[`GetPublicationByDomain200`](../type-aliases/GetPublicationByDomain200.md)\>

Defined in: [index.ts:46](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/f8993c54c2ea9d13f3484b45ba7df3f1f2a8d8d6/src/index.ts#L46)

Get metadata about a Paragraph publication by it's custom domain.

This should be the domain only (e.g. "blog.mydomain.com"), without "https://"
or "www" or any path/querystring.

#### Parameters

##### domain

`string`

#### Returns

`Promise`\<[`GetPublicationByDomain200`](../type-aliases/GetPublicationByDomain200.md)\>

***

### getPublicationBySlug()

> **getPublicationBySlug**(`slug`): `Promise`\<[`GetPublicationBySlug200`](../type-aliases/GetPublicationBySlug200.md)\>

Defined in: [index.ts:35](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/f8993c54c2ea9d13f3484b45ba7df3f1f2a8d8d6/src/index.ts#L35)

Get metadata about a Paragraph publication by it's slug.

Can optionally include an "@" before the slug.

#### Parameters

##### slug

`string`

#### Returns

`Promise`\<[`GetPublicationBySlug200`](../type-aliases/GetPublicationBySlug200.md)\>

***

### getSubscriberCount()

> **getSubscriberCount**(`publicationId`): `Promise`\<[`GetSubscriberCount200`](../type-aliases/GetSubscriberCount200.md)\>

Defined in: [index.ts:53](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/f8993c54c2ea9d13f3484b45ba7df3f1f2a8d8d6/src/index.ts#L53)

Gets a total count of subscribers for a given publication ID.

#### Parameters

##### publicationId

`string`

#### Returns

`Promise`\<[`GetSubscriberCount200`](../type-aliases/GetSubscriberCount200.md)\>

***

### getUser()

> **getUser**(`userId`): `Promise`\<[`GetUser200`](../type-aliases/GetUser200.md)\>

Defined in: [index.ts:83](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/f8993c54c2ea9d13f3484b45ba7df3f1f2a8d8d6/src/index.ts#L83)

Get metadata about a user by their user ID.

#### Parameters

##### userId

`string`

#### Returns

`Promise`\<[`GetUser200`](../type-aliases/GetUser200.md)\>

***

### getUserByWallet()

> **getUserByWallet**(`wallet`): `Promise`\<[`GetUserByWallet200`](../type-aliases/GetUserByWallet200.md)\>

Defined in: [index.ts:89](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/f8993c54c2ea9d13f3484b45ba7df3f1f2a8d8d6/src/index.ts#L89)

Get metadata about a user by their wallet address.

#### Parameters

##### wallet

`string`

#### Returns

`Promise`\<[`GetUserByWallet200`](../type-aliases/GetUserByWallet200.md)\>
