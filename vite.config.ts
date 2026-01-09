import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";
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
export default defineConfig(({ mode }) => ({
  plugins: [
    // Enable React features
    react(),
    // Support for TypeScript paths
    tsconfigPaths(),
    // Bundle size visualization (only in production builds)
    ...(mode === 'production' ? [visualizer({
      filename: "./build/stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
      projectRoot: process.cwd(),
    })] : []),
  ],
  publicDir: "public",
  server: {
    port: 5173,
    open: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      // Security Headers for development
      "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; font-src 'self' data: https://fonts.gstatic.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Referrer-Policy": "strict-origin-when-cross-origin",
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
    // Remove terser configuration for now - use esbuild minification
    minify: "esbuild",
    // Add chunk size reporting
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create separate chunks for better code splitting
          if (id.includes("node_modules")) {
            // React and React DOM in separate chunk
            if (id.includes("react") || id.includes("react-dom") || id.includes("scheduler")) {
              return "react-vendor";
            }
            // Chart.js in separate chunk for lazy loading
            // @kurkle/color is a required Chart.js dependency for color handling
            if (id.includes("chart.js") || id.includes("@kurkle/color")) {
              return "chart";
            }
            // React Error Boundary in separate chunk
            if (id.includes("react-error-boundary")) {
              return "react-vendor";
            }
            // Other vendor dependencies
            return "vendor";
          }
          
          // Group widgets by category for better chunking efficiency
          // Assessment Center Widgets (group together)
          if (id.includes("/widgets/assessmentcenter/") && !id.includes("SecurityLevelWidget")) {
            return "widgets-assessment";
          }
          
          // Business Value Widgets (group together)
          if (id.includes("/widgets/businessvalue/")) {
            return "widgets-business";
          }
          
          // Impact Analysis Widgets (group together)
          if (id.includes("/widgets/impactanalysis/")) {
            return "widgets-impact";
          }
          
          // Implementation Guide Widgets (Chart.js widgets separate)
          if (id.includes("/widgets/implementationguide/")) {
            if (id.includes("SecurityVisualizationWidget")) {
              return "widgets-visualization";
            }
            // Other implementation widgets together
            return "widgets-implementation";
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
      /**
       * Vitest worker pool configuration (Vitest 4 format).
       *
       * Uses single fork mode in CI to eliminate memory issues, parallel forks locally.
       * - pool: "forks" - Uses separate Node.js processes for better test isolation
       * - singleFork: true in CI, false locally - Eliminates parallel execution in CI to prevent OOM
       * - maxForks: 2 locally - Balances parallelism with memory usage
       * - isolate: true - Each test file runs in isolation to prevent memory leaks
       */
      pool: "forks",
      singleFork: process.env.CI === "true", // Force single fork in CI to eliminate memory issues
      maxForks: process.env.CI === "true" ? 1 : 2, // No parallelism in CI
      isolate: true,
      testTimeout: 10000,
      hookTimeout: 10000,
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html", "lcov"],
        reportsDirectory: "./build/coverage",
        exclude: [
          "node_modules/**/*",
          "**/node_modules/**/*",
          "node_module",
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
        // ISMS Secure Development Policy requirements (v1.0 release)
        thresholds: {
          statements: 80,
          branches: 75,
          functions: 80,
          lines: 80,
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
        html: "./build/test-results/index.html",
      },
      // Configure types to ensure testing library matchers are recognized
      typecheck: {
        include: ["**/*.{test,spec}.{ts,tsx}"],
        tsconfig: "./tsconfig.json",
      },
    },
  }),
}));
