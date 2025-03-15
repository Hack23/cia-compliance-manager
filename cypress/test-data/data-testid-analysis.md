# CIA Compliance Manager Dashboard Test ID Analysis

## App Structure

- `app-root` - Main application container
- `app-container` - Container for the entire application
- `cia-classification-app` - Main CIA classification application
- `app-title` - Application title element
- `theme-toggle` - Theme toggle button (light/dark mode)
- `dashboard-grid` - Main dashboard grid container

## Dashboard Layout

- `widget-container` - Generic container for widgets
- `widget-header` - Header element for widgets
- `widget-body` - Body element for widgets
- `widget-content-wrapper` - Content wrapper inside widgets
- `data-container` - General data container across multiple widgets
- `terminal-text-container` - Container for terminal-style text
- `pulse-dot` - Animated dot indicator in various areas
- `metrics-card-title` - Title for metrics cards (used in multiple widgets)
- `metrics-card-value` - Value display for metrics cards
- `key-value-pair` - Generic key-value pair component used across widgets
- `status-badge` - Status indicator badge used throughout the application

## Security Level Selection Widget

- `widget-security-level-selection` - Main widget container
- `widget-security-level-selection-header` - Widget header
- `security-level-selector` - Security level selector component
- `security-level-controls` - Controls for security level selection
- `confidentiality-section` - Section for confidentiality settings
- `integrity-section` - Section for integrity settings
- `availability-section` - Section for availability settings
- `confidentiality-select` - Dropdown for confidentiality level
- `integrity-select` - Dropdown for integrity level
- `availability-select` - Dropdown for availability level
- `confidentiality-color-indicator` - Color indicator for confidentiality level
- `integrity-color-indicator` - Color indicator for integrity level
- `availability-color-indicator` - Color indicator for availability level
- `confidentiality-description` - Description of confidentiality level
- `integrity-description` - Description of integrity level
- `availability-description` - Description of availability level
- `confidentiality-technical-info-button` - Info button for confidentiality
- `integrity-technical-info-button` - Info button for integrity
- `availability-technical-info-button` - Info button for availability
- `current-confidentiality` - Current confidentiality level indicator
- `current-integrity` - Current integrity level indicator
- `current-availability` - Current availability level indicator
- `context-info` - Contextual information display

## Security Summary Widget

- `widget-security-summary` - Main widget container
- `widget-security-summary-header` - Widget header
- `security-summary-container` - Container for security summary
- `security-icon` - Security level icon
- `security-summary-description` - Security summary description
- `security-summary-container-confidentiality-summary` - Confidentiality summary container
- `security-summary-container-integrity-summary` - Integrity summary container
- `security-summary-container-availability-summary` - Availability summary container
- `roi-estimate-summary` - ROI estimate summary
- `roi-estimate-pair` - ROI estimate key-value pair
- `technical-section-toggle` - Toggle for technical section
- `technical-details-section` - Technical details section (expanded state)
- `availability-tech-details` - Availability technical details
- `integrity-tech-details` - Integrity technical details
- `confidentiality-tech-details` - Confidentiality technical details
- `business-impact-toggle` - Toggle for business impact section
- `business-impact-section` - Business impact section (expanded state)
- `availability-impact-details` - Availability impact details
- `integrity-impact-details` - Integrity impact details
- `confidentiality-impact-details` - Confidentiality impact details
- `recommendation-heading` - Recommendation heading
- `security-recommendation` - Security recommendation text
- `security-summary-container-classification-level` - Classification level information
- `security-summary-container-information-sensitivity` - Information sensitivity details
- `security-summary-container-protection-level` - Protection level information
- `metrics-toggle` - Toggle for metrics section
- `metrics-section` - Metrics section (expanded state)

## Business Impact Analysis Widget

- `widget-business-impact-container` - Main widget container
- `widget-business-impact-container-header` - Widget header
- `business-impact-widget` - Business impact widget content
- `business-impact-widget-availability-tab` - Availability tab content
- `business-impact-widget-integrity-tab` - Integrity tab content
- `business-impact-widget-confidentiality-tab` - Confidentiality tab content
- `business-impact-widget-summary` - Business impact summary
- `business-impact-availability-tab` - Availability tab identifier
- `business-impact-integrity-tab` - Integrity tab identifier
- `business-impact-confidentiality-tab` - Confidentiality tab identifier
- `financial-impact-card` - Financial impact information card
- `operational-impact-card` - Operational impact information card
- `reputational-impact-card` - Reputational impact information card
- `regulatory-impact-card` - Regulatory impact information card
- `strategic-impact-card` - Strategic impact information card
- `business-impact-impact-card` - Generic impact card
- `business-impact-risk-level` - Risk level indicator

## Technical Implementation Widget

