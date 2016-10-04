# frost-textarea
a text area component

 * [API](#api)
 * [Examples](#examples)

## API
| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `autofocus` | `boolean` |`false`| **default** - normal text area |
|  |  |`true`| text area in focus |
| `class` | `string` | `error` | sets text area to error state |
| `cols` | `number` |`<num-of-cols>`| number of columns for text area |
| `disabled` | `boolean` | `false` | **default** - normal text area |
| | | `true` | disabled text area |
| `form` | `string` | `<form-owner>` | form element that this is associated with (its form owner) |
| `hook` | `string` | `<unique-name>` | name used for testing with ember-hook |
| `onInput` | `string` |`<action-name>`| triggers associated action when text is entered |
| `placeholder` | `string` | `<text>` | placeholder text |
| `readonly` | `boolean` | `false` | **default** - basic textarea |
| | | `true` | the user cannot modify the value |
| `rows` | `number` |`<num-of-rows>`| number of rows for text area |
| `tabindex` | `number` | `<tabindex-value>` | the tabindex value |
| `value` | `string` |`<value-text>`| text to be displayed in text area |
| `wrap` | `string` | `soft` | **default** - normal text area |
| | | `hard` | text wrap setting |

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
