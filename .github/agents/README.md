# GitHub Copilot Custom Agents

This directory contains custom agent configurations for GitHub Copilot to provide specialized assistance for different aspects of the CIA Compliance Manager project.

## What are Custom Agents?

Custom agents are specialized configurations that help GitHub Copilot provide more targeted and context-aware assistance for specific tasks in the project. Each agent is an expert in a particular domain and follows project-specific guidelines and best practices.

## Available Agents

### 1. TypeScript React Development Agent
**File:** `typescript-react-agent.yml`

Expert in TypeScript and React development for the CIA Compliance Manager.

**Specialties:**
- TypeScript strict typing and best practices
- React 19.x component development
- State management and hooks
- Code reusability enforcement

**When to use:**
- Developing new React components
- Creating or extending TypeScript types
- Implementing state management
- Refactoring component code

---

### 2. Testing Agent
**File:** `testing-agent.yml`

Expert in testing using Vitest and Cypress.

**Specialties:**
- Vitest unit and integration testing
- Cypress end-to-end testing
- React Testing Library patterns
- Test coverage improvement

**When to use:**
- Writing unit tests for components or utilities
- Creating E2E test scenarios
- Improving test coverage
- Debugging failing tests

---

### 3. Code Review Agent
**File:** `code-review-agent.yml`

Expert in code quality, security, and best practices.

**Specialties:**
- Code quality analysis
- Security vulnerability detection
- Code reusability assessment
- Performance optimization
- Accessibility compliance

**When to use:**
- Reviewing pull requests
- Identifying code quality issues
- Security audits
- Performance optimization
- Ensuring code reusability

---

### 4. Documentation Agent
**File:** `documentation-agent.yml`

Expert in technical documentation and API documentation.

**Specialties:**
- JSDoc and TypeDoc documentation
- Markdown documentation
- Architecture diagrams (Mermaid)
- API reference documentation

**When to use:**
- Writing component documentation
- Creating architecture diagrams
- Updating README files
- Documenting APIs and utilities

---

### 5. Security and Compliance Agent
**File:** `security-compliance-agent.yml`

Expert in security best practices and compliance frameworks.

**Specialties:**
- CIA triad (Confidentiality, Integrity, Availability)
- Compliance frameworks (NIST, ISO 27001, GDPR, HIPAA)
- Security vulnerability prevention
- Secure coding practices

**When to use:**
- Implementing security controls
- Mapping to compliance frameworks
- Security code reviews
- Threat modeling
- Risk assessment

---

## How to Use Custom Agents

When working with GitHub Copilot, you can reference these agents in your prompts or interactions:

1. **Implicit Use**: Copilot may automatically select the appropriate agent based on context
2. **Explicit Reference**: Mention the agent by name or domain in your prompt
   - Example: "Using the Testing Agent, help me write tests for..."
   - Example: "As the Security Agent, review this code for vulnerabilities"

## Agent Guidelines

All agents follow these core project principles:

### Reusability First (MANDATORY)
- Always check existing code before creating new utilities, types, or components
- Extend existing code rather than duplicating
- Reference key reusable items in the codebase

### Release Priority (v1.0 Focus)
- Fix bugs in existing functionality
- Complete current widgets
- Stabilize existing features
- **DO NOT** add new features

### Quality Standards
- Strict TypeScript typing (no `any` types)
- 80% minimum test coverage
- Security-first approach
- Accessibility compliance

## Agent Configuration Format

Each agent configuration file follows this structure:

```yaml
name: Agent Name
description: Brief description of the agent's expertise

instructions: |
  Detailed instructions for the agent including:
  - Area of expertise
  - Project-specific guidelines
  - Best practices
  - When to use the agent
  - How to respond to requests
```

## Contributing to Agent Configurations

When updating or adding agents:

1. Follow the existing YAML structure
2. Ensure instructions are clear and actionable
3. Include project-specific guidelines
4. Reference relevant files and directories
5. Align with the v1.0 release priorities
6. Validate YAML syntax before committing

## Related Files

- **Global Instructions**: `.github/copilot-instructions.md` - General guidelines for all Copilot interactions
- **Contributing Guide**: `CONTRIBUTING.md` - General contribution guidelines
- **Testing Plans**: `docs/UnitTestPlan.md`, `docs/E2ETestPlan.md`

## Validation

To validate agent configuration files:

```bash
# Using js-yaml to validate a specific agent
npx js-yaml .github/agents/typescript-react-agent.yml

# Or validate all agents at once
for file in .github/agents/*.yml; do 
  echo "Validating $file..."
  npx js-yaml "$file" && echo "✓ Valid"
done

# Or use any YAML validator
```

All agent files must be valid YAML and follow the defined structure.
