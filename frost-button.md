# ember-frost-button <br />

 * [API](#api)
 * [Examples](#examples)

## API

| Attribute   | Type | Value | Description |
| ----------- | ---- | ----- | ----------- |
| `priority` | `string` | `primary` | primary action button |
|  |  | `secondary` | secondary action button |
|  |  | `tertiary` | tertiary action button |
|  |  | `confirm` | an alias for `primary` |
|  |  | `normal` | an alias for `secondary` |
|  |  | `cancel` | an alias for `tertiary` |
| `size` | `string` | `small` | small size button |
|  |  | `medium` | medium size button |
|  |  | `large` | large size button |
|  |  | `extra-large` | extra-large size button <br />  Recommended when `icon`, `text` and `subtext` are used together |
| `text` | `string` | `<button-text>` | text to display on the button |
| `sub-text` | `string` | `<button-subtext>` | subtext to display on the button underneath main `text` |
| `icon` | `string` | `<icon-name>` | the name of a frost-icon |
| `autofocus` | `boolean` | `false` | ***default*** - basic button |
| |  | `true` | sets focus on button |
| `disabled` | `boolean` | `false` | **default** - basic button |
|  |  | `true` | disabled button |
| `design` | `string` | `tab` | Custom styling for applications that use buttons but don't follow the button styling. Requires `text` or `icon` to be specified. Should not be used with `priority` and `size`. |
| `onClick` |`string` | `<action-name>` | triggers associated action when the button is clicked |


## Examples

### Primary

```
{{frost-button
  priority='primary'
  size='small'
  text='Action'
}}
```
### Secondary

```
{{frost-button
  priority='secondary'
  size='small'
  text='Action'
}}
```
### Tertiary

```
{{frost-button
  priority='tertiary'
  size='small'
  text='Action'
}}
```

### Size - small

```
{{frost-button
  priority='confirm'
  size='small'
  text='Action'
}}
```

### Size - medium

```
{{frost-button
  priority='confirm'
  size='medium'
  text='Action'
}}
```

### Size - large

```
{{frost-button
  priority='confirm'
  size='large'
  text='Action'
}}
```


### Icon - small

```
{{frost-button
  priority='confirm'
  size='small'
  icon='frost/add'
}}
```

### Icon - medium

```
{{frost-button
  priority='confirm'
  size='medium'
  icon='frost/add'
}}
```

### Icon - large

```
{{frost-button
  priority='confirm'
  size='large'
  icon='frost/add'
}}
```

### Disabled

```
{{frost-button
  priority='confirm'
  size='medium'
  text='Action'
  disabled=true
}}
```

### Autofocus

```
{{frost-button
  priority='confirm'
  size='medium'
  text='Action'
  autofocus=true
}}
```

### Icon and Info - horizontal

```
{{frost-button
  priority='confirm'
  size='extra-large'
  icon='frost/add'
  text='Text'
  subtext='Subtext'
}}
```

### Icon and Info - vertical

```
{{frost-button
  priority='confirm'
  size='extra-large'
  vertical=true
  icon='frost/add'
  text='Text'
  subtext='Subtext'
}}
```

### Icon and Text - horizontal

```
{{frost-button
  priority='confirm'
  size='extra-large'
  icon='frost/add'
  text='Text'
}}
```

### Icon and Text - vertical

```
{{frost-button
  priority='confirm'
  size='extra-large'
  vertical=true
  icon='frost/add'
  text='Text'
}}
```

### Design - tab

```
{{frost-button
  design='tab'
  text='Design Tab'
}}
```


### Events - onClick

```
{{frost-button
  priority='confirm'
  size='medium'
  text='Action'
  onClick=(action 'onClickHandler')
}}
```

```javascript
actions: {
  onClickHandler () {
    console.log('button clicked')
  }
}
```
