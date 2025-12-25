# Design System Documentation

**Version:** 1.0.0  
**Last Updated:** 2025-12-25  
**Status:** Active

## Overview

The CIA Compliance Manager design system provides a comprehensive set of design tokens, components, and guidelines to ensure visual consistency and maintainability across all 11 widgets and application interfaces.

### Goals

- **Consistency**: Unified visual language across all widgets
- **Maintainability**: Centralized design decisions for easy updates
- **Accessibility**: WCAG 2.1 AA compliant color contrasts and interactions
- **Developer Experience**: Type-safe, well-documented design tokens
- **Performance**: Optimized for fast rendering and small bundle size

## Architecture

```
Design System
├── Design Tokens (src/constants/designTokens.ts)
│   ├── Spacing
│   ├── Typography
│   ├── Colors
│   ├── Shadows
│   └── Transitions
├── TailwindCSS Configuration (tailwind.config.js)
│   └── Extended theme with design tokens
├── CSS Variables (src/styles/variables.css)
│   └── Runtime theming support
└── Common Components (src/components/common/)
    ├── WidgetContainer
    ├── SecurityLevelBadge
    └── Reusable UI elements
```

## Design Tokens

Design tokens are the atomic elements of our design system, stored in `src/constants/designTokens.ts`.

### Spacing Scale

Following an 8px grid system for consistent alignment:

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 4px | Tight spacing, small gaps |
| `sm` | 8px | Compact elements, list items |
| `md` | 16px | Default spacing, card padding |
| `lg` | 24px | Section separation |
| `xl` | 32px | Major sections |
| `xxl` | 48px | Page-level spacing |

**Example Usage:**
```typescript
import { SPACING, getSpacing } from '@/constants/designTokens';

// Direct usage
const padding = SPACING.md; // "16px"

// Helper function
const margin = getSpacing('lg'); // "24px"
```

**TailwindCSS Classes:**
```tsx
<div className="p-md gap-lg">
  <div className="mb-sm">Content</div>
</div>
```

### Typography Scale

Responsive typography using rem units:

| Token | Size (rem) | Size (px) | Usage |
|-------|-----------|-----------|-------|
| `caption` | 0.75rem | 12px | Labels, timestamps |
| `body` | 0.875rem | 14px | Secondary text |
| `bodyLarge` | 1rem | 16px | Primary body text |
| `subheading` | 1.125rem | 18px | Subheadings |
| `heading` | 1.5rem | 24px | Section headings |
| `title` | 2rem | 32px | Page titles |
| `display` | 2.5rem | 40px | Hero text |

**Font Weights:**
- `normal`: 400 - Regular body text
- `medium`: 500 - Emphasized text
- `semibold`: 600 - Headings
- `bold`: 700 - Strong emphasis

**Line Heights:**
- `tight`: 1.25 - Headings, display text
- `normal`: 1.5 - Body text (default)
- `relaxed`: 1.75 - Long-form content

**Example Usage:**
```typescript
import { TYPOGRAPHY, FONT_WEIGHTS } from '@/constants/designTokens';

const titleStyle = {
  fontSize: TYPOGRAPHY.heading,
  fontWeight: FONT_WEIGHTS.semibold,
  lineHeight: LINE_HEIGHTS.tight,
};
```

**TailwindCSS Classes:**
```tsx
<h2 className="text-heading font-semibold">Section Heading</h2>
<p className="text-body font-normal">Body text content</p>
<span className="text-caption">Helper text</span>
```

### Semantic Colors

Colors are organized by semantic meaning, not appearance:

#### Primary
- **Light**: `#2b8aff`
- **Main**: `#0066cc` ✅ Brand color
- **Dark**: `#004d99`

**Usage**: Primary actions, brand emphasis, links

#### Success
- **Light**: `#4caf50`
- **Main**: `#27ae60` ✅ Success states
- **Dark**: `#1e8449`

**Usage**: Success messages, completed states, positive actions

#### Warning
- **Light**: `#feca57`
- **Main**: `#f1c40f` ⚠️ Warning states
- **Dark**: `#f39c12`

**Usage**: Warnings, caution, pending states

#### Error
- **Light**: `#ff6b6b`
- **Main**: `#e74c3c` ❌ Error states
- **Dark**: `#c0392b`

**Usage**: Errors, destructive actions, critical issues

#### Info
- **Light**: `#54a0ff`
- **Main**: `#3498db` ℹ️ Info states
- **Dark**: `#2980b9`

**Usage**: Informational messages, neutral emphasis

#### Neutral
- **Light**: `#b8b8cc`
- **Main**: `#95a5a6`
- **Dark**: `#7f8c8d`

**Usage**: Disabled states, secondary elements

**Example Usage:**
```typescript
import { SEMANTIC_COLORS, getSemanticColor } from '@/constants/designTokens';

// Direct usage
const primaryColor = SEMANTIC_COLORS.primary.main;

// Helper function
const successColor = getSemanticColor('success', 'main');
```

