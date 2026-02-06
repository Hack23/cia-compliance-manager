# 🎨 UI/UX Design System Skill

## Strategic Principle

**Consistent, accessible, and intuitive user interfaces create trust and efficiency in cybersecurity tools.**

This skill defines the UI/UX design standards for CIA Compliance Manager, ensuring a cohesive design system that enhances usability, accessibility, and visual consistency across all components.

## Core Rules

### 1. Design System Consistency (MANDATORY)

**RULE**: Use the established design system for all UI components.

**CIA Compliance Manager Design System**:

#### Color Palette
```typescript
// Security Level Colors (Primary Palette)
export const SECURITY_LEVEL_COLORS = {
  critical: '#D32F2F',  // Red - Critical priority, severe risk
  high: '#FF9800',      // Orange - High priority, significant risk
  moderate: '#FFC107',  // Amber - Medium priority, moderate risk
  low: '#4CAF50',       // Green - Low priority, minimal risk
  public: '#9E9E9E',    // Grey - Public info, no risk
} as const;

// Semantic Colors
export const SEMANTIC_COLORS = {
  primary: '#1976D2',    // Primary actions, links
  secondary: '#424242',  // Secondary information
  success: '#4CAF50',    // Success states
  warning: '#FFC107',    // Warning states
  error: '#D32F2F',      // Error states
  info: '#2196F3',       // Informational states
} as const;

// Neutral Palette
export const NEUTRAL_COLORS = {
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
  },
  background: {
    default: '#FAFAFA',
    paper: '#FFFFFF',
    dark: '#212121',
  },
  divider: '#E0E0E0',
} as const;
```

**Must-Follow Patterns**:
- ✅ **MUST**: Use security level colors from `src/constants/securityLevels.ts`
- ✅ **MUST**: Use semantic colors for consistent meaning
- ✅ **MUST**: Maintain WCAG 2.1 AA contrast ratios (4.5:1 for text)
- ✅ **SHOULD**: Use color utilities from `src/utils/colorUtils.ts`

### 2. Typography System

**RULE**: Use consistent typography hierarchy.

```typescript
// Typography Scale
export const TYPOGRAPHY = {
  h1: {
    fontSize: '2.5rem',    // 40px
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '2rem',      // 32px
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: '1.75rem',   // 28px
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h4: {
    fontSize: '1.5rem',    // 24px
    fontWeight: 600,
    lineHeight: 1.4,
  },
  body1: {
    fontSize: '1rem',      // 16px
    fontWeight: 400,
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '0.875rem',  // 14px
    fontWeight: 400,
    lineHeight: 1.5,
  },
  caption: {
    fontSize: '0.75rem',   // 12px
    fontWeight: 400,
    lineHeight: 1.4,
  },
} as const;
```

**Must-Follow Patterns**:
- ✅ **MUST**: Use semantic HTML elements (h1, h2, p, etc.)
- ✅ **MUST**: Maintain visual hierarchy
- ✅ **SHOULD**: Use TailwindCSS typography utilities
- ✅ **MAY**: Customize for specific widget needs

### 3. Spacing System

**RULE**: Use consistent spacing based on 8px grid.

```typescript
// Spacing Scale (8px base unit)
export const SPACING = {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
  '3xl': '4rem',  // 64px
} as const;

// Component Spacing Guidelines
export const COMPONENT_SPACING = {
  cardPadding: 'md',        // 16px
  sectionMargin: 'xl',      // 32px
  elementGap: 'sm',         // 8px
  containerPadding: 'lg',   // 24px
} as const;
```

**Must-Follow Patterns**:
- ✅ **MUST**: Use 8px-based spacing (4, 8, 16, 24, 32, 48, 64)
- ✅ **MUST**: Consistent padding within components
- ✅ **SHOULD**: Use TailwindCSS spacing utilities (p-4, m-8, gap-2)
- ✅ **MAY**: Break grid for optical alignment

### 4. Component Library

**RULE**: Reuse common components from the design system.

