# ember-frost-theme

SASS based normalization and default theme variables for Frost projects

# Usage

Colors and typography variables are available in `frost-theme`.
Z-index and flex variables are available in `frost-app`.

Apps can import these styles via `@import 'ember-frost-core/frost-<theme or app>';`
Addons can import these styles via
`@import 'node_modules/ember-frost-core/app/styles/ember-frost-core/frost-<theme or app>';`

You now have access to the theme and core variables

e.g.

`$frost-color-blue-1`
`$frost-color-input-border`
`$frost-font-m`

# Contribution

All uses of color in frost components must be aliased and included in the default frost theme with the appropriate 
palette reference
