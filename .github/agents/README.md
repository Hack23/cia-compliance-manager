# 🤖 GitHub Copilot Custom Agents

This directory contains specialized agent configurations for the **CIA Compliance Manager** project. Each agent is an expert in a specific domain, providing targeted assistance and following project-specific best practices.

## 📋 Available Agents

```mermaid
graph TB
    subgraph "Product Coordination"
        TASK[🎯 Product Task Agent]:::task
    end
    
    subgraph "Development Agents"
        TS[⚛️ TypeScript React Agent]:::dev
        TEST[🧪 Testing Agent]:::test
    end
    
    subgraph "Quality & Security"
        CR[🔍 Code Review Agent]:::review
        SEC[🔐 Security Compliance Agent]:::security
    end
    
    subgraph "Documentation"
        DOC[📝 Documentation Agent]:::docs
    end
    
    TASK --> TS
    TASK --> TEST
    TASK --> CR
    TASK --> SEC
    TASK --> DOC
    
    classDef task fill:#FFC107,stroke:#F57C00,stroke-width:3px,color:#000
    classDef dev fill:#2E7D32,stroke:#1B5E20,stroke-width:2px,color:#fff
    classDef test fill:#1565C0,stroke:#0D47A1,stroke-width:2px,color:#fff
    classDef review fill:#7B1FA2,stroke:#4A148C,stroke-width:2px,color:#fff
    classDef security fill:#D32F2F,stroke:#B71C1C,stroke-width:2px,color:#fff
    classDef docs fill:#FF9800,stroke:#E65100,stroke-width:2px,color:#fff
```

### 🎯 Product Task Agent
**File:** `product-task-agent.md`

Expert product coordinator for creating GitHub issues, assigning tasks to agents, and ensuring quality across all dimensions.

**🎯 Core Expertise:**
- Comprehensive product analysis (code quality, UX, ISMS)
- GitHub issue creation and task coordination
- Multi-dimensional quality assessment
- Agent assignment and workflow coordination
- ISMS compliance alignment

**💡 Use Cases:**
- Conducting product audits and creating improvement backlogs
- Analyzing UI/UX and creating accessibility issues
- Coordinating cross-functional quality improvements
- Security and ISMS compliance assessments
- Creating structured GitHub issues with agent assignments

**🛠️ Special Tools:**
- GitHub issue management (create, list, update, comment)
- Playwright for UI/UX testing (navigate, screenshot, click)
- Code analysis and quality metrics
- ISMS policy mapping

---

### ⚛️ TypeScript React Agent
**File:** `typescript-react-agent.md`

Expert in TypeScript and React development for building secure, type-safe components.

**🎯 Core Expertise:**
- TypeScript strict typing and best practices
- React 19.x functional components and hooks
- State management patterns
- Code reusability enforcement
- Type-safe props and interfaces

**💡 Use Cases:**
- Creating new React components
- Defining TypeScript types and interfaces
- Implementing state management
- Refactoring component code
- Type-safe API integrations

---

### 🧪 Testing Agent
**File:** `testing-agent.md`

Expert in comprehensive testing strategies using Vitest and Cypress.

**🎯 Core Expertise:**
- Vitest unit and integration testing
- Cypress end-to-end testing
- React Testing Library patterns
- Test coverage analysis
- Mock creation and test utilities

**💡 Use Cases:**
- Writing unit tests for components
- Creating integration tests
- Building E2E test scenarios
- Improving test coverage
- Debugging failing tests

---

### 🔍 Code Review Agent
**File:** `code-review-agent.md`

Expert in code quality, maintainability, and best practices enforcement.

**🎯 Core Expertise:**
- Code quality analysis
- Security vulnerability detection
- Code reusability assessment
- Performance optimization
- Accessibility (a11y) compliance

**💡 Use Cases:**
- Reviewing pull requests
- Identifying code smells
- Security audits
- Performance bottleneck detection
- Ensuring code reusability

---

### 📝 Documentation Agent
**File:** `documentation-agent.md`

Expert in technical documentation, API docs, and architecture visualization.

**🎯 Core Expertise:**
- JSDoc and TypeDoc documentation
- Markdown documentation
- Mermaid diagrams (flowcharts, C4, sequence)
- API reference documentation
- Architecture documentation

