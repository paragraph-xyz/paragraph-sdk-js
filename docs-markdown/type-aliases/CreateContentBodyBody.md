[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / CreateContentBodyBody

# Type Alias: CreateContentBodyBody

> **CreateContentBodyBody** = `object`

Defined in: src/generated/models/createContentBodyBody.ts:19

The artifact itself, in the shape this kind uses

## Properties

### body?

> `optional` **body?**: `string`

Defined in: src/generated/models/createContentBodyBody.ts:29

`newsletter`: the email body. `x_article`: the article's full CommonMark markdown.

***

### bodyJson?

> `optional` **bodyJson?**: [`CreateContentBodyBodyBodyJson`](CreateContentBodyBodyBodyJson.md)

Defined in: src/generated/models/createContentBodyBody.ts:31

`newsletter` only. The complete authoritative Tiptap document. Provide either Markdown body or bodyJson, never both; preserve this format when editing a saved rich newsletter.

***

### canonicalUrl?

> `optional` **canonicalUrl?**: `string`

Defined in: src/generated/models/createContentBodyBody.ts:35

`x_article` only. The original post this Article is a version of. It must also appear as a markdown link inside `body`.

***

### media?

> `readonly` `optional` **media?**: `unknown`

Defined in: src/generated/models/createContentBodyBody.ts:37

Not accepted. Media has to be uploaded to the destination platform first, which the API can't do yet; sending this field is rejected.

***

### preheader?

> `optional` **preheader?**: `string`

Defined in: src/generated/models/createContentBodyBody.ts:27

`newsletter` only. Optional preview line shown after the subject.

***

### subject?

> `optional` **subject?**: `string`

Defined in: src/generated/models/createContentBodyBody.ts:25

`newsletter` only. Subject line.

***

### text?

> `optional` **text?**: `string`

Defined in: src/generated/models/createContentBodyBody.ts:21

The post's text. `tweet`: a single tweet, at most 280 characters — use `tweets` for a thread and never send both. `linkedin`: the post body.

***

### title?

> `optional` **title?**: `string`

Defined in: src/generated/models/createContentBodyBody.ts:33

`x_article` only. The headline as published on X. Separate from the piece's `title`, which only names it in your library.

***

### tweets?

> `optional` **tweets?**: `string`[]

Defined in: src/generated/models/createContentBodyBody.ts:23

`tweet` only. One entry per tweet, in posting order, each at most 280 characters. Never concatenate a thread into one entry.