- `widget-technical-details-container` - Main widget container
- `widget-technical-details-container-header` - Widget header
- `technical-details-widget` - Technical details widget content
- `technical-details` - Technical details section
- `technical-description` - Technical implementation description
- `implementation-header` - Implementation steps header
- `implementation-step-0` - First implementation step
- `implementation-step-1` - Second implementation step
- `implementation-step-2` - Third implementation step
- `resources-header` - Resources header
- `development-effort` - Development effort information
- `maintenance-level` - Maintenance level information
- `required-expertise` - Required expertise information
- `implementation-considerations` - Implementation considerations section
- `technical-code-example` - Technical code example
- `technical-requirements` - Technical requirements section
- `availability-tab-button` - Availability tab button
- `integrity-tab-button` - Integrity tab button
- `confidentiality-tab-button` - Confidentiality tab button

## Cost Estimation Widget

- `widget-cost-estimation` - Main widget container
- `widget-cost-estimation-header` - Widget header
- `capex-estimate-value` - Capital expenditure estimate
- `opex-estimate-value` - Operational expenditure estimate
- `three-year-total` - Three-year total cost
- `roi-estimate` - Return on investment estimate
- `cost-analysis-text` - Cost analysis text
- `capex-percentage` - Capital expenditure percentage
- `opex-percentage` - Operational expenditure percentage
- `implementation-time` - Implementation time estimation
- `total-cost-card` - Total cost information card
- `cost-breakdown-section` - Cost breakdown section
- `cost-chart` - Cost visualization chart

## Value Creation Widget

- `widget-value-creation` - Main widget container
- `widget-value-creation-header` - Widget header
- `value-creation-widget` - Value creation widget content
- `value-creation-widget-roi` - ROI section
- `value-creation-widget-savings` - Savings section
- `value-creation-widget-breakeven` - Breakeven section
- `value-creation-widget-value-point-0` - First value point
- `value-creation-widget-value-point-1` - Second value point
- `value-creation-widget-value-point-2` - Third value point
- `value-creation-widget-value-point-3` - Fourth value point
- `value-creation-widget-value-point-4` - Fifth value point
- `roi-chart` - ROI visualization chart
- `benefits-list` - List of benefits
- `value-metrics-section` - Value metrics section

## Compliance Status Widget

- `widget-compliance-status` - Main widget container
- `widget-compliance-status-header` - Widget header
- `compliance-status-widget` - Compliance status widget content
- `compliance-status-badge` - Compliance status badge displaying percentage
- `compliance-requirements-list` - List of compliance requirements
- `compliant-frameworks-list` - List of compliant frameworks
- `partially-compliant-frameworks` - Partially compliant frameworks section
- `non-compliant-frameworks` - Non-compliant frameworks section
- `compliance-score` - Overall compliance score
- `remediation-steps` - Remediation steps section
- `framework-item` - Individual framework item

## Security Profile Visualization Widget (Radar Chart)

- `widget-radar-chart` - Main widget container
- `widget-radar-chart-header` - Widget header
- `radar-chart` - Radar chart component
- `radar-chart-container` - Radar chart container
- `radar-chart-value-at-risk` - Value at risk section
- `radar-chart-probability` - Probability section
- `radar-chart-risk-score` - Risk score section
- `radar-availability-value` - Availability value in radar chart
- `radar-integrity-value` - Integrity value in radar chart
- `radar-confidentiality-value` - Confidentiality value in radar chart
- `chart-legend` - Chart legend
- `risk-assessment-section` - Risk assessment section
- `current-security-posture` - Current security posture indicator
- `mock-radar-chart` - Used in tests as a placeholder for the actual chart

## Confidentiality Impact Widget

- `widget-confidentiality-impact-container` - Main widget container
- `widget-confidentiality-impact-container-header` - Widget header
- `confidentiality-impact` - Confidentiality impact component
- `confidentiality-impact-impact-card` - Impact card
- `confidentiality-impact-business-impact` - Business impact description
- `confidentiality-impact-recommendation-0` - First recommendation
- `confidentiality-impact-recommendation-1` - Second recommendation
- `confidentiality-impact-recommendation-2` - Third recommendation
- `confidentiality-impact-recommendation-3` - Fourth recommendation (shown when expanded)
- `confidentiality-impact-classification-level` - Classification level
- `confidentiality-impact-information-sensitivity` - Information sensitivity
- `data-protection-classification` - Data protection classification section
- `protection-method` - Protection method information
- `confidentiality-impact-validation-technique` - Validation technique information
- `show-all-recommendations-button` - Button to toggle showing all recommendations

## Integrity Impact Widget

