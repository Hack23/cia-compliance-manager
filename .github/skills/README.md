# 🎓 GitHub Copilot Skills for CIA Compliance Manager

## Overview

This directory contains **GitHub Copilot Skills** - strategic, high-level principles that guide all development activities in the CIA Compliance Manager project. These skills represent Hack23 AB's commitment to security by design, code quality excellence, and ISMS compliance.

Skills are **rule-based**, **strategic**, and **security-focused** guidelines that all custom agents and developers must follow. They complement our [custom agents](../agents/) by providing foundational principles and best practices.

## 📚 Available Skills

### 🔐 Security by Design
**File:** `security-by-design.md`

Strategic security principles that must be built into every phase of development.

**Core Principles:**
- Threat modeling before coding
- Defense in depth
- Principle of least privilege
- Secure by default
- Never trust user input
- Fail securely

**Key Rules:**
- ✅ **MUST**: Validate all user inputs
- ✅ **MUST**: Use proven cryptographic libraries
- ✅ **MUST**: Never hardcode secrets
- ✅ **MUST**: Encrypt sensitive data
- ✅ **MUST**: Test security controls

**Use Cases:**
- Implementing authentication/authorization
- Handling sensitive data
- Designing secure APIs
- Security code reviews
- Threat modeling sessions

---

### ✨ Code Quality Excellence  
**File:** `code-quality-excellence.md`

Comprehensive code quality standards ensuring reusability, type safety, and maintainability.

**Core Principles:**
- Code reusability (CRITICAL priority)
- Strict TypeScript typing (no `any`)
- Single responsibility principle
- Immutability and const correctness
- Performance optimization
- Comprehensive documentation

**Key Rules:**
- ✅ **MUST**: Check for existing code before creating new
- ✅ **MUST**: Explicit types everywhere (no `any`)
- ✅ **MUST**: JSDoc for public APIs
- ✅ **MUST**: 80%+ test coverage
- ✅ **MUST**: Functions < 50 lines

**Use Cases:**
- Writing new components/utilities
- Code reviews
- Refactoring
- Type definition creation
- Performance optimization

---

### 🛡️ ISMS Compliance
**File:** `isms-compliance.md`

Ensures alignment with Hack23 AB's ISMS framework and compliance with ISO 27001:2022, NIST CSF 2.0, CIS Controls v8, and other frameworks.

**Core Principles:**
- Secure development lifecycle
- Vulnerability management
- Code review standards
- Change management
- Continuous compliance

**Key Rules:**
- ✅ **MUST**: Follow secure development lifecycle
- ✅ **MUST**: Document security architecture
- ✅ **MUST**: Remediate vulnerabilities per SLA
- ✅ **MUST**: All code reviewed for security
- ✅ **MUST**: Map features to compliance frameworks

**Use Cases:**
- Implementing security controls
- Compliance framework mapping
- Security architecture documentation
- Vulnerability remediation
- Audit preparation

---

### 🧪 Testing Excellence
**File:** `testing-excellence.md`

Comprehensive testing strategy ensuring quality through unit, integration, and E2E tests.

**Core Principles:**
- Testing pyramid (70% unit, 20% integration, 10% E2E)
- 80%+ coverage minimum
- Behavior-focused testing
- FIRST principles (Fast, Independent, Repeatable, Self-validating, Timely)
- AAA pattern (Arrange-Act-Assert)

**Key Rules:**
- ✅ **MUST**: 80% overall coverage
- ✅ **MUST**: 100% coverage for security-critical paths
- ✅ **MUST**: All tests pass before merge
- ✅ **MUST**: Test accessibility
- ✅ **MUST**: No flaky tests

**Use Cases:**
- Writing unit tests
- Component testing
- Integration testing
- E2E workflow testing
- Test coverage improvement

---

### ⚡ Performance Optimization
**File:** `performance-optimization.md`

Strategic performance optimization techniques for React and TypeScript applications.

**Core Principles:**
- React performance (memo, useMemo, useCallback)
- Bundle size optimization
- Efficient data structures
- Virtualization for large lists
- Debounce and throttle
- Avoid prop drilling

