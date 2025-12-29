<p align="center">
  <img src="https://hack23.github.io/cia-compliance-manager/icon-192.png" alt="Hack23 Logo" width="192" height="192">
</p>

<h1 align="center">🤝 Contributing — CIA Compliance Manager</h1>

<p align="center">
  <strong>🛡️ Secure Contribution Guidelines</strong><br>
  <em>🎯 Building Security Through Collaborative Excellence</em>
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/Owner-CEO-0A66C2?style=for-the-badge" alt="Owner"/></a>
  <a href="#"><img src="https://img.shields.io/badge/Version-1.0-555?style=for-the-badge" alt="Version"/></a>
  <a href="#"><img src="https://img.shields.io/badge/Effective-2024--11--17-success?style=for-the-badge" alt="Effective Date"/></a>
  <a href="#"><img src="https://img.shields.io/badge/Review-Quarterly-orange?style=for-the-badge" alt="Review Cycle"/></a>
</p>

**📋 Document Owner:** CEO | **📄 Version:** 1.0 | **📅 Last Updated:** 2024-11-17 (UTC)  
**🔄 Review Cycle:** Quarterly | **⏰ Next Review:** 2025-02-17

---

## 🎯 **Purpose Statement**

This contributing guide establishes secure contribution procedures for CIA Compliance Manager, implementing [Secure Development Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md) and [Change Management](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Change_Management.md) from Hack23 AB's ISMS framework.

We believe in **security through transparency** and **continuous improvement**, welcoming contributions that enhance the project while maintaining our high security standards.

*— James Pether Sörling, CEO/Founder*

---

## Contributing

[fork]: /fork
[pr]: /compare
[code-of-conduct]: CODE_OF_CONDUCT.md

Hi there! We're thrilled that you'd like to contribute to this project. Your help is essential for keeping it great.

Please note that this project is released with a [Contributor Code of Conduct][code-of-conduct]. By participating in this project you agree to abide by its terms.

## Issues and PRs

If you have suggestions for how this project could be improved, or want to report a bug, open an issue! We'd love all and any contributions. If you have questions, too, we'd love to hear them.

We'd also love PRs. If you're thinking of a large PR, we advise opening up an issue first to talk about it, though! Look at the links below if you're not sure how to open a PR.

## Submitting a pull request

1. [Fork][fork] and clone the repository.
1. Configure and install the dependencies: 
1. Make sure the tests pass on your machine:
1. Create a new branch: 
1. Make your change, add tests, and make sure the tests still pass.
1. Push to your fork and [submit a pull request][pr].
1. Pat your self on the back and wait for your pull request to be reviewed and merged.

Here are a few things you can do that will increase the likelihood of your pull request being accepted:

