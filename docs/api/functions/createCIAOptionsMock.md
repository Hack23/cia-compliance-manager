[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / createCIAOptionsMock

# Function: createCIAOptionsMock()

> **createCIAOptionsMock**(`customization`): `object`

Defined in: [src/tests/testMocks/ciaOptionsMocks.ts:7](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/testMocks/ciaOptionsMocks.ts#L7)

Creates standardized CIA options mock that works with vi.mock hoisting
Set to match the expected values in tests

## Parameters

### customization

## Returns

`object`

### \_\_esModule

> **\_\_esModule**: `boolean` = `true`

### availabilityOptions

> **availabilityOptions**: `object` = `mockOptions.availabilityOptions`

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

> **confidentialityOptions**: `object` = `mockOptions.confidentialityOptions`

#### confidentialityOptions.High

> **High**: `object`

#### confidentialityOptions.High.businessImpact

> **businessImpact**: `string` = `"Test business impact High"`

#### confidentialityOptions.High.capex

> **capex**: `number` = `15`

#### confidentialityOptions.High.description

> **description**: `string` = `"Test confidentiality High"`

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

> **description**: `string` = `"Test confidentiality Low"`

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

> **description**: `string` = `"Test confidentiality Moderate"`

#### confidentialityOptions.Moderate.opex

> **opex**: `number` = `5`

#### confidentialityOptions.Moderate.recommendations

> **recommendations**: `string`[]

#### confidentialityOptions.Moderate.technical

> **technical**: `string` = `"Test technical Moderate"`

#### confidentialityOptions.None

> **None**: `object`

#### confidentialityOptions.None.businessImpact

> **businessImpact**: `string` = `"Test business impact None"`

#### confidentialityOptions.None.capex

> **capex**: `number` = `0`

#### confidentialityOptions.None.description

> **description**: `string` = `"Test confidentiality None"`

#### confidentialityOptions.None.opex

> **opex**: `number` = `0`

#### confidentialityOptions.None.recommendations

> **recommendations**: `string`[]

#### confidentialityOptions.None.technical

> **technical**: `string` = `"Test technical None"`

#### confidentialityOptions.Very High

> **Very High**: `object`

#### confidentialityOptions.Very High.businessImpact

> **businessImpact**: `string` = `"Test business impact Very High"`

#### confidentialityOptions.Very High.capex

> **capex**: `number` = `20`

#### confidentialityOptions.Very High.description

> **description**: `string` = `"Test confidentiality Very High"`

#### confidentialityOptions.Very High.opex

> **opex**: `number` = `10`

#### confidentialityOptions.Very High.recommendations

> **recommendations**: `string`[]

#### confidentialityOptions.Very High.technical

> **technical**: `string` = `"Test technical Very High"`

### default

> **default**: `object` = `mockOptions`

#### default.availabilityOptions

> **availabilityOptions**: `object`

#### default.availabilityOptions.High

> **High**: `object`

#### default.availabilityOptions.High.businessImpact

> **businessImpact**: `string` = `"Test business impact High"`

#### default.availabilityOptions.High.capex

> **capex**: `number` = `15`

#### default.availabilityOptions.High.description

> **description**: `string` = `"Test availability High"`

#### default.availabilityOptions.High.opex

> **opex**: `number` = `8`

#### default.availabilityOptions.High.recommendations

> **recommendations**: `string`[]

#### default.availabilityOptions.High.technical

> **technical**: `string` = `"Test technical High"`

#### default.availabilityOptions.Low

> **Low**: `object`

#### default.availabilityOptions.Low.businessImpact

> **businessImpact**: `string` = `"Test business impact Low"`

#### default.availabilityOptions.Low.capex

> **capex**: `number` = `5`

#### default.availabilityOptions.Low.description

> **description**: `string` = `"Test availability Low"`

#### default.availabilityOptions.Low.opex

> **opex**: `number` = `2`

#### default.availabilityOptions.Low.recommendations

> **recommendations**: `string`[]

#### default.availabilityOptions.Low.technical

> **technical**: `string` = `"Test technical Low"`

#### default.availabilityOptions.Moderate

> **Moderate**: `object`

#### default.availabilityOptions.Moderate.businessImpact

> **businessImpact**: `string` = `"Test business impact Moderate"`

#### default.availabilityOptions.Moderate.capex

> **capex**: `number` = `10`

#### default.availabilityOptions.Moderate.description

> **description**: `string` = `"Test availability Moderate"`

#### default.availabilityOptions.Moderate.opex

> **opex**: `number` = `5`

#### default.availabilityOptions.Moderate.recommendations

> **recommendations**: `string`[]

#### default.availabilityOptions.Moderate.technical

> **technical**: `string` = `"Test technical Moderate"`

#### default.availabilityOptions.None

> **None**: `object`

#### default.availabilityOptions.None.bg

> **bg**: `string` = `"#ffffff"`

#### default.availabilityOptions.None.businessImpact

> **businessImpact**: `string` = `"Test business impact None"`

#### default.availabilityOptions.None.capex

> **capex**: `number` = `0`

#### default.availabilityOptions.None.description

> **description**: `string` = `"Test availability None"`

#### default.availabilityOptions.None.opex

> **opex**: `number` = `0`

#### default.availabilityOptions.None.recommendations

> **recommendations**: `string`[]

#### default.availabilityOptions.None.technical

> **technical**: `string` = `"Test technical None"`

#### default.availabilityOptions.None.text

> **text**: `string` = `"#000000"`

#### default.availabilityOptions.Very High

> **Very High**: `object`

#### default.availabilityOptions.Very High.businessImpact

> **businessImpact**: `string` = `"Test business impact Very High"`

#### default.availabilityOptions.Very High.capex

> **capex**: `number` = `20`

#### default.availabilityOptions.Very High.description

> **description**: `string` = `"Test availability Very High"`

#### default.availabilityOptions.Very High.opex

> **opex**: `number` = `10`

#### default.availabilityOptions.Very High.recommendations

> **recommendations**: `string`[]

#### default.availabilityOptions.Very High.technical

> **technical**: `string` = `"Test technical Very High"`

#### default.confidentialityOptions

> **confidentialityOptions**: `object`

#### default.confidentialityOptions.High

> **High**: `object`

#### default.confidentialityOptions.High.businessImpact

> **businessImpact**: `string` = `"Test business impact High"`

#### default.confidentialityOptions.High.capex

> **capex**: `number` = `15`

#### default.confidentialityOptions.High.description

> **description**: `string` = `"Test confidentiality High"`

#### default.confidentialityOptions.High.opex

> **opex**: `number` = `8`

#### default.confidentialityOptions.High.recommendations

> **recommendations**: `string`[]

#### default.confidentialityOptions.High.technical

> **technical**: `string` = `"Test technical High"`

#### default.confidentialityOptions.Low

> **Low**: `object`

#### default.confidentialityOptions.Low.businessImpact

> **businessImpact**: `string` = `"Test business impact Low"`

#### default.confidentialityOptions.Low.capex

> **capex**: `number` = `5`

#### default.confidentialityOptions.Low.description

> **description**: `string` = `"Test confidentiality Low"`

#### default.confidentialityOptions.Low.opex

> **opex**: `number` = `2`

#### default.confidentialityOptions.Low.recommendations

> **recommendations**: `string`[]

#### default.confidentialityOptions.Low.technical

> **technical**: `string` = `"Test technical Low"`

#### default.confidentialityOptions.Moderate

> **Moderate**: `object`

#### default.confidentialityOptions.Moderate.businessImpact

> **businessImpact**: `string` = `"Test business impact Moderate"`

#### default.confidentialityOptions.Moderate.capex

> **capex**: `number` = `10`

#### default.confidentialityOptions.Moderate.description

> **description**: `string` = `"Test confidentiality Moderate"`

#### default.confidentialityOptions.Moderate.opex

> **opex**: `number` = `5`

#### default.confidentialityOptions.Moderate.recommendations

> **recommendations**: `string`[]

#### default.confidentialityOptions.Moderate.technical

> **technical**: `string` = `"Test technical Moderate"`

#### default.confidentialityOptions.None

> **None**: `object`

#### default.confidentialityOptions.None.businessImpact

> **businessImpact**: `string` = `"Test business impact None"`

#### default.confidentialityOptions.None.capex

> **capex**: `number` = `0`

#### default.confidentialityOptions.None.description

> **description**: `string` = `"Test confidentiality None"`

#### default.confidentialityOptions.None.opex

> **opex**: `number` = `0`

#### default.confidentialityOptions.None.recommendations

> **recommendations**: `string`[]

#### default.confidentialityOptions.None.technical

> **technical**: `string` = `"Test technical None"`

#### default.confidentialityOptions.Very High

> **Very High**: `object`

#### default.confidentialityOptions.Very High.businessImpact

> **businessImpact**: `string` = `"Test business impact Very High"`

#### default.confidentialityOptions.Very High.capex

> **capex**: `number` = `20`

#### default.confidentialityOptions.Very High.description

> **description**: `string` = `"Test confidentiality Very High"`

#### default.confidentialityOptions.Very High.opex

> **opex**: `number` = `10`

#### default.confidentialityOptions.Very High.recommendations

> **recommendations**: `string`[]

#### default.confidentialityOptions.Very High.technical

> **technical**: `string` = `"Test technical Very High"`

#### default.integrityOptions

> **integrityOptions**: `object`

#### default.integrityOptions.High

> **High**: `object`

#### default.integrityOptions.High.businessImpact

> **businessImpact**: `string` = `"Test business impact High"`

#### default.integrityOptions.High.capex

> **capex**: `number` = `15`

#### default.integrityOptions.High.description

> **description**: `string` = `"Test integrity High"`

#### default.integrityOptions.High.opex

> **opex**: `number` = `8`

#### default.integrityOptions.High.recommendations

> **recommendations**: `string`[]

#### default.integrityOptions.High.technical

> **technical**: `string` = `"Test technical High"`

#### default.integrityOptions.Low

> **Low**: `object`

#### default.integrityOptions.Low.businessImpact

> **businessImpact**: `string` = `"Test business impact Low"`

#### default.integrityOptions.Low.capex

> **capex**: `number` = `5`

#### default.integrityOptions.Low.description

> **description**: `string` = `"Test integrity Low"`

#### default.integrityOptions.Low.opex

> **opex**: `number` = `2`

#### default.integrityOptions.Low.recommendations

> **recommendations**: `string`[]

#### default.integrityOptions.Low.technical

> **technical**: `string` = `"Test technical Low"`

#### default.integrityOptions.Moderate

> **Moderate**: `object`

#### default.integrityOptions.Moderate.businessImpact

> **businessImpact**: `string` = `"Test business impact Moderate"`

#### default.integrityOptions.Moderate.capex

> **capex**: `number` = `10`

#### default.integrityOptions.Moderate.description

> **description**: `string` = `"Test integrity Moderate"`

#### default.integrityOptions.Moderate.opex

> **opex**: `number` = `5`

#### default.integrityOptions.Moderate.recommendations

> **recommendations**: `string`[]

#### default.integrityOptions.Moderate.technical

> **technical**: `string` = `"Test technical Moderate"`

#### default.integrityOptions.None

> **None**: `object`

#### default.integrityOptions.None.businessImpact

> **businessImpact**: `string` = `"Test business impact None"`

#### default.integrityOptions.None.capex

> **capex**: `number` = `0`

#### default.integrityOptions.None.description

> **description**: `string` = `"Test integrity None"`

#### default.integrityOptions.None.opex

> **opex**: `number` = `0`

#### default.integrityOptions.None.recommendations

> **recommendations**: `string`[]

#### default.integrityOptions.None.technical

> **technical**: `string` = `"Test technical None"`

#### default.integrityOptions.Very High

> **Very High**: `object`

#### default.integrityOptions.Very High.businessImpact

> **businessImpact**: `string` = `"Test business impact Very High"`

#### default.integrityOptions.Very High.capex

> **capex**: `number` = `20`

#### default.integrityOptions.Very High.description

> **description**: `string` = `"Test integrity Very High"`

#### default.integrityOptions.Very High.opex

> **opex**: `number` = `10`

#### default.integrityOptions.Very High.recommendations

> **recommendations**: `string`[]

#### default.integrityOptions.Very High.technical

> **technical**: `string` = `"Test technical Very High"`

#### default.ROI\_ESTIMATES

> **ROI\_ESTIMATES**: `object`

#### default.ROI\_ESTIMATES.HIGH

> **HIGH**: `object`

#### default.ROI\_ESTIMATES.HIGH.description

> **description**: `string` = `"High ROI"`

#### default.ROI\_ESTIMATES.HIGH.returnRate

> **returnRate**: `string` = `"350%"`

#### default.ROI\_ESTIMATES.LOW

> **LOW**: `object`

#### default.ROI\_ESTIMATES.LOW.description

> **description**: `string` = `"Low ROI"`

#### default.ROI\_ESTIMATES.LOW.returnRate

> **returnRate**: `string` = `"50%"`

#### default.ROI\_ESTIMATES.MODERATE

> **MODERATE**: `object`

#### default.ROI\_ESTIMATES.MODERATE.description

> **description**: `string` = `"Standard security provides good value"`

#### default.ROI\_ESTIMATES.MODERATE.returnRate

> **returnRate**: `string` = `"200%"`

#### default.ROI\_ESTIMATES.NONE

> **NONE**: `object`

#### default.ROI\_ESTIMATES.NONE.description

> **description**: `string` = `"No ROI"`

#### default.ROI\_ESTIMATES.NONE.returnRate

> **returnRate**: `string` = `"0%"`

#### default.ROI\_ESTIMATES.VERY\_HIGH

> **VERY\_HIGH**: `object`

#### default.ROI\_ESTIMATES.VERY\_HIGH.description

> **description**: `string` = `"Very high ROI"`

#### default.ROI\_ESTIMATES.VERY\_HIGH.returnRate

> **returnRate**: `string` = `"500%"`

### integrityOptions

> **integrityOptions**: `object` = `mockOptions.integrityOptions`

#### integrityOptions.High

> **High**: `object`

#### integrityOptions.High.businessImpact

> **businessImpact**: `string` = `"Test business impact High"`

#### integrityOptions.High.capex

> **capex**: `number` = `15`

#### integrityOptions.High.description

> **description**: `string` = `"Test integrity High"`

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

> **description**: `string` = `"Test integrity Low"`

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

> **description**: `string` = `"Test integrity Moderate"`

#### integrityOptions.Moderate.opex

> **opex**: `number` = `5`

#### integrityOptions.Moderate.recommendations

> **recommendations**: `string`[]

#### integrityOptions.Moderate.technical

> **technical**: `string` = `"Test technical Moderate"`

#### integrityOptions.None

> **None**: `object`

#### integrityOptions.None.businessImpact

> **businessImpact**: `string` = `"Test business impact None"`

#### integrityOptions.None.capex

> **capex**: `number` = `0`

#### integrityOptions.None.description

> **description**: `string` = `"Test integrity None"`

#### integrityOptions.None.opex

> **opex**: `number` = `0`

#### integrityOptions.None.recommendations

> **recommendations**: `string`[]

#### integrityOptions.None.technical

> **technical**: `string` = `"Test technical None"`

#### integrityOptions.Very High

> **Very High**: `object`

#### integrityOptions.Very High.businessImpact

> **businessImpact**: `string` = `"Test business impact Very High"`

#### integrityOptions.Very High.capex

> **capex**: `number` = `20`

#### integrityOptions.Very High.description

> **description**: `string` = `"Test integrity Very High"`

#### integrityOptions.Very High.opex

> **opex**: `number` = `10`

#### integrityOptions.Very High.recommendations

> **recommendations**: `string`[]

#### integrityOptions.Very High.technical

> **technical**: `string` = `"Test technical Very High"`

### ROI\_ESTIMATES

> **ROI\_ESTIMATES**: `object` = `mockOptions.ROI_ESTIMATES`

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
