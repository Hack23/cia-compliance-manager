# 🤖 GitHub Copilot Custom Agents

Specialized agent configurations for **CIA Compliance Manager** (v1.1.43).

## Context & Setup

All agents read these files first:
1. **README.md** — Project context, features, architecture
2. **.github/workflows/copilot-setup-steps.yml** — Node 26, npm, build/test commands
3. **.github/copilot-mcp.json** — MCP servers (filesystem, github, memory, sequential-thinking, playwright)

## Tech Stack
TypeScript 6.0.2 · React 19.x · Vite 8 · Vitest 4.x · Cypress 15.x · ESLint 10.x · TailwindCSS 4 · Node ≥26 · ES2025

## Skills Framework

Strategic skills in `.github/skills/` guide all agents:

| Priority | Skill | File |
|----------|-------|------|
| MANDATORY | 🔐 Security by Design | `security-by-design.md` |
| CRITICAL | ✨ Code Quality Excellence | `code-quality-excellence.md` |
| MANDATORY | 🛡️ ISMS Compliance | `isms-compliance.md` |
| MANDATORY | 🧪 Testing Excellence | `testing-excellence.md` |
| IMPORTANT | ⚡ Performance Optimization | `performance-optimization.md` |
| IMPORTANT | 🎨 UI/UX Design System | `ui-ux-design-system.md` |
| IMPORTANT | ♿ Accessibility Excellence | `accessibility-excellence.md` |
| IMPORTANT | 📝 Documentation Standards | `documentation-standards.md` |
| ADVISORY | 🎯 Product Quality Analysis | `product-quality-analysis.md` |
| MANDATORY | 🏗️ C4 Architecture | `c4-architecture-documentation.md` |
| ADVISORY | 🤖 Agentic Workflows | `github-agentic-workflows.md` |
| ADVISORY | 🔌 MCP Integration | `mcp-server-integration.md` |

**Skills vs Agents**: Skills define *what to do* (principles). Agents define *how to do it* (execution).

## Available Agents

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| **[@code-review-agent](code-review-agent.md)** | Code quality, security, reusability | PR reviews, quality checks |
| **[@documentation-agent](documentation-agent.md)** | Technical docs, API docs, diagrams | Documentation updates, JSDoc |
| **[@product-task-agent](product-task-agent.md)** | Issue creation, quality coordination | Product analysis, issue triage |
| **[@security-compliance-agent](security-compliance-agent.md)** | Security review, ISMS compliance | Security audits, threat models |
| **[@testing-agent](testing-agent.md)** | Vitest/Cypress testing, coverage | Writing and improving tests |
| **[@typescript-react-agent](typescript-react-agent.md)** | TypeScript/React development | Components, hooks, types |

## Agent Selection Guide

```
Need code changes?
├── TypeScript/React → @typescript-react-agent
├── Tests → @testing-agent
└── Security fix → @security-compliance-agent

Need review?
├── Code quality → @code-review-agent
├── Security audit → @security-compliance-agent
└── Documentation → @documentation-agent

Need coordination?
└── Issues/planning → @product-task-agent
```

## Key Rules (All Agents)

1. **MUST** check existing code before creating new (reusability is CRITICAL)
2. **MUST** use explicit TypeScript types (no `any`)
3. **MUST** maintain 80%+ test coverage
4. **MUST** follow ISMS compliance requirements
5. **MUST** run `npm run lint && npm run test && npm run build` before committing

## Contributing

When creating or modifying agents:
- Follow [GitHub custom agents documentation](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-custom-agents)
- Include YAML frontmatter (`name`, `description`, `tools: ["*"]`)
- Repo-level agents **MUST NOT** include `mcp-servers` blocks — MCP servers are configured centrally in [`.github/copilot-mcp.json`](../copilot-mcp.json)
- Reference relevant skills from `.github/skills/`
- Keep agents focused and concise — aim below ~200 lines per agent

## Copilot Coding Agent Workflow

Repo-level agents coordinate with Copilot coding agent using these MCP tools (configured in `.github/copilot-mcp.json`):

| Tool | Purpose | Key Parameters |
|------|---------|----------------|
| `assign_copilot_to_issue` | Assign issue to Copilot coding agent | `base_ref`, `custom_instructions` |
| `create_pull_request_with_copilot` | Create PR with Copilot implementing changes | `base_ref`, `problem_statement` |
| `get_copilot_job_status` | Track progress | `id` (PR number / job id) |

**Stacked PRs**: use `base_ref: "copilot/issue-<NNN>"` to build incremental changes on a prior Copilot PR branch.

## Policy → Agent Matrix

| ISMS Policy | Primary Agent | Supporting Agent |
|-------------|--------------|------------------|
| [Information Security Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Information_Security_Policy.md) | `@security-compliance-agent` | `@code-review-agent` |
| [Secure Development Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md) | `@security-compliance-agent` | `@typescript-react-agent`, `@testing-agent`, `@code-review-agent` |
| [Open Source Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Open_Source_Policy.md) | `@code-review-agent` | `@security-compliance-agent` |
| [Vulnerability Management](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Vulnerability_Management.md) | `@security-compliance-agent` | `@testing-agent` |
| [Data Classification](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Data_Classification_Policy.md) | `@security-compliance-agent` | `@typescript-react-agent` |
| [AI Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/AI_Policy.md) / [OWASP LLM](https://github.com/Hack23/ISMS-PUBLIC/blob/main/OWASP_LLM_Security_Policy.md) | `@security-compliance-agent` | `@product-task-agent` |
| [Change Management](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Change_Management.md) | `@product-task-agent` | `@documentation-agent` |

---

**Made with ❤️ for CIA Compliance Manager** | [Hack23 AB](https://www.hack23.com)
