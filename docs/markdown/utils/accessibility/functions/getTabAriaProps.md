[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/accessibility](../README.md) / getTabAriaProps

# Function: getTabAriaProps()

> **getTabAriaProps**(`id`, `isSelected`, `controls`): `object`

Defined in: [utils/accessibility.ts:177](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/utils/accessibility.ts#L177)

Generate ARIA props for a tab component

Creates a complete set of ARIA properties for tab controls following
WAI-ARIA Authoring Practices for tab patterns. Ensures proper keyboard
navigation and screen reader announcements.

## Parameters

### id

`string`

Unique tab identifier

### isSelected

`boolean`

Whether the tab is currently selected/active

### controls

`string`

ID of the tabpanel this tab controls

## Returns

`object`

ARIA props object with role, selection state, controls reference, and keyboard focus

### role

> **role**: `string`

### aria-selected

> **aria-selected**: `boolean`

### aria-controls

> **aria-controls**: `string`

### id

> **id**: `string`

### tabIndex

> **tabIndex**: `number`

## Example

```typescript
// Selected tab
const selectedTabProps = getTabAriaProps('tab-security', true, 'panel-security');
// {
//   role: 'tab',
//   'aria-selected': true,
//   'aria-controls': 'panel-security',
//   id: 'tab-security',
//   tabIndex: 0
// }

// Unselected tab
const unselectedTabProps = getTabAriaProps('tab-compliance', false, 'panel-compliance');
// {
//   role: 'tab',
//   'aria-selected': false,
//   'aria-controls': 'panel-compliance',
//   id: 'tab-compliance',
//   tabIndex: -1
// }

// Usage in component
<div role="tablist">
  {tabs.map(tab => (
    <button
      key={tab.id}
      {...getTabAriaProps(tab.id, tab.id === selectedTab, `panel-${tab.id}`)}
      onClick={() => selectTab(tab.id)}
    >
      {tab.label}
    </button>
  ))}
</div>
```
