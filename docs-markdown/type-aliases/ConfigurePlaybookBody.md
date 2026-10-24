[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / ConfigurePlaybookBody

# Type Alias: ConfigurePlaybookBody

> **ConfigurePlaybookBody** = `object`

Defined in: src/generated/models/configurePlaybookBody.ts:16

## Properties

### deliverables?

> `optional` **deliverables?**: `string`[]

Defined in: src/generated/models/configurePlaybookBody.ts:25

Which deliverables to make. A required one is always included.

***

### repository?

> `optional` **repository?**: `string`

Defined in: src/generated/models/configurePlaybookBody.ts:21

A public GitHub repository as `owner/name`. A public one needs no connection.

#### Pattern

^[\w.-]+/[\w.-]+$

***

### values?

> `optional` **values?**: [`ConfigurePlaybookBodyValues`](ConfigurePlaybookBodyValues.md)

Defined in: src/generated/models/configurePlaybookBody.ts:23

Settings keyed by the field keys from `GET /v1/playbooks`
