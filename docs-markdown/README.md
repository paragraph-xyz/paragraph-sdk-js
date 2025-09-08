**@paragraph_xyz/sdk**

***

# @paragraph_xyz/sdk

TypeScript SDK for the Paragraph API.

## Install
```bash
yarn add @paragraph_xyz/sdk
```

## Quick start

```typescript
import { getParagraphAPI } from '@paragraph_xyz/sdk'
const api = getParagraphAPI()
const post = await api.getPost('postId')
```

## Classes

- [ParagraphAPI](classes/ParagraphAPI.md)

## Type Aliases

- [GetCoin200](type-aliases/GetCoin200.md)
- [GetCoin404](type-aliases/GetCoin404.md)
- [GetCoin500](type-aliases/GetCoin500.md)
- [GetCoinHolders200](type-aliases/GetCoinHolders200.md)
- [GetCoinHolders200ItemsItem](type-aliases/GetCoinHolders200ItemsItem.md)
- [GetCoinHolders200Pagination](type-aliases/GetCoinHolders200Pagination.md)
- [GetCoinHolders404](type-aliases/GetCoinHolders404.md)
- [GetCoinHolders500](type-aliases/GetCoinHolders500.md)
- [GetCoinHoldersParams](type-aliases/GetCoinHoldersParams.md)
- [GetPost200](type-aliases/GetPost200.md)
- [GetPost404](type-aliases/GetPost404.md)
- [GetPost500](type-aliases/GetPost500.md)
- [GetPostBySlug200](type-aliases/GetPostBySlug200.md)
- [GetPostBySlug404](type-aliases/GetPostBySlug404.md)
- [GetPostBySlug500](type-aliases/GetPostBySlug500.md)
- [GetPosts200](type-aliases/GetPosts200.md)
- [GetPosts200ItemsItem](type-aliases/GetPosts200ItemsItem.md)
- [GetPosts200Pagination](type-aliases/GetPosts200Pagination.md)
- [GetPosts400](type-aliases/GetPosts400.md)
- [GetPosts500](type-aliases/GetPosts500.md)
- [GetPostsParams](type-aliases/GetPostsParams.md)
- [GetPublication200](type-aliases/GetPublication200.md)
- [GetPublication404](type-aliases/GetPublication404.md)
- [GetPublication500](type-aliases/GetPublication500.md)
- [GetPublicationAuthors200Item](type-aliases/GetPublicationAuthors200Item.md)
- [GetPublicationAuthors404](type-aliases/GetPublicationAuthors404.md)
- [GetPublicationAuthors500](type-aliases/GetPublicationAuthors500.md)
- [GetPublicationByDomain200](type-aliases/GetPublicationByDomain200.md)
- [GetPublicationByDomain404](type-aliases/GetPublicationByDomain404.md)
- [GetPublicationByDomain500](type-aliases/GetPublicationByDomain500.md)
- [GetPublicationBySlug200](type-aliases/GetPublicationBySlug200.md)
- [GetPublicationBySlug404](type-aliases/GetPublicationBySlug404.md)
- [GetPublicationBySlug500](type-aliases/GetPublicationBySlug500.md)
- [GetSubscriberCount200](type-aliases/GetSubscriberCount200.md)
- [GetSubscriberCount404](type-aliases/GetSubscriberCount404.md)
- [GetSubscriberCount500](type-aliases/GetSubscriberCount500.md)
- [GetUser200](type-aliases/GetUser200.md)
- [GetUser404](type-aliases/GetUser404.md)
- [GetUser500](type-aliases/GetUser500.md)
- [GetUserByWallet200](type-aliases/GetUserByWallet200.md)
- [GetUserByWallet404](type-aliases/GetUserByWallet404.md)
- [GetUserByWallet500](type-aliases/GetUserByWallet500.md)
- [ParagraphAPIConfig](type-aliases/ParagraphAPIConfig.md)

## Functions

- [createParagraphAPI](functions/createParagraphAPI.md)
