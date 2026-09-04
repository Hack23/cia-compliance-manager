[**CIA Compliance Manager — UML Diagrams v1.1.143**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/cia-services](../README.md) / CIAData

# Interface: CIAData

Defined in: [types/cia-services.ts:25](https://github.com/Hack23/cia-compliance-manager/blob/ed90fd0069f5cd488ae5acffca473ead6710addb/src/types/cia-services.ts#L25)

Core data structure representing CIA assessment data

## Properties

### securityLevels

> **securityLevels**: [`SecurityLevels`](../../cia/interfaces/SecurityLevels.md)

Defined in: [types/cia-services.ts:27](https://github.com/Hack23/cia-compliance-manager/blob/ed90fd0069f5cd488ae5acffca473ead6710addb/src/types/cia-services.ts#L27)

Security levels for availability, integrity, and confidentiality

***

### businessImpact?

> `optional` **businessImpact?**: [`BusinessImpact`](../../businessImpact/interfaces/BusinessImpact.md)

Defined in: [types/cia-services.ts:30](https://github.com/Hack23/cia-compliance-manager/blob/ed90fd0069f5cd488ae5acffca473ead6710addb/src/types/cia-services.ts#L30)

Business impact analysis results

***

### complianceFrameworks?

> `optional` **complianceFrameworks?**: [`ComplianceFramework`](../../compliance/interfaces/ComplianceFramework.md)[]

Defined in: [types/cia-services.ts:33](https://github.com/Hack23/cia-compliance-manager/blob/ed90fd0069f5cd488ae5acffca473ead6710addb/src/types/cia-services.ts#L33)

Relevant compliance frameworks

***

### lastUpdated?

> `optional` **lastUpdated?**: `Date`

Defined in: [types/cia-services.ts:36](https://github.com/Hack23/cia-compliance-manager/blob/ed90fd0069f5cd488ae5acffca473ead6710addb/src/types/cia-services.ts#L36)

Timestamp of last update

***

### metadata?

> `optional` **metadata?**: `Record`\<`string`, `unknown`\>

Defined in: [types/cia-services.ts:39](https://github.com/Hack23/cia-compliance-manager/blob/ed90fd0069f5cd488ae5acffca473ead6710addb/src/types/cia-services.ts#L39)

Any additional metadata
