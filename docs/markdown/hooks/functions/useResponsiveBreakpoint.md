[**CIA Compliance Manager Documentation v1.1.13**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [hooks](../README.md) / useResponsiveBreakpoint

# Function: useResponsiveBreakpoint()

> **useResponsiveBreakpoint**(): [`Breakpoint`](../type-aliases/Breakpoint.md)

Defined in: [hooks/useResponsiveBreakpoint.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/hooks/useResponsiveBreakpoint.ts#L55)

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