- `widget-integrity-impact-container` - Main widget container
- `widget-integrity-impact-container-header` - Widget header
- `integrity-impact` - Integrity impact component
- `integrity-impact-impact-card` - Impact card
- `integrity-impact-business-impact` - Business impact description
- `integrity-impact-recommendation-0` - First recommendation
- `integrity-impact-recommendation-1` - Second recommendation
- `integrity-impact-recommendation-2` - Third recommendation
- `integrity-impact-recommendation-3` - Fourth recommendation (shown when expanded)
- `integrity-impact-protection-level` - Protection level
- `validation-method` - Validation method information
- `data-quality-metrics` - Data quality metrics section
- `integrity-impact-validation-technique` - Validation technique information
- `show-all-recommendations-button` - Button to toggle showing all recommendations

## Availability Impact Widget

- `widget-availability-impact-container` - Main widget container
- `widget-availability-impact-container-header` - Widget header
- `widget-availability-impact` - Availability impact component
- `widget-availability-impact-impact-card` - Impact card
- `widget-availability-impact-business-impact` - Business impact description
- `widget-availability-impact-recommendation-0` - First recommendation
- `widget-availability-impact-recommendation-1` - Second recommendation
- `widget-availability-impact-recommendation-2` - Third recommendation
- `widget-availability-impact-recommendation-3` - Fourth recommendation (shown when expanded)
- `widget-availability-impact-uptime-target` - Uptime target
- `widget-availability-impact-rto-value` - Recovery time objective value
- `widget-availability-impact-rpo-value` - Recovery point objective value
- `widget-availability-impact-mttr-value` - Mean time to recovery value
- `availability-metrics` - Availability metrics section
- `show-all-recommendations-button` - Button to toggle showing all recommendations

## CIA Impact Summary Widget

- `cia-impact-summary-widget` - Main widget container
- `cia-impact-summary-widget-header` - Widget header
- `cia-impact-summary-confidentiality-summary` - Confidentiality summary
- `cia-impact-summary-integrity-summary` - Integrity summary
- `cia-impact-summary-availability-summary` - Availability summary
- `overall-security-profile` - Overall security profile section
- `security-profile-summary` - Security profile summary text
- `security-posture-indicator` - Security posture indicator
- `status-badge` - Security level badge used within the summaries

## Security Resources Widget

- `widget-security-resources-container` - Main widget container
- `widget-security-resources-container-header` - Widget header
- `security-resources-widget` - Security resources widget
- `security-resources-widget-category-select` - Category select dropdown
- `security-resources-widget-search-input` - Search input for resources filtering
- `security-resources-widget-resource-0` - First resource
- `security-resources-widget-resource-1` - Second resource
- `security-resources-widget-resource-2` - Third resource
- `security-resources-widget-resource-3` - Fourth resource
- `security-resources-widget-resource-4` - Fifth resource
- `resource-type-filter` - Resource type filter
- `resource-detail-modal` - Resource detail modal
- `resource-links-section` - Resource links section

## Test ID Patterns for Widget States and Interactions

### Tab Navigation Patterns

- `[widget-name]-[component]-tab` - Tab content container (e.g., `business-impact-widget-availability-tab`)
- `[component]-tab-button` - Tab navigation button (e.g., `availability-tab-button`)

### Expandable Sections Patterns

- `[section]-toggle` - Toggle button for expandable sections (e.g., `technical-section-toggle`)
- `[section]-section` - Expanded section content container (e.g., `metrics-section`)
- `show-all-[item-type]-button` - Button to expand list items (e.g., `show-all-recommendations-button`)

### Recommendation Patterns

- `[widget]-recommendation-[index]` - Indexed recommendations (e.g., `confidentiality-impact-recommendation-0`)
- Additional recommendations (index 3+) appear when expanded

### Interactive Elements

- `[filter-type]-filter` - Filter components (e.g., `resource-type-filter`)
- `[resource-type]-search-input` - Search inputs (e.g., `security-resources-widget-search-input`)
- `[category]-select` - Dropdown selectors (e.g., `security-resources-widget-category-select`)

### State Indicators

- `status-badge` - Badge showing status across multiple widgets
- `[metric-name]-value` - Value display for metrics (e.g., `widget-availability-impact-rto-value`)
- `[component]-color-indicator` - Color indicators for security levels

## Test ID Patterns and Observations

1. **Widget container pattern**: Each widget uses `widget-[name]` for the container and `widget-[name]-header` for its header
2. **Data container pattern**: Most widgets contain a `data-container` element that holds the content
3. **Section pattern**: Discrete sections within widgets use `[name]-section` pattern
4. **Component pattern**: UI components follow `[name]-[component-type]` pattern (e.g., `confidentiality-select`)
5. **Status indicators**: Use `status-badge` consistently across different widgets
6. **Recommendation patterns**: Use `[section]-recommendation-[index]` for recommendations in various sections
7. **Tab navigation patterns**: Uses `[name]-tab` for tab content and `[name]-tab-button` for tab controls
8. **Resource items pattern**: Use sequential numbering `[widget]-resource-[index]`
9. **Metrics pattern**: Most metric displays use `[metric-name]-value` pattern
10. **Common reusable components**: Several elements like `data-container`, `metrics-card-title`, `metrics-card-value`, and `status-badge` are reused throughout the UI
11. **Expandable content pattern**: Toggle buttons use `[section]-toggle` and expanded content uses `[section]-section`
12. **Show more pattern**: Uses `show-all-recommendations-button` to expand content sections

