#!/usr/bin/env bash
# Validate GitHub Copilot agent configuration files
# This script ensures all agent markdown files have valid YAML frontmatter
#
# Dependencies:
#   - npx: Comes with Node.js (npm >= 5.2.0)
#   - js-yaml: Will be installed via npx if not present
#
# Usage:
#   ./scripts/validate-agents.sh
#   npm run validate:agents

set -e

# Check for required dependencies
if ! command -v npx &> /dev/null; then
    echo "❌ Error: npx is required but not found"
    echo "   Install Node.js (which includes npx): https://nodejs.org/"
    exit 1
fi

AGENTS_DIR=".github/agents"
AGENTS=(
    "product-task-agent.md"
    "typescript-react-agent.md"
    "testing-agent.md"
    "code-review-agent.md"
    "documentation-agent.md"
    "security-compliance-agent.md"
)

echo "Validating GitHub Copilot agent configurations..."
echo "=================================================="

# Check if agents directory exists
if [ ! -d "$AGENTS_DIR" ]; then
    echo "❌ Error: $AGENTS_DIR directory not found"
    exit 1
fi

# Validate each agent file
FAILED=0
for agent in "${AGENTS[@]}"; do
    AGENT_PATH="$AGENTS_DIR/$agent"
    
    if [ ! -f "$AGENT_PATH" ]; then
        echo "❌ Missing: $agent"
        FAILED=1
        continue
    fi
    
    # Extract YAML frontmatter (between first and second ---)
    FRONTMATTER=$(sed -n '/^---$/,/^---$/p' "$AGENT_PATH" | sed '1d;$d')
    
    if [ -z "$FRONTMATTER" ]; then
        echo "❌ Missing frontmatter: $agent"
        FAILED=1
        continue
    fi
    
    # Validate YAML syntax using npx js-yaml
    if echo "$FRONTMATTER" | npx js-yaml -t > /dev/null 2>&1; then
        echo "✅ Valid YAML: $agent"
        
        # Check for required fields
        if ! echo "$FRONTMATTER" | grep -q "^name:"; then
            echo "   ❌ Error: $agent missing required 'name' field"
            FAILED=1
        fi
        
        if ! echo "$FRONTMATTER" | grep -q "^description:"; then
            echo "   ❌ Error: $agent missing required 'description' field"
            FAILED=1
        fi
        
        # Check description length (should be under 200 chars)
        DESC_LINE=$(echo "$FRONTMATTER" | grep "^description:" || echo "")
        if [ -n "$DESC_LINE" ]; then
            DESC_VALUE=$(echo "$DESC_LINE" | sed 's/description: *//')
            DESC_LEN=${#DESC_VALUE}
            if [ $DESC_LEN -gt 200 ]; then
                echo "   ⚠️  Warning: $agent description is $DESC_LEN chars (max 200 recommended)"
            fi
        fi
    else
        echo "❌ Invalid YAML: $agent"
        FAILED=1
    fi
done

# Check if README exists
README_PATH="$AGENTS_DIR/README.md"
if [ -f "$README_PATH" ]; then
    echo "✅ Documentation: README.md exists"
else
    echo "❌ Missing: README.md"
    FAILED=1
fi

echo "=================================================="

if [ $FAILED -eq 0 ]; then
    echo "✅ All agent configurations are valid!"
    exit 0
else
    echo "❌ Some agent configurations have issues"
    exit 1
fi
