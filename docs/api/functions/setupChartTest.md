[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / setupChartTest

# Function: setupChartTest()

> **setupChartTest**(): `object`

Defined in: [src/tests/testUtils/chartTestUtils.ts:17](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/testUtils/chartTestUtils.ts#L17)

Setup function for Chart.js tests to standardize mocking

## Returns

`object`

utilities for testing Chart.js components

### chartMock

> **chartMock**: `object`

#### chartMock.\_\_esModule

> **\_\_esModule**: `boolean` = `true`

#### chartMock.default

> **default**: `ChartMockConstructor` = `mockConstructor`

### cleanupMocks()

> **cleanupMocks**: () => `void`

#### Returns

`void`

### mockChartInstance

> **mockChartInstance**: `object`

#### mockChartInstance.data

> **data**: `object`

#### mockChartInstance.data.datasets

> **datasets**: `never`[] = `[]`

#### mockChartInstance.destroy

> **destroy**: `Mock`\<`Procedure`\>

#### mockChartInstance.resize

> **resize**: `Mock`\<`Procedure`\>

#### mockChartInstance.update

> **update**: `Mock`\<`Procedure`\>

### mockConstructor

> **mockConstructor**: `ChartMockConstructor`

### renderChart()

> **renderChart**: (`component`) => `RenderResult`\<`__module`, `HTMLElement`, `HTMLElement`\>

#### Parameters

##### component

`ReactElement`

#### Returns

`RenderResult`\<`__module`, `HTMLElement`, `HTMLElement`\>
