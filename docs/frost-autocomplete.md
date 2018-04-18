# frost-autocomplete

 * [API](#api)
 * [Examples](#examples)

## API
| Attribute       | Type | Value | Description |
| --------------- | ---- | ----- | ----------- |
| `data`          | `array` | `[{"label: "foo", "value": "bar"}]` |  An array of "label"/"value" key/value pairs representing the rows in the autocomplete drop-down. |
| `disabled`      | `boolean` | `false` | **default** - normal autocomplete component |
|      |  | `true` | disabled autocomplete component |
| `error`        | `boolean` |`false` | **default** - normal autocomplete component |
|    | | `true` | sets autocomplete component to error state |
| `hook` | `string` | `<unique-name>` | name used for testing with ember-hook |
| `onChange`     | `closure-action` | `<closure-action>` | The action callback to call when the value of the select component changes |
| `onClick`      | `closure-action` | `<closure-action>` | The action callback to call when the select component is clicked. Fires even if select is disabled. |
| `onInput`      | `closure-action` | `<closure-action>` | The action callback to call when the value of the filter changes as the user types |
| `onFocus`      | `closure-action` | `<closure-action>` | The action callback to call when the autocomplete input gains focus |
| `onBlur`      | `closure-action` | `<closure-action>` | The action callback to call when the autocomplete input loses focus |
| `onClear`      | `closure-action` | `<closure-action>` | The action callback to call when the clear button is pressed |
| `options` | `object` | `{<attributes>}` | property object used to spread the attributes to the top level of the component with ember-spread. |
| `placeholder` | `string` | | Placeholder text for when nothing is selected. |
| `selectedValue` | `string` | `'bar'` | A default selected value. This may or may not be relevant depending on the data. |
| `filter` | `string` | `'bar'` | A default filter to be populated. |
| `wrapLabels` | `boolean` | `false` | **default** - trim label text to fit without wrapping |
| | | `true` | Allow select option text to wrap |
| `isLoading` | `boolean` | `false` | **default** - This is up to the consuming component to dictate if data is being loaded or not |
| | | `true` | This will show the loading icon |

## Testing with ember-hook
The autocomplete component is accessible using ember-hook with the top level hook name or you can access the internal
components as well -
* Input field hook - `$hook('<hook-name>-autocompleteText-input')`
* List hook - `$hook('<hook-name>-list')`
* Individual list items can be found using hook qualifiers like index, label or value -
  - `$hook('<hook-name>-item', {index: <index>})'`
  - `$hook('<hook-name>-item', {label: <item label>})'`
  - `$hook('<hook-name>-item', {value: <item value>})'`

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

filter = 'foo'
selectedValue = 'bar'
```

### Autocomplete with pre-populated filter (foo) and selected value (bar)
```handlebars
{{frost-autocomplete
  hook='autocomplete'
  data=data
  filter=filter
  selectedValue=selectedValue
  onChange=(action 'yourChangeCallbackAction')
  onClear=(action 'yourClearCallbackAction')
}}
```

The input needs to be interacted with before the drop down will open.
Once the input has been interacted with, but no item was selected, clicking will open the menu.

The filter and the selectedValue are independent of each because the filter should be changing often.
The selectedValue is only used at initialization to configure a default value. Once the user selects
an item, the selectedValue provided will no longer serve a purpose.
