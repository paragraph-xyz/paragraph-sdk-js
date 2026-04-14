[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / listSubscribersResponse

# Variable: listSubscribersResponse

> `const` **listSubscribersResponse**: `ZodObject`\<\{ `items`: `ZodArray`\<`ZodObject`\<\{ `createdAt`: `ZodNumber`; `email`: `ZodOptional`\<`ZodString`\>; `walletAddress`: `ZodOptional`\<`ZodString`\>; \}, `"strip"`, `ZodTypeAny`, \{ `createdAt`: `number`; `email?`: `string`; `walletAddress?`: `string`; \}, \{ `createdAt`: `number`; `email?`: `string`; `walletAddress?`: `string`; \}\>, `"many"`\>; `pagination`: `ZodObject`\<\{ `cursor`: `ZodOptional`\<`ZodString`\>; `hasMore`: `ZodBoolean`; `total`: `ZodOptional`\<`ZodNumber`\>; \}, `"strip"`, `ZodTypeAny`, \{ `cursor?`: `string`; `hasMore`: `boolean`; `total?`: `number`; \}, \{ `cursor?`: `string`; `hasMore`: `boolean`; `total?`: `number`; \}\>; \}, `"strip"`, `ZodTypeAny`, \{ `items`: `object`[]; `pagination`: \{ `cursor?`: `string`; `hasMore`: `boolean`; `total?`: `number`; \}; \}, \{ `items`: `object`[]; `pagination`: \{ `cursor?`: `string`; `hasMore`: `boolean`; `total?`: `number`; \}; \}\>

Defined in: generated/zod.ts:1297
