# ember-frost-select

 * [API](#api)
 * [Examples](#examples)

## API
| Attribute       | Type | Value | Description |
| --------------- | ---- | ----- | ----------- |
| `data`          | `array` | `[{"label: "foo", "value": "bar"}]` |  An array of "label"/"value" key/value pairs representing the rows in the select drop-down. |
| `disabled`      | `boolean` | `true`/`false` | disable/enable the component |
| `error`         | `boolean` | `true`/`false` | tell component to render an error styling |
| `onChange`     | `string` | `<action-name>` | The action callback to call when the value of the select component changes |
| `onInput`      | `string` | `<action-name>` | The action callback to call when the value of the filter changes as the user types |
| `selected`      | `number` or `array` | `1` or `[1, 2]` | The indices of the pre-selected values corresponding to values in the passed-in data. |
| `selectedValue` | `any`, `array` if using multi-select, `null` to clear | `'bar'` or `['bar', 'buzz']` | A value to choose in the drop down programmatically, or an array of values if using multi-select. Takes precedence over `selected` attribute. Passing `null` will clear the selected state. |

## Examples
Assuming the following data is available in the consuming context:
```javascript
data = [
  {
    "label": "foo",
    "value": "bar"
  },
  {
    "label": "fizz",
    "value": "buzz"
  }
]

singleSelected = 1
multipleSelected = [1, 2]
```

### Simple single select
```handlebars
{{frost-select
  data=data
  selected=singleSelected
  onChange=(action 'yourCallbackAction')
}}}
```

### Multi select
```handlebars
{{frost-multi-select
  data=data
  onChange=(action 'yourCallbackAction')
  selected=multipleSelected
}}}
```

### Simple single select w/ external filtering
```handlebars
{{frost-select
  data=data
  onChange=(action 'yourCallbackAction')
  onInput=(action 'yourInputFilterCallbackAction')
}}}
```

### Selecting by value
##### Single value
To select values from the drop down programmatically, you can use the `selectedValue` attribute
```javascript
var selectedValue = "bar"
```
And in your HTMLbars template

```handlebars
{{frost-select
  data=data
  selectedValue=selectedValue
}}
```
will select

##### Multiple Values
If you are using multi-select, an array will be treated as multiple values to choose. In the example,
the `selectedValue` attribute
```javascript
var selectedValue = ["bar", "buzz"]
```

will select both values `"bar"` and `"buzz"`.

NOTE: Changing `selectedValue` will overwrite any previous selections. However, changing `selectedValue` to be undefined, or a value that can be evaluated to be equal to the previous value (using lodash's `isEqual` function) will not cause values to be overwritten. Setting `selectedValue` to `null` will clear the selection.
