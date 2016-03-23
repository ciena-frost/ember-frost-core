# ember-frost-text
## API

| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `autofocus` |`boolean` | `false` | **default**: Nothing to see here, just your average text input |
| | | `true` | Look at me! |
| `align` |`string` | `right` | Right align text input |
| | | `center` | Center align text input |
| `disabled` | `boolean` | `false` | **default**: Type to your heart's content |
| | | `true` | :no_entry_sign: Can't update this! :notes: |
| `onInput` | `string` | `<action-name>` | triggers associated action when the input value is changed |
| `value` | `string` | `<value-text>` | what text to put in input |

## Examples

### Focus on Input
```handlebars
{{frost-text
  autofocus=true
}}
```
### Align text
```handlebars
{{frost-text
  align='right'
}}
```

### Handle Changes to Value
```handlebars
{{frost-text
  onInput=(action 'closure')
}}
```

### Bind Value
```handlebars
{{frost-text
  value=boundText
}}
```

### Disable Input
```handlebars
{{frost-text
  disabled=true
  value="Disabled"
}}
```

### Make Input Read Only
```handlebars
{{frost-text
  readOnly=true
  value="Read Only"
}}
```
