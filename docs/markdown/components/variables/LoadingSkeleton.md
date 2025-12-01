[**CIA Compliance Manager Documentation v1.0.1**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [components](../README.md) / LoadingSkeleton

# Variable: LoadingSkeleton

> `const` **LoadingSkeleton**: `React.FC`\<`LoadingSkeletonProps`\>

Defined in: [components/common/LoadingSkeleton.tsx:51](https://github.com/Hack23/cia-compliance-manager/blob/c7987c008cc0b8531a9c787c68851dc49ec5f6e0/src/components/common/LoadingSkeleton.tsx#L51)

Loading skeleton component for better perceived performance

## Business Perspective

Improves perceived performance by showing content placeholders while
data loads, making the application feel more responsive and reducing
user anxiety during loading operations. 📊

## Technical Perspective

Provides animated placeholder content that mimics the structure of
the actual content being loaded. Uses CSS animations for smooth
skeleton shimmer effect.

## Example

```tsx
// Default 3-line skeleton
<LoadingSkeleton />

// Custom number of lines
<LoadingSkeleton lines={5} />

// With custom test ID
<LoadingSkeleton lines={4} testId="metrics-skeleton" />
```
