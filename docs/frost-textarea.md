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
| `cols` | `number` |`<num-of-columns>`| number of columns for text area |
| `disabled` | `boolean` | `false` | **default** - normal text area |
| | | `true` | disabled text area |
| `form` | `string` | `<form-owner>` | form element that this is associated with (its form owner) |
| `hook` | `string` | `<unique-name>` | name used for testing with ember-hook |
| `onClear`| `closure-action` | `<closure-action>` | triggers associated action when `X` is clicked |
| `options` | `object` | `{<attributes>}` | property object used to spread the attributes to the top level of the component with ember-spread. |
| `placeholder` | `string` | `<text>` | placeholder text |
| `readonly` | `boolean` | `false` | **default** - basic text area |
| | | `true` | the user cannot modify the value |
| `rows` | `number` |`<num-of-rows>`| number of rows for text area |
| `tabindex` | `number` | `<tabindex-value>` | the tabindex value |
| `value` | `string` |`<value-text>`| text to be displayed in text area |
| `wrap` | `string` | `soft` | **default** - normal text area |
| | | `hard` | text wrap setting |

### Event Handlers
A comprehensive list of [HTML event handlers](frost-events.md) are available to choose from based on your needs.

## Testing with ember-hook
The text area component is accessible using ember-hook:
* Top level hook - `$hook('<hook-name>')`
* Input - `$hook('<hook-name>-input')`
* Input field clear button - `$hook('<hook-name>-clear')`

## Spread attributes
The text area component use ember-spread to `spread` a property object against the top level of the component.

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
  cols=80 rows=6
}}
```

### Actions - onClear
```handlebars
{{frost-textarea
  onClear=(action 'handleClear')
}}
```

### Actions - onInput
```handlebars
{{frost-textarea
  onInput=(action 'onInputHandler')
}}
```

### Actions - onFocusOut
```handlebars
{{frost-textarea
  onFocusOut=(action 'onBlurHandler')
}}
```

### Actions - onFocusIn
```handlebars
{{frost-textarea
  onFocusIn=(action 'onFocusHandler')
}}
```

### Spread
```handlebars
{{frost-textarea
  options=(hash
    disabled=true
  )
}}
```
