# GitHub Issues for v0.9 Release

**Status:** ⚠️ Unable to create issues automatically due to missing GitHub authentication token.

**✅ SOLUTION:** Use the provided shell script `create-issues.sh` to create all 5 issues automatically.

## Quick Start - Create Issues Now

### Option 1: Using GitHub CLI (Recommended)
```bash
# Authenticate with GitHub CLI
gh auth login

# Run the script to create all 5 issues
./create-issues.sh
```

### Option 2: Manual Creation
Copy each issue title and body below and create via GitHub UI at:
https://github.com/Hack23/cia-compliance-manager/issues/new

### Option 3: Re-run Workflow with Authentication
Add `COPILOT_MCP_GITHUB_PERSONAL_ACCESS_TOKEN` to repository secrets and re-run this workflow.

---

## Issue 1: Increase Test Coverage from 75% to 80%+

**Title:** ✅ Increase test coverage from 75% to 80%+ for v0.9 release

**Labels:** `type:test`, `priority:high`, `size:medium`

**Body:**

## 🎯 Objective

Increase overall test coverage from 75.06% to 80%+ by adding tests for critical business logic and low-coverage components to ensure code quality and stability for the v0.9 release.

## 📋 Background

Current test coverage analysis shows:
- **Overall coverage:** 75.06% (lines), 64.9% (branches), 80% (functions), 75.78% (statements)
- **97 test files** currently exist
- **Low coverage areas identified:**
  - `src/application/CIAClassificationApp.tsx`: 61.36%
  - `src/utils/levelValuesUtils.ts`: 41.02%
  - `src/utils/securityLevelUtils.ts`: 59.22%
  - `src/utils/riskUtils.ts`: 51.07%
  - `src/services/technicalImplementationService.ts`: 51.42%
  - `src/data/businessImpactData.ts`: 34.48%

The ISMS Implementation Guide and SECURITY.md both specify 80%+ test coverage as a security requirement.

## ✅ Acceptance Criteria

- [ ] Overall test coverage reaches ≥80% for lines, branches, and statements
- [ ] All business-critical utilities have ≥80% coverage
- [ ] All service classes have ≥80% coverage  
- [ ] Test coverage report shows no critical gaps in security-related functions
- [ ] All new tests pass in CI/CD pipeline
- [ ] Coverage reports generated and committed to docs/coverage/

## 🛠️ Implementation Guidance

### Files to Modify/Create

**Priority 1 - Critical Business Logic:**
- `src/utils/levelValuesUtils.ts` (41% → 80%+)
  - Add tests for `getLevelValues()` function
  - Test edge cases for level validation
  - Test error handling for invalid inputs
  
- `src/utils/securityLevelUtils.ts` (59% → 80%+)
  - Add tests for security level calculations
  - Test boundary conditions
  - Test all security level mappings

- `src/utils/riskUtils.ts` (51% → 80%+)
  - Add tests for risk calculation formulas
  - Test risk aggregation logic
  - Test risk scoring edge cases

**Priority 2 - Services:**
- `src/services/technicalImplementationService.ts` (51% → 80%+)
  - Add tests for all public methods
  - Mock dependencies properly
  - Test error scenarios

- `src/data/businessImpactData.ts` (35% → 80%+)
  - Test data validation
  - Test data transformation functions
  - Test constants and mappings

**Priority 3 - Components:**
- `src/application/CIAClassificationApp.tsx` (61% → 80%+)
  - Add integration tests for main app flow
  - Test state management
  - Test user interaction scenarios

### Approach

1. Run coverage report to identify specific uncovered lines:
   ```bash
   npm run coverage
   # Review docs/coverage/lcov-report/index.html
   ```

2. For each low-coverage file, add test file if missing:
   ```bash
   # Create test file next to source file
   touch src/utils/levelValuesUtils.test.ts
   ```

3. Focus on untested code paths shown in coverage report:
   - Red lines = not covered
   - Yellow lines = partially covered branches
   - Green lines = fully covered

4. Use existing test patterns from high-coverage files:
   - `src/utils/formatUtils.ts` (100% coverage) - good utility test example
   - `src/constants/securityLevels.ts` (100% coverage) - good constants test example

5. Run tests incrementally:
   ```bash
   npm run test:watch  # Watch mode for rapid feedback
   npm run coverage    # Check overall progress
   ```

