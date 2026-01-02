[**CIA Compliance Manager Diagrams v1.1.5**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [constants](../README.md) / KEYBOARD\_SHORTCUTS

# Variable: KEYBOARD\_SHORTCUTS

> `const` **KEYBOARD\_SHORTCUTS**: `object`

Defined in: [constants/keyboardShortcuts.ts:15](https://github.com/Hack23/cia-compliance-manager/blob/a17ff8a572d7423ca01410dd8a5a66308c170558/src/constants/keyboardShortcuts.ts#L15)

Keyboard shortcut configuration constants

These shortcuts follow cross-platform conventions and avoid conflicts
with browser default shortcuts.

## Type Declaration

### EXPORT\_DATA

> `readonly` **EXPORT\_DATA**: `object`

#### EXPORT\_DATA.category

> `readonly` **category**: [`ShortcutCategory`](../../types/type-aliases/ShortcutCategory.md)

#### EXPORT\_DATA.description

> `readonly` **description**: `"Export assessment data"` = `'Export assessment data'`

#### EXPORT\_DATA.id

> `readonly` **id**: `"export-data"` = `'export-data'`

#### EXPORT\_DATA.keys

> `readonly` **keys**: `"ctrl+shift+e"` = `'ctrl+shift+e'`

### NAV\_ASSESSMENT

> `readonly` **NAV\_ASSESSMENT**: `object`

#### NAV\_ASSESSMENT.category

> `readonly` **category**: [`ShortcutCategory`](../../types/type-aliases/ShortcutCategory.md)

#### NAV\_ASSESSMENT.description

> `readonly` **description**: `"Navigate to Assessment Center"` = `'Navigate to Assessment Center'`

#### NAV\_ASSESSMENT.id

> `readonly` **id**: `"nav-assessment"` = `'nav-assessment'`

#### NAV\_ASSESSMENT.keys

> `readonly` **keys**: `"ctrl+shift+1"` = `'ctrl+shift+1'`

### NAV\_BUSINESS

> `readonly` **NAV\_BUSINESS**: `object`

#### NAV\_BUSINESS.category

> `readonly` **category**: [`ShortcutCategory`](../../types/type-aliases/ShortcutCategory.md)

#### NAV\_BUSINESS.description

> `readonly` **description**: `"Navigate to Business Value"` = `'Navigate to Business Value'`

#### NAV\_BUSINESS.id

> `readonly` **id**: `"nav-business"` = `'nav-business'`

#### NAV\_BUSINESS.keys

> `readonly` **keys**: `"ctrl+shift+2"` = `'ctrl+shift+2'`

### NAV\_IMPACT

> `readonly` **NAV\_IMPACT**: `object`

#### NAV\_IMPACT.category

> `readonly` **category**: [`ShortcutCategory`](../../types/type-aliases/ShortcutCategory.md)

#### NAV\_IMPACT.description

> `readonly` **description**: `"Navigate to Impact Analysis"` = `'Navigate to Impact Analysis'`

#### NAV\_IMPACT.id

> `readonly` **id**: `"nav-impact"` = `'nav-impact'`

#### NAV\_IMPACT.keys

> `readonly` **keys**: `"ctrl+shift+3"` = `'ctrl+shift+3'`

### NAV\_IMPLEMENTATION

> `readonly` **NAV\_IMPLEMENTATION**: `object`

#### NAV\_IMPLEMENTATION.category

> `readonly` **category**: [`ShortcutCategory`](../../types/type-aliases/ShortcutCategory.md)

#### NAV\_IMPLEMENTATION.description

> `readonly` **description**: `"Navigate to Implementation Guide"` = `'Navigate to Implementation Guide'`

#### NAV\_IMPLEMENTATION.id

> `readonly` **id**: `"nav-implementation"` = `'nav-implementation'`

#### NAV\_IMPLEMENTATION.keys

> `readonly` **keys**: `"ctrl+shift+4"` = `'ctrl+shift+4'`

### QUICK\_SEARCH

> `readonly` **QUICK\_SEARCH**: `object`

#### QUICK\_SEARCH.category

> `readonly` **category**: [`ShortcutCategory`](../../types/type-aliases/ShortcutCategory.md)

#### QUICK\_SEARCH.description

> `readonly` **description**: `"Quick search/filter"` = `'Quick search/filter'`

#### QUICK\_SEARCH.id

> `readonly` **id**: `"quick-search"` = `'quick-search'`

#### QUICK\_SEARCH.keys

> `readonly` **keys**: `"ctrl+shift+k"` = `'ctrl+shift+k'`

#### QUICK\_SEARCH.platformKeys

> `readonly` **platformKeys**: `object`

#### QUICK\_SEARCH.platformKeys.mac

> `readonly` **mac**: `"cmd+shift+k"` = `'cmd+shift+k'`

### SELECT\_HIGH

> `readonly` **SELECT\_HIGH**: `object`

#### SELECT\_HIGH.category

> `readonly` **category**: [`ShortcutCategory`](../../types/type-aliases/ShortcutCategory.md)

#### SELECT\_HIGH.description

> `readonly` **description**: `"Set security level to High"` = `'Set security level to High'`

#### SELECT\_HIGH.id

> `readonly` **id**: `"select-high"` = `'select-high'`

#### SELECT\_HIGH.keys

> `readonly` **keys**: `"alt+4"` = `'alt+4'`

### SELECT\_LOW

> `readonly` **SELECT\_LOW**: `object`

#### SELECT\_LOW.category

> `readonly` **category**: [`ShortcutCategory`](../../types/type-aliases/ShortcutCategory.md)

#### SELECT\_LOW.description

> `readonly` **description**: `"Set security level to Low"` = `'Set security level to Low'`

#### SELECT\_LOW.id

> `readonly` **id**: `"select-low"` = `'select-low'`

#### SELECT\_LOW.keys

> `readonly` **keys**: `"alt+2"` = `'alt+2'`

### SELECT\_MODERATE

> `readonly` **SELECT\_MODERATE**: `object`

#### SELECT\_MODERATE.category

> `readonly` **category**: [`ShortcutCategory`](../../types/type-aliases/ShortcutCategory.md)

#### SELECT\_MODERATE.description

> `readonly` **description**: `"Set security level to Moderate"` = `'Set security level to Moderate'`

#### SELECT\_MODERATE.id

> `readonly` **id**: `"select-moderate"` = `'select-moderate'`

#### SELECT\_MODERATE.keys

> `readonly` **keys**: `"alt+3"` = `'alt+3'`

### SELECT\_NONE

> `readonly` **SELECT\_NONE**: `object`

#### SELECT\_NONE.category

> `readonly` **category**: [`ShortcutCategory`](../../types/type-aliases/ShortcutCategory.md)

#### SELECT\_NONE.description

> `readonly` **description**: `"Set security level to None"` = `'Set security level to None'`

#### SELECT\_NONE.id

> `readonly` **id**: `"select-none"` = `'select-none'`

#### SELECT\_NONE.keys

> `readonly` **keys**: `"alt+1"` = `'alt+1'`

### SELECT\_VERY\_HIGH

> `readonly` **SELECT\_VERY\_HIGH**: `object`

#### SELECT\_VERY\_HIGH.category

> `readonly` **category**: [`ShortcutCategory`](../../types/type-aliases/ShortcutCategory.md)

#### SELECT\_VERY\_HIGH.description

> `readonly` **description**: `"Set security level to Very High"` = `'Set security level to Very High'`

#### SELECT\_VERY\_HIGH.id

> `readonly` **id**: `"select-very-high"` = `'select-very-high'`

#### SELECT\_VERY\_HIGH.keys

> `readonly` **keys**: `"alt+5"` = `'alt+5'`

### SHOW\_HELP

> `readonly` **SHOW\_HELP**: `object`

#### SHOW\_HELP.category

> `readonly` **category**: [`ShortcutCategory`](../../types/type-aliases/ShortcutCategory.md)

#### SHOW\_HELP.description

> `readonly` **description**: `"Show keyboard shortcuts"` = `'Show keyboard shortcuts'`

#### SHOW\_HELP.id

> `readonly` **id**: `"show-help"` = `'show-help'`

#### SHOW\_HELP.keys

> `readonly` **keys**: `"?"` = `'?'`

### SHOW\_HELP\_ALT

> `readonly` **SHOW\_HELP\_ALT**: `object`

#### SHOW\_HELP\_ALT.category

> `readonly` **category**: [`ShortcutCategory`](../../types/type-aliases/ShortcutCategory.md)

#### SHOW\_HELP\_ALT.description

> `readonly` **description**: `"Show keyboard shortcuts (alternative)"` = `'Show keyboard shortcuts (alternative)'`

#### SHOW\_HELP\_ALT.id

> `readonly` **id**: `"show-help-alt"` = `'show-help-alt'`

#### SHOW\_HELP\_ALT.keys

> `readonly` **keys**: `"ctrl+/"` = `'ctrl+/'`

### TOGGLE\_COMPARISON

> `readonly` **TOGGLE\_COMPARISON**: `object`

#### TOGGLE\_COMPARISON.category

> `readonly` **category**: [`ShortcutCategory`](../../types/type-aliases/ShortcutCategory.md)

#### TOGGLE\_COMPARISON.description

> `readonly` **description**: `"Toggle comparison mode"` = `'Toggle comparison mode'`

#### TOGGLE\_COMPARISON.id

> `readonly` **id**: `"toggle-comparison"` = `'toggle-comparison'`

#### TOGGLE\_COMPARISON.keys

> `readonly` **keys**: `"ctrl+m"` = `'ctrl+m'`
