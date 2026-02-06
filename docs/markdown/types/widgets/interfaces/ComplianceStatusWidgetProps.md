[**CIA Compliance Manager Documentation v1.1.16**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/widgets](../README.md) / ComplianceStatusWidgetProps

# Interface: ComplianceStatusWidgetProps

Defined in: [types/widgets.ts:270](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/widgets.ts#L270)

Props for ComplianceStatusWidget component

## Business Perspective

This widget helps compliance officers understand how current security
settings align with major regulatory frameworks, providing actionable
insights into compliance gaps and requirements. 📋

## Extends

- [`WidgetBaseProps`](WidgetBaseProps.md)

## Properties

### availabilityLevel?

> `optional` **availabilityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:274](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/widgets.ts#L274)

Availability security level (optional when securityLevel is provided)

***

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/widgets.ts#L56)

Optional CSS class name

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`className`](WidgetBaseProps.md#classname)

***

### confidentialityLevel?

> `optional` **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:284](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/widgets.ts#L284)

Confidentiality security level (optional when securityLevel is provided)

***

### integrityLevel?

> `optional` **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:279](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/widgets.ts#L279)

Integrity security level (optional when securityLevel is provided)

***

### refreshTrigger?

> `optional` **refreshTrigger**: `number`

Defined in: [types/widgets.ts:294](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/widgets.ts#L294)

Optional refresh trigger to reload data

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:289](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/widgets.ts#L289)

Optional overall security level, used as fallback when individual levels aren't provided

#### Overrides

[`WidgetBaseProps`](WidgetBaseProps.md).[`securityLevel`](WidgetBaseProps.md#securitylevel)

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/widgets.ts#L61)

Optional test ID for testing

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`testId`](WidgetBaseProps.md#testid)