### Example Test Structure

```typescript
import { describe, it, expect } from 'vitest';
import { getLevelValues } from './levelValuesUtils';

describe('levelValuesUtils', () => {
  describe('getLevelValues', () => {
    it('should return correct values for valid level', () => {
      const result = getLevelValues(3);
      expect(result).toBeDefined();
      expect(result.level).toBe(3);
    });

    it('should handle edge case: minimum level', () => {
      const result = getLevelValues(1);
      expect(result.level).toBe(1);
    });

    it('should handle edge case: maximum level', () => {
      const result = getLevelValues(5);
      expect(result.level).toBe(5);
    });

    it('should handle invalid level gracefully', () => {
      const result = getLevelValues(0);
      expect(result).toBeDefined(); // or throw error, depending on implementation
    });
  });
});
```

## 🔗 Related Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library React](https://testing-library.com/docs/react-testing-library/intro/)
- Current coverage report: `docs/coverage/lcov-report/index.html`
- Test plan: `docs/UnitTestPlan.md`
- SECURITY.md specifies 80%+ coverage requirement

## 📊 Metadata

**Priority:** High (required for v0.9 release)  
**Effort:** Medium (4-6 hours)  

---

## Issue 2: Address ZAP Security Findings from Issue #120

**Title:** 🔒 Address 10 security findings from ZAP Full Scan Report

**Labels:** `type:security`, `priority:critical`, `size:medium`

**Body:**

## 🎯 Objective

Address critical and high-priority security findings from the ZAP (OWASP ZAP) Full Scan Report documented in issue #120 to improve the security posture before the v0.9 release.

## 📋 Background

ZAP Full Scan identified multiple security issues on the deployed application at https://hack23.github.io/cia-compliance-manager/:

**High-Priority Findings:**
1. **CORS Misconfiguration** [40040] - 2 instances
2. **Content Security Policy (CSP) Header Not Set** [10038] - 1 instance  
3. **Cross-Domain Misconfiguration** [10098] - 1 instance
4. **Missing Anti-clickjacking Header** [10020] - 1 instance
5. **Strict-Transport-Security Header Not Set** [10035] - 4 instances
6. **X-Content-Type-Options Header Missing** [10021] - 1 instance

**Medium-Priority Findings:**
7. **CSP: Failure to Define Directive with No Fallback** [10055] - 6 instances
8. **CSP: style-src unsafe-inline** [10055] - 3 instances
9. **Insufficient Site Isolation Against Spectre Vulnerability** [90004] - 2 instances
10. **Relative Path Confusion** [10051] - 2 instances

These findings indicate missing security headers and CSP misconfigurations that could expose the application to various attacks.

## ✅ Acceptance Criteria

- [ ] All high-priority security headers implemented
- [ ] Content Security Policy (CSP) configured properly
- [ ] CORS policy reviewed and restricted appropriately
- [ ] Anti-clickjacking headers (X-Frame-Options or CSP frame-ancestors) added
- [ ] HSTS (Strict-Transport-Security) header configured
- [ ] X-Content-Type-Options: nosniff header added
- [ ] ZAP scan passes with no high-priority findings
- [ ] Security headers verified in production deployment
- [ ] Documentation updated with security header configuration

## 🛠️ Implementation Guidance

### Files to Modify

Since this is a static GitHub Pages deployment, security headers need to be configured differently:

**Option 1: Meta Tags (Immediate):**
- `index.html` - Add security-related meta tags

**Option 2: GitHub Pages Configuration:**
- `.github/workflows/release.yml` - Update deployment configuration
- Add security headers via GitHub Pages configuration

**Option 3: Custom _headers file (if supported):**
- Create `public/_headers` for Netlify-style header configuration

### Approach

1. **Add CSP Meta Tag to index.html:**
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:; 
               font-src 'self' data:; 
               connect-src 'self';">
```

2. **Add Security Headers Meta Tags:**
```html
<!-- Anti-clickjacking -->
<meta http-equiv="X-Frame-Options" content="DENY">

<!-- Content Type Sniffing Protection -->
<meta http-equiv="X-Content-Type-Options" content="nosniff">

<!-- XSS Protection (Legacy but still useful) -->
<meta http-equiv="X-XSS-Protection" content="1; mode=block">

