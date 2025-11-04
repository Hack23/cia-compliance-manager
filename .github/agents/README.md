# GitHub Copilot Custom Agents

This directory contains custom agent configurations for GitHub Copilot to provide specialized assistance for different aspects of the CIA Compliance Manager project.

## What are Custom Agents?

Custom agents are specialized configurations that help GitHub Copilot provide more targeted and context-aware assistance for specific tasks in the project. Each agent is an expert in a particular domain and follows project-specific guidelines and best practices.

## Available Agents

### 1. TypeScript React Development Agent
**File:** `typescript-react-agent.md`

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
**File:** `testing-agent.md`

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
**File:** `code-review-agent.md`

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
**File:** `documentation-agent.md`

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
**File:** `security-compliance-agent.md`

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

Each agent configuration file is a Markdown file with YAML frontmatter that follows this structure:

```markdown
---
name: agent-name
description: Brief description of the agent's expertise (max 200 characters)
tools: ["view", "edit", "search_code", "create", "bash"]  # optional - standard tool aliases
---

Agent prompt and instructions in Markdown format.

## Expertise Area
- Detailed instructions for the agent
- Project-specific guidelines
- Best practices
- When to use the agent
- How to respond to requests
```

**Key Properties:**
- `name`: Unique identifier for the agent (lowercase with hyphens)
- `description`: Brief description of the agent's purpose and expertise (max 200 characters)
- `tools`: (Optional) List of tools the agent can use. If omitted, the agent has access to all available tools.

**Standard Tool Aliases:**
- `bash` - Execute shell commands
- `view` - Read file contents
- `edit` - Modify file contents
- `create` - Create new files
- `search_code` - Search codebase
- `custom-agent` - Invoke other custom agents

The Markdown content below the frontmatter defines the agent's behavior, expertise, and instructions.

## Agent Selection Guide

Use this decision matrix to choose the right agent for your task:

| Task Type | Agent | Use When |
|-----------|-------|----------|
| **TypeScript/React code** | typescript-react-agent | Creating/modifying components, types, or React code |
| **Writing tests** | testing-agent | Writing unit, integration, or E2E tests |
| **Code review** | code-review-agent | Reviewing PRs, checking quality and reusability |
| **Documentation** | documentation-agent | Writing JSDoc, README, diagrams, or API docs |
| **Security/Compliance** | security-compliance-agent | Security reviews, compliance mapping, threat modeling |

**Examples:**
- Need to add a new React component? → Use **typescript-react-agent**
- Writing Vitest tests for a utility? → Use **testing-agent**
- Reviewing code for security issues? → Use **security-compliance-agent**
- Need to create architecture diagrams? → Use **documentation-agent**
- Checking if code follows best practices? → Use **code-review-agent**

## Contributing to Agent Configurations

When updating or adding agents:

1. Create a Markdown file (`.md` extension) with YAML frontmatter
2. Use lowercase with hyphens for the filename (e.g., `my-agent.md`)
3. Include `name` and `description` in the YAML frontmatter
4. Optionally specify `tools` list if the agent should have restricted tool access
5. Write agent instructions in Markdown format below the frontmatter
6. Ensure instructions are clear and actionable
7. Include project-specific guidelines
8. Reference relevant files and directories
9. Align with the v1.0 release priorities
10. Validate YAML frontmatter syntax before committing

## Related Files

- **Global Instructions**: `.github/copilot-instructions.md` - General guidelines for all Copilot interactions
- **Contributing Guide**: `CONTRIBUTING.md` - General contribution guidelines
- **Testing Plans**: `docs/UnitTestPlan.md`, `docs/E2ETestPlan.md`

## Validation

To validate agent configuration files, you can extract and check the YAML frontmatter:

```bash
# Quick validation of a single agent
cd .github/agents
sed -n '/^---$/,/^---$/p' typescript-react-agent.md | sed '1d;$d' | npx js-yaml -t

# Validate all agent files
for file in .github/agents/*.md; do 
  if [ "$(basename "$file")" != "README.md" ]; then
    echo "Checking $(basename "$file")..."
    sed -n '/^---$/,/^---$/p' "$file" | sed '1d;$d' | npx js-yaml -t && echo "✓ Valid"
  fi
done
```

**Validation Checklist:**
- [ ] Valid YAML syntax in frontmatter
- [ ] `name` property present (lowercase with hyphens)
- [ ] `description` property present (under 200 characters)
- [ ] `tools` array uses standard aliases (if present)
- [ ] Markdown content is properly formatted
- [ ] Agent instructions are clear and actionable

## Troubleshooting

### Common Issues

**Issue: "Invalid YAML syntax"**
- Check for proper indentation (use 2 spaces)
- Ensure array syntax is correct: `["item1", "item2"]`
- Verify quotes are properly closed
- Make sure there are no tabs (use spaces only)

**Issue: "Agent not being used"**
- Verify the agent file has `.md` extension
- Check that frontmatter is between `---` markers
- Ensure `name` matches filename (without `.md`)
- Confirm description is clear about agent's purpose

**Issue: "Tool not available to agent"**
- Check if `tools` array includes the needed tool
- Verify tool alias is correct (see Standard Tool Aliases above)
- If no `tools` specified, agent has access to all tools

**Issue: "Agent gives unexpected responses"**
- Review agent instructions for clarity
- Check if agent's expertise matches the task
- Consider using a different specialized agent
- Verify project-specific guidelines are followed

### Getting Help

If you encounter issues with custom agents:
1. Check the [GitHub Copilot documentation](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-custom-agents)
2. Review the agent configuration format above
3. Validate YAML syntax using the commands provided
4. Ensure the agent's description matches its actual capabilities
