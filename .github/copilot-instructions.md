# 🤖 GitHub Copilot Instructions for CIA Compliance Manager

**Version**: 3.0 | **Package**: v1.1.43 | **Stack**: TypeScript 6.0.2, React 19.x, Vite 8, Node >=26, ES2025

---

## 🎯 Core Philosophy

**DO MORE, ASK LESS**: Make decisions autonomously following these rules. Only ask when genuinely ambiguous.

**RULE-BASED EXECUTION**: MUST rules are non-negotiable. SHOULD rules require justification to skip. MAY rules are best practices.

**SKILLS-FIRST**: Before ANY code change, consult `.github/skills/`.

---

## 📚 Foundational Skills

Before ANY code change, consult these skills in `.github/skills/`:

### 🔐 1. Security by Design (MANDATORY)
- ✅ **MUST**: Threat model for sensitive operations
- ✅ **MUST**: Validate ALL user inputs at boundaries
- ✅ **MUST**: Defense in depth, never hardcode secrets
- ✅ **MUST**: Security tests for security-critical paths

### ✨ 2. Code Quality Excellence (CRITICAL)
- ✅ **MUST**: Check existing code BEFORE creating new
- ✅ **MUST**: No `any` types — use explicit types or `unknown`
- ✅ **MUST**: All functions have explicit return types + JSDoc
- ✅ **MUST**: 80%+ test coverage, functions < 50 lines
- ✅ **SHOULD**: Prefer immutability (`const`, `readonly`), use utility types

**Reusable Code** (CHECK FIRST):
```
src/types/       - cia.ts, businessImpact.ts, widgets.ts, compliance.ts, widget-props.ts
src/constants/   - securityLevels.ts, businessConstants.ts, appConstants.ts, testIds.ts
src/utils/       - securityLevelUtils.ts, riskUtils.ts, formatUtils.ts, typeGuards.ts, colorUtils.ts
src/services/    - ciaContentService.ts, businessImpactService.ts, complianceService.ts, BaseService.ts
src/components/  - common/*, charts/*, widgets/*
```

### 🛡️ 3. ISMS Compliance (MANDATORY)
- ✅ **MUST**: Follow secure development lifecycle
- ✅ **MUST**: Map features to ISO 27001, NIST CSF, CIS Controls
- ✅ **MUST**: Vulnerability SLA (Critical: 24h, High: 7d, Medium: 30d, Low: 90d)

### 🧪 4. Testing Excellence (MANDATORY)
- ✅ **MUST**: 80%+ coverage, 100% for security-critical paths
- ✅ **MUST**: Testing pyramid (70% unit, 20% integration, 10% E2E)
- ✅ **MUST**: AAA pattern, no flaky tests, all tests pass
- Tools: Vitest 4.x (unit/integration), Cypress 15.x (E2E)

### ⚡ 5. Performance (IMPORTANT)
- ✅ **MUST**: React.memo() for expensive components, lazy load non-critical
- ✅ **SHOULD**: useMemo/useCallback appropriately, monitor bundle size

### 🎨 6. UI/UX Design System (IMPORTANT)
- ✅ **MUST**: Design system colors from constants, 8px grid, reuse components

### ♿ 7. Accessibility (IMPORTANT)
- ✅ **MUST**: Semantic HTML, keyboard accessible, 4.5:1 contrast, aria-live

### 📝 8. Documentation (IMPORTANT)
- ✅ **MUST**: JSDoc for all exports, usage examples, C4 architecture model

### Additional Skills
- **C4 Architecture**: `.github/skills/c4-architecture-documentation.md`
- **Operations & Resilience**: `.github/skills/operations-resilience.md`
- **Classification**: `.github/skills/classification-framework.md`
- **Risk Assessment**: `.github/skills/risk-assessment.md`
- **MCP Integration**: `.github/skills/mcp-server-integration.md`
- **Governance**: `.github/skills/governance-management.md`
- **Agentic Workflows**: `.github/skills/github-agentic-workflows.md`
- **Product Quality**: `.github/skills/product-quality-analysis.md`

