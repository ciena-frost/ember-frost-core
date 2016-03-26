# ember-frost-link <br />
* [API](#api)
* [Examples](#examples)

## API

| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- 
| `priority` | `string` | `primary` | primary link - opens content in a new tab |
|  |  | `secondary` | secondary link - opens content in the same tab |
|  |  | `tertiary` | tertiary link - opens content in the same tab |
|  |  | `action` | action link - opens content in the same tab|
| `size` | `string` | `small` | small size link |
|  |  | `medium` | medium size link |
|  |  | `large` | large size link |
| `disabled` | `boolean` | `false` | **default** - basic link |
|  |  | `true` | disabled link |
| `icon` | `string` | `<icon-name>` | the name of a frost-icon |


## Examples

### Primary - disabled
```handlebars
{{#frost-link 'route name'
  priority='primary'
  size='small'
  disabled=true
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

### Tertiary - medium
```handlebars
{{#frost-link 'route name'
  priority='tertiary'
  size='medium'
}}
  Link one
{{/frost-link}}
```

### Action
```handlebars
{{#frost-link 'route name'
  priority='action'
  icon='frost/infobar-find'
}}
  Action
{{/frost-link}}
```