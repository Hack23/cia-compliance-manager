[**CIA Compliance Manager — UML Diagrams v1.1.161**](../../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../../modules.md) / [components/common/LoadingSkeleton](../README.md) / LoadingSkeleton

# Variable: LoadingSkeleton

> `const` **LoadingSkeleton**: `React.FC`\<[`LoadingSkeletonProps`](../../../../types/componentPropExports/interfaces/LoadingSkeletonProps.md)\>

Defined in: [components/common/LoadingSkeleton.tsx:54](https://github.com/Hack23/cia-compliance-manager/blob/7d662390f20e5c0c4ed0fdc4480be9394bdbdd06/src/components/common/LoadingSkeleton.tsx#L54)

Loading skeleton component for better perceived performance

## Business Perspective

Improves perceived performance by showing content placeholders while
data loads, making the application feel more responsive and reducing
user anxiety during loading operations. 📊

## Technical Perspective

Provides animated placeholder content that mimics the structure of
the actual content being loaded. Uses CSS animations for smooth
skeleton shimmer effect. Supports multiple variants for different
widget layouts.

## Example

```tsx
// Default 3-line skeleton
<LoadingSkeleton />

// Custom number of lines
<LoadingSkeleton lines={5} />

// Summary widget skeleton
<LoadingSkeleton variant="summary" />

// Chart widget skeleton
<LoadingSkeleton variant="chart" />

// Metrics widget skeleton
<LoadingSkeleton variant="metrics" />
```
