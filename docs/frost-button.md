# frost-button <br />

 * [API](#api)
 * [Examples](#examples)

## API

| Attribute   | Type | Value | Description |
| ----------- | ---- | ----- | ----------- |
| `autofocus` | `boolean` | `false` | **default** - basic button |
| |  | `true` | sets focus on button |
| `design` | `string` | `info-bar` | custom button styling for the info-bar context.  Requires `icon` to be specified.  Should not be used with `priority` and `size`. |
| `disabled` | `boolean` | `false` | **default** - basic button |
|  |  | `true` | disabled button |
| `hook` | `string` | `<unique-name>` | name used for testing with ember-hook |
| `icon` | `string` | `<icon-name>` | name of a frost-icon |
| `onClick` | `string` | `<action-name>` | triggers associated action when the button is clicked |
| `onFocus` | `string` | `<action-name>` | triggers associated action when the button received focusin event |
| `pack` | `string` | `frost` | **default** - name of the icon pack |
| `priority` | `string` | `primary` | primary action button |
|  |  | `secondary` | secondary action button |
|  |  | `tertiary` | tertiary action button |
| `size` | `string` | `small` | small size button |
|  |  | `medium` | medium size button |
|  |  | `large` | large size button |
| `text` | `string` | `<button-text>` | text to display on the button |
| `title` | `string` | `<tooltip-text>` | tooltip text to display on hover |
| `vertical` | `boolean` | `false` | **default** - set button text below the icon on an icon and text button |
|  |  | `true` | sets the button text below the icon |


## Examples

### Primary

```handlebars
{{frost-button
  priority='primary'
  size='small'
  text='Action'
}}
```
### Secondary

```handlebars
{{frost-button
  priority='secondary'
  size='small'
  text='Action'
}}
```
### Tertiary

```handlebars
{{frost-button
  priority='tertiary'
  size='small'
  text='Action'
}}
```

### Size - small

```handlebars
{{frost-button
  priority='primary'
  size='small'
  text='Action'
}}
```

### Size - medium

```handlebars
{{frost-button
  priority='primary'
  size='medium'
  text='Action'
}}
```

### Size - large

```handlebars
{{frost-button
  priority='primary'
  size='large'
  text='Action'
}}
```


### Icon - small

```handlebars
{{frost-button
  priority='primary'
  size='small'
  icon='frost/add'
}}
```

### Icon - medium

```handlebars
{{frost-button
  priority='primary'
  size='medium'
  icon='frost/add'
}}
```

### Icon - large

```handlebars
{{frost-button
  priority='primary'
  size='large'
  icon='frost/add'
}}
```

### Disabled

```handlebars
{{frost-button
  priority='primary'
  size='medium'
  text='Action'
  disabled=true
}}
```

### Autofocus

```handlebars
{{frost-button
  priority='primary'
  size='medium'
  text='Action'
  autofocus=true
}}
```

### Title

```handlebars
{{frost-button
  priority='primary'
  size='medium'
  icon='frost/add'
  title='This is a tooltip message'
}}
```

### Vertical

```handlebars
{{frost-button
  priority='tertiary'
  size='small'
  icon='frost/round-add'
  text='Text'
  vertical=true
}}
```

### Icon and Text

```handlebars
{{frost-button
  priority='tertiary'
  size='small'
  icon='frost/round-add'
  text='Text'
}}
```

### Design - info-bar

```handlebars
{{frost-button
  design='info-bar'
  icon='frost/infobar-find'
  text='Action'
}}
```

### Event - onClick

```handlebars
{{frost-button
  priority='primary'
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

### Event - onFocus

```handlebars
{{frost-button
  priority='primary'
  size='medium'
  text='Action'
  onFocus=(action 'onFocusHandler')
}}
```

```javascript
actions: {
  onFocusHandler () {
    console.log('button focused')
  }
}
```
