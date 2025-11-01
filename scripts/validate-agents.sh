#!/bin/bash
# Validate GitHub Copilot agent configuration files
# This script ensures all agent YAML files are syntactically valid

set -e

AGENTS_DIR=".github/agents"
AGENTS=(
    "typescript-react-agent.yml"
    "testing-agent.yml"
    "code-review-agent.yml"
    "documentation-agent.yml"
    "security-compliance-agent.yml"
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
    
    # Validate YAML syntax using npx js-yaml
    if npx js-yaml "$AGENT_PATH" > /dev/null 2>&1; then
        echo "✅ Valid: $agent"
    else
        echo "❌ Invalid YAML: $agent"
        FAILED=1
    fi
    
    # Check for required fields
    if ! grep -q "^name:" "$AGENT_PATH"; then
        echo "   ⚠️  Warning: $agent missing 'name' field"
    fi
    
    if ! grep -q "^description:" "$AGENT_PATH"; then
        echo "   ⚠️  Warning: $agent missing 'description' field"
    fi
    
    if ! grep -q "^instructions:" "$AGENT_PATH"; then
        echo "   ⚠️  Warning: $agent missing 'instructions' field"
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