**TailwindCSS Classes:**
```tsx
<button className="bg-primary text-white hover:bg-primary-dark">
  Primary Action
</button>
<div className="text-success bg-success-light/10">
  Success message
</div>
<span className="text-error">Error text</span>
```

### Border Radius

Consistent rounded corners for visual harmony:

| Token | Value | Usage |
|-------|-------|-------|
| `none` | 0 | Sharp edges |
| `sm` | 4px | Buttons, badges |
| `md` | 8px | Cards, inputs (default) |
| `lg` | 12px | Prominent elements |
| `xl` | 16px | Large containers |
| `full` | 9999px | Pills, avatars |

**TailwindCSS Classes:**
```tsx
<div className="rounded-md">Card</div>
<button className="rounded-sm">Button</button>
<span className="rounded-full">Badge</span>
```

### Shadows

Shadow depths create visual hierarchy:

| Token | Value | Usage |
|-------|-------|-------|
| `none` | none | Flat elements |
| `sm` | 0 1px 2px | Subtle elevation |
| `md` | 0 2px 8px | Cards (default) |
| `lg` | 0 4px 16px | Elevated cards |
| `xl` | 0 8px 24px | Modals |
| `xxl` | 0 12px 32px | Maximum elevation |

**TailwindCSS Classes:**
```tsx
<div className="shadow-md">Card with elevation</div>
<div className="shadow-lg hover:shadow-xl">Elevated on hover</div>
```

### Transitions

Consistent animation durations:

| Token | Value | Usage |
|-------|-------|-------|
| `fast` | 150ms | Small UI changes |
| `normal` | 200ms | Default transitions |
| `slow` | 300ms | Large movements |

**Easing Functions:**
- `default`: `cubic-bezier(0.4, 0, 0.2, 1)` - Ease in-out
- `in`: `cubic-bezier(0.4, 0, 1, 1)` - Ease in
- `out`: `cubic-bezier(0, 0, 0.2, 1)` - Ease out
- `sharp`: `cubic-bezier(0.4, 0, 0.6, 1)` - Sharp transition

**TailwindCSS Classes:**
```tsx
<button className="transition-all duration-normal ease-default hover:scale-105">
  Button with hover effect
</button>
```

## Widget Design Patterns

### Standard Widget Structure

All widgets should follow this consistent structure:

```tsx
<WidgetContainer
  title="Widget Title"
  icon={WIDGET_ICONS.EXAMPLE}
  className="p-lg rounded-md shadow-md"
>
  {/* Header Section */}
  <div className="mb-md">
    <h2 className="text-heading font-semibold mb-sm">Section Title</h2>
    <p className="text-body text-neutral">Description</p>
  </div>

  {/* Content Section */}
  <div className="space-y-md">
    {/* Content items with consistent spacing */}
  </div>

  {/* Footer Section (optional) */}
  <div className="mt-lg pt-md border-t border-neutral-light">
    {/* Footer content */}
  </div>
</WidgetContainer>
```

### Widget Container

Standard container with consistent padding and styling:

```tsx
import WidgetContainer from '@/components/common/WidgetContainer';
import { WIDGET_DESIGN } from '@/constants/designTokens';

<WidgetContainer
  title="Widget Title"
  icon="🎯"
  testId="my-widget"
  className="bg-white dark:bg-gray-800"
>
  {/* Widget content */}
</WidgetContainer>
```

**Default Styles Applied:**
- Padding: `24px` (lg)
- Border Radius: `8px` (md)
- Shadow: `0 2px 8px rgba(0,0,0,0.1)` (md)
- Background: White / Dark gray (theme-aware)

### Header Styles

Consistent header styling across all widgets:

```tsx
<div className="flex items-center justify-between mb-md">
  <div className="flex items-center gap-sm">
    <span className="text-heading">{icon}</span>
    <h2 className="text-heading font-semibold">{title}</h2>
  </div>
  {/* Optional actions */}
</div>
```

### Content Sections

Use consistent spacing between sections:

```tsx
<div className="space-y-md">
  <Section1 />
  <Section2 />
  <Section3 />
</div>
```

### Badges and Status Indicators

Use semantic colors for status indicators:

```tsx
import SecurityLevelBadge from '@/components/common/SecurityLevelBadge';

// Security level badge
<SecurityLevelBadge level="High" />

// Status badges
<span className="px-sm py-xs rounded-sm bg-success text-white text-caption">
  Active
</span>
<span className="px-sm py-xs rounded-sm bg-warning text-black text-caption">
  Pending
</span>
<span className="px-sm py-xs rounded-sm bg-error text-white text-caption">
  Failed
</span>
```

### Interactive Elements

Consistent hover and focus states:

```tsx
<button className="
  px-md py-sm
  bg-primary text-white
  rounded-sm
  shadow-sm hover:shadow-md
  transition-all duration-normal
  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
  active:scale-95
">
  Action Button
</button>
```

