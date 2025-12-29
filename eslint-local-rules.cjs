/**
 * Custom ESLint rules for CIA Compliance Manager
 * 
 * This file contains project-specific ESLint rules to enforce
 * code quality standards and best practices.
 */

module.exports = {
  /**
   * Rule: no-hardcoded-testid
   * 
   * Prevents hardcoded data-testid attribute values to enforce
   * the use of test ID constants from src/constants/testIds.ts
   * 
   * ✅ GOOD:
   * <div data-testid={WIDGET_IDS.root} />
   * <button data-testid={createTestId('submit', 'button')} />
   * 
   * ❌ BAD:
   * <div data-testid="widget-root" />
   * <button data-testid="submit-button" />
   */
  'no-hardcoded-testid': {
    meta: {
      type: 'problem',
      docs: {
        description: 'Enforce use of test ID constants instead of hardcoded strings',
        category: 'Best Practices',
        recommended: true,
      },
      messages: {
        hardcodedTestId: 'Avoid hardcoded data-testid values. Use constants from testIds.ts or createTestId() helper instead.',
      },
      schema: [],
      fixable: null,
    },
    create(context) {
      return {
        JSXAttribute(node) {
          // Check if this is a data-testid attribute
          if (node.name && node.name.name === 'data-testid') {
            const attrValue = node.value;

            // Check if the value is a literal string (hardcoded)
            if (
              attrValue &&
              attrValue.type === 'Literal' &&
              typeof attrValue.value === 'string'
            ) {
              context.report({
                node: attrValue,
                messageId: 'hardcodedTestId',
              });
            }

            // Also check for template literals inside JSX expression containers,
            // e.g. data-testid={`${testId}-suffix`}
            // NOTE: Template literals used as arguments to ID generator functions
            // (e.g., WIDGET_IDS.item(`some-${index}`)) are intentionally allowed
            // since the widget-scoped ID generators are designed to accept dynamic arguments.
            if (
              attrValue &&
              attrValue.type === 'JSXExpressionContainer' &&
              attrValue.expression &&
              attrValue.expression.type === 'TemplateLiteral'
            ) {
              context.report({
                node: attrValue.expression,
                messageId: 'hardcodedTestId',
              });
            }
          }
        },
      };
    },
  },
};
