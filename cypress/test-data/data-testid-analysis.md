# CIA Compliance Manager Dashboard Test ID Analysis

## App Structure

- `app-container` - Main application container that wraps the entire dashboard application
- `dashboard-grid` - Container for the dashboard grid layout that organizes all widgets
- `theme-toggle` - Button to toggle between light and dark mode

## Widget Pattern Analysis

Each widget follows a consistent container pattern:

```html
<div class="widget-container" data-testid="widget-container-[widget-name]">
  <div class="widget-header">
    <h3>Widget Title</h3>
  </div>
  <div class="widget-body">
    <div class="p-4">
      <!-- Widget content -->
    </div>
  </div>
</div>
```

## Detailed Widget Breakdown

### 1. Security Level Configuration Widget

**Purpose**: Allows users to configure security levels for availability, integrity, and confidentiality.

**Main Container**: `widget-container-widget-security-level`

**Key Components**:

- `security-level-availability` - Container for availability configuration controls
- `security-level-integrity` - Container for integrity configuration controls
- `security-level-confidentiality` - Container for confidentiality configuration controls
- `availability-details-content` - Panel displaying details about the selected availability level

**Content Type**:

- Selection controls (dropdowns, radio buttons) for each CIA component
- Informational text describing security levels
- Color indicators for the security level selected

### 2. Business Impact Analysis Widget

**Purpose**: Analyzes business impact of selected security levels across different dimensions.

**Main Container**: `widget-container-widget-business-impact`

**Key Components**:

- `widget-business-impact-executive-summary` - High-level summary of business impacts
- `widget-business-impact-overall-impact` - Overall impact assessment card
- `widget-business-impact-implementation-complexity` - Implementation complexity assessment card
- `widget-business-impact-security-profile` - Security profile assessment card
- `widget-business-impact-availability-badge` - Badge showing availability level
- `widget-business-impact-integrity-badge` - Badge showing integrity level
- `widget-business-impact-confidentiality-badge` - Badge showing confidentiality level
- `widget-business-impact-heatmap-availability` - Heat map cell for availability impact
- `widget-business-impact-heatmap-integrity` - Heat map cell for integrity impact
- `widget-business-impact-heatmap-confidentiality` - Heat map cell for confidentiality impact
- `widget-business-impact-impact-financial` - Financial impact assessment card
- `widget-business-impact-impact-operational` - Operational impact assessment card
- `widget-business-impact-impact-reputational` - Reputational impact assessment card
- `widget-business-impact-impact-regulatory` - Regulatory impact assessment card
- `widget-business-impact-tab-considerations` - Tab for implementation considerations
- `widget-business-impact-tab-benefits` - Tab for benefits
- `widget-business-impact-considerations` - Container for implementation considerations
- `widget-business-impact-consideration-0` through `widget-business-impact-consideration-3` - Individual consideration items

**Content Type**:

- Text descriptions of business impact by category
- Risk level indicators (Low, Medium, High)
- Impact metrics with quantitative and qualitative assessments
- Tab-based navigation between different views
- Consideration items with headings and descriptive text

### 3. Security Summary Widget

**Purpose**: Provides an overview of the security posture based on selected security levels.

**Main Container**: `widget-container-widget-security-summary`

**Key Components**:

- `overall-security-level` - Overall security level assessment
- `summary-description` - Description of the security summary
- `availability-card` - Card showing availability security details
- `availability-risk` - Risk level for availability
- `integrity-card` - Card showing integrity security details
- `integrity-risk` - Risk level for integrity
- `confidentiality-card` - Card showing confidentiality security details
- `confidentiality-risk` - Risk level for confidentiality

**Content Type**:

- Text description of overall security level
- Component-specific security level details
- Risk indicators with text labels (Low, Medium, High)
- Security level badges with colors corresponding to security levels

### 4. Value Creation Widget

**Purpose**: Shows the business value created by implementing the selected security levels.

**Main Container**: `widget-container-widget-value-creation`

**Key Components**:

- `value-creation-summary` - Summary of value creation
- `roi-value` - Return on investment value
- `value-metrics-grid` - Grid of value metrics
- `value-metric-0` through `value-metric-5` - Individual value metric cards
- `availability-value-section` - Value creation for availability component
- `availability-value-item-0` through `availability-value-item-3` - Value items for availability
- `integrity-value-section` - Value creation for integrity component
- `integrity-value-item-0` through `integrity-value-item-1` - Value items for integrity
- `confidentiality-value-section` - Value creation for confidentiality component
- `confidentiality-value-item-0` through `confidentiality-value-item-1` - Value items for confidentiality

**Content Type**:

- Numerical ROI indicators and percentages
- Value metrics with labels and numeric values
- Bulleted lists of value creation points
- Color-coded sections for each CIA component
- Business value statements for executive communications

### 5. Cost Estimation Widget

**Purpose**: Estimates implementation and operational costs for the selected security levels.

**Main Container**: `widget-container-widget-cost-estimation`

**Key Components**:

- `implementation-cost` - Implementation cost metrics
- `operational-cost` - Operational cost metrics
- `personnel-cost` - Personnel cost metrics
- `availability-cost` - Cost breakdown for availability component
- `integrity-cost` - Cost breakdown for integrity component
- `confidentiality-cost` - Cost breakdown for confidentiality component
- `implementation-timeline` - Timeline for implementation

**Content Type**:

- Monetary values with currency symbols
- Time estimates (weeks, months)
- Cost breakdown by category
- Graphical timeline representation
- Cost factors with descriptions

### 6. Compliance Status Widget

**Purpose**: Shows compliance status with various frameworks based on selected security levels.

**Main Container**: `widget-container-widget-compliance-status`

**Key Components**:

- `compliance-status-summary` - Summary of compliance status
- `partially-compliant-frameworks-list` - List of partially compliant frameworks
- `framework-item-partial-0` through `framework-item-partial-11` - Individual framework items
- `compliance-tips-list` - List of compliance tips

**Content Type**:

- Compliance status indicators (Compliant, Partially Compliant, Non-Compliant)
- Framework names and descriptions
- Compliance percentage scores
- Progress bars
- Tips and recommendations for improving compliance

### 7. Confidentiality Impact Widget

**Purpose**: Details the business impact of the selected confidentiality level.

**Main Container**: `widget-container-widget-confidentiality-impact`

**Key Components**:

- `widget-confidentiality-impact-confidentiality-badge` - Badge showing confidentiality level
- `widget-confidentiality-impact-security-score` - Security score for confidentiality
- `widget-confidentiality-impact-business-impact` - Business impact of confidentiality settings
- `widget-confidentiality-impact-business-impact-summary` - Summary of business impact
- `recommendation-0` through `recommendation-2` - Individual recommendations

**Content Type**:

- Security level badge with text label
- Security score with percentage or numeric value
- Business impact descriptions
- Risk level indicators
- Recommendations as bulleted items

### 8. Integrity Impact Widget

**Purpose**: Details the business impact of the selected integrity level.

**Main Container**: `widget-container-integrity-impact-widget`

**Key Components**:

- `integrity-impact-widget-integrity-badge` - Badge showing integrity level
- `integrity-impact-widget-risk-level` - Risk level assessment for integrity
- `integrity-impact-widget-description` - Description of integrity impact
- `integrity-impact-widget-metrics` - Metrics for integrity impact
- `integrity-impact-widget-business-impact` - Business impact of integrity settings
- `integrity-impact-widget-business-impact-summary` - Summary of business impact
- `integrity-impact-widget-recommendations` - Recommendations section
- `integrity-impact-widget-recommendation-0` through `integrity-impact-widget-recommendation-2` - Individual recommendations

**Content Type**:

- Security level badge with text label
- Risk level assessment with color indicator
- Technical description text
- Metrics with labels and values
- Business impact cards with descriptions
- Recommendations as bulleted items

### 9. Availability Impact Widget

**Purpose**: Details the business impact of the selected availability level.

**Main Container**: `widget-container-widget-availability-impact`

**Key Components**:

- `widget-availability-impact-level` - Badge showing availability level
- `widget-availability-impact-risk-level` - Risk level assessment for availability
- `widget-availability-impact-description` - Description of availability impact
- `widget-availability-impact-metrics` - Metrics for availability impact
- `widget-availability-impact-mttr` - Mean time to recover metrics
- `widget-availability-impact-infrastructure` - Infrastructure requirements
- `widget-availability-impact-business-impact` - Business impact of availability settings
- `widget-availability-impact-business-impact-summary` - Summary of business impact

**Content Type**:

- Security level badge with text label
- Risk level assessment with color indicator
- Technical description text
- Availability metrics (uptime percentages, RTO, RPO, MTTR)
- Infrastructure requirement descriptions
- Business impact cards with descriptions

### 10. Technical Implementation Details Widget

**Purpose**: Provides technical implementation guidance for the selected security levels.

**Main Container**: `widget-container-widget-technical-details`

**Key Components**:

- `availability-tab` - Tab for availability implementation details
- `integrity-tab` - Tab for integrity implementation details
- `confidentiality-tab` - Tab for confidentiality implementation details
- `technical-header` - Header for technical implementation
- `technical-description` - Description of technical implementation
- `development-effort` - Development effort metrics
- `maintenance-level` - Maintenance level metrics
- `required-expertise` - Required expertise metrics
- `implementation-header` - Header for implementation steps
- `implementation-step-0` through `implementation-step-4` - Individual implementation steps

**Content Type**:

- Tab navigation controls for each CIA component
- Technical description text
- Implementation effort metrics (time, cost, resources)
- Expertise level indicators
- Ordered list of implementation steps
- Technical requirements

### 11. Security Visualization Widget

**Purpose**: Provides visual representation of security posture using charts and diagrams.

**Main Container**: `widget-container-widget-security-visualization`

**Key Components**:

- `widget-security-visualization-risk-score` - Risk score visualization

**Content Type**:

- Chart/graph elements (typically radar charts)
- Risk score indicators
- Visual representations of security balance
- Comparison between current state and target state
- Security posture analysis text