<!-- Referrer Policy -->
<meta name="referrer" content="strict-origin-when-cross-origin">
```

3. **Configure CORS (if API calls are made):**
   - Review `src/services/` for any external API calls
   - Ensure CORS is properly configured on API endpoints
   - For static site, CORS may not apply

4. **Update Vite Configuration for Production:**
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // Add integrity hashes
        entryFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]',
      }
    }
  },
  server: {
    headers: {
      'Content-Security-Policy': "default-src 'self'; ...",
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    }
  }
})
```

5. **Test Security Headers:**
```bash
# After deployment, verify headers
curl -I https://hack23.github.io/cia-compliance-manager/

# Use security header checker
# https://securityheaders.com/?q=https://hack23.github.io/cia-compliance-manager/
```

6. **Re-run ZAP Scan:**
```bash
# Trigger ZAP scan workflow after fixes
# .github/workflows/zap-scan.yml
```

### Security Best Practices

- **CSP:** Start restrictive, relax only as needed
- **HSTS:** GitHub Pages serves via HTTPS by default, but header strengthens security
- **X-Frame-Options:** Use DENY unless legitimate framing is required
- **X-Content-Type-Options:** Always set to 'nosniff'
- **Referrer Policy:** Balance privacy with functionality needs

## 🔗 Related Resources

