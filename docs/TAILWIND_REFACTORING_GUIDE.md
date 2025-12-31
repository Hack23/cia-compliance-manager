# TailwindCSS Refactoring Guide for CIA Compliance Manager

## Overview

This guide documents the systematic refactoring of widgets to use TailwindCSS helper utilities for improved visual consistency and maintainability.

## Refactoring Goals

1. **Remove inline styles** (except for dynamic values like widths, heights)
2. **Use WidgetClasses constants** for consistent styling patterns
3. **Apply cn() utility** for clean conditional class composition
4. **Maintain responsive design** with Tailwind breakpoints
5. **Preserve accessibility** features (ARIA, semantic HTML, keyboard navigation)
6. **Keep all tests passing** - No functional changes

## Standard Patterns

### Container Structure

**Before:**
```tsx
<div className="p-md sm:p-lg" role="region" aria-label="...">
  <section className="mb-md p-md bg-info-light/10 dark:bg-info-dark/20 rounded-md">
    ...
  </section>
</div>
```

**After:**
```tsx
import { WidgetClasses, cn } from '@/utils/tailwindClassHelpers';

<div className={cn("p-md sm:p-lg")} role="region" aria-label="...">
  <section className={cn(WidgetClasses.section, "bg-info-light/10 dark:bg-info-dark/20")}>
    ...
  </section>
</div>
```

### Typography

**Before:**
```tsx
<h2 className="text-heading font-semibold text-gray-800 dark:text-gray-100 mb-md">
  Title
</h2>
<h3 className="text-lg font-medium mb-md">Subtitle</h3>
<p className="text-body text-neutral dark:text-neutral-light">Body text</p>
<div className="text-caption text-neutral dark:text-neutral-light">Label</div>
```

**After:**
```tsx
<h2 className={cn(WidgetClasses.heading)}>Title</h2>
<h3 className={cn(WidgetClasses.subheading)}>Subtitle</h3>
<p className={cn(WidgetClasses.body)}>Body text</p>
<div className={cn(WidgetClasses.label)}>Label</div>
```

### Card Patterns

**Before:**
```tsx
<div className="p-md bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
  Card content
</div>
```

**After:**
```tsx
<div className={cn(WidgetClasses.card, "shadow-sm")}>
  Card content
</div>
```

### Responsive Grids

**Before:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-md">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

**After:**
```tsx
<div className={cn(WidgetClasses.grid2Cols)}>
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<div className={cn(WidgetClasses.grid3Cols)}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Conditional Classes

**Before:**
```tsx
<button 
  className={`py-sm px-md text-body font-medium border-b-2 ${
    isActive 
      ? "border-primary text-primary" 
      : "border-transparent text-neutral hover:text-neutral-dark"
  }`}
>
  Tab
</button>
```

**After:**
```tsx
<button 
  className={cn(
    "py-sm px-md font-medium border-b-2",
    WidgetClasses.textResponsive,
    isActive
      ? "border-primary text-primary dark:text-primary-light"
      : "border-transparent text-neutral hover:text-neutral-dark"
  )}
>
  Tab
</button>
```

### Dividers

**Before:**
```tsx
<div className="border-t border-gray-200 dark:border-gray-700 my-md"></div>
<div className="border-l border-gray-200 dark:border-gray-700 mx-md"></div>
```

**After:**
```tsx
<div className={cn(WidgetClasses.dividerHorizontal)}></div>
<div className={cn(WidgetClasses.dividerVertical)}></div>
```

### Section Borders

**Before:**
```tsx
<section className="mb-md p-md rounded-md border-l-4 border-info dark:border-info-light bg-info-light/10">
  Content
</section>
```

**After:**
```tsx
<section className={cn(
  WidgetClasses.section,
  WidgetClasses.sectionBorder,
  "bg-info-light/10 dark:bg-info-dark/20"
)}>
  Content