**💡 Use Cases:**
- Writing component documentation
- Creating architecture diagrams
- Documenting APIs and utilities
- Updating README files
- Generating visual workflows

---

### 🔐 Security & Compliance Agent
**File:** `security-compliance-agent.md`

Expert in security best practices and compliance framework mapping.

**🎯 Core Expertise:**
- CIA triad (Confidentiality, Integrity, Availability)
- Compliance frameworks (NIST CSF, ISO 27001, GDPR, HIPAA, SOC2)
- Security vulnerability prevention
- Secure coding practices
- Threat modeling and risk assessment

**💡 Use Cases:**
- Implementing security controls
- Mapping to compliance frameworks
- Security code reviews
- Threat modeling
- Risk assessment and mitigation

---

## 🚀 How to Use Agents

### Explicit Agent Selection
Reference agents directly in your prompts:

```
"@typescript-react-agent, help me create a new dashboard component"
"@testing-agent, write unit tests for the SecurityMetrics component"
"@security-compliance-agent, review this code for security vulnerabilities"
```

### Implicit Selection
GitHub Copilot may automatically select the appropriate agent based on:
- Current file type and context
- Task description in your prompt
- Project structure and patterns

## 📊 Agent Selection Guide

Use this matrix to choose the right agent for your task:

| Task Type | Agent | Icon |
|-----------|-------|------|
| **Product Analysis & Issue Creation** | Product Task Agent | 🎯 |
| **Component Development** | TypeScript React Agent | ⚛️ |
| **Writing Tests** | Testing Agent | 🧪 |
| **Code Review** | Code Review Agent | 🔍 |
| **Documentation** | Documentation Agent | 📝 |
| **Security & Compliance** | Security Compliance Agent | 🔐 |

**Quick Examples:**
- Product audit & issue creation → **🎯 Product Task Agent**
- Building a new widget → **⚛️ TypeScript React Agent**
- Adding Vitest tests → **🧪 Testing Agent**
- PR review → **🔍 Code Review Agent**
- Creating Mermaid diagrams → **📝 Documentation Agent**
- NIST CSF mapping → **🔐 Security Compliance Agent**
- UI/UX assessment → **🎯 Product Task Agent** (coordinates with ⚛️ & 🧪)

## ⚙️ Agent Configuration

### Configuration Format

Each agent is a Markdown file with YAML frontmatter:

```yaml
---
name: agent-name
description: Brief description of agent's expertise (max 200 characters)
tools: []  # Optional - omit to allow all available tools
---
```

### Available Tools

GitHub Copilot custom agents can use these tools:

**Core Tools:**
- `view` - Read file contents
- `edit` - Modify file contents  
- `create` - Create new files
- `bash` - Execute shell commands
- `search_code` - Search codebase
- `custom-agent` - Invoke other custom agents

**Playwright Tools** (for UI testing and interaction):
- `playwright-browser_snapshot` - Capture browser state
- `playwright-browser_take_screenshot` - Take screenshots
- `playwright-browser_navigate` - Navigate to URLs
- `playwright-browser_click` - Click elements

**Best Practice:** Omit the `tools` property to give agents access to all available tools unless you need to restrict access for specific reasons.

---

## 🏗️ Project Guidelines

All agents follow these core principles:

### ✨ Code Reusability (MANDATORY)
```mermaid
graph LR
    A[New Code Needed?]:::question --> B{Check Existing}
    B --> C[Types]:::check
    B --> D[Components]:::check
    B --> E[Utils]:::check
    C --> F{Can Reuse?}
    D --> F
    E --> F
    F -->|Yes| G[Extend/Reuse]:::success
    F -->|No| H[Create New + Justify]:::warning
    
    classDef question fill:#FFC107,stroke:#F57C00,stroke-width:2px,color:#000
    classDef check fill:#2196F3,stroke:#1976D2,stroke-width:2px,color:#fff
    classDef success fill:#4CAF50,stroke:#388E3C,stroke-width:2px,color:#fff
    classDef warning fill:#FF9800,stroke:#F57C00,stroke-width:2px,color:#fff
```

**Key Reusable Locations:**
- 📁 **Types**: `src/types/*.ts` - All type definitions
- 📁 **Constants**: `src/constants/*.ts` - Shared constants
- 📁 **Utils**: `src/utils/*.ts` - Utility functions
- 📁 **Components**: `src/components/common/*` - Shared components
- 📁 **Services**: `src/services/*.ts` - Business logic services