- [Original ZAP Scan Report - Issue #120](https://github.com/Hack23/cia-compliance-manager/issues/120)
- [OWASP ZAP Documentation](https://www.zaproxy.org/docs/)
- [Content Security Policy (CSP) Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Security Headers Best Practices](https://owasp.org/www-project-secure-headers/)
- [GitHub Pages Security](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- SECURITY.md and ISMS_IMPLEMENTATION_GUIDE.md

## 📊 Metadata

**Priority:** Critical (security issue)  
**Effort:** Medium (4-6 hours)  
**Related:** #120

---

## Issue 3: Optimize Bundle Size to Meet Budget Targets

**Title:** ⚡ Optimize bundle size from 4.0MB to <500KB total budget

**Labels:** `type:performance`, `priority:high`, `size:medium`

**Body:**

## 🎯 Objective

Reduce total bundle size from 4.0MB to under 500KB (as specified in budget.json) by optimizing assets, code splitting, and implementing lazy loading strategies.

## 📋 Background

Current build analysis shows:
- **Total build size:** 4.0MB (budget: 500KB)
- **Main JavaScript bundles:**
  - `index-CQ_HMnRj.js`: 264KB (budget: 180KB for scripts)
  - `vendor-BRU2jZet.js`: 206KB
  - `react-DpI18Uv0.js`: 185KB
- **CSS:** `index-gduEf1gb.css`: 69.80KB (budget: 50KB for stylesheets)
- **Total JS:** ~659KB (exceeds 180KB budget by 3.6x)

**Budget Targets (from budget.json):**
- Script: 180KB
- Stylesheet: 50KB
- Image: 200KB
- Total: 500KB

**Performance Impact:**
- Longer initial load times
- Slower time-to-interactive
- Poor experience on slow networks
- Higher CDN/hosting costs

## ✅ Acceptance Criteria

- [ ] Total bundle size ≤ 500KB (measured with gzip)
- [ ] Main script bundle ≤ 180KB
- [ ] CSS bundle ≤ 50KB
- [ ] Lazy loading implemented for non-critical components
- [ ] Code splitting configured for route-based chunks
- [ ] Bundle analysis report generated and documented
- [ ] Lighthouse performance score ≥ 90
- [ ] All core functionality preserved
- [ ] Build passes with no budget violations

## 🛠️ Implementation Guidance

### Files to Modify

**Priority 1 - Code Splitting:**
- `vite.config.ts` - Configure manual chunks
- `src/App.tsx` - Implement React.lazy() for routes
- `src/components/widgets/*/` - Lazy load widget components

**Priority 2 - CSS Optimization:**
- `tailwind.config.js` - Enable PurgeCSS and content optimization
- `src/index.css` - Remove unused styles
- `src/App.css` - Minimize global styles

**Priority 3 - Dependency Optimization:**
- `package.json` - Review and potentially replace heavy dependencies
- Consider chart.js alternatives (Chart.js is 242KB)

### Approach

1. **Analyze Current Bundle:**
```bash
# Build with analysis
npm run build -- --mode=production

# Use rollup-plugin-visualizer
npx vite-bundle-visualizer
```

2. **Implement Code Splitting in vite.config.ts:**
```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'charts': ['chart.js'],
          'widgets-assessment': [
            './src/components/widgets/assessmentcenter/SecurityLevelWidget',
            './src/components/widgets/assessmentcenter/SecuritySummaryWidget',
          ],
          'widgets-business': [
            './src/components/widgets/businessvalue/ComplianceStatusWidget',
            './src/components/widgets/businessvalue/CostEstimationWidget',
          ],
          // More logical chunks...
        }
      }
    },
    chunkSizeWarningLimit: 500, // Match budget
  }
})
```

3. **Lazy Load Widget Components:**
```typescript
// src/App.tsx
import { lazy, Suspense } from 'react';

const SecurityLevelWidget = lazy(() => 
  import('./components/widgets/assessmentcenter/SecurityLevelWidget')
);
const ComplianceStatusWidget = lazy(() => 
  import('./components/widgets/businessvalue/ComplianceStatusWidget')
);

// Use with Suspense
<Suspense fallback={<div>Loading...</div>}>
  <SecurityLevelWidget {...props} />
</Suspense>
```

4. **Optimize Tailwind CSS:**
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    // Remove unused theme values
  },
  corePlugins: {
    // Disable unused plugins
    preflight: true,
  }
}
```

5. **Consider Chart.js Alternatives:**
   - If chart.js is 242KB, consider:
     - Recharts (lighter weight)
     - Victory (smaller bundle)
     - Custom SVG charts for simple visualizations
   - Or use tree-shaking to import only needed chart types

6. **Optimize Images:**
```bash
# Convert images to WebP
npx @squoosh/cli --webp auto public/**/*.png

# Optimize SVGs
npx svgo -f public/
```

7. **Enable Compression:**
```typescript
// vite.config.ts
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ]
})
```

8. **Verify Bundle Size:**
```bash
# Build and check sizes
npm run build
du -sh build/
ls -lh build/assets/*.js

# Compare against budget
npx bundlesize
```

### Optimization Checklist

**Code Splitting:**
- [ ] Route-based code splitting implemented
- [ ] Widget components lazy loaded
- [ ] Third-party libraries split into separate chunks
- [ ] Common code extracted to shared chunk

**CSS Optimization:**
- [ ] Tailwind PurgeCSS enabled and configured
- [ ] Unused CSS removed
- [ ] Critical CSS inlined
- [ ] Non-critical CSS lazy loaded

**Dependency Optimization:**
- [ ] chart.js usage optimized (tree-shaking enabled)
- [ ] Check for duplicate dependencies
- [ ] Consider lighter alternatives for heavy dependencies
- [ ] Use ES modules instead of CommonJS where possible

**Asset Optimization:**
- [ ] Images compressed and converted to WebP
- [ ] SVGs optimized
- [ ] Fonts subset and optimized
- [ ] Unnecessary assets removed

## 🔗 Related Resources

- [Vite Code Splitting](https://vitejs.dev/guide/build.html#chunking-strategy)
- [React Code Splitting](https://react.dev/reference/react/lazy)
- [Web.dev Bundle Size Optimization](https://web.dev/reduce-javascript-payloads-with-code-splitting/)
- [Lighthouse Performance Audits](https://developer.chrome.com/docs/lighthouse/performance/)
- budget.json configuration
- Budget thresholds: lighthouse-performance.yml

## 📊 Metadata

**Priority:** High (performance critical)  
**Effort:** Medium (6-8 hours)  
**Related:** budget.json, lighthouse-performance.yml

---

## Issue 4: Reduce TypeScript `any` Usage

**Title:** 🔧 Reduce TypeScript `any` usage from 251 occurrences to <50

**Labels:** `type:refactor`, `priority:medium`, `size:medium`

**Body:**

## 🎯 Objective

Improve type safety by reducing TypeScript `any` usage from 251 occurrences to fewer than 50, replacing with proper types, generics, or `unknown` where appropriate.

## 📋 Background

Current codebase analysis shows:
- **251 occurrences of `any` type** across the codebase
- TypeScript strict mode is enabled (`tsconfig.json`)
- Repository guidelines mandate strict typing and avoiding `any`

**Why This Matters:**
- `any` bypasses type checking, defeating TypeScript's purpose
- Increases risk of runtime errors
- Reduces code maintainability and IDE support
- Makes refactoring more dangerous
- Violates repository coding guidelines

**From .github/copilot-instructions.md:**
> "Use explicit types and interfaces; avoid `any` (use `unknown` if needed)"
> "Enable TypeScript's strict options in tsconfig.json"

## ✅ Acceptance Criteria

- [ ] Reduce `any` occurrences to <50 (80% reduction)
- [ ] All service methods have explicit return types
- [ ] All function parameters have explicit types
- [ ] Use `unknown` for genuinely unknown types
- [ ] Create proper type definitions for complex objects
- [ ] No new `any` types introduced
- [ ] All tests still pass
- [ ] TypeScript strict mode remains enabled
- [ ] Documentation updated with new type definitions

## 🛠️ Implementation Guidance

### Strategy

**Phase 1: Audit and Categorize (1 hour)**
Find all `any` usage and categorize by type:
```bash
# Find all any usage
grep -rn "any" src --include="*.ts" --include="*.tsx" | grep -v "node_modules" > any-audit.txt

# Categorize by pattern:
# 1. Function parameters: (param: any)
# 2. Return types: ): any
# 3. Type assertions: as any
# 4. Array types: any[]
# 5. Generic placeholders: <any>
```

**Phase 2: Replace by Category (4-5 hours)**

### Files to Modify (Priority Order)

**High Priority - Services (expect 80+ occurrences):**
- `src/services/*.ts` - Service method parameters and returns
- `src/hooks/*.ts` - Hook types

**Medium Priority - Utils (expect 60+ occurrences):**
- `src/utils/*.ts` - Utility function types
- `src/types/*.ts` - Type definitions

**Low Priority - Components (expect 50+ occurrences):**
- `src/components/**/*.tsx` - Component props and state

### Replacement Patterns

**Pattern 1: Function Parameters**
```typescript
// ❌ Before
function processData(data: any) {
  return data.value;
}

