[**CIA Compliance Manager Documentation v0.8.2**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / act

# Function: act()

Simply calls React.act(cb)
If that's not available (older version of react) then it
simply calls the deprecated version which is ReactTestUtils.act(cb)

## Call Signature

> **act**(`callback`): `void`

Defined in: node\_modules/@testing-library/react/types/index.d.ts:280

Wrap any code rendering and triggering updates to your components into `act()` calls.

Ensures that the behavior in your tests matches what happens in the browser
more closely by executing pending `useEffect`s before returning. This also
reduces the amount of re-renders done.

### Parameters

#### callback

() => `VoidOrUndefinedOnly`

A synchronous, void callback that will execute as a single, complete React commit.

### Returns

`void`

### See

https://reactjs.org/blog/2019/02/06/react-v16.8.0.html#testing-hooks

## Call Signature

> **act**\<`T`\>(`callback`): `Promise`\<`T`\>

Defined in: node\_modules/@testing-library/react/types/index.d.ts:280

Wrap any code rendering and triggering updates to your components into `act()` calls.

Ensures that the behavior in your tests matches what happens in the browser
more closely by executing pending `useEffect`s before returning. This also
reduces the amount of re-renders done.

### Type Parameters

• **T**

### Parameters

#### callback

() => `T` \| `Promise`\<`T`\>

A synchronous, void callback that will execute as a single, complete React commit.

### Returns

`Promise`\<`T`\>

### See

https://reactjs.org/blog/2019/02/06/react-v16.8.0.html#testing-hooks
