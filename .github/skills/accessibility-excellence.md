# ♿ Accessibility (a11y) Excellence Skill

## Strategic Principle

**Accessible software is usable software. Build inclusive experiences that work for everyone, regardless of ability.**

This skill ensures CIA Compliance Manager meets WCAG 2.1 Level AA standards and provides an excellent experience for all users, including those using assistive technologies.

## Core Rules

### 1. Semantic HTML (MANDATORY)

**RULE**: Use the right HTML element for the job.

```tsx
// ✅ GOOD: Semantic HTML
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/dashboard">Dashboard</a></li>
    <li><a href="/reports">Reports</a></li>
  </ul>
</nav>

<main>
  <article>
    <header>
      <h1>Security Assessment</h1>
    </header>
    <section>
      <h2>Risk Analysis</h2>
      <p>Content here...</p>
    </section>
  </article>
</main>

// ❌ BAD: Non-semantic divs
<div className="nav">
  <div className="nav-item" onClick={goToDashboard}>Dashboard</div>
  <div className="nav-item" onClick={goToReports}>Reports</div>
</div>
```

**Must-Follow Patterns**:
- ✅ **MUST**: Use `<button>` for actions, `<a>` for navigation
- ✅ **MUST**: Use heading hierarchy (h1 → h2 → h3) without skipping levels
- ✅ **MUST**: Use `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`
- ✅ **MUST**: Use `<label>` for form inputs
- ✅ **MUST**: Use `<table>` for tabular data (not layout)

### 2. ARIA Attributes (WHEN NEEDED)

**RULE**: Use ARIA to enhance semantics, not replace them.

**The ARIA Rules**:
1. **First Rule**: Don't use ARIA if you can use native HTML
2. **Second Rule**: Don't change native semantics
3. **Third Rule**: All interactive ARIA controls must be keyboard accessible
4. **Fourth Rule**: Don't use `role="presentation"` or `aria-hidden="true"` on focusable elements
5. **Fifth Rule**: All interactive elements must have accessible names

```tsx
// ✅ GOOD: ARIA enhancing native HTML
<button 
  aria-label="Close dialog"
  aria-expanded={isOpen}
  aria-controls="dialog-content"
>
  <CloseIcon aria-hidden="true" />
</button>

// ✅ GOOD: ARIA providing screen reader context
<div 
  role="status" 
  aria-live="polite"
  aria-atomic="true"
>
  {statusMessage}
</div>

// ✅ GOOD: ARIA for custom components
<div
  role="tablist"
  aria-label="Security categories"
>
  <button
    role="tab"
    aria-selected={activeTab === 'confidentiality'}
    aria-controls="confidentiality-panel"
    id="confidentiality-tab"
  >
    Confidentiality
  </button>
</div>

// ❌ BAD: ARIA replacing native HTML
<div role="button" onClick={handleClick}>
  Click me
</div>
// Should be: <button onClick={handleClick}>Click me</button>
```

**Must-Follow Patterns**:
- ✅ **MUST**: Prefer native HTML over ARIA
- ✅ **MUST**: Provide `aria-label` for icon-only buttons
- ✅ **MUST**: Use `aria-describedby` for additional context
- ✅ **MUST**: Use `aria-live` for dynamic content updates
- ✅ **MUST**: Use `aria-invalid` and `aria-errormessage` for form errors
- ✅ **SHOULD**: Use `aria-expanded` for collapsible content
- ✅ **SHOULD**: Use `aria-current` for navigation state

### 3. Keyboard Navigation (MANDATORY)

**RULE**: All interactive elements must be keyboard accessible.

```tsx
// ✅ GOOD: Full keyboard support
function Dialog({ isOpen, onClose, children }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  
  // Trap focus within dialog
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      
      if (e.key === 'Tab') {
        // Trap focus logic
        const focusableElements = dialogRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        // ... focus trap implementation
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  
  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      {children}
    </div>
  );
}

// ✅ GOOD: Custom interactive element with keyboard support
function CustomButton({ onClick, children }: CustomButtonProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };
  
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </div>
  );
}
```

**Keyboard Interactions**:
| Component | Keys | Behavior |
|-----------|------|----------|
| **Button** | Enter, Space | Activate |
| **Link** | Enter | Navigate |
| **Checkbox** | Space | Toggle |
| **Radio** | Arrow keys, Space | Navigate and select |
| **Select** | Arrow keys, Enter, Escape | Navigate, select, close |
| **Tab List** | Arrow keys | Navigate tabs |
| **Menu** | Arrow keys, Enter, Escape | Navigate, select, close |
| **Dialog** | Escape | Close |