// ✅ After - Define proper interface
interface DataInput {
  value: string;
  timestamp?: number;
}

function processData(data: DataInput) {
  return data.value;
}
```

**Pattern 2: Unknown Types**
```typescript
// ❌ Before
function handleError(error: any) {
  console.error(error.message);
}

// ✅ After - Use unknown and type guard
function handleError(error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error('Unknown error:', error);
  }
}
```

**Pattern 3: Generic Placeholders**
```typescript
// ❌ Before
function fetchData(url: string): Promise<any> {
  return fetch(url).then(res => res.json());
}

// ✅ After - Use generic
function fetchData<T>(url: string): Promise<T> {
  return fetch(url).then(res => res.json() as T);
}

// Or with specific return type
interface UserData {
  id: string;
  name: string;
}

function fetchUserData(url: string): Promise<UserData> {
  return fetch(url).then(res => res.json());
}
```

**Pattern 4: Array Types**
```typescript
// ❌ Before
const items: any[] = getItems();

// ✅ After - Specific type or union
interface Item {
  id: string;
  name: string;
}
const items: Item[] = getItems();

// Or if truly mixed:
const items: Array<string | number | Item> = getItems();
```

**Pattern 5: Object Types**
```typescript
// ❌ Before
const config: any = loadConfig();

// ✅ After - Define interface
interface AppConfig {
  apiUrl: string;
  timeout: number;
  features: {
    [key: string]: boolean;
  };
}
const config: AppConfig = loadConfig();
```

**Pattern 6: Type Assertions**
```typescript
// ❌ Before
const element = document.querySelector('.my-class') as any;

// ✅ After - Proper assertion
const element = document.querySelector('.my-class') as HTMLElement | null;

// Or with type guard
const element = document.querySelector('.my-class');
if (element instanceof HTMLElement) {
  // TypeScript knows element is HTMLElement here
}
```

### Approach

1. **Start with Type Definitions:**
```bash
# Create new type files as needed
touch src/types/api-responses.ts
touch src/types/utility-types.ts
```

2. **Use Utility Types:**
```typescript
// Leverage TypeScript utility types
type Partial<T>     // Make all properties optional
type Pick<T, K>     // Pick specific properties
type Omit<T, K>     // Omit specific properties
type Record<K, T>   // Object with keys of type K
type ReturnType<T>  // Get function return type
```

3. **Enable Incremental Validation:**
```typescript
// tsconfig.json - ensure these are enabled
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
  }
}
```

4. **Fix in Order of Impact:**
   - Services first (highest usage)
   - Utils second (often used by services)
   - Components last (use service types)

5. **Verify No Regressions:**
```bash
# After each batch of changes
npm run lint
npm run build
npm run test
```

### Example Refactoring Session

```typescript
// File: src/services/businessImpactService.ts

