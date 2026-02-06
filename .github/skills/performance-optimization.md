# ⚡ Performance Optimization Skill

## Strategic Principle

**Performance is a feature, not an afterthought. Optimize for user experience through efficient code.**

This skill ensures the CIA Compliance Manager delivers responsive, efficient, and scalable performance through strategic optimization techniques aligned with React and TypeScript best practices.

## Core Rules

### 1. React Performance (CRITICAL)

**RULE**: Prevent unnecessary re-renders and optimize component lifecycle.

**Key Techniques**:
```typescript
// ✅ GOOD: Memoized component
import { memo, useMemo, useCallback } from 'react';

const ExpensiveWidget = memo(({ data, onUpdate }: WidgetProps) => {
  // Memoize expensive calculations
  const processedData = useMemo(() => {
    return data.map(item => complexCalculation(item));
  }, [data]);
  
  // Memoize callbacks
  const handleUpdate = useCallback((id: string) => {
    onUpdate(id);
  }, [onUpdate]);
  
  return <div>{/* render */}</div>;
});
```

**Must-Follow Patterns**:
- ✅ **MUST**: Use `React.memo()` for components that render the same output given the same props
- ✅ **MUST**: Use `useMemo()` for expensive calculations
- ✅ **MUST**: Use `useCallback()` for functions passed to child components
- ✅ **SHOULD**: Implement proper dependency arrays in hooks
- ✅ **SHOULD**: Use lazy loading for large components (`React.lazy()`)

### 2. Bundle Size Optimization

**RULE**: Keep bundle size minimal to ensure fast load times.

**Strategies**:
```typescript
// ✅ GOOD: Tree-shakeable imports
import { formatDate } from '@/utils/formatUtils';

// ❌ BAD: Import entire library
import * as utils from '@/utils';

// ✅ GOOD: Dynamic imports for code splitting
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// ✅ GOOD: Conditional imports
if (needsCharts) {
  const { ChartComponent } = await import('./ChartComponent');
}
```

**Must-Follow Patterns**:
- ✅ **MUST**: Use tree-shakeable imports (named imports)
- ✅ **MUST**: Lazy load non-critical components
- ✅ **SHOULD**: Code-split routes and large features
- ✅ **SHOULD**: Monitor bundle size in CI (budget.json)
- ✅ **MAY**: Use dynamic imports for conditional features

### 3. Data Structure Efficiency

**RULE**: Choose appropriate data structures for O(1) or O(log n) operations.

**Examples**:
```typescript
// ✅ GOOD: Use Map for O(1) lookups
const widgetMap = new Map(
  widgets.map(w => [w.id, w])
);
const widget = widgetMap.get(id); // O(1)

// ❌ BAD: Use array for repeated lookups
const widget = widgets.find(w => w.id === id); // O(n)

// ✅ GOOD: Use Set for O(1) membership checks
const allowedLevels = new Set(['critical', 'high', 'moderate']);
if (allowedLevels.has(level)) { }

// ❌ BAD: Use array for membership checks
const allowedLevels = ['critical', 'high', 'moderate'];
if (allowedLevels.includes(level)) { } // O(n)
```

**Must-Follow Patterns**:
- ✅ **MUST**: Use Map/Set for frequent lookups
- ✅ **MUST**: Avoid nested loops (O(n²)) where possible
- ✅ **SHOULD**: Cache computed results
- ✅ **SHOULD**: Use indices for array operations
- ✅ **MAY**: Profile code to identify bottlenecks

### 4. Virtualization for Large Lists

**RULE**: Virtualize long lists to render only visible items.

**Implementation**:
```typescript
// ✅ GOOD: Use virtualization for large lists
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }: { items: Item[] }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>{items[index].name}</div>
      )}
    </FixedSizeList>
  );
}

// ❌ BAD: Render all items at once
function AllItemsList({ items }: { items: Item[] }) {
  return (
    <div>
      {items.map(item => <div key={item.id}>{item.name}</div>)}
    </div>
  );
}
```

**Must-Follow Patterns**:
- ✅ **MUST**: Virtualize lists with > 100 items
- ✅ **SHOULD**: Use libraries like `react-window` or `react-virtual`
- ✅ **SHOULD**: Implement pagination for very large datasets
- ✅ **MAY**: Use infinite scroll with virtualization

