[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / UpdateContentBodyBody

# Type Alias: UpdateContentBodyBody

> **UpdateContentBodyBody** = `object`

Defined in: src/generated/models/updateContentBodyBody.ts:18

The replacement artifact, in the shape this piece's kind uses

## Properties

### body?

> `optional` **body?**: `string`

Defined in: src/generated/models/updateContentBodyBody.ts:28

`newsletter`: the email body. `x_article`: the article's full CommonMark markdown.

***

### canonicalUrl?

> `optional` **canonicalUrl?**: `string`

Defined in: src/generated/models/updateContentBodyBody.ts:32

`x_article` only. The original post this Article is a version of. It must also appear as a markdown link inside `body`.

***

### media?

> `readonly` `optional` **media?**: `unknown`

Defined in: src/generated/models/updateContentBodyBody.ts:34

Not accepted. Media has to be uploaded to the destination platform first, which the API can't do yet; sending this field is rejected.

***

### preheader?

> `optional` **preheader?**: `string`

Defined in: src/generated/models/updateContentBodyBody.ts:26

`newsletter` only. Optional preview line shown after the subject.

***

### subject?

> `optional` **subject?**: `string`

Defined in: src/generated/models/updateContentBodyBody.ts:24

`newsletter` only. Subject line.

***

### text?

> `optional` **text?**: `string`

Defined in: src/generated/models/updateContentBodyBody.ts:20

The post's text. `tweet`: a single tweet, at most 280 characters — use `tweets` for a thread and never send both. `linkedin`: the post body.

***

### title?

> `optional` **title?**: `string`

Defined in: src/generated/models/updateContentBodyBody.ts:30

`x_article` only. The headline as published on X. Separate from the piece's `title`, which only names it in your library.

***

### tweets?

> `optional` **tweets?**: `string`[]

Defined in: src/generated/models/updateContentBodyBody.ts:22

`tweet` only. One entry per tweet, in posting order, each at most 280 characters. Never concatenate a thread into one entry.
