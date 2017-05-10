# frost-bookends <br />

 * [API](#api)
 * [Examples](#examples)

## API

| Attribute   | Type | Value | Description |
| ----------- | ---- | ----- | ----------- |
| `content` | `component` | | component to render as the content (when not using block syntax) |
| `header` | `component` | | **required** - component to render as the header (probably a `frost-info-bar`) |
| `hook` | `string` | | name used for testing with `ember-hook` |
| `hookQualifiers` | `object` | | key/value pairs used for testing with `ember-hook` |
| `footer` | `component` | | **required** - component to render as the footer (probably some kind of action-bar) |

## Testing with `ember-hook`
The bookends component provides the following hooks for testing with `ember-hook`. In these examples, we assume a
top-level `hook` of `ends` has been given to the `frost-bookends` component.
| Hook | Description | Example (assuming a top-level `hook` of `ends`) |
| ---- | ----------- | ----------------------------------------------- |
| | The hook for the `frost-bookends` component itself. | `$hook('ends')` |
| `content` | The hook assigned to the `content` component | `$hook('ends-content')` |
| `contentWrapper` | The hook for the `div` that wraps the `content` component | `$hook('ends-contentWrapper')` |
| `header` | The hook assigned to the `header` component | `$hook('ends-header')` |
| `headerWrapper` | The hook for the `div` that wraps the `header` component | `$hook('ends-headerWrapper')` |
| `footer` | The hook assigned to the `footer` component | `$hook('ends-footer')` |
| `footerWrapper` | The hook for the `div` that wraps the `footer` component | `$hook('ends-footerWrapper')` |
| `scroll` | The hook assigned to the `frost-scroll` component that wraps the content | `$hook('ends-scroll')` |

## Spread attributes
`ember-spread` is used to **spread** a property object against the top level of a `frost-bookends` component.  

## Examples

### Content Property

```handlebars
{{frost-bookends
  content=(component 'my-content'
    tall=true
  )
  header=(component 'my-header'
    title='Howdy'
  )
  hook='ends'
  hookQualifiers=(hash)
  footer=(component 'my-footer')
}}
```

### Content Block

```handlebars
{{#frost-bookends
  header=(component 'my-header'
    title='Howdy'
  )
  hook='ends'
  hookQualifiers=(hash)
  footer=(component 'my-footer')
}}
  {{my-content
    tall=true
  }}
{{/frost-bookends}}
```

### Spread

```handlebars
{{frost-bookends
  options=(hash
    content=(component 'my-content'
      tall=true
    )
    header=(component 'my-header'
      title='Howdy'
    )
    hook='ends'
    hookQualifiers=(hash)
    footer=(component 'my-footer')
  )
}}
```
