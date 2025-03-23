import React from "react";
import {
  getBusinessImpactIcon,
  getComponentIcon,
  getSecurityIcon,
} from "../../constants/uiConstants";
import { CIAComponentType } from "../../types/cia-services";

/**
 * Props for SecurityIcon component
 */
interface SecurityIconProps {
  /**
   * The icon type to display
   */
  iconType: "cia" | "security" | "business";

  /**
   * The specific icon identifier
   */
  icon: string;

  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional test ID
   */
  testId?: string;
}

/**
 * Component for displaying security-related icons with consistent styling
 *
 * @example
 * ```jsx
 * <SecurityIcon iconType="cia" icon="availability" />
 * <SecurityIcon iconType="security" icon="risk" />
 * <SecurityIcon iconType="business" icon="financial" />
 * ```
 */
const SecurityIcon: React.FC<SecurityIconProps> = ({
  iconType,
  icon,
  className = "",
  testId = "security-icon",
}) => {
  let iconChar: string;

  switch (iconType) {
    case "cia":
      iconChar = getComponentIcon(icon as CIAComponentType);
      break;
    case "security":
      iconChar = getSecurityIcon(icon);
      break;
    case "business":
      iconChar = getBusinessImpactIcon(icon);
      break;
    default:
      iconChar = "🔵";
  }

  return (
    <span className={className} data-testid={testId}>
      {iconChar}
    </span>
  );
};

export default SecurityIcon;