---

## 🚨 Enforcement Rules

### MUST (Block PR if Violated)

**Code Quality**: No `any` types · Explicit return types · Check existing code first · 80%+ coverage · All tests pass

**Security**: Validate all inputs · No hardcoded secrets · Encrypt sensitive data · Error messages never leak info · Security tests for critical paths

**Testing**: 100% coverage for security-critical paths · No skipped tests without justification · All tests deterministic

**Documentation**: JSDoc for public APIs · Update docs when changing functionality · README current

### SHOULD (Justify if Not Followed)

Functions < 50 lines · Immutability · Utility types · React.memo() · Threat models · Accessibility tests · Architecture diagrams

### MAY (Best Practice)

Performance benchmarks · Code complexity tracking · Bundle size analysis · Mutation testing · Visual regression tests

---

## 🏗️ Tech Stack

| Component | Version | Notes |
|-----------|---------|-------|
| TypeScript | 6.0.2 | ES2025 target, strict mode, ESNext modules |
| React | 19.x | Component library with hooks |
| Vite | 8.x | Build tool + dev server with CSP headers |
| Node.js | ≥26.0.0 | Runtime requirement |
| Vitest | 4.x | Unit/integration testing |
| Cypress | 15.x | E2E testing |
| ESLint | 10.x | Flat config (`eslint.config.js`) |
| Knip | 6.x | Dead code detection |
| TailwindCSS | 4.x | Utility-first CSS |

**Package**: ES module npm library with 10 subpath exports (types, services, hooks, utils, components (including `components/widgets`), constants, data, contexts).

---

## 💻 Development Workflow

### Before Writing Code
1. Read issue/requirement fully
2. **Check reusable code** (CRITICAL) — search `src/types/`, `src/utils/`, `src/services/`
3. Apply skills framework
4. Plan minimal changes

### Before Committing (MANDATORY)
```bash
npm run lint              # Fix all errors
npm run test              # All tests pass
npm run test:coverage     # Coverage ≥ 80%
npm run build             # Build succeeds (includes TypeScript strict checks)
```

---

## 🤖 Custom Agents

| Task | Agent | Use When |
|------|-------|----------|
| TypeScript/React | `@typescript-react-agent` | Components, hooks, types |
| Tests | `@testing-agent` | Unit, integration, E2E tests |
| Code review | `@code-review-agent` | PR review, quality/security |
| Documentation | `@documentation-agent` | Docs, diagrams, API docs |
| Security | `@security-compliance-agent` | Security reviews, ISMS mapping |
| Product | `@product-task-agent` | Issue creation, quality coordination |

---

## 📝 File Creation Policy

**NEVER** create files unless: explicitly asked, test files for new code, or required by framework.
**DO NOT** create: planning docs, temp markdown, TODO lists, summaries.
**ALWAYS**: Check if existing file can be updated instead.

---

## 📚 Quick Reference

**Skills**: `.github/skills/README.md` · **Agents**: `.github/agents/README.md` · **Security**: `SECURITY.md` · **ISMS**: `ISMS_IMPLEMENTATION_GUIDE.md`

**External**: [Hack23 ISMS](https://github.com/Hack23/ISMS-PUBLIC) · [ISO 27001](https://www.iso.org/standard/27001) · [NIST CSF 2.0](https://www.nist.gov/cyberframework) · [CIS Controls v8](https://www.cisecurity.org/controls/)

---

## 🎯 Remember

**YOU ARE EMPOWERED TO ACT** · **SKILLS → AGENTS → CODE** · **QUALITY OVER SPEED** · **ASK LESS, DO MORE**

---

**Made with ❤️ for CIA Compliance Manager** | [Hack23 AB](https://www.hack23.com)
