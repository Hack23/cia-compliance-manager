[**CIA Compliance Manager Documentation v1.1.18**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [components](../README.md) / LoadingSkeleton

# Variable: LoadingSkeleton

> `const` **LoadingSkeleton**: `React.FC`\<[`LoadingSkeletonProps`](../interfaces/LoadingSkeletonProps.md)\>

Defined in: [components/common/LoadingSkeleton.tsx:54](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/components/common/LoadingSkeleton.tsx#L54)

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
