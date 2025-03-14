import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig as defineVitestConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Enable React features
    react(),
    // Support for TypeScript paths
    tsconfigPaths(),
  ],
  publicDir: "public",
  server: {
    port: 5173,
    open: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  // Ensure proper JSX handling
  esbuild: {
    target: "es2022",
    jsx: "automatic",
  },
  build: {
    outDir: "build",
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/],
    },
    // Set target for rollup
    target: "es2022",
    // Add minification options for production
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    // Add chunk size reporting
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create a "vendor" chunk for node_modules
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "react";
            }
            return "vendor";
          }
        },
      },
      // Instead of putting this at the output level, move it up to the rollupOptions level
      external: (id) => id.includes(".test.") || id.includes("__mocks__"),
    },
  },
  // Use defineConfig for test configuration from vitest/config to properly type the test property
  ...defineVitestConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/tests/vitest-setup.ts"],
      include: ["src/**/*.test.{ts,tsx}"],
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html", "lcov"],
        reportsDirectory: "./docs/coverage",
        exclude: [
          // Comprehensive node_modules exclusion patterns that match everything
          "node_modules/**/*",
          "**/node_modules/**/*",
          // Explicitly exclude problematic modules with more specific patterns
          "**/@kurkle/color/**",
          "**/chart.js/**",
          "**/react/**",
          "**/react-dom/**",
          "**/scheduler/**",
          "**/jsx-runtime*",
          // Other standard exclusions
          "dist/",
          "cypress/**",
          "scripts/",
          "docs/",
          "**/*.d.ts",
          "**/*.config.{js,ts}",
          "**/.eslintrc.js",
          "**/vite.config.ts",
          "**/*.cy.{js,jsx,ts,tsx}",
          "src/tests/",
          "**/*.stories.{js,jsx,ts,tsx}",
          "src/index.tsx",
          ".dependency-cruiser.cjs",
        ],
        // Maintain existing thresholds
        thresholds: {
          statements: 80,
          branches: 70,
          functions: 75,
          lines: 80,
        },
      },
      // Add HTML reporter for test results
      reporters: [
        [
          "verbose",
          {
            showSummary: true,
            showSuccesses: true,
            showSkipped: true,
            showFailed: true,
            renderSuccesses: true,
          },
        ],
        "html",
      ],
      outputFile: {
        html: "./docs/test-results/index.html",
      },
    },
  }),
});
