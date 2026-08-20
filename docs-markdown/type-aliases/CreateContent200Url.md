[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / CreateContent200Url

# Type Alias: CreateContent200Url

> **CreateContent200Url** = `string` \| `null`

Defined in: src/generated/models/createContent200Url.ts:18

Where this piece went live, from the same delivery `publishedAt` came from. Null when it hasn't been delivered, and null by design for a channel that publishes no page: a custom email renders into the message itself, so there is no address to link to. Never guessed — a delivery whose id isn't shaped like its channel reports null rather than a link that would 404.
