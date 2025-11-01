#!/usr/bin/env bash
# Validate GitHub Copilot agent configuration files
# This script ensures all agent YAML files are syntactically valid
#
# Dependencies:
#   - npx: Comes with Node.js (npm >= 5.2.0)
#   - jq: JSON processor (https://stedolan.github.io/jq/)
#     Install with: apt-get install jq (Linux), brew install jq (macOS)
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

if ! command -v jq &> /dev/null; then
    echo "❌ Error: jq is required but not found"
    echo "   Install jq: apt-get install jq (Linux) or brew install jq (macOS)"
    exit 1
fi

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
    # npx will automatically download js-yaml if not present
    if YAML_JSON=$(npx js-yaml "$AGENT_PATH" 2>&1); then
        echo "✅ Valid: $agent"
        
        # Check for required fields using jq for proper JSON parsing
        REQUIRED_FIELDS=("name" "description" "instructions")
        for field in "${REQUIRED_FIELDS[@]}"; do
            if ! echo "$YAML_JSON" | jq -e ".$field" > /dev/null 2>&1; then
                echo "   ❌ Error: $agent missing required '$field' field"
                FAILED=1
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
