[**CIA Compliance Manager — Markdown Documentation v1.1.113**](../../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../../modules.md) / [components/common/ResourceCard](../README.md) / default

# Variable: default

> `const` **default**: `React.FC`\<`ResourceCardProps`\>

Defined in: [components/common/ResourceCard.tsx:65](https://github.com/Hack23/cia-compliance-manager/blob/74960a7f81055ddd90d84cebf46e733424aff851/src/components/common/ResourceCard.tsx#L65)

Compact, color-coded resource card.

Densely packed dashboards forced us to constrain card content:
- Title is clamped to 2 lines (no horizontal overflow on long titles).
- Type badge is constrained in width and clipped with ellipsis.
- Description is truncated to ≤100 chars (preserved for existing test).
- Tags are limited to 3 visible tags with a "+N" indicator for the rest.
- A left accent border encodes the CIA component (purple / green / blue).
