[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../../modules.md) / [components/common/TabContainer](../README.md) / TabContainer

# Variable: TabContainer

> `const` **TabContainer**: `React.FC`\<[`TabContainerProps`](../interfaces/TabContainerProps.md)\>

Defined in: [components/common/TabContainer.tsx:72](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/common/TabContainer.tsx#L72)

TabContainer - Standardized tab navigation component

Features:
- Full keyboard navigation (Arrow Left/Right, Home, End)
- ARIA attributes for accessibility
- Support for icons and badges
- Disabled tab support
- Consistent visual styling with design tokens

## Example

```tsx
const tabs: Tab[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: <ChartIcon />,
    content: <OverviewPanel />,
    testId: 'overview-tab',
  },
  {
    id: 'details',
    label: 'Details',
    badge: '5',
    content: <DetailsPanel />,
  },
];

<TabContainer
  tabs={tabs}
  initialTab="overview"
  onChange={(tabId) => console.log('Tab changed:', tabId)}
  testId="my-tabs"
/>
```