**Must-Follow Patterns**:
- ✅ **MUST**: All interactive elements reachable via Tab
- ✅ **MUST**: Visible focus indicators (outline or ring)
- ✅ **MUST**: Enter and Space activate buttons
- ✅ **MUST**: Escape closes dialogs and dropdowns
- ✅ **MUST**: Arrow keys navigate lists and menus
- ✅ **MUST**: Trap focus in modals/dialogs
- ✅ **SHOULD**: Skip links for keyboard users
- ✅ **MAY**: Custom keyboard shortcuts (document them)

### 4. Focus Management (MANDATORY)

**RULE**: Manage focus for dynamic content and navigation.

```tsx
// ✅ GOOD: Focus management after navigation
function NavigationMenu() {
  const navigate = useNavigate();
  
  const handleNavigate = (path: string) => {
    navigate(path);
    // Focus main content after navigation
    const main = document.querySelector('main');
    if (main && main instanceof HTMLElement) {
      main.focus();
    }
  };
  
  return (
    <nav>
      {/* navigation items */}
    </nav>
  );
}

// ✅ GOOD: Focus after modal closes
function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  
  const close = () => {
    setIsOpen(false);
    // Return focus to trigger element
    triggerRef.current?.focus();
  };
  
  return { isOpen, open: () => setIsOpen(true), close, triggerRef };
}

// ✅ GOOD: Announce dynamic content to screen readers
function DynamicAlert({ message }: { message: string }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {message}
    </div>
  );
}
```

**Must-Follow Patterns**:
- ✅ **MUST**: Return focus to trigger after closing modals
- ✅ **MUST**: Focus first interactive element in modals
- ✅ **MUST**: Announce dynamic content with `aria-live`
- ✅ **MUST**: Restore focus after deleting items
- ✅ **SHOULD**: Focus error messages after form submission
- ✅ **SHOULD**: Scroll focused element into view

### 5. Color and Contrast (MANDATORY)

**RULE**: Ensure sufficient contrast and don't rely solely on color.

**WCAG 2.1 AA Contrast Requirements**:
- Normal text (< 18px): **4.5:1** contrast ratio
- Large text (≥ 18px or ≥ 14px bold): **3:1** contrast ratio
- UI components and graphics: **3:1** contrast ratio

```tsx
// ✅ GOOD: Sufficient contrast with pattern for colorblind users
<Badge
  className="bg-red-600 text-white border-2 border-red-800"
  aria-label="Critical risk level"
>
  <ExclamationIcon className="w-4 h-4 mr-1" aria-hidden="true" />
  Critical
</Badge>

// ✅ GOOD: Don't rely on color alone
<div>
  <span className="text-red-600 font-semibold">
    * Required field
  </span>
  {/* Icon + color + text = accessible */}
</div>

// ❌ BAD: Color as only indicator
<div className="text-red-500">Error</div>
// No icon, no text pattern, only color

// ✅ GOOD: Test with color filters
// Use browser dev tools to simulate:
// - Protanopia (red-blind)
// - Deuteranopia (green-blind)
// - Tritanopia (blue-blind)
// - Achromatopsia (completely colorblind)
```

**Must-Follow Patterns**:
- ✅ **MUST**: 4.5:1 contrast for text
- ✅ **MUST**: 3:1 contrast for UI components
- ✅ **MUST**: Don't use color as the only visual means
- ✅ **MUST**: Use patterns, icons, or text with color
- ✅ **SHOULD**: Test with color blindness simulators
- ✅ **MAY**: Provide high-contrast mode

### 6. Form Accessibility (MANDATORY)

**RULE**: Make forms fully accessible with proper labels and error handling.

