# CSS & Tailwind Improvement Action Items

## Quick Reference Guide for Developers

### 🔴 Critical Fixes (Do These First)

#### 1. Fix Double-Dark Opacity Patterns
**Problem:** Using `dark:bg-opacity-20` on already dark color variants.

**Bad:**
```typescript
className="bg-blue-900 dark:bg-opacity-20"
```

**Good:**
```typescript
className="bg-blue-light/10 dark:bg-blue-dark/20"
```

**Files to Fix:**
- `SecurityLevelWidget.tsx`
- `BusinessImpactAnalysisWidget.tsx`
- `ConfidentialityImpactWidget.tsx`
- `IntegrityImpactWidget.tsx`
- `AvailabilityImpactWidget.tsx`

---

#### 2. Standardize CIA Component Colors
**Problem:** Three different approaches for same component.

**Create Utility** (`src/utils/ciaColorUtils.ts`):
```typescript
export const getCIAColors = (
  component: 'confidentiality' | 'integrity' | 'availability'
) => {
  const colors = {
    confidentiality: {
      bg: 'bg-primary-light/10 dark:bg-primary-dark/20',
      text: 'text-purple-800 dark:text-purple-300',
      border: 'border-l-4 border-purple-500 dark:border-purple-400',
      badge: 'bg-purple-100 dark:bg-purple-900/30',
    },
    integrity: {
      bg: 'bg-success-light/10 dark:bg-success-dark/20',
      text: 'text-green-800 dark:text-green-300',
      border: 'border-l-4 border-green-500 dark:border-green-400',
      badge: 'bg-green-100 dark:bg-green-900/30',
    },
    availability: {
      bg: 'bg-info-light/10 dark:bg-info-dark/20',
      text: 'text-blue-800 dark:text-blue-300',
      border: 'border-l-4 border-blue-500 dark:border-blue-400',
      badge: 'bg-blue-100 dark:bg-blue-900/30',
    },
  };
  return colors[component];
};
```

**Usage:**
```typescript
import { getCIAColors } from '@/utils/ciaColorUtils';

<div className={cn(
  WidgetClasses.card,
  getCIAColors('confidentiality').bg,
  getCIAColors('confidentiality').border
)}>
  Confidentiality Content
</div>
```

---

#### 3. Apply Defined CSS Classes
**Problem:** Beautiful CSS exists but components use inline Tailwind.

**Before:**
```typescript
<div className="bg-white dark:bg-gray-800 rounded-md shadow-md border border-gray-200 dark:border-gray-700 p-4">
  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
    Widget Title
  </h3>
</div>
```

**After:**
```typescript
import { WidgetClasses } from '@/utils/tailwindClassHelpers';

<div className={WidgetClasses.container}>
  <h3 className={WidgetClasses.title}>
    Widget Title
  </h3>
</div>
```

**Benefits:**
- Realizes full cyberpunk/corporate theme design
- Reduces code duplication
- Easier to maintain and update themes
- Cleaner component code

---

### 🟡 Medium Priority (Next Sprint)

#### 4. Replace Hardcoded Typography
**Problem:** Using `text-lg`, `text-sm` instead of design tokens.

**Find & Replace:**
- `text-xs` → `text-caption`
- `text-sm` → `text-body`
- `text-base` → `text-body-lg`
- `text-lg` → `text-subheading`
- `text-xl` → `text-heading`
- `text-2xl` → `text-title`

**Use Search:**
```bash
# Find all hardcoded text sizes
grep -r "text-\(xs\|sm\|base\|lg\|xl\|2xl\)" src/components/widgets/
```

---

#### 5. Standardize Spacing
**Problem:** Mixed spacing scales across widgets.

**Spacing Standards:**

**For Cards/Containers:**
```typescript
className="p-md mb-md"  // Use md for standard spacing
```

**For Compact Elements:**
```typescript
className="p-sm mb-sm"  // Use sm for tight layouts
```

**For Section Spacing:**
```typescript
className="mb-lg"       // Use lg for section breaks
```

**Never Use:**
- `p-4`, `p-3`, `px-4 py-2` (numeric Tailwind classes)
- `sm:px-3 sm:py-2` (responsive numeric classes)

**Always Use:**
- `p-sm`, `p-md`, `p-lg` (design tokens)
- `mb-sm`, `mb-md`, `mb-lg` (design tokens)

---

#### 6. Increase WidgetClasses Usage
**Problem:** Only 30% of widgets use helper classes.

**Available Helpers:**
```typescript
WidgetClasses.container   // Widget container
WidgetClasses.header      // Widget header
WidgetClasses.title       // Widget title
WidgetClasses.subtitle    // Widget subtitle
WidgetClasses.section     // Content section
WidgetClasses.card        // Card within widget
WidgetClasses.badge()     // Status badges
```

**Migration Checklist per Widget:**
1. Import WidgetClasses
2. Replace container div with `WidgetClasses.container`
3. Replace header with `WidgetClasses.header`
4. Replace title with `WidgetClasses.title`
5. Replace sections with `WidgetClasses.section`
6. Replace inner cards with `WidgetClasses.card`

---

### 🟢 Low Priority (Future)

#### 7. Add Visual Regression Tests
**Goal:** Ensure theme changes don't break visuals.

**Setup Cypress Visual Testing:**
```typescript
// cypress/e2e/theme-visual.cy.ts
describe('Theme Visual Tests', () => {
  it('light theme matches baseline', () => {
    cy.visit('/');
    cy.matchImageSnapshot('light-theme-dashboard');
  });

  it('dark theme matches baseline', () => {
    cy.visit('/');
    cy.get('[data-testid="theme-toggle"]').click();
    cy.wait(500); // Wait for transition
    cy.matchImageSnapshot('dark-theme-dashboard');
  });
});
```

