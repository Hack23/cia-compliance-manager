[**CIA Compliance Manager Documentation v1.0.2**](../../../../../README.md)

***

[CIA Compliance Manager Documentation](../../../../../modules.md) / [components/widgets/implementationguide/SecurityResourcesWidget](../README.md) / SecurityResourcesWidgetProps

# Interface: SecurityResourcesWidgetProps

Defined in: [components/widgets/implementationguide/SecurityResourcesWidget.tsx:36](https://github.com/Hack23/cia-compliance-manager/blob/175c46a72442c615bb0c104848c5b4deec0cfc31/src/components/widgets/implementationguide/SecurityResourcesWidget.tsx#L36)

Props for SecurityResourcesWidget component

Defines the configuration for displaying security resources and implementation
guides based on selected security levels across all CIA components.

## Example

```tsx
<SecurityResourcesWidget
  availabilityLevel="High"
  integrityLevel="Very High"
  confidentialityLevel="Moderate"
  limit={10}
  showTopResourcesOnly={true}
  className="mt-4"
  testId="security-resources"
/>
```

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [components/widgets/implementationguide/SecurityResourcesWidget.tsx:44](https://github.com/Hack23/cia-compliance-manager/blob/175c46a72442c615bb0c104848c5b4deec0cfc31/src/components/widgets/implementationguide/SecurityResourcesWidget.tsx#L44)

Selected availability level

Determines which availability-specific resources and guides to display.

#### Example

```ts
'High'
```

***

### className?

> `optional` **className**: `string`

Defined in: [components/widgets/implementationguide/SecurityResourcesWidget.tsx:72](https://github.com/Hack23/cia-compliance-manager/blob/175c46a72442c615bb0c104848c5b4deec0cfc31/src/components/widgets/implementationguide/SecurityResourcesWidget.tsx#L72)

Optional CSS class name for custom styling

Allows consumers to apply custom CSS classes via Tailwind or custom styles.

#### Default

```ts
""
```

#### Example

```ts
"mt-4 shadow-lg rounded-lg"
```

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [components/widgets/implementationguide/SecurityResourcesWidget.tsx:62](https://github.com/Hack23/cia-compliance-manager/blob/175c46a72442c615bb0c104848c5b4deec0cfc31/src/components/widgets/implementationguide/SecurityResourcesWidget.tsx#L62)

Selected confidentiality level

Determines which confidentiality-specific resources and guides to display.

#### Example

```ts
'Moderate'
```

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [components/widgets/implementationguide/SecurityResourcesWidget.tsx:53](https://github.com/Hack23/cia-compliance-manager/blob/175c46a72442c615bb0c104848c5b4deec0cfc31/src/components/widgets/implementationguide/SecurityResourcesWidget.tsx#L53)

Selected integrity level

Determines which integrity-specific resources and guides to display.

#### Example

```ts
'Very High'
```

***

### limit?

> `optional` **limit**: `number`

Defined in: [components/widgets/implementationguide/SecurityResourcesWidget.tsx:94](https://github.com/Hack23/cia-compliance-manager/blob/175c46a72442c615bb0c104848c5b4deec0cfc31/src/components/widgets/implementationguide/SecurityResourcesWidget.tsx#L94)

Optional limit for the number of resources to display

Controls how many resource cards are shown. Higher limits provide
more comprehensive guidance but require more screen space.

#### Default

```ts
8
```

#### Example

```ts
10
```

***

### showTopResourcesOnly?

> `optional` **showTopResourcesOnly**: `boolean`

Defined in: [components/widgets/implementationguide/SecurityResourcesWidget.tsx:105](https://github.com/Hack23/cia-compliance-manager/blob/175c46a72442c615bb0c104848c5b4deec0cfc31/src/components/widgets/implementationguide/SecurityResourcesWidget.tsx#L105)

Optional flag to show only top/priority resources

When true, filters to show only the most relevant and high-priority
resources for the selected security levels, providing focused guidance.

#### Default

```ts
false
```

#### Example

```ts
true
```

***

### testId?

> `optional` **testId**: `string`

Defined in: [components/widgets/implementationguide/SecurityResourcesWidget.tsx:83](https://github.com/Hack23/cia-compliance-manager/blob/175c46a72442c615bb0c104848c5b4deec0cfc31/src/components/widgets/implementationguide/SecurityResourcesWidget.tsx#L83)

Optional test ID for automated testing

Used by Cypress and Vitest for component identification in tests.
Defaults to SECURITY_RESOURCES_TEST_IDS.WIDGET constant.

#### Default

```ts
SECURITY_RESOURCES_TEST_IDS.WIDGET
```

#### Example

```ts
"custom-security-resources"
```
