# 🧪 Testing Excellence Skill

## Strategic Principle

**Quality is not tested in—it's built in. But comprehensive testing validates that quality.**

This skill ensures that all code changes are thoroughly tested with meaningful tests that validate functionality, prevent regressions, and maintain an 80%+ coverage target.

## Core Testing Philosophy

### The Testing Pyramid

```
        /\
       /E2E\         ← Few (Critical user journeys)
      /------\
     /  API   \      ← Some (Integration tests)
    /----------\
   /    Unit    \    ← Many (Fast, isolated tests)
  /--------------\
```

**Distribution Target**:
- **Unit Tests**: 70% of total tests
- **Integration Tests**: 20% of total tests
- **E2E Tests**: 10% of total tests

## Testing Standards

### 1. Test Coverage Requirements (MANDATORY)

**Minimum Coverage Targets**:
```
Critical Paths (security, payments, auth):  100%
Business Logic (calculations, workflows):    90%
UI Components (React components):            80%
Utilities (helpers, formatters):             90%
Services (API clients, data services):       85%
Overall Project:                             80%
```

**Coverage Enforcement**:
```json
// .nycrc.json or vitest.config.ts
{
  "all": true,
  "check-coverage": true,
  "lines": 80,
  "functions": 80,
  "branches": 80,
  "statements": 80,
  "exclude": [
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/test-utils/**",
    "**/__mocks__/**",
    "**/node_modules/**"
  ]
}
```

### 2. Test Quality Principles

**FIRST Principles**:
- **Fast**: Tests run quickly (< 1s per unit test)
- **Independent**: Tests don't depend on each other
- **Repeatable**: Same result every time
- **Self-validating**: Pass/fail, no manual verification
- **Timely**: Written with or before code

**AAA Pattern** (Arrange-Act-Assert):
```typescript
// ✅ GOOD: Clear AAA structure
describe('calculateRiskScore', () => {
  it('should return 100 for maximum risk levels', () => {
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
```

### 3. Unit Testing Standards

**RULE**: Test one thing at a time. Isolate dependencies.

```typescript
// ✅ GOOD: Isolated unit test with mocks
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchComplianceData } from './complianceService';
import { httpClient } from './httpClient';

// Mock external dependency
vi.mock('./httpClient');

describe('fetchComplianceData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('should fetch and return compliance data', async () => {
    // Arrange
    const mockData = { framework: 'ISO27001', controls: 93 };
    vi.mocked(httpClient.get).mockResolvedValue(mockData);
    
    // Act
    const result = await fetchComplianceData('ISO27001');
    
    // Assert
    expect(httpClient.get).toHaveBeenCalledWith('/api/compliance/ISO27001');
    expect(result).toEqual(mockData);
  });
  
  it('should handle API errors gracefully', async () => {
    // Arrange
    const error = new Error('Network error');
    vi.mocked(httpClient.get).mockRejectedValue(error);
    
    // Act & Assert
    await expect(fetchComplianceData('ISO27001')).rejects.toThrow('Network error');
  });
});
```

### 4. Component Testing Standards

**RULE**: Test behavior, not implementation. Use React Testing Library.

```typescript
// ✅ GOOD: Behavior-focused component test
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SecurityLevelSelector } from './SecurityLevelSelector';

describe('SecurityLevelSelector', () => {
  it('should allow user to select security level', async () => {
    // Arrange
    const user = userEvent.setup();
    const onChangeMock = vi.fn();
    
    render(
      <SecurityLevelSelector 
        value="moderate" 
        onChange={onChangeMock} 
      />
    );
    
    // Act
    const select = screen.getByRole('combobox', { name: /security level/i });
    await user.selectOptions(select, 'high');
    
    // Assert
    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledWith('high');
    });
  });
  
  it('should display current security level', () => {
    // Arrange & Act
    render(<SecurityLevelSelector value="critical" onChange={vi.fn()} />);
    
    // Assert
    expect(screen.getByDisplayValue('critical')).toBeInTheDocument();
  });
  
  it('should be accessible via keyboard', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<SecurityLevelSelector value="low" onChange={vi.fn()} />);
    
    // Act - Tab to focus, then use arrow keys
    await user.tab();
    await user.keyboard('{ArrowDown}');
    
    // Assert
    const select = screen.getByRole('combobox');
    expect(select).toHaveFocus();
  });
});
```

### 5. Integration Testing Standards

**RULE**: Test component interactions and data flow.

