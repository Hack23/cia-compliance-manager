[**CIA Compliance Manager — UML Diagrams v1.1.134**](../../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../../modules.md) / [components/common/StatusBadge](../README.md) / StatusBadgeProps

# Interface: StatusBadgeProps

Defined in: [components/common/StatusBadge.tsx:4](https://github.com/Hack23/cia-compliance-manager/blob/2820a8c53c76a3379ee916ba05524fb0b49e359f/src/components/common/StatusBadge.tsx#L4)

## Properties

### status

> **status**: [`StatusType`](../../../../types/common/StatusTypes/type-aliases/StatusType.md)

Defined in: [components/common/StatusBadge.tsx:8](https://github.com/Hack23/cia-compliance-manager/blob/2820a8c53c76a3379ee916ba05524fb0b49e359f/src/components/common/StatusBadge.tsx#L8)

The status type (determines color when variant is not provided)

***

### children

> **children**: `ReactNode`

Defined in: [components/common/StatusBadge.tsx:13](https://github.com/Hack23/cia-compliance-manager/blob/2820a8c53c76a3379ee916ba05524fb0b49e359f/src/components/common/StatusBadge.tsx#L13)

The content to display inside the badge

***

### className?

> `optional` **className?**: `string`

Defined in: [components/common/StatusBadge.tsx:18](https://github.com/Hack23/cia-compliance-manager/blob/2820a8c53c76a3379ee916ba05524fb0b49e359f/src/components/common/StatusBadge.tsx#L18)

Additional CSS classes

***

### testId?

> `optional` **testId?**: `string`

Defined in: [components/common/StatusBadge.tsx:23](https://github.com/Hack23/cia-compliance-manager/blob/2820a8c53c76a3379ee916ba05524fb0b49e359f/src/components/common/StatusBadge.tsx#L23)

Test ID for automated testing

***

### size?

> `optional` **size?**: `"sm"` \| `"md"` \| `"lg"`

Defined in: [components/common/StatusBadge.tsx:28](https://github.com/Hack23/cia-compliance-manager/blob/2820a8c53c76a3379ee916ba05524fb0b49e359f/src/components/common/StatusBadge.tsx#L28)

Optional size variant

***

### variant?

> `optional` **variant?**: `string`

Defined in: [components/common/StatusBadge.tsx:44](https://github.com/Hack23/cia-compliance-manager/blob/2820a8c53c76a3379ee916ba05524fb0b49e359f/src/components/common/StatusBadge.tsx#L44)

Badge color scheme override. When provided and matches a known type,
overrides the color derived from `status`. This allows callers to
decouple the semantic status from the visual presentation.

#### Example

```tsx
// Color driven by status (default behavior)
<StatusBadge status="success">OK</StatusBadge>

// Color overridden by variant
<StatusBadge status="info" variant="warning">Needs attention</StatusBadge>
```
