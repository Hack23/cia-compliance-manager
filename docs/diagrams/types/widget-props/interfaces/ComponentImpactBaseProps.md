[**CIA Compliance Manager — UML Diagrams v1.1.128**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/widget-props](../README.md) / ComponentImpactBaseProps

# Interface: ComponentImpactBaseProps

Defined in: [types/widget-props.ts:179](https://github.com/Hack23/cia-compliance-manager/blob/2e8ac3253dba27a3ec201aa4150b1a187ebebcb1/src/types/widget-props.ts#L179)

Base interface for components that impact security levels

Provides a foundation for components that need to display or
interact with security levels across all CIA components.

Components should use specific level properties.

## Example

```typescript
interface MyComponentProps extends ComponentImpactBaseProps {
  additionalProp: string;
}
```

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:186](https://github.com/Hack23/cia-compliance-manager/blob/2e8ac3253dba27a3ec201aa4150b1a187ebebcb1/src/types/widget-props.ts#L186)

Current availability security level

Represents the selected security level for system availability
and uptime requirements.

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:194](https://github.com/Hack23/cia-compliance-manager/blob/2e8ac3253dba27a3ec201aa4150b1a187ebebcb1/src/types/widget-props.ts#L194)

Current integrity security level

Represents the selected security level for data integrity
and accuracy requirements.

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:202](https://github.com/Hack23/cia-compliance-manager/blob/2e8ac3253dba27a3ec201aa4150b1a187ebebcb1/src/types/widget-props.ts#L202)

Current confidentiality security level

Represents the selected security level for data privacy
and access control requirements.

***

### className?

> `optional` **className?**: `string`

Defined in: [types/widget-props.ts:207](https://github.com/Hack23/cia-compliance-manager/blob/2e8ac3253dba27a3ec201aa4150b1a187ebebcb1/src/types/widget-props.ts#L207)

Optional CSS class name for custom styling

***

### testId?

> `optional` **testId?**: `string`

Defined in: [types/widget-props.ts:212](https://github.com/Hack23/cia-compliance-manager/blob/2e8ac3253dba27a3ec201aa4150b1a187ebebcb1/src/types/widget-props.ts#L212)

Optional test ID for automated testing

***

### onLevelChange?

> `optional` **onLevelChange?**: (`level`) => `void`

Defined in: [types/widget-props.ts:217](https://github.com/Hack23/cia-compliance-manager/blob/2e8ac3253dba27a3ec201aa4150b1a187ebebcb1/src/types/widget-props.ts#L217)

Optional callback when security level changes

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`void`
