[**CIA Compliance Manager — Markdown Documentation v1.1.118**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [constants/testIds](../README.md) / createWidgetTestId

# Function: createWidgetTestId()

> **createWidgetTestId**(`widgetName`): [`WidgetTestIds`](../interfaces/WidgetTestIds.md)

Defined in: [constants/testIds.ts:89](https://github.com/Hack23/cia-compliance-manager/blob/191e4152219d006312588704a3d133d539cb2315/src/constants/testIds.ts#L89)

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
