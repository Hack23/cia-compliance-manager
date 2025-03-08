import React from "react";
import { SECURITY_RESOURCES_TEST_IDS } from "../../constants/testIds";
import { WIDGET_ICONS } from "../../constants/coreConstants";

interface SecurityResourcesWidgetProps {
  securityLevel: string;
  testId?: string;
}

const SecurityResourcesWidget: React.FC<SecurityResourcesWidgetProps> = ({
  securityLevel = "None",
  testId = SECURITY_RESOURCES_TEST_IDS.SECURITY_RESOURCES_PREFIX,
}) => {
  return (
    <div
      className="p-4 space-y-4"
      data-testid={testId || "widget-security-resources"}
    >
      <div className="flex items-center mb-4">
        <span className="text-xl mr-2">{WIDGET_ICONS.SECURITY_RESOURCES}</span>
        <h3 className="text-md font-medium">Security Resources</h3>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300">
        Access security implementation guides and best practices for your
        selected security levels.
      </p>

      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md mb-3">
        <h4 className="text-sm font-medium mb-2">Documentation</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li className="text-sm">Security Implementation Guide</li>
          <li className="text-sm">Compliance Reporting Templates</li>
          <li className="text-sm">Risk Assessment Framework</li>
        </ul>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md mb-3">
        <h4 className="text-sm font-medium mb-2">Security Training</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li className="text-sm">Security Awareness Training</li>
          <li className="text-sm">Incident Response Procedures</li>
          <li className="text-sm">Compliance Guidelines</li>
        </ul>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
        <h4 className="text-sm font-medium mb-2">External Resources</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li className="text-sm">Industry Security Standards</li>
          <li className="text-sm">Regulatory Compliance Guides</li>
          <li className="text-sm">Vendor Security Documentation</li>
        </ul>
      </div>
    </div>
  );
};

export default SecurityResourcesWidget;
