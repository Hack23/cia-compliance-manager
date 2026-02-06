# 🤖 GitHub Copilot Instructions for CIA Compliance Manager

**Version**: 2.0 (Rule-Based) | **Release Focus**: v1.0 - Bugs, Stability, Testing

---

## 🎯 Core Philosophy

**DO MORE, ASK LESS**: You are empowered to make decisions and complete work autonomously following these rules. Only ask questions when genuinely ambiguous or when making architectural decisions.

**RULE-BASED EXECUTION**: Follow the MUST/SHOULD/MAY hierarchy. MUST rules are non-negotiable. SHOULD rules require justification to skip. MAY rules are best practices.

**SKILLS-FIRST APPROACH**: Always apply the foundational skills framework before writing code.

---

## 📚 Foundational Skills Framework

**CRITICAL**: Before ANY code change, consult these skills located in `.github/skills/`:

### 🔐 1. Security by Design (MANDATORY)
**File**: `.github/skills/security-by-design.md`

**Core Rules**:
- ✅ **MUST**: Threat model for sensitive operations (auth, data handling, external APIs)
- ✅ **MUST**: Validate ALL user inputs at boundaries
- ✅ **MUST**: Use defense in depth (multiple security layers)
- ✅ **MUST**: Never hardcode secrets or credentials
- ✅ **MUST**: Encrypt sensitive data at rest and in transit
- ✅ **MUST**: Include security tests for security-critical paths

**When to Apply**: Authentication, authorization, data handling, external APIs, file operations, user input processing.

---

### ✨ 2. Code Quality Excellence (CRITICAL PRIORITY)
**File**: `.github/skills/code-quality-excellence.md`

**Core Rules**:
- ✅ **MUST**: Check existing code BEFORE creating new (types, utils, components, services)
- ✅ **MUST**: No `any` types - use explicit types or `unknown`
- ✅ **MUST**: All functions have explicit return types
- ✅ **MUST**: JSDoc for all public APIs
- ✅ **MUST**: 80%+ test coverage for new code
- ✅ **MUST**: Functions < 50 lines, single responsibility
- ✅ **SHOULD**: Prefer immutability (`const`, `readonly`)
- ✅ **SHOULD**: Use utility types (Pick, Omit, Partial)

**Reusable Code Locations** (CHECK FIRST):
```
src/types/          - cia.ts, businessImpact.ts, widgets.ts, compliance.ts, componentPropExports.ts, widget-props.ts
src/constants/      - securityLevels.ts, businessConstants.ts, appConstants.ts, uiConstants.ts, testIds.ts
src/utils/          - securityLevelUtils.ts, riskUtils.ts, formatUtils.ts, typeGuards.ts, colorUtils.ts
src/services/       - ciaContentService.ts, businessImpactService.ts, complianceService.ts, securityMetricsService.ts, BaseService.ts
src/components/     - common/*, charts/*, widgets/*
```

**When to Apply**: All code changes. Always check reusable locations first.

---

### 🛡️ 3. ISMS Compliance (MANDATORY)
**File**: `.github/skills/isms-compliance.md`

**Core Rules**:
- ✅ **MUST**: Follow secure development lifecycle (all phases)
- ✅ **MUST**: Security architecture documented (SECURITY_ARCHITECTURE.md)
- ✅ **MUST**: Map features to compliance frameworks (ISO 27001, NIST CSF, CIS Controls)
- ✅ **MUST**: Vulnerability remediation SLA (Critical: 24h, High: 7d, Medium: 30d, Low: 90d)
- ✅ **MUST**: All code reviewed for security before merge
- ✅ **SHOULD**: Update documentation portfolio (ARCHITECTURE.md, DATA_MODEL.md, etc.)

**When to Apply**: Security features, compliance features, architecture changes, vulnerability fixes.

---

### 🧪 4. Testing Excellence (MANDATORY)
**File**: `.github/skills/testing-excellence.md`

**Core Rules**:
- ✅ **MUST**: 80%+ overall coverage, 100% for security-critical paths
- ✅ **MUST**: Testing pyramid (70% unit, 20% integration, 10% E2E)
- ✅ **MUST**: All tests pass before merge
- ✅ **MUST**: AAA pattern (Arrange-Act-Assert)
- ✅ **MUST**: No flaky tests
- ✅ **SHOULD**: Use React Testing Library for components (behavior-focused)
- ✅ **SHOULD**: Test accessibility with @axe-core/react

**When to Apply**: All code changes. Write tests with or before implementation.

---

