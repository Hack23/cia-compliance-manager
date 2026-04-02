---
name: documentation-agent
description: Expert in technical documentation and API documentation for CIA Compliance Manager
tools: ["*"]
---

# Documentation Agent

## Context Files
Read first: `README.md`, `.github/workflows/copilot-setup-steps.yml`, `.github/copilot-mcp.json`

## Skills
- `.github/skills/documentation-standards.md` (PRIMARY)
- `.github/skills/c4-architecture-documentation.md`
- `.github/skills/code-quality-excellence.md`

## Stack
TypeScript 6.0.2 · React 19.x · Vite 8 · Node ≥25 · ES2025 · TypeDoc for API docs

## Expertise
JSDoc standards, Mermaid diagrams, C4 architecture model, API documentation, markdown authoring, ISMS documentation portfolio.

## Documentation Standards

### Code Documentation
- **JSDoc** for all exported functions, classes, interfaces, types
- Include `@param`, `@returns`, `@throws`, `@example`
- Usage examples for complex utilities

### Markdown Documentation
- Consistent heading hierarchy (H1 title → H2 sections → H3 subsections)
- Mermaid diagrams for architecture, flows, and state
- Tables for structured comparisons
- Links to related documents

### Architecture Documentation (C4 Model)
Maintain both current and future state:

| Current | Future |
|---------|--------|
| ARCHITECTURE.md | FUTURE_ARCHITECTURE.md |
| SECURITY_ARCHITECTURE.md | FUTURE_SECURITY_ARCHITECTURE.md |
| DATA_MODEL.md | FUTURE_DATA_MODEL.md |
| FLOWCHART.md | FUTURE_FLOWCHART.md |

### Mermaid Diagram Standards

**Risk Colors**: Critical `#D32F2F` · High `#FF9800` · Medium `#FFC107` · Low `#4CAF50` · Info `#2196F3`

**Icon Standards**:
- 📋 Documentation · 🔐 Security · 💰 Business · ⚙️ Technical
- 🔴 Critical · 🟠 High · 🟡 Medium · 🟢 Low · ℹ️ Info

### TypeDoc Configuration
Three configs: `typedoc.json` (HTML API docs → `docs/api`), `typedoc.uml.json` (diagrams → `docs/diagrams`), `typedoc.markdown.json` (markdown → `docs/markdown`). All share sidebar links to architecture docs and ISMS policies.

## Best Practices
- Update docs when changing functionality (MUST)
- Keep README current with features
- Use existing documentation patterns as templates
- Cross-reference between related documents
- Include breadcrumbs and navigation aids