**Key Rules:**
- ✅ **MUST**: Use React.memo() for expensive components
- ✅ **MUST**: Lazy load non-critical components
- ✅ **MUST**: Use Map/Set for frequent lookups
- ✅ **MUST**: Virtualize lists with > 100 items
- ✅ **MUST**: Debounce search/filter inputs

**Use Cases:**
- Optimizing slow components
- Reducing bundle size
- Improving render performance
- Optimizing data operations
- Performance audits

---

### 🎨 UI/UX Design System
**File:** `ui-ux-design-system.md`

Comprehensive design system standards for consistent, accessible, and intuitive user interfaces.

**Core Principles:**
- Design system consistency (colors, typography, spacing)
- Component library usage
- Responsive design (mobile-first)
- Accessibility (WCAG 2.1 AA)
- Visual hierarchy
- User-centric patterns

**Key Rules:**
- ✅ **MUST**: Use design system colors from constants
- ✅ **MUST**: Follow 8px spacing grid
- ✅ **MUST**: Reuse existing components
- ✅ **MUST**: Test on mobile, tablet, desktop
- ✅ **MUST**: Maintain 4.5:1 contrast for text

**Use Cases:**
- Building new UI components
- Implementing responsive layouts
- Ensuring visual consistency
- Designing accessible interfaces
- Creating user-friendly experiences

---

### ♿ Accessibility Excellence
**File:** `accessibility-excellence.md`

WCAG 2.1 Level AA compliance standards ensuring inclusive experiences for all users.

**Core Principles:**
- Semantic HTML
- ARIA attributes (when needed)
- Keyboard navigation
- Focus management
- Color and contrast
- Form accessibility
- Screen reader support

**Key Rules:**
- ✅ **MUST**: Use semantic HTML elements
- ✅ **MUST**: All interactive elements keyboard accessible
- ✅ **MUST**: 4.5:1 contrast for text
- ✅ **MUST**: Label all form inputs
- ✅ **MUST**: Announce dynamic content

**Use Cases:**
- Building accessible components
- Implementing keyboard navigation
- Creating accessible forms
- Testing with screen readers
- Accessibility audits

---

### 📝 Documentation Standards
**File:** `documentation-standards.md`

Documentation standards for code, APIs, and architecture ensuring clarity and maintainability.

**Core Principles:**
- JSDoc for all public APIs
- Type documentation
- Component documentation
- Architecture documentation (C4 model)
- Mermaid diagrams
- README maintenance

**Key Rules:**
- ✅ **MUST**: JSDoc for all exported functions/classes/interfaces
- ✅ **MUST**: Include usage examples
- ✅ **MUST**: Document parameters and return values
- ✅ **MUST**: Use C4 model for architecture
- ✅ **MUST**: Keep READMEs current

**Use Cases:**
- Documenting new APIs
- Creating architecture diagrams
- Writing component documentation
- Maintaining READMEs
- Generating API references

---

### 🎯 Product Quality Analysis
**File:** `product-quality-analysis.md`

Framework for comprehensive product quality analysis across all dimensions.

**Core Principles:**
- Multi-dimensional quality assessment
- Code quality analysis
- User experience evaluation
- Security and ISMS compliance
- Issue prioritization
- Continuous quality monitoring

**Key Rules:**
- ✅ **MUST**: Assess all four quality dimensions
- ✅ **MUST**: Prioritize security and critical bugs
- ✅ **MUST**: Consider user impact
- ✅ **MUST**: Track metrics over time
- ✅ **MUST**: Create actionable issues

**Use Cases:**
- Conducting product audits
- Quality gate enforcement
- Issue prioritization
- Trend analysis
- Continuous improvement

---

### 🤖 GitHub Agentic Workflows
**File:** `github-agentic-workflows.md`

Comprehensive guide for creating, securing, and operating GitHub Agentic Workflows that enable Continuous AI through secure, defensible, and auditable automation.

