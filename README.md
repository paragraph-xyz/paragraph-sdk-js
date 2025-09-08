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
