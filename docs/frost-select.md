# frost-select

 * [API](#api)
 * [Examples](#examples)

## API
| Attribute       | Type | Value | Description |
| --------------- | ---- | ----- | ----------- |
| `data`          | `array` | `[{"label: "foo", "value": "bar"}]` |  An array of "label"/"value" key/value pairs representing the rows in the select drop-down. |
| `disabled`      | `boolean` | `false` | **default** - normal select component |
|      |  | `true` | disabled select component |
| `error`        | `boolean` |`false` | **default** - normal select component |
|    | | `true` | sets select component to error state |
| `hook` | `string` | `<unique-name>` | name used for testing with ember-hook |
| `onChange`     | `closure-action` | `<closure-action>` | The action callback to call when the value of the select component changes |
| `onClick`      | `closure-action` | `<closure-action>` | The action callback to call when the select component is clicked. Fires even if select is disabled. |
| `onInput`      | `closure-action` | `<closure-action>` | The action callback to call when the value of the filter changes as the user types |
| `options` | `object` | `{<attributes>}` | property object used to spread the attributes to the top level of the component with ember-spread. |
| `placeholder` | `string` | | Placeholder text for when nothing is selected. |
| `selected`      | `number` or `array` | `1` or `[1, 2]` | The indices of the pre-selected values corresponding to values in the passed-in data. Passing negative values (e.g. `-1` or `[-1]`) to a single select will clear the current select state.|
| `selectedValue` | `any`, `array` if using multi-select, `null` or `''` (empty string) to clear | `'bar'` or `['bar', 'buzz']` | A value to choose in the drop down programmatically, or an array of values if using multi-select. Takes precedence over `selected` attribute. Passing `null` or `''` (empty string) will clear the selected state. |
| `wrapLabels` | `boolean` | `false` | **default** - trim label text to fit without wrapping |
| | | `true` | Allow select option text to wrap |

## Testing with ember-hook
The select component is accessible using ember-hook with the top level hook name or you can access the internal 
components as well -
* Input field hook - `$hook('<hook-name>-input')`
* List hook - `$hook('<hook-name>-list')`
* Individual list items can be found using hook qualifiers like index, label or value -
  - `$hook('<hook-name>-item', {index: <index>})'`
  - `$hook('<hook-name>-item', {label: <item label>})'`
  - `$hook('<hook-name>-item', {value: <item value>})'`

The multi-select component has all of the hooks listed above from the select component and adds one additional -
* List checkbox item hook -
  - `$hook('<hook-name>-item-checkbox', {index: <index>})'`
  - `$hook('<hook-name>-item-checkbox', {label: <item label>})'`
  - `$hook('<hook-name>-item-checkbox', {value: <item value>})'`

## Spread attributes
The checkbox component use ember-spread to `spread` a property object against the top level of the component.

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
}}
```

### Multi select
```handlebars
{{frost-multi-select
  data=data
  onChange=(action 'yourCallbackAction')
  selected=multipleSelected
}}
```

### Simple single select w/ external filtering
```handlebars
{{frost-select
  data=data
  onChange=(action 'yourCallbackAction')
  onInput=(action 'yourInputFilterCallbackAction')
}}
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
will select `"bar"`.

### Spread
```handlebars
{{frost-select
  options=(hash
    data=data
    selectedValue=selectedValue
  )
}}
```

##### Multiple Values
If you are using multi-select, an array will be treated as multiple values to choose. In the example,
the `selectedValue` attribute
```javascript
var selectedValue = ["bar", "buzz"]
```

will select both values `"bar"` and `"buzz"`.

NOTE: Changing `selectedValue` will overwrite any previous selections. However, changing `selectedValue` to be 
undefined, or a value that can be evaluated to be equal to the previous value (using lodash's `isEqual` function) will 
not cause values to be overwritten. Setting `selectedValue` to `null` will clear the selection.
