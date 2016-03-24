# ember-frost-theme

SASS based default theme variables for Frost projects

# Usage


Modify your `ember-cli-build.js` to include:


```javascript
const app = new EmberAddon(defaults, {
    sassOptions: {
      includePaths: [
        'node_modules/ember-frost-theme/scss'
      ]
    }
  })
```

Modify your `app.scss` to include


```sass
@import 'frost-theme';
```

You now have access to the theme variables

e.g.

`$frost-button-primary`

# Contribution

All uses of color in frost components must be aliased and included in the default frost theme with the appropriate palette reference
