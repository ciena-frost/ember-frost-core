# frost-link <br />
* [API](#api)
* [Examples](#examples)

## API

| Attribute | Type | Value | Description |
| --------- | ---- | ----- | -----------
| `design` | `string` | `inline` | custom link styling for in-line text, opens content in the same tab.  Should not be used with `priority` and `size`. |
|  | | `info-bar` | custom link styling for the info-bar context, opens content in the same tab.  Requires `icon` to be specified.  Should not be used with `priority` and `size`. |
| `disabled` | `boolean` | `false` | **default** - basic link |
|  |  | `true` | disabled link |
| `hook` | `string` | `<unique-name>` | name used for testing with ember-hook |
| `icon` | `string` | `<icon-name>` | the name of a frost-icon |
| `onClick` |`string` | `<action-name>` | triggers associated action when the link is clicked prior to transition |
| `priority` | `string` | `primary` | primary link - opens content in a new tab |
|  |  | `secondary` | secondary link - opens content in the same tab |
| `size` | `string` | `small` | small size link |
|  |  | `medium` | medium size link |
|  |  | `large` | large size link |
| `tabindex` | `string` | `<tabindex-value>` | the tabindex value |


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

### Design - in-line (font based on size)
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
