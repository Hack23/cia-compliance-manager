# GitHub Copilot MCP Server Configuration

This directory contains configuration files to enhance GitHub Copilot's capabilities through Model Context Protocol (MCP) servers.

## 📋 Overview

The MCP server configuration provides GitHub Copilot with specialized tools and context to better assist with development tasks in the CIA Compliance Manager project.

## 🗂️ Configuration Files

### 1. `copilot-setup-steps.yml`
Defines the pre-installation and setup steps for GitHub Copilot workspace sessions.

**Purpose:**
- Pre-install npm dependencies before Copilot starts working
- Verify build and test infrastructure
- Set up environment variables
- Document system dependencies
- Provide project context

**Key Features:**
- Automatic dependency installation
- Cypress verification
- TypeScript build validation
- ESLint configuration check
- Initial test run for baseline

### 2. `mcp-config.json`
Configures Model Context Protocol (MCP) servers for enhanced Copilot capabilities.

**Configured Servers:**

| Server | Purpose | Status |
|--------|---------|--------|
| `filesystem` | File system access for the codebase | ✅ Enabled |
| `github` | GitHub API for repository, issues, PRs, and workflows | ✅ Enabled |
| `typescript` | TypeScript language server for type info and refactoring | ✅ Enabled |
| `eslint` | Code quality and linting integration | ✅ Enabled |
| `vitest` | Test runner for unit and integration tests | ✅ Enabled |
| `npm` | NPM package information and dependency management | ✅ Enabled |
| `memory` | Persistent memory across Copilot sessions | ✅ Enabled |
| `web-search` | Web search for documentation research | ⚠️ Optional (requires API key) |

## 🚀 How to Use

### For GitHub Copilot Workspace

When you start a GitHub Copilot Workspace session:

1. **Automatic Setup**: The `copilot-setup-steps.yml` configuration automatically:
   - Installs all npm dependencies
   - Verifies Cypress installation
   - Builds the TypeScript code
   - Runs ESLint validation
   - Executes initial tests

2. **Enhanced Context**: The MCP servers provide Copilot with:
   - Deep understanding of the codebase structure
   - Access to TypeScript type information
   - Integration with GitHub workflows and issues
   - NPM package and dependency knowledge
   - Persistent memory of previous interactions

### For Local Development

To benefit from these configurations locally:

1. **Install GitHub Copilot CLI:**
   ```bash
   npm install -g @githubnext/github-copilot-cli
   ```

2. **Reference MCP Config:**
   Point your Copilot CLI to the MCP configuration:
   ```bash
   export MCP_CONFIG_PATH=/home/runner/work/cia-compliance-manager/cia-compliance-manager/.github/mcp-config.json
   ```

3. **Start Development:**
   The MCP servers will automatically provide enhanced context to Copilot.

## 🎯 Best Practices

### When Using Copilot with MCP Servers

1. **Ask Specific Questions:**
   - "Using the TypeScript server, find all usages of this interface"
   - "Check ESLint for code quality issues in this component"
   - "Run Vitest for this test file"

2. **Leverage GitHub Integration:**
   - "Show me related GitHub issues"
   - "What workflows are affected by this change?"
   - "Create a PR description based on these changes"

3. **Use Memory Server:**
   - Copilot remembers context across sessions
   - Build on previous conversations
   - Reference earlier decisions

4. **Follow Project Guidelines:**
   - Always check for reusable code before creating new utilities
   - Use strict TypeScript typing
   - Aim for 80% test coverage
   - Follow security-first practices

## 🔧 Customization

### Adding New MCP Servers

To add a new MCP server to `mcp-config.json`:

```json
{
  "mcpServers": {
    "new-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-name"],
      "description": "Description of what this server does",
      "enabled": true,
      "env": {
        "REQUIRED_ENV_VAR": "${ENV_VAR_NAME}"
      }
    }
  }
}
```

### Modifying Setup Steps

To add new setup steps to `copilot-setup-steps.yml`:

```yaml
setup:
  - name: New setup step
    run: command to execute
    description: What this step does
    continue-on-error: false  # Set to true if failures should not stop setup
```

## 📚 Available MCP Servers

### Official MCP Servers
- `@modelcontextprotocol/server-filesystem` - File system operations
- `@modelcontextprotocol/server-github` - GitHub API integration
- `@modelcontextprotocol/server-typescript` - TypeScript language support
- `@modelcontextprotocol/server-npm` - NPM package management
- `@modelcontextprotocol/server-memory` - Persistent memory
- `@modelcontextprotocol/server-brave-search` - Web search (optional)

### Community MCP Servers
Additional MCP servers can be found at:
- [MCP Servers Registry](https://github.com/modelcontextprotocol/servers)
- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers)

## 🔒 Security Considerations

1. **API Keys:** Never commit API keys directly. Use environment variables.
2. **File Access:** The filesystem server is scoped to the project directory.
3. **GitHub Token:** Uses `${GITHUB_TOKEN}` from the environment.
4. **Web Search:** Disabled by default; enable only when needed.

## 🐛 Troubleshooting

### MCP Server Not Working

1. **Check Installation:**
   ```bash
   npx -y @modelcontextprotocol/server-filesystem --version
   ```

2. **Verify Configuration:**
   ```bash
   # Validate JSON syntax
   cat .github/mcp-config.json | jq .
   ```

3. **Check Logs:**
   MCP server logs are typically available in Copilot's output window.

### Setup Steps Failing

1. **Check Dependencies:**
   ```bash
   npm ci
   ```

2. **Verify System Dependencies:**
   ```bash
   # Install missing system packages
   sudo apt-get install -y <missing-package>
   ```

3. **Run Steps Manually:**
   Execute each step from `copilot-setup-steps.yml` manually to identify issues.

## 📖 Related Documentation

- [GitHub Copilot Instructions](copilot-instructions.md) - General Copilot guidelines
- [Custom Agents](agents/README.md) - Specialized Copilot agents
- [Contributing Guide](../CONTRIBUTING.md) - Contribution guidelines
- [Testing Guide](../docs/testing-guide.md) - Testing practices

## 🔗 Useful Links

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [MCP Servers on GitHub](https://github.com/modelcontextprotocol/servers)
- [Copilot for CLI](https://githubnext.com/projects/copilot-cli/)

## 📝 Version History

- **v1.0.0** (2025-11-02): Initial MCP server configuration
  - Filesystem, GitHub, TypeScript, ESLint, Vitest, NPM, Memory servers
  - Setup steps for dependency installation and validation
  - Comprehensive project context and guidelines

## 🤝 Contributing

When modifying these configurations:

1. Test changes in a Copilot Workspace session
2. Validate JSON/YAML syntax
3. Document any new servers or steps
4. Update this README with changes
5. Follow the project's contribution guidelines

## 📄 License

These configuration files are part of the CIA Compliance Manager project and are subject to the same license terms.
