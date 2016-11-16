# frost-radio

 * [API](#api)
 * [Examples](#examples)

## API
### radio-group
| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `hook` | `string` | `<unique-name>` | name used for testing with ember-hook |
| `id` | `string` | `<group-name>` | acts as the group id |
| `inputs` | `array` | `[{ disabled: 'boolean', label: 'string', required: 'boolean', size: 'string', value: 'string' }, ...]` | used to set the label, value and disabled state when using radio group/radio button in a non-block (inline) usage
| `selectedValue` | `string` | `<group-value>` | default checked radio button |
| `onChange` | `string` |`<action-name>`| triggers associated action on change or keypress of space/enter |

### radio-button
| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `checked` | `boolean` | `<true>/<false>` | sets radio button checked |
| `class` | `string` | `error` | sets radio button to error state |
| `disabled` | `boolean` | `false` | **default** - basic radio button |
| | | `true` | disable radio button |
| `hook` | `string` | `<unique-name>` | name used for testing with ember-hook |
| `label` | `string` | `<label>` | the radio button label when using radio button in non-block (inline) usage |
| `required` |  `boolean` | `false` | **default** - basic radio button |
| | | `true` | radio button is required |
| `size` | `string` | `small` | **default** - small size radio button |
| | | `medium` | medium size radio button |
| | | `large` | large size radio button |
| `value` | `string` | `<value>` | value of the radio button |
| `onChange` | `string` |`<action-name>`| triggers associated action |

## Testing with ember-hook
If a hook is set on radio-group, a concatenated hook will be created as follows:
* Radio group hook - `<hook-name>`
* Radio button hook - `<hook-name>-button-<value-of-radio-button>`
* Input field hook - `<hook-name>--button-<value-of-radio-button>-input`

## Examples
```javascript
export default Controller.extend({
  sampleList: [
    {label: 'a', value: 'a'},
    {label: 'b', value: 'b'},
    {label: 'c', value: 'c'},
    {label: 'd', value: 'd'},
    {label: 'e', value: 'e'}
  ],

  model: Ember.Object.create({
    radioGroup: 'c'
  })

  actions: {
    change (event) {
      ...
    }
  }
})
```

### Default
```handlebars
{{#frost-radio-group
  hook='myRBGroup'
  id='radioGroup1'
  selectedValue=model.radioGroup
  onChange=(action 'change')
  as |control|
}}
  {{#each sampleList as |input|}}
    {{#control.button
      value=input.value
      disabled=input.disabled
    }}
      Label for {{input.label}}
    {{/control.button}}
  {{/each}}
  {{control.button
    value='f'
    label='my-label'
  }}
{{/frost-radio-group}}
```

### Inline
```handlebars
{{frost-radio-group
  id='inline'
  inputs=(array
    (hash value='a')
    (hash label='B' value='b')
    (hash value='c' disabled=true)
  )
  onChange=(action (mut inlineValue) value='target.value')
  selectedValue=inlineValue
}}
```

### Disabled
```handlebars
{{#frost-radio-group
  id='radioGroup5'
  selectedValue=model.radioGroup
  onChange=(action 'change')
  as |controls|
}}
  {{#each sampleList as |input|}}
    {{#controls.button
        size='medium'
        value=input.value
        disabled=(eq input.value 'a')}}
      Label for {{input.label}}
    {{/controls.button}}
  {{/each}}
{{/frost-radio-group}}
{{#frost-radio-group
  id='radioGroup'
  value=model.radioGroup
}}
```

### Error
```handlebars
{{#frost-radio-group
  id='radioGroup6'
  selectedValue=model.radioGroup
  onChange=(action 'change')
  as |controls|
}}
  {{#each sampleList as |input|}}
    {{#controls.button
        size='medium'
        value=input.value
        class='error'}}
      Label for {{input.label}}
    {{/controls.button}}
  {{/each}}
{{/frost-radio-group}}
```

### Required
```handlebars
{{#frost-radio-group
  id='radioGroup7'
  selectedValue=model.radioGroup
  onChange=(action 'change')
  as |controls|
}}
  {{#each sampleList as |input|}}
    {{#controls.button
        size='medium'
        value=input.value
        required=true}}
      Label for {{input.label}}
    {{/controls.button}}
  {{/each}}
{{/frost-radio-group}}
```

### Events - onChange
```handlebars
{{#frost-radio-group
  hook='myRBGroup'
  id='radioGroup1'
  selectedValue=model.radioGroup
  onChange=(action 'change')
  as |control|
}}
  {{#each sampleList as |input|}}
    {{#control.button
      value=input.value
      disabled=input.disabled
    }}
      Label for {{input.label}}
    {{/control.button}}
  {{/each}}
{{/frost-radio-group}}
```
