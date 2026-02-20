# 🔌 MCP Server Integration Skill

## Strategic Principle

**MCP servers provide structured, auditable tool access for AI agents — always configure through declarative JSON, authenticate via secrets, and enforce least-privilege toolset selection.**

This skill covers Model Context Protocol (MCP) server integration for GitHub Copilot agents, including gateway configuration, security hardening, custom agent patterns, and coding agent orchestration across Hack23 repositories.

**Last Updated**: 2025-07-14  
**Protocol Version**: MCP v2025-03-26  
**Compliance**: ISO 27001:2022, NIST CSF 2.0, CIS Controls v8

---

## Core References

### Hack23 ISMS Policies
- [Access Control Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Access_Control_Policy.md)
- [Secure Development Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md)
- [AI Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/AI_Policy.md)
- [Cryptographic Controls Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Cryptographic_Controls_Policy.md)

### MCP Specification & GitHub Integration
- [Model Context Protocol Specification](https://modelcontextprotocol.io/specification/)
- [GitHub MCP Server](https://github.com/github/github-mcp-server)
- [Copilot Coding Agent Documentation](https://docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent-to-work-on-tasks)
- [Copilot Custom Instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot)

---

## 1. MCP Configuration Structure (MUST)

### Canonical `copilot-mcp.json` Format

All MCP server configurations **MUST** be placed in `.github/copilot-mcp.json` at the repository root. The file uses a declarative JSON structure:

```json
{
  "servers": [
    {
      "name": "github",
      "type": "stdio",
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": {
          "$ref": "#/secrets/GITHUB_PERSONAL_ACCESS_TOKEN"
        }
      },
      "tools": [
        "get_file_contents",
        "search_code",
        "list_issues",
        "get_issue",
        "create_issue",
        "list_pull_requests",
        "get_pull_request",
        "search_repositories"
      ]
    }
  ]
}
```

### Configuration Rules

| Rule | Requirement | Rationale |
|------|-------------|-----------|
| File location | `.github/copilot-mcp.json` | Standard discovery path for Copilot |
| Transport type | `"type": "stdio"` | Secure local transport; no network exposure |
| Container runtime | Docker with `--rm` flag | Ephemeral containers prevent state leaks |
| Interactive flag | `-i` flag required | Enables stdin/stdout communication |
| Token injection | Environment variable via `$ref` | Never inline tokens in config |
| Tool selection | Explicit `tools` array | Least-privilege; only enable needed tools |

### ✅ GOOD: Minimal toolset for read-only agent
```json
{
  "tools": ["get_file_contents", "search_code", "list_issues"]
}
```

### ❌ BAD: No tool restriction (grants all permissions)
```json
{
  "tools": []
}
```

---

## 2. GitHub MCP Server Toolsets (MUST KNOW)

The GitHub MCP server exposes 12 toolset categories. **MUST** select only the toolsets required for each agent's responsibilities.

### Available Toolsets

| Toolset | Key Tools | Use Case |
|---------|-----------|----------|
| **context** | `get_file_contents`, `search_code`, `get_repository_tree` | Read repository files and structure |
| **repos** | `search_repositories`, `list_branches`, `list_commits`, `list_tags` | Repository discovery and metadata |
| **issues** | `list_issues`, `get_issue`, `create_issue`, `update_issue`, `search_issues` | Issue tracking and management |
| **pull_requests** | `list_pull_requests`, `get_pull_request`, `create_pull_request`, `merge_pull_request` | PR lifecycle management |
| **users** | `search_users`, `get_me` | User lookup and identity |
| **projects** | `list_projects`, `get_project`, `update_project_item` | Project board management |
| **actions** | `list_workflows`, `list_workflow_runs`, `get_job_logs`, `rerun_workflow` | CI/CD monitoring and control |
| **security** | `list_code_scanning_alerts`, `list_dependabot_alerts`, `list_secret_scanning_alerts` | Security posture monitoring |
| **discussions** | `list_discussions`, `get_discussion`, `get_discussion_comments` | Community engagement |
| **stars** | `list_starred_repositories`, `star_repository` | Repository bookmarking |
| **notifications** | `list_notifications`, `dismiss_notification`, `mark_all_notifications_read` | Activity monitoring |
| **gists** | `list_gists`, `create_gist`, `get_gist` | Code snippet sharing |

### Toolset Selection by Agent Role

```
# Read-only research agent
tools: context + repos + issues

# Code review agent
tools: context + repos + pull_requests + security

# Product task agent
tools: issues + projects + pull_requests

# DevOps agent
tools: actions + repos + security + notifications

# Full-access coding agent
tools: context + repos + issues + pull_requests + actions + security
```

---

## 3. Security Rules for MCP (MUST)

### 3.1 Secrets-Based Authentication (MANDATORY)

**MUST** use secret references for all tokens. **NEVER** hardcode credentials.

```json
{
  "env": {
    "GITHUB_PERSONAL_ACCESS_TOKEN": {
      "$ref": "#/secrets/GITHUB_PERSONAL_ACCESS_TOKEN"
    }
  }
}
```

### 3.2 Least-Privilege Toolset Selection (MANDATORY)

**MUST** restrict tools to the minimum set required for the agent's function:

```
✅ GOOD: Agent that only reads code gets only read tools
   tools: ["get_file_contents", "search_code", "get_repository_tree"]

❌ BAD: Agent that only reads code gets write tools too
   tools: ["get_file_contents", "create_issue", "merge_pull_request"]
```

### 3.3 Container Isolation (MANDATORY)

**MUST** run MCP servers in ephemeral containers:
- Use `--rm` flag to auto-remove containers after exit
- Use `-i` flag for stdin communication (no network ports)
- Pin container image tags in production (avoid `:latest` in CI)

### 3.4 Token Scope Restrictions (SHOULD)

**SHOULD** use fine-grained personal access tokens with minimal scope:

| Agent Type | Recommended Scopes |
|-----------|-------------------|
| Read-only | `contents:read`, `issues:read`, `pull_requests:read` |
| Issue management | `contents:read`, `issues:write`, `projects:write` |
| Code review | `contents:read`, `pull_requests:write`, `security_events:read` |
| Full automation | `contents:write`, `issues:write`, `pull_requests:write`, `actions:write` |

### 3.5 Audit Trail (SHOULD)

**SHOULD** log all MCP tool invocations for compliance:
- Tool name and parameters
- Timestamp and agent identity
- Success/failure status
- Repository context

---

## 4. Custom Agent Patterns (MUST)

### 4.1 Agent File Structure

Custom agents **MUST** be placed in `.github/agents/` with `.md` extension:

```
.github/
├── agents/
│   ├── README.md                      # Agent catalog
│   ├── code-review-agent.md           # Domain-specific agent
│   ├── testing-agent.md
│   ├── security-compliance-agent.md
│   ├── documentation-agent.md
│   ├── product-task-agent.md
│   └── typescript-react-agent.md
├── copilot-mcp.json                   # MCP server config
├── copilot-instructions.md            # Repository instructions
└── skills/
    └── *.md                           # Skill files
```

### 4.2 Agent Definition Structure

Each agent **MUST** include:

```markdown
# Agent Name

## Description
Brief description of the agent's role and expertise.

## Tools
- List of tools the agent can use
- MCP server references

## Instructions
Detailed behavioral instructions for the agent.

## Constraints
- Security boundaries
- Scope limitations
- Escalation rules
```

### 4.3 Agent-MCP Server Binding

Agents reference MCP servers by name from `copilot-mcp.json`:

```markdown
## Tools
- **GitHub MCP Server** (`github`): For repository operations
  - get_file_contents, search_code, list_issues
```

**MUST** ensure the tools listed in the agent match the tools enabled in `copilot-mcp.json`.

---

## 5. Copilot Coding Agent Integration (MUST KNOW)

### 5.1 Core Operations

The Copilot coding agent provides three primary operations:

| Operation | Tool | Purpose |
|-----------|------|---------|
| **Assign to issue** | `assign_copilot_to_issue` | Assign Copilot to work on an existing issue |
| **Create PR** | `create_pull_request_with_copilot` | Create a PR with AI-generated implementation |
| **Check status** | `get_copilot_job_status` | Monitor job progress and get PR URL |

### 5.2 Assigning Copilot to Issues

```typescript
// Parameters for assign_copilot_to_issue
{
  owner: "Hack23",                    // Repository owner
  repo: "cia-compliance-manager",     // Repository name
  issue_number: 42,                   // Target issue
  base_ref: "main",                   // Starting branch (optional)
  custom_instructions: "..."          // Additional guidance (optional)
}
```

**Custom instructions** provide context beyond the issue body:

```
✅ GOOD: Specific, actionable instructions
   "Follow the existing service pattern in src/services/BaseService.ts.
    Use the types defined in src/types/cia.ts. Write tests using Vitest."

❌ BAD: Vague or redundant instructions
   "Write good code and make sure it works."
```

### 5.3 Creating PRs with Copilot

```typescript
// Parameters for create_pull_request_with_copilot
{
  owner: "Hack23",
  repo: "cia-compliance-manager",
  title: "Fix: Resolve security level calculation bug",
  problem_statement: "Detailed description of what to implement...",
  base_ref: "main"                    // Optional starting branch
}
```

### 5.4 Job Monitoring

```typescript
// Parameters for get_copilot_job_status
{
  owner: "Hack23",
  repo: "cia-compliance-manager",
  id: "job-id-or-pr-number"          // From assign or create response
}
```

**Job states**: `queued` → `in_progress` → `completed` | `failed`

---

## 6. Stacked PRs and Task Chaining (SHOULD)

### 6.1 Sequential Task Pattern

For complex changes that span multiple concerns, use sequential Copilot assignments:

```
Issue #1: Add types → PR #10 (base: main)
Issue #2: Add service → PR #11 (base: PR #10 branch)
Issue #3: Add component → PR #12 (base: PR #11 branch)
Issue #4: Add tests → PR #13 (base: PR #12 branch)
```

Use `base_ref` to chain PRs:

```typescript
// Step 1: Create foundation
assign_copilot_to_issue({
  owner: "Hack23",
  repo: "cia-compliance-manager",
  issue_number: 100,
  base_ref: "main"
});

// Step 2: Build on foundation (after Step 1 completes)
assign_copilot_to_issue({
  owner: "Hack23",
  repo: "cia-compliance-manager",
  issue_number: 101,
  base_ref: "copilot/fix-100"  // Branch from Step 1
});
```

### 6.2 Monitoring Chained Tasks

**MUST** verify each step completes before starting the next:

```typescript
// Poll until complete
const status = get_copilot_job_status({
  owner: "Hack23",
  repo: "cia-compliance-manager",
  id: "job-id"
});

// Only proceed when status is "completed"
if (status === "completed") {
  // Start next task in chain
}
```

### 6.3 Task Decomposition Guidelines

| Change Size | Strategy | Example |
|-------------|----------|---------|
| Small (< 100 lines) | Single PR | Bug fix, documentation update |
| Medium (100-500 lines) | 2-3 stacked PRs | New component with tests |
| Large (500+ lines) | 4+ stacked PRs | New feature with types, service, UI, tests |

---

## 7. Compliance Mapping

### ISO 27001:2022 Controls

| Control | Description | MCP Implementation |
|---------|-------------|-------------------|
| A.8.9 | Configuration management | `copilot-mcp.json` declarative config |
| A.8.3 | Information access restriction | Least-privilege toolset selection |
| A.5.17 | Authentication information | Secrets-based token management |
| A.8.28 | Secure coding | Agent instructions enforce coding standards |
| A.8.25 | Secure development lifecycle | Coding agent follows SDLC via instructions |

### NIST CSF 2.0 Functions

| Function | Category | MCP Implementation |
|----------|----------|-------------------|
| **Protect (PR)** | PR.AA | Token authentication via secret refs |
| **Protect (PR)** | PR.DS | Container isolation for data security |
| **Detect (DE)** | DE.CM | Security toolset monitors alerts |
| **Respond (RS)** | RS.AN | Automated issue creation for findings |
| **Govern (GV)** | GV.PO | Agent instructions enforce policies |

### CIS Controls v8

| Control | Description | MCP Implementation |
|---------|-------------|-------------------|
| 3.3 | Configure data access control lists | Toolset restriction per agent role |
| 6.1 | Establish access granting process | Fine-grained token scopes |
| 6.8 | Define access revocation process | Ephemeral containers with `--rm` |
| 16.1 | Establish secure application development process | Coding agent with SDLC instructions |

---

## 8. Quick Decision Guide

### When to Use MCP Server Integration

```
Need AI agent to read/write GitHub resources?
├── Yes → Configure GitHub MCP server in copilot-mcp.json
│   ├── Read-only access? → Restrict to context + repos toolsets
│   ├── Issue management? → Add issues + projects toolsets
│   ├── Code changes? → Use Copilot coding agent tools
│   └── Security monitoring? → Add security toolset
└── No → MCP server not needed; use direct API or CLI
```

### MCP Server vs Direct API

| Consideration | Use MCP Server | Use Direct API |
|--------------|----------------|----------------|
| AI agent needs structured tools | ✅ | |
| CI/CD automation script | | ✅ |
| Custom Copilot agent | ✅ | |
| GitHub Actions workflow | | ✅ |
| Interactive AI assistant | ✅ | |
| Batch data processing | | ✅ |

### Toolset Selection Checklist

Before configuring an MCP server, answer:

- [ ] What is the agent's primary responsibility?
- [ ] What is the minimum set of tools needed?
- [ ] Does the agent need write access to any resource?
- [ ] What token scopes are required?
- [ ] Is container isolation configured (`--rm`, `-i`)?
- [ ] Are secrets properly referenced (no hardcoded tokens)?
- [ ] Is the agent definition consistent with `copilot-mcp.json`?

---

## 9. Related Resources

### Skills
- [GitHub Agentic Workflows](github-agentic-workflows.md) — Workflow automation with AI
- [Security by Design](security-by-design.md) — Security principles for all development
- [ISMS Compliance](isms-compliance.md) — Information security management

### Documentation
- [Copilot Instructions](../../.github/copilot-instructions.md) — Repository-level Copilot config
- [Agent Catalog](../../.github/agents/README.md) — Available custom agents

### External
- [MCP Specification](https://modelcontextprotocol.io/specification/) — Protocol definition
- [GitHub MCP Server](https://github.com/github/github-mcp-server) — Official GitHub MCP implementation
- [Copilot Extensibility](https://docs.github.com/en/copilot/building-copilot-extensions) — Building Copilot extensions
