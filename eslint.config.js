import _globals from "globals";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import vitestPlugin from "eslint-plugin-vitest";
import testingLibraryPlugin from "eslint-plugin-testing-library";
import prettierConfig from "eslint-config-prettier";
import cypressPlugin from "eslint-plugin-cypress";

// React version from package.json
const reactSettings = {
  version: "19.0.0",
  react: {
    version: "19.0.0",
  },
};

export default [
  // Global ignores to improve performance
  {
    ignores: [
      // Dependency directories
      "**/node_modules/**",
      "node_modules/**",
      "**/jspm_packages/**",

      // Build output
      "**/dist/**",
      "**/build/**",
      "**/out/**",
      "**/.next/**",
      "**/.nuxt/**",
      "**/coverage/**",

      // Other generated files
      "**/.eslintcache",
      "**/*.d.ts",
      "**/vite-env.d.ts",

      // Specific file types for performance
      "**/*.min.js",
      "**/*bundle.js",

      // Special directories
      "**/.git/**",
      "**/.github/**",
      "**/.vscode/**",
      "**/cypress/results/**",
      "**/cypress/screenshots/**",
      "**/cypress/downloads/**",
      "**/cypress/videos/**",
      "**/public/**",

      // Config files
      "**/*.config.cjs",
      "**/*.config.mjs",
      "**/vite.config.ts",

      // Legacy ESLint files
      ".eslintrc.json",
      "cypress/.eslintrc.json",
    ],
  },

  // Base configuration for all files
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        // Node globals
        process: "readonly",
        // Common globals
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        Promise: "readonly",
        // Testing globals
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        // Cypress globals
        cy: "readonly",
        Cypress: "readonly",
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        // Fix: Remove project option from base config to avoid TypeScript checking for all files
        project: null,
      },
    },
    settings: {
      ...reactSettings,
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@typescript-eslint": tseslint.plugin,
      // Add all previously unused plugins to fix the ESLint error
      "jsx-a11y": jsxA11yPlugin,
      import: importPlugin,
      vitest: vitestPlugin,
      "testing-library": testingLibraryPlugin,
    },
    rules: {
      // Minimal set of essential rules to improve performance
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "react/react-in-jsx-scope": "off",
      "react/display-name": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // JavaScript files - without TypeScript checking
  {
    files: [
      "**/*.js",
      "**/*.jsx",
      "cypress/plugins/**/*.js",
      "cypress/support/plugins/**/*.js",
    ],
    languageOptions: {
      parserOptions: {
        // Don't use the TypeScript parser for JS files
        project: null,
      },
    },
  },

  // TypeScript files in src directory
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
    },
  },

  // Cypress test files with separate project reference
  {
    files: [
      "cypress/**/*.ts",
      "cypress/**/*.js",
      "cypress/e2e/**/*.ts",
      "cypress/e2e/**/*.js",
    ],
    plugins: {
      cypress: cypressPlugin,
    },
    languageOptions: {
      globals: {
        cy: "readonly",
        Cypress: "readonly",
      },
      parserOptions: {
        // Fix: Correct the path to Cypress tsconfig.json
        project: "./cypress/tsconfig.json",
      },
    },
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // Apply prettier config last
  prettierConfig,
];
