# frost-external-link 
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
| `href` | `string` | `<url>` | url to an external location |
| `icon` | `string` | `<icon-name>` | the name of a frost-icon |
| `onClick` |`string` | `<action-name>` | triggers associated action when the link is clicked prior to transition |
| `options` | `object` | `{<attributes>}` | property object used to spread the attributes to the top level of the component with ember-spread. |
| `priority` | `string` | `primary` | primary link - opens content in a new tab |
|  |  | `secondary` | secondary link - opens content in the same tab |
| `size` | `string` | `small` | small size link |
|  |  | `medium` | medium size link |
|  |  | `large` | large size link |
| `tabindex` | `string` | `<tabindex-value>` | the tabindex value |
| `target` | `string` | `<target-value>` | the target value |
| `text` | `string` | `<text-value>` | the text value |

## Testing with ember-hook
The link component is accessible using ember-hook:
* Top level hook - `$hook('<hook-name>')`

## Spread attributes
The link component use ember-spread to `spread` a property object against the top level of the component.

## Examples

### Primary - small
```handlebars
{{frost-external-link
  href='https://github.com/ciena-frost'
  priority='primary'
  size='small'
  text='link title'
}}
```

### Primary - medium
```handlebars
{{frost-external-link
  href='https://github.com/ciena-frost'
  priority='primary'
  size='medium'
  text='link title'
}}
```

### Secondary - large
```handlebars
{{frost-external-link
  href='https://github.com/ciena-frost'
  priority='secondary'
  size='large'
  text='link title'
}}
```

### Disabled
```handlebars
{{frost-external-link
  disabled=true
  href='https://github.com/ciena-frost'
  priority='primary'
  size='small'
  text='link title'
}}
```

### Target
```handlebars
{{frost-external-link
  href='https://github.com/ciena-frost'
  priority='primary'
  size='small'
  target='_self'
  text='link title'
}}
```

### Design - inline (font based on size)
```handlebars
{{#frost-external-link
  design='inline'
  href='https://github.com/ciena-frost'
}}
  link
{{/frost-external-link}}
```

### Design - info-bar
```handlebars
{{#frost-external-link
  design='info-bar'
  href='https://github.com/ciena-frost'
  icon='icon'
}}
  Action
{{/frost-external-link}}
```

### Spread
```handlebars
{{frost-external-link
  options=(hash
    href='https://github.com/ciena-frost'
    priority='primary'
    size='small'
    text='link title'
  )
}}
```
