#!/bin/bash
# Script to safely remove unused files identified by knip analysis
# Backs up files before removal for safety

# Create backup directory
BACKUP_DIR="./backup-unused-files-$(date +%Y%m%d%H%M%S)"
mkdir -p $BACKUP_DIR

# Function to safely remove a file with backup
remove_file() {
  local file="$1"
  if [ -f "$file" ]; then
    echo "Backing up and removing: $file"
    # Create directory structure in backup
    mkdir -p "$BACKUP_DIR/$(dirname "$file")"
    # Copy file to backup
    cp "$file" "$BACKUP_DIR/$file"
    # Remove the file
    rm "$file"
  else
    echo "File not found, skipping: $file"
  fi
}

# Documentation/Configuration Files
remove_file ".prettierrc.cjs"
remove_file "src/typedoc-entry.ts"

# Cypress Test Support Files
remove_file "cypress/e2e/common-imports.ts"
remove_file "cypress/support/command-types.d.ts"
remove_file "cypress/support/command-types.ts"
remove_file "cypress/support/index.d.ts"
remove_file "cypress/support/index.ts"
remove_file "cypress/support/smart-widget-testing.ts"
remove_file "cypress/support/test-patterns.ts"
remove_file "cypress/support/types.d.ts"
remove_file "cypress/support/types.ts"
remove_file "cypress/support/widget-interaction.ts"
remove_file "cypress/e2e/widgets/widget-test-helper.ts"
remove_file "cypress/support/plugins/esm-bridge.js"
remove_file "cypress/support/smart-widget-testing/index.ts"
remove_file "cypress/support/smart-widget-testing/widget-helpers.ts"
remove_file "cypress/support/types/index.d.ts"

# Unused Components and Indexes
remove_file "src/components/charts/index.ts"
remove_file "src/components/common/SecurityLevelSummaryItem.tsx"
remove_file "src/components/common/index.ts"
remove_file "src/components/securitylevel/index.ts"

# Unused Services and Hooks
remove_file "src/application/index.ts"
remove_file "src/constants/resourceConstants.ts"
remove_file "src/hooks/useCIAContent.ts"
remove_file "src/hooks/useSecurityResources.ts"
remove_file "src/services/types.ts"
remove_file "src/services/dataProviders/CIADataProvider.ts"

# Test Utilities
remove_file "src/tests/appTestUtils.ts"
remove_file "src/tests/index.ts"
remove_file "src/tests/mockConstants.ts"
remove_file "src/tests/mockData.ts"
remove_file "src/tests/mockFactory.tsx"
remove_file "src/tests/mockHelpers.ts"
remove_file "src/tests/setup.ts"
remove_file "src/tests/testMocks.ts"
remove_file "src/tests/testSetupHelpers.tsx"
remove_file "src/tests/testUtils/index.ts"
remove_file "src/tests/testUtils/renderUtils.tsx"

# Types
remove_file "src/types/compliance.d.ts"
remove_file "src/types/componentProps.ts"
remove_file "src/types/testTypes.ts"
remove_file "src/types/widget.ts"

# Styles
remove_file "src/styles/gridStyles.ts"

echo "Backup created at: $BACKUP_DIR"
echo "Run tests to verify application still works correctly."
echo "If needed, restore files from the backup directory."