---

#### 8. Create CSS Usage Analyzer
**Goal:** Track which CSS classes are used.

**Create Script** (`scripts/analyze-css-usage.js`):
```javascript
const fs = require('fs');
const glob = require('glob');

// Read all CSS files
const cssClasses = new Set();
// ... read from CSS files

// Read all TSX files
const usedClasses = new Set();
// ... read from TSX files

// Find unused
const unused = [...cssClasses].filter(c => !usedClasses.has(c));

console.log('Unused CSS classes:', unused);
console.log(`Usage: ${usedClasses.size}/${cssClasses.size} (${Math.round(usedClasses.size/cssClasses.size*100)}%)`);
```

**Add to package.json:**
```json
{
  "scripts": {
    "analyze:css": "node scripts/analyze-css-usage.js"
  }
}
```

---

## Widget-by-Widget Checklist

### SecurityLevelWidget
- [ ] Fix double-dark opacity patterns
- [ ] Replace hardcoded button colors with WidgetClasses
- [ ] Use design token typography
- [ ] Apply WidgetClasses.container

### CostEstimationWidget
- [x] Uses design tokens correctly ✅
- [ ] Apply WidgetClasses.container
- [ ] Standardize spacing (currently mixed)

### BusinessImpactAnalysisWidget
- [ ] Fix hardcoded gray backgrounds
- [ ] Use CIA color utilities
- [ ] Replace typography with tokens
- [ ] Apply WidgetClasses

### SecuritySummaryWidget
- [x] Good design token usage ✅
- [ ] Apply more WidgetClasses
- [ ] Ensure tab styling consistency

### CIA Impact Widgets (3 widgets)
- [ ] Standardize colors using getCIAColors()
- [ ] Fix double-dark opacity patterns
- [ ] Apply WidgetClasses.container
- [ ] Use consistent spacing

### ComplianceStatusWidget
- [ ] Replace hardcoded colors
- [ ] Use design tokens
- [ ] Apply WidgetClasses

### ValueCreationWidget
- [ ] Standardize ROI card colors
- [ ] Use design tokens for typography
- [ ] Apply WidgetClasses

### TechnicalDetailsWidget
- [ ] Fix responsive spacing patterns
- [ ] Use design token typography
- [ ] Apply WidgetClasses

### SecurityResourcesWidget
- [ ] Standardize card styling
- [ ] Use design tokens
- [ ] Apply WidgetClasses

---

## Testing Checklist

### Before Committing Changes:
1. [ ] Light theme looks correct
2. [ ] Dark theme looks correct
3. [ ] Theme toggle works smoothly
4. [ ] All widgets display correctly
5. [ ] Text is readable in both themes
6. [ ] Colors are consistent across similar widgets
7. [ ] No console warnings about CSS
8. [ ] Build completes without warnings

### Manual Testing:
```bash
# Start dev server
npm run dev

# Check light theme
# 1. Verify all widgets display
# 2. Check text readability
# 3. Verify color consistency

# Toggle to dark theme
# 4. Verify cyberpunk styling appears
# 5. Check all neon effects work
# 6. Verify text contrast
# 7. Check hover effects

# Test responsive
# 8. Resize browser window
# 9. Check mobile view
# 10. Verify spacing adjusts
```

---

## Quick Reference: Common Patterns

### ✅ DO: Use Design Tokens
```typescript
// Colors
className="bg-primary text-primary-dark dark:bg-primary-dark dark:text-primary-light"

// Typography
className="text-subheading font-semibold"

// Spacing
className="p-md mb-lg gap-sm"

// CIA Components
className={getCIAColors('confidentiality').bg}
```

### ❌ DON'T: Hardcode Values
```typescript
// Don't hardcode colors
className="bg-blue-600 dark:bg-blue-700"

// Don't hardcode typography
className="text-lg font-bold"

// Don't use numeric spacing
className="p-4 mb-6"

// Don't mix approaches
className="bg-purple-100 dark:bg-opacity-20"
```

---

## ESLint Rules to Add

Create `.eslintrc.css.json`:
```json
{
  "rules": {
    "no-hardcoded-colors": "warn",
    "no-hardcoded-typography": "warn",
    "no-numeric-spacing": "warn",
    "prefer-widget-classes": "warn"
  }
}
```

---

## PR Review Checklist

When reviewing CSS/styling PRs:
- [ ] No hardcoded Tailwind colors (`bg-blue-600`, etc.)
- [ ] No hardcoded typography (`text-lg`, etc.)
- [ ] No numeric spacing (`p-4`, `mb-6`, etc.)
- [ ] Uses WidgetClasses where appropriate
- [ ] CIA components use getCIAColors()
- [ ] No double-dark patterns (`dark:bg-opacity-20`)
- [ ] Design tokens used consistently
- [ ] Both themes tested

---

## Resources

- **Design Tokens:** `src/constants/designTokens.ts`
- **Helper Classes:** `src/utils/tailwindClassHelpers.ts`
- **CIA Colors:** `src/utils/ciaColorUtils.ts` (to be created)
- **CSS Variables:** `src/styles/variables.css`
- **Light Theme:** `src/styles/light-theme.css`
- **Dark Theme:** `src/styles/dark-theme.css`
- **Full Report:** `CSS_ANALYSIS_REPORT.md`

---

**Last Updated:** January 19, 2026  
**Maintainer:** Development Team  
**Status:** Active Guidelines
