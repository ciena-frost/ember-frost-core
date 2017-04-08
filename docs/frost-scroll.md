# frost-scroll

 * [API](#api)
 * [Examples](#examples)

## API
| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `class` | `string` | `full` | sets width and height to 100% |
| `hook` | `string` | `<unique-name>` | name used for testing with ember-hook |
| `options` | `object` | `{<attributes>}` | property object used to spread the attributes to the top level of the component with ember-spread. |
| `onScrollUp` | `string` | `<action-name>` | triggers associated action when scrolled up |
| `onScrollDown` | `string` | `<action-name>` | triggers associated action when scrolled down |
| `onScrollYStart` | `string` | `<action-name>` | triggers associated action when the scroll reaches the top |
| `onScrollYEnd` | `string` | `<action-name>` | triggers associated action when the scroll reaches the bottom |

## Testing with ember-hook
The scroll component is accessible using ember-hook:
* Top level hook - `$hook('<hook-name>')`

## Spread attributes
The scroll component use ember-spread to `spread` a property object against the top level of the component.

## Examples

### Full
```handlebars
{{#frost-scroll class='full'}}
  {{frost-icon icon='add'}}
{{/frost-scroll}}
```

### Events - onScrollUp
```handlebars
{{#frost-scroll class='full'
  onScrollUp=(action 'onScrollUp')
}}
  {{frost-icon icon='add'}}
{{/frost-scroll}}
```

### Events - onScrollDown
```handlebars
{{#frost-scroll class='full'
  onScrollDown=(action 'onScrollDown')
}}
  {{frost-icon icon='add'}}
{{/frost-scroll}}
```

### Events - onScrollYStart
```handlebars
{{#frost-scroll class='full'
  onScrollYStart=(action 'onScrollYStart')
}}
  {{frost-icon icon='add'}}
{{/frost-scroll}}
```

### Events - onScrollYEnd
```handlebars
{{#frost-scroll class='full'
  onScrollYEnd=(action 'onScrollYEnd')
}}
  {{frost-icon icon='add'}}
{{/frost-scroll}}
```

### Spread
```handlebars
{{#frost-scroll 
  options=(hash
    hook='my-hook'
  )
}}
  {{frost-icon icon='add'}}
{{/frost-scroll}}
```
