[**CIA Compliance Manager Documentation v1.1.4**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [hooks/useCIAOptions](../README.md) / CIAOptionDetails

# Interface: CIAOptionDetails

Defined in: [hooks/useCIAOptions.ts:74](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/hooks/useCIAOptions.ts#L74)

CIA option details for a specific security level

Comprehensive configuration data for a security level including
costs, descriptions, and technical details. Used to display
security level options to users with full context.

## Example

```typescript
const optionDetails: CIAOptionDetails = {
  value: 3,
  description: "High availability requirements",
  technical: "Multi-AZ deployment with auto-scaling",
  businessImpact: "Minimal downtime, improved customer satisfaction",
  capex: 75000,
  opex: 30000,
  recommendations: ["Implement monitoring", "Regular DR testing"],
  impact: "99.9% uptime guarantee",
  fte: 2,
  bg: "bg-green-100",
  text: "text-green-800"
};
```

## Properties

### bg?

> `optional` **bg**: `string`

Defined in: [hooks/useCIAOptions.ts:103](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/hooks/useCIAOptions.ts#L103)

Optional background color CSS class for UI display

***

### businessImpact?

> `optional` **businessImpact**: `string`

Defined in: [hooks/useCIAOptions.ts:85](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/hooks/useCIAOptions.ts#L85)

Optional business impact description

***

### capex?

> `optional` **capex**: `number`

Defined in: [hooks/useCIAOptions.ts:88](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/hooks/useCIAOptions.ts#L88)

Optional capital expenditure (one-time costs)

***

### description

> **description**: `string`

Defined in: [hooks/useCIAOptions.ts:79](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/hooks/useCIAOptions.ts#L79)

Human-readable description of the security level

***

### fte?

> `optional` **fte**: `number`

Defined in: [hooks/useCIAOptions.ts:100](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/hooks/useCIAOptions.ts#L100)

Optional full-time equivalent resources needed

***

### impact?

> `optional` **impact**: `string`

Defined in: [hooks/useCIAOptions.ts:97](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/hooks/useCIAOptions.ts#L97)

Optional impact statement

***

### opex?

> `optional` **opex**: `number`

Defined in: [hooks/useCIAOptions.ts:91](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/hooks/useCIAOptions.ts#L91)

Optional operational expenditure (recurring annual costs)

***

### recommendations?

> `optional` **recommendations**: `string`[]

Defined in: [hooks/useCIAOptions.ts:94](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/hooks/useCIAOptions.ts#L94)

Optional array of implementation recommendations

***

### technical?

> `optional` **technical**: `string`

Defined in: [hooks/useCIAOptions.ts:82](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/hooks/useCIAOptions.ts#L82)

Optional technical implementation details

***

### text?

> `optional` **text**: `string`

Defined in: [hooks/useCIAOptions.ts:106](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/hooks/useCIAOptions.ts#L106)

Optional text color CSS class for UI display

***

### value

> **value**: `number`

Defined in: [hooks/useCIAOptions.ts:76](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/hooks/useCIAOptions.ts#L76)

Numeric value (0-4) representing security level strength
