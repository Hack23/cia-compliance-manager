#!/usr/bin/env node
/**
 * Design Token Audit Script
 * 
 * Scans widget files for hardcoded design values that should use design tokens.
 * Reports violations and provides statistics for tracking progress.
 * 
 * Usage: node scripts/audit-design-tokens.js
 */

import { readFileSync } from 'fs';
import { glob } from 'glob';
import { relative } from 'path';

// Patterns to detect hardcoded values
const HARDCODED_PATTERNS = [
  {
    name: 'Hardcoded padding (p-[0-9])',
    pattern: /className="[^"]*\bp-\d+\b/g,
    recommendation: 'Use p-xs, p-sm, p-md, p-lg, p-xl, or p-xxl'
  },
  {
    name: 'Hardcoded margin (m-[0-9], mb-[0-9], mt-[0-9], etc.)',
    pattern: /className="[^"]*\bm[tblrxy]?-\d+\b/g,
    recommendation: 'Use m-xs, m-sm, m-md, m-lg, m-xl, m-xxl (or mb-, mt-, etc.)'
  },
  {
    name: 'Hardcoded gap (gap-[0-9])',
    pattern: /className="[^"]*\bgap-\d+\b/g,
    recommendation: 'Use gap-xs, gap-sm, gap-md, gap-lg, gap-xl, gap-xxl'
  },
  {
    name: 'Hardcoded text size (text-[0-9]xl)',
    pattern: /className="[^"]*\btext-\d*xl\b/g,
    recommendation: 'Use text-caption, text-body, text-body-lg, text-subheading, text-heading, text-title, text-display'
  },
  {
    name: 'Hardcoded border radius (rounded-[0-9])',
    pattern: /className="[^"]*\brounded-\d+\b/g,
    recommendation: 'Use rounded-sm, rounded-md, rounded-lg, rounded-xl'
  },
  {
    name: 'Inline style padding/margin (px values)',
    pattern: /style={{[^}]*\b(padding|margin|gap):\s*['"]?\d+px['"]?/g,
    recommendation: 'Use SPACING tokens from designTokens.ts'
  },
  {
    name: 'Inline style font-size (rem/px values)',
    pattern: /style={{[^}]*\bfontSize:\s*['"]?[\d.]+(?:px|rem)['"]?/g,
    recommendation: 'Use TYPOGRAPHY tokens from designTokens.ts'
  },
];

/**
 * Scan a file for design token violations
 */
function scanFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const violations = [];

    HARDCODED_PATTERNS.forEach(({ name, pattern, recommendation }) => {
      const matches = content.match(pattern);
      if (matches && matches.length > 0) {
        // Get line numbers for each match
        const lines = content.split('\n');
        const matchDetails = [];
        
        // Track positions to avoid reporting the same match location multiple times
        let searchStartIndex = 0;
        matches.forEach(match => {
          const index = content.indexOf(match, searchStartIndex);
          if (index !== -1) {
            const lineNumber = content.substring(0, index).split('\n').length;
            const lineContent = lines[lineNumber - 1]?.trim() || '';
            
            matchDetails.push({
              line: lineNumber,
              content: lineContent.substring(0, 100) + (lineContent.length > 100 ? '...' : '')
            });
            
            // Move search position forward to find next occurrence
            searchStartIndex = index + match.length;
          }
        });

        violations.push({
          type: name,
          count: matches.length,
          recommendation,
          matches: matchDetails
        });
      }
    });

    return violations;
  } catch (error) {
    console.error(`Error scanning ${filePath}:`, error.message);
    return [];
  }
}

/**
 * Main audit function
 */
async function auditDesignTokens() {
  console.log('🔍 Design Token Audit\n');
  console.log('Scanning widget files for hardcoded design values...\n');

  // Find all widget files (exclude tests)
  const files = await glob('src/components/widgets/**/*.tsx', {
    ignore: ['**/*.test.tsx', '**/*.spec.tsx']
  });

  console.log(`Found ${files.length} widget files to scan\n`);

  let totalViolations = 0;
  const fileViolations = [];

  // Scan each file
  files.forEach(file => {
    const violations = scanFile(file);
    if (violations.length > 0) {
      const fileViolationCount = violations.reduce((sum, v) => sum + v.count, 0);
      totalViolations += fileViolationCount;
      fileViolations.push({
        file: relative(process.cwd(), file),
        violations,
        totalCount: fileViolationCount
      });
    }
  });

  // Sort files by violation count (highest first)
  fileViolations.sort((a, b) => b.totalCount - a.totalCount);

  // Print results
  if (totalViolations === 0) {
    console.log('✅ No design token violations found!\n');
    console.log('All widgets are using design tokens consistently.\n');
    return;
  }

  console.log(`❌ Found ${totalViolations} design token violations in ${fileViolations.length} files\n`);
  console.log('=' .repeat(80) + '\n');

  // Print detailed violations by file
  fileViolations.forEach(({ file, violations, totalCount }) => {
    console.log(`📄 ${file} (${totalCount} violations)`);
    console.log('-'.repeat(80));
    
    violations.forEach(({ type, count, recommendation, matches }) => {
      console.log(`\n  ⚠️  ${type}: ${count} occurrence(s)`);
      console.log(`  💡 Recommendation: ${recommendation}`);
      
      // Show first 3 matches with line numbers
      const samplesToShow = Math.min(3, matches.length);
      if (samplesToShow > 0) {
        console.log(`  📍 Examples:`);
        matches.slice(0, samplesToShow).forEach(({ line, content }) => {
          console.log(`     Line ${line}: ${content}`);
        });
        if (matches.length > samplesToShow) {
          console.log(`     ... and ${matches.length - samplesToShow} more`);
        }
      }
    });
    
    console.log('\n' + '='.repeat(80) + '\n');
  });

  // Print summary statistics
  console.log('📊 Summary Statistics\n');
  console.log(`Total violations: ${totalViolations}`);
  console.log(`Files with violations: ${fileViolations.length} / ${files.length}`);
  console.log(`Clean files: ${files.length - fileViolations.length} / ${files.length}`);
  console.log(`Compliance rate: ${((files.length - fileViolations.length) / files.length * 100).toFixed(1)}%`);
  
  // Group violations by type
  const violationsByType = {};
  fileViolations.forEach(({ violations }) => {
    violations.forEach(({ type, count }) => {
      violationsByType[type] = (violationsByType[type] || 0) + count;
    });
  });
  
  console.log('\n📈 Violations by Type:\n');
  Object.entries(violationsByType)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });
  
  console.log('\n');
  process.exit(1); // Exit with error code to fail CI if violations found
}

// Run the audit
auditDesignTokens().catch(error => {
  console.error('Error running audit:', error);
  process.exit(1);
});
