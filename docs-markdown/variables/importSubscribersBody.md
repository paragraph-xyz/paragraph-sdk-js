[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / importSubscribersBody

# Variable: importSubscribersBody

> `const` **importSubscribersBody**: `ZodObject`\<\{ `file`: `ZodOptional`\<`ZodUnknown`\>; \}, `"strip"`, `ZodTypeAny`, \{ `file?`: `unknown`; \}, \{ `file?`: `unknown`; \}\>

Defined in: generated/zod.ts:1226

Import subscribers from a CSV file into your publication. The publication is identified by the API key provided in the Authorization header.

*File Requirements:**
- Maximum file size: 10MB
- Content type: text/csv

*Supported CSV Columns:**
- Email: `email` or `subscriberEmail` (case-insensitive)
- Wallet: `wallet_address` (case-insensitive)
- Created date: `created_at`, `subscription date`, `created`, or `createdAt` (case-insensitive, optional)

At least one of email or wallet_address must be present for each row. Rows with neither valid email nor valid wallet address will be skipped.
