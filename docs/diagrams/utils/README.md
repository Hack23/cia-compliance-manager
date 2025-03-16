[**CIA Compliance Manager Diagrams v0.8.1**](../README.md)

***

[CIA Compliance Manager Diagrams](../modules.md) / utils

# utils

# Utility Functions

This module provides utility functions used throughout the application.

## Business Perspective
Utilities support business logic implementation by providing reusable
calculations for security metrics and compliance assessments.

## Architecture Perspective
These functions follow functional programming principles to maximize
code reuse and testability.

## Security Perspective
Utility functions implement security calculations like risk scoring
and security level assessments essential for compliance evaluation.

## References

### asSecurityLevel

Re-exports [asSecurityLevel](widgetHelpers/functions/asSecurityLevel.md)

***

### checkRequiredSecurityLevels

Re-exports [checkRequiredSecurityLevels](widgetHelpers/functions/checkRequiredSecurityLevels.md)

***

### createWidgetConfig

Re-exports [createWidgetConfig](widgetHelpers/functions/createWidgetConfig.md)

***

### ensureArray

Re-exports [ensureArray](typeGuards/functions/ensureArray.md)

***

### evaluateWidgetVisibility

Re-exports [evaluateWidgetVisibility](widgetHelpers/functions/evaluateWidgetVisibility.md)

***

### extractSecurityLevels

Re-exports [extractSecurityLevels](typeGuards/functions/extractSecurityLevels.md)

***

### filterWidgets

Re-exports [filterWidgets](widgetHelpers/functions/filterWidgets.md)

***

### formatSecurityLevel

Re-exports [formatSecurityLevel](widgetHelpers/functions/formatSecurityLevel.md)

***

### getDefaultDevelopmentEffort

Re-exports [getDefaultDevelopmentEffort](securityDefaults/functions/getDefaultDevelopmentEffort.md)

***

### getDefaultExpertiseLevel

Re-exports [getDefaultExpertiseLevel](securityDefaults/functions/getDefaultExpertiseLevel.md)

***

### getDefaultMaintenanceEffort

Re-exports [getDefaultMaintenanceEffort](securityDefaults/functions/getDefaultMaintenanceEffort.md)

***

### getImplementationCost

Re-exports [getImplementationCost](typeGuards/functions/getImplementationCost.md)

***

### getInformationSensitivity

Re-exports [getInformationSensitivity](securityDefaults/functions/getInformationSensitivity.md)

***

### getProtectionLevel

Re-exports [getProtectionLevel](securityDefaults/functions/getProtectionLevel.md)

***

### getSecurityLevelBackgroundClass

Re-exports [getSecurityLevelBackgroundClass](colorUtils/functions/getSecurityLevelBackgroundClass.md)

***

### getSecurityLevelBadgeVariant

Re-exports [getSecurityLevelBadgeVariant](securityLevelUtils/functions/getSecurityLevelBadgeVariant.md)

***

### getSecurityLevelClass

Re-exports [getSecurityLevelClass](securityLevelUtils/functions/getSecurityLevelClass.md)

***

### getSecurityLevelColorClass

Re-exports [getSecurityLevelColorClass](colorUtils/functions/getSecurityLevelColorClass.md)

***

### getSecurityLevelColors

Re-exports [getSecurityLevelColors](widgetHelpers/functions/getSecurityLevelColors.md)

***

### getSecurityLevelHexColor

Re-exports [getSecurityLevelHexColor](colorUtils/functions/getSecurityLevelHexColor.md)

***

### getSecurityLevelOption

Re-exports [getSecurityLevelOption](typeGuards/functions/getSecurityLevelOption.md)

***

### getSecurityLevelPercentage

Re-exports [getSecurityLevelPercentage](securityLevelUtils/functions/getSecurityLevelPercentage.md)

***

### getSecurityLevelValue

Re-exports [getSecurityLevelValue](securityLevelUtils/functions/getSecurityLevelValue.md)

***

### getTestId

Re-exports [getTestId](widgetHelpers/functions/getTestId.md)

***

### getWidgetContent

Re-exports [getWidgetContent](widgetHelpers/functions/getWidgetContent.md)

***

### getWidgetDescription

Re-exports [getWidgetDescription](widgetHelpers/functions/getWidgetDescription.md)

***

