# frost-link <br />
* [API](#api)
* [Examples](#examples)

## API

| Attribute | Type | Value | Description |
| --------- | ---- | ----- | -----------
| `design` | `string` | `inline` | custom link styling for inline text, opens content in the same tab.  Should not be used with `priority` and `size`. |
|  | | `info-bar` | custom link styling for the info-bar context, opens content in the same tab.  Requires `icon` to be specified.  Should not be used with `priority` and `size`. |
| `disabled` | `boolean` | `false` | **default** - basic link |
|  |  | `true` | disabled link |
| `hook` | `string` | `<unique-name>` | name used for testing with ember-hook |
| `icon` | `string` | `<icon-name>` | the name of a frost-icon |
| `onClick` |`string` | `<action-name>` | triggers associated action when the link is clicked prior to transition |
| `options` | `object` | `{<attributes>}` | property object used to spread the attributes to the top level of the component with ember-spread. |
| `priority` | `string` | `primary` | primary link - opens content in a new tab |
|  |  | `secondary` | secondary link - opens content in the same tab |
| `routeNames` | `array` | `[...]` | list of the routes to open in new tabs on click <i>(only available for non disabled primary link)</i>. |
| `size` | `string` | `small` | small size link |
|  |  | `medium` | medium size link |
|  |  | `large` | large size link |
| `tabindex` | `string` | `<tabindex-value>` | the tabindex value |

## Testing with ember-hook
The link component is accessible using ember-hook:
* Top level hook - `$hook('<hook-name>')`

## Spread attributes
The link component use ember-spread to `spread` a property object against the top level of the component.

## Examples

### Primary - small
```handlebars
{{frost-link 'link title' 'route name'
  priority='primary'
  size='small'
}}
```

### Primary - medium
```handlebars
{{frost-link 'link title' 'route name'
  priority='primary'
  size='medium'
}}
```

### Primary - multiple routes
```handlebars
{{frost-link 'Text'
  routeNames=(array 'route name 1' 'route name 2')
  hook='mySmallLink'
  priority='primary'
  size='small'
}}
```

### Secondary - large
```handlebars
{{frost-link 'link title' 'route name'
  priority='secondary'
  size='large'
}}
```

### Disabled
```handlebars
{{frost-link 'link title' 'route name'
  priority='primary'
  size='small'
  disabled=true
}}
```

### Design - inline (font based on size)
```handlebars
{{#frost-link 'route name'
  design='inline'
}}
  link
{{/frost-link}}
```

### Design - info-bar
```handlebars
{{#frost-link 'route name'
  design='info-bar'
  icon='icon'
}}
  Action
{{/frost-link}}
```

### Spread
```handlebars
{{frost-link
  options=(hash
    priority='primary'
    route='route name'
    routeModels=(array ...)
    routeQueryParams=(hash ...)
    size='small'
    text='link title'
  )
}}
```
