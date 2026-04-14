[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / addSubscriberBodyWalletRegExp

# Variable: addSubscriberBodyWalletRegExp

> `const` **addSubscriberBodyWalletRegExp**: `RegExp`

Defined in: generated/zod.ts:1261

Add a new subscriber to your publication. The publication is identified by the API key provided in the Authorization header.

*Requirements:**
- At least one of `email` or `wallet` must be provided
- If both are provided, the subscriber will be associated with both credentials

*Behavior:**
- If the subscriber already exists (by email or wallet), they will not be duplicated
