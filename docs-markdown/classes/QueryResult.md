[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / QueryResult

# Class: QueryResult\<T\>

Defined in: [utils.ts:20](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/d2ed1adbc1c090566c9d33bd26077a5d94c8847e/src/utils.ts#L20)

A wrapper class for query results that provides a consistent interface
for both single-item and multi-item queries.

All get() methods return a QueryResult, which can be awaited directly
to get the paginated result, or use `.single()` to extract a single item.

## Example

```ts
// Get paginated results
const { items, pagination } = await api.posts.get({ publicationId: "..." });

// Get a single item
const post = await api.posts.get({ id: "..." }).single();
```

## Type Parameters

### T

`T`

## Implements

- `PromiseLike`\<[`PaginatedResult`](../interfaces/PaginatedResult.md)\<`T`\>\>

## Constructors

### Constructor

> **new QueryResult**\<`T`\>(`promise`): `QueryResult`\<`T`\>

Defined in: [utils.ts:21](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/d2ed1adbc1c090566c9d33bd26077a5d94c8847e/src/utils.ts#L21)

#### Parameters

##### promise

`Promise`\<[`PaginatedResult`](../interfaces/PaginatedResult.md)\<`T`\>\>

#### Returns

`QueryResult`\<`T`\>

## Methods

### single()

> **single**(): `Promise`\<`T`\>

Defined in: [utils.ts:42](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/d2ed1adbc1c090566c9d33bd26077a5d94c8847e/src/utils.ts#L42)

Returns the first item from the result.
Use this when you expect a single result (e.g., getting by ID).

#### Returns

`Promise`\<`T`\>

A promise that resolves to a single item

#### Throws

Error if no items are returned

***

### then()

> **then**\<`TResult1`, `TResult2`\>(`onfulfilled?`, `onrejected?`): `Promise`\<`TResult1` \| `TResult2`\>

Defined in: [utils.ts:26](https://github.com/paragraph-xyz/paragraph-sdk-js/blob/d2ed1adbc1c090566c9d33bd26077a5d94c8847e/src/utils.ts#L26)

Implements PromiseLike interface, allowing QueryResult to be awaited directly.

#### Type Parameters

##### TResult1

`TResult1` = [`PaginatedResult`](../interfaces/PaginatedResult.md)\<`T`\>

##### TResult2

`TResult2` = `never`

#### Parameters

##### onfulfilled?

`null` | (`value`) => `TResult1` \| `PromiseLike`\<`TResult1`\>

##### onrejected?

`null` | (`reason`) => `TResult2` \| `PromiseLike`\<`TResult2`\>

#### Returns

`Promise`\<`TResult1` \| `TResult2`\>

#### Implementation of

`PromiseLike.then`
