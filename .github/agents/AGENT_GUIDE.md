# 🤖 Custom Agent Usage Guide

**Version:** 1.0 | **Last Updated:** 2025-01-16 | **Owner:** Development Team

This guide provides comprehensive information on effectively using GitHub Copilot custom agents in the CIA Compliance Manager project.

---

## 📋 Table of Contents

1. [Overview](#-overview)
2. [Agent Roster](#-agent-roster)
3. [Usage Patterns](#-usage-patterns)
4. [Agent Selection Matrix](#-agent-selection-matrix)
5. [Workflow Examples](#-workflow-examples)
6. [Best Practices](#-best-practices)
7. [Troubleshooting](#-troubleshooting)
8. [Validation & Maintenance](#-validation--maintenance)

---

## 🎯 Overview

### What Are Custom Agents?

Custom agents are specialized GitHub Copilot configurations that provide domain-specific expertise. Each agent:
- Has focused knowledge in a specific area
- Follows project-specific guidelines and standards
- Can use specialized tools for their domain
- Coordinates with other agents when needed

### Why Use Custom Agents?

✅ **Expertise**: Get specialized assistance from agents trained in specific domains  
✅ **Consistency**: All agents follow the same project standards and conventions  
✅ **Efficiency**: Direct your request to the right expert for faster, better results  
✅ **Quality**: Agents enforce best practices, code reusability, and ISMS compliance  
✅ **Coordination**: Product Task Agent orchestrates multiple agents for complex tasks

---

## 🤖 Agent Roster

### 🎯 Product Task Agent
**File:** `product-task-agent.md` | **Name:** `@product-task-agent`

**Role:** Strategic product coordinator and issue creator

**When to Use:**
- Conducting comprehensive product audits
- Creating structured GitHub issues
- Analyzing quality across multiple dimensions (code, UX, security)
- Coordinating improvements across the product
- ISMS compliance assessment

**Special Capabilities:**
- GitHub issue management (create, update, comment)
- Playwright UI/UX testing
- Multi-dimensional quality analysis
- Agent assignment recommendations
- ISMS policy mapping

**Example:**
```
@product-task-agent, conduct a comprehensive product audit and create 
prioritized issues for v1.0 release, focusing on bugs, stability, and test coverage.
```

---

### ⚛️ TypeScript React Agent
**File:** `typescript-react-agent.md` | **Name:** `@typescript-react-agent`

**Role:** TypeScript and React development specialist

**When to Use:**
- Creating or modifying React components
- Defining TypeScript types and interfaces
- Implementing state management with hooks
- Refactoring component code
- Ensuring type safety and code reusability

**Core Focus:**
- Strict TypeScript typing (no `any`)
- Code reusability enforcement
- Component best practices
- Performance optimization

**Example:**
```
@typescript-react-agent, create a new SecurityMetricsCard component that 
displays CIA metrics using existing types from src/types/cia.ts
```

---

### 🧪 Testing Agent
**File:** `testing-agent.md` | **Name:** `@testing-agent`

**Role:** Testing and quality assurance specialist

**When to Use:**
- Writing unit tests with Vitest
- Creating integration tests
- Building E2E tests with Cypress
- Improving test coverage
- Debugging failing tests

**Core Focus:**
- 80%+ test coverage
- Critical path testing (security, business logic)
- Test best practices (AAA pattern, proper mocking)
- Test ID usage from constants

**Example:**
```
@testing-agent, create comprehensive unit tests for the ComplianceService 
class including edge cases and error conditions
```

---

### 🔍 Code Review Agent
**File:** `code-review-agent.md` | **Name:** `@code-review-agent`

**Role:** Code quality and security reviewer

**When to Use:**
- Reviewing pull requests
- Identifying security vulnerabilities
- Assessing code reusability
- Performance optimization recommendations
- Accessibility compliance checks

**Core Focus:**
- Code reusability (CRITICAL priority)
- Type safety validation
- Security vulnerability detection
- Performance and accessibility

**Example:**
```
@code-review-agent, review the changes in src/components/widgets/ 
and identify any code reusability violations or security concerns
```

---

### 📝 Documentation Agent
**File:** `documentation-agent.md` | **Name:** `@documentation-agent`

**Role:** Technical documentation specialist

**When to Use:**
- Writing API documentation (JSDoc/TypeDoc)
- Creating architecture diagrams (Mermaid)
- Updating README and guides
- Documenting components and utilities
- Creating visual workflows

**Core Focus:**
- Clear, comprehensive documentation
- Mermaid diagram standards (colors, syntax)
- Icon consistency
- JSDoc best practices

**Example:**
```
@documentation-agent, create a sequence diagram showing the data flow 
from user input to compliance report generation
```

---

### 🔐 Security Compliance Agent
**File:** `security-compliance-agent.md` | **Name:** `@security-compliance-agent`

**Role:** Security and ISMS compliance expert

**When to Use:**
- Security code reviews
- ISMS policy alignment
- Compliance framework mapping (NIST, ISO 27001)
- Threat modeling
- Security control implementation

**Core Focus:**
- CIA triad principles
- Secure coding practices
- Compliance framework mapping
- Hack23 AB ISMS alignment

**Example:**
```
@security-compliance-agent, review the authentication implementation 
and map it to NIST 800-53 access control requirements
```

---

## 🎯 Agent Selection Matrix

| 🎯 **Task** | 🤖 **Primary Agent** | 🤝 **Supporting Agents** |
|------------|---------------------|-------------------------|
| **Create GitHub Issues** | Product Task Agent | All (for analysis) |
| **Product Audit** | Product Task Agent | All (coordinated) |
| **Build Component** | TypeScript React Agent | Testing Agent (for tests) |
| **Write Tests** | Testing Agent | TypeScript React Agent (for setup) |
| **Review PR** | Code Review Agent | Security Compliance (for security) |
| **Write Docs** | Documentation Agent | - |
| **Create Diagrams** | Documentation Agent | - |
| **Security Review** | Security Compliance Agent | Code Review Agent |
| **ISMS Mapping** | Security Compliance Agent | Documentation Agent |
| **Fix Bug** | TypeScript React Agent | Testing Agent (verify fix) |
| **UI/UX Issue** | Product Task Agent | TypeScript React + Testing |
| **Refactor Code** | TypeScript React Agent | Code Review Agent |

---

## 📖 Usage Patterns

### Pattern 1: Direct Agent Invocation

Address a specific agent directly in your prompt:

```
@typescript-react-agent, help me refactor the SecurityLevelBadge 
component to use the existing colorUtils from src/utils/colorUtils.ts
```

**When to Use:** You know exactly which agent you need.

---

### Pattern 2: Product-Led Coordination

Let the Product Task Agent analyze and coordinate:

```
@product-task-agent, analyze the dashboard components and create 
issues for any accessibility violations or code quality improvements
```

**When to Use:** Complex tasks requiring multiple perspectives or issue creation.

---

### Pattern 3: Multi-Agent Collaboration

Explicitly request multiple agents:

```
@typescript-react-agent, create the UserPreferencesForm component.
@testing-agent, create comprehensive tests for it including accessibility tests.
@documentation-agent, document the component with usage examples.
```

**When to Use:** You need multiple types of work done on the same feature.

---

### Pattern 4: Implicit Selection

Let GitHub Copilot select the agent based on context:

```
Create unit tests for the risk calculation utility with edge cases
```

**When to Use:** Your request is clear and context suggests the right agent (Testing Agent).

---

## 🔄 Workflow Examples

### Workflow 1: New Feature Development (v1.0 - Bug Fixes Only)

**Reminder:** v1.0 focus is on bugs and stability, not new features.

For bug fixes:

1. **Analyze the Bug**
   ```
   @product-task-agent, analyze the issue with incorrect risk calculations 
   in SecurityMetricsService and create a detailed GitHub issue
   ```

2. **Fix the Code**
   ```
   @typescript-react-agent, fix the risk calculation bug in 
   src/services/SecurityMetricsService.ts ensuring type safety
   ```

3. **Add Tests**
   ```
   @testing-agent, create regression tests for the risk calculation 
   fix to prevent this bug from recurring
   ```

4. **Review Changes**
   ```
   @code-review-agent, review the bug fix for security, performance, 
   and code reusability
   ```

5. **Update Docs**
   ```
   @documentation-agent, update the API documentation for 
   SecurityMetricsService with the corrected behavior
   ```

---

### Workflow 2: Quality Improvement Sprint

1. **Initial Assessment**
   ```
   @product-task-agent, conduct a quality audit focusing on test coverage, 
   code reusability, and accessibility
   ```

2. **Address Critical Issues**
   ```
   (Product Task Agent creates prioritized issues)
   
   For each issue, use the suggested agent:
   @typescript-react-agent (for code issues)
   @testing-agent (for test coverage)
   @security-compliance-agent (for security)
   ```

3. **Validate Improvements**
   ```
   @code-review-agent, validate that improvements meet quality standards 
   and don't introduce regressions
   ```

---

### Workflow 3: Security Audit

1. **ISMS Compliance Check**
   ```
   @product-task-agent, audit the application for ISMS compliance 
   and create security-related issues
   ```

2. **Code Security Review**
   ```
   @security-compliance-agent, perform a security review of 
   authentication, data protection, and input validation
   ```

3. **Framework Mapping**
   ```
   @security-compliance-agent, map security controls to NIST CSF 2.0 
   and ISO 27001:2022 requirements
   ```

4. **Documentation**
   ```
   @documentation-agent, update SECURITY_ARCHITECTURE.md with 
   findings and control mappings
   ```

---

### Workflow 4: UI/UX Improvement

1. **Visual Testing**
   ```
   @product-task-agent, use Playwright to navigate the dashboard and 
   identify accessibility and usability issues
   ```

2. **Fix UI Issues**
   ```
   @typescript-react-agent, fix the identified color contrast issues 
   in the ComplianceStatusCard component
   ```

3. **Accessibility Testing**
   ```
   @testing-agent, create Cypress tests that verify keyboard navigation 
   and screen reader compatibility
   ```

4. **Validate Changes**
   ```
   @product-task-agent, verify the UI fixes meet WCAG 2.1 AA standards 
   and create a summary report
   ```

---

## ✅ Best Practices

### DO ✅

1. **Be Specific About Your Needs**
   - ✅ "Create unit tests for calculateRiskScore in riskUtils.ts"
   - ❌ "Write some tests"

2. **Reference Existing Code**
   - ✅ "Extend the BaseWidget interface from src/types/widgets.ts"
   - ❌ "Create a widget interface"

3. **Provide Context**
   - ✅ "Fix the security header bug (issue #123) affecting CSP"
   - ❌ "Fix the bug"

4. **Use Correct Agent Names**
   - ✅ `@typescript-react-agent`
   - ❌ `@typescript-agent` or `@react-agent`

5. **Leverage Product Task Agent for Coordination**
   - ✅ "Conduct a comprehensive audit"
   - ❌ Trying to coordinate multiple agents yourself

6. **Follow v1.0 Focus**
   - ✅ "Fix bugs, stabilize, improve tests"
   - ❌ "Add new features"

### DON'T ❌

1. **Don't Request New Features** (v1.0 Focus)
   - ❌ "Add a new chart type for compliance tracking"
   - ✅ "Fix the chart rendering bug in existing compliance charts"

2. **Don't Ignore Reusability**
   - ❌ "Create a new color utility"
   - ✅ "Use existing colorUtils from src/utils/colorUtils.ts"

3. **Don't Skip Security Considerations**
   - ❌ "Make this form without validation"
   - ✅ "Create a form with proper input validation and XSS protection"

4. **Don't Create Duplicate Issues**
   - Ask Product Task Agent to check existing issues first

5. **Don't Mix Unrelated Concerns**
   - ❌ "Fix the bug, refactor code, add new feature, update docs"
   - ✅ Break into separate, focused requests

---

## 🔧 Troubleshooting

### Issue: Agent Not Responding as Expected

**Possible Causes:**
- Wrong agent selected for the task
- Unclear or vague request
- Missing context or file references

**Solutions:**
1. Verify you're using the correct agent name (see Agent Roster)
2. Add more specificity and context to your request
3. Reference specific files, functions, or components
4. Try the Product Task Agent for complex coordination

---

### Issue: Agent Suggesting New Features (v1.0 Focus)

**Solution:**
Remind the agent of the v1.0 focus:
```
Remember we're focusing on v1.0: bug fixes, stability, and test coverage only. 
Please suggest bug fixes instead of new features.
```

---

### Issue: Agent Not Following Project Standards

**Possible Causes:**
- Agent not aware of specific standard
- Standard not documented in agent file

**Solutions:**
1. Reference the specific standard in your request
2. Point to the relevant file (e.g., `tsconfig.json`, `eslint.config.js`)
3. Report the issue so agent definitions can be improved

---

### Issue: Multiple Agents Giving Conflicting Advice

**Solution:**
Use the Code Review Agent as the tiebreaker:
```
@code-review-agent, review these two approaches and recommend 
the best solution considering reusability, performance, and security
```

---

## 🧪 Validation & Maintenance

### Validating Agent Configurations

Run the validation script to ensure all agents are correctly configured:

```bash
npm run validate:agents
```

This checks:
- ✅ Valid YAML frontmatter syntax
- ✅ Required fields (name, description)
- ✅ Description length (< 200 characters)
- ✅ README.md exists

---

### Agent Configuration Structure

Each agent file has:

```markdown
---
name: agent-name
description: Brief description under 200 chars
tools: ["*"]  # or specific tools
---

Agent instructions in Markdown...

## Your Expertise
## Core Focus Areas
## When Responding
## Remember
```

---

### Updating Agents

When updating agent configurations:

1. **Edit the agent file** in `.github/agents/`
2. **Validate** with `npm run validate:agents`
3. **Test** the agent with real prompts
4. **Document changes** in README.md if needed
5. **Commit** with clear description of changes

---

### Adding New Agents

To add a new custom agent:

1. **Create file**: `.github/agents/my-new-agent.md`
2. **Add YAML frontmatter**:
   ```yaml
   ---
   name: my-new-agent
   description: Expert in specific domain (under 200 chars)
   tools: ["*"]
   ---
   ```
3. **Write instructions** with clear expertise and guidelines
4. **Update validation script**: Add to `AGENTS` array in `scripts/validate-agents.sh`
5. **Update README.md**: Add agent to the roster and selection matrix
6. **Validate**: Run `npm run validate:agents`
7. **Test**: Try real-world prompts

---

## 📚 Related Resources

| Resource | Description | Link |
|----------|-------------|------|
| 🌐 **GitHub Docs** | Official Copilot agent documentation | [View Docs](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-custom-agents) |
| 📖 **Agent README** | Project agent overview | [README.md](.github/agents/README.md) |
| 🔍 **ISMS Guide** | Security implementation guide | [ISMS_IMPLEMENTATION_GUIDE.md](../../ISMS_IMPLEMENTATION_GUIDE.md) |
| 🏗️ **Architecture** | System architecture docs | [docs/architecture/](../../docs/architecture/) |
| 🧪 **Test Plans** | Testing guidelines | [UnitTestPlan.md](../../docs/UnitTestPlan.md), [E2ETestPlan.md](../../docs/E2ETestPlan.md) |

---

## 🎓 Learning Resources

### Understanding Agent Capabilities

**Product Task Agent** is your strategic coordinator:
- Use for product-wide analysis
- Creating structured GitHub issues
- Coordinating multiple quality dimensions
- ISMS compliance auditing

**Development Agents** (TypeScript React, Testing) handle implementation:
- Use for code changes
- Creating tests
- Following technical standards

**Quality Agents** (Code Review, Security) ensure standards:
- Use for reviews
- Security validation
- Compliance verification

**Documentation Agent** maintains knowledge:
- Use for docs and diagrams
- Visual documentation
- API references

---

## 💡 Pro Tips

1. **Start with Product Task Agent** for complex, multi-faceted work
2. **Be explicit about v1.0 focus** (bugs, stability, no new features)
3. **Reference existing code** to enforce reusability
4. **Use specific file paths** for better context
5. **Combine agents strategically** for comprehensive solutions
6. **Let agents coordinate** when tasks span multiple domains
7. **Validate results** with Code Review Agent for quality assurance

---

## 🤝 Contributing to Agents

Found ways to improve an agent? Follow these steps:

1. **Identify the improvement**: What could be better?
2. **Check existing capabilities**: Is it already covered?
3. **Propose changes**: Create an issue describing the improvement
4. **Test thoroughly**: Ensure changes don't break existing functionality
5. **Update documentation**: Keep README.md and AGENT_GUIDE.md current
6. **Share knowledge**: Help others learn from your improvements

---

**Questions or Issues?** Open a [GitHub Discussion](https://github.com/Hack23/cia-compliance-manager/discussions) or [Issue](https://github.com/Hack23/cia-compliance-manager/issues)

**Made with ❤️ for CIA Compliance Manager** | [Hack23 AB](https://www.hack23.com)
