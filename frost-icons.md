# frost-icon
A collection of icons for frost

 * [API](#api)
 * [Examples](#examples)

## API

| Name   | Description |
| ------ | ----------- |
| `icon` | the name of the icon to display |

## Examples

### Add
```handlebars
{{frost-icon icon="frost/add" }}
```




iconPackOptions: {
      name: 'other',
      path: 'tests/dummy/other/svgs'
    }
    
    default app path 'public/svgs' (until 1.0 when it will go to 'svgs'), default merges to `frost`, `app` in 1.0
    default dummy path 'tests/dummy/public/svgs' (until 1.0 when it will go to 'tests/dummy/svgs'), default merges to `frost`, `app` in 1.0