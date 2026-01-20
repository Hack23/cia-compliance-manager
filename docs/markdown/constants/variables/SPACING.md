[**CIA Compliance Manager Documentation v1.1.10**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [constants](../README.md) / SPACING

# Variable: SPACING

> `const` **SPACING**: `object`

Defined in: [constants/designTokens.ts:22](https://github.com/Hack23/cia-compliance-manager/blob/eb3dd66ffaf39f50db4da1b4d578d20d1c37a0b3/src/constants/designTokens.ts#L22)

Spacing scale based on a flexible grid system with optimizations
Use these values for padding, margin, and gap properties

NOTE: These values have been optimized to reduce widget empty space
and provide more compact layouts while maintaining visual hierarchy.

⚠️ EXCEPTION: `sm: 6px` breaks the strict 4px/8px grid system but was
intentionally optimized to fix 50% blank space issues in widgets.
This value matches the current tailwind.config.ts and preserves
the optimized UI appearance from v1.0.6+.

## Type Declaration

### lg

> `readonly` **lg**: `"16px"` = `'16px'`

16px - Large spacing for section separation (optimized from 24px)

### md

> `readonly` **md**: `"8px"` = `'8px'`

8px - Medium spacing (optimized from 16px for more compact layouts)

### sm

> `readonly` **sm**: `"6px"` = `'6px'`

6px - Small spacing for compact elements (optimized from 8px)

### xl

> `readonly` **xl**: `"24px"` = `'24px'`

24px - Extra large spacing for major sections (optimized from 32px)

### xs

> `readonly` **xs**: `"4px"` = `'4px'`

4px - Extra small spacing for tight layouts

### xxl

> `readonly` **xxl**: `"40px"` = `'40px'`

40px - XXL spacing for page-level separation (optimized from 48px)
