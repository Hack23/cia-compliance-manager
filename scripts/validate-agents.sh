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
    
    # Validate YAML syntax and extract fields using npx js-yaml
    if YAML_OUTPUT=$(npx js-yaml "$AGENT_PATH" 2>&1); then
        echo "✅ Valid: $agent"
        
        # Check for required fields in JSON output (js-yaml converts to JSON)
        REQUIRED_FIELDS=("name" "description" "instructions")
        for field in "${REQUIRED_FIELDS[@]}"; do
            if ! echo "$YAML_OUTPUT" | grep -q "\"$field\":"; then
                echo "   ⚠️  Warning: $agent missing '$field' field"
            fi
        done
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
