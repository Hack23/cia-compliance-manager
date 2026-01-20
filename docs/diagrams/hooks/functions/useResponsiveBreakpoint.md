[**CIA Compliance Manager Diagrams v1.1.11**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [hooks](../README.md) / useResponsiveBreakpoint

# Function: useResponsiveBreakpoint()

> **useResponsiveBreakpoint**(): [`Breakpoint`](../type-aliases/Breakpoint.md)

Defined in: [hooks/useResponsiveBreakpoint.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/hooks/useResponsiveBreakpoint.ts#L55)

Custom hook for detecting current responsive breakpoint

## Business Perspective

This hook enables widgets to adapt their layout and content based on
device size, ensuring optimal user experience for security officers
and executives accessing the application from different devices. 📱💻

Responsive design is critical for modern security dashboards that need
to be accessible on mobile devices during incident response.

## Returns

[`Breakpoint`](../type-aliases/Breakpoint.md)

Current breakpoint ('mobile', 'tablet', or 'desktop')

## Example

```typescript
const breakpoint = useResponsiveBreakpoint();

return (
  <div>
    {breakpoint === 'mobile' && <MobileLayout />}
    {breakpoint === 'tablet' && <TabletLayout />}
    {breakpoint === 'desktop' && <DesktopLayout />}
  </div>
);
```
