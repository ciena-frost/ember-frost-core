# frost-loading

* [API](#API)
* [Examples](#Examples)

## API
| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `options` | `object` | `{<attributes>}` | property object used to spread the attributes to the top level of the component with ember-spread. |
| `type` | `string` || **default** - ripple effect loading indicator |
| | | `ring` | ring effect loading indicator |

## Spread attributes
The loading component use ember-spread to `spread` a property object against the top level of the component.

## Examples

### Default - Ripple
```handlebars
{{frost-loading}}
```

### Type - Ring
```handlebars
{{frost-loading 
  type='ring'
}}
```

### Spread
```handlebars
{{frost-loading 
  options=(hash
    type='ring'
  )
}}
```