### ⚡ 5. Performance Optimization (IMPORTANT)
**File**: `.github/skills/performance-optimization.md`

**Core Rules**:
- ✅ **MUST**: Use React.memo() for expensive components
- ✅ **MUST**: Lazy load non-critical components
- ✅ **MUST**: Use Map/Set for frequent lookups
- ✅ **MUST**: Virtualize lists with > 100 items
- ✅ **SHOULD**: Use useMemo() and useCallback() appropriately
- ✅ **SHOULD**: Monitor bundle size in CI

**When to Apply**: React components, data-heavy operations, large lists, performance optimization.

---

### 🎨 6. UI/UX Design System (IMPORTANT)
**File**: `.github/skills/ui-ux-design-system.md`

**Core Rules**:
- ✅ **MUST**: Use design system colors from constants
- ✅ **MUST**: Follow 8px spacing grid
- ✅ **MUST**: Reuse existing components
- ✅ **MUST**: Test on mobile, tablet, desktop
- ✅ **SHOULD**: Follow typography scale
- ✅ **SHOULD**: Maintain 4.5:1 contrast for text

**When to Apply**: UI components, visual design, responsive layouts.

---

### ♿ 7. Accessibility Excellence (IMPORTANT)
**File**: `.github/skills/accessibility-excellence.md`

**Core Rules**:
- ✅ **MUST**: Use semantic HTML elements
- ✅ **MUST**: All interactive elements keyboard accessible
- ✅ **MUST**: 4.5:1 contrast for text, 3:1 for UI components
- ✅ **MUST**: Label all form inputs
- ✅ **MUST**: Announce dynamic content with aria-live
- ✅ **SHOULD**: Test with screen readers
- ✅ **SHOULD**: Run automated axe tests

**When to Apply**: All UI components, forms, interactive elements, dynamic content.

---

### 📝 8. Documentation Standards (IMPORTANT)
**File**: `.github/skills/documentation-standards.md`

**Core Rules**:
- ✅ **MUST**: JSDoc for all exported functions/classes/interfaces
- ✅ **MUST**: Include usage examples
- ✅ **MUST**: Document parameters and return values
- ✅ **MUST**: Use C4 model for architecture
- ✅ **SHOULD**: Keep READMEs current
- ✅ **SHOULD**: Use Mermaid diagrams

**When to Apply**: New APIs, components, architecture changes, README updates.

---

### 🎯 9. Product Quality Analysis (FOR PRODUCT COORDINATION)
**File**: `.github/skills/product-quality-analysis.md`

**Core Rules**:
- ✅ **MUST**: Assess all four quality dimensions (code, UX, security, business)
- ✅ **MUST**: Prioritize security and critical bugs
- ✅ **MUST**: Consider user impact in prioritization
- ✅ **MUST**: Track metrics over time
- ✅ **SHOULD**: Create actionable GitHub issues

**When to Apply**: Product audits, quality assessments, issue prioritization, continuous improvement.

---

## 🚨 Enforcement Rules (MUST/SHOULD/MAY Hierarchy)

### MUST (Critical - Block PR if Violated)

**Code Quality**:
- No `any` types anywhere in codebase
- All functions have explicit return types
- Check existing code before creating new types/utils/components
- 80%+ test coverage for new code
- All tests pass

**Security**:
- All user inputs validated
- No hardcoded secrets or credentials
- Sensitive data encrypted
- Error messages never leak sensitive information
- Security tests for security-critical paths

**ISMS Compliance**:
- Security architecture documented and current
- Code reviewed for security
- Vulnerability SLA followed

**Testing**:
- 100% coverage for security-critical paths (auth, data handling)
- No skipped tests without documented justification
- All tests deterministic (no flaky tests)

**Documentation**:
- JSDoc for all public functions, classes, interfaces
- Update relevant docs when changing functionality
- README current with feature changes

### SHOULD (High Priority - Justify if Not Followed)

**Code Quality**:
- Functions < 50 lines
- Use immutability (`const`, `readonly`)
- Use utility types for type composition
- React.memo() for expensive components

**Security**:
- Threat model documented for sensitive operations
- Audit logging for security events
- Use security linters (ESLint security plugins)

**Testing**:
- Accessibility tests using jest-axe
- Test error scenarios and edge cases
- Use MSW for API mocking

**Documentation**:
- Inline comments for complex algorithms
- Architecture diagrams for major changes
- Update C4 model documentation

### MAY (Recommended - Best Practice)

