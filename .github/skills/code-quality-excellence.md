# ✨ Code Quality Excellence Skill

## Strategic Principle

**High-quality code is reusable, type-safe, maintainable, and testable by design.**

This skill enforces Hack23 AB's code quality standards, ensuring every line of code contributes to a maintainable, secure, and efficient codebase.

## Core Rules

### 1. Code Reusability (CRITICAL PRIORITY)

**RULE**: Before creating ANY new code, ALWAYS check for existing implementations.

**Mandatory Checklist**:
```
Before writing new code:
□ Searched `src/types/` for existing type definitions
□ Searched `src/constants/` for existing constants
□ Searched `src/utils/` for existing utility functions
□ Searched `src/services/` for existing services
□ Searched `src/components/common/` for existing components
□ Searched `src/components/charts/` for existing chart components
□ Searched `src/components/widgets/` for existing widgets
□ Confirmed existing code cannot be reused or extended
□ Documented justification for new code creation
```

**Reusable Code Locations**:
```
src/types/
├── cia.ts                    # CIA triad types
├── businessImpact.ts         # Business impact types
├── widgets.ts                # Widget types
├── compliance.ts             # Compliance framework types
├── componentPropExports.ts   # Component prop types
└── widget-props.ts           # Widget-specific prop types

src/constants/
├── securityLevels.ts         # Security level definitions
├── businessConstants.ts      # Business-related constants
├── appConstants.ts           # Application constants
├── uiConstants.ts            # UI constants
└── testIds.ts                # Test ID constants

src/utils/
├── securityLevelUtils.ts     # Security level utilities
├── riskUtils.ts              # Risk calculation utilities
├── formatUtils.ts            # Formatting utilities
├── typeGuards.ts             # Type guard functions
└── colorUtils.ts             # Color utilities

src/services/
├── ciaContentService.ts      # CIA content service
├── businessImpactService.ts  # Business impact service
├── complianceService.ts      # Compliance service
├── securityMetricsService.ts # Security metrics service
└── BaseService.ts            # Base service class

src/components/
├── common/                   # Shared components
├── charts/                   # Chart components
└── widgets/                  # Widget components
```

**Example**:
```typescript
// ❌ BAD: Creating duplicate type
interface UserSecurityLevel {
  level: 'high' | 'medium' | 'low';
}

// ✅ GOOD: Using existing type
import { SecurityLevel } from '@/types/cia';
// SecurityLevel already defines: 'critical' | 'high' | 'moderate' | 'low' | 'public'

// ❌ BAD: Creating duplicate utility
function calculateRisk(c: number, i: number, a: number): number {
  return (c + i + a) / 3;
}

// ✅ GOOD: Using existing utility
import { calculateRiskScore } from '@/utils/riskUtils';
const risk = calculateRiskScore(confidentiality, integrity, availability);
```

### 2. Type Safety (MANDATORY)

**RULE**: No `any` types. Explicit types everywhere.

**TypeScript Strict Mode Requirements**:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

**Type Safety Examples**:
```typescript
// ❌ BAD: Using 'any'
function processData(data: any): any {
  return data.value;
}

// ✅ GOOD: Explicit types
function processData<T extends { value: unknown }>(data: T): unknown {
  return data.value;
}

// ❌ BAD: Implicit return type
function calculateScore(metrics) {
  return metrics.reduce((sum, m) => sum + m.value, 0);
}

// ✅ GOOD: Explicit parameter and return types
interface Metric {
  readonly value: number;
}

function calculateScore(metrics: readonly Metric[]): number {
  return metrics.reduce((sum, m) => sum + m.value, 0);
}

// ❌ BAD: Unsafe type assertion
const user = data as User;

// ✅ GOOD: Type guard with validation
import { isUser } from '@/utils/typeGuards';

if (!isUser(data)) {
  throw new Error('Invalid user data');
}
const user = data; // TypeScript knows this is User
```

### 3. Function Composition & Single Responsibility

**RULE**: Each function should do one thing and do it well.

**Guidelines**:
- Max 50 lines per function (excluding comments/whitespace)
- Max 4 parameters (use object parameters for more)
- Single level of abstraction per function
- Pure functions preferred (no side effects)

```typescript
// ❌ BAD: Function doing too much
function processAndSaveUser(data: any): void {
  // Validate
  if (!data.email) throw new Error('Invalid');
  
  // Transform
  const user = {
    name: data.name.toUpperCase(),
    email: data.email.toLowerCase(),
    age: parseInt(data.age)
  };
  
  // Save
  database.save(user);
  
  // Send email
  sendEmail(user.email, 'Welcome!');
  
  // Log
  console.log('User saved');
}

// ✅ GOOD: Separated concerns
function validateUserData(data: unknown): asserts data is RawUserData {
  if (!isRawUserData(data)) {
    throw new ValidationError('Invalid user data');
  }
}

function transformUserData(data: RawUserData): User {
  return {
    name: data.name.toUpperCase(),
    email: data.email.toLowerCase(),
    age: parseInt(data.age, 10),
  };
}

async function saveUser(user: User): Promise<void> {
  await database.save(user);
}

async function processUser(data: unknown): Promise<void> {
  validateUserData(data);
  const user = transformUserData(data);
  await saveUser(user);
  await sendWelcomeEmail(user.email);
  logger.info('User processed', { userId: user.id });
}
```

