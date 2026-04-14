[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / UpdatePostBySlugBodyScheduledAt

# Type Alias: UpdatePostBySlugBodyScheduledAt

> **UpdatePostBySlugBodyScheduledAt** = `number` \| `null`

Defined in: generated/models/updatePostBySlugBodyScheduledAt.ts:19

Unix timestamp (milliseconds) to schedule the post's first publish at a future time. Must be in the future and at most 30 days out. Only valid for draft posts that haven't been published or already scheduled. Cannot be combined with status: 'draft' or 'archived'. Pass null to cancel a previously scheduled publish.

## Minimum

0
