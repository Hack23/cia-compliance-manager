[**CIA Compliance Manager Diagrams v1.1.14**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [hooks/useCIAOptions](../README.md) / useCIAOptions

# Function: useCIAOptions()

> **useCIAOptions**(): [`UseCIAOptionsReturn`](../interfaces/UseCIAOptionsReturn.md)

Defined in: [hooks/useCIAOptions.ts:417](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/hooks/useCIAOptions.ts#L417)

Custom hook for accessing CIA security level options and ROI estimates

Provides comprehensive access to security level configurations including
availability, integrity, and confidentiality options with associated costs,
descriptions, and ROI estimates. This hook is essential for building
security configuration interfaces and cost calculators.

## Features
- Pre-configured security level options for all CIA components
- Cost estimates (CAPEX and OPEX) for each security level
- ROI estimates and recommendations
- Utility functions for calculating combined security metrics
- Type-safe access to all configuration data

## Usage Guidelines
- Use the options objects to populate security level selectors
- Reference cost data for budget planning and financial analysis
- Use ROI functions to calculate investment returns
- Combine with other hooks for complete security assessments

## Returns

[`UseCIAOptionsReturn`](../interfaces/UseCIAOptionsReturn.md)

Object containing CIA options, ROI estimates, and utility functions

## Examples

```tsx
// Basic usage - accessing security level options
function SecurityLevelSelector() {
  const { availabilityOptions } = useCIAOptions();
  const [selected, setSelected] = useState<SecurityLevel>('Moderate');

  return (
    <select value={selected} onChange={(e) => setSelected(e.target.value as SecurityLevel)}>
      {Object.entries(availabilityOptions).map(([level, details]) => (
        <option key={level} value={level}>
          {level} - {details.description} (CAPEX: ${details.capex}, OPEX: ${details.opex})
        </option>
      ))}
    </select>
  );
}
```

```tsx
// Advanced usage - calculating ROI
function ROICalculator() {
  const {
    getCombinedROIKey,
    getROIDataForCombinedKey
  } = useCIAOptions();

  const [levels, setLevels] = useState({
    confidentiality: 'High' as SecurityLevel,
    integrity: 'Very High' as SecurityLevel,
    availability: 'Moderate' as SecurityLevel
  });

  const roiKey = getCombinedROIKey(
    levels.confidentiality,
    levels.integrity,
    levels.availability
  );
  const roiData = getROIDataForCombinedKey(roiKey);

  return (
    <div>
      <h3>ROI Analysis</h3>
      <p>Return Rate: {roiData.returnRate}</p>
      <p>Recommendation: {roiData.recommendation}</p>
      <p>{roiData.description}</p>
    </div>
  );
}
```

```tsx
// Cost comparison across security levels
function CostComparison() {
  const { availabilityOptions, integrityOptions, confidentialityOptions } = useCIAOptions();

  const calculateTotalCost = (level: SecurityLevel) => {
    const availCost = (availabilityOptions[level]?.capex || 0) + (availabilityOptions[level]?.opex || 0);
    const integrityCost = (integrityOptions[level]?.capex || 0) + (integrityOptions[level]?.opex || 0);
    const confCost = (confidentialityOptions[level]?.capex || 0) + (confidentialityOptions[level]?.opex || 0);
    return availCost + integrityCost + confCost;
  };

  return (
    <table>
      <thead>
        <tr><th>Level</th><th>Total Cost</th></tr>
      </thead>
      <tbody>
        {(['None', 'Low', 'Moderate', 'High', 'Very High'] as SecurityLevel[]).map(level => (
          <tr key={level}>
            <td>{level}</td>
            <td>${calculateTotalCost(level).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```
