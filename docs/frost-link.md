# frost-link <br />
* [API](#api)
* [Examples](#examples)

## API

| Attribute | Type | Value | Description |
| --------- | ---- | ----- | -----------
| `priority` | `string` | `primary` | primary link - opens content in a new tab |
|  |  | `secondary` | secondary link - opens content in the same tab |
| `design` | `string` | `inline` | custom link styling for in-line text, opens content in the same tab.  Should not be used with `priority` and `size`. |
|  | | `info-bar` | custom link styling for the info-bar context, opens content in the same tab.  Requires `icon` to be specified.  Should not be used with `priority` and `size`. |
| `size` | `string` | `small` | small size link |
|  |  | `medium` | medium size link |
|  |  | `large` | large size link |
| `disabled` | `boolean` | `false` | **default** - basic link |
|  |  | `true` | disabled link |
| `autofocus` | `boolean` | `false` | **default** - basic link |
|  |  | `true` | link in focus |
| `icon` | `string` | `<icon-name>` | the name of a frost-icon |
| `hook` | `string` | `<unique-name>` | name used for testing with ember-hook |
| `onClick` |`string` | `<action-name>` | triggers associated action when the link is clicked prior to transition |


## Examples

### Primary - small
```handlebars
{{#frost-link 'route name'
  priority='primary'
  size='small'
}}
  Primary
{{/frost-link}}
```

### Primary - medium
```handlebars
{{#frost-link 'route name'
  priority='primary'
  size='medium'
}}
  Primary
{{/frost-link}}
```

### Secondary - large
```handlebars
{{#frost-link 'route name'
  priority='secondary'
  size='large'
}}
  Secondary
{{/frost-link}}
```

### Disabled
```handlebars
{{#frost-link 'route name'
  priority='primary'
  size='small'
  disabled=true
}}
  Primary
{{/frost-link}}
```

### Design - in-line (font based on size)
```handlebars
{{#frost-link 'link.min'
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
