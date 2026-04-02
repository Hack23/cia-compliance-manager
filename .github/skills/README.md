# 📚 Skills Framework for CIA Compliance Manager

Strategic, rule-based skills that guide all Copilot agents and development in the **CIA Compliance Manager** project.

## What Are Skills?

Skills are **strategic principles** (the *what* and *why*) that define rules for code quality, security, testing, and compliance. They are rule-based documents using a MUST/SHOULD/MAY hierarchy that all agents and developers follow.

**Key distinction**: Skills define *what to do* (principles). Agents define *how to do it* (execution).

| Aspect | Skills | Agents |
|--------|--------|--------|
| **Level** | Strategic — high-level principles | Tactical — task execution |
| **Scope** | Cross-cutting, apply everywhere | Domain-specific focus |
| **Content** | Rules (MUST/SHOULD/MAY) | Instructions for specific tasks |
| **Location** | `.github/skills/` | `.github/agents/` |
| **Example** | "MUST validate all inputs" | "When reviewing code, check input validation" |

### How Skills Work

1. **Before code changes**: Developer or agent consults relevant skills
2. **During implementation**: Skills rules guide decisions (no `any` types, 80%+ coverage, etc.)
3. **Before commit**: Skills checklist validates compliance
4. **During review**: Reviewers check against skill rules

## Available Skills

### Core Development Skills

| Priority | Skill | File | Focus |
|----------|-------|------|-------|
| 🔴 MANDATORY | 🔐 Security by Design | [security-by-design.md](security-by-design.md) | Threat modeling, input validation, defense in depth |
| 🔴 CRITICAL | ✨ Code Quality Excellence | [code-quality-excellence.md](code-quality-excellence.md) | No `any`, reusability, explicit types, 80%+ coverage |
| 🔴 MANDATORY | 🛡️ ISMS Compliance | [isms-compliance.md](isms-compliance.md) | ISO 27001, NIST CSF, CIS Controls, secure SDLC |
| 🔴 MANDATORY | 🧪 Testing Excellence | [testing-excellence.md](testing-excellence.md) | Vitest/Cypress, AAA pattern, testing pyramid |
| 🟠 IMPORTANT | ⚡ Performance Optimization | [performance-optimization.md](performance-optimization.md) | React.memo, lazy loading, bundle size |
| 🟠 IMPORTANT | 🎨 UI/UX Design System | [ui-ux-design-system.md](ui-ux-design-system.md) | Design tokens, 8px grid, responsive |
| 🟠 IMPORTANT | ♿ Accessibility Excellence | [accessibility-excellence.md](accessibility-excellence.md) | WCAG 2.1 AA, semantic HTML, keyboard nav |
| 🟠 IMPORTANT | 📝 Documentation Standards | [documentation-standards.md](documentation-standards.md) | JSDoc, Mermaid, C4 model |
| 🟡 ADVISORY | 🎯 Product Quality Analysis | [product-quality-analysis.md](product-quality-analysis.md) | Multi-dimensional quality assessment |

### Architecture & Compliance Skills

| Priority | Skill | File | Focus |
|----------|-------|------|-------|
| 🔴 MANDATORY | 🏗️ C4 Architecture | [c4-architecture-documentation.md](c4-architecture-documentation.md) | Current + future state docs |
| 🟠 IMPORTANT | 🔄 Operations & Resilience | [operations-resilience.md](operations-resilience.md) | Change management, incident response |
| 🟠 IMPORTANT | 🏷️ Classification Framework | [classification-framework.md](classification-framework.md) | Data classification, access control |
| 🟠 IMPORTANT | 📊 Risk Assessment | [risk-assessment.md](risk-assessment.md) | 5x5 risk matrix, vulnerability SLAs |
| 🟡 ADVISORY | 🔌 MCP Server Integration | [mcp-server-integration.md](mcp-server-integration.md) | MCP config, Copilot tools |
| 🟡 ADVISORY | 🏛️ Governance & Management | [governance-management.md](governance-management.md) | Asset inventory, vendor management |

### Specialized Skills

| Priority | Skill | File | Focus |
|----------|-------|------|-------|
| 🟡 ADVISORY | 🤖 GitHub Agentic Workflows | [github-agentic-workflows.md](github-agentic-workflows.md) | gh-aw, Continuous AI, safe outputs |
| 🟡 ADVISORY | 🌐 Open Source Governance | [open-source-governance.md](open-source-governance.md) | License compliance, community |
| 🟡 ADVISORY | 🤖 AI Governance | [ai-governance.md](ai-governance.md) | AI policy, responsible AI |
| 🟡 ADVISORY | 📋 Compliance Frameworks | [compliance-frameworks.md](compliance-frameworks.md) | Multi-framework mapping |
| 🟡 ADVISORY | 🔒 Data Protection | [data-protection.md](data-protection.md) | GDPR, data handling |
| 🟡 ADVISORY | 🎯 Threat Modeling | [threat-modeling.md](threat-modeling.md) | STRIDE, threat analysis |

## Rule Hierarchy

Skills use MUST/SHOULD/MAY enforcement:

| Level | Meaning | Enforcement |
|-------|---------|-------------|
| **MUST** | Non-negotiable requirement | Block PR if violated |
| **SHOULD** | Strongly recommended | Justify if skipped |
| **MAY** | Best practice | Optional |

## Quick Start

1. **Before any code change**: Check relevant skills for rules
2. **ALWAYS check reusability**: Search `src/types/`, `src/utils/`, `src/services/` before creating new code
3. **Run checks**: `npm run lint && npm run type-check && npm run test && npm run build`
4. **Verify compliance**: No `any` types, 80%+ coverage, JSDoc for public APIs

## Related

- **Agents**: `.github/agents/README.md`
- **Instructions**: `.github/copilot-instructions.md`
- **ISMS**: [Hack23 ISMS Public](https://github.com/Hack23/ISMS-PUBLIC)

---

**Made with ❤️ for CIA Compliance Manager** | [Hack23 AB](https://www.hack23.com)
