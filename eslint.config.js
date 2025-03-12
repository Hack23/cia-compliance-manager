import { existsSync } from "fs";
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

// Verify each tsconfig exists
const rootTsConfigExists = existsSync("./tsconfig.json");
const cypressTsConfigExists = existsSync("./cypress/tsconfig.json");

if (!rootTsConfigExists) {
  console.warn(
    "Warning: Root tsconfig.json not found. TypeScript checking will be limited."
  );
}

if (!cypressTsConfigExists) {
  console.warn(
    "Warning: Cypress tsconfig.json not found. TypeScript checking for Cypress will be disabled."
  );
}

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

  // Base configuration for all files - WITHOUT TypeScript type checking
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ..._globals.browser,
        ..._globals.node,
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
      },
      // Use TypeScript parser for all files, but without type checking by default
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        // No project by default - prevents parsing errors for non-TS files
        project: null,
      },
    },
    settings: {
      ...reactSettings,
      // Import resolver settings
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@typescript-eslint": tseslint.plugin,
      "jsx-a11y": jsxA11yPlugin,
      import: importPlugin,
      vitest: vitestPlugin,
      "testing-library": testingLibraryPlugin,
    },
    rules: {
      // Base rules for all files
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "react/react-in-jsx-scope": "off",
      "react/display-name": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // JavaScript files - explicit config to ensure no TS checking
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      parserOptions: {
        // Explicitly disable TypeScript checking for JS files
        project: null,
      },
    },
    rules: {
      // JS-specific rules go here
    },
  },

  // Application TypeScript files - use root tsconfig
  ...(rootTsConfigExists
    ? [
        {
          files: ["src/**/*.ts", "src/**/*.tsx"],
          languageOptions: {
            parserOptions: {
              project: "./tsconfig.json",
              tsconfigRootDir: process.cwd(),
            },
          },
          rules: {
            // TypeScript rules for application code
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-non-null-assertion": "warn",
            "@typescript-eslint/no-unused-vars": [
              "error",
              { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
            ],
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/ban-ts-comment": [
              "warn",
              {
                "ts-ignore": "allow-with-description",
                minimumDescriptionLength: 5,
              },
            ],
          },
        },
      ]
    : []),

  // Cypress test files with cypress tsconfig.json
  ...(cypressTsConfigExists
    ? [
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
              ..._globals.browser,
              // Cypress globals
              cy: "readonly",
              Cypress: "readonly",
              expect: "readonly",
              assert: "readonly",
              before: "readonly",
              beforeEach: "readonly",
              after: "readonly",
              afterEach: "readonly",
            },
            parserOptions: {
              project: "./cypress/tsconfig.json",
              tsconfigRootDir: process.cwd(),
            },
          },
          rules: {
            // Cypress-specific rules
            "no-console": "off",
            "@typescript-eslint/no-namespace": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "cypress/no-assigning-return-values": "error",
            "cypress/no-unnecessary-waiting": "warn",
            "cypress/assertion-before-screenshot": "warn",
            "testing-library/await-async-utils": "error",
            // Disable rules that might conflict with Cypress testing patterns
            "@typescript-eslint/no-unused-expressions": "off",
          },
        },
      ]
    : []),
];
