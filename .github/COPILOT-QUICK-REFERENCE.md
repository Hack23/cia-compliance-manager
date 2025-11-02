# GitHub Copilot Quick Reference

> Quick guide for using GitHub Copilot with MCP servers in the CIA Compliance Manager project

## 🚀 Quick Start

### Using GitHub Copilot Workspace

When you start a GitHub Copilot Workspace session, the environment automatically:

1. ✅ Installs all dependencies
2. ✅ Verifies Cypress
3. ✅ Builds the project
4. ✅ Validates code quality
5. ✅ Runs initial tests

**No manual setup required!**

## 🛠️ Available Tools

### MCP Servers (Always Active)

| Tool | Use When | Example |
|------|----------|---------|
| 🗂️ **Filesystem** | Navigating code, reading files | "Show me all React components" |
| 🐙 **GitHub** | Working with issues, PRs, workflows | "List open issues related to testing" |
| 📘 **TypeScript** | Type information, refactoring | "Find all usages of this interface" |
| ✨ **ESLint** | Code quality checks | "Check this file for lint errors" |
| 🧪 **Vitest** | Running tests | "Run tests for this component" |
| 📦 **NPM** | Package information | "What's the latest version of React?" |
| 🧠 **Memory** | Continuing previous work | Automatically remembers context |

### Custom Agents (Specialized Experts)

| Agent | Expertise | When to Use |
|-------|-----------|-------------|
| 🎯 **TypeScript React** | React 19 + TypeScript | Creating components, hooks, state management |
| 🧪 **Testing** | Vitest + Cypress | Writing unit tests, E2E tests, improving coverage |
| 👀 **Code Review** | Quality + Security | Reviewing changes, finding issues, optimization |
| 📝 **Documentation** | JSDoc + Markdown | Writing docs, API references, diagrams |
| 🔒 **Security** | CIA triad + Compliance | Security controls, compliance mapping, risk assessment |

## 💬 Example Prompts

### Component Development
```
Using the TypeScript React Agent, create a new widget component 
that displays security metrics with proper TypeScript types.
```

### Testing
```
Using the Testing Agent, write Vitest unit tests for the 
SecurityLevelSelector component with 80% coverage.
```

### Code Review
```
Using the Code Review Agent, review these changes for:
- Security vulnerabilities
- Code reusability
- TypeScript strict typing
- Performance issues
```

### Documentation
```
Using the Documentation Agent, add JSDoc comments to this 
utility function and update the API documentation.
```

### Security & Compliance
```
Using the Security Compliance Agent, map these security controls 
to NIST 800-53 framework requirements.
```

## 🎯 Pro Tips

### 1. Leverage MCP Servers
```
✅ "Check ESLint for issues in src/components/"
✅ "Run Vitest for all utility tests"
✅ "Show me GitHub issues tagged 'bug'"
✅ "Find TypeScript interfaces in src/types/"
```

### 2. Use Custom Agents
```
✅ "TypeScript React Agent: Refactor this component"
✅ "Testing Agent: Improve test coverage"
✅ "Security Agent: Review for vulnerabilities"
```

### 3. Be Specific
```
❌ "Fix this code"
✅ "Refactor this function to use strict TypeScript types and extract reusable logic"

❌ "Add tests"
✅ "Write Vitest unit tests covering all branches with mocked Chart.js dependency"
```

### 4. Reference Project Standards
```
✅ "Follow the guidelines in .github/copilot-instructions.md"
✅ "Use existing types from src/types/cia.ts"
✅ "Follow the component patterns in src/components/common/"
```

## 📋 Project-Specific Guidelines

### Always Do ✅
- Use strict TypeScript typing (no `any`)
- Check for existing reusable code first
- Follow 80% minimum test coverage
- Use existing constants and utilities
- Follow security-first practices

### Never Do ❌
- Use `any` type (use `unknown` if needed)
- Create duplicate utilities/types
- Skip test coverage
- Expose sensitive data in logs
- Add new features (v1.0 is stability focus)

## 🔍 Finding Reusable Code

Before creating new code, check these locations:

```bash
# Types
src/types/

# Constants
src/constants/

# Utilities
src/utils/

# Services
src/services/

# Components
src/components/common/
src/components/charts/
src/components/widgets/
```

### Ask Copilot
```
"Show me existing utilities for security level calculations"
"List all available TypeScript interfaces for CIA data"
"Find reusable chart components"
```

## 🐛 Debugging

### Check Logs
```
"Show me the latest Vitest test results"
"Display ESLint errors for this file"
"What's the TypeScript error in this component?"
```

### Run Tests
```
"Run unit tests for this component"
"Execute E2E tests for the security widget"
"Check test coverage for src/utils/"
```

### Analyze Issues
```
"List failed GitHub Actions workflows"
"Show me open issues related to this component"
"What security alerts are active?"
```

## 📚 Quick Links

- [📖 Full MCP Documentation](.github/MCP-SERVERS.md)
- [📋 Copilot Instructions](.github/copilot-instructions.md)
- [🤖 Custom Agents Guide](.github/agents/README.md)
- [📘 API Documentation](https://hack23.github.io/cia-compliance-manager/api-docs)
- [🧪 Unit Test Plan](../docs/UnitTestPlan.md)
- [🔍 E2E Test Plan](../docs/E2ETestPlan.md)

## 🆘 Getting Help

### Having Issues?

1. **Check Documentation**: Start with [MCP-SERVERS.md](.github/MCP-SERVERS.md)
2. **Validate Config**: Ensure JSON/YAML files are valid
3. **Review Logs**: Check Copilot output for error messages
4. **Ask Copilot**: Use the memory server - it remembers context

### Common Issues

| Issue | Solution |
|-------|----------|
| MCP server not responding | Check if the server is enabled in mcp-config.json |
| Dependencies not installed | Run `npm ci` manually first |
| Test failures | Check if baseline tests pass: `npm test` |
| Linting errors | Run `npm run lint` to see all issues |
| Build failures | Run `npm run build` to see TypeScript errors |

## 🎓 Learning Resources

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [GitHub Copilot Docs](https://docs.github.com/en/copilot)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Vitest Guide](https://vitest.dev/guide/)
- [Cypress Docs](https://docs.cypress.io/)

---

**Remember**: GitHub Copilot is your pair programming partner. Be specific, reference project guidelines, and leverage the MCP servers and custom agents for the best results! 🚀
