[**CIA Compliance Manager API Documentation v0.6.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / suppressCanvasErrors

# Function: suppressCanvasErrors()

> **suppressCanvasErrors**(): `MockInstance`\<(`this`, ...`args`) => `unknown`\>

Defined in: [src/tests/testSetupHelpers.ts:8](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/testSetupHelpers.ts#L8)

Helper function to suppress known console errors in tests
Particularly useful for Chart.js canvas context errors

## Returns

`MockInstance`\<(`this`, ...`args`) => `unknown`\>

SpyInstance that can be used to restore the original console.error
