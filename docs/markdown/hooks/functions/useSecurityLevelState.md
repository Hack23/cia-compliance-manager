[**CIA Compliance Manager Documentation v1.1.1**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [hooks](../README.md) / useSecurityLevelState

# Function: useSecurityLevelState()

> **useSecurityLevelState**(`initialLevels?`): [`UseSecurityLevelStateReturn`](../interfaces/UseSecurityLevelStateReturn.md)

Defined in: [hooks/useSecurityLevelState.ts:78](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/hooks/useSecurityLevelState.ts#L78)

Custom hook for managing CIA triad security levels

## Business Perspective

Provides unified state management for security officers to configure
organizational security posture across all three CIA components. This
centralization ensures consistent security level handling and simplifies
state management across the application. 🔒

## Technical Perspective

Extracts common security level state management pattern found in 8+ widgets,
reducing code duplication by ~20% and ensuring consistent behavior. Uses
React hooks best practices with proper memoization for optimal performance.

## Parameters

### initialLevels?

`Partial`\<[`SecurityLevelState`](../interfaces/SecurityLevelState.md)\>

Initial security levels (defaults to 'Moderate' for all components)

## Returns

[`UseSecurityLevelStateReturn`](../interfaces/UseSecurityLevelStateReturn.md)

Security level state and update functions

## Example

```tsx
// Basic usage with defaults
const { levels, setLevel, getLevel } = useSecurityLevelState();

// Update a level
setLevel('availability', 'High');

// Get a level
const currentLevel = getLevel('integrity');

// Initialize with custom levels
const { levels } = useSecurityLevelState({
  availability: 'High',
  integrity: 'Moderate',
  confidentiality: 'Very High'
});

// Reset all levels
resetLevels('Low');
```
