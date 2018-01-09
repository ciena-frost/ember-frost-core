# frost-toggle

 * [API](#api)
 * [Examples](#examples)

## API
### toggle
| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `disabled` | `boolean` | `false` | **default** - toggle component |
| | | `true` | disable toggle component |
| `falseLabel` | `boolean` or `string` or `number` | `<value>` | the label for the false value of the toggle component |
| `falseValue` | `boolean` or `string` or `number` | `<value>` | the false value of the toggle component |
| `trueLabel` | `boolean` or `string` or `number` | `<value>` | the label for the true value of the toggle component |
| `trueValue` | `boolean` or `string` or `number` | `<value>` | true value of the toggle component |
| `hook` | `string` | `<unique-name>` | name used for testing with ember-hook |
| `onClick` | `closure-action` | `<closure-action>` | triggers associated action when the toggle is clicked |
| `options` | `object` | `{<attributes>}` | property object used to spread the attributes to the top level of the component with ember-spread. |
| `value` | `boolean` or `string` or `number` | `<value>` | value of the toggle component |

### Event Handlers
A comprehensive list of [HTML event handlers](frost-events.md) are available to choose from based on your needs.


## Testing with ember-hook
If a hook is set on radio-group, a concatenated hook will be created as follows:
* Toggle hook - `<hook-name>`
* Toggle input hook - `<hook-name>-toggle-input`
* Toggle label hook - `<hook-name>-toggle-label`
* Toggle text off hook - `<hook-name>-toggle-text-off`
* Toggle text on hook - `<hook-name>-toggle-text-on`

## Spread attributes
The toggle component use ember-spread to `spread` a property object against the top level of the component.

## Examples

```javascript
export default Controller.extend({
  actions: {
    toggleHandler (e) {
      this.set('value', e.target.value)
    }
  }
})
```

### Default
```handlebars
{{frost-toggle
  value=value
  onClick=(action 'toggleHandler')
}}
```

### mut syntax
```handlebars
{{frost-toggle
  value=value
  onClick=(mut value)
}}
```

### Action mut syntax
```handlebars
{{frost-toggle
  value=value
  onClick=(action (mut value) value="target.value")
}}
```

### Label
```handlebars
{{frost-toggle
  value=value
  trueLabel='En'
  falseLabel='Fr'
  onClick=(action (mut value) value="target.value")
}}
```

### Values
```handlebars
{{frost-toggle
  value=value
  trueValue='true Value'
  falseValue='false Value'
  onClick=(action 'toggleHandler')
}}
```

### Disabled
```handlebars
  {{frost-toggle
    value=value
    disabled=true
    onClick=(mut value)
  }}
```

### Spread
```handlebars
{{frost-toggle
  options=(hash
    value=value
  )
  onClick=(action 'toggleHandler')
}}
```
