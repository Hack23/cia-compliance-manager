declare module "glob" {
  export function sync(pattern: string, options?: Record<string, unknown>): string[];
}

declare module "path-scurry" {
  // Add minimal types needed for your usage
}