## Testing Hierarchy

The test IDs create a clear hierarchy for component testing:

1. **App-level components**: Core structure of the application
2. **Widget containers**: Individual dashboard modules
3. **Widget headers**: Title sections of each widget
4. **Widget content sections**: Functional areas within widgets
5. **Interactive elements**: Buttons, selectors, toggles, tabs
6. **Content elements**: Text descriptions, values, summaries
7. **Status and value indicators**: Badges, metrics, levels
8. **Tab-based navigation**: Tabs within widgets for different views
9. **Expandable sections**: Sections that can be toggled open/closed
10. **Show more content**: Expandable lists with limited initial view

## Test ID Purposes

The test IDs serve several distinct purposes:

1. **Structural testing**: App layout and component hierarchy validation
2. **Interactive testing**: User interactions with controls and forms
3. **Data display testing**: Verification of correct data rendering
4. **State change testing**: Testing UI updates in response to state changes
5. **Value validation**: Testing numerical and textual content
6. **Navigation testing**: Tabs, toggles, and navigation elements
7. **Conditional content testing**: Testing expandable content and "show more" functionality
8. **Responsive behavior testing**: Testing how components adapt to different screen sizes
9. **Custom component testing**: Testing specialized UI components like radar charts
10. **Content filtering testing**: Testing search and filter functionality

## Testing Strategy Recommendations

Based on the test ID structure, here are recommended testing approaches:

1. **Component isolation tests**: Test each widget in isolation using its container test ID
2. **Interactive flow tests**: Test user journeys that span multiple widgets
3. **State transition tests**: Verify that changing security levels properly updates all dependent components
4. **Tab navigation tests**: Verify that tab interfaces correctly display different content
5. **Expandable content tests**: Verify that toggle buttons correctly expand and collapse content sections
6. **Limited content tests**: Verify that "show more" buttons correctly reveal additional content
7. **Filter functionality tests**: Test that filters and search inputs correctly filter content
8. **Responsive tests**: Check that components adapt appropriately across different screen sizes
9. **Accessibility tests**: Ensure that the application remains accessible when security levels change

The consistent naming patterns make it particularly well-suited for integration testing with tools like Cypress or Playwright that can easily target elements by data-testid attributes.

# Coverage Improvement Analysis

## Coverage Requirements

- Functions: 75% (current: 63.29%)
- Branches: 70% (current: 67.98%)

## High-Priority Files for Coverage Improvement

### Files with Low Function Coverage and High Impact

| File                                                   | Functions Coverage | # Uncovered Functions | Priority |
| ------------------------------------------------------ | ------------------ | --------------------- | -------- |
| src/services/ciaContentService.ts                      | 70.83%             | ~14 functions         | HIGH     |
| src/utils/typeGuards.ts                                | 40%                | ~6 functions          | HIGH     |
| src/utils/widgetHelpers.tsx                            | 0%                 | All functions         | HIGH     |
| src/components/widgets/AvailabilityImpactWidget.tsx    | 50%                | ~2 functions          | MEDIUM   |
| src/components/widgets/IntegrityImpactWidget.tsx       | 50%                | ~2 functions          | MEDIUM   |
| src/components/widgets/ConfidentialityImpactWidget.tsx | 50%                | ~2 functions          | MEDIUM   |
| src/components/widgets/SecuritySummaryWidget.tsx       | 50%                | ~2 functions          | MEDIUM   |
| src/CIAClassificationApp.tsx                           | 33.33%             | ~4 functions          | MEDIUM   |

### Files with Low Branch Coverage and High Impact

| File                                                   | Branch Coverage | # Uncovered Branches | Priority |
| ------------------------------------------------------ | --------------- | -------------------- | -------- |
| src/services/ciaContentService.ts                      | 37.19%          | Many conditions      | HIGH     |
| src/components/widgets/SecuritySummaryWidget.tsx       | 10%             | Many conditions      | HIGH     |
| src/components/widgets/ConfidentialityImpactWidget.tsx | 58.82%          | ~7 branches          | MEDIUM   |
| src/constants/colorConstants.ts                        | 57.14%          | ~3 branches          | MEDIUM   |
| src/types/widgets.ts                                   | 61.9%           | ~8 branches          | MEDIUM   |

## Strategy for Coverage Improvement

1. Focus on high-priority files first
2. Add tests for untested functions in service files
3. Add more conditional tests for branch coverage
4. Delete or merge unused files
