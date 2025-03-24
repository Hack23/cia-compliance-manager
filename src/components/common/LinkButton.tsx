import React from "react";
// Create a temporary mock for Link component
const Link = ({
  to,
  className,
  children,
  "data-testid": testId,
  onClick,
}: {
  to: string;
  className?: string;
  children: React.ReactNode;
  "data-testid"?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) => (
  <a href={to} className={className} data-testid={testId} onClick={onClick}>
    {children}
  </a>
);

import { cn } from "../../utils/classNameUtils";

type ButtonVariant = "default" | "outline" | "ghost" | "link" | "destructive";

interface LinkButtonProps {
  /**
   * The URL to navigate to
   */
  href: string;

  /**
   * Button variant
   */
  variant?: ButtonVariant;

  /**
   * Optional CSS class
   */
  className?: string;

  /**
   * Optional test ID for automated testing
   */
  testId?: string;

  /**
   * Button content
   */
  children: React.ReactNode;

  /**
   * Optional onClick handler
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;

  /**
   * Whether the link opens in a new tab
   */
  external?: boolean;

  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
}

/**
 * LinkButton component that combines button styling with link functionality
 */
const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  variant = "default",
  className,
  testId,
  children,
  onClick,
  external = false,
  disabled = false,
}) => {
  // Base styles for all variants
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none";

  // Variant-specific styles
  const variantStyles = {
    default:
      "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700",
    outline:
      "border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200",
    ghost:
      "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200",
    link: "bg-transparent underline-offset-4 hover:underline text-blue-600 dark:text-blue-400 hover:bg-transparent",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700",
  };

  // Size styles
  const sizeStyles = "h-10 px-4 py-2";

  // Combined styles
  const buttonStyles = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles,
    className
  );

  // For external links
  if (external) {
    return (
      <a
        href={href}
        className={buttonStyles}
        data-testid={testId}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={disabled}
      >
        {children}
      </a>
    );
  }

  // For internal links
  return (
    <Link
      to={href}
      className={buttonStyles}
      data-testid={testId}
      onClick={onClick}
      aria-disabled={disabled}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
