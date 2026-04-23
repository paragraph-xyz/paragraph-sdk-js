[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / AnalyticsQuery200

# Type Alias: AnalyticsQuery200

> **AnalyticsQuery200** = `object`

Defined in: src/generated/models/analyticsQuery200.ts:17

## Properties

### fields

> **fields**: [`AnalyticsQuery200FieldsItem`](AnalyticsQuery200FieldsItem.md)[]

Defined in: src/generated/models/analyticsQuery200.ts:23

Column names in row order

***

### rowCount

> **rowCount**: `number`

Defined in: src/generated/models/analyticsQuery200.ts:21

Number of rows returned (after truncation if any)

***

### rows

> **rows**: [`AnalyticsQuery200RowsItem`](AnalyticsQuery200RowsItem.md)[]

Defined in: src/generated/models/analyticsQuery200.ts:19

Result rows. Each row is a column-name → value map.

***

### truncated

> **truncated**: `boolean`

Defined in: src/generated/models/analyticsQuery200.ts:25

True if the result was truncated at the 10,000 row limit
