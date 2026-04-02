# 🤖 Custom Agent Usage Guide

**Version:** 2.0 | **Last Updated:** 2026-04-02 | **Stack:** TypeScript 6.0.2, React 19.x, Node ≥25

---

## Overview

Custom agents are specialized GitHub Copilot configurations providing domain-specific expertise for **CIA Compliance Manager** (v1.1.43). Each agent follows project skills (`.github/skills/`) and has focused knowledge in a specific area.

## Agent Roster

| Agent | Invoke With | Purpose |
|-------|------------|---------|
| TypeScript React | `@typescript-react-agent` | Components, hooks, TypeScript types, React patterns |
| Testing | `@testing-agent` | Vitest unit/integration tests, Cypress E2E, coverage |
| Code Review | `@code-review-agent` | PR review, code quality, security, reusability |
| Documentation | `@documentation-agent` | JSDoc, Mermaid diagrams, architecture docs |
| Security | `@security-compliance-agent` | Security review, ISMS compliance, threat models |
| Product | `@product-task-agent` | Issue creation, quality analysis, prioritization |

## Agent Selection Matrix

| Task | Primary Agent | Supporting Agent |
|------|--------------|-----------------|
| New React component | `@typescript-react-agent` | `@testing-agent` |
| Fix bug | `@typescript-react-agent` | `@code-review-agent` |
| Write tests | `@testing-agent` | — |
| PR review | `@code-review-agent` | `@security-compliance-agent` |
| Security fix | `@security-compliance-agent` | `@testing-agent` |
| Update docs | `@documentation-agent` | — |
| Create issues | `@product-task-agent` | — |
| Architecture change | `@documentation-agent` | `@security-compliance-agent` |

## Usage Patterns

### Single Agent
```
@typescript-react-agent Fix the SecurityLevelBadge component to handle null values
```

### Agent Chain (Sequential)
```
1. @typescript-react-agent — Implement the fix
2. @testing-agent — Write comprehensive tests
3. @code-review-agent — Review the changes
```

### Parallel Review
```
@code-review-agent + @security-compliance-agent — Review PR for quality and security
```

## Best Practices

1. **Be specific** — Include file paths, component names, expected behavior
2. **Provide context** — Reference issues, error messages, or requirements
3. **One task per invocation** — Keep requests focused
4. **Check agent output** — Verify against project rules before committing
5. **Run checks** — Always run `npm run lint && npm run type-check && npm run test && npm run build`

## Key Project Rules (All Agents Follow)

- No `any` types — use explicit types or `unknown`
- Check existing code before creating new (reusability CRITICAL)
- 80%+ test coverage for new code
- JSDoc for all public APIs
- Functions < 50 lines, single responsibility
- Security tests for security-critical paths

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Agent ignores project conventions | Reference specific skill file |
| Agent creates duplicate code | Ask agent to check `src/types/`, `src/utils/`, `src/services/` first |
| Agent uses `any` types | Remind: "No any types — use explicit types or unknown" |
| Agent doesn't write tests | Ask `@testing-agent` directly |
| Agent response too generic | Provide file paths and specific requirements |

## Related

- **Agent definitions**: `.github/agents/*.md`
- **Skills framework**: `.github/skills/README.md`
- **Copilot instructions**: `.github/copilot-instructions.md`
- **MCP configuration**: `.github/copilot-mcp.json`

---

**Made with ❤️ for CIA Compliance Manager** | [Hack23 AB](https://www.hack23.com)
