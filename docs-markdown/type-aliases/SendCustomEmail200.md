[**@paragraph-com/sdk**](../README.md)

***

[@paragraph-com/sdk](../README.md) / SendCustomEmail200

# Type Alias: SendCustomEmail200

> **SendCustomEmail200** = `object`

Defined in: src/generated/models/sendCustomEmail200.ts:16

## Properties

### accepted

> **accepted**: `number`

Defined in: src/generated/models/sendCustomEmail200.ts:18

Number of recipients queued for delivery (or that would be queued when dryRun is true)

***

### skipped

> **skipped**: [`SendCustomEmail200SkippedItem`](SendCustomEmail200SkippedItem.md)[]

Defined in: src/generated/models/sendCustomEmail200.ts:20

Recipients that were rejected, with the reason each one was skipped. `scheduling_failed` means filtering passed but the delivery task could not be queued — retry these addresses.