**Available Components** (from `src/components/common/`):
```typescript
// Layout Components
<Card />              // Container with shadow and padding
<Grid />              // Responsive grid layout
<Stack />             // Vertical/horizontal stack
<Container />         // Max-width centered container

// Data Display
<Badge />             // Status indicators
<Chip />              // Compact information
<Tooltip />           // Additional context
<Typography />        // Text with consistent styling

// Input Components
<Button />            // Actions and navigation
<TextField />         // Text input
<Select />            // Dropdown selection
<Checkbox />          // Boolean input

// Feedback Components
<Alert />             // Contextual messages
<Skeleton />          // Loading placeholders
<Progress />          // Progress indicators

// Chart Components (from `src/components/charts/`)
<PieChart />          // Distribution visualization
<BarChart />          // Comparison visualization
<LineChart />         // Trend visualization
```

**Must-Follow Patterns**:
- ✅ **MUST**: Use existing components before creating new ones
- ✅ **MUST**: Follow component API conventions
- ✅ **SHOULD**: Extend components via composition, not modification
- ✅ **MAY**: Request new components through design system update

### 5. Responsive Design

**RULE**: Design for mobile-first, progressive enhancement.

```typescript
// Breakpoints (TailwindCSS)
export const BREAKPOINTS = {
  sm: '640px',   // Small devices (phones)
  md: '768px',   // Medium devices (tablets)
  lg: '1024px',  // Large devices (desktops)
  xl: '1280px',  // Extra large devices
  '2xl': '1536px', // Ultra-wide displays
} as const;

// Responsive Patterns
// ✅ GOOD: Mobile-first approach
<div className="flex flex-col md:flex-row gap-4">
  <div className="w-full md:w-1/2">Column 1</div>
  <div className="w-full md:w-1/2">Column 2</div>
</div>

// ✅ GOOD: Responsive typography
<h1 className="text-2xl md:text-3xl lg:text-4xl">
  Responsive Heading
</h1>

// ✅ GOOD: Container queries for component-level responsiveness
<div className="@container">
  <div className="grid @md:grid-cols-2 @lg:grid-cols-3 gap-4">
    {/* Responsive grid based on container size */}
  </div>
</div>
```

**Must-Follow Patterns**:
- ✅ **MUST**: Test on mobile, tablet, and desktop viewports
- ✅ **MUST**: Use fluid layouts (avoid fixed widths)
- ✅ **MUST**: Ensure touch targets are ≥ 44x44px
- ✅ **SHOULD**: Use responsive images (srcset, sizes)
- ✅ **MAY**: Use container queries for complex components

### 6. Accessibility (a11y) Standards

**RULE**: Build accessible interfaces that work for everyone.

**WCAG 2.1 Level AA Requirements**:

```typescript
// ✅ GOOD: Semantic HTML
<button 
  onClick={handleClick}
  aria-label="Close dialog"
  aria-describedby="dialog-description"
>
  <Icon name="close" aria-hidden="true" />
</button>

// ✅ GOOD: Proper form labels
<label htmlFor="email">Email Address</label>
<input 
  id="email" 
  type="email"
  aria-required="true"
  aria-invalid={hasError}
  aria-describedby={hasError ? 'email-error' : undefined}
/>
{hasError && <span id="email-error" role="alert">Invalid email</span>}

// ✅ GOOD: Keyboard navigation
<div 
  role="button" 
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Custom Button
</div>

// ✅ GOOD: Screen reader text
<span className="sr-only">Loading...</span>
<Spinner aria-hidden="true" />
```

**Must-Follow Patterns**:
- ✅ **MUST**: Semantic HTML elements (button, nav, main, article)
- ✅ **MUST**: Proper ARIA labels and roles
- ✅ **MUST**: Keyboard navigation support (Tab, Enter, Space, Arrow keys)
- ✅ **MUST**: 4.5:1 contrast ratio for normal text, 3:1 for large text
- ✅ **MUST**: Focus indicators visible and clear
- ✅ **SHOULD**: Test with screen readers (NVDA, JAWS, VoiceOver)
- ✅ **SHOULD**: Support reduced motion preferences
- ✅ **MAY**: Implement skip links for keyboard navigation

### 7. Icons and Imagery

**RULE**: Use consistent iconography and imagery.

```typescript
// Icon System
import { 
  ShieldCheckIcon,  // Security
  ChartBarIcon,     // Metrics
  DocumentIcon,     // Documentation
  ExclamationIcon,  // Warning
  InformationIcon,  // Info
} from '@heroicons/react/24/outline';

// ✅ GOOD: Accessible icons
<ShieldCheckIcon 
  className="w-6 h-6 text-green-600"
  aria-label="Security approved"
/>

// ✅ GOOD: Decorative icons (hidden from screen readers)
<ChartBarIcon 
  className="w-5 h-5"
  aria-hidden="true"
/>
<span>Dashboard</span>

// Image Guidelines
<img 
  src="/path/to/image.jpg"
  alt="Descriptive alt text"
  loading="lazy"
  width={600}
  height={400}
/>
```

