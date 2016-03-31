# frost-textarea
a text area component

 * [API](#api)
 * [Examples](#examples)

## API
| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `autofocus` | `boolean` |`true`| puts autofocus on the object |
|  |  |`false`| ***default***|
| `disabled` | `boolean` |`true`| shows the object as disabled |
|  |  |`false`| ***default***|
| `readonly` | `boolean` |`true`| object is not editable |
|  |  |`false`| ***default***|
| `cols` | `integer` |`<num-of-cols>`| specifies the number of columns for the object |
| `rows` | `integer` |`<num-of-rows>`| specifies the number of rows for the object |
| `value` | `string` |`<textarea-text>`| default string that the object will display |
| `onInput` | `string` |`<action-name>`| triggers associated action when text is entered |

## Examples
### autofocus
```handlebars
{{frost-textarea autofocus=true}}
```

### error
```handlebars
{{frost-textarea class='error'}}
```

### disabled
```handlebars
{{frost-textarea disabled=true}}
```

### readonly and value
```handlebars
{{frost-textarea readonly=true value='Read only textarea'}}
```

### cols and rows
```handlebars
{{frost-textarea cols='80' rows='6'}}
```

### onInput
```handlebars
{{frost-textarea onInput=(action 'onInputHandler')}}
```
