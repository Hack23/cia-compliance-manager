[**CIA Compliance Manager — UML Diagrams v1.1.118**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [constants/testIds](../README.md) / SECURITY\_LEVEL\_WIDGET\_IDS

# Variable: SECURITY\_LEVEL\_WIDGET\_IDS

> `const` **SECURITY\_LEVEL\_WIDGET\_IDS**: [`WidgetTestIds`](../interfaces/WidgetTestIds.md)

Defined in: [constants/testIds.ts:310](https://github.com/Hack23/cia-compliance-manager/blob/191e4152219d006312588704a3d133d539cb2315/src/constants/testIds.ts#L310)

Widget-scoped test ID generators using the createWidgetTestId helper.
These provide consistent, hierarchical test IDs for each widget.

Usage:
```tsx
import { SECURITY_LEVEL_WIDGET_IDS } from '../constants/testIds';

<div data-testid={SECURITY_LEVEL_WIDGET_IDS.root}>
  <section data-testid={SECURITY_LEVEL_WIDGET_IDS.section('confidentiality')}>
    <button data-testid={SECURITY_LEVEL_WIDGET_IDS.button('view-details')}>
  </section>
</div>
```
