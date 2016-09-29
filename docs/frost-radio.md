# frost-radio

 * [API](#api)
 * [Examples](#examples)

## API
### radio-group
| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `id` | `string` | `<group-name>` | acts as the group id |
| `value` | `string` | `<group-value>` | default checked radio button |
| `hook` | `string` | `<unique-name>` | name used for testing with ember-hook |

### radio-button
| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `disabled` | `boolean` | `false` | **default** - basic radio button |
| | | `true` | disable radio button |
| `class` | `string` | `error` | sets radio button to error state |
| `hook` | `string` | `<unique-name>` | name used for testing with ember-hook |
| `required` |  `boolean` | `false` | **default** - basic radio button |
| | | `true` | radio button is required |
| `size` | `string` | `small` | **default** - small size radio button |
|  | | `medium` | medium size radio button |
|  |  | `large` | large size radio button |
| `value` | `string` | `<value>` | value of the radio button |

### Event Handlers
A comprehensive list of [HTML event handlers](frost-events.md) are available to choose from based on your needs.

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
