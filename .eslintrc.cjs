module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // Handle unused variables with more specific configuration
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_|^props$|^e$|^event$|^component$|^callback$",
        varsIgnorePattern: "^_|^React$",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "react/react-in-jsx-scope": "off", // React 17+ doesn't need React imports
    "react/prop-types": "off", // TypeScript handles prop validation
    "react/display-name": "off",
  },
  overrides: [
    // Test files - disable strict checks
    {
      files: [
        "src/tests/**/*.ts",
        "src/tests/**/*.tsx",
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/test-*.ts",
        "**/test-*.tsx",
        "**/*.spec.ts",
        "**/*.spec.tsx",
        "**/*.extended.test.tsx",
        "**/*.comprehensive.test.tsx",
        "**/*.enhanced.test.tsx",
        "**/*.darkmode.test.tsx",
      ],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "react-hooks/exhaustive-deps": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "no-console": "off",
      },
    },
    // Mock files - be more lenient
    {
      files: [
        "**/__mocks__/**",
        "**/mocks/**",
        "**/*.mock.ts",
        "**/*.mock.tsx",
        "**/testMocks.ts",
        "**/testMocks/**",
        "**/testUtils/**",
        "**/mockFactory.ts",
      ],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
    // Type definition files - special handling
    {
      files: ["**/*.d.ts"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
    // Service and utility files
    {
      files: ["**/services/**", "**/utils/**"],
      rules: {
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            ignoreRestSiblings: true,
          },
        ],
      },
    },
    // Component files - relax unused vars rules for props destructuring
    {
      files: ["**/components/**/*.tsx", "**/components/**/*.ts"],
      rules: {
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            argsIgnorePattern: "^_|^props$|^e$|^event$|^component$",
            varsIgnorePattern:
              "^_|^React$|options$|Level$|className$|color$|description$|container$|rerender$|totalScore$|compact$|show|span$",
            ignoreRestSiblings: true,
          },
        ],
      },
    },
    // Widget files - have complex prop patterns
    {
      files: ["**/widgets/**/*.tsx"],
      rules: {
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            argsIgnorePattern: "^_",
            varsIgnorePattern:
              "^_|.*Level$|^roi.*|^options$|^break.*$|^total.*$|^.*Estimate$",
            ignoreRestSiblings: true,
          },
        ],
      },
    },
    // Hook files and their tests
    {
      files: ["**/hooks/**/*.ts", "**/hooks/**/*.tsx"],
      rules: {
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_|^use.*$|^render.*$",
            ignoreRestSiblings: true,
          },
        ],
      },
    },
  ],
  ignorePatterns: [
    "node_modules/**/*.*",
    "dist/**",
    "build/",
    "coverage/",
    "**/*.js.map",
    "**/*.d.ts.map",
    "docs/**",
  ],
};