**Core Principles:**
- Continuous AI (systematic AI automation)
- Agency with control (AI decisions within boundaries)
- Defense-in-depth security
- Safe outputs pattern (read-only AI, validated execution)
- Model Context Protocol (MCP) integration
- OWASP Top 10 for Agentic Applications 2026 compliance

**Key Rules:**
- ✅ **MUST**: Use safe outputs pattern (no write permissions for AI)
- ✅ **MUST**: Enable threat detection
- ✅ **MUST**: Use network controls
- ✅ **MUST**: Validate all inputs
- ✅ **MUST**: Follow least-privilege principle
- ✅ **MUST**: Implement audit logging
- ✅ **MUST**: Protect secrets
- ✅ **MUST**: Test workflows in isolation
- ✅ **MUST**: Follow OWASP Top 10 for Agentic Applications
- ✅ **MUST**: Document threat models

**Use Cases:**
- Automated issue triage (IssueOps)
- PR code review assistance
- Daily documentation improvements (DailyOps)
- Interactive slash commands (ChatOps)
- Project board automation (ProjectOps)
- Security scanning and analysis
- Trend analysis and reporting (MemoryOps)
- Multi-repository coordination

---

### 🏗️ C4 Architecture Documentation
**File:** `c4-architecture-documentation.md`

Defines the complete C4 architecture documentation portfolio required for all Hack23 projects.

**Core Principles:**
- C4 model methodology (Context, Container, Component views)
- Current AND future state documentation
- Security architecture with trust boundaries
- Mermaid diagrams for all visualizations

**Key Rules:**
- ✅ **MUST**: Maintain ARCHITECTURE.md and FUTURE_ARCHITECTURE.md
- ✅ **MUST**: Maintain SECURITY_ARCHITECTURE.md and FUTURE_SECURITY_ARCHITECTURE.md
- ✅ **MUST**: Maintain DATA_MODEL.md, FLOWCHART.md, STATEDIAGRAM.md, MINDMAP.md, SWOT.md
- ✅ **MUST**: Use Mermaid for all diagrams
- ✅ **MUST**: Include defense-in-depth layers in security docs

**Use Cases:**
- Architecture planning and documentation
- Security architecture reviews
- C4 diagram creation
- Future state roadmapping

---

### 🔄 Operations & Resilience
**File:** `operations-resilience.md`

Covers change management, backup/recovery, business continuity, disaster recovery, and incident response.

**Core Principles:**
- Risk-controlled change processes
- Business impact-driven data protection
- Multi-zone deployment and failover
- Incident response lifecycle

**Key Rules:**
- ✅ **MUST**: Follow Change Advisory Board governance
- ✅ **MUST**: Align RTO/RPO with business impact
- ✅ **MUST**: Follow incident severity SLAs (Critical 24h, High 7d, Medium 30d, Low 90d)
- ✅ **SHOULD**: Test DR plans quarterly

**Use Cases:**
- Change management decisions
- Incident handling
- Backup/recovery planning
- Business continuity planning

---

### 🏷️ Classification & Access Control
**File:** `classification-framework.md`

Data classification, access control, cryptography, and secrets management.

**Core Principles:**
- 4-level classification (Public, Internal, Confidential, Restricted)
- Least privilege access control
- Approved cryptographic algorithms
- Secret scanning and rotation

**Key Rules:**
- ✅ **MUST**: Classify all data before storage/processing
- ✅ **MUST**: Apply RBAC with least privilege
- ✅ **MUST**: Use AES-256/RSA-2048+ for encryption
- ✅ **MUST**: Never hardcode secrets

**Use Cases:**
- Data handling decisions
- Authentication/authorization design
- Encryption implementation
- Secrets management

---

### 📊 Risk Assessment
**File:** `risk-assessment.md`

Risk assessment frameworks, risk register management, and vulnerability management.

**Core Principles:**
- Quantified risk analysis (5x5 matrix)
- Treatment planning (Accept, Mitigate, Transfer, Avoid)
- Supply chain risk assessment
- Quarterly risk reviews

**Key Rules:**
- ✅ **MUST**: Use 5x5 risk matrix
- ✅ **MUST**: Maintain risk register
- ✅ **MUST**: Follow vulnerability SLAs
- ✅ **SHOULD**: Assess third-party risks