### 5. Debounce and Throttle

**RULE**: Limit expensive operations triggered by user input.

**Examples**:
```typescript
import { useMemo, useCallback } from 'react';
import { debounce, throttle } from 'lodash-es';

// ✅ GOOD: Debounce search input
function SearchWidget() {
  const debouncedSearch = useMemo(
    () => debounce((query: string) => {
      // Expensive search operation
      performSearch(query);
    }, 300),
    []
  );
  
  return (
    <input 
      onChange={(e) => debouncedSearch(e.target.value)}
      placeholder="Search..."
    />
  );
}

// ✅ GOOD: Throttle scroll handler
function ScrollWidget() {
  const throttledScroll = useMemo(
    () => throttle(() => {
      // Expensive scroll calculation
      updateScrollPosition();
    }, 100),
    []
  );
  
  useEffect(() => {
    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [throttledScroll]);
}
```

**Must-Follow Patterns**:
- ✅ **MUST**: Debounce search/filter inputs (300ms)
- ✅ **MUST**: Throttle scroll/resize handlers (100ms)
- ✅ **SHOULD**: Cancel pending operations on unmount
- ✅ **MAY**: Adjust timing based on use case

### 6. Avoid Prop Drilling

**RULE**: Prevent performance issues from excessive prop passing.

**Solutions**:
```typescript
// ✅ GOOD: Use Context for deeply nested data
import { createContext, useContext } from 'react';

const ThemeContext = createContext<Theme | null>(null);

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error('useTheme must be used within ThemeProvider');
  return theme;
}

// Component tree doesn't need to pass theme through props
function DeepComponent() {
  const theme = useTheme(); // Direct access
  return <div style={{ color: theme.textColor }} />;
}

// ✅ GOOD: Use composition
function Layout({ children }: { children: React.ReactNode }) {
  return <div className="layout">{children}</div>;
}

// Usage: No need to pass props through Layout
<Layout>
  <ComplexComponent data={data} />
</Layout>
```

**Must-Follow Patterns**:
- ✅ **SHOULD**: Use Context API for global state (theme, auth, settings)
- ✅ **SHOULD**: Use composition over prop drilling
- ✅ **MAY**: Use state management libraries (Zustand, Redux) for complex state

## Performance Budgets

### Bundle Size
- **Main bundle**: < 300 KB (gzipped)
- **Vendor bundle**: < 500 KB (gzipped)
- **Per-route chunk**: < 100 KB (gzipped)
- **Total initial load**: < 1 MB (gzipped)

### Runtime Performance
- **Time to Interactive (TTI)**: < 3.5s on 4G
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Total Blocking Time (TBT)**: < 300ms
- **Cumulative Layout Shift (CLS)**: < 0.1

### React-Specific
- **Component render time**: < 16ms (60fps)
- **Re-renders per interaction**: < 3
- **Virtual DOM operations**: < 1000 nodes per update

## Testing Performance

### Benchmarking
```typescript
// ✅ GOOD: Profile component performance
import { Profiler } from 'react';

function onRenderCallback(
  id: string,
  phase: 'mount' | 'update',
  actualDuration: number
) {
  if (actualDuration > 16) {
    console.warn(`Slow render: ${id} took ${actualDuration}ms`);
  }
}

<Profiler id="ExpensiveWidget" onRender={onRenderCallback}>
  <ExpensiveWidget />
</Profiler>
```

### Monitoring
```typescript
// ✅ GOOD: Monitor bundle size in tests
test('bundle size is within budget', () => {
  const stats = require('../dist/stats.json');
  const mainBundleSize = stats.assets
    .find(a => a.name === 'main.js').size;
  
  expect(mainBundleSize).toBeLessThan(300 * 1024); // 300 KB
});
```

**Must-Follow Patterns**:
- ✅ **MUST**: Run bundle size checks in CI
- ✅ **SHOULD**: Profile components with React DevTools
- ✅ **SHOULD**: Use Lighthouse for performance audits
- ✅ **MAY**: Use performance monitoring tools (Sentry, DataDog)

## Common Anti-Patterns

