[**CIA Compliance Manager Diagrams v0.8.4**](../../../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../../../modules.md) / [utils/test-utils](../../../README.md) / [queries](../README.md) / ByRoleOptions

# Interface: ByRoleOptions

Defined in: node\_modules/@testing-library/dom/types/queries.d.ts:69

## Properties

### busy?

> `optional` **busy**: `boolean`

Defined in: node\_modules/@testing-library/dom/types/queries.d.ts:87

If true only includes elements in the query set that are marked as
busy in the accessibility tree, i.e., `aria-busy="true"`

***

### checked?

> `optional` **checked**: `boolean`

Defined in: node\_modules/@testing-library/dom/types/queries.d.ts:92

If true only includes elements in the query set that are marked as
checked in the accessibility tree, i.e., `aria-checked="true"`

***

### current?

> `optional` **current**: `string` \| `boolean`

Defined in: node\_modules/@testing-library/dom/types/queries.d.ts:101

Filters elements by their `aria-current` state. `true` and `false` match `aria-current="true"` and `aria-current="false"` (as well as a missing `aria-current` attribute) respectively.

***

### description?

> `optional` **description**: `string` \| `RegExp` \| (`accessibleDescription`, `element`) => `boolean`

Defined in: node\_modules/@testing-library/dom/types/queries.d.ts:134

Only considers elements with the specified accessible description.

***

### expanded?

> `optional` **expanded**: `boolean`

Defined in: node\_modules/@testing-library/dom/types/queries.d.ts:106

If true only includes elements in the query set that are marked as
expanded in the accessibility tree, i.e., `aria-expanded="true"`

***

### hidden?

> `optional` **hidden**: `boolean`

Defined in: node\_modules/@testing-library/dom/types/queries.d.ts:77

If true includes elements in the query set that are usually excluded from
the accessibility tree. `role="none"` or `role="presentation"` are included
in either case.

***

### level?

> `optional` **level**: `number`

Defined in: node\_modules/@testing-library/dom/types/queries.d.ts:112

Includes elements with the `"heading"` role matching the indicated level,
either by the semantic HTML heading elements `<h1>-<h6>` or matching
the `aria-level` attribute.

***

### name?

> `optional` **name**: `string` \| `RegExp` \| (`accessibleName`, `element`) => `boolean`

Defined in: node\_modules/@testing-library/dom/types/queries.d.ts:127

Only considers elements with the specified accessible name.

***

### pressed?

> `optional` **pressed**: `boolean`

Defined in: node\_modules/@testing-library/dom/types/queries.d.ts:97

If true only includes elements in the query set that are marked as
pressed in the accessibility tree, i.e., `aria-pressed="true"`

***

### queryFallbacks?

> `optional` **queryFallbacks**: `boolean`

Defined in: node\_modules/@testing-library/dom/types/queries.d.ts:123

Includes every role used in the `role` attribute
For example *ByRole('progressbar', {queryFallbacks: true})` will find <div role="meter progressbar">`.

***

### selected?

> `optional` **selected**: `boolean`

Defined in: node\_modules/@testing-library/dom/types/queries.d.ts:82

If true only includes elements in the query set that are marked as
selected in the accessibility tree, i.e., `aria-selected="true"`

***

### suggest?

> `optional` **suggest**: `boolean`

Defined in: node\_modules/@testing-library/dom/types/queries.d.ts:71

suppress suggestions for a specific query

***

### value?

> `optional` **value**: `object`

Defined in: node\_modules/@testing-library/dom/types/queries.d.ts:113

#### max?

> `optional` **max**: `number`

#### min?

> `optional` **min**: `number`

#### now?

> `optional` **now**: `number`

#### text?

> `optional` **text**: [`Matcher`](../../../type-aliases/Matcher.md)
