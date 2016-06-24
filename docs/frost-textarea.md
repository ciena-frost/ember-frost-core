# frost-textarea
a text area component

 * [API](#api)
 * [Examples](#examples)

## API
| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `value` | `string` |`<value-text>`| text to be displayed in text area |
| `cols` | `integer` |`<num-of-cols>`| number of columns for text area |
| `rows` | `integer` |`<num-of-rows>`| number of rows for text area |
| `autofocus` | `boolean` |`false`| **default** - normal text area |
|  |  |`true`| text area in focus |
| `disabled` | `boolean` | `false` | **default** - normal text area |
| | | `true` | disabled text area |
| `class` | `string` | `error` | sets text area to error state |
| `onInput` | `string` |`<action-name>`| triggers associated action when text is entered |

## Examples

### Default
```handlebars
{{frost-textarea}}
```

### Error
```handlebars
{{frost-textarea
  class='error'
}}
```
### Disabled
```handlebars
{{frost-textarea
  disabled=true
}}
```

### Focus
```handlebars
{{frost-textarea
  autofocus=true
}}
```

### Size - cols and rows
```handlebars
{{frost-textarea
  cols='80' rows='6'}}
```

### Events - onInput
```handlebars
{{frost-textarea
  onInput=(action 'onInputHandler')}}
```

```javascript
actions: {
  onInputHandler () {
    console.log('text area value: ' + attrs.value)
  }
}
```