```typescript
// ✅ GOOD: Integration test for data flow
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, beforeEach } from 'vitest';
import { ComplianceDashboard } from './ComplianceDashboard';
import { server } from '../test-utils/msw-server';
import { rest } from 'msw';

describe('ComplianceDashboard Integration', () => {
  let queryClient: QueryClient;
  
  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
  });
  
  it('should fetch and display compliance metrics', async () => {
    // Arrange
    server.use(
      rest.get('/api/compliance/metrics', (req, res, ctx) => {
        return res(
          ctx.json({
            iso27001: { compliance: 85, controls: 93 },
            nistCsf: { compliance: 78, functions: 23 },
          })
        );
      })
    );
    
    // Act
    render(
      <QueryClientProvider client={queryClient}>
        <ComplianceDashboard />
      </QueryClientProvider>
    );
    
    // Assert
    await waitFor(() => {
      expect(screen.getByText('ISO 27001')).toBeInTheDocument();
      expect(screen.getByText('85%')).toBeInTheDocument();
      expect(screen.getByText('NIST CSF 2.0')).toBeInTheDocument();
      expect(screen.getByText('78%')).toBeInTheDocument();
    });
  });
});
```

### 6. E2E Testing Standards

**RULE**: Test critical user workflows end-to-end.

```typescript
// ✅ GOOD: E2E test for critical workflow
// cypress/e2e/compliance-assessment.cy.ts
describe('Compliance Assessment Workflow', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('test@example.com', 'password');
  });
  
  it('should complete full compliance assessment', () => {
    // Navigate to assessment
    cy.findByRole('link', { name: /start assessment/i }).click();
    
    // Select framework
    cy.findByRole('combobox', { name: /framework/i })
      .select('ISO 27001:2022');
    
    // Fill in CIA levels
    cy.findByLabelText(/confidentiality/i).select('High');
    cy.findByLabelText(/integrity/i).select('High');
    cy.findByLabelText(/availability/i).select('Moderate');
    
    // Submit assessment
    cy.findByRole('button', { name: /calculate risk/i }).click();
    
    // Verify results
    cy.findByText(/risk score/i).should('be.visible');
    cy.findByText(/83\.33/i).should('be.visible');
    
    // Verify recommendations generated
    cy.findByRole('heading', { name: /recommendations/i })
      .should('be.visible');
  });
  
  it('should validate required fields', () => {
    cy.visit('/assessment');
    
    // Try to submit without filling
    cy.findByRole('button', { name: /calculate/i }).click();
    
    // Verify validation messages
    cy.findByText(/framework is required/i).should('be.visible');
    cy.findByText(/please select all cia levels/i).should('be.visible');
  });
});
```

## Testing Best Practices

### 1. Test Data Management

**RULE**: Use constants and factories for test data.

```typescript
// test-utils/factories.ts
export const TEST_SECURITY_LEVELS = {
  CRITICAL: 'critical' as const,
  HIGH: 'high' as const,
  MODERATE: 'moderate' as const,
  LOW: 'low' as const,
  PUBLIC: 'public' as const,
};

export function createMockComplianceData(
  overrides?: Partial<ComplianceData>
): ComplianceData {
  return {
    id: 'test-id-123',
    framework: 'ISO27001',
    compliance: 85,
    controls: 93,
    assessmentDate: new Date('2024-01-01'),
    ...overrides,
  };
}

// Usage in tests
it('should display compliance data', () => {
  const mockData = createMockComplianceData({ compliance: 92 });
  render(<ComplianceCard data={mockData} />);
  expect(screen.getByText('92%')).toBeInTheDocument();
});
```

### 2. Mock Management

**RULE**: Use MSW for API mocking. Avoid excessive mocking.

```typescript
// test-utils/msw-handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/compliance/:framework', (req, res, ctx) => {
    const { framework } = req.params;
    return res(
      ctx.json({
        framework,
        compliance: 85,
        controls: 93,
      })
    );
  }),
  
  rest.post('/api/assessment', async (req, res, ctx) => {
    const body = await req.json();
    return res(
      ctx.json({
        id: 'assessment-123',
        riskScore: calculateRiskFromBody(body),
      })
    );
  }),
];

// test-utils/msw-server.ts
import { setupServer } from 'msw/node';
import { handlers } from './msw-handlers';

export const server = setupServer(...handlers);
```

### 3. Test Organization

**RULE**: Organize tests logically with clear describe blocks.

```typescript
describe('SecurityMetricsService', () => {
  describe('calculateOverallScore', () => {
    describe('when all metrics are available', () => {
      it('should return weighted average', () => {
        // Test implementation
      });
    });
    
    describe('when some metrics are missing', () => {
      it('should handle gracefully', () => {
        // Test implementation
      });
    });
    
    describe('edge cases', () => {
      it('should handle zero values', () => {
        // Test implementation
      });
      
      it('should handle negative values', () => {
        // Test implementation
      });
    });
  });
  
  describe('error handling', () => {
    it('should throw on invalid input', () => {
      // Test implementation
    });
  });
});
```