### ❌ Anti-Pattern 1: Inline Object/Array Creation
```typescript
// ❌ BAD: Creates new object on every render
<Component style={{ padding: 10 }} />

// ✅ GOOD: Define outside component or use useMemo
const style = { padding: 10 };
<Component style={style} />
```

### ❌ Anti-Pattern 2: Unnecessary State Updates
```typescript
// ❌ BAD: Updates state unnecessarily
useEffect(() => {
  setData(data); // Runs on every render
}, [data]);

// ✅ GOOD: Only update when necessary
useEffect(() => {
  if (data !== prevData) {
    setData(data);
  }
}, [data, prevData]);
```

### ❌ Anti-Pattern 3: Large useEffect Dependencies
```typescript
// ❌ BAD: Entire object in dependency array
useEffect(() => {
  fetchData(config);
}, [config]); // Re-runs when any config property changes

// ✅ GOOD: Specific properties
useEffect(() => {
  fetchData(config);
}, [config.apiUrl, config.timeout]);
```

## Performance Optimization Checklist

Before merging code, verify:

**React Performance**:
- [ ] Used `React.memo()` for expensive components
- [ ] Applied `useMemo()` for expensive calculations
- [ ] Applied `useCallback()` for functions passed to children
- [ ] Implemented lazy loading for large components
- [ ] Avoided inline object/array creation in JSX

**Bundle Size**:
- [ ] Used tree-shakeable imports
- [ ] Applied code splitting for routes
- [ ] Used dynamic imports for conditional features
- [ ] Bundle size is within budget (check `npm run build`)

**Data Structures**:
- [ ] Used Map/Set for frequent lookups
- [ ] Avoided O(n²) nested loops
- [ ] Cached expensive computations

**List Rendering**:
- [ ] Virtualized lists with > 100 items
- [ ] Implemented pagination or infinite scroll

**User Input**:
- [ ] Debounced search/filter inputs
- [ ] Throttled scroll/resize handlers

## Tools and Metrics

### Development Tools
- **React DevTools Profiler**: Identify slow components
- **Chrome DevTools Performance**: Analyze runtime performance
- **Webpack Bundle Analyzer**: Visualize bundle composition
- **Lighthouse**: Performance audits

### Build Tools
```json
// budget.json - Bundle size budgets
{
  "maximumFileSizeToCacheInBytes": 500000,
  "maximumSizeOfResources": 1000000,
  "maximumSizeOfAllExternalScripts": 500000
}
```

### Monitoring
```bash
# Analyze bundle size
npm run build
npm run analyze

# Run Lighthouse
npx lighthouse http://localhost:5173 --view

# Profile React app
# Use React DevTools Profiler tab while interacting with app
```

## Best Practices Summary

### React-Specific
1. **Memoize Everything Expensive**: Use `memo`, `useMemo`, `useCallback`
2. **Lazy Load Wisely**: Split code at route boundaries
3. **Optimize Renders**: Prevent unnecessary re-renders
4. **Profile Regularly**: Use React DevTools Profiler

### General Performance
1. **Measure First**: Don't optimize prematurely
2. **Set Budgets**: Define and enforce performance budgets
3. **Monitor Continuously**: Track performance metrics in production
4. **Optimize Iteratively**: Focus on biggest bottlenecks first

### TypeScript Performance
1. **Use Explicit Types**: Helps TS compiler optimize
2. **Avoid Type Inference Overhead**: Explicit types are faster to check
3. **Use Type Predicates**: For efficient type narrowing
4. **Leverage Utility Types**: Built-in types are optimized

## Remember

Performance optimization is about:
- **User Experience**: Fast, responsive UI
- **Efficiency**: Minimal resource usage
- **Scalability**: Maintains performance as data grows
- **Monitoring**: Continuous performance tracking

**Always measure before optimizing. Focus on user-perceived performance first.**

---

**Related Skills**:
- [Code Quality Excellence](./code-quality-excellence.md) - Efficient code patterns
- [Testing Excellence](./testing-excellence.md) - Performance testing strategies

**External Resources**:
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Web.dev Performance](https://web.dev/performance/)
- [Lighthouse Scoring](https://developer.chrome.com/docs/lighthouse/)
