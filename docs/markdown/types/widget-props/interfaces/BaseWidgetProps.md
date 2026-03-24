[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/widget-props](../README.md) / BaseWidgetProps

# Interface: BaseWidgetProps

Defined in: [types/widget-props.ts:240](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L240)

Base props common to all widgets

Provides the foundation for all widget components with standard
styling, testing capabilities, error handling, and child content.

Extends CommonWidgetProps to maintain consistency with existing patterns.

## Example

```typescript
interface MyWidgetProps extends BaseWidgetProps {
  customProp: string;
}
```

## Extends

- [`CommonWidgetProps`](CommonWidgetProps.md)

## Extended by

- [`SecurityWidgetBaseProps`](../../widgets/interfaces/SecurityWidgetBaseProps.md)
- [`CIAComponentWidgetProps`](CIAComponentWidgetProps.md)
- [`AllCIAComponentsProps`](AllCIAComponentsProps.md)
- [`WidgetPropsWithLoading`](WidgetPropsWithLoading.md)
- [`AvailabilityImpactWidgetProps`](AvailabilityImpactWidgetProps.md)
- [`IntegrityImpactWidgetProps`](IntegrityImpactWidgetProps.md)
- [`ConfidentialityImpactWidgetProps`](ConfidentialityImpactWidgetProps.md)

## Properties

### className?

> `optional` **className?**: `string`

Defined in: [types/widget-props.ts:124](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L124)

Optional CSS class name for custom styling

Allows consumers to apply custom styles via CSS classes.
Use Tailwind CSS classes or custom CSS classes.

#### Example

```ts
"mt-4 border-2 rounded-lg"
```

#### Inherited from

[`CommonWidgetProps`](CommonWidgetProps.md).[`className`](CommonWidgetProps.md#classname)

***

### testId?

> `optional` **testId?**: `string`

Defined in: [types/widget-props.ts:135](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L135)

Optional test ID for automated testing

Used by testing frameworks (Cypress, Vitest) to locate
and interact with the component. Should follow the pattern
defined in testIds constants.

#### Example

```ts
"security-widget-availability"
```

#### Inherited from

[`CommonWidgetProps`](CommonWidgetProps.md).[`testId`](CommonWidgetProps.md#testid)

***

### children?

> `optional` **children?**: `ReactNode`

Defined in: [types/widget-props.ts:244](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L244)

Optional children elements

***

### onError?

> `optional` **onError?**: (`error`) => `void`

Defined in: [types/widget-props.ts:250](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L250)

Optional callback when widget encounters an error

#### Parameters

##### error

`Error`

Error that occurred

#### Returns

`void`
