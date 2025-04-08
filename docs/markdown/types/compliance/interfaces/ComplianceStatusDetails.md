[**CIA Compliance Manager Documentation v0.8.7**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/compliance](../README.md) / ComplianceStatusDetails

# Interface: ComplianceStatusDetails

Defined in: [types/compliance.ts:42](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/compliance.ts#L42)

Represents the overall compliance status

## Properties

### complianceScore

> **complianceScore**: `number`

Defined in: [types/compliance.ts:53](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/compliance.ts#L53)

***

### compliantFrameworks

> **compliantFrameworks**: `string`[]

Defined in: [types/compliance.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/compliance.ts#L45)

***

### findings?

> `optional` **findings**: `string`[]

Defined in: [types/compliance.ts:60](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/compliance.ts#L60)

***

### frameworkName?

> `optional` **frameworkName**: `string`

Defined in: [types/compliance.ts:59](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/compliance.ts#L59)

***

### frameworks?

> `optional` **frameworks**: [`ComplianceFramework`](ComplianceFramework.md)[]

Defined in: [types/compliance.ts:48](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/compliance.ts#L48)

***

### metRequirements?

> `optional` **metRequirements**: `string`[]

Defined in: [types/compliance.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/compliance.ts#L61)

***

### nonCompliantFrameworks

> **nonCompliantFrameworks**: `string`[]

Defined in: [types/compliance.ts:47](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/compliance.ts#L47)

***

### partiallyCompliantFrameworks

> **partiallyCompliantFrameworks**: `string`[]

Defined in: [types/compliance.ts:46](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/compliance.ts#L46)

***

### recommendations?

> `optional` **recommendations**: `string`[]

Defined in: [types/compliance.ts:63](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/compliance.ts#L63)

***

### remediationSteps?

> `optional` **remediationSteps**: `string`[]

Defined in: [types/compliance.ts:51](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/compliance.ts#L51)

***

### requirements?

> `optional` **requirements**: `string`[]

Defined in: [types/compliance.ts:52](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/compliance.ts#L52)

***

### status

> **status**: `string`

Defined in: [types/compliance.ts:44](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/compliance.ts#L44)

***

### statusText?

> `optional` **statusText**: `string`

Defined in: [types/compliance.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/compliance.ts#L56)

***

### unmetRequirements?

> `optional` **unmetRequirements**: `string`[]

Defined in: [types/compliance.ts:62](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/types/compliance.ts#L62)