**Use Cases:**
- Risk assessments
- Vulnerability triage
- Compliance audits
- Supplier evaluations

---

### 🔌 MCP Server Integration
**File:** `mcp-server-integration.md`

Model Context Protocol server configuration, Copilot coding agent tools, and agent patterns.

**Core Principles:**
- Secrets-based authentication
- Canonical GitHub MCP configuration
- Copilot coding agent integration
- Stacked PRs and task chaining

**Key Rules:**
- ✅ **MUST**: Use secrets for MCP authentication
- ✅ **MUST**: Configure both GITHUB_TOKEN and GITHUB_PERSONAL_ACCESS_TOKEN
- ✅ **SHOULD**: Use Insiders API endpoint
- ✅ **SHOULD**: Document base_ref and custom_instructions usage

**Use Cases:**
- MCP server configuration
- Custom agent development
- Copilot workflow automation
- Multi-step task orchestration

---

### 🏛️ Governance & Management
**File:** `governance-management.md`

Asset management, supplier/vendor management, stakeholder governance, and policy lifecycle.

**Core Principles:**
- IT asset inventory and classification
- Vendor security assessment
- Evidence-based compliance
- Policy lifecycle management

**Key Rules:**
- ✅ **MUST**: Maintain IT asset inventory
- ✅ **MUST**: Assess vendor security before onboarding
- ✅ **MUST**: Collect audit evidence
- ✅ **SHOULD**: Review policies on defined cycles

**Use Cases:**
- Vendor evaluations
- Asset tracking
- Policy governance
- Audit preparation

---

## 🎯 How Skills Work

### Skills vs. Agents

| Aspect | Skills | Custom Agents |
|--------|--------|---------------|
| **Purpose** | Strategic principles & rules | Specialized task execution |
| **Scope** | Project-wide guidelines | Domain-specific expertise |
| **Format** | Rule-based best practices | Actionable agent instructions |
| **Application** | Referenced by agents & developers | Invoked directly for tasks |
| **Focus** | "What" and "Why" | "How" to implement |

**Example Flow:**
```
Developer wants to add authentication
↓
1. References "Security by Design" skill → Learns threat modeling required
2. References "ISMS Compliance" skill → Maps to ISO 27001 Control 8.5
3. References "Code Quality Excellence" skill → Checks for existing auth utilities
4. Invokes "@security-compliance-agent" → Implements with skill guidance
5. References "Testing Excellence" skill → Writes 100% coverage security tests
```

### Skills Hierarchy

```
Strategic Level (Skills)
↓
Tactical Level (Agents)
↓
Operational Level (Code)
```

Skills provide the strategic direction, agents implement tactically, and developers write the operational code—all in alignment.

### Agent-Skill Mapping

Which skills should each agent follow?

| Agent | Primary Skills | Supporting Skills |
|-------|---------------|-------------------|
| **TypeScript React Agent** | Code Quality Excellence, UI/UX Design System | Performance Optimization, Accessibility Excellence |
| **Testing Agent** | Testing Excellence | Code Quality Excellence, Accessibility Excellence |
| **Code Review Agent** | Code Quality Excellence, Security by Design | Performance Optimization, Accessibility Excellence, ISMS Compliance |
| **Documentation Agent** | Documentation Standards, C4 Architecture Documentation | Code Quality Excellence, UI/UX Design System |
| **Security Compliance Agent** | Security by Design, ISMS Compliance, Classification & Access Control | Risk Assessment, Threat Modeling, Data Protection |
| **Product Task Agent** | Product Quality Analysis, GitHub Agentic Workflows, MCP Server Integration | All skills (holistic assessment) |
| **DevOps/Automation Agents** | GitHub Agentic Workflows, Operations & Resilience, Security by Design | ISMS Compliance, Testing Excellence |

**All agents should be aware of all skills, but prioritize their primary skills.**

## 📖 Using Skills in Development

### For Developers

