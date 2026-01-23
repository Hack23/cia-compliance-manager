[**CIA Compliance Manager Documentation v1.1.12**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / WidgetClasses

# Variable: WidgetClasses

> `const` **WidgetClasses**: `object`

Defined in: [utils/tailwindClassHelpers.ts:34](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/utils/tailwindClassHelpers.ts#L34)

Standard class patterns for consistent widget styling

These patterns use Tailwind utility classes and design tokens from designTokens.ts
to ensure visual consistency across all widgets.

## Type Declaration

### badge

> `readonly` **badge**: `"inline-flex items-center px-sm py-xs text-caption font-medium rounded-sm"` = `'inline-flex items-center px-sm py-xs text-caption font-medium rounded-sm'`

Standard badge styling
Use with specific color variants

### badgeError

> `readonly` **badgeError**: `"bg-error text-white"` = `'bg-error text-white'`

Error badge (red)

### badgeInfo

> `readonly` **badgeInfo**: `"bg-info text-white"` = `'bg-info text-white'`

Info badge (blue)

### badgeNeutral

> `readonly` **badgeNeutral**: `"bg-neutral text-white"` = `'bg-neutral text-white'`

Neutral badge (gray)

### badgeSuccess

> `readonly` **badgeSuccess**: `"bg-success text-white"` = `'bg-success text-white'`

Success badge (green)

### badgeWarning

> `readonly` **badgeWarning**: `"bg-warning text-gray-900"` = `'bg-warning text-gray-900'`

Warning badge (yellow)

### body

> `readonly` **body**: `"text-body text-gray-600 dark:text-gray-400"` = `'text-body text-gray-600 dark:text-gray-400'`

Standard body text style
Use for primary content and descriptions

### buttonPrimary

> `readonly` **buttonPrimary**: `"bg-primary hover:bg-primary-dark text-white font-medium py-sm px-md rounded-md transition-colors duration-fast focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"` = `'bg-primary hover:bg-primary-dark text-white font-medium py-sm px-md rounded-md transition-colors duration-fast focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'`

Primary button style
High contrast for main actions

### buttonSecondary

> `readonly` **buttonSecondary**: `"bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 font-medium py-sm px-md rounded-md transition-colors duration-fast focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"` = `'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 font-medium py-sm px-md rounded-md transition-colors duration-fast focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'`

Secondary button style
Lower contrast for alternative actions

### card

> `readonly` **card**: `"rounded-md border border-gray-200 dark:border-gray-600 p-md bg-gray-50 dark:bg-gray-700"` = `'rounded-md border border-gray-200 dark:border-gray-600 p-md bg-gray-50 dark:bg-gray-700'`

Standard card container for nested content
Lighter background to distinguish from main container

### cardInteractive

> `readonly` **cardInteractive**: `"hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-fast"` = `'hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-fast'`

Interactive card with hover effect
Use for clickable cards and list items

### cardWhite

> `readonly` **cardWhite**: `"rounded-lg border border-gray-100 dark:border-gray-700 p-sm bg-white dark:bg-gray-800"` = `'rounded-lg border border-gray-100 dark:border-gray-700 p-sm bg-white dark:bg-gray-800'`

White card container with clean appearance
Use for primary content cards and widget sections

### container

> `readonly` **container**: `"rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md p-lg"` = `'rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md p-lg'`

Standard widget container with rounded corners, border, shadow, and padding
Uses design tokens for consistent spacing and elevation

### containerHover

> `readonly` **containerHover**: `"hover:shadow-lg transition-shadow duration-normal"` = `'hover:shadow-lg transition-shadow duration-normal'`

Hover effect for interactive containers
Increases shadow on hover with smooth transition

### disabled

> `readonly` **disabled**: `"opacity-50 cursor-not-allowed pointer-events-none"` = `'opacity-50 cursor-not-allowed pointer-events-none'`

Disabled state styling
Reduced opacity and no pointer events

### dividerHorizontal

> `readonly` **dividerHorizontal**: `"border-t border-gray-200 dark:border-gray-700 my-md"` = `'border-t border-gray-200 dark:border-gray-700 my-md'`

Horizontal divider

### dividerVertical

> `readonly` **dividerVertical**: `"border-l border-gray-200 dark:border-gray-700 mx-md"` = `'border-l border-gray-200 dark:border-gray-700 mx-md'`

Vertical divider (for flex layouts)

### flexRow

> `readonly` **flexRow**: `"flex flex-wrap gap-sm md:gap-md"` = `'flex flex-wrap gap-sm md:gap-md'`

Flexible row layout with wrapping
Adjusts gap between items responsively

### focusVisible

> `readonly` **focusVisible**: `"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"` = `'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'`

Focus-visible ring for keyboard navigation
Ensures accessibility compliance

### grid2Cols

> `readonly` **grid2Cols**: `"grid grid-cols-1 md:grid-cols-2 gap-md"` = `'grid grid-cols-1 md:grid-cols-2 gap-md'`

Two-column grid layout
Stacks on mobile, 2 columns on medium+ screens

### grid3Cols

> `readonly` **grid3Cols**: `"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md"` = `'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md'`

Three-column grid layout
Stacks on mobile, 2 columns on tablet, 3 columns on desktop

### heading

> `readonly` **heading**: `"text-subheading font-semibold text-gray-800 dark:text-gray-100 mb-md"` = `'text-subheading font-semibold text-gray-800 dark:text-gray-100 mb-md'`

Primary heading style for widget titles
Uses design token typography and semantic colors

### hideDesktop

> `readonly` **hideDesktop**: `"block md:hidden"` = `'block md:hidden'`

Show on mobile only, hide on tablet and desktop
Use for mobile-optimized alternatives

### hideMobile

> `readonly` **hideMobile**: `"hidden md:block"` = `'hidden md:block'`

Hide on mobile, show on tablet and desktop
Use for non-essential content on small screens

### label

> `readonly` **label**: `"text-caption font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide"` = `'text-caption font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide'`

Small label text for form labels and metadata
Uppercase with tracking for emphasis

### labelNormal

> `readonly` **labelNormal**: `"text-caption font-medium text-gray-500 dark:text-gray-500 tracking-wide"` = `'text-caption font-medium text-gray-500 dark:text-gray-500 tracking-wide'`

Small label text for form labels and metadata in normal case
Use this when label text should preserve its original casing
instead of being forced to uppercase.

### loading

> `readonly` **loading**: `"animate-pulse"` = `'animate-pulse'`

Loading state with pulse animation
Use for skeleton screens and loading indicators

### section

> `readonly` **section**: `"mb-lg space-y-md"` = `'mb-lg space-y-md'`

Standard section with bottom margin and vertical spacing
Use for major content divisions within widgets

### sectionBorder

> `readonly` **sectionBorder**: `"border-l-4 border-primary pl-md"` = `'border-l-4 border-primary pl-md'`

Section with left border accent
Use for emphasized or highlighted sections

### subheading

> `readonly` **subheading**: `"text-body-lg font-medium text-gray-700 dark:text-gray-200 mb-sm"` = `'text-body-lg font-medium text-gray-700 dark:text-gray-200 mb-sm'`

Secondary heading for subsections
Smaller and medium weight for content hierarchy

### textResponsive

> `readonly` **textResponsive**: `"text-body md:text-body-lg"` = `'text-body md:text-body-lg'`

Responsive text sizing
Smaller on mobile, larger on desktop

## Example

```tsx
import { WidgetClasses, cn } from '@/utils/tailwindClassHelpers';

function MyWidget() {
  return (
    <div className={cn(WidgetClasses.container, WidgetClasses.containerHover)}>
      <h2 className={WidgetClasses.heading}>Widget Title</h2>
      <div className={WidgetClasses.grid2Cols}>
        <div className={WidgetClasses.card}>Content 1</div>
        <div className={WidgetClasses.card}>Content 2</div>
      </div>
    </div>
  );
}
```
