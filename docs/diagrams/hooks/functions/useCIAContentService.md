[**CIA Compliance Manager Diagrams v0.8.5**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [hooks](../README.md) / useCIAContentService

# Function: useCIAContentService()

> **useCIAContentService**(): `object`

Defined in: [hooks/useCIAContentService.ts:20](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/hooks/useCIAContentService.ts#L20)

Hook that provides access to the CIA content service

## Business Perspective

This hook centralizes access to CIA security content throughout the application,
ensuring consistent security descriptions, technical details, and business
impact information are presented to users across all widgets. 🔒

The service handles security level calculations, risk assessments, and technical
recommendations to provide a cohesive security narrative that aligns with
business objectives. 💼

## Returns

`object`

The CIA content service instance

### ciaContentService

> **ciaContentService**: [`CIAContentService`](../../services/classes/CIAContentService.md)
