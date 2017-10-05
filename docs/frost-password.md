# frost-password

 * [API](#api)
 * [Examples](#examples)

## API
| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `autofocus` | `boolean` | `false` | **default** - basic password |
| | | `true` | password field in focus |
| `class` | `string` | `error` | sets password to error state |
| `disabled` | `boolean` | `false` | **default** - basic password |
| | | `true` | disable password |
| `form` | `string` | `<form-owner>` | form element that this is associated with (its form owner) |
| `hook` | `string` | `<hook-name>` | name used for testing with ember-hook |
| `maxlength` | `string` | `<maxlength-value>` | maximum number of characters a user can enter |
| `options` | `object` | `{<attributes>}` | property object used to spread the attributes to the top level of the component with ember-spread. |
| `placeholder` | `string` | `<text>` | placeholder text |
| `readonly` | `boolean` | `false` | **default** - basic password |
| | | `true` | the user cannot modify the value |
| `required` |  `boolean` | `false` | **default** - basic password |
| | | `true` | password field is required |
| `revealable` | `boolean` | `false` | **default** - basic password |
| | | `true` | reveals password text |
| `tabindex` | `string` | `<tabindex-value>` | the tabindex value |
| `title` | `string` | `<tooltip-text>` | tooltip text to display on hover |
| `value` | `string` | `<value-text>` | text to be displayed in password |

### Event Handlers
A comprehensive list of [HTML event handlers](frost-events.md) are available to choose from based on your needs.

## Testing with ember-hook
The password component is accessible using ember-hook with the top level hook name or you can access the internal
components as well -
* Input field hook - `<hook-name>-input`
* Input field clear button hook - `<hook-name>-clear`
* Input field reveal button hook - `<hook-name>-reveal`

## Spread attributes
The password component use ember-spread to `spread` a property object against the top level of the component.

## Examples

### Reveal Password
```handlebars
{{frost-password
  revealable=true
}}
```

### Disabled
```handlebars
{{frost-password
  disabled=true
}}
```

### Error
```handlebars
{{frost-password
  class='error'
}}
```

### Events - onInput
```handlebars
{{frost-password
  onInput=(action 'onInputHandler')
}}
```

### Spread
```handlebars
{{frost-password
  options=(hash
    revealable=true
  )
}}
```