- Write and update tests.
- Keep your changes as focused as possible. If there are multiple changes you would like to make that are not dependent upon each other, consider submitting them as separate pull requests.
- Write a [good commit message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

Work in Progress pull requests are also welcome to get feedback early on, or if there is something blocked you.

## GitHub Copilot Assistance

This project has specialized GitHub Copilot agent profiles to help you with development:

- **TypeScript React Agent** - Expert assistance with TypeScript and React development
- **Testing Agent** - Help with Vitest unit tests and Cypress E2E tests
- **Code Review Agent** - Automated code quality and security reviews
- **Documentation Agent** - Support for technical documentation and API docs
- **Security Compliance Agent** - Guidance on security and compliance frameworks

Learn more about these agents in [`.github/agents/README.md`](.github/agents/README.md).

## Test ID Naming Convention

All test IDs in the codebase follow a consistent hierarchical pattern for improved test reliability and maintainability.

### Pattern
`{scope}-{element}-{modifier}`

### Examples
- Widget containers: `widget-cost-estimation`
- Buttons: `cost-estimation-button-submit`
- Sections: `security-summary-section-overview`
- Labels: `availability-label-current-level`
- Values: `cost-estimation-value-total`

### Rules
1. **Use kebab-case** (lowercase with hyphens)
2. **Start with widget/component name** for scoping
3. **Follow hierarchical structure** (parent → child → specific)
4. **Use semantic descriptors** (describe purpose, not appearance)
5. **Avoid generic names** like "button-1" or "div-2"
6. **Always use constants** from `src/constants/testIds.ts`

### Implementation

**✅ DO**: Use test ID constants
```tsx
import { createWidgetTestId } from '../constants/testIds';

const COST_IDS = createWidgetTestId('cost-estimation');

<div data-testid={COST_IDS.root}>
  <section data-testid={COST_IDS.section('capex')}>
    <button data-testid={COST_IDS.button('submit')}>Submit</button>
  </section>
</div>
```

**❌ DON'T**: Use hardcoded strings
```tsx
// BAD - Hardcoded strings
<div data-testid="cost-container">
  <section data-testid="capex-value">
    <button data-testid="submitBtn">Submit</button>
  </section>
</div>
```

### Helper Functions

The codebase provides helper functions for creating consistent test IDs:

```typescript
import { createTestId, createWidgetTestId } from '../constants/testIds';

// Simple test ID creation
const myId = createTestId('security', 'level', 'badge');
// Result: 'security-level-badge'

// Widget-scoped test ID generator
const WIDGET_IDS = createWidgetTestId('security-summary');
WIDGET_IDS.root           // 'widget-security-summary'
WIDGET_IDS.section('cia') // 'widget-security-summary-section-cia'
WIDGET_IDS.button('save') // 'widget-security-summary-button-save'
```

### ESLint Rule

An ESLint rule enforces this convention by preventing hardcoded test ID strings. If you need to add a test ID:

1. Check if a constant already exists in `src/constants/testIds.ts`
2. If not, add it following the naming convention
3. Import and use the constant in your component
4. Run `npm run lint` to verify compliance

## Resources

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Using Pull Requests](https://help.github.com/articles/about-pull-requests/)
- [GitHub Help](https://help.github.com)

---

## 📚 Related Documents

### 🛠️ Development & Security Policies
- [🛠️ Secure Development Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md) - Development security standards
- [📝 Change Management](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Change_Management.md) - Change control procedures
- [🔐 Information Security Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Information_Security_Policy.md) - Overall security governance
- [🔍 Vulnerability Management](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Vulnerability_Management.md) - Security testing and remediation

### 📝 Testing & Documentation
- [📝 Unit Test Plan](./docs/UnitTestPlan.md) - Unit testing requirements
- [🌐 E2E Test Plan](./docs/E2ETestPlan.md) - End-to-end testing standards
- [⚡ Performance Testing](./docs/performance-testing.md) - Performance benchmarks

### 🤖 GitHub Copilot Agents
- [🤖 Agent Guide](../.github/agents/README.md) - Copilot agent documentation
- [💻 TypeScript React Agent](../.github/agents/typescript-react-agent.md) - React development assistance
- [🧪 Testing Agent](../.github/agents/testing-agent.md) - Testing support
- [🔍 Code Review Agent](../.github/agents/code-review-agent.md) - Code quality reviews
- [🛡️ Security Compliance Agent](../.github/agents/security-compliance-agent.md) - Security guidance

### 📋 Project Governance
- [📜 Code of Conduct](./CODE_OF_CONDUCT.md) - Community standards
- [🔐 Security Policy](./SECURITY.md) - Vulnerability reporting
- [📋 README](./README.md) - Project overview

---

**📋 Document Control:**  
**✅ Approved by:** James Pether Sörling, CEO  
**📤 Distribution:** Public  
**🏷️ Classification:** [![Confidentiality: Public](https://img.shields.io/badge/C-Public-lightgrey?style=flat-square)](https://github.com/Hack23/ISMS-PUBLIC/blob/main/CLASSIFICATION.md#confidentiality-levels)  
**📅 Effective Date:** 2024-11-17  
**⏰ Next Review:** 2025-02-17  
**🎯 Framework Compliance:** [![ISO 27001](https://img.shields.io/badge/ISO_27001-2022_Aligned-blue?style=flat-square&logo=iso&logoColor=white)](https://github.com/Hack23/ISMS-PUBLIC/blob/main/CLASSIFICATION.md) [![NIST CSF 2.0](https://img.shields.io/badge/NIST_CSF-2.0_Aligned-green?style=flat-square&logo=nist&logoColor=white)](https://github.com/Hack23/ISMS-PUBLIC/blob/main/CLASSIFICATION.md) [![CIS Controls](https://img.shields.io/badge/CIS_Controls-v8.1_Aligned-orange?style=flat-square&logo=cisecurity&logoColor=white)](https://github.com/Hack23/ISMS-PUBLIC/blob/main/CLASSIFICATION.md) [![AWS Well-Architected](https://img.shields.io/badge/AWS-Well_Architected-orange?style=flat-square&logo=amazon-aws&logoColor=white)](https://github.com/Hack23/ISMS-PUBLIC/blob/main/CLASSIFICATION.md)