**Must-Follow Patterns**:
- ✅ **MUST**: Provide text alternatives (aria-label or alt text)
- ✅ **MUST**: Use aria-hidden for decorative icons
- ✅ **MUST**: Consistent icon size within context (16px, 20px, 24px)
- ✅ **SHOULD**: Use outline style for interactive icons
- ✅ **MAY**: Use solid style for status indicators

## UI/UX Patterns

### Data Visualization

**Security Level Indicators**:
```tsx
// ✅ GOOD: Consistent security level display
import { Badge } from '@/components/common/Badge';
import { getColorForSecurityLevel } from '@/utils/colorUtils';

<Badge 
  color={getColorForSecurityLevel(level)}
  size="sm"
  aria-label={`Security level: ${level}`}
>
  {level.toUpperCase()}
</Badge>
```

### Widget Layout Pattern

```tsx
// ✅ GOOD: Standard widget structure
<Card className="p-6">
  <div className="flex items-center justify-between mb-4">
    <Typography variant="h3" className="text-xl font-semibold">
      Widget Title
    </Typography>
    <Tooltip content="Help text">
      <InformationIcon className="w-5 h-5 text-gray-500" />
    </Tooltip>
  </div>
  
  <div className="space-y-4">
    {/* Widget content */}
  </div>
  
  <div className="mt-6 pt-4 border-t border-gray-200">
    <Button variant="primary" size="sm">
      View Details
    </Button>
  </div>
</Card>
```

### Form Layout Pattern

```tsx
// ✅ GOOD: Accessible form structure
<form onSubmit={handleSubmit} aria-labelledby="form-title">
  <Typography id="form-title" variant="h2">
    Security Assessment
  </Typography>
  
  <div className="space-y-4 mt-6">
    <div>
      <label htmlFor="confidentiality" className="block mb-2">
        Confidentiality Level
      </label>
      <Select
        id="confidentiality"
        value={confidentiality}
        onChange={setConfidentiality}
        options={securityLevels}
        required
      />
    </div>
    
    <div>
      <label htmlFor="description" className="block mb-2">
        Description
      </label>
      <TextField
        id="description"
        value={description}
        onChange={setDescription}
        multiline
        rows={4}
        aria-describedby="description-help"
      />
      <span id="description-help" className="text-sm text-gray-600">
        Provide additional context
      </span>
    </div>
  </div>
  
  <div className="flex gap-3 mt-6">
    <Button type="submit" variant="primary">
      Submit
    </Button>
    <Button type="button" variant="secondary" onClick={handleCancel}>
      Cancel
    </Button>
  </div>
</form>
```

### Loading States

```tsx
// ✅ GOOD: Accessible loading state
import { Skeleton } from '@/components/common/Skeleton';

{isLoading ? (
  <div role="status" aria-live="polite">
    <Skeleton height={200} />
    <span className="sr-only">Loading data...</span>
  </div>
) : (
  <DataDisplay data={data} />
)}

// ✅ GOOD: Button loading state
<Button 
  onClick={handleSubmit}
  disabled={isSubmitting}
  aria-busy={isSubmitting}
>
  {isSubmitting ? (
    <>
      <Spinner className="w-4 h-4 mr-2" aria-hidden="true" />
      Processing...
    </>
  ) : (
    'Submit'
  )}
</Button>
```

### Error States

```tsx
// ✅ GOOD: User-friendly error display
<Alert 
  variant="error" 
  role="alert"
  aria-live="assertive"
>
  <ExclamationIcon className="w-5 h-5" aria-hidden="true" />
  <div>
    <Typography variant="body1" className="font-semibold">
      Failed to load data
    </Typography>
    <Typography variant="body2">
      {errorMessage}
    </Typography>
    <Button 
      variant="text" 
      size="sm"
      onClick={handleRetry}
      className="mt-2"
    >
      Try Again
    </Button>
  </div>
</Alert>
```

## Testing UI/UX

### Visual Regression Testing
```typescript
// ✅ GOOD: Snapshot tests for UI consistency
describe('SecurityBadge', () => {
  it('renders critical level correctly', () => {
    const { container } = render(
      <SecurityBadge level="critical" />
    );
    expect(container).toMatchSnapshot();
  });
});
```

