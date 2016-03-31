# frost-password

 * [API](#api)
 * [Examples](#examples)

## API
| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `revealable` | `boolean` | `false` | **default**: Nothing to see here |
| | | `true` | Make password input revealable |
| `disabled` | `boolean` | `false` | **default**: Type to your heart's content |
| | | `true` | :no_entry_sign: Can't update this! :notes: |
| `onInput` | `string` | `<action-name>` | triggers associated action when the input value is changed |
| `value` | `string` | `<value-text>` | what text to put in input |

## Examples

### Handle Changes to Value
```handlebars
{{frost-password
  onInput=(action 'onInputHandler')
}}
```

### Make Password Revealable
```handlebars
{{frost-password
  revealable=true
}}
```

### Disable Input
```handlebars
{{frost-password
  disabled=true
  value='Disabled'
}}
```

### Make Input Read Only Input
```handlebars
{{frost-password
  readOnly=true
  value='Read Only'
}}
```