### 🎯 Release Priority (v1.0 Focus)

```mermaid
graph TD
    subgraph "Allowed ✅"
        A[Fix Bugs]:::allowed
        B[Complete Widgets]:::allowed
        C[Stabilize Code]:::allowed
        D[Improve Tests]:::allowed
    end
    
    subgraph "Not Allowed ❌"
        E[New Features]:::blocked
        F[Extend Functionality]:::blocked
        G[New Widgets]:::blocked
    end
    
    classDef allowed fill:#4CAF50,stroke:#388E3C,stroke-width:2px,color:#fff
    classDef blocked fill:#D32F2F,stroke:#B71C1C,stroke-width:2px,color:#fff
```

### 📏 Quality Standards

- ✅ Strict TypeScript typing (no `any`)
- ✅ 80% minimum test coverage
- ✅ Security-first approach
- ✅ Accessibility (WCAG 2.1 AA) compliance

---

## 🔧 Development Workflow

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant Agent as Custom Agent
    participant Code as Codebase
    participant Tests as Test Suite
    
    Dev->>Agent: Request assistance
    Agent->>Code: Check existing code
    Agent->>Code: Apply best practices
    Agent->>Dev: Provide solution
    Dev->>Code: Implement changes
    Dev->>Tests: Run tests
    Tests-->>Dev: Validation results
```

---

## 📚 Contributing to Agents

### Creating a New Agent

1. **Create agent file**: `.github/agents/my-agent.md`
2. **Add YAML frontmatter**:
   ```yaml
   ---
   name: my-agent
   description: Expert in specific domain (under 200 chars)
   ---
   ```
3. **Write agent instructions** in Markdown below frontmatter
4. **Validate configuration**: `npm run validate:agents`
5. **Test the agent** with real-world prompts
6. **Update README.md** to document the new agent

### Validation

```bash
# Validate all agents
npm run validate:agents

# Or manually validate a single agent
cd .github/agents
sed -n '/^---$/,/^---$/p' my-agent.md | sed '1d;$d' | npx js-yaml -t
```

**Validation Checklist:**
- ✅ Valid YAML frontmatter syntax
- ✅ `name` property (lowercase with hyphens)
- ✅ `description` under 200 characters
- ✅ Clear, actionable instructions
- ✅ Project-specific guidelines included
- ✅ Examples and use cases documented

---

## 🔗 Related Resources

| Resource | Description | Link |
|----------|-------------|------|
| 🌐 **GitHub Docs** | Official Copilot agent documentation | [View Docs](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-custom-agents) |
| 📖 **Copilot Instructions** | Global project guidelines | `.github/copilot-instructions.md` |
| 🤝 **Contributing** | General contribution guide | `CONTRIBUTING.md` |
| 🧪 **Test Plans** | Unit & E2E testing guidelines | `docs/UnitTestPlan.md`, `docs/E2ETestPlan.md` |
| 🏗️ **Architecture** | System architecture docs | `docs/architecture/` |

---

## ❓ Troubleshooting

### Common Issues

**❌ "Invalid YAML syntax"**
- Use 2 spaces for indentation (no tabs)
- Array syntax: `["item1", "item2"]`
- Check quotes are properly closed

**❌ "Agent not being used"**
- Verify `.md` file extension
- Check frontmatter between `---` markers
- Ensure `name` matches filename
- Description should be clear and specific

**❌ "Tool not available"**
- Remove `tools` property to allow all tools
- Verify tool name spelling
- Check GitHub Copilot version supports the tool

**❌ "Agent gives unexpected responses"**
- Review agent instructions for clarity
- Check if task matches agent's expertise
- Consider using different specialized agent
- Verify project-specific guidelines are followed

### Getting Help

1. 📖 Check [GitHub Copilot documentation](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-custom-agents)
2. ✅ Run `npm run validate:agents` to check configuration
3. 🔍 Review agent instructions and examples
4. 💬 Ask in project discussions or issues

---

**Made with ❤️ for the CIA Compliance Manager project** | [Report Issues](https://github.com/Hack23/cia-compliance-manager/issues)