### Accessibility Testing
```typescript
// ✅ GOOD: Automated a11y testing
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('Widget has no a11y violations', async () => {
  const { container } = render(<Widget />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Responsive Testing
```typescript
// ✅ GOOD: Test responsive behavior
describe('ResponsiveGrid', () => {
  it('shows single column on mobile', () => {
    global.innerWidth = 375;
    const { container } = render(<ResponsiveGrid />);
    expect(container.querySelector('.grid')).toHaveClass('grid-cols-1');
  });
  
  it('shows multiple columns on desktop', () => {
    global.innerWidth = 1280;
    const { container } = render(<ResponsiveGrid />);
    expect(container.querySelector('.grid')).toHaveClass('md:grid-cols-3');
  });
});
```

## UI/UX Checklist

Before merging UI changes:

**Visual Consistency**:
- [ ] Uses design system colors from constants
- [ ] Follows typography scale
- [ ] Adheres to 8px spacing grid
- [ ] Reuses existing components
- [ ] Maintains consistent visual hierarchy

**Responsiveness**:
- [ ] Tested on mobile (320px-768px)
- [ ] Tested on tablet (768px-1024px)
- [ ] Tested on desktop (1024px+)
- [ ] Touch targets are ≥ 44x44px
- [ ] Text is readable at all sizes

**Accessibility**:
- [ ] Uses semantic HTML
- [ ] Has proper ARIA labels and roles
- [ ] Supports keyboard navigation
- [ ] Meets WCAG 2.1 AA contrast ratios
- [ ] Tested with screen reader
- [ ] No axe violations

**Performance**:
- [ ] Images are optimized and lazy-loaded
- [ ] No layout shift (CLS < 0.1)
- [ ] Fast interaction response (< 100ms)

**Usability**:
- [ ] Clear visual feedback for interactions
- [ ] Error messages are helpful
- [ ] Loading states are clear
- [ ] Call-to-actions are obvious
- [ ] Information hierarchy is logical

## Common Anti-Patterns

### ❌ Anti-Pattern 1: Inconsistent Colors
```tsx
// ❌ BAD: Hardcoded colors
<div style={{ backgroundColor: '#ff0000' }}>Critical</div>

// ✅ GOOD: Use design system
import { SECURITY_LEVEL_COLORS } from '@/constants/securityLevels';
<div style={{ backgroundColor: SECURITY_LEVEL_COLORS.critical }}>
  Critical
</div>
```

### ❌ Anti-Pattern 2: Poor Accessibility
```tsx
// ❌ BAD: Div as button without a11y
<div onClick={handleClick}>Click me</div>

// ✅ GOOD: Proper button with a11y
<button onClick={handleClick} aria-label="Submit form">
  Click me
</button>
```

### ❌ Anti-Pattern 3: Fixed Widths
```tsx
// ❌ BAD: Fixed width breaks responsiveness
<div style={{ width: '800px' }}>Content</div>

// ✅ GOOD: Fluid width with max constraint
<div className="w-full max-w-4xl mx-auto">Content</div>
```

## Tools

**Design**:
- Figma - Design mockups and prototypes
- Storybook - Component library documentation

**Development**:
- TailwindCSS - Utility-first CSS framework
- Heroicons - Icon library
- React Testing Library - UI testing

**Testing**:
- jest-axe - Automated accessibility testing
- Lighthouse - Performance and accessibility audits
- Percy - Visual regression testing

**Browser Extensions**:
- axe DevTools - Accessibility testing
- WAVE - Web accessibility evaluation

## Remember

Good UI/UX design is:
- **Consistent**: Follows established patterns
- **Accessible**: Works for all users
- **Responsive**: Adapts to all devices
- **Intuitive**: Easy to understand and use
- **Performant**: Fast and efficient
- **Tested**: Verified across devices and assistive technologies

**Design systems enable teams to build faster and more consistently.**

---

**Related Skills**:
- [Performance Optimization](./performance-optimization.md) - UI performance
- [Testing Excellence](./testing-excellence.md) - UI testing strategies
- [Code Quality Excellence](./code-quality-excellence.md) - Component reusability

**External Resources**:
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [React Accessibility](https://react.dev/learn/accessibility)
- [Material Design System](https://m3.material.io/)
