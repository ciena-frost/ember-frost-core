# frost-text

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
| `onBlur` | `string` | `<action-name>` | triggers associated action when component loses focus |
| `onInput` | `string` | `<action-name>` | triggers associated action when text is entered |
| `onFocus` | `string` | `<action-name>` | triggers associated action when component receives focus |
| `onKeyDown` | `string` | `<action-name>` | triggers associated action when component receive a `keydown` event |
| `onKeyUp` | `string` | `<action-name>` | triggers associated action when component receive a `keyup` event |


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

### Actions - onInput
```handlebars
{{frost-text
  id="foo-bar"
  onInput=(action 'handleInput')
}}
```

```javascript
actions: {
  /**
   * Handle the input event
   * @param {Object} e - the event
   * @param {String} e.value - the value of the input
   * @param {String} e.id - the id that was passed into the component
   */
  handleInput (e) {
    console.log(`id: ${e.id}, value: ${e.value}`)
  }
}
```

### Actions - onBlur
```handlebars
{{frost-text
  onBlur=(action 'handleBlur')
}}
```

```javascript
actions: {
  /**
   * Handle the blur event
   * @param {Event} e - the original focus-out event
   */
  handleBlur (e) {
    console.log('Input blurred: ', e)
  }
}
```

### Actions - onFocus
```handlebars
{{frost-text
  onFocus=(action 'handleFocus')
}}
```

```javascript
actions: {
  /**
   * Handle the focus event
   * @param {Event} e - the original focus-in event
   */
  handleFocus (e) {
    console.log('Input focused: ', e)
  }
}
```

### Actions - onKeyDown
```handlebars
{{frost-text
  onKeyDown=(action 'handleKeyDown')
}}
```

```javascript
actions: {
  /**
   * Handle the key-down event
   * @param {Event} e - the original key-down event
   */
  handleKeyDown (e) {
    console.log(`keyDown: keyCode: ${e.keyCode} key: ${e.key}`)
  }
}
```

### Actions - onKeyUp
```handlebars
{{frost-text
  onKeyUp=(action 'handleKeyUp')
}}
```

```javascript
actions: {
  /**
   * Handle the key-up event
   * @param {Event} e - the original key-up event
   */
  handleKeyUp (e) {
    console.log(`keyUp: keyCode: ${e.keyCode} key: ${e.key}`)
  }
}
```
