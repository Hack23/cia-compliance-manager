[**CIA Compliance Manager Documentation v1.1.12**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [hooks](../README.md) / useLocalStorage

# Function: useLocalStorage()

> **useLocalStorage**\<`T`\>(`key`, `initialValue`): \[`T`, (`value`) => `void`\]

Defined in: [hooks/useLocalStorage.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/hooks/useLocalStorage.ts#L55)

Custom hook to sync state with localStorage

## Business Perspective

Enables widgets to remember user preferences and settings across browser
sessions, improving user experience by maintaining personalized configurations.
This is particularly valuable for security officers who configure specific
security levels and want their settings persisted. 💾

## Technical Perspective

Provides a React state hook that automatically syncs with localStorage,
handling JSON serialization/deserialization and SSR compatibility. Uses
the same API as useState for familiarity.

## Type Parameters

### T

`T`

Type of the stored value

## Parameters

### key

`string`

localStorage key to use for storage

### initialValue

`T`

Initial value if key doesn't exist in localStorage

## Returns

\[`T`, (`value`) => `void`\]

Tuple of [storedValue, setValue] similar to useState

## Examples

```tsx
// Store user's preferred theme
const [theme, setTheme] = useLocalStorage('theme', 'light');

return (
  <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
    Toggle Theme
  </button>
);
```

```tsx
// Store security level preferences
const [savedLevels, setSavedLevels] = useLocalStorage('securityLevels', {
  availability: 'Moderate',
  integrity: 'Moderate',
  confidentiality: 'Moderate'
});
```

```tsx
// Store widget visibility preferences
const [widgetPrefs, setWidgetPrefs] = useLocalStorage('widgetPreferences', {
  showDetails: true,
  expandedSections: ['overview', 'metrics']
});
```