```tsx
// ✅ GOOD: Accessible form
function SecurityLevelForm() {
  const [level, setLevel] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  return (
    <form onSubmit={handleSubmit} aria-labelledby="form-title">
      <h2 id="form-title">Set Security Level</h2>
      
      {/* Text input with label */}
      <div>
        <label htmlFor="level-input" className="block mb-2">
          Security Level *
        </label>
        <input
          id="level-input"
          type="text"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby={error ? 'level-error' : 'level-help'}
          className={error ? 'border-red-500' : 'border-gray-300'}
        />
        {!error && (
          <span id="level-help" className="text-sm text-gray-600">
            Choose from critical, high, moderate, low
          </span>
        )}
        {error && (
          <span id="level-error" role="alert" className="text-red-600">
            {error}
          </span>
        )}
      </div>
      
      {/* Radio group */}
      <fieldset>
        <legend>Impact Assessment</legend>
        <div role="radiogroup" aria-labelledby="impact-legend">
          <span id="impact-legend" className="sr-only">
            Select business impact
          </span>
          <label>
            <input
              type="radio"
              name="impact"
              value="high"
              aria-checked={impact === 'high'}
            />
            High Impact
          </label>
          <label>
            <input
              type="radio"
              name="impact"
              value="medium"
              aria-checked={impact === 'medium'}
            />
            Medium Impact
          </label>
        </div>
      </fieldset>
      
      {/* Submit button */}
      <button 
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

**Must-Follow Patterns**:
- ✅ **MUST**: Label all form inputs with `<label>` or `aria-label`
- ✅ **MUST**: Use `aria-required` for required fields
- ✅ **MUST**: Use `aria-invalid` and `aria-errormessage` for errors
- ✅ **MUST**: Announce errors with `role="alert"`
- ✅ **MUST**: Group related inputs with `<fieldset>` and `<legend>`
- ✅ **MUST**: Provide help text with `aria-describedby`
- ✅ **SHOULD**: Focus first error after validation

### 7. Images and Media (MANDATORY)

**RULE**: Provide text alternatives for non-text content.

```tsx
// ✅ GOOD: Informative image
<img
  src="/chart.png"
  alt="Bar chart showing 60% critical, 30% high, and 10% moderate risk levels"
  width={400}
  height={300}
/>

// ✅ GOOD: Decorative image (hidden from screen readers)
<img
  src="/decorative-bg.jpg"
  alt=""
  role="presentation"
/>

// ✅ GOOD: Icon with text
<button>
  <CheckIcon aria-hidden="true" className="w-5 h-5" />
  <span>Approve</span>
</button>

// ✅ GOOD: Icon-only button
<button aria-label="Close dialog">
  <CloseIcon aria-hidden="true" className="w-5 h-5" />
</button>

// ✅ GOOD: Video with captions
<video controls>
  <source src="/demo.mp4" type="video/mp4" />
  <track
    kind="captions"
    src="/captions.vtt"
    srclang="en"
    label="English"
    default
  />
</video>
```

**Must-Follow Patterns**:
- ✅ **MUST**: Alt text for informative images
- ✅ **MUST**: Empty alt (`alt=""`) for decorative images
- ✅ **MUST**: `aria-label` for icon-only buttons
- ✅ **MUST**: Captions for videos
- ✅ **MUST**: Transcripts for audio
- ✅ **SHOULD**: SVGs have `<title>` and `role="img"`

### 8. Dynamic Content (MANDATORY)

**RULE**: Announce updates to screen reader users.

```tsx
// ✅ GOOD: Polite announcements (non-critical updates)
<div role="status" aria-live="polite" aria-atomic="true">
  {itemCount} items loaded
</div>

// ✅ GOOD: Assertive announcements (critical updates)
<div role="alert" aria-live="assertive" aria-atomic="true">
  {errorMessage}
</div>

// ✅ GOOD: Loading state
{isLoading && (
  <div role="status" aria-live="polite">
    <span className="sr-only">Loading data...</span>
    <Spinner aria-hidden="true" />
  </div>
)}

