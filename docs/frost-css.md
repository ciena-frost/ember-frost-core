# ember-frost-theme

SASS based normalization and default theme variables for Frost projects

# Usage

Modify your `app.scss` to include 


```sass
@import 'node_modules/ember-frost-core/addon/styles/frost-theme';
@import 'node_modules/ember-frost-core/addon/styles/frost-app';
```

You now have access to the theme and core variables

e.g.

`$frost-color-blue-1`
`$frost-color-input-border`
`$frost-font-m`

# Contribution

All uses of color in frost components must be aliased and included in the default frost theme with the appropriate palette reference
