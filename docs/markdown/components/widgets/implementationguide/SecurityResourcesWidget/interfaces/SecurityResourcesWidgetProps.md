[**CIA Compliance Manager Documentation v0.9.1**](../../../../../README.md)

***

[CIA Compliance Manager Documentation](../../../../../modules.md) / [components/widgets/implementationguide/SecurityResourcesWidget](../README.md) / SecurityResourcesWidgetProps

# Interface: SecurityResourcesWidgetProps

Defined in: [components/widgets/implementationguide/SecurityResourcesWidget.tsx:35](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/components/widgets/implementationguide/SecurityResourcesWidget.tsx#L35)

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

Defined in: [components/widgets/implementationguide/SecurityResourcesWidget.tsx:43](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/components/widgets/implementationguide/SecurityResourcesWidget.tsx#L43)

Selected availability level

Determines which availability-specific resources and guides to display.

#### Example

```ts
'High'
```

***

### className?

> `optional` **className**: `string`

Defined in: [components/widgets/implementationguide/SecurityResourcesWidget.tsx:71](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/components/widgets/implementationguide/SecurityResourcesWidget.tsx#L71)

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

Defined in: [components/widgets/implementationguide/SecurityResourcesWidget.tsx:61](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/components/widgets/implementationguide/SecurityResourcesWidget.tsx#L61)

Selected confidentiality level

Determines which confidentiality-specific resources and guides to display.

#### Example

```ts
'Moderate'
```

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [components/widgets/implementationguide/SecurityResourcesWidget.tsx:52](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/components/widgets/implementationguide/SecurityResourcesWidget.tsx#L52)

Selected integrity level

Determines which integrity-specific resources and guides to display.

#### Example

```ts
'Very High'
```

***

### limit?

> `optional` **limit**: `number`

Defined in: [components/widgets/implementationguide/SecurityResourcesWidget.tsx:93](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/components/widgets/implementationguide/SecurityResourcesWidget.tsx#L93)

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

Defined in: [components/widgets/implementationguide/SecurityResourcesWidget.tsx:104](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/components/widgets/implementationguide/SecurityResourcesWidget.tsx#L104)

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

Defined in: [components/widgets/implementationguide/SecurityResourcesWidget.tsx:82](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/components/widgets/implementationguide/SecurityResourcesWidget.tsx#L82)

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
