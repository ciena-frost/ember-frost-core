# frost-expand <br />
* [API](#api)
* [Examples](#examples)

## API

| Attribute | Type | Default Value | Description |
| --------- | ---- | ----- | -----------
| `animationDuration` | `number` | `300` | duration of the animation when expanding/collapsing |
| `collapseLabel` | `string` | `Collapse` | label to show when expanded |
| `expandLabel` | `string` | `Expand` | label to show when collapsed |
| `content` | `any` | `-` | content to show when expanded |
| `expanded` | `boolean` | `-` | expansion state of the component: `true` if expanded, `false` if collapsed |
| `isChevronOnlyClickTrigger` |`boolean` | `false` | set the chevron to be the only clickable area. if `false`, the entire label will be clickable |
| `labelComponent` | `component` | `-` | component to show as the label |
| `onChange` | `closure-action` | `-` | triggers associated action when the label or chevron is clicked to expand or collapse |

## Testing with ember-hook
The link component is accessible using ember-hook:
* Top level hook - `$hook('<hook-name>')`
* Label - `$hook('<hook-name>-label')`
  * Chevron - `$hook('<hook-name>-label-chevron')`
  * Text - `$hook('<hook-name>-label-text')`
  * Label Component - `$hook('<hook-name>-label-component')`
* Content - `$hook('<hook-name>-content')`

## Examples

### Text content
```handlebars
{{frost-expand
  hook='myExpand'
  content='Expanded content.'
  expanded=expanded1
  onChange=(action 'onChangeHandler1')
}}
```

### Block content
```handlebars
{{#frost-expand
  hook='myExpand'
  expanded=expanded3
  onChange=(action 'onChangeHandler3')
}}
  Expanded content.
{{/frost-expand}}
```

### Set labels
```handlebars
{{#frost-expand
  hook='myExpand'
  expandLabel='View information'
  collapseLabel='Hide information'
  expanded=expanded5
  onChange=(action 'onChangeHandler5')
}}
  Detailed information.
{{/frost-expand}}
```

### Label component
```handlebars
{{#frost-expand
  hook='myExpand'
  onChange=(action 'onChangeHandler9')
  expanded=expanded9
  labelComponent=(component 'frost-icon'
                    hook='myIcon'
                    icon='info'
                  )
}}
  Expanded content.
{{/frost-expand}}
```