**Code Quality**:
- Performance benchmarks for critical paths
- Code complexity metrics tracking
- Bundle size analysis

**Security**:
- Penetration testing for critical changes
- Security training sessions
- Bug bounty participation

**Testing**:
- Mutation testing
- Visual regression tests
- Performance tests

---

## 🎯 Release Context: v1.0 Focus

### ALLOWED ✅
- Fix bugs in existing functionality
- Complete in-progress widgets
- Stabilize existing features
- Improve test coverage (target 80%+)
- Refactor for maintainability
- Performance optimizations
- Security vulnerability fixes (CRITICAL PRIORITY)
- Documentation improvements

### NOT ALLOWED ❌
- New features or functionality
- New widgets or components (unless completing in-progress)
- Extending APIs with new endpoints
- Adding new dependencies (unless fixing vulnerabilities)
- Breaking changes to public APIs

---

## 💻 Development Workflow

### Before Writing Code:

1. **Understand the Task**
   - Read issue/requirement fully
   - Identify affected components
   - Check related code

2. **Check Reusability** (CRITICAL)
   ```bash
   # Search for existing implementations
   grep -r "similar_function_name" src/
   ls src/types/  # Check existing types
   ls src/utils/  # Check existing utilities
   ls src/services/  # Check existing services
   ```

3. **Apply Skills Framework**
   - Security by Design: Need threat model?
   - Code Quality: What can be reused?
   - ISMS Compliance: Compliance requirements?
   - Testing: What tests are needed?

4. **Plan Implementation**
   - Minimal changes approach
   - Identify files to modify
   - Plan test strategy

### While Writing Code:

1. **Follow TypeScript Strict Mode**
   ```typescript
   // ✅ GOOD
   function calculateRisk(
     confidentiality: SecurityLevel,
     integrity: SecurityLevel,
     availability: SecurityLevel
   ): number {
     // Implementation
   }
   
   // ❌ BAD
   function calculateRisk(c, i, a) {
     // Implementation
   }
   ```

2. **Reuse Existing Code**
   ```typescript
   // ✅ GOOD: Use existing utility
   import { getColorForSecurityLevel } from '@/utils/colorUtils';
   
   // ❌ BAD: Create duplicate
   function getSecurityColor(level: string): string { ... }
   ```

3. **Write Tests Alongside Code**
   ```typescript
   // Component.tsx
   export function MyComponent() { ... }
   
   // Component.test.tsx (same directory)
   describe('MyComponent', () => {
     it('should render correctly', () => { ... });
   });
   ```

### Before Committing:

1. **Run Checks** (MANDATORY)
   ```bash
   npm run lint              # Fix all errors
   npm run type-check        # No TypeScript errors
   npm run test              # All tests pass
   npm run test:coverage     # Coverage ≥ 80%
   npm run build             # Build succeeds
   ```

2. **Verify Changes**
   ```bash
   git status                # Review changed files
   git diff                  # Review actual changes
   ```

3. **Validate Against Rules**
   - [ ] No `any` types?
   - [ ] Reused existing code?
   - [ ] Tests written and passing?
   - [ ] Coverage ≥ 80%?
   - [ ] Security considerations addressed?
   - [ ] Documentation updated?

---

## 🤖 Custom Agents (Use When Appropriate)

Located in `.github/agents/`, these specialized agents provide domain expertise:

### When to Use Agents:

| Task Type | Agent | Use When |
|-----------|-------|----------|
| **TypeScript/React code** | `@typescript-react-agent` | Building components, hooks, TypeScript types |
| **Writing tests** | `@testing-agent` | Unit tests, integration tests, E2E tests |
| **Code review** | `@code-review-agent` | Reviewing PRs, checking quality/security |
| **Documentation** | `@documentation-agent` | Writing docs, creating diagrams, API docs |
| **Security/Compliance** | `@security-compliance-agent` | Security reviews, ISMS mapping, threat models |
| **Product coordination** | `@product-task-agent` | Creating issues, coordinating quality improvements |

**See**: `.github/agents/README.md` for full agent documentation.

---

## 📝 File Creation Policy

### NEVER Create New Files Unless:

1. **Explicitly asked** by user ("create a new file X")
2. **Test files** for new code (Component.test.tsx)
3. **Required by framework** (e.g., TypeScript requires certain files)

### DO NOT Create:

- ❌ Planning documents or notes (work in memory)
- ❌ Temporary markdown files
- ❌ TODO lists or tracking files
- ❌ Summary documents (unless explicitly requested)
- ❌ Additional documentation files (update existing instead)