### getWidgetIcon

Re-exports [getWidgetIcon](widgetHelpers/functions/getWidgetIcon.md)

***

### getWidgetSize

Re-exports [getWidgetSize](widgetHelpers/functions/getWidgetSize.md)

***

### getWidgetTitle

Re-exports [getWidgetTitle](widgetHelpers/functions/getWidgetTitle.md)

***

### handleWidgetError

Re-exports [handleWidgetError](widgetHelpers/functions/handleWidgetError.md)

***

### hasProperty

Re-exports [hasProperty](typeGuards/functions/hasProperty.md)

***

### hasTagValue

Re-exports [hasTagValue](typeGuards/functions/hasTagValue.md)

***

### hasWidgetProps

Re-exports [hasWidgetProps](typeGuards/functions/hasWidgetProps.md)

***

### isAvailabilityDetail

Re-exports [isAvailabilityDetail](typeGuards/functions/isAvailabilityDetail.md)

***

### isCIADetails

Re-exports [isCIADetails](typeGuards/functions/isCIADetails.md)

***

### isComplianceFramework

Re-exports [isComplianceFramework](typeGuards/functions/isComplianceFramework.md)

***

### isComplianceStatus

Re-exports [isComplianceStatus](typeGuards/functions/isComplianceStatus.md)

***

### isConfidentialityDetail

Re-exports [isConfidentialityDetail](typeGuards/functions/isConfidentialityDetail.md)

***

### isIntegrityDetail

Re-exports [isIntegrityDetail](typeGuards/functions/isIntegrityDetail.md)

***

### isNumber

Re-exports [isNumber](typeGuards/functions/isNumber.md)

***

### isObject

Re-exports [isObject](typeGuards/functions/isObject.md)

***

### isROIMetricDetails

Re-exports [isROIMetricDetails](typeGuards/functions/isROIMetricDetails.md)

***

### isROIMetrics

Re-exports [isROIMetrics](typeGuards/functions/isROIMetrics.md)

***

### isSecurityProfile

Re-exports [isSecurityProfile](typeGuards/functions/isSecurityProfile.md)

***

### isSecurityResource

Re-exports [isSecurityResource](typeGuards/functions/isSecurityResource.md)

***

### isString

Re-exports [isString](typeGuards/functions/isString.md)

***

### isTechnicalImplementationDetails

Re-exports [isTechnicalImplementationDetails](typeGuards/functions/isTechnicalImplementationDetails.md)

***

### isValidCIADetail

Re-exports [isValidCIADetail](typeGuards/functions/isValidCIADetail.md)

***

### isWidgetConfig

Re-exports [isWidgetConfig](typeGuards/functions/isWidgetConfig.md)

***

### normalizeSecurityLevel

Re-exports [normalizeSecurityLevel](securityLevelUtils/functions/normalizeSecurityLevel.md)

***

### parseRiskLevel

Re-exports [parseRiskLevel](typeGuards/functions/parseRiskLevel.md)

***

### safeAccess

Re-exports [safeAccess](typeGuards/functions/safeAccess.md)

***

### safeNumberConversion

Re-exports [safeNumberConversion](typeGuards/functions/safeNumberConversion.md)

***

### shouldShowWidget

Re-exports [shouldShowWidget](widgetHelpers/functions/shouldShowWidget.md)

***

### sortWidgetsByPriority

Re-exports [sortWidgetsByPriority](widgetHelpers/functions/sortWidgetsByPriority.md)

***

### WIDGET\_CONTENT

Re-exports [WIDGET_CONTENT](widgetHelpers/variables/WIDGET_CONTENT.md)

***

### WIDGET\_DESCRIPTIONS

Re-exports [WIDGET_DESCRIPTIONS](widgetHelpers/variables/WIDGET_DESCRIPTIONS.md)

***

### widgetEmptyState

Re-exports [widgetEmptyState](widgetHelpers/functions/widgetEmptyState.md)

***

### widgetLoadingIndicator

Re-exports [widgetLoadingIndicator](widgetHelpers/functions/widgetLoadingIndicator.md)

***

### widgetRegistry

Re-exports [widgetRegistry](widgetRegistry/variables/widgetRegistry.md)

***

### WidgetType

Re-exports [WidgetType](widgetHelpers/enumerations/WidgetType.md)
