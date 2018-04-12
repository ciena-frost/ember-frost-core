# frost-icon

SVG sprite sheet icon support for Frost addons and apps with a base
set of icons and support for additional icon pack extensions.

 * [Extensions](#extensions)
 * [API](#api)
 * [Examples](#examples)

## Extensions

### Addon icon packs

`frost-icon` comes with a base icon pack (`frost`) from `ember-frost-core`.

To include an icon pack for your addon simply:

1. Add this entry to the *dependencies* of your _package.json_ file:
   - `"ember-cli-svgstore": "ciena-blueplanet/ember-cli-svgstore#977df1cf58ae43b1d98a591573c3e06947744321",`
2. Add your SVGs to a folder named _"frost-icon-svgs"_ (without quotes) to the root of your project.

Icons from an icon pack can be consumed using the [icon pack](#icon pack) component format.

### App (or dummy app) icon packs

An application does not need to make any configuration changes in order to consume icon packs from other addons.  However, if an application has its own icons it wants to provide as an icon pack for its own consumption then it should follow these steps:

1. Add this entry to your _package.json_ file:
   - `"ember-cli-svgstore": "ciena-blueplanet/ember-cli-svgstore#977df1cf58ae43b1d98a591573c3e06947744321",`
2. Add your SVGs to a folder named _"frost-icon-svgs"_ (without quotes) to the root of your project.

Icons from an icon pack can be consumed using the [icon pack](#icon pack) component format.

If you need to create additional icon packs you can do so by adding configuration options to your _ember-cli-build.js_ file, such as like the following:


```js
svgstore: {
  files: [
    {
      sourceDirs: 'some-other-directory',
      outputFile: '/assets/icon-packs/some-other-name.svg'
    }
  ]
}
```

*IT IS VERY IMPORTANT* that the `svgstore.files` property is an ARRAY, even if only one entry is specified.


### Inline SVG rendering

You may wish to have the svg in the DOM, so it can be controlled with JavaScript from the same document without having 
to do a request to GET the svg.

`ember-frost-core` provides a configuration option that causes
[svg4everybody](https://github.com/jonathantneal/svg4everybody)
to always render the svg inline, rather than providing a reference.

In
[config/environment.js](https://github.com/ciena-frost/ember-frost-core/blob/master/tests/dummy/config/environment.js#L14-L16)
place the following object in `EmberENV`:

```javascript
iconPacks: {
  inline: true
}
```



## How icon packs work

Each Addon consolidates its own SVGs into a sprite sheet that is stored in `dist/assets/icon-packs/<name>` using
the svgstore concept detailed in [CSSTricks](https://css-tricks.com/svg-sprites-use-better-icon-fonts/).

The `frost-icon` component then loads the icon pack files and displays individual icons via SVG `use` (which has
been polyfilled to work with legacy IE browsers using [svg4everybody](https://github.com/jonathantneal/svg4everybody)).

`use` allows the icon pack files to be cached in the client and retains the
[advantages](https://css-tricks.com/icon-fonts-vs-svg/) of inline
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