// ❌ Before (multiple any types)
export class BusinessImpactService {
  calculateImpact(data: any): any {
    const result: any = {};
    result.score = this.computeScore(data);
    return result;
  }
  
  private computeScore(data: any): number {
    return data.values.reduce((sum: any, val: any) => sum + val, 0);
  }
}

// ✅ After (properly typed)
interface BusinessImpactData {
  values: number[];
  category: string;
  priority: number;
}

interface ImpactResult {
  score: number;
  category: string;
  priority: number;
}

export class BusinessImpactService {
  calculateImpact(data: BusinessImpactData): ImpactResult {
    const score = this.computeScore(data.values);
    return {
      score,
      category: data.category,
      priority: data.priority,
    };
  }
  
  private computeScore(values: number[]): number {
    return values.reduce((sum, val) => sum + val, 0);
  }
}
```

## 🔗 Related Resources

- [TypeScript Handbook - Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [TypeScript Handbook - Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [When to use unknown vs any](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type)
- Repository: `.github/copilot-instructions.md` - TypeScript guidelines
- tsconfig.json - Current strict mode configuration

## 📊 Metadata

**Priority:** Medium (code quality)  
**Effort:** Medium (5-7 hours)  
**Technical Debt:** Reduces maintainability risk

---

## Issue 5: Complete E2E Test Coverage for All 25 Widgets

**Title:** 🧪 Complete E2E test coverage for all 25 widget components

**Labels:** `type:test`, `priority:medium`, `size:medium`

**Body:**

## 🎯 Objective

Achieve complete end-to-end test coverage for all 25 widget components to ensure UI functionality, user interactions, and integration work correctly in real browser environments.

## 📋 Background

Current E2E testing status:
- **15 Cypress E2E test specs** exist
- **25 widget components** in the codebase
- **Widget categories:**
  - Assessment Center: 3 widgets
  - Business Value: 3 widgets
  - Impact Analysis: 3 widgets
  - Implementation Guide: 3 widgets
  - Additional: ~13 widgets

**Gap Analysis:**
- Potentially 10+ widgets without E2E coverage
- Need to verify all widget user interactions
- Need to test widget data display accuracy
- Need to test widget integration with CIA classification system

**Why E2E Tests Matter:**
- Catch integration issues that unit tests miss
- Verify actual user workflows
- Test real browser rendering and interactions
- Ensure cross-browser compatibility
- Validate accessibility features

## ✅ Acceptance Criteria

- [ ] All 25 widget components have at least 1 E2E test
- [ ] Each widget E2E test covers:
  - [ ] Component renders without errors
  - [ ] Data displays correctly
  - [ ] User interactions work (clicks, hovers, inputs)
  - [ ] Navigation/routing (if applicable)
  - [ ] Accessibility (keyboard navigation, ARIA)
- [ ] All E2E tests pass in CI/CD
- [ ] Test coverage report shows ≥80% E2E coverage
- [ ] Flaky tests identified and fixed
- [ ] E2E test documentation updated

## 🛠️ Implementation Guidance

### Files to Create/Modify

**New E2E Test Files to Create (approximately 10):**

```bash
# Assessment Center (verify coverage)
cypress/e2e/widgets/assessment/security-level.cy.ts
cypress/e2e/widgets/assessment/security-summary.cy.ts
cypress/e2e/widgets/assessment/business-impact-analysis.cy.ts

# Business Value (verify coverage)
cypress/e2e/widgets/business/compliance-status.cy.ts
cypress/e2e/widgets/business/cost-estimation.cy.ts
cypress/e2e/widgets/business/value-creation.cy.ts

# Impact Analysis (verify coverage)
cypress/e2e/widgets/impact/confidentiality-impact.cy.ts
cypress/e2e/widgets/impact/integrity-impact.cy.ts
cypress/e2e/widgets/impact/availability-impact.cy.ts

