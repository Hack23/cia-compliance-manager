[**CIA Compliance Manager API Documentation v0.7.0**](../../../README.md)

***

[CIA Compliance Manager API Documentation](../../../modules.md) / [tests/testSetupHelpers](../README.md) / suppressCanvasErrors

# Function: suppressCanvasErrors()

> **suppressCanvasErrors**(): `MockInstance`\<(`this`, ...`args`) => `unknown`\>

Defined in: [src/tests/testSetupHelpers.tsx:114](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/tests/testSetupHelpers.tsx#L114)

Helper function to suppress known console errors in tests
Particularly useful for Chart.js canvas context errors

## Returns

`MockInstance`\<(`this`, ...`args`) => `unknown`\>

SpyInstance that can be used to restore the original console.error
