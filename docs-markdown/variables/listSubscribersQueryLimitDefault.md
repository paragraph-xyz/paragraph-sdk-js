[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / listSubscribersQueryLimitDefault

# Variable: listSubscribersQueryLimitDefault

> `const` **listSubscribersQueryLimitDefault**: `10` = `10`

Defined in: generated/zod.ts:1284

Retrieve a paginated list of subscribers for your publication. The publication is identified by the API key provided in the Authorization header.

*Response:**
- Returns subscriber email and/or wallet address
- Only active subscribers are returned
- Results are ordered by subscription date (newest first)