**Before Starting Work:**
1. Read relevant skill(s) for your task
2. Understand the mandatory rules (MUST)
3. Note the recommended practices (SHOULD, MAY)
4. Check examples and anti-patterns

**During Development:**
1. Reference skill rules as checklist
2. Ensure code aligns with principles
3. Document compliance in PR description

**Example PR Description:**
```markdown
## Changes
Implemented user authentication feature

## Skills Compliance
- ✅ **Security by Design**: Threat model documented, MFA supported
- ✅ **Code Quality Excellence**: Reused existing auth utilities, 90% coverage
- ✅ **ISMS Compliance**: Mapped to ISO 27001 Control 8.5
- ✅ **Testing Excellence**: 100% security path coverage
```

### For Custom Agents

Agents should **internalize and enforce** these skills. Each agent should reference relevant skills in their instructions.

**Example Agent Integration:**
```markdown
## Your Expertise
You are a security expert who:
- Enforces **Security by Design** skill principles
- Validates **ISMS Compliance** skill requirements
- Applies threat modeling before implementation
- Ensures code meets all MUST rules from skills
```

### For Code Reviews

Reviewers should validate that code changes comply with relevant skills.

**Review Checklist:**
```
Security by Design:
□ Threat model documented?
□ Input validation implemented?
□ Security tests included?

Code Quality Excellence:
□ Existing code reused?
□ No 'any' types?
□ JSDoc on public APIs?
□ 80%+ test coverage?

ISMS Compliance:
□ Security architecture updated?
□ Compliance framework mapped?
□ Vulnerabilities checked?

Testing Excellence:
□ AAA pattern used?
□ Accessibility tested?
□ No flaky tests?
```

## 🔧 Skill Updates

### When to Update a Skill

Skills should be updated when:
- New security best practices emerge
- Compliance frameworks are updated
- Team learns from security incidents
- New tools/technologies adopted
- Patterns prove ineffective

### How to Update a Skill

1. **Propose Changes**: Create issue describing needed update
2. **Review Impact**: Assess how change affects existing code
3. **Update Skill**: Edit skill markdown file
4. **Update Agents**: Update agent instructions referencing skill
5. **Communicate**: Announce changes to team
6. **Validate**: Ensure new code follows updated skill

## 🎓 Skill Best Practices

### For Skill Authors

**DO ✅:**
- Keep skills strategic and high-level
- Use clear examples and anti-patterns
- Define MUST, SHOULD, MAY rules clearly
- Reference authoritative sources
- Keep skills focused on principles, not implementation details

**DON'T ❌:**
- Make skills too prescriptive (leave room for judgment)
- Include code that becomes outdated quickly
- Contradict other skills
- Make rules without rationale
- Forget to update agents when skills change

### For Skill Users

**DO ✅:**
- Read entire skill before starting work
- Ask questions if rules are unclear
- Propose improvements based on experience
- Reference skills in discussions
- Use skills as learning resources

**DON'T ❌:**
- Skip reading skills ("too long")
- Follow blindly without understanding
- Ignore MUST rules without discussion
- Assume skills are optional
- Create exceptions without documenting

## 📊 Skill Compliance Metrics

Track these metrics to ensure skill adoption:

**Code Quality Metrics:**
- TypeScript strict mode compliance: 100%
- Test coverage: 80%+ overall
- Code reusability violations: < 5 per quarter
- ESLint violations: 0 errors

**Security Metrics:**
- Critical/High vulnerabilities: 0
- Security test coverage: 100% for auth/data paths
- Threat models documented: 100% for sensitive features
- Security incidents: 0

**Compliance Metrics:**
- SECURITY_ARCHITECTURE.md current: Yes
- Compliance mappings documented: 100%
- Vulnerability remediation SLA: Met
- Code review completion: 100%

**Testing Metrics:**
- Test coverage: 80%+
- Flaky test rate: < 1%
- E2E test coverage for critical paths: 100%
- Test execution time: < 5 minutes

## 🔗 Related Resources

