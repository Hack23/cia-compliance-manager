[**CIA Compliance Manager Documentation v0.8.22**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/widgets](../README.md) / ComponentImpactBaseProps

# Interface: ComponentImpactBaseProps

Defined in: [types/widgets.ts:519](https://github.com/Hack23/cia-compliance-manager/blob/5eebba14bef5523072dd8c486c1cd0c7c18766fc/src/types/widgets.ts#L519)

Base properties for component impact widgets

## Extended by

- [`AvailabilityImpactWidgetProps`](AvailabilityImpactWidgetProps.md)
- [`IntegrityImpactWidgetProps`](IntegrityImpactWidgetProps.md)
- [`ConfidentialityImpactWidgetProps`](ConfidentialityImpactWidgetProps.md)
- [`IntegrityImpactWidgetProps`](../../../components/widgets/impactanalysis/IntegrityImpactWidget/interfaces/IntegrityImpactWidgetProps.md)
- [`ConfidentialityImpactWidgetProps`](../../../components/widgets/impactanalysis/ConfidentialityImpactWidget/interfaces/ConfidentialityImpactWidgetProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:528](https://github.com/Hack23/cia-compliance-manager/blob/5eebba14bef5523072dd8c486c1cd0c7c18766fc/src/types/widgets.ts#L528)

Availability security level

***

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:543](https://github.com/Hack23/cia-compliance-manager/blob/5eebba14bef5523072dd8c486c1cd0c7c18766fc/src/types/widgets.ts#L543)

CSS class name

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:538](https://github.com/Hack23/cia-compliance-manager/blob/5eebba14bef5523072dd8c486c1cd0c7c18766fc/src/types/widgets.ts#L538)

Confidentiality security level

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:533](https://github.com/Hack23/cia-compliance-manager/blob/5eebba14bef5523072dd8c486c1cd0c7c18766fc/src/types/widgets.ts#L533)

Integrity security level

***

### level?

> `optional` **level**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:523](https://github.com/Hack23/cia-compliance-manager/blob/5eebba14bef5523072dd8c486c1cd0c7c18766fc/src/types/widgets.ts#L523)

Security level (used for backward compatibility)

***

### onLevelChange()?

> `optional` **onLevelChange**: (`level`) => `void`

Defined in: [types/widgets.ts:553](https://github.com/Hack23/cia-compliance-manager/blob/5eebba14bef5523072dd8c486c1cd0c7c18766fc/src/types/widgets.ts#L553)

Callback when level changes

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:548](https://github.com/Hack23/cia-compliance-manager/blob/5eebba14bef5523072dd8c486c1cd0c7c18766fc/src/types/widgets.ts#L548)

Test ID for testing
