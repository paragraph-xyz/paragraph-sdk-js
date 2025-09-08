[**@paragraph_xyz/sdk**](../README.md)

***

[@paragraph_xyz/sdk](../README.md) / ParagraphAPI

# Class: ParagraphAPI

Defined in: [index.ts:16](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/220ccb07ecd29e9c7c2d8e41261ecd03656862db/src/index.ts#L16)

Paragraph API class wrapper.

Entrypoint into all Paragraph API functiohnality.

## Constructors

### Constructor

> **new ParagraphAPI**(`cfg`): `ParagraphAPI`

Defined in: [index.ts:20](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/220ccb07ecd29e9c7c2d8e41261ecd03656862db/src/index.ts#L20)

#### Parameters

##### cfg

[`ParagraphAPIConfig`](../type-aliases/ParagraphAPIConfig.md) = `{}`

#### Returns

`ParagraphAPI`

## Methods

### getCoin()

> **getCoin**(`contractAddress`): `Promise`\<[`GetCoin200`](../type-aliases/GetCoin200.md)\>

Defined in: [index.ts:93](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/220ccb07ecd29e9c7c2d8e41261ecd03656862db/src/index.ts#L93)

Get metadata about a coin by its contract address.

#### Parameters

##### contractAddress

`string`

#### Returns

`Promise`\<[`GetCoin200`](../type-aliases/GetCoin200.md)\>

***

### getCoinHolders()

> **getCoinHolders**(`contractAddress`, `params?`): `Promise`\<[`GetCoinHolders200`](../type-aliases/GetCoinHolders200.md)\>

Defined in: [index.ts:99](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/220ccb07ecd29e9c7c2d8e41261ecd03656862db/src/index.ts#L99)

Get a list of holders for a given coin contract address.

#### Parameters

##### contractAddress

`string`

##### params?

[`GetCoinHoldersParams`](../type-aliases/GetCoinHoldersParams.md)

#### Returns

`Promise`\<[`GetCoinHolders200`](../type-aliases/GetCoinHolders200.md)\>

***

### getPost()

> **getPost**(`postId`): `Promise`\<[`GetPost200`](../type-aliases/GetPost200.md)\>

Defined in: [index.ts:64](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/220ccb07ecd29e9c7c2d8e41261ecd03656862db/src/index.ts#L64)

Get a single post by its ID.

#### Parameters

##### postId

`string`

#### Returns

`Promise`\<[`GetPost200`](../type-aliases/GetPost200.md)\>

***

### getPostBySlug()

> **getPostBySlug**(`slug`, `publicationId`): `Promise`\<[`GetPostBySlug200`](../type-aliases/GetPostBySlug200.md)\>

Defined in: [index.ts:72](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/220ccb07ecd29e9c7c2d8e41261ecd03656862db/src/index.ts#L72)

Get a single post by its slug within a given publication.

#### Parameters

##### slug

`string`

##### publicationId

`string` = `...`

#### Returns

`Promise`\<[`GetPostBySlug200`](../type-aliases/GetPostBySlug200.md)\>

***

### getPosts()

> **getPosts**(`publicationId`, `params?`): `Promise`\<[`GetPosts200`](../type-aliases/GetPosts200.md)\>

Defined in: [index.ts:56](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/220ccb07ecd29e9c7c2d8e41261ecd03656862db/src/index.ts#L56)

Get a list of posts for a given publication.

#### Parameters

##### publicationId

`string` = `...`

##### params?

[`GetPostsParams`](../type-aliases/GetPostsParams.md)

#### Returns

`Promise`\<[`GetPosts200`](../type-aliases/GetPosts200.md)\>

***

### getPublication()

> **getPublication**(`publicationId`): `Promise`\<[`GetPublication200`](../type-aliases/GetPublication200.md)\>

Defined in: [index.ts:27](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/220ccb07ecd29e9c7c2d8e41261ecd03656862db/src/index.ts#L27)

Get metadata about a Paragraph publication by it's ID.

#### Parameters

##### publicationId

`string`

#### Returns

`Promise`\<[`GetPublication200`](../type-aliases/GetPublication200.md)\>

***

### getPublicationByDomain()

> **getPublicationByDomain**(`domain`): `Promise`\<[`GetPublicationByDomain200`](../type-aliases/GetPublicationByDomain200.md)\>

Defined in: [index.ts:48](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/220ccb07ecd29e9c7c2d8e41261ecd03656862db/src/index.ts#L48)

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

Defined in: [index.ts:37](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/220ccb07ecd29e9c7c2d8e41261ecd03656862db/src/index.ts#L37)

Get metadata about a Paragraph publication by it's slug.

Can optionally include an "@" before the slug.

#### Parameters

##### slug

`string`

#### Returns

`Promise`\<[`GetPublicationBySlug200`](../type-aliases/GetPublicationBySlug200.md)\>

***

### getUser()

> **getUser**(`userId`): `Promise`\<[`GetUser200`](../type-aliases/GetUser200.md)\>

Defined in: [index.ts:80](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/220ccb07ecd29e9c7c2d8e41261ecd03656862db/src/index.ts#L80)

Get metadata about a user by their user ID.

#### Parameters

##### userId

`string`

#### Returns

`Promise`\<[`GetUser200`](../type-aliases/GetUser200.md)\>

***

### getUserByWallet()

> **getUserByWallet**(`wallet`): `Promise`\<[`GetUserByWallet200`](../type-aliases/GetUserByWallet200.md)\>

Defined in: [index.ts:86](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/220ccb07ecd29e9c7c2d8e41261ecd03656862db/src/index.ts#L86)

Get metadata about a user by their wallet address.

#### Parameters

##### wallet

`string`

#### Returns

`Promise`\<[`GetUserByWallet200`](../type-aliases/GetUserByWallet200.md)\>
