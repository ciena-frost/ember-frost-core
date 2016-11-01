# frost-radio

 * [API](#api)
 * [Examples](#examples)

## API
### radio-group
| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `hook` | `string` | `<unique-name>` | name used for testing with ember-hook |
| `id` | `string` | `<group-name>` | acts as the group id |
| `inputs` | `array` | `[ disabled: `string`, label: `string`, value: `string` ] | used to set the label, value and disabled state when using radio-group/radio-button in a non-block (inline) usage
| `onChange` | `string` |`<action-name>`| triggers associated action on change or keypress of space/enter |
| `value` | `string` | `<group-value>` | default checked radio button |

### radio-button
| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `class` | `string` | `error` | sets radio button to error state |
| `disabled` | `boolean` | `false` | **default** - basic radio button |
| | | `true` | disable radio button |
| `hook` | `string` | `<unique-name>` | name used for testing with ember-hook |
| `required` |  `boolean` | `false` | **default** - basic radio button |
| | | `true` | radio button is required |
| `size` | `string` | `small` | **default** - small size radio button |
| | | `medium` | medium size radio button |
| | | `large` | large size radio button |
| `value` | `string` | `<value>` | value of the radio button |

## Testing with ember-hook
If a hook is set on radio-group, a concatenated hook will be created as follows:
* Radio group hook - `<hook-name>`
* Radio button hook - `<hook-name>-button-<value-of-radio-button>`
* Input field hook - `<hook-name>--button-<value-of-radio-button>-input`


## Examples

```javascript
export default Controller.extend({
  sampleList: ['a', 'b', 'c', 'd', 'e'],

  model: Ember.Object.create({
    radioGroup: 'c'
  })
})
```

### Default
```handlebars
{{#frost-radio-group
  id='radioGroup'
  value=model.radioGroup
}}
  {{#each sampleList as |i|}}
    {{#frost-radio-button value=i}}
      Label for {{i}}
    {{/frost-radio-button}}
  {{/each}}
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
  value=inlineValue
}}
```

### Disabled
```handlebars
{{#frost-radio-group
  id='radioGroup'
  value=model.radioGroup
}}
  {{#each sampleList as |i|}}
    {{#frost-radio-button value=i disabled=(eq i 'a')}}
      Label for {{i}}
    {{/frost-radio-button}}
  {{/each}}
{{/frost-radio-group}}
```

### Error
```handlebars
{{#frost-radio-group
  id='radioGroup'
  value=model.radioGroup
}}
  {{#each sampleList as |i|}}
    {{#frost-radio-button class='error' value=i}}
      Label for {{i}}
    {{/frost-radio-button}}
  {{/each}}
{{/frost-radio-group}}
```

### Required
```handlebars
{{#frost-radio-group
  id='radioGroup'
  value=model.radioGroup
}}
  {{#each sampleList as |i|}}
    {{#frost-radio-button value=i required=(eq i 'a')}}
      Label for {{i}}
    {{/frost-radio-button}}
  {{/each}}
{{/frost-radio-group}}
```

### Events - onChange
```handlebars
{{#frost-radio-group
  id='radioGroup'
  value=model.radioGroup
  onChange=(action 'change')
}}
  {{#each sampleList as |i|}}
    {{#frost-radio-button value=i}}
      Label for {{i}}
    {{/frost-radio-button}}
  {{/each}}
{{/frost-radio-group}}
```