### 12. Security Resources Widget

**Purpose**: Provides resources and recommendations for implementing security controls.

**Main Container**: `widget-container-security-resources-widget`

**Key Components**:

- Resource filter controls
- Resource list items
- Resource descriptions and links

**Content Type**:

- Categorized resources
- Resource titles and descriptions
- Links to external resources
- Implementation guidance
- Filtering and search controls

## Test ID Patterns and Best Practices

### 1. Container Pattern

All widgets follow a consistent container pattern with `widget-container-widget-[name]` for the main container.

### 2. Component-Specific Prefixes

Each component type uses consistent prefixes:

- `widget-` for widget containers
- `[component]-card` for card components
- `[component]-badge` for badges
- `[component]-section` for sections
- `[component]-item-[index]` for list items

### 3. Hierarchical Organization

Test IDs follow a hierarchical structure:

- Container level (widget container)
- Section level (business impact, technical details)
- Component level (cards, badges, metrics)
- Item level (individual items in lists)

### 4. Numerical Suffixes

List items use numerical suffixes (0-based indexing):

- `recommendation-0`, `recommendation-1`, etc.
- `implementation-step-0`, `implementation-step-1`, etc.
- `widget-business-impact-consideration-0`, etc.

### 5. Tab Controls Pattern

Tab-based interfaces use a consistent pattern:

- `[component]-tab` for tab controls
- `[component]-[tab-name]` for tab content

### 6. Common Repeated Elements

Several element types appear across multiple widgets:

- Badges showing security levels
- Risk level indicators
- Business impact assessments
- Recommendation lists
- Metric displays

## Tips for Test Automation

1. **Widget Container Selection**: Use `data-testid^="widget-container-"` to select all widget containers.

2. **Widget-Specific Elements**: Use `within()` to scope queries within a specific widget:

   ```typescript
   cy.findByTestId("widget-container-widget-security-level").within(() => {
     cy.findByTestId("security-level-availability").should("exist");
   });
   ```

3. **Dynamic Content**: For items with numerical suffixes, use a loop to verify all items:

   ```typescript
   for (let i = 0; i < 3; i++) {
     cy.findByTestId(`recommendation-${i}`).should("exist");
   }
   ```

4. **Tab Navigation**: For testing tabbed interfaces, select the tab first, then verify content:

   ```typescript
   cy.findByTestId("integrity-tab").click();
   cy.findByTestId("technical-description").should(
     "contain",
     "Integrity controls"
   );
   ```

5. **Metrics Verification**: For metrics, check both the label and value:
   ```typescript
   cy.findByTestId("implementation-cost").within(() => {
     cy.contains("Implementation Cost").should("exist");
     cy.contains("$").should("exist");
   });
   ```

## Coverage Improvement Analysis

From analyzing the current HTML, we can identify which test IDs are actually being used in the application. The following tables show the coverage of test IDs across widgets:

### High-Priority Widgets for Test Coverage Improvement

| Widget                 | Test IDs Used | Test IDs Missing/Unused       | Priority |
| ---------------------- | ------------- | ----------------------------- | -------- |
| Security Visualization | 1             | ~10 (charts, metrics)         | HIGH     |
| Security Resources     | 0             | ~15 (filters, items, details) | HIGH     |
| Confidentiality Impact | 5             | ~10 (detailed metrics)        | MEDIUM   |
| Value Creation         | 15            | ~5 (interaction elements)     | MEDIUM   |
| Technical Details      | 12            | ~5 (interaction elements)     | MEDIUM   |

### Component-Level Test ID Coverage

| Component Type | Coverage % | Missing Tests                          | Priority |
| -------------- | ---------- | -------------------------------------- | -------- |
| Badges         | 90%        | Text verification                      | LOW      |
| Cards          | 85%        | Interaction testing                    | LOW      |
| Tabs           | 70%        | Content verification after tab change  | MEDIUM   |
| Charts         | 20%        | Data verification, interaction testing | HIGH     |
| Metrics        | 75%        | Value validation                       | MEDIUM   |

## Recommended Testing Strategy

1. **Widget-Level Tests**: Test each widget in isolation with proper mocks for services
2. **Component Interaction Tests**: Test tab navigation and expandable sections
3. **Data Flow Tests**: Verify that changing security levels updates all dependent widgets
4. **Visual Tests**: Verify correct rendering of charts and visual elements
5. **Dark Mode Tests**: Verify widgets render correctly in dark mode

## Naming Convention Guide for New Test IDs

When adding new test IDs, follow these conventions:

1. Widget containers: `widget-container-widget-[name]`
2. Widget content sections: `widget-[name]-[section]`
3. Cards and panels: `[component]-card` or `[component]-panel`
4. List items: `[component]-item-[index]`
5. Metrics: `[component]-[metric-name]`
6. Status indicators: `[component]-status` or `[component]-level`
7. Tabs: `[component]-tab-[tab-name]`
8. Buttons and controls: `[component]-[action]-button`

Following these consistent naming patterns will ensure that new components integrate seamlessly into the existing test automation framework.
