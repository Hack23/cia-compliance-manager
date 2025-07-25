[**CIA Compliance Manager Documentation v0.8.20**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/widgets](../README.md) / ComplianceStatusWidgetProps

# Interface: ComplianceStatusWidgetProps

Defined in: [types/widgets.ts:282](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/widgets.ts#L282)

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

Defined in: [types/widgets.ts:286](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/widgets.ts#L286)

Availability security level (optional when securityLevel is provided)

***

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:68](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/widgets.ts#L68)

Optional CSS class name

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`className`](WidgetBaseProps.md#classname)

***

### confidentialityLevel?

> `optional` **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:296](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/widgets.ts#L296)

Confidentiality security level (optional when securityLevel is provided)

***

### integrityLevel?

> `optional` **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:291](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/widgets.ts#L291)

Integrity security level (optional when securityLevel is provided)

***

### refreshTrigger?

> `optional` **refreshTrigger**: `number`

Defined in: [types/widgets.ts:306](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/widgets.ts#L306)

Optional refresh trigger to reload data

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:301](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/widgets.ts#L301)

Optional overall security level, used as fallback when individual levels aren't provided

#### Overrides

[`WidgetBaseProps`](WidgetBaseProps.md).[`securityLevel`](WidgetBaseProps.md#securitylevel)

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/types/widgets.ts#L73)

Optional test ID for testing

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`testId`](WidgetBaseProps.md#testid)
