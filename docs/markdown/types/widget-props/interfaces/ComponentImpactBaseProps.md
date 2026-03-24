[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/widget-props](../README.md) / ComponentImpactBaseProps

# Interface: ComponentImpactBaseProps

Defined in: [types/widget-props.ts:180](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L180)

Base interface for components that impact security levels

Provides a foundation for components that need to display or
interact with security levels across all CIA components.

This interface has been cleaned up to remove deprecated properties.
All components should now use specific level properties.

## Example

```typescript
interface MyComponentProps extends ComponentImpactBaseProps {
  additionalProp: string;
}
```

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:187](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L187)

Current availability security level

Represents the selected security level for system availability
and uptime requirements.

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:195](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L195)

Current integrity security level

Represents the selected security level for data integrity
and accuracy requirements.

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:203](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L203)

Current confidentiality security level

Represents the selected security level for data privacy
and access control requirements.

***

### className?

> `optional` **className?**: `string`

Defined in: [types/widget-props.ts:208](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L208)

Optional CSS class name for custom styling

***

### testId?

> `optional` **testId?**: `string`

Defined in: [types/widget-props.ts:213](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L213)

Optional test ID for automated testing

***

### onLevelChange?

> `optional` **onLevelChange?**: (`level`) => `void`

Defined in: [types/widget-props.ts:218](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L218)

Optional callback when security level changes

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`void`
