[**CIA Compliance Manager Diagrams v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [hoc/withSecurityLevelState](../README.md) / default

# Function: default()

> **default**\<`P`\>(`Component`): `FC`\<`P` & [`WithSecurityLevelProps`](../interfaces/WithSecurityLevelProps.md)\>

Defined in: [src/hoc/withSecurityLevelState.tsx:29](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/hoc/withSecurityLevelState.tsx#L29)

Higher-Order Component (HOC) that adds security level state management to a component

## Business Perspective

This HOC provides consistent security level state management across widgets,
ensuring that all components respond to global security level changes while
maintaining their ability to have local overrides. It creates a standardized
approach to handling security levels throughout the application. 🔒

## Type Parameters

### P

`P` *extends* `object`

## Parameters

### Component

`ComponentType`\<`P`\>

## Returns

`FC`\<`P` & [`WithSecurityLevelProps`](../interfaces/WithSecurityLevelProps.md)\>
