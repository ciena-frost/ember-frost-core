# frost-text

 * [API](#api)
 * [Examples](#examples)

## API

| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `align` |`string` | `left` | **default** left align text input |
| | | `right` | right align text input |
| `autocapitalize` |`string` | `off` | **default** - normal text field |
| | `characters` | characters will be automatically capitalized (supported by Chrome and iOS Safari Mobile) |
| | `sentences` | sentences will be automatically capitalized (supported by Chrome and iOS Safari Mobile) |
| | `words` | words will be automatically capitalized (supported by Chrome and iOS Safari Mobile) |
| `autocorrect` |`string` | `off` | **default** - normal text field |
| | `on` | text will be automatically autocorrected (supported by Safari) |
| `autofocus` |`boolean` | `false` | **default** - normal text field |
| | | `true` | text field in focus |
| `class` | `string` | `error` | sets text field to error state |
| `disabled` | `boolean` | `false` | **default** - normal text field |
| | | `true` | disabled text field |
| `form` | `string` | `<form-owner>` | form element that this is associated with (its form owner) |
| `hook` | `string` | `<unique-name>` | name used for testing with ember-hook |
| `maxlength` | `number` | `<maxlength-value>` | maximum number of characters a user can enter |
| `placeholder` | `string` | `<text>` | placeholder text |
| `readonly` | `boolean` | `false` | **default** - normal text field |
| | | `true` | the user cannot modify the value |
| `required` |  `boolean` | `false` | **default** - normal text field |
| | | `true` | text field is required |
| `spellcheck` | `string` | `false` | **default** - normal text field |
| | | `true` | spelling and grammar are checked |
| | | `default` | defer to default behavior |
| `tabindex` | `number` | `<tabindex-value>` | the tabindex value |
| `title` | `string` | `<tooltip-text>` | tooltip text to display on hover |
| `value` | `string` | `<value-text>` | text to be displayed in text field |

### Event Handlers
A comprehensive list of [HTML event handlers](frost-events.md) are available to choose from based on your needs.

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

### Actions - onBlur
```handlebars
{{frost-text
  onBlur=(action 'handleBlur')
}}
```

### Actions - onFocus
```handlebars
{{frost-text
  onFocus=(action 'handleFocus')
}}
```

### Actions - onKeyDown
```handlebars
{{frost-text
  onKeyDown=(action 'handleKeyDown')
}}
```

### Actions - onKeyUp
```handlebars
{{frost-text
  onKeyUp=(action 'handleKeyUp')
}}
```
