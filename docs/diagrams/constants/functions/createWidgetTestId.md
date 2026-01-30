[**CIA Compliance Manager Diagrams v1.1.14**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [constants](../README.md) / createWidgetTestId

# Function: createWidgetTestId()

> **createWidgetTestId**(`widgetName`): [`WidgetTestIds`](../interfaces/WidgetTestIds.md)

Defined in: [constants/testIds.ts:97](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/constants/testIds.ts#L97)

Widget-scoped test ID generator factory
Creates a factory object with methods to generate consistent test IDs
for all elements within a widget.

## Parameters

### widgetName

`string`

Name of the widget (will be normalized to kebab-case)

## Returns

[`WidgetTestIds`](../interfaces/WidgetTestIds.md)

Object with methods to generate scoped test IDs

## Example

```ts
const COST_IDS = createWidgetTestId('cost-estimation');
COST_IDS.root              // 'widget-cost-estimation'
COST_IDS.section('capex')  // 'widget-cost-estimation-section-capex'
COST_IDS.button('submit')  // 'widget-cost-estimation-button-submit'
COST_IDS.value('total')    // 'widget-cost-estimation-value-total'
COST_IDS.label('amount')   // 'widget-cost-estimation-label-amount'
COST_IDS.header()          // 'widget-cost-estimation-header'
COST_IDS.header('main')    // 'widget-cost-estimation-header-main'
```