### 4. Immutability & Const Correctness

**RULE**: Prefer `const` and `readonly`. Avoid mutation.

```typescript
// ❌ BAD: Mutable data structures
let config = { timeout: 5000 };
config.timeout = 10000; // Mutation

// ✅ GOOD: Immutable data structures
const config = { timeout: 5000 } as const;
// config.timeout = 10000; // TypeScript error!

// ❌ BAD: Mutating arrays
const items = [1, 2, 3];
items.push(4); // Mutation

// ✅ GOOD: Immutable array operations
const items = [1, 2, 3] as const;
const newItems = [...items, 4];

// ✅ GOOD: Readonly interfaces
interface User {
  readonly id: string;
  readonly email: string;
  readonly createdAt: Date;
}

// ✅ GOOD: Readonly arrays
function processMetrics(metrics: readonly Metric[]): number {
  // Cannot modify metrics array
  return metrics.reduce((sum, m) => sum + m.value, 0);
}
```

### 5. Error Handling Best Practices

**RULE**: Handle errors explicitly. No silent failures.

```typescript
// ❌ BAD: Swallowing errors
function loadData(): Data | undefined {
  try {
    return fetchData();
  } catch {
    return undefined; // What went wrong?
  }
}

// ✅ GOOD: Explicit error handling
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

function loadData(): Result<Data> {
  try {
    const data = fetchData();
    return { success: true, data };
  } catch (error) {
    logger.error('Failed to load data', { error });
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error('Unknown error')
    };
  }
}

// Usage with type narrowing
const result = loadData();
if (result.success) {
  // TypeScript knows result.data exists
  console.log(result.data);
} else {
  // TypeScript knows result.error exists
  handleError(result.error);
}
```

### 6. Performance & Optimization

**RULE**: Optimize only after profiling. Premature optimization is the root of all evil.

**React Performance**:
```typescript
// ❌ BAD: Unnecessary re-renders
function ExpensiveComponent({ data }) {
  const processedData = expensiveCalculation(data);
  return <div>{processedData}</div>;
}

// ✅ GOOD: Memoized calculation
function ExpensiveComponent({ data }: { data: Data }) {
  const processedData = useMemo(
    () => expensiveCalculation(data),
    [data]
  );
  return <div>{processedData}</div>;
}

// ❌ BAD: Recreating functions
function ParentComponent() {
  return <ChildComponent onClick={() => handleClick()} />;
}

// ✅ GOOD: Stable callback reference
function ParentComponent() {
  const handleClick = useCallback(() => {
    // Handle click
  }, []);
  
  return <ChildComponent onClick={handleClick} />;
}
```

**Algorithm Complexity**:
```typescript
// ❌ BAD: O(n²) complexity
function findDuplicates(items: string[]): string[] {
  const duplicates: string[] = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      if (items[i] === items[j]) {
        duplicates.push(items[i]);
      }
    }
  }
  return duplicates;
}

// ✅ GOOD: O(n) complexity
function findDuplicates(items: readonly string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  
  for (const item of items) {
    if (seen.has(item)) {
      duplicates.add(item);
    } else {
      seen.add(item);
    }
  }
  
  return Array.from(duplicates);
}
```

### 7. Code Documentation

**RULE**: Public APIs must have JSDoc. Complex logic needs comments.

```typescript
/**
 * Calculates the overall security risk score based on CIA triad levels
 * 
 * @param confidentiality - Confidentiality level (0-4)
 * @param integrity - Integrity level (0-4)
 * @param availability - Availability level (0-4)
 * @returns Risk score between 0 (lowest) and 100 (highest)
 * 
 * @example
 * ```typescript
 * const risk = calculateRiskScore(4, 3, 4);
 * console.log(risk); // 91.67
 * ```
 * 
 * @see {@link https://csrc.nist.gov/glossary/term/risk_assessment | NIST Risk Assessment}
 */
export function calculateRiskScore(
  confidentiality: SecurityLevel,
  integrity: SecurityLevel,
  availability: SecurityLevel
): number {
  // Convert levels to numeric values
  const cValue = securityLevelToNumeric(confidentiality);
  const iValue = securityLevelToNumeric(integrity);
  const aValue = securityLevelToNumeric(availability);
  
  // Calculate average and normalize to 0-100 scale
  const average = (cValue + iValue + aValue) / 3;
  return (average / 4) * 100;
}
```

