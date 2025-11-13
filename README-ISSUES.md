# Creating GitHub Issues for v0.9 Release

This directory contains everything needed to create 5 priority issues for the v0.9 release.

## 🚀 Quick Start (Automated)

The **easiest way** to create all 5 issues is using the provided shell script:

```bash
# 1. Authenticate with GitHub CLI
gh auth login

# 2. Run the script
./create-issues.sh
```

The script will create all 5 issues with proper labels, titles, and detailed bodies.

## 📋 What Issues Will Be Created?

1. **✅ Test Coverage** - Increase from 75% to 80%+ (Priority: High, Effort: 4-6h)
2. **🔒 Security Headers** - Address 10 ZAP findings (Priority: Critical, Effort: 4-6h)
3. **⚡ Bundle Optimization** - Reduce from 4MB to <500KB (Priority: High, Effort: 6-8h)
4. **🔧 TypeScript any** - Reduce from 251 to <50 (Priority: Medium, Effort: 5-7h)
5. **🧪 E2E Coverage** - Complete tests for 25 widgets (Priority: Medium, Effort: 6-8h)

**Total Estimated Effort:** 24-32 hours

## 📝 Manual Creation (Alternative)

If you prefer to create issues manually, see `ISSUES_FOR_V0.9_RELEASE.md` for complete issue templates with:
- Detailed objectives and background
- Specific acceptance criteria
- Implementation guidance with file paths
- Code examples and best practices
- Related resources

## ✅ What's Included

- **`create-issues.sh`** - Shell script to create all 5 issues automatically
- **`ISSUES_FOR_V0.9_RELEASE.md`** - Complete documentation of all 5 issues

## 🔧 Requirements

To use the automated script:
- GitHub CLI (`gh`) installed
- Authenticated with GitHub (`gh auth login`)
- Write access to the repository

## 📊 Metrics Summary

All metrics were gathered from actual codebase analysis:
- ✅ Test coverage: 75.06% (from `npm run coverage`)
- ✅ Bundle size: 4.0MB (from `npm run build`)
- ✅ Security: 10 findings (from ZAP scan issue #120)
- ✅ Code quality: 251 `any` occurrences (from grep analysis)
- ✅ E2E tests: 15 specs, 25 widgets (from filesystem counts)

**No TBD or placeholder values** - all metrics are accurate and measured.

## 🎯 Next Steps After Creating Issues

1. Assign issues to team members
2. Add to v0.9.0 milestone
3. Prioritize: Critical → High → Medium
4. Start with Issue #2 (security) and Issue #1 (test coverage)

## ❓ Troubleshooting

**"Error: GitHub CLI is not authenticated"**
- Run: `gh auth login`
- Follow the prompts to authenticate

**"Error: Resource not accessible by integration"**
- Ensure you have write access to the repository
- Check that your token has `repo` scope

**Issues created but labels not applied**
- Labels may need to be created first in the repository
- Or manually add labels after issue creation

## 📚 Additional Resources

- Original analysis: See PR description and commit history
- Repository: https://github.com/Hack23/cia-compliance-manager
- Related issue: #120 (ZAP security findings)
