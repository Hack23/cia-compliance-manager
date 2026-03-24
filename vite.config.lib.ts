import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

/**
 * Vite configuration for building the npm library package.
 *
 * This produces an ES module build of the CIA Compliance Manager
 * that can be consumed by other React applications.
 *
 * The standard app build (vite.config.ts) remains unchanged.
 */
export default defineConfig({
  plugins: [react()],
  define: {
    APP_VERSION: JSON.stringify("library"),
  },
  build: {
    outDir: "dist",
    sourcemap: process.env.BUILD_DEBUG === "true",
    target: "es2024",
    minify: process.env.BUILD_DEBUG !== "true",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: () => "index.js",
    },
    rollupOptions: {
      // Externalize peer dependencies - they should not be bundled
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react-dom/client",
        "chart.js",
        "chart.js/auto",
        "react-error-boundary",
      ],
      output: {
        // Preserve module structure for tree-shaking
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
      },
    },
  },
});
