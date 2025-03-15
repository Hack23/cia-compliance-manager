[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / createCIAOptionsTestMock

# Function: createCIAOptionsTestMock()

> **createCIAOptionsTestMock**(): `object`

Defined in: [src/tests/mockHelpers.ts:90](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/mockHelpers.ts#L90)

Creates a comprehensive mock for useCIAOptions with test-friendly values
Designed to be used with vi.mock hoisting

## Returns

`object`

### \_\_esModule

> **\_\_esModule**: `boolean` = `true`

### availabilityOptions

> **availabilityOptions**: `object` = `mockOptions`

#### availabilityOptions.High

> **High**: `object`

#### availabilityOptions.High.businessImpact

> **businessImpact**: `string` = `"Test business impact High"`

#### availabilityOptions.High.capex

> **capex**: `number` = `15`

#### availabilityOptions.High.description

> **description**: `string` = `"Test availability High"`

#### availabilityOptions.High.opex

> **opex**: `number` = `8`

#### availabilityOptions.High.recommendations

> **recommendations**: `string`[]

#### availabilityOptions.High.technical

> **technical**: `string` = `"Test technical High"`

#### availabilityOptions.Low

> **Low**: `object`

#### availabilityOptions.Low.businessImpact

> **businessImpact**: `string` = `"Test business impact Low"`

#### availabilityOptions.Low.capex

> **capex**: `number` = `5`

#### availabilityOptions.Low.description

> **description**: `string` = `"Test availability Low"`

#### availabilityOptions.Low.opex

> **opex**: `number` = `2`

#### availabilityOptions.Low.recommendations

> **recommendations**: `string`[]

#### availabilityOptions.Low.technical

> **technical**: `string` = `"Test technical Low"`

#### availabilityOptions.Moderate

> **Moderate**: `object`

#### availabilityOptions.Moderate.businessImpact

> **businessImpact**: `string` = `"Test business impact Moderate"`

#### availabilityOptions.Moderate.capex

> **capex**: `number` = `10`

#### availabilityOptions.Moderate.description

> **description**: `string` = `"Test availability Moderate"`

#### availabilityOptions.Moderate.opex

> **opex**: `number` = `5`

#### availabilityOptions.Moderate.recommendations

> **recommendations**: `string`[]

#### availabilityOptions.Moderate.technical

> **technical**: `string` = `"Test technical Moderate"`

#### availabilityOptions.None

> **None**: `object`

#### availabilityOptions.None.bg

> **bg**: `string` = `"#ffffff"`

#### availabilityOptions.None.businessImpact

> **businessImpact**: `string` = `"Test business impact None"`

#### availabilityOptions.None.capex

> **capex**: `number` = `0`

#### availabilityOptions.None.description

> **description**: `string` = `"Test availability None"`

#### availabilityOptions.None.opex

> **opex**: `number` = `0`

#### availabilityOptions.None.recommendations

> **recommendations**: `string`[]

#### availabilityOptions.None.technical

> **technical**: `string` = `"Test technical None"`

#### availabilityOptions.None.text

> **text**: `string` = `"#000000"`

#### availabilityOptions.Very High

> **Very High**: `object`

#### availabilityOptions.Very High.businessImpact

> **businessImpact**: `string` = `"Test business impact Very High"`

#### availabilityOptions.Very High.capex

> **capex**: `number` = `20`

#### availabilityOptions.Very High.description

> **description**: `string` = `"Test availability Very High"`

#### availabilityOptions.Very High.opex

> **opex**: `number` = `10`

#### availabilityOptions.Very High.recommendations

> **recommendations**: `string`[]

#### availabilityOptions.Very High.technical

> **technical**: `string` = `"Test technical Very High"`

### confidentialityOptions

> **confidentialityOptions**: `object` = `mockOptions`

#### confidentialityOptions.High

> **High**: `object`

#### confidentialityOptions.High.businessImpact

> **businessImpact**: `string` = `"Test business impact High"`

#### confidentialityOptions.High.capex

> **capex**: `number` = `15`

#### confidentialityOptions.High.description

> **description**: `string` = `"Test availability High"`

#### confidentialityOptions.High.opex

> **opex**: `number` = `8`

#### confidentialityOptions.High.recommendations

> **recommendations**: `string`[]

#### confidentialityOptions.High.technical

> **technical**: `string` = `"Test technical High"`

#### confidentialityOptions.Low

> **Low**: `object`

#### confidentialityOptions.Low.businessImpact

> **businessImpact**: `string` = `"Test business impact Low"`

#### confidentialityOptions.Low.capex

> **capex**: `number` = `5`

#### confidentialityOptions.Low.description

> **description**: `string` = `"Test availability Low"`

#### confidentialityOptions.Low.opex

> **opex**: `number` = `2`

#### confidentialityOptions.Low.recommendations

> **recommendations**: `string`[]

#### confidentialityOptions.Low.technical

> **technical**: `string` = `"Test technical Low"`

#### confidentialityOptions.Moderate

> **Moderate**: `object`

#### confidentialityOptions.Moderate.businessImpact

> **businessImpact**: `string` = `"Test business impact Moderate"`

#### confidentialityOptions.Moderate.capex

> **capex**: `number` = `10`

#### confidentialityOptions.Moderate.description

> **description**: `string` = `"Test availability Moderate"`

#### confidentialityOptions.Moderate.opex

> **opex**: `number` = `5`

#### confidentialityOptions.Moderate.recommendations

> **recommendations**: `string`[]

#### confidentialityOptions.Moderate.technical

> **technical**: `string` = `"Test technical Moderate"`

#### confidentialityOptions.None

> **None**: `object`

#### confidentialityOptions.None.bg

> **bg**: `string` = `"#ffffff"`

#### confidentialityOptions.None.businessImpact

> **businessImpact**: `string` = `"Test business impact None"`

#### confidentialityOptions.None.capex

> **capex**: `number` = `0`

#### confidentialityOptions.None.description

> **description**: `string` = `"Test availability None"`

#### confidentialityOptions.None.opex

> **opex**: `number` = `0`

#### confidentialityOptions.None.recommendations

> **recommendations**: `string`[]

#### confidentialityOptions.None.technical

> **technical**: `string` = `"Test technical None"`

#### confidentialityOptions.None.text

> **text**: `string` = `"#000000"`

#### confidentialityOptions.Very High

> **Very High**: `object`

#### confidentialityOptions.Very High.businessImpact

> **businessImpact**: `string` = `"Test business impact Very High"`

#### confidentialityOptions.Very High.capex

> **capex**: `number` = `20`

#### confidentialityOptions.Very High.description

> **description**: `string` = `"Test availability Very High"`

#### confidentialityOptions.Very High.opex

> **opex**: `number` = `10`

#### confidentialityOptions.Very High.recommendations

> **recommendations**: `string`[]

#### confidentialityOptions.Very High.technical

> **technical**: `string` = `"Test technical Very High"`

### default

> **default**: `Mock`\<`Procedure`\>

### integrityOptions

> **integrityOptions**: `object` = `mockOptions`

#### integrityOptions.High

> **High**: `object`

#### integrityOptions.High.businessImpact

> **businessImpact**: `string` = `"Test business impact High"`

#### integrityOptions.High.capex

> **capex**: `number` = `15`

#### integrityOptions.High.description

> **description**: `string` = `"Test availability High"`

#### integrityOptions.High.opex

> **opex**: `number` = `8`

#### integrityOptions.High.recommendations

> **recommendations**: `string`[]

#### integrityOptions.High.technical

> **technical**: `string` = `"Test technical High"`

#### integrityOptions.Low

> **Low**: `object`

#### integrityOptions.Low.businessImpact

> **businessImpact**: `string` = `"Test business impact Low"`

#### integrityOptions.Low.capex

> **capex**: `number` = `5`

#### integrityOptions.Low.description

> **description**: `string` = `"Test availability Low"`

#### integrityOptions.Low.opex

> **opex**: `number` = `2`

#### integrityOptions.Low.recommendations

> **recommendations**: `string`[]

#### integrityOptions.Low.technical

> **technical**: `string` = `"Test technical Low"`

#### integrityOptions.Moderate

> **Moderate**: `object`

#### integrityOptions.Moderate.businessImpact

> **businessImpact**: `string` = `"Test business impact Moderate"`

#### integrityOptions.Moderate.capex

> **capex**: `number` = `10`

#### integrityOptions.Moderate.description

> **description**: `string` = `"Test availability Moderate"`

#### integrityOptions.Moderate.opex

> **opex**: `number` = `5`

#### integrityOptions.Moderate.recommendations

> **recommendations**: `string`[]

#### integrityOptions.Moderate.technical

> **technical**: `string` = `"Test technical Moderate"`

#### integrityOptions.None

> **None**: `object`

#### integrityOptions.None.bg

> **bg**: `string` = `"#ffffff"`

#### integrityOptions.None.businessImpact

> **businessImpact**: `string` = `"Test business impact None"`

#### integrityOptions.None.capex

> **capex**: `number` = `0`

#### integrityOptions.None.description

> **description**: `string` = `"Test availability None"`

#### integrityOptions.None.opex

> **opex**: `number` = `0`

#### integrityOptions.None.recommendations

> **recommendations**: `string`[]

#### integrityOptions.None.technical

> **technical**: `string` = `"Test technical None"`

#### integrityOptions.None.text

> **text**: `string` = `"#000000"`

#### integrityOptions.Very High

> **Very High**: `object`

#### integrityOptions.Very High.businessImpact

> **businessImpact**: `string` = `"Test business impact Very High"`

#### integrityOptions.Very High.capex

> **capex**: `number` = `20`

#### integrityOptions.Very High.description

> **description**: `string` = `"Test availability Very High"`

#### integrityOptions.Very High.opex

> **opex**: `number` = `10`

#### integrityOptions.Very High.recommendations

> **recommendations**: `string`[]

#### integrityOptions.Very High.technical

> **technical**: `string` = `"Test technical Very High"`

### ROI\_ESTIMATES

> **ROI\_ESTIMATES**: `object`

#### ROI\_ESTIMATES.HIGH

> **HIGH**: `object`

#### ROI\_ESTIMATES.HIGH.description

> **description**: `string` = `"High ROI"`

#### ROI\_ESTIMATES.HIGH.returnRate

> **returnRate**: `string` = `"350%"`

#### ROI\_ESTIMATES.LOW

> **LOW**: `object`

#### ROI\_ESTIMATES.LOW.description

> **description**: `string` = `"Low ROI"`

#### ROI\_ESTIMATES.LOW.returnRate

> **returnRate**: `string` = `"50%"`

#### ROI\_ESTIMATES.MODERATE

> **MODERATE**: `object`

#### ROI\_ESTIMATES.MODERATE.description

> **description**: `string` = `"Standard security provides good value"`

#### ROI\_ESTIMATES.MODERATE.returnRate

> **returnRate**: `string` = `"200%"`

#### ROI\_ESTIMATES.NONE

> **NONE**: `object`

#### ROI\_ESTIMATES.NONE.description

> **description**: `string` = `"No ROI"`

#### ROI\_ESTIMATES.NONE.returnRate

> **returnRate**: `string` = `"0%"`

#### ROI\_ESTIMATES.VERY\_HIGH

> **VERY\_HIGH**: `object`

#### ROI\_ESTIMATES.VERY\_HIGH.description

> **description**: `string` = `"Very high ROI"`

#### ROI\_ESTIMATES.VERY\_HIGH.returnRate

> **returnRate**: `string` = `"500%"`

### useCIAOptions

> **useCIAOptions**: `Mock`\<`Procedure`\>