### 8. Naming Conventions

**RULE**: Names should be self-documenting.

```typescript
// ❌ BAD: Unclear names
function calc(a, b, c) { return (a + b + c) / 3; }
const x = [1, 2, 3];
let flag = true;

// ✅ GOOD: Clear, descriptive names
function calculateAverageScore(
  confidentiality: number,
  integrity: number,
  availability: number
): number {
  return (confidentiality + integrity + availability) / 3;
}

const securityMetrics = [
  { name: 'Authentication', score: 85 },
  { name: 'Encryption', score: 92 },
  { name: 'Access Control', score: 78 }
];

let isDataLoaded = false;
```

**Naming Standards**:
- **PascalCase**: Components, types, interfaces, classes
- **camelCase**: Variables, functions, methods
- **UPPER_SNAKE_CASE**: Constants
- **kebab-case**: File names, CSS classes

## Testing Requirements

### Test Coverage Targets
- **Critical paths** (security, payments, data integrity): 100%
- **Business logic**: 90%+
- **UI components**: 80%+
- **Utilities**: 90%+
- **Overall project**: 80%+ minimum

### Test Quality Standards
```typescript
// ✅ GOOD: Comprehensive test suite
describe('calculateRiskScore', () => {
  // Arrange-Act-Assert pattern
  describe('when given valid inputs', () => {
    it('should calculate correct risk for high-risk scenario', () => {
      // Arrange
      const confidentiality = 4;
      const integrity = 4;
      const availability = 4;
      
      // Act
      const result = calculateRiskScore(confidentiality, integrity, availability);
      
      // Assert
      expect(result).toBe(100);
    });
  });
  
  describe('edge cases', () => {
    it('should handle zero values', () => {
      expect(calculateRiskScore(0, 0, 0)).toBe(0);
    });
    
    it('should handle mixed values', () => {
      expect(calculateRiskScore(4, 2, 3)).toBeCloseTo(75, 2);
    });
  });
  
  describe('error handling', () => {
    it('should throw on invalid inputs', () => {
      expect(() => calculateRiskScore(-1, 2, 3)).toThrow();
      expect(() => calculateRiskScore(2, 5, 3)).toThrow();
    });
  });
});
```

## ISMS Alignment

### Hack23 Secure Development Policy
- **Section 3.2**: Code quality standards
- **Section 3.4**: Code review requirements
- **Section 3.6**: Testing requirements

### ISO 27001:2022
- **8.25**: Secure development lifecycle
- **8.26**: Application security requirements

### CIS Controls v8
- **Control 16**: Application Software Security
  - 16.10: Apply secure coding practices

## Enforcement Rules

### MUST (Critical - Block PR)
1. No `any` types (use `unknown` or explicit types)
2. All functions must have explicit return types
3. All public APIs must have JSDoc documentation
4. All new code must check for reusable alternatives first
5. Minimum 80% test coverage for new code

### SHOULD (High priority)
1. Prefer immutability (`const`, `readonly`)
2. Use utility types for type composition
3. Functions should be pure when possible
4. Use type guards for runtime validation
5. Implement error handling explicitly

### MAY (Recommended)
1. Use React.memo() for expensive components
2. Use useMemo/useCallback for optimization
3. Add performance benchmarks for critical paths
4. Use ESLint autofix for code style
5. Add inline comments for complex algorithms

## Quality Metrics

Track and improve these metrics:
- **Code Coverage**: Aim for 80%+ overall
- **TypeScript Strict Mode Compliance**: 100%
- **ESLint Violations**: 0 errors
- **Complexity Score**: < 10 per function (cyclomatic complexity)
- **Bundle Size**: Monitor and optimize (see budget.json)
- **Code Duplication**: < 3% (use tools like jscpd)

## Quick Decision Guide

**Before creating new code:**
→ Search existing types, utils, components
→ Can existing code be extended?
→ Document why new code is necessary

**When defining types:**
→ Use explicit types, no `any`
→ Make interfaces readonly where possible
→ Use utility types (Pick, Omit, Partial)

**When writing functions:**
→ Single responsibility principle
→ Explicit return type
→ Max 50 lines, 4 parameters
→ Pure function if possible

**When handling errors:**
→ Never silence errors
→ Log with context
→ Provide user-friendly messages
→ Test error paths

**Before committing:**
→ Run ESLint, fix all errors
→ Run tests, ensure coverage ≥ 80%
→ Add/update JSDoc for public APIs
→ Check for code duplication

## Remember

**Quality is not an accident. It's the result of deliberate practice and enforcement of high standards.**

Every line of code is a liability. Make it count.

## Related Resources

- [TypeScript Strict Mode](https://www.typescriptlang.org/tsconfig#strict)
- [Clean Code Principles](https://github.com/ryanmcdermott/clean-code-javascript)
- [React Best Practices](https://react.dev/learn/thinking-in-react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