# Implementation Guide (verify coverage)
cypress/e2e/widgets/implementation/technical-details.cy.ts
cypress/e2e/widgets/implementation/security-resources.cy.ts
cypress/e2e/widgets/implementation/security-visualization.cy.ts

# Additional widgets (identify and create tests)
# Run: find src/components/widgets -name "*.tsx" | wc -l
```

### Approach

**Step 1: Audit Widget Coverage (1 hour)**
```bash
# List all widget components
find src/components/widgets -name "*.tsx" -type f | sort

# List existing E2E tests
find cypress/e2e -name "*.cy.ts" | sort

# Compare to identify gaps
```

**Step 2: Create E2E Test Template**

```typescript
// Template: cypress/e2e/widgets/[category]/[widget-name].cy.ts
describe('[Widget Name] Widget', () => {
  beforeEach(() => {
    // Navigate to page containing the widget
    cy.visit('http://localhost:5173/');
    
    // Wait for app to initialize
    cy.get('[data-testid="cia-classification-app"]').should('be.visible');
  });

  describe('Rendering', () => {
    it('should render widget without errors', () => {
      cy.get('[data-testid="widget-name"]').should('exist');
      cy.get('[data-testid="widget-name"]').should('be.visible');
    });

    it('should display widget title', () => {
      cy.get('[data-testid="widget-name"]')
        .find('[data-testid="widget-title"]')
        .should('contain', 'Expected Title');
    });

    it('should display widget content', () => {
      cy.get('[data-testid="widget-name"]')
        .find('[data-testid="widget-content"]')
        .should('be.visible');
    });
  });

  describe('Data Display', () => {
    it('should display correct initial data', () => {
      cy.get('[data-testid="widget-name"]')
        .find('[data-testid="data-value"]')
        .should('contain', 'Expected Value');
    });

    it('should update when CIA options change', () => {
      // Change a CIA option
      cy.get('[data-testid="confidentiality-select"]').select('3');
      
      // Verify widget updates
      cy.get('[data-testid="widget-name"]')
        .find('[data-testid="data-value"]')
        .should('not.contain', 'Previous Value');
    });
  });

  describe('User Interactions', () => {
    it('should handle button clicks', () => {
      cy.get('[data-testid="widget-name"]')
        .find('[data-testid="action-button"]')
        .click();
      
      // Verify result
      cy.get('[data-testid="result"]').should('be.visible');
    });

    it('should support keyboard navigation', () => {
      cy.get('[data-testid="widget-name"]')
        .find('[data-testid="interactive-element"]')
        .focus()
        .should('have.focus')
        .type('{enter}');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      cy.get('[data-testid="widget-name"]')
        .should('have.attr', 'role');
      
      cy.get('[data-testid="widget-name"]')
        .should('have.attr', 'aria-label');
    });

    it('should be keyboard accessible', () => {
      // Tab through interactive elements
      cy.get('body').tab();
      cy.focused().should('have.attr', 'data-testid');
    });
  });

  describe('Error Handling', () => {
    it('should display error state gracefully', () => {
      // Trigger error condition
      // Verify error message displays
      cy.get('[data-testid="error-message"]').should('be.visible');
    });
  });

  describe('Performance', () => {
    it('should render within acceptable time', () => {
      const startTime = Date.now();
      cy.get('[data-testid="widget-name"]').should('be.visible');
      cy.then(() => {
        const renderTime = Date.now() - startTime;
        expect(renderTime).to.be.lessThan(1000); // 1 second
      });
    });
  });
});
```

**Step 3: Add data-testid Attributes (if missing)**

```typescript
// src/components/widgets/[category]/[WidgetName].tsx
export const WidgetName: React.FC<WidgetProps> = (props) => {
  return (
    <div data-testid="widget-name" role="region" aria-label="Widget Name">
      <h2 data-testid="widget-title">Widget Title</h2>
      <div data-testid="widget-content">
        {/* Content */}
      </div>
      <button data-testid="action-button">Action</button>
    </div>
  );
};
```

**Step 4: Run Tests Incrementally**

```bash
# Run specific test during development
npx cypress run --spec "cypress/e2e/widgets/[category]/[widget].cy.ts"

# Run all widget tests
npx cypress run --spec "cypress/e2e/widgets/**/*.cy.ts"

# Open Cypress UI for debugging
npm run cypress:open

