import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import { createRequire } from 'module';

// Load custom local rules
const require = createRequire(import.meta.url);
const localRules = require('./eslint-local-rules.cjs');

export default [
  // Base configurations
  js.configs.recommended,
  ...tseslint.configs.recommended,
  
  // Global settings for all files
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'local': {
        rules: localRules,
      },
    },
    rules: {
      // Base rules for all files
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // Custom rule: enforce test ID constants
      'local/no-hardcoded-testid': 'warn',
    },
  },
  
  // Test files - disable strict checks
  {
    files: [
      '**/tests/**/*.ts', 
      '**/tests/**/*.tsx',
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/test-*.ts',
      '**/test-*.tsx',
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/*.extended.test.tsx',
      '**/*.comprehensive.test.tsx',
      '**/*.enhanced.test.tsx',
      '**/*.darkmode.test.tsx',
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-console': 'off',
      'local/no-hardcoded-testid': 'off', // Allow hardcoded test IDs in tests
    },
  },
  
  // Mock files - be more lenient
  {
    files: [
      '**/__mocks__/**',
      '**/mocks/**',
      '**/*.mock.ts',
      '**/*.mock.tsx',
      '**/testMocks.ts',
      '**/testMocks/**',
      '**/testUtils/**',
      '**/mockFactory.ts',
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  
  // Type definition files - special handling
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      // Empty interfaces extending supertypes are common in declaration merging
      '@typescript-eslint/no-empty-object-type': 'off',
      // Triple-slash references are standard in .d.ts files
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
  
  // Service and utility files
  {
    files: ['**/services/**', '**/utils/**'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  
  // Component files - relax unused vars rules for props destructuring
  {
    files: ['**/components/**/*.tsx', '**/components/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_|^props$|^e$|^event$|^component$',
          varsIgnorePattern:
            '^_|^React$|options$|Level$|className$|color$|description$|container$|rerender$|totalScore$|compact$|show|span$',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  
  // Widget files - have complex prop patterns
  {
    files: ['**/widgets/**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern:
            '^_|.*Level$|^roi.*|^options$|^break.*$|^total.*$|^.*Estimate$',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  
  // Hook files and their tests
  {
    files: ['**/hooks/**/*.ts', '**/hooks/**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_|^use.*$|^render.*$',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  
  // Cypress files - allow idiomatic patterns
  {
    files: [
      'cypress/**/*.ts',
      'cypress/**/*.js',
      'cypress.config.ts',
    ],
    rules: {
      // Cypress uses global namespace augmentation for custom commands
      '@typescript-eslint/no-namespace': 'off',
      // Cypress support files use require() to control load order
      '@typescript-eslint/no-require-imports': 'off',
      // Chai-style assertions like expect(x).to.be.true are expressions
      '@typescript-eslint/no-unused-expressions': 'off',
      // Allow any in Cypress test/support code
      '@typescript-eslint/no-explicit-any': 'off',
      // Allow Function type in Cypress support shims
      '@typescript-eslint/no-unsafe-function-type': 'off',
      // Allow console in Cypress support/test files
      'no-console': 'off',
      // Allow hardcoded test IDs in Cypress tests
      'local/no-hardcoded-testid': 'off',
    },
  },

  // Files to ignore
  {
    ignores: [
      'node_modules/**/*.*',
      'dist/**',
      'build/',
      'coverage/',
      '**/*.js.map',
      '**/*.d.ts.map',
      'docs/**',
    ],
  },
];