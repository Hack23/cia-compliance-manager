[**CIA Compliance Manager — UML Diagrams v1.1.115**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/widget-props](../README.md) / BaseWidgetProps

# Interface: BaseWidgetProps

Defined in: [types/widget-props.ts:239](https://github.com/Hack23/cia-compliance-manager/blob/7ccd437a9a11f08277626ae4f6879b747fb31d1f/src/types/widget-props.ts#L239)

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

Defined in: [types/widget-props.ts:124](https://github.com/Hack23/cia-compliance-manager/blob/7ccd437a9a11f08277626ae4f6879b747fb31d1f/src/types/widget-props.ts#L124)

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

Defined in: [types/widget-props.ts:135](https://github.com/Hack23/cia-compliance-manager/blob/7ccd437a9a11f08277626ae4f6879b747fb31d1f/src/types/widget-props.ts#L135)

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

Defined in: [types/widget-props.ts:243](https://github.com/Hack23/cia-compliance-manager/blob/7ccd437a9a11f08277626ae4f6879b747fb31d1f/src/types/widget-props.ts#L243)

Optional children elements

***

### onError?

> `optional` **onError?**: (`error`) => `void`

Defined in: [types/widget-props.ts:249](https://github.com/Hack23/cia-compliance-manager/blob/7ccd437a9a11f08277626ae4f6879b747fb31d1f/src/types/widget-props.ts#L249)

Optional callback when widget encounters an error

#### Parameters

##### error

`Error`

Error that occurred

#### Returns

`void`
