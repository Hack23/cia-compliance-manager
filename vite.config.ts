import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig as defineVitestConfig } from "vitest/config";

// Read version from package.json
interface PackageJson {
  version: string;
  name: string;
  [key: string]: any;
}

const packageJson: PackageJson = JSON.parse(
  readFileSync(path.resolve("./package.json"), "utf8")
);

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
  // Make APP_VERSION available globally
  define: {
    APP_VERSION: JSON.stringify(packageJson.version),
  },
  // Ensure proper JSX handling
  esbuild: {
    target: "es2022",
    jsx: "automatic",
  },
  base: "./",
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
      external: (id) => id.includes(".test.") || id.includes("__mocks__"),
    },
  },
  // Use defineConfig for test configuration from vitest/config to properly type the test property
  ...defineVitestConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/tests/vitest-setup.ts", "./src/tests/setup-tests.ts"],
      include: ["src/**/*.test.{ts,tsx}"],
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html", "lcov"],
        reportsDirectory: "./docs/coverage",
        exclude: [
          "node_modules/**/*",
          "**/node_modules/**/*",
          "**/@kurkle/color/**",
          "**/chart.js/**",
          "**/react/**",
          "**/react-dom/**",
          "**/scheduler/**",
          "**/*jsx-runtime*",
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
        // Increase thresholds for v1.0 release
        thresholds: {
          statements: 85,
          branches: 75,
          functions: 80,
          lines: 85,
        },
      },
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
      // Configure types to ensure testing library matchers are recognized
      typecheck: {
        include: ["**/*.{test,spec}.{ts,tsx}"],
        tsconfig: "./tsconfig.json",
      },
    },
  }),
});
