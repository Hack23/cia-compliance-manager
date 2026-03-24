[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [colorConstants](../README.md) / getCIAComponentColors

# Function: getCIAComponentColors()

> **getCIAComponentColors**(`component`): `object`

Defined in: [constants/colorConstants.ts:221](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/constants/colorConstants.ts#L221)

Get CIA component color scheme with dark mode support.

Returns the appropriate color scheme for a CIA component based on the
current theme (light or dark mode). Automatically detects dark mode from
the document's class list and returns suitable colors.

**Dark Mode Detection:** Checks for 'dark' class on document root element.

## Parameters

### component

`"AVAILABILITY"` \| `"INTEGRITY"` \| `"CONFIDENTIALITY"`

CIA component identifier (CONFIDENTIALITY, INTEGRITY, or AVAILABILITY)

## Returns

`object`

Object with primary and secondary colors adjusted for current theme

### primary

> **primary**: `string`

### secondary

> **secondary**: `string`

## Examples

```typescript
// Get colors that adapt to light/dark mode
const colors = getCIAComponentColors('INTEGRITY');

// Light mode result:
// { primary: "#27ae60", secondary: "#d4efdf" }

// Dark mode result (automatically):
// { primary: "#00e676", secondary: "#00e67680" (with transparency) }
```

```typescript
// Use in a component that respects theme
const IntegrityCard = () => {
  const colors = getCIAComponentColors('INTEGRITY');
  
  return (
    <div style={{
      backgroundColor: colors.secondary,
      borderColor: colors.primary
    }}>
      Integrity Analysis
    </div>
  );
};
```
