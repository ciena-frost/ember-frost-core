# frost-radio

 * [API](#api)
 * [Examples](#examples)

## API
### radio-group
| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `hook` | `string` | `<unique-name>` | name used for testing with ember-hook |
| `id` | `string` | `<group-name>` | acts as the group id |
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
