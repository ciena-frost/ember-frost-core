# ember-frost-checkbox <br />
A check in a box, a checkbox

 * [API](#api)
 * [Examples](#examples)

## API

| Attribute   | Type | Value | Description |
| ----------- | ---- | ----- | ----------- |
| `size` | `string` | `small` | **default** - small size checkbox |
|  | | `medium` | medium size checkbox |
|  |  | `large` | large size checkbox |
| `label` | `string` | `<label-name>` | label for the checkbox |
| `autofocus` | `boolean` | `false` | **default** - basic checkbox  |
|  |  | `true` | sets focus on checkbox |
| `checked` | `boolean` | `false` | **default** - basic checkbox |
|  |  | `true` | checked checkbox |
| `disabled` | `boolean` | `false` | **default** - basic checkbox |
|  |  | `true` | disabled checkbox |
| `class` | `string` | `error` | sets checkbox to error state |
| `onInput` |`string` | `<action-name>` | The action callback to call when the value of the checkbox changes as the user clicks |

## Examples

### Basic

```
{{frost-checkbox}}
```

### Size

```
{{frost-checkbox
  size='large'
}}
```

### Label

```
{{frost-checkbox
  label='label'
}}
```

### Autofocus

```
{{frost-checkbox
  autofocus=true
}}
```

### Checked

```
{{frost-checkbox
  checked=true
}}
```

### Disabled - checked

```
{{frost-checkbox
  disabled=true
  checked=true
}}
```
### Disabled - not checked

```
{{frost-checkbox
  disabled=true
}}
```

### Error

```
{{frost-checkbox
  class='error'
}}
```

### Events - onInput

```
{{frost-checkbox
  onInput=(action 'onInputHandler')
}}
```

```javascript
actions: {
  onInputHandler(attrs) {
    console.log('checkbox value: ' + attrs.value)
    }
  }
```
