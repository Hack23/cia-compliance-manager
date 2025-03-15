[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / createChartJsMock

# Function: createChartJsMock()

> **createChartJsMock**(): `object`

Defined in: [src/tests/testUtils/mockFactory.ts:7](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/testUtils/mockFactory.ts#L7)

Creates a mock Chart.js constructor that can be properly spied on

## Returns

`object`

An object with the mock constructor and instance

### mockConstructor

> **mockConstructor**: `Mock`\<() => `object`\>

### mockInstance

> **mockInstance**: `object`

#### mockInstance.data

> **data**: `object`

#### mockInstance.data.datasets

> **datasets**: `never`[] = `[]`

#### mockInstance.destroy

> **destroy**: `Mock`\<`Procedure`\>

#### mockInstance.options

> **options**: `object` = `{}`

#### mockInstance.resize

> **resize**: `Mock`\<`Procedure`\>

#### mockInstance.update

> **update**: `Mock`\<`Procedure`\>

### mockModule

> **mockModule**: `object`

#### mockModule.\_\_esModule

> **\_\_esModule**: `boolean` = `true`

#### mockModule.default

> **default**: `Mock`\<() => `object`\> = `mockConstructor`
