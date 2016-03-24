# ember-frost-link <br />
* [API](#api)
* [Examples](#examples)

## API

| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `disabled` | `boolean` | `false` | **default**: Click to redirect from one route to another |
| | | `true` | :no_entry_sign: Can't click this! :notes: |
| `size` | `string` | `small` | The smallest link you ever did see |
| | | `medium` | **default**: Not quite as small as `small`, but not very big either |
| | | `large` | Now *that's* what I call a link! |
| `priority` | `string` | `primary` | Call-to-action :telephone: |
| | | `secondary` | **default**: Run of the mill, garden variety  |
| | | `tertiary` | Low-key, subdued  |


## Examples

### Primary small
```handlebars
{{#frost-link
  'routename'
  priority='primary'
  size='small'
}}
  <div class='text'>Primary</div>
{{/frost-link}}
```

### Font based on size
```handlebars
{{#frost-link
  'routename'
  priority='tertiary'
}}
  <div class='text'>Tertiary</div>
{{/frost-link}}
```
