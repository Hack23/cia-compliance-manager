/**
 * Prettier configuration for consistent code formatting
 * 
 * ## Business Perspective
 * 
 * Consistent code formatting improves maintainability and reduces
 * cognitive load when reviewing changes, which is especially important
 * for security-critical code in the CIA Compliance Manager. 💼
 * 
 * This configuration works with ESLint to ensure code quality
 * and consistent style across the project. 🔒
 */
module.exports = {
  arrowParens: "always",
  bracketSpacing: true,
  endOfLine: "lf",
  htmlWhitespaceSensitivity: "css",
  insertPragma: false,
  singleAttributePerLine: false,
  bracketSameLine: false,
  jsxBracketSameLine: false,
  jsxSingleQuote: false,
  printWidth: 80,
  proseWrap: "preserve",
  quoteProps: "as-needed",
  requirePragma: false,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  useTabs: false,
  embeddedLanguageFormatting: "auto",
  vueIndentScriptAndStyle: false,
  experimentalTernaries: false
};
