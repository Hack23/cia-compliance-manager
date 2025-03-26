import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

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
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      // Base rules for all files
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
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
      'react-hooks/exhaustive-deps': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-console': 'off',
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