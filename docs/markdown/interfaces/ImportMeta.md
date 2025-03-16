[**CIA Compliance Manager Documentation v0.8.4**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / ImportMeta

# Interface: ImportMeta

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:631

The type of `import.meta`.

If you need to declare that a given property exists on `import.meta`,
this type may be augmented via interface merging.

## Properties

### dirname

> **dirname**: `string`

Defined in: node\_modules/@types/node/module.d.ts:496

The directory name of the current module. This is the same as the `path.dirname()` of the `import.meta.filename`.
**Caveat:** only present on `file:` modules.

***

### env

> `readonly` **env**: [`ImportMetaEnv`](ImportMetaEnv.md)

Defined in: node\_modules/vite/types/importMeta.d.ts:19

***

### filename

> **filename**: `string`

Defined in: node\_modules/@types/node/module.d.ts:502

The full absolute path and filename of the current module, with symlinks resolved.
This is the same as the `url.fileURLToPath()` of the `import.meta.url`.
**Caveat:** only local modules support this property. Modules not using the `file:` protocol will not provide it.

***

### glob

> **glob**: `ImportGlobFunction`

Defined in: node\_modules/vite/types/importMeta.d.ts:21

***

### hot?

> `readonly` `optional` **hot**: `ViteHotContext`

Defined in: node\_modules/vite/types/importMeta.d.ts:17

***

### url

> **url**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:15213

The absolute `file:` URL of the module.

## Methods

### resolve()

#### Call Signature

> **resolve**(`specifier`): `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:15214

##### Parameters

###### specifier

`string`

##### Returns

`string`

#### Call Signature

> **resolve**(`specifier`, `parent`?): `string`

Defined in: node\_modules/@types/node/module.d.ts:520

Provides a module-relative resolution function scoped to each module, returning
the URL string.

Second `parent` parameter is only used when the `--experimental-import-meta-resolve`
command flag enabled.

##### Parameters

###### specifier

`string`

The module specifier to resolve relative to `parent`.

###### parent?

The absolute parent module URL to resolve from.

`string` | `URL`

##### Returns

`string`

The absolute (`file:`) URL string for the resolved module.

##### Since

v20.6.0
