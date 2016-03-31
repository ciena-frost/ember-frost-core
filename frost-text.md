# ember-frost-text

 * [API](#api)
 * [Examples](#examples)
 
## API

| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `value` | `string` | `<value-text>` | text to be displayed in text field |
| `align` |`string` | `right` | right align text input |
| `placeholder` | `string` | `<text>` | placeholder text |
| `autofocus` |`boolean` | `false` | **default** - normal text field |
| | | `true` | text field in focus |
| | | `center` | center align text input |
| `disabled` | `boolean` | `false` | **default** - normal text field |
| | | `true` | disabled text field |
| `class` | `string` | `error` | sets text field to error state |
| `onInput` | `string` | `<action-name>` | triggers associated action when text is entered |


## Examples

### Default
```handlebars
{{frost-text}}
```

### Error
```handlebars
{{frost-text
  class='error'
}}
```
### Disabled
```handlebars
{{frost-text
  disabled=true
}}
```

### Focus
```handlebars
{{frost-text
  autofocus=true
}}
```

### Text alignment
```handlebars
{{frost-text
  align='right'
}}
```

### Text placeholder
```handlebars
{{frost-text
  placeholder='basic field'
}}
```

### Events - onInput
```handlebars
{{frost-text
  onInput=(action 'onInputHandler')
}}
```

```javascript
actions: {
  onInputHandler () {
    console.log('field value: ' + attrs.value)
  }
}
```

