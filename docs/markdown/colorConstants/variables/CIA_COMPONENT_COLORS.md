[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [colorConstants](../README.md) / CIA\_COMPONENT\_COLORS

# Variable: CIA\_COMPONENT\_COLORS

> `const` **CIA\_COMPONENT\_COLORS**: `object`

Defined in: [constants/colorConstants.ts:122](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/constants/colorConstants.ts#L122)

Color schemes for CIA triad components with enhanced distinctiveness.

Each CIA component has a unique color palette to aid visual recognition:
- **Confidentiality** (Orange): Represents data privacy and access control
- **Integrity** (Green): Represents data accuracy and validation
- **Availability** (Blue): Represents uptime and system accessibility

Each palette includes PRIMARY, SECONDARY (light), and DARK variants
to support different design contexts and dark mode compatibility.

## Type Declaration

### CONFIDENTIALITY

> **CONFIDENTIALITY**: `object`

#### CONFIDENTIALITY.PRIMARY

> **PRIMARY**: `string` = `"#f97316"`

#### CONFIDENTIALITY.SECONDARY

> **SECONDARY**: `string` = `"#fed7aa"`

#### CONFIDENTIALITY.DARK

> **DARK**: `string` = `"#fb923c"`

### INTEGRITY

> **INTEGRITY**: `object`

#### INTEGRITY.PRIMARY

> **PRIMARY**: `string` = `"#27ae60"`

#### INTEGRITY.SECONDARY

> **SECONDARY**: `string` = `"#d4efdf"`

#### INTEGRITY.DARK

> **DARK**: `string` = `"#00e676"`

### AVAILABILITY

> **AVAILABILITY**: `object`

#### AVAILABILITY.PRIMARY

> **PRIMARY**: `string` = `"#2980b9"`

#### AVAILABILITY.SECONDARY

> **SECONDARY**: `string` = `"#bbdefb"`

#### AVAILABILITY.DARK

> **DARK**: `string` = `"#00ccff"`

## Examples

```typescript
// Use confidentiality colors in a component
const colors = CIA_COMPONENT_COLORS.CONFIDENTIALITY;

<Card 
  style={{
    borderLeft: `4px solid ${colors.PRIMARY}`,
    backgroundColor: colors.SECONDARY
  }}
>
  <Icon color={colors.DARK} />
  Confidentiality Settings
</Card>
```

```typescript
// Create a gradient effect
const gradient = `linear-gradient(135deg, 
  ${CIA_COMPONENT_COLORS.INTEGRITY.SECONDARY}, 
  ${CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY})`;
```