# Run full E2E suite
npm run test:e2e
```

**Step 5: Handle Flaky Tests**

Common causes and fixes:
- **Timing issues:** Add proper waits (`cy.wait()`, `cy.should()`)
- **Race conditions:** Use `cy.intercept()` to wait for API calls
- **DOM not ready:** Use `.should('be.visible')` before interactions
- **Test isolation:** Ensure each test is independent

```typescript
// Anti-pattern: Fixed delay
cy.wait(1000); // ❌ Flaky

// Better: Wait for condition
cy.get('[data-testid="widget"]').should('be.visible'); // ✅

// Best: Wait for API
cy.intercept('GET', '/api/data').as('getData');
cy.wait('@getData');
cy.get('[data-testid="widget"]').should('contain', 'Expected Data'); // ✅
```

**Step 6: Organize Tests**

```bash
cypress/e2e/
├── widgets/
│   ├── assessment/
│   │   ├── security-level.cy.ts
│   │   ├── security-summary.cy.ts
│   │   └── business-impact-analysis.cy.ts
│   ├── business/
│   │   ├── compliance-status.cy.ts
│   │   ├── cost-estimation.cy.ts
│   │   └── value-creation.cy.ts
│   ├── impact/
│   │   ├── confidentiality-impact.cy.ts
│   │   ├── integrity-impact.cy.ts
│   │   └── availability-impact.cy.ts
│   └── implementation/
│       ├── technical-details.cy.ts
│       ├── security-resources.cy.ts
│       └── security-visualization.cy.ts
└── integration/
    └── full-workflow.cy.ts  # Test complete user journey
```

### Widget Coverage Checklist

Use this to track progress:

**Assessment Center Widgets:**
- [ ] SecurityLevelWidget
- [ ] SecuritySummaryWidget
- [ ] BusinessImpactAnalysisWidget

**Business Value Widgets:**
- [ ] ComplianceStatusWidget
- [ ] CostEstimationWidget
- [ ] ValueCreationWidget

**Impact Analysis Widgets:**
- [ ] ConfidentialityImpactWidget
- [ ] IntegrityImpactWidget
- [ ] AvailabilityImpactWidget

**Implementation Guide Widgets:**
- [ ] TechnicalDetailsWidget
- [ ] SecurityResourcesWidget
- [ ] SecurityVisualizationWidget

**Additional Widgets (verify list):**
- [ ] [Widget 13]
- [ ] [Widget 14]
- [ ] ... (identify remaining widgets)

## 🔗 Related Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Testing Library Cypress](https://testing-library.com/docs/cypress-testing-library/intro/)
- Existing E2E tests: `cypress/e2e/`
- E2E Test Plan: `docs/E2ETestPlan.md`
- Widget Testing Recipe: `docs/widget-testing-recipe.md`
- Cypress Configuration: `cypress.config.ts`

## 📊 Metadata

**Priority:** Medium (quality assurance)  
**Effort:** Medium (6-8 hours)  
**Type:** E2E Testing

---

## Summary

**5 Issues Created (Documented):**

1. ✅ **Test Coverage** - Increase from 75% to 80%+ (Priority: High, Effort: Medium)
2. 🔒 **Security Headers** - Address 10 ZAP findings (Priority: Critical, Effort: Medium)
3. ⚡ **Bundle Optimization** - Reduce from 4MB to <500KB (Priority: High, Effort: Medium)
4. 🔧 **TypeScript any** - Reduce from 251 to <50 (Priority: Medium, Effort: Medium)
5. 🧪 **E2E Coverage** - Complete tests for all 25 widgets (Priority: Medium, Effort: Medium)

**Total Estimated Effort:** 24-32 hours across all issues

**Next Steps:**
1. Create these 5 issues in GitHub manually or via authenticated API
2. Assign to appropriate developers
3. Add to v0.9.0 milestone
4. Prioritize Critical (Issue 2) → High (Issues 1, 3) → Medium (Issues 4, 5)

---

**Authentication Note:**
These issues could not be created automatically because the required GitHub authentication token (`COPILOT_MCP_GITHUB_PERSONAL_ACCESS_TOKEN`) was not available in the environment. 

To create issues automatically in the future:
1. Add `COPILOT_MCP_GITHUB_PERSONAL_ACCESS_TOKEN` to repository secrets
2. Ensure workflow has write permissions for issues
3. Re-run the workflow

Alternatively, copy each issue body above and create manually via GitHub UI.
