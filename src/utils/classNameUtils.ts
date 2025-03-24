/**
 * Utility function to conditionally join CSS class names together
 *
 * @param classes - List of class names to conditionally join
 * @returns Joined class names as a string
 */
export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes
    .filter(Boolean) // Filter out falsy values
    .join(" ")
    .trim();
}

/**
 * Conditionally append a class name
 *
 * @param baseClass - Base class name
 * @param condition - Condition to check
 * @param appendClass - Class to append if condition is true
 * @returns Resulting class name
 */
export function conditionalClass(
  baseClass: string,
  condition: boolean,
  appendClass: string
): string {
  return condition ? `${baseClass} ${appendClass}` : baseClass;
}

/**
 * Utility for conditional class name based on variant
 *
 * @param baseClass - Base class name
 * @param variant - Variant key
 * @param variantMap - Map of variant keys to class names
 * @returns The combined class name
 */
export function variantClass(
  baseClass: string,
  variant: string,
  variantMap: Record<string, string>
): string {
  return `${baseClass} ${variantMap[variant] || ""}`;
}

/**
 * Create a class name with prefixes for variants
 *
 * @param className - Base class name
 * @param prefix - Prefix to add
 * @param variants - Variant suffixes
 * @returns Class name with prefixes and variants
 */
export function prefixedClass(
  className: string,
  prefix: string,
  variants: string[] = []
): string {
  if (variants.length === 0) {
    return `${prefix}-${className}`;
  }

  return variants
    .map((variant) => `${prefix}-${variant}-${className}`)
    .join(" ");
}