### 4. Accessibility Testing

**RULE**: Test accessibility as part of component tests.

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

describe('SecurityLevelBadge Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <SecurityLevelBadge level="critical" />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('should have proper ARIA attributes', () => {
    render(<SecurityLevelBadge level="high" />);
    
    const badge = screen.getByRole('status');
    expect(badge).toHaveAttribute('aria-label', 'Security level: High');
  });
  
  it('should be keyboard accessible', async () => {
    const user = userEvent.setup();
    render(<SecurityLevelSelector onChange={vi.fn()} />);
    
    await user.tab();
    const selector = screen.getByRole('combobox');
    expect(selector).toHaveFocus();
  });
});
```

### 5. Performance Testing

**RULE**: Test performance-critical code paths.

```typescript
describe('Performance', () => {
  it('should calculate risk for 1000 items in under 100ms', () => {
    const items = Array.from({ length: 1000 }, (_, i) => ({
      confidentiality: (i % 5) as SecurityLevel,
      integrity: (i % 5) as SecurityLevel,
      availability: (i % 5) as SecurityLevel,
    }));
    
    const start = performance.now();
    const results = items.map(item => 
      calculateRiskScore(item.confidentiality, item.integrity, item.availability)
    );
    const duration = performance.now() - start;
    
    expect(duration).toBeLessThan(100);
    expect(results).toHaveLength(1000);
  });
});
```

## Testing Anti-Patterns to Avoid

### ❌ DON'T: Test Implementation Details
```typescript
// ❌ BAD: Testing internal state
it('should set loading to true', () => {
  const { result } = renderHook(() => useComplianceData());
  expect(result.current.loading).toBe(true); // Implementation detail!
});

// ✅ GOOD: Test observable behavior
it('should show loading indicator while fetching', () => {
  render(<ComplianceDashboard />);
  expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
});
```

### ❌ DON'T: Write Tests Just for Coverage
```typescript
// ❌ BAD: Meaningless test
it('should exist', () => {
  expect(MyComponent).toBeDefined();
});

// ✅ GOOD: Test actual behavior
it('should display user name when provided', () => {
  render(<UserProfile name="John Doe" />);
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
```

### ❌ DON'T: Have Flaky Tests
```typescript
// ❌ BAD: Time-dependent test
it('should update timestamp', () => {
  const result = getCurrentTimestamp();
  expect(result).toBe(Date.now()); // Flaky!
});

// ✅ GOOD: Controlled test
it('should return formatted timestamp', () => {
  const mockDate = new Date('2024-01-01T00:00:00Z');
  vi.setSystemTime(mockDate);
  
  const result = getCurrentTimestamp();
  expect(result).toBe('2024-01-01T00:00:00.000Z');
  
  vi.useRealTimers();
});
```

## Test Execution Strategy

### Development Workflow
```bash
# Run tests in watch mode during development
npm run test:watch

# Run tests for specific file
npm run test -- SecurityMetrics.test.ts

# Run with coverage
npm run test:coverage
```

### CI/CD Pipeline
```bash
# Run all tests
npm run test

# Run with coverage threshold enforcement
npm run test:coverage -- --coverage.threshold.lines=80

# Run E2E tests
npm run test:e2e
```

## ISMS Alignment

### Hack23 Secure Development Policy
- **Section 3.6**: Testing requirements (80%+ coverage)
- **Section 4.3**: Security testing mandatory

### ISO 27001:2022
- **Control 8.29**: Security testing in development

### CIS Controls v8
- **Control 16.9**: Implement application testing

## Enforcement Rules

### MUST (Critical - Block PR)
1. Minimum 80% overall test coverage
2. 100% coverage for security-critical paths
3. All tests must pass
4. No skipped tests without justification
5. E2E tests for critical user workflows

### SHOULD (High priority)
1. Use AAA pattern for test structure
2. Use React Testing Library for component tests
3. Use MSW for API mocking
4. Include accessibility tests
5. Test error scenarios

### MAY (Recommended)
1. Add performance tests for critical operations
2. Use snapshot testing sparingly
3. Add visual regression tests
4. Include mutation testing
5. Benchmark test execution time

## Remember

**Tests are the safety net that allows confident refactoring and rapid iteration.**

Good tests document expected behavior better than comments ever could.

## Related Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Testing JavaScript with Kent C. Dodds](https://testingjavascript.com/)