</section>
```

## Refactoring Checklist

For each widget:

- [ ] Import `WidgetClasses` and `cn` from `@/utils/tailwindClassHelpers`
- [ ] Replace all container divs with `WidgetClasses.card` where appropriate
- [ ] Replace typography classes with `WidgetClasses.heading`, `subheading`, `body`, `label`
- [ ] Replace grid layouts with `WidgetClasses.grid2Cols` or `grid3Cols`
- [ ] Replace template string conditional classes with `cn()` utility
- [ ] Replace dividers with `WidgetClasses.dividerHorizontal` or `dividerVertical`
- [ ] Keep inline styles only for dynamic values (widths, progress bars)
- [ ] Preserve all ARIA attributes and semantic HTML
- [ ] Run tests to ensure no regressions
- [ ] Build to verify no TypeScript errors

## Available WidgetClasses Patterns

### Container & Layout
- `container` - Standard widget container
- `containerHover` - Hover effect for containers
- `section` - Major content section
- `sectionBorder` - Section with left border accent
- `card` - Nested content card
- `cardInteractive` - Interactive card with hover

### Typography
- `heading` - Primary heading (text-subheading)
- `subheading` - Secondary heading (text-body-lg)
- `body` - Body text (text-body)
- `label` - Small labels (text-caption, uppercase)
- `textResponsive` - Responsive text sizing

### Layout Patterns
- `grid2Cols` - 2-column responsive grid
- `grid3Cols` - 3-column responsive grid
- `flexRow` - Flexible row with wrapping

### Buttons
- `buttonPrimary` - Primary action button
- `buttonSecondary` - Secondary action button

### States
- `disabled` - Disabled state
- `loading` - Loading animation
- `focusVisible` - Focus ring for keyboard navigation

### Badges
- `badge` - Base badge style
- `badgeSuccess`, `badgeWarning`, `badgeError`, `badgeInfo`, `badgeNeutral`

### Dividers
- `dividerHorizontal` - Horizontal divider
- `dividerVertical` - Vertical divider

### Responsive Utilities
- `hideMobile` - Hide on mobile, show on tablet+
- `hideDesktop` - Show on mobile, hide on tablet+

## Common Patterns to Avoid

### ❌ Don't
```tsx
// Template string concatenation
className={`text-body ${isActive ? 'text-primary' : 'text-neutral'}`}

// Repeated class strings
className="p-md bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700"
```

### ✅ Do
```tsx
// Use cn() utility
className={cn(WidgetClasses.body, isActive && 'text-primary', !isActive && 'text-neutral')}

// Use WidgetClasses constants
className={cn(WidgetClasses.card)}
```

## Maintaining Color Customizations

Some widgets use custom background colors (e.g., `bg-info-light/10`, `bg-primary-light/10`). These should be preserved as they provide semantic meaning:

```tsx
<div className={cn(
  WidgetClasses.card,
  "bg-info-light/10 dark:bg-info-dark/20",  // Keep custom colors
  "shadow-none"  // Override default shadow if needed
)}>
  Content
</div>
```

## Testing After Refactoring

1. **Run widget tests**: `npm test -- path/to/widget.test.tsx --run`
2. **Build verification**: `npm run build`
3. **Visual inspection**: Check widget in browser at different breakpoints
4. **Accessibility check**: Verify keyboard navigation and screen reader support

## Widget Refactoring Status

### ✅ Completed (11/11)
- [x] SecuritySummaryWidget (9/9 tests passing)
- [x] CostEstimationWidget (43/43 tests passing)
- [x] ComplianceStatusWidget (10/10 tests passing)
- [x] ValueCreationWidget (20/20 tests passing)
- [x] AvailabilityImpactWidget (via ImpactWidget - 18/18 tests passing)
- [x] IntegrityImpactWidget (via ImpactWidget - 18/18 tests passing)
- [x] ConfidentialityImpactWidget (via ImpactWidget - 18/18 tests passing)
- [x] TechnicalDetailsWidget (9/9 tests passing)
- [x] SecurityLevelWidget (9/9 tests passing)
- [x] BusinessImpactAnalysisWidget (18/18 tests passing)
- [x] SecurityResourcesWidget (8/8 tests passing)

### 🔄 In Progress (0/11)

### ⏳ Pending (0/11)

**Total: 144/144 tests passing (100%)**

All widgets have been successfully refactored to use TailwindCSS helper utilities!

## Notes

- **Design Tokens**: All WidgetClasses use design tokens from `src/constants/designTokens.ts`
- **Dark Mode**: All patterns include dark mode variants
- **Accessibility**: All patterns preserve ARIA attributes and semantic HTML
- **Responsive**: Patterns use mobile-first responsive breakpoints (sm, md, lg, xl)
- **Type Safety**: WidgetClasses is fully typed with TypeScript

## References

- TailwindCSS Documentation: https://tailwindcss.com/docs
- Design Tokens: `src/constants/designTokens.ts`
- Helper Utilities: `src/utils/tailwindClassHelpers.ts`
- Tailwind Config: `tailwind.config.ts`
- Usage Guidelines: `CONTRIBUTING.md` (TailwindCSS section)
