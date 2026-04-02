# 🤖 GitHub Agentic Workflows Skill

## Strategic Principle

**GitHub Agentic Workflows enable Continuous AI — systematic, automated application of AI to software collaboration through secure, defensible, and auditable automation.**

**Last Updated**: 2026-04-02
**Framework Version**: GitHub Agentic Workflows v0.45+
**CLI**: `gh aw` (Go-based GitHub CLI extension)
**Compliance**: ISO 27001:2022, NIST CSF 2.0, OWASP Top 10 for Agentic Applications 2026

---

## Core References

### Hack23 ISMS Policies
- [Secure Development Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md)
- [AI Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/AI_Policy.md)
- [Access Control Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Access_Control_Policy.md)

### GitHub Agentic Workflows Documentation
- [Abridged docs (llms-small.txt)](https://github.github.com/gh-aw/llms-small.txt)
- [Full docs (llms-full.txt)](https://github.github.com/gh-aw/llms-full.txt)
- [Peli's Agent Factory Blog](https://github.github.com/gh-aw/_llms-txt/agentic-workflows.txt)
- [GitHub Blog: Automate repository tasks](https://github.blog/ai-and-ml/automate-repository-tasks-with-github-agentic-workflows/)
- [Creating Workflows Guide](https://github.github.com/gh-aw/setup/creating-workflows/)
- [Security Architecture](https://github.github.com/gh-aw/introduction/architecture/)

### Security Standards (2026)
- [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- [GitHub Agentic Security Principles](https://github.blog/ai-and-ml/github-copilot/how-githubs-agentic-security-principles-make-our-ai-agents-as-secure-as-possible/)
- [MCP Specification](https://blog.modelcontextprotocol.io/)

---

## What Are GitHub Agentic Workflows?

**GitHub Agentic Workflows** (`gh-aw`) is a Go-based GitHub CLI extension that enables writing agentic workflows in natural language using Markdown files, and running them as GitHub Actions workflows. Unlike traditional YAML-based CI/CD, agentic workflows use AI engines (Copilot, Claude, Codex, Gemini) to understand context and make decisions autonomously.

They augment existing deterministic CI/CD with **Continuous AI** capabilities — systematic, automated application of AI to software collaboration. Developed by GitHub Next and Microsoft Research, workflows run with added guardrails, using safe outputs and sandboxed execution.

| Traditional Workflows | Agentic Workflows |
|----------------------|-------------------|
| Fixed YAML with if/then logic | Natural language Markdown instructions |
| Pre-programmed steps | AI interprets context and decides actions |
| Brittle to context changes | Adapts to situation dynamically |
| Requires explicit conditionals | Infers appropriate behavior |
| Limited to coded scenarios | Handles novel situations |

---

## Core Concepts

### 1. Workflow Structure

Every agentic workflow is a Markdown file with YAML frontmatter + natural language instructions:

```yaml
---
timeout-minutes: 5
on: issues
permissions:
  issues: read
tools:
  github:
    toolsets: [issues, labels]
safe-outputs:
  add-labels:
    allowed: [bug, feature, enhancement, documentation]
  add-comment: {}
network: defaults
strict: true
---
```

```markdown
# Issue Triage Agent

When a new issue is created:
1. Analyze the issue content, title, and linked resources
2. Determine if it's a bug report, feature request, or question
3. Apply appropriate labels
4. Leave a helpful comment with next steps
```

### 2. Agentic Engines

Supported AI engines (v0.45+):

| Engine | Best For | Notes |
|--------|----------|-------|
| **Copilot** (default) | Code analysis, GitHub operations | Well-integrated, uses Copilot CLI |
| **Claude** | Complex reasoning, long context | Strong analytical capabilities |
| **Codex** | Code generation | OpenAI-based |
| **Gemini** | Multi-modal analysis | Google AI |

```yaml
---
engine: copilot  # or 'claude', 'codex', 'gemini'
---
```

### 3. Compilation & Lock Files

Markdown workflows compile to GitHub Actions YAML:

```bash
gh aw compile                # Compile all workflows
gh aw add-wizard <url>       # Add workflow from gallery
```

**Both files must be committed**: `.md` (source of truth) + `.lock.yml` (compiled workflow with security hardening).

### 4. Safe Outputs (Critical Security Pattern)

The AI runs with **read-only permissions** and produces structured output describing intended actions. A separate job with scoped write permissions executes validated requests.

```yaml
---
safe-outputs:
  create-issue-comment:
    max: 5                    # Rate limit
  create-issue:
    max: 3
    title-prefix: "[auto] "  # Required prefix
    labels: [automated]       # Required labels
  create-pull-request:
    max: 1
  add-labels:
    allowed: [bug, feature]   # Whitelist
  update-project:
    github-token: ${{ secrets.GH_PROJECT_TOKEN }}
    max: 10
  close-older-issues: true    # Auto-close previous runs
  threat-detection:
    enabled: true              # Default, be explicit
---
```

### 5. Safe Inputs

Custom MCP tools defined inline with controlled secret access:

```yaml
---
safe-inputs:
  fetch-api-data:
    description: Fetch data from internal API
    schema:
      type: object
      properties:
        endpoint: { type: string }
      required: [endpoint]
    implementation: |
      const response = await fetch(inputs.endpoint, {
        headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
      });
      return await response.json();
    env:
      API_KEY: ${{ secrets.INTERNAL_API_KEY }}
---
```

### 6. Model Context Protocol (MCP)

MCP is the standardized protocol (JSON-RPC 2.0) for AI agents to securely connect to external tools — "USB-C for AI integrations."

**Components**: MCP Servers (expose tools) → MCP Gateway (proxy) → MCP Clients (AI agents)

**GitHub MCP Toolsets** (v0.45+):

| Toolset | Key Tools |
|---------|-----------|
| `default` | context, repos, issues, pull_requests |
| `discussions` | list/create/update discussions |
| `actions` | workflows, logs, trigger runs |
| `projects` | GitHub Projects v2 boards |
| `security` | CodeQL, Dependabot, secret scanning |
| `stars` | star/unstar repositories |
| `notifications` | list/mark notifications |
| `gists` | create/list gists |
| `labels` | add/remove labels |

```yaml
---
tools:
  github:
    toolsets: [default, projects, security]
---
```

**Best Practice**: Use `toolsets:` (version-safe) instead of explicit tool lists.

---

## Security Architecture (Defense-in-Depth)

Five security layers protect against prompt injection, rogue MCP servers, and malicious agents:

```
📥 Event → 🔒 Read-only AI Agent (sandboxed, firewalled)
         → 📤 Proposed Output (artifact)
         → 🛡️ Threat Detection (AI-powered scan)
         → ✅ Write Job (scoped token) → GitHub API
         → ❌ Blocked (if suspicious)
```

### Layer 1: Read-Only Tokens
The AI agent receives read-only GitHub tokens. It cannot push, create PRs, or delete files directly.

### Layer 2: Zero Secrets in Agent
Agent process never receives write tokens, API keys, or credentials. Secrets exist only in separate safe-outputs jobs.

### Layer 3: Containerized with Network Firewall
Agent runs in isolated container. **Agent Workflow Firewall (AWF)** routes all outbound traffic through Squid proxy with domain allowlist. Non-listed traffic dropped at kernel level.

### Layer 4: Safe Outputs with Guardrails
Agent produces structured artifact describing intended actions. A gated job decides: hard limits per operation, required prefixes, label constraints.

### Layer 5: Agentic Threat Detection
AI-powered scan checks proposed changes for prompt injection, leaked credentials, and malicious code patterns before any write occurs.

---

## Implementation Rules

### MUST Rules (Non-Negotiable)

1. **✅ MUST use safe outputs pattern** — Never grant write permissions directly to AI jobs
2. **✅ MUST enable threat detection** — `threat-detection: { enabled: true }`
3. **✅ MUST use network controls** — `network: defaults` or explicit allowlist
4. **✅ MUST validate all inputs** — Schema validation via safe-inputs
5. **✅ MUST use least-privilege** — Minimal permissions, scoped tokens
6. **✅ MUST protect secrets** — GitHub secrets only, never hardcoded, only in safe-outputs jobs
7. **✅ MUST compile before commit** — `gh aw compile` → commit both `.md` + `.lock.yml`
8. **✅ MUST test in isolation** — TrialOps pattern before production
9. **✅ MUST follow OWASP Top 10 for Agentic Applications 2026**
10. **✅ MUST document threat models** — Include in workflow comments
11. **✅ MUST implement human approval** for critical actions (repo settings, access control)
12. **✅ MUST set rate limits** on all safe output types

### SHOULD Rules (Strongly Recommended)

1. **✅ SHOULD use toolsets** instead of explicit tool lists — `toolsets: [default]` is version-safe
2. **✅ SHOULD enable strict mode** — `strict: true`
3. **✅ SHOULD use workflow labels** — `labels: ["automation", "triage"]`
4. **✅ SHOULD implement concurrency controls** — `concurrency: { group: name, cancel-in-progress: true }`
5. **✅ SHOULD set timeout limits** — `timeout-minutes: 30`
6. **✅ SHOULD use memory for stateful workflows** — `cache-memory: { namespace: state }` (7-day retention)
7. **✅ SHOULD document workflow purpose** — Purpose, Trigger, Actions, Owner
8. **✅ SHOULD use orchestrator/worker pattern** for complex tasks
9. **✅ SHOULD version control agent prompts** — Store in `.github/agents/`
10. **✅ SHOULD monitor costs** — `gh aw logs --analyze`

### MAY Rules (Best Practice)

1. **✅ MAY use custom MCP servers** — With security review
2. **✅ MAY use repo-memory** — `repo-memory: { branch: "data/state" }` for long-term persistence
3. **✅ MAY use slash commands** — `on: { slash_command: { command: "/review" } }` for ChatOps
4. **✅ MAY use asset uploads** — `upload-asset: { branch: "assets/reports", allowed-exts: [.png, .pdf] }`

---

## Operational Patterns

| Pattern | Trigger | Description | Key Use Cases |
|---------|---------|-------------|---------------|
| **ChatOps** | `slash_command` | Interactive `/commands` in comments | Code reviews, analysis |
| **DailyOps** | `daily` | Scheduled daily improvements | Doc maintenance, tech debt |
| **IssueOps** | `issues` | Automated on issue creation | Auto-triage, smart routing |
| **LabelOps** | `issues: [labeled]` | Triggered by label changes | Priority handling, routing |
| **MemoryOps** | `weekly` | Stateful with persistent data | Trend analysis, metrics |
| **ProjectOps** | `issues`/`pull_request` | GitHub Projects management | Auto-assignment, status |
| **SideRepoOps** | `workflow_dispatch` | From separate repo | Safe experimentation |
| **TrialOps** | `workflow_dispatch` | Isolated testing | Prompt validation, demos |

**Selection Guide**: Start with TrialOps → Promote to IssueOps/DailyOps → Scale to MemoryOps/ProjectOps → Use ChatOps for interactive.

---

## Peli's Agent Factory: Real-World Patterns

The GitHub Next team built and operated **100+ agentic workflows** in the `github/gh-aw` repository. Key learnings:

### Proven Workflow Categories

| Category | Examples | Impact |
|----------|---------|--------|
| **Issue & PR Management** | Auto-triage, labeling, routing | Faster response times |
| **Continuous Documentation** | Doc maintenance, consistency | Always-current docs |
| **Continuous Improvement** | Code simplification, refactoring | Reduced complexity |
| **Metrics & Analytics** | Daily reports, trend analysis | Data-driven decisions |
| **Quality & Testing** | CI failure diagnosis, test improvements | Higher quality |
| **Security & Compliance** | Security review, compliance campaigns | Better security posture |
| **Project Coordination** | Plan command (514 merged PRs, 67% merge rate), task mining | Multi-agent orchestration |

### Key Lessons from Production

1. **Specialization > Monolith**: Focused agents outperform single all-purpose agents
2. **Guardrails Enable Innovation**: Strict constraints make experimentation safe
3. **Meta-Agents Are Valuable**: Agents that monitor other agents are incredibly useful
4. **Context Is Key**: Customized agents beat generic ones
5. **Observability Is Essential**: All actions must create visible, traceable artifacts
6. **Incremental Progress Beats Heroics**: Small daily improvements compound over time
7. **Cost-Quality Tradeoffs Are Real**: Longer analyses aren't always better

### High-Impact Workflow Examples

**Plan Command** (`/plan`): Breaks complex issues into actionable sub-tasks.
- 514 merged PRs out of 761 proposed (67% merge rate)
- Highest-volume workflow by attribution in the factory

**Discussion Task Miner**: Extracts actionable tasks from discussion threads.
- 60 merged PRs out of 105 proposed (57% merge rate)
- Perfect causal chain attribution

**CI Failure Doctor**: Diagnoses CI failures and suggests fixes.
**Code Simplifier**: Daily code simplification and cleanup.
**Security Review Agent** (`/security`): On-demand security analysis.

---

## Security Threat Models

| Threat | Mitigations |
|--------|-------------|
| **Prompt Injection** | Read-only AI permissions, safe outputs validation, threat detection, rate limiting |
| **Secret Leakage** | Secrets only in safe-outputs jobs, output sanitization |
| **Network Exfiltration** | Agent Workflow Firewall (AWF), domain allowlist, egress filtering |
| **Tool Misuse** | Toolset allowlists, rate limiting, scoped permissions |
| **Goal Hijacking** | Bounded instructions, safe outputs validation, human oversight |
| **Memory Poisoning** | Validation, integrity checks, separate namespaces, 7-day cache |
| **Supply Chain** | Tool allowlists, compilation validation, security scanning |

---

## OWASP Top 10 for Agentic Applications 2026

| OWASP Risk | GitHub Agentic Workflows Control |
|------------|----------------------------------|
| 1. Agent Goal Hijack | Specific instructions, safe outputs, validation |
| 2. Tool Misuse | Toolset allowlists, rate limiting, scoped permissions |
| 3. Prompt Injection | Read-only AI job, threat detection, output sanitization |
| 4. Privilege Escalation | Permission separation, least privilege, safe outputs |
| 5. Memory Poisoning | Validation, integrity checks, separate namespaces |
| 6. Secret Leakage | Secrets in safe outputs only, threat detection |
| 7. Unintended Actions | Human approval, dry-run mode, audit logging |
| 8. Supply Chain | Tool allowlists, compilation validation |
| 9. Resource Exhaustion | Rate limiting, timeout limits, concurrency controls |
| 10. Network Risks | Network allowlists, AWF firewall, egress filtering |

---

## Integration with Hack23 ISMS

### ISO 27001:2022 Mapping

| Control | Workflow Alignment |
|---------|-------------------|
| **A.8.1** Asset Management | Workflows as code assets, version controlled |
| **A.8.5** Secure Authentication | Token-based auth, GitHub OIDC, no hardcoded credentials |
| **A.8.9** Configuration Management | Workflow config as code, change tracking |
| **A.8.15** Logging | Audit trail, workflow run logs, safe output artifacts |
| **A.8.23** Web Filtering | Network allowlists, AWF egress controls |
| **A.8.26** Application Security | Safe outputs, threat detection, validation |
| **A.8.28** Secure Coding | Prompt engineering standards, workflow code review |

### NIST CSF 2.0 Mapping

| Function | Implementation |
|----------|---------------|
| **IDENTIFY** | Workflow inventory, threat models, asset classification |
| **PROTECT** | Access controls, safe outputs, network restrictions |
| **DETECT** | Threat detection, audit logging, monitoring |
| **RESPOND** | Rate limiting, human approval gates |
| **RECOVER** | Workflow rollback, version control |

### CIS Controls v8 Mapping

| Control | Workflow Implementation |
|---------|------------------------|
| **CIS 4** Secure Configuration | Frontmatter validation, strict mode |
| **CIS 5** Account Management | Token-based access, least privilege |
| **CIS 6** Access Control | Permission separation, read-only AI jobs |
| **CIS 8** Audit Log Management | Workflow runs, safe output artifacts |
| **CIS 12** Network Infrastructure | Network allowlists, AWF firewall |
| **CIS 16** Application Software | Secure workflow development |

---

## Quick Decision Guide

**✅ Good Use Cases**: Issue triage, PR review assistance, documentation maintenance, dependency updates, security analysis, project board management, weekly reports, ChatOps commands, content generation.

**❌ Poor Use Cases**: Production deployments (use CI/CD), financial transactions, bulk data processing, real-time monitoring, safety-critical operations, tasks requiring deterministic behavior.

---

## Related Resources

- **Hack23 ISMS**: [Secure Development](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md) | [AI Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/AI_Policy.md)
- **Skills**: [Security by Design](./security-by-design.md) | [Code Quality](./code-quality-excellence.md) | [ISMS Compliance](./isms-compliance.md)
- **GitHub**: [gh-aw Repository](https://github.com/github/gh-aw) | [Continuous AI](https://githubnext.com/projects/continuous-ai) | [Actions Docs](https://docs.github.com/en/actions)
- **Security**: [OWASP Agentic Top 10](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) | [MCP Protocol](https://blog.modelcontextprotocol.io/)

---

## Remember

1. **Security First**: Defense-in-depth, least privilege, safe outputs always
2. **Continuous AI**: Systematic automation of AI for software collaboration
3. **Agency with Control**: AI decides within defined boundaries
4. **Auditability**: All actions create visible, traceable artifacts
5. **Fail Secure**: Graceful degradation, explicit failure modes
6. **Start Simple**: TrialOps → production, iterate based on results
7. **Specialize**: Focused agents > monolithic agents
8. **Monitor**: Track costs, usage, and quality continuously

---

**Made with ❤️ for CIA Compliance Manager** | [Hack23 AB](https://www.hack23.com) | Continuous AI Excellence
