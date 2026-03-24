[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/services](../README.md) / ISecurityMetrics

# Interface: ISecurityMetrics

Defined in: [types/services.ts:52](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L52)

Base security metrics interface
Services may return richer types that extend this interface

## Indexable

> \[`key`: `string`\]: `unknown`

## Properties

### availability

> **availability**: [`IComponentMetrics`](IComponentMetrics.md)

Defined in: [types/services.ts:53](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L53)

***

### integrity

> **integrity**: [`IComponentMetrics`](IComponentMetrics.md)

Defined in: [types/services.ts:54](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L54)

***

### confidentiality

> **confidentiality**: [`IComponentMetrics`](IComponentMetrics.md)

Defined in: [types/services.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L55)

***

### impactMetrics

> **impactMetrics**: [`IImpactMetrics`](IImpactMetrics.md)

Defined in: [types/services.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L56)

***

### overallScore

> **overallScore**: `number`

Defined in: [types/services.ts:57](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L57)

***

### monitoring

> **monitoring**: `number`

Defined in: [types/services.ts:58](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L58)

***

### resilience

> **resilience**: `number`

Defined in: [types/services.ts:59](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L59)

***

### compliance

> **compliance**: `number`

Defined in: [types/services.ts:60](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L60)

***

### benchmarkScore

> **benchmarkScore**: `number`

Defined in: [types/services.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L61)

***

### securityMaturity

> **securityMaturity**: `string`

Defined in: [types/services.ts:62](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L62)