### Hack23 AB Resources
- [ISMS-PUBLIC Repository](https://github.com/Hack23/ISMS-PUBLIC)
- [Secure Development Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md)
- [Vulnerability Management](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Vulnerability_Management.md)
- [Code Review Standards](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Code_Review_Standards.md)

### Framework Standards
- [ISO/IEC 27001:2022](https://www.iso.org/standard/27001)
- [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework)
- [CIS Controls v8](https://www.cisecurity.org/controls/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

### Technical Resources
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [React Documentation](https://react.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)

### Best Practice Collections
- [Anthropic Skills Repository](https://github.com/anthropics/skills)
- [Awesome GitHub Copilot](https://github.com/github/awesome-copilot)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)

## 💡 Examples in Action

### Example 1: Implementing New Feature

**Task**: Add password reset functionality

**Skill Application**:

1. **Security by Design**:
   ```
   - Threat model: Password reset token hijacking, timing attacks
   - Controls: Secure token generation, rate limiting, token expiry
   - Tests: Security test for token validation
   ```

2. **Code Quality Excellence**:
   ```
   - Reuse: Existing email service, token utilities
   - Types: Explicit PasswordResetToken interface
   - Coverage: 90% including error cases
   ```

3. **ISMS Compliance**:
   ```
   - Framework: ISO 27001 Control 8.5 (Secure authentication)
   - Documentation: Update SECURITY_ARCHITECTURE.md
   - Audit: Log password reset attempts
   ```

4. **Testing Excellence**:
   ```
   - Unit tests: Token generation/validation
   - Integration: Email sending flow
   - E2E: Complete password reset workflow
   ```

### Example 2: Code Review Finding

**Finding**: Duplicate color utility function

**Skill Violation**: Code Quality Excellence - Reusability

**Resolution**:
```typescript
// ❌ Before: Duplicate code
function getSecurityLevelColor(level: string): string {
  switch (level) {
    case 'critical': return '#D32F2F';
    case 'high': return '#FF9800';
    default: return '#4CAF50';
  }
}

// ✅ After: Using existing utility
import { getColorForSecurityLevel } from '@/utils/colorUtils';

const color = getColorForSecurityLevel(securityLevel);
```

**PR Comment**:
```
Violates "Code Quality Excellence" skill - Section 1 (Code Reusability).
Please use existing `getColorForSecurityLevel()` from `src/utils/colorUtils.ts`.
This ensures consistency and reduces maintenance burden.
```

## 🚀 Getting Started

### For New Team Members

1. **Read Skills**: Start with Security by Design, then Code Quality Excellence
2. **Review Examples**: Study examples in each skill
3. **Ask Questions**: Clarify unclear rules with team
4. **Practice**: Apply skills to small tasks first
5. **Iterate**: Learn from code reviews

### For Experienced Developers

1. **Refresh Knowledge**: Re-read skills periodically
2. **Share Insights**: Propose skill improvements
3. **Mentor Others**: Help new team members understand skills
4. **Enforce Standards**: Reference skills in code reviews
5. **Lead by Example**: Demonstrate skill application

## ❓ FAQ

**Q: Are skills optional?**
A: No. Skills marked with MUST are mandatory. SHOULD is strongly recommended. MAY is optional.

**Q: What if a skill conflicts with project constraints?**
A: Discuss with team. Document exception with rationale in ADR (Architecture Decision Record).

**Q: How do skills relate to custom agents?**
A: Skills provide strategic principles. Agents apply those principles when executing tasks.

**Q: Can skills be updated?**
A: Yes. Propose changes via issue/PR. Update requires team review and approval.

**Q: What if I disagree with a skill rule?**
A: Propose an improvement via issue. Provide rationale and alternative approach.

## 📞 Support

**Questions or Feedback?**
- Open an issue: [cia-compliance-manager/issues](https://github.com/Hack23/cia-compliance-manager/issues)
- Discuss with team: [GitHub Discussions](https://github.com/Hack23/cia-compliance-manager/discussions)
- Review ISMS policies: [ISMS-PUBLIC](https://github.com/Hack23/ISMS-PUBLIC)

---

**Made with ❤️ for CIA Compliance Manager** | [Hack23 AB](https://www.hack23.com) | Security by Design, Quality by Default
