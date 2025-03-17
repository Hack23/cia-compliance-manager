[**CIA Compliance Manager Documentation v0.8.5**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / UnifiedSecurityLevelSelectorProps

# Interface: UnifiedSecurityLevelSelectorProps

Defined in: [src/components/SecurityLevelSelector.tsx:17](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/components/SecurityLevelSelector.tsx#L17)

Unified SecurityLevelSelector that supports both simple and enhanced usage patterns

## Business Perspective

Provides a consistent interface for security level selection across the application,
enabling both simple scenarios and comprehensive CIA triad security assessment.

## Param

Component properties (supports both simple and enhanced selector props)

## Properties

### accentColor?

> `optional` **accentColor**: `string`

Defined in: [src/components/SecurityLevelSelector.tsx:27](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/components/SecurityLevelSelector.tsx#L27)

***

### availabilityLevel?

> `optional` **availabilityLevel**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [src/components/SecurityLevelSelector.tsx:32](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/components/SecurityLevelSelector.tsx#L32)

***

### availabilityOptions?

> `optional` **availabilityOptions**: `Record`\<`string`, `any`\>

Defined in: [src/components/SecurityLevelSelector.tsx:38](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/components/SecurityLevelSelector.tsx#L38)

***

### className?

> `optional` **className**: `string`

Defined in: [src/components/SecurityLevelSelector.tsx:29](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/components/SecurityLevelSelector.tsx#L29)

***

### confidentialityLevel?

> `optional` **confidentialityLevel**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [src/components/SecurityLevelSelector.tsx:34](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/components/SecurityLevelSelector.tsx#L34)

***

### confidentialityOptions?

> `optional` **confidentialityOptions**: `Record`\<`string`, `any`\>

Defined in: [src/components/SecurityLevelSelector.tsx:40](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/components/SecurityLevelSelector.tsx#L40)

***

### description?

> `optional` **description**: `string`

Defined in: [src/components/SecurityLevelSelector.tsx:23](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/components/SecurityLevelSelector.tsx#L23)

***

### disabled?

> `optional` **disabled**: `boolean`

Defined in: [src/components/SecurityLevelSelector.tsx:28](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/components/SecurityLevelSelector.tsx#L28)

***

### icon?

> `optional` **icon**: `string`

Defined in: [src/components/SecurityLevelSelector.tsx:24](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/components/SecurityLevelSelector.tsx#L24)

***

### integrityLevel?

> `optional` **integrityLevel**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [src/components/SecurityLevelSelector.tsx:33](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/components/SecurityLevelSelector.tsx#L33)

***

### integrityOptions?

> `optional` **integrityOptions**: `Record`\<`string`, `any`\>

Defined in: [src/components/SecurityLevelSelector.tsx:39](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/components/SecurityLevelSelector.tsx#L39)

***

### label?

> `optional` **label**: `string`

Defined in: [src/components/SecurityLevelSelector.tsx:19](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/components/SecurityLevelSelector.tsx#L19)

***

### onAvailabilityChange()?

> `optional` **onAvailabilityChange**: (`level`) => `void`

Defined in: [src/components/SecurityLevelSelector.tsx:35](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/components/SecurityLevelSelector.tsx#L35)

#### Parameters

##### level

`string`

#### Returns

`void`

***

### onChange()?

> `optional` **onChange**: (`value`) => `void`

Defined in: [src/components/SecurityLevelSelector.tsx:21](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/components/SecurityLevelSelector.tsx#L21)

#### Parameters

##### value

`string`

#### Returns

`void`

***

### onConfidentialityChange()?

> `optional` **onConfidentialityChange**: (`level`) => `void`

Defined in: [src/components/SecurityLevelSelector.tsx:37](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/components/SecurityLevelSelector.tsx#L37)

#### Parameters

##### level

`string`

#### Returns

`void`

***

### onIntegrityChange()?

> `optional` **onIntegrityChange**: (`level`) => `void`

Defined in: [src/components/SecurityLevelSelector.tsx:36](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/components/SecurityLevelSelector.tsx#L36)

#### Parameters

##### level

`string`

#### Returns

`void`

***

### options?

> `optional` **options**: `string`[]

Defined in: [src/components/SecurityLevelSelector.tsx:22](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/components/SecurityLevelSelector.tsx#L22)

***

### showDescriptions?

> `optional` **showDescriptions**: `boolean`

Defined in: [src/components/SecurityLevelSelector.tsx:42](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/components/SecurityLevelSelector.tsx#L42)

***

### showSelectionSummary?

> `optional` **showSelectionSummary**: `boolean`

Defined in: [src/components/SecurityLevelSelector.tsx:41](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/components/SecurityLevelSelector.tsx#L41)

***

### testId?

> `optional` **testId**: `string`

Defined in: [src/components/SecurityLevelSelector.tsx:26](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/components/SecurityLevelSelector.tsx#L26)

***

### tooltipContent?

> `optional` **tooltipContent**: `string`

Defined in: [src/components/SecurityLevelSelector.tsx:25](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/components/SecurityLevelSelector.tsx#L25)

***

### useEnhancedVersion?

> `optional` **useEnhancedVersion**: `boolean`

Defined in: [src/components/SecurityLevelSelector.tsx:45](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/components/SecurityLevelSelector.tsx#L45)

***

### value?

> `optional` **value**: `string`

Defined in: [src/components/SecurityLevelSelector.tsx:20](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/components/SecurityLevelSelector.tsx#L20)
