# frost-icon

SVG sprite sheet icon support for Frost addons and apps with a base
set of icons and support for additional icon pack extensions.

 * [Extensions](#extensions)
 * [API](#api)
 * [Examples](#examples)

## Extensions

### Addon icon packs

`frost-icon` comes with a base icon pack (`frost`) from `ember-frost-core`.
To include an icon pack for your addon simply add the following to your `package.json`

```json
"ember-frost-icon-pack": {
  "name": "<name>",
  "path": "<custom path>"
}
```

**Name** is required as a namespace for your icons.  **Path** is optional
and defaults to `svgs/` if not provided.  Avoid using the `public/`
directory as a path since all of the assest in public will be copied
to `dist` and the SVGs will already be present in the icon pack.

Icons from an icon pack can be consumed using the [icon pack](#icon pack)
component format.

### App (or dummy app) icon packs

Local icon packs can be configured using `ember-cli-build.js` options.

```javascript
var app = new EmberApp(defaults, {
    iconPackOptions: {
      name: '<name>',
      path: '<custom path>'
    }
  });
```

Parameters follow the same format as [addon](#addon icon packs)
based icon packs. The default path for dummy apps is
`tests/dummy/svgs`.

### Inline SVG rendering

You may wish to have the svg in the DOM, so it can be controlled with JavaScript from the same document without having 
to do a request to GET the svg.

`ember-frost-core` provides a configuration option that causes
[svg4everybody](https://github.com/jonathantneal/svg4everybody)
to always render the svg inline, rather than providing a reference.

In [config/environment.js](https://github.com/ciena-frost/ember-frost-core/blob/master/tests/dummy/config/
environment.js#L14-L16) place the following object in `EmberENV`:

```javascript
iconPacks: {
        inline: true
      }
```



## How icon packs work

`ember-frost-core` contains a build process that looks for the
`ember-frost-icon-pack` configuration in all installed ember addons
and apps.  The SVGs in the configured path are consolidated into a
sprite sheet and stored in `dist/assets/icon-packs/<name>` using
the svgstore concept detailed in [CSSTricks](https://css-tricks.com/svg-sprites-use-better-icon-fonts/).

The `frost-icon` component then loads the icon pack files and
displays individual icons via SVG `use` (which has been polyfilled
to work with legacy IE browsers using [svg4everybody](https://github.com/jonathantneal/svg4everybody)).

`use` allows the icon pack files to be cached in the client and retains
the [advantages](https://css-tricks.com/icon-fonts-vs-svg/) of inline
SVGs versus icon fonts.

## API

| Name   | Description | Default |
| ------ | ----------- | ----------- |
| `hook` | the name used for testing with ember-hook | - |
| `icon` | the name of the icon to display | - | 
| `options` | `object` | `{<attributes>}` | property object used to spread the attributes to the top level of the component with ember-spread. |
| `pack` | the name of the icon pack to load | frost |

## Testing with ember-hook
The icon component is accessible using ember-hook:
* Top level hook - `$hook('<hook-name>')`

## Spread attributes
The icon component use ember-spread to `spread` a property object against the top level of the component.

## Examples

### Default
```handlebars
{{frost-icon icon='add'}}
```

### Icon pack
```handlebars
{{frost-icon pack='frost' icon='add'}}
```

### Set the fill color for an icon
```scss
// Generic
.frost-icon {
  color: blue;
}
// Specific to the icon
.frost-icon-frost-close {
  color: green;
}
```

```handlebars
{{frost-icon icon='close'}}
```

### Spread
```handlebars
{{frost-icon 
  options=(hash
    pack='frost' 
    icon='add'
  )
}}
```