## Responsive Design

### Breakpoints

Following TailwindCSS default breakpoints:

| Breakpoint | Min Width | Usage |
|-----------|-----------|-------|
| `sm` | 640px | Tablet portrait |
| `md` | 768px | Tablet landscape |
| `lg` | 1024px | Laptop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large desktop |

### Responsive Patterns

```tsx
<div className="
  grid
  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
  gap-md lg:gap-lg
">
  {/* Responsive grid */}
</div>

<h1 className="text-heading lg:text-title">
  Responsive Typography
</h1>
```

## Accessibility

### Color Contrast

All color combinations meet WCAG 2.1 AA standards:

- **Normal text**: Minimum contrast ratio of 4.5:1
- **Large text**: Minimum contrast ratio of 3:1
- **UI components**: Minimum contrast ratio of 3:1

### Focus States

All interactive elements must have visible focus indicators:

```tsx
<button className="focus:outline-none focus:ring-2 focus:ring-primary">
  Accessible Button
</button>
```

### Semantic HTML

Use appropriate HTML elements:
- `<button>` for actions
- `<a>` for navigation
- `<input>` for form inputs
- Proper heading hierarchy (h1, h2, h3, etc.)

## Dark Mode

The design system supports dark mode through CSS variables and TailwindCSS dark mode utilities.

### Dark Mode Classes

```tsx
<div className="bg-white dark:bg-gray-800 text-black dark:text-white">
  Theme-aware content
</div>
```

### CSS Variables

CSS variables automatically update based on theme:

```css
:root {
  --primary-color: #0066cc;
  --background-color: #f8f9fc;
}

.dark {
  --primary-color: #2b8aff;
  --background-color: #161b22;
}
```

## Implementation Guide

### 1. Import Design Tokens

```typescript
// Import specific tokens
import { SPACING, TYPOGRAPHY, SEMANTIC_COLORS } from '@/constants/designTokens';

// Import helper functions
import { getSpacing, getTypography, getSemanticColor } from '@/constants/designTokens';
```

### 2. Use TailwindCSS Classes

Prefer TailwindCSS utility classes for consistent styling:

```tsx
<div className="p-md rounded-md shadow-md bg-white">
  <h2 className="text-heading font-semibold mb-sm">Title</h2>
  <p className="text-body">Content</p>
</div>
```

### 3. Inline Styles (When Necessary)

For dynamic values, use design tokens:

```typescript
const dynamicStyle = {
  padding: SPACING.md,
  fontSize: TYPOGRAPHY.body,
  color: getSemanticColor('primary', 'main'),
};
```

### 4. Testing

Ensure design system consistency in tests:

```typescript
import { SPACING, SEMANTIC_COLORS } from '@/constants/designTokens';

it('should apply correct spacing', () => {
  const element = screen.getByTestId('my-element');
  expect(element).toHaveStyle({ padding: SPACING.md });
});
```

## Widget Checklist

Use this checklist when updating widgets to the design system:

- [ ] Replace hardcoded spacing with design tokens
- [ ] Use semantic colors instead of arbitrary hex values
- [ ] Apply consistent typography scale
- [ ] Use standard border radius values
- [ ] Apply appropriate shadows for elevation
- [ ] Add consistent transitions to interactive elements
- [ ] Ensure proper focus states
- [ ] Test in dark mode
- [ ] Verify responsive behavior
- [ ] Check accessibility (color contrast, keyboard navigation)

## Examples

### Before (Inconsistent)

```tsx
<div style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
  <h2 style={{ fontSize: '22px', marginBottom: '15px' }}>Title</h2>
  <p style={{ fontSize: '14px', color: '#666' }}>Content</p>
  <button style={{ backgroundColor: '#007bff', padding: '8px 16px' }}>
    Action
  </button>
</div>
```

### After (Consistent)

```tsx
import { WIDGET_DESIGN } from '@/constants/designTokens';

<div className="p-lg rounded-md shadow-md">
  <h2 className="text-heading font-semibold mb-md">Title</h2>
  <p className="text-body text-neutral">Content</p>
  <button className="px-md py-sm bg-primary text-white rounded-sm hover:bg-primary-dark transition-normal">
    Action
  </button>
</div>
```

## Resources

### Files
- **Design Tokens**: `src/constants/designTokens.ts`
- **TailwindCSS Config**: `tailwind.config.js`
- **CSS Variables**: `src/styles/variables.css`
- **Widget Container**: `src/components/common/WidgetContainer.tsx`

### References
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Design System](https://material.io/design/foundation)

## Changelog

### Version 1.0.0 (2025-12-25)
- Initial design system implementation
- Created centralized design tokens
- Extended TailwindCSS configuration
- Documented all design patterns and guidelines
- Applied to all 11 widgets across 4 categories

---

**Maintained by:** TypeScript React Agent  
**Last Review:** 2025-12-25  
**Next Review:** 2026-01-25