// ✅ GOOD: Success message
{isSuccess && (
  <div
    role="status"
    aria-live="polite"
    className="bg-green-100 text-green-800 p-4 rounded"
  >
    <CheckIcon className="w-5 h-5 mr-2" aria-hidden="true" />
    Data saved successfully
  </div>
)}
```

**ARIA Live Region Types**:
- `aria-live="polite"`: Announce when convenient (status updates)
- `aria-live="assertive"`: Announce immediately (errors, warnings)
- `aria-live="off"`: Don't announce (default)

**Must-Follow Patterns**:
- ✅ **MUST**: Use `aria-live` for dynamic content
- ✅ **MUST**: Use `role="alert"` for errors and warnings
- ✅ **MUST**: Use `role="status"` for status updates
- ✅ **MUST**: Use `aria-atomic="true"` for complete announcements
- ✅ **SHOULD**: Keep announcements concise
- ✅ **SHOULD**: Debounce frequent updates

## Testing Accessibility

### Automated Testing

```typescript
// ✅ GOOD: jest-axe for automated a11y testing
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('SecurityWidget has no a11y violations', async () => {
  const { container } = render(<SecurityWidget />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

// ✅ GOOD: Test keyboard navigation
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('Dialog closes on Escape key', async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();
  
  render(<Dialog isOpen onClose={onClose} />);
  
  await user.keyboard('{Escape}');
  expect(onClose).toHaveBeenCalled();
});

// ✅ GOOD: Test screen reader announcements
test('Error message is announced', () => {
  render(<FormWithError />);
  
  const alert = screen.getByRole('alert');
  expect(alert).toHaveTextContent('Invalid input');
});
```

### Manual Testing

**Screen Reader Testing**:
- **Windows**: NVDA (free) or JAWS
- **macOS**: VoiceOver (built-in)
- **Linux**: Orca
- **Mobile**: TalkBack (Android), VoiceOver (iOS)

**Keyboard Testing**:
```
1. Tab through all interactive elements
2. Verify focus indicators are visible
3. Activate buttons with Enter and Space
4. Navigate menus with Arrow keys
5. Close modals with Escape
6. Verify no keyboard traps
```

**Tools**:
- **axe DevTools**: Browser extension for a11y testing
- **WAVE**: Web accessibility evaluation tool
- **Lighthouse**: Performance and accessibility audits
- **Color Contrast Analyzer**: Check WCAG contrast ratios

## Accessibility Checklist

Before merging code:

**Semantic HTML**:
- [ ] Used semantic elements (nav, main, article, button, etc.)
- [ ] Proper heading hierarchy (h1-h6)
- [ ] Labels for all form inputs

**ARIA**:
- [ ] ARIA attributes used only when necessary
- [ ] All ARIA roles have required attributes
- [ ] Interactive elements have accessible names
- [ ] Dynamic content uses `aria-live`

**Keyboard**:
- [ ] All interactive elements keyboard accessible
- [ ] Visible focus indicators
- [ ] Logical tab order
- [ ] Escape closes modals/dropdowns
- [ ] No keyboard traps

**Visual**:
- [ ] 4.5:1 contrast for text
- [ ] 3:1 contrast for UI components
- [ ] Color not sole indicator
- [ ] Focus indicators visible

**Forms**:
- [ ] All inputs have labels
- [ ] Error messages announced
- [ ] Required fields indicated
- [ ] Help text provided

**Media**:
- [ ] Images have alt text
- [ ] Videos have captions
- [ ] Icon-only buttons labeled

**Testing**:
- [ ] Passed automated axe tests
- [ ] Tested with keyboard only
- [ ] Tested with screen reader
- [ ] No Lighthouse a11y violations

## Common Anti-Patterns

### ❌ Anti-Pattern 1: Click handlers on divs
```tsx
// ❌ BAD
<div onClick={handleClick}>Click me</div>

// ✅ GOOD
<button onClick={handleClick}>Click me</button>
```

### ❌ Anti-Pattern 2: Missing labels
```tsx
// ❌ BAD
<input type="text" placeholder="Email" />

// ✅ GOOD
<label htmlFor="email">Email</label>
<input id="email" type="text" />
```

### ❌ Anti-Pattern 3: Removing focus outline
```css
/* ❌ BAD */
*:focus {
  outline: none;
}

/* ✅ GOOD */
*:focus-visible {
  outline: 2px solid #2196F3;
  outline-offset: 2px;
}
```

## Resources

**WCAG Guidelines**:
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [How to Meet WCAG](https://www.w3.org/WAI/WCAG21/quickref/)

**Testing Tools**:
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

**Learning**:
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## Remember

Accessibility is:
- **Essential**: Not optional, required for usability
- **Legal**: Required by ADA, Section 508, AODA, European Accessibility Act
- **Inclusive**: Benefits all users, not just those with disabilities
- **Quality**: Well-structured, semantic code is accessible code

**Build accessibility in from the start. It's harder to retrofit.**

---

**Related Skills**:
- [UI/UX Design System](./ui-ux-design-system.md) - Accessible UI patterns
- [Testing Excellence](./testing-excellence.md) - A11y testing strategies
- [Code Quality Excellence](./code-quality-excellence.md) - Semantic HTML patterns
