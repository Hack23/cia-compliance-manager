[**CIA Compliance Manager — UML Diagrams v1.1.169**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [coreConstants](../README.md) / SECURITY\_LEVELS

# Variable: SECURITY\_LEVELS

> `const` **SECURITY\_LEVELS**: `Record`\<`string`, [`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)\>

Defined in: [constants/coreConstants.ts:155](https://github.com/Hack23/cia-compliance-manager/blob/8541e80d27921e05ecad430966d158341a23bbe0/src/constants/coreConstants.ts#L155)

Security level enumeration constants.

Maps friendly constant names to SecurityLevel type values. Use these
constants when working with security levels to avoid string literals
and improve type safety.

## Example

```typescript
// Compare security level
if (currentLevel === SECURITY_LEVELS.HIGH) {
  console.log('High security configured');
}

// Set default level
const [level, setLevel] = useState(SECURITY_LEVELS.MODERATE);
```
