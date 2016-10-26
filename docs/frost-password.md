# frost-password

 * [API](#api)
 * [Examples](#examples)

## API
| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `value` | `string` | `<value-text>` | text to be displayed in password |
| `revealable` | `boolean` | `false` | **default** - basic password |
| | | `true` | reveals password text |
| `disabled` | `boolean` | `false` | **default** - basic password |
| | | `true` | disable password |
| `class` | `string` | `error` | sets password to error state |
| `hook` | `string` | `<hook-name>` | name used for testing with ember-hook |
| `onInput` | `string` | `<action-name>` | triggers associated action when the input value is changed |

## Testing with ember-hook
The password component is accessible using ember-hook with the top level hook name or you can access the internal components as well -
* Input field hook - `<hook-name>-input`
* Input field clear button hook - `<hook-name>-clear`
* Input field reveal button hook - `<hook-name>-reveal`


## Examples

### Reveal Password
```handlebars
{{frost-password
  revealable=true
}}
```

### Disabled
```handlebars
{{frost-password
  disabled=true
}}
```

### Error
```handlebars
{{frost-password
  class='error'
}}
```

### Events - onInput
```handlebars
{{frost-password
  onInput=(action 'onInputHandler')
}}
```

```javascript
actions: {
  onInputHandler () {
    console.log('password value: ' + attrs.value)
  }
}
```
