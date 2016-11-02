# frost-checkbox <br />
A check in a box, a checkbox

 * [API](#api)
 * [Examples](#examples)

## API

| Attribute   | Type | Value | Description |
| ----------- | ---- | ----- | ----------- |
| `autofocus` | `boolean` | `false` | **default** - basic checkbox  |
|  |  | `true` | sets focus on checkbox |
| `checked` | `boolean` | `false` | **default** - basic checkbox |
|  |  | `true` | checked checkbox |
| `class` | `string` | `error` | sets checkbox to error state |
| `disabled` | `boolean` | `false` | **default** - basic checkbox |
|  |  | `true` | disabled checkbox |
| `hook` | `string` | `<unique-name>` | name used for testing with ember-hook |
| `label` | `string` | `<label-name>` | label for the checkbox |
| `onBlur` | `string` | `<action-name>` | triggers associated action when the checkbox loses focus |
| `onFocus` | `string` | `<action-name>` | triggers associated action when the checkbox receives focusin event |
| `onInput` |`string` | `<action-name>` | The action callback to call when the value of the checkbox changes as the user clicks |
| `size` | `string` | `small` | **default** - small size checkbox |
|  | | `medium` | medium size checkbox |
|  |  | `large` | large size checkbox |


## Examples

### Default

```handlebars
{{frost-checkbox}}
```

### Autofocus

```handlebars
{{frost-checkbox
  autofocus=true
}}
```

### Checked

```handlebars
{{frost-checkbox
  checked=true
}}
```

### Disabled - checked

```handlebars
{{frost-checkbox
  disabled=true
  checked=true
}}
```
### Disabled - not checked

```handlebars
{{frost-checkbox
  disabled=true
}}
```

### Error

```handlebars
{{frost-checkbox
  class='error'
}}
```

### Label

```handlebars
{{frost-checkbox
  label='label'
}}
```

### Size

```handlebars
{{frost-checkbox
  size='large'
}}
```

### Events - onBlur

```handlebars
{{frost-checkbox
  onBlur=(action 'onBlurHandler')
}}
```

### Events - onFocus

```handlebars
{{frost-checkbox
  onFocus=(action 'onFocusHandler')
}}
```

### Events - onInput

```handlebars
{{frost-checkbox
  onInput=(action 'onInputHandler')
}}
```