### Before Creating ANY File:

1. Check if existing file can be updated instead
2. Verify file is necessary and requested
3. Use appropriate naming conventions
4. Place in correct directory

---

## 🔍 Quality Checklist (Before PR)

Use this checklist for every change:

### Code Quality
- [ ] No `any` types (use explicit types or `unknown`)
- [ ] All functions have explicit return types
- [ ] Existing code reused where possible
- [ ] JSDoc comments for public APIs
- [ ] Follows naming conventions (PascalCase, camelCase, UPPER_SNAKE_CASE)
- [ ] Functions < 50 lines, single responsibility
- [ ] No code duplication

### Security
- [ ] All user inputs validated
- [ ] No hardcoded secrets
- [ ] Sensitive data encrypted or protected
- [ ] Error messages don't leak sensitive information
- [ ] Security tests for security-critical code

### Testing
- [ ] Tests written for new code
- [ ] All tests pass (`npm run test`)
- [ ] Coverage ≥ 80% (`npm run test:coverage`)
- [ ] No flaky tests
- [ ] Tests use AAA pattern
- [ ] Critical paths have 100% coverage

### ISMS Compliance
- [ ] Security considerations documented
- [ ] Compliance framework mapped (if applicable)
- [ ] Architecture docs updated (if needed)

### Documentation
- [ ] JSDoc for new public APIs
- [ ] README updated (if features changed)
- [ ] Architecture docs updated (if structure changed)
- [ ] Breaking changes documented

### Build & Performance
- [ ] Build succeeds (`npm run build`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] Bundle size acceptable (check `budget.json`)
- [ ] No performance regressions

---

## 🎓 Learning & Improvement

### When Uncertain:

1. **Check Skills** (`.github/skills/`) for principles
2. **Check Agents** (`.github/agents/`) for domain guidance
3. **Check Existing Code** for patterns
4. **Only then ask** if genuinely ambiguous

### When You Make a Mistake:

1. **Learn from it** - understand why it violated a rule
2. **Update your approach** - apply the correct pattern
3. **Move forward** - don't repeat the same mistake

### Continuous Improvement:

- Study existing codebase patterns
- Understand why rules exist (security, maintainability, quality)
- Apply skills framework consistently
- Evolve implementation while maintaining standards

---

## 📚 Quick Reference Links

### Core Documentation
- **Skills Framework**: `.github/skills/README.md`
- **Agent Documentation**: `.github/agents/README.md`
- **Project README**: `README.md`
- **Security Policy**: `SECURITY.md`
- **ISMS Guide**: `ISMS_IMPLEMENTATION_GUIDE.md`

### Skills (Rule-Based Principles)
- **Security by Design**: `.github/skills/security-by-design.md`
- **Code Quality Excellence**: `.github/skills/code-quality-excellence.md`
- **ISMS Compliance**: `.github/skills/isms-compliance.md`
- **Testing Excellence**: `.github/skills/testing-excellence.md`

### Agents (Task Execution)
- **TypeScript React Agent**: `.github/agents/typescript-react-agent.md`
- **Testing Agent**: `.github/agents/testing-agent.md`
- **Code Review Agent**: `.github/agents/code-review-agent.md`
- **Documentation Agent**: `.github/agents/documentation-agent.md`
- **Security Compliance Agent**: `.github/agents/security-compliance-agent.md`
- **Product Task Agent**: `.github/agents/product-task-agent.md`

### External Resources
- [Hack23 ISMS Public](https://github.com/Hack23/ISMS-PUBLIC)
- [ISO 27001:2022](https://www.iso.org/standard/27001)
- [NIST CSF 2.0](https://www.nist.gov/cyberframework)
- [CIS Controls v8](https://www.cisecurity.org/controls/)

---

## 🎯 Remember

**YOU ARE EMPOWERED TO ACT**: These rules give you the authority to make decisions and complete work autonomously. Follow the MUST rules, justify SHOULD exceptions, apply MAY practices.

**SKILLS → AGENTS → CODE**: Always apply skills framework first, leverage agents for domain expertise, then write code following all rules.

**QUALITY OVER SPEED**: It's better to do it right than to do it fast. Follow the rules, run the checks, deliver quality.

**ASK LESS, DO MORE**: Only ask when genuinely ambiguous. These instructions, skills, and agents give you everything needed to complete most tasks independently.

---

**Made with ❤️ for CIA Compliance Manager v1.0** | [Hack23 AB](https://www.hack23.com) | Rule-Based Excellence
