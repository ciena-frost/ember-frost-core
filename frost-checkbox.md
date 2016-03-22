# ember-frost-checkbox <br />

 * [API](#api)
 * [Examples](#examples)

## API

| Attribute   | Type | Value | Description |
| ----------- | ---- | ----- | ----------- |
| `onInput`   |`string` | `<action-name>` | The action callback to call when the value of the checkbox changes as the user clicks |

## Examples

```
{{#frost-checkbox
  id='myCheckbox'
  onInput=(action 'value')}}My checkbox
{{/frost-checkbox}}
```

```javascript
value (attrs) {
  console.log(attrs.id + ' - ' + attrs.value)
}
```
