# 1.7.1

* **Addedd** missing acceptance tests to visit remaining routes in demo app to ensure all pages continue to load without issue.
* **Fixed** deprecation warning about modifying property twice in one render (which became an error in Ember 2.10).
* **Fixed** select route in demo.


# 1.7.0

* **Fixed** bug in `frost-link` where text wasn't showing up when using `routes` or `routeNames` options while using an inline `frost-link`.
* **Fixed** code so that this addon will work in Ember 2.10 as well as versions dating all the way back to Ember 2.3.


# 1.6.0
* Added support for multiple routes for `frost-link`


# 1.5.2
* **Removed** unused code in blueprints that was accidentally checked in when adding the new generators. 


# 1.5.1

- fs-extra-promise was using withPromise, which isn't a function, but usePromise is


# 1.5.0

- Added svgs for checkboxes in various states


# 1.4.0
## New Dependency
With the addition of `ember-frost-test` as a dependency, the `ember-frost-core` blueprint must be run when updating to this version. You can do so with `ember g ember-frost-core`

* **Added** `ember-frost-test` as a dependency
* **Added** `addon-import` base blueprint to be used by future `-addon` blueprints (taken right out of `emberjs`
* **Removed** `component-test` blueprint as it's now provided by `ember-frost-test`
* **Added** `controller` blueprint
* **Added** `helper`, and `helper-addon` blueprints
* **Added** `mixin` blueprint
* **Added** `service` blueprint
* **Added** `util` blueprint

# 1.3.11

* **Enabled** new settings for `ember-prop-types` to throw errors instead of log warnings in tests and dummy app as well as work with `ember-spread`.
* **Fixed** `ember-prop-type` warnings by adding missing required properties in tests and fixing invalid values in `getDefaultProps()`.


# 1.3.10

* **Updated** `frost-button` tests to use `setupComponentTest` instead of `describeComponent`
* **Updated** `frost-button` tests to use helpers from `ember-test-utils`
* **Refactored** `frost-button` tests to use more `describe` and `beforeEach` blocks to align more with [our testing conventions](https://github.com/ciena-frost/ember-frost-test#testing-conventions)

# 1.3.9

* **Fixed** `frost-link` to require `hook` property in `propTypes` definition.
* **Fixed** `frost-password` to not set properties to invalid values in `getDefaultProps()`.
* **Fixed** most `ember-prop-types` warnings from dummy app by adding missing hooks.
* **Fixed** component generator to sort imports.


# 1.3.8

* **Fixed** issue with `frost-button` where underlying icons weren't being provided the `hook` property.


# 1.3.7

* Performed minor cleanup with `npm run eslint --- --fix` while running latest [eslint-config-frost-standard](https://github.com/ciena-frost/eslint-config-frost-standard) which includes new rules from [eslint-plugin-ember-standard](https://github.com/ciena-blueplanet/eslint-plugin-ember-standard) and [eslint-plugin-ocd](https://github.com/ciena-blueplanet/eslint-plugin-ocd).


# 1.3.6

* **Fixed** dependencies to be included via blueprints instead of installed as direct npm dependencies of this addon.


# 1.3.5
- Add check for text to handle case where link is not inline before pushing it into positional params


# 1.3.4
* **Added** more details in changelog for icon clean up
* **Fixed** link when route/routeName is not set and that we are using `text` attribute


# 1.3.3

* **Fixed** border on `frost-text` input with a `type` of `number`.



# 1.3.2

* **Fixed** typo in `frost-select` readme (#351) 



# 1.3.1

* Marking `hook` as a required property for frost components (warning log)



# 1.3.0

* Updated frost-link to accept named parameters in addition to position parameters, which unblocks the `spread` use case



# 1.2.3

* **Added** missing `ember-prop-types: ^3.0.0` to blueprints when installing `ember-frost-core`



# 1.2.2

* **Upgraded** `ember-cli-mocha` which pulls in a newer `ember-mocha` and deprecates `describeComponent` (PR coming in the next couple days to refactor our tests accordingly)
* **Fixed** `CssMixin` test to test against a real component defined in the dummy app so that we catch when the `toString()` format changes. 


# 1.2.1

* **Fixed** a bug where the `addon/index.js` had a typo w.r.t. a module name and thus threw an error whenever anyone tried to import anything directly from `ember-frost-core`. 

# 1.2.0

* **Added** `extends` helper to allow adding properties to a pojo (for use with `hookQualifiers`. Will add docs to `README.md` in next PR
* **Added** `ehook` helper to allow setting hookQualifiers as a POJO and not just key/value pairs (only useful until [this pr](https://github.com/Ticketfly/ember-hook/pull/35) is merged). Will add docs to `README.md` in next PR
* **Added** `CssMixin` - will add docs in `README.md` in next PR
* **Added** `Component` base class `addon/components/frost-component.js` to easily include all desired/required mixins for our components (`CssMixin`, `HookMixin`, `PropTypesMixin`, and `SpreadMixin` currently).
 * **Updated** existing components to derive from `frost-component`

# 1.1.5
- **removed** `_getOnClickHandler()` and unnecessary mutable cell check.


# 1.1.4
* **Updated** Fixed text padding



# 1.1.3
* **Udpated** `ember-spread`


# 1.1.2

* **Fixed** text input field clear. It now appears as expected
* **Fixed** primary link to use the new icon 'open-tabs'



# 1.1.1
* **Fixed** dependency issue with `ember-spread`

# 1.1.0
* **Added** `ember-spread` to core components


# 1.0.6
* **Replaced** loading ring by the new loading ring



# 1.0.5

 * **Undo** the change from [#168](https://github.com/ciena-frost/ember-frost-core/pull/168) as it has been [rendered unnecessary](https://github.com/null-null-null/ember-get-config/issues/10) 


# 1.0.4
* **Fixed** `onClick` action call


# 1.0.3
* Fix issues with local icons



# 1.0.2
* **Fixed** coverage


# 1.0.1

* With the travis config updated and coverage still hanging, turning off coverage temporarily



# 1.0.0
- **UPDATED/ADDED** test suite for frost-button, frost-checkbox, frost-events, frost-icon, frost-link, frost-loading, frost-password, frost-radio-button, frost-group, frost-scroll, frost-text, frost-textarea, frost-toggle, utils
- **UPDATED** README for frost-button, frost-checkbox, frost-events, frost-icon, frost-link, frost-loading, frost-password, frost-radio-button, frost-group, frost-scroll, frost-text, frost-textarea, frost-toggle
- **UPDATED/ADDED** demo app for frost-button, frost-checkbox, frost-icon, frost-link, frost-loading, frost-password, frost-radio-button, frost-group, frost-scroll, frost-text, frost-textarea, frost-toggle
- **REWORK** API of frost-toggle, frost-link, frost-radio-button, frost-radio-group
- **UPDATED** general cleanup for destructing of `get`, `set`, `on` and `$`
- **UPDATED** existing component definitions to match recently updated generator.
- **UPDATED/ADDED** hooks and qualifiers on all the components
- **ADDED** a single export point at `addon/index.js`
- **REMOVED** all the deprecated functionalities
- **REMOVED** unnecessary code
- **UPDATED** the dependencies
- **UPDATED** `baseURL` to `rootURL`
- **UPDATED** tests to run in chrome
- **UPDATED** `package.json` scripts
- **UPDATED** node version from >= 5 to >=6
- **FIXED** `ember-cli-code-coverage` version to 3.5.0
- **FIXED** all the sass linting issues
- **REMOVED** dependency to `one-way-controls`
- **ADDED** support for an inline version of frost-link
- **ADDED** support for small/medium/large radio-button `size`
- **ADDED** support for `required` and `error` for radio-button/radio-group
- **ADDED** support for an inline version of radio-group
- **ADDED** support for multiple routes on frost-link
- Icon - application => **Moved** to ember-frost-navigation
- Icon - arrow => **Deleted**
- Icon - back => **Deleted**
- Icon - chevron-left => **Renamed** chevron
- Icon - close-circle => **Renamed** round-close
- Icon - dialog-error => **Replaced** by error
- Icon - double-chevron-left => **Renamed** chevron-double
- Icon - hide => **Deleted**
- Icon - home => **Deleted**
- Icon - info => **Moved** to ember-frost-modal & ember-frost-notifier & ember-frost-fields
- Icon - infobar-create => **Replaced** by add
- Icon - infobar-find => **Moved** to ember-frost-info-bar
- Icon - line => **Deleted**
- Icon - list-large => **Renamed** view-large
- Icon - list-medium => **Renamed** view-medium
- Icon - list-small => **Renamed** view-small
- Icon - new-tab => **Renamed** open-tabs
- Icon - search => **Moved** to ember-frost-info-bar & **Replaced** by find
- Icon - shield-full => **Moved** to internal repo
- Icon - shield-half => **Moved** to internal repo
- Icon - shield => **Deleted**
- Icon - show => **Deleted**
- Icon - sidebar-layer-normal => **Moved** to ember-frost-sidebar & **Renamed** layer-normal
- Icon - sidebar-layer-open  => **Moved** to ember-frost-sidebar & **Renamed** layer-open
- Icon - sort-direction => **Moved** to ember-frost-sort & **Renamed** direction
- Icon - user => **Moved** to ember-frost-navigation
- Icon - warning => **Moved** to ember-frost-modal & ember-frost-notifier & ember-frost-fields
- Icon - app/company-strip => **Moved** to ember-frost-modal dummy
- Icon - app/company => **Moved** to ember-frost-modal dummy
- Icon - app/user => **Replaced** by user
- Icon - frost/close => **Moved** to top level
- Icon - frost/link => **Replaced** by open-tabs
- Icon - launch/transition-arrow
- Icon - loading/ring => **Moved** to top level & **Renamed** loading-ring
- Icon - loading/ripple => **Moved** to top level & **Renamed** loading-ripple
- Icon - notifications/error => **Moved** to ember-frost-modal & ember-frost-notifier & ember-frost-fields
- Icon - notifications/info => **Replaced** by info
- Icon - notifications/warning => **Replaced** by warning


# 0.32.5

* **Fixes** a major memory leak in `frost-scroll`



# 0.32.4
* Updated frost-select-dropdown to be a columnar flex layout

# 0.32.3

* **Fixed** `frost-select` to open dropdown when select is focused and user presses up/down arrow key.
* **Fixed** selected item(s) in the select dropdown to have a heavier font weight.
* **Removed** `ember-browserify` and `svg4everybody` npm dependencies in favor of including `svg4everybody` via `vendor` directory.

# 0.32.2

* Fixed the tabIndex on frost-select that are disabled and then enabled



# 0.32.1

* **Added** box shadow to select dropdown arrow to match box shadow of dropdown box.
* **Added** space around select dropdown text input.
* **Changed** color of matching text when filtering select dropdown.



# 0.32.0

* **Added** underlining of matching text in items when filtering `frost-select`.



# 0.31.0
 * **Removed** the `frost-component` generator
 * **Added** Some new dependencies that will be installed when this addon is `ember install`'d
    * Addon: `ember-test-utils`
    * Bower packages: `chai-jquery` and `sinon-chai`
 * **Added** a `component` generator which uses our lint rules and our comment blocks
 * **Added** a `component-test` generator which uses `mocha` and `ember-test-utils`. It also sets up `sinon` automatically and has a failing test to make developers add a real test.
 * **Added** a `component-addon` generator which does the re-export of a component in the `app` directory, basically the same as the default generator, minus the `;` at the end.
 * **Added** a `PULL_REQUEST_TEMPLATE.md` file to help contributors remember to put version-bump comments and changelog messages in their PR descriptions.

# 0.30.2

* Updated ember-hook selector for frost-select-dropdown input

# 0.30.1

* **Fixed** `frost-select` to not depend on prototype extensions.

# 0.30.0

* Rewrote `frost-select` from the ground up to make it keyboard friendly and fix all of the issues we have been having with it. However I kept the same component API so consuming apps should still just work. CSS selectors did change though which will break any overriding CSS and tests that depend on the old selectors.

# 0.29.1

* **Fixed** issue where events weren't being unbound on component destruction.

# 0.29.0

- Add an array helper

# 0.28.8
* Fixed issue #120

# 0.28.7

* **Fixed** input margins and borders to match.

# 0.28.6

* **Fixed** notifications for the dummy app.

# 0.28.5

* **Added** some test helpers for consumers to use in their tests.

# 0.28.4

* **Fixed** width of following inputs to match: `frost-password`, `frost-select`, and `frost-text`.

# 0.28.3

* **Fixed** `frost-multi-select`.

# 0.28.2

* **Updated** `frost-select` dropdown to update at 60 fps and stop using `element` property as it causes conflicts in Ember 2.9 beta 3.

# 0.28.1

* **Added** `frost-select-outlet` and documented it.

# 0.28.0

* **Added** [ember-elsewhere](https://github.com/ef4/ember-elsewhere) as a new dependency.
* **Changed** `frost-select` and `frost-multi-select` to render dropdown elsewhere in the DOM, using `ember-elsewhere`, in order to make them more flexible.
* **Changed** minimum Ember version from `2.1` to `2.3` since `ember-elsewhere` doesn't appear to work on versions prior to `2.3`.

# 0.27.4
* select value and prompt is now clearable by setting the 'selectedValue' property to an empty string in the consuming context

# 0.27.3

* The unselected text in the `frost-select` drop down menu is now a darker color.

# 0.27.2

* Pressing enter to select an item when there is no item hovered will no longer reset the selected value or cause an error
* Changing select data after a selection has been made will no longer cause an error.

# 0.27.1

Fix a problem where frost-select would clear prompt on redraw

# 0.27.0
 * **Added** frost-toggle-button component and dummy example.

# 0.26.0

Use onclick handler from parameter passed from component/controller property

# 0.25.7
* Pass event to select's onBlur action

# 0.25.6

* Updated the button demo to demonstrate that disabled buttons don't fire actions

# 0.25.5

* Updated the frost-component blueprint to reflect current best practices

# 0.25.4

* **Added** `npm-install-security-check` as a dependency to make consumers more security conscious.

# 0.25.3

fix for active route on link click

# 0.25.2

* **Fixed** Ember badge in README to reflect correct version.

# 0.25.1

* **Fixed** addon so it works with older versions of Ember all the way back to Ember `2.1`.

# 0.25.0

* Added an `onClick` event to the `frost-link` component that is sent prior to transition

# 0.24.0

* Added a first-pass version of a frost component blueprint

# 0.23.1

* **Updated** `ember-hook` dependency and blueprint to latest version

<!-- Reviewable:start -->
---
This change is [<img src="https://reviewable.io/review_button.svg" height="34" align="absmiddle" alt="Reviewable"/>](https://reviewable.io/reviews/ciena-frost/ember-frost-core/172)
<!-- Reviewable:end -->


# 0.23.0

* Added onScrollUp, onScrollDown, onScrollYStart, onScrollYEnd
* Deprecated on-scroll-y-end in favor of onScrollYEnd

# 0.22.3

invoke child included hooks

# 0.22.2

* **Removed** most uses of `lodash` methods in favor of ES6 and Ember methods.

# 0.22.1

* **Updated** `ember-cli-sass`  to float on the major
* **Updated** CHANGELOG.md file to remove Reviewable note.


# 0.22.0

* **Added** hooks for testing into frost-select and frost-multi-select
* **Added** tests to verify hooks in integration tests for frost-select and frost-multi-select
* **Added** documentation on the hook usage for frost-select and frost-multi-select

# 0.21.3

* **Updated** temporarily restrict `ember-cli-sass` from going above version 5.4.0

# 0.21.2

guards added for any consuming app @ ember 2.7

# 0.21.1

* **Fixed** bug in `treeForAddon` that can affect consumers.

# 0.21.0

- **Changed** from `ember-lodash` to `ember-lodash-shim`. This means upgrading from `lodash` version `3.x` to version `4.x` which could impact consumers relying on [things removed](https://github.com/lodash/lodash/wiki/Changelog#v400) in `lodash` version `4.0.0`.

# 0.20.0

- **Added** Consumers can now use 'hook' attr of core components to enable easier testing with addons like ember-cli-page-object

# 0.19.2

Fixed how negative indices are handled by frost-select.

# 0.19.1

* **Fixed** components that use `ember-prop-types` to work as expected in integration tests by explicitly consuming the `ember-prop-types` mixin instead of relying on the initializer which isn't executed in an integration test environment.

# 0.19.0
The select input widgets now use redux.

# 0.18.1

* **Fixed** `frost-textarea`'s `onInput` handler to propagate change immediately to consumer rather than wait for another Ember run loop to pass.

# 0.18.0

## Text/Password native event support
- Mapped all available DOM events to Frost events (e.g. focusIn -> onFocusIn) see the demo for a full list
- Event hooks respond with native DOM events instead of {id, value} object, this is still supported as a legacy usage, but please switch (no way to detect when the legacy attributes are used unfortunately)
- Deprecated `onFocus` (replaced by `onFocusIn`)
- Deprecated `onBlur` (replaced by `onFocusOut`)
- Removed the `excludedEvents` property from the FrostEvents mixin, this is covered automatically when local events are present

## Text/Password visual and behavioral updates
- Added a new color (grey-7) to the palette for input borders
- Updated the visuals and animation for hover, focus, clear and show/hide

## Text/Password demo updates
- Demos demonstrate legacy, native, text support and deprecated events
- Updated the text/password demos to use snippets

## New keycodes util
- Added a keycodes enum for use in matching keycodes from keyboard events

## Code cleanup
- Integrated ember-concurrency for async behavior in text/password (clear text, show/hide password)
- Text/password actions are fully run-loop compliant and clean up automatically on component destruction

## Future
- Moving towards dropping ember-one-way-controls from the dependency list (requires Ember 2.3.1+)

# 0.17.3
 * **Fixes** a bug in `frost-select` where the options popover was closed whenever someone typed into the input (when `selectedValue` is passed in as props).
 * **Updated** `eslint` within the project to `3.x`
 * **Added** some linting rules for `mocha` (via an update to `eslint-config-frost-standard`)
 * **Updated** `tests/` directory to no longer specify an `.eslintrc` with `globals` that shouldn't actually be globals.

# 0.17.2

Added ember-code-snippets to allow demo documentation to reference the code as the sample text.  Cleaned up the button demo as an example.

# 0.17.1

Fixed the text clear icon to only append to the DOM on insertion of the text field (was occurring on every render/re-render)

# 0.17.0

Events

# 0.16.0

keypress

# 0.15.0

added radio button

# 0.14.1

README update

# 0.14.0

Inline svg config option

# 0.13.1

- Changed selection by value to not fire the onChange event

# 0.13.0
* **Added** `onKeyUp` property on `frost-text` that receives `keyUp` events from the inner `input`
* **Added** `onKeyDown` property on `frost-text` that receives `keyDown` events from the inner `input`

# 0.12.0

* added shield-full, shield-half icons
![shield-full](https://cloud.githubusercontent.com/assets/4720276/16313287/68748978-392d-11e6-93ab-5d1e33829933.png)
![shield-half](https://cloud.githubusercontent.com/assets/4720276/16313288/6874beac-392d-11e6-9ca6-bc39a0ce0a97.png)



# 0.11.20
* FIXED frost-textarea clear icon style to show it inside the text area

# 0.11.19

this.super init

# 0.11.18

Added onEnter to frost-text so that actions can be triggered using the enter key when the input is in focus

# 0.11.17

Reverted a move of component templates from the addon to app directory as this change broke downstream component extensions

# 0.11.16

* **Fixed** issue with `frost-select` and consumer clearing `selectedValue` but DOM not clearing input.

# 0.11.15

* Cleaned up `frost-select` code to try and make more maintainable.

# 0.11.14

* **Fixed** issue with `isChecked` computed property of `frost-checkbox` being `readOnly`.
* **Updated** `frost-select` to use `ember-prop-types`.

# 0.11.13

* **Added** section comments in components for *dependencies*, *properties*, *computed properties*, *functions*, *events*, and *actions*.
* **Fixed** bug where disabled text input with text could be cleared as clear icon was present when it shouldn't be.
* **Updated** components to use `ember-computed-decorators`.
* **Updated** `frost-icon` and `frost-link` to use `ember-prop-types`.

# 0.11.12

* **Added** `unit: true` to all unit tests to explicitly mark them as unit tests.
* **Moved** templates to `app/` directory so consumers can override them if they wish.
* Started using destructuring for Ember properties such as `const {Component} = Ember` instead of using `Ember.Component`.

# 0.11.11

* **Fixed** text input to stop showing clear button when consumer clears value programmatically.

# 0.11.10

* **Fixed** deprecation warning from Ember 2.6.0 to stop using `didInitAttrs` hook and instead use `init`.

# 0.11.9

* **Added** `autofocus` property to `frost-select` component.

# 0.11.8

Fixed the deprecation notice test for nested icon paths
Added CSS based default fills to some icons from the frost icon pack
Fixed broken checkbox tests

# 0.11.7

* **Fixed** size of reveal icon for `frost-password`.
* **Updated** `frost-password` to use updated icon path for reveal icon.

# 0.11.6

Added a "more" svg to the frost icon pack

# 0.11.5

Fixed a broken build when a consuming app doesn't specify an application icon pack and doesn't contain the legacy `public/svgs` icons path

# 0.11.4

Duplicated the icons in the `frost` icon pack - duplicates now exist in the legacy `frost/<icon>` nested paths and new `<icon>` flat path.  This allows icons from the `frost` icon pack to be migrated off the deprecated nested paths.  The nested duplicates will be removed in release 1.0.

# 0.11.3

* **Added** new `pack` property to `frost-button` which gets passed down to underlying `frost-icon`.
* **Fixed** issue with button icons having wrong color.
* **Updated** `frost-button` to use `ember-prop-types` for better property validation warnings.

# 0.11.2

* **Added** correct font to normalize CSS.

# 0.11.1

* **Fixed** `frost-loading` to work in more than just Firefox

# 0.11.0
Deprecating in-line style for link in favour of inline.

# 0.10.0

Added the icon pack feature to `frost-icon`, see the documentation at http://ciena-frost.github.io/ember-frost-core/#/icons for details

# 0.9.3

Minor - updating path for frost guide.

# 0.9.2

upversion to fix travis build

# 0.9.1

Adjusting directory name to match UX components.

# 0.9.0

* **Added** `CHANGELOG` with all previous history.
* Upgraded to latest Ember, Ember CLI, and Ember Data.

# 0.8.2 (May 13, 2016)

* **Fixed** padding for `frost-select`.

# 0.8.1 (May 05, 2016)

* **Changed** text in `frost-button` demo to be more clear.

# 0.8.0 (May 03, 2016)

* **Changed** directories for where components show up in Frost guide.

# 0.7.5 (May 02, 2016)

* **Fixed** background color for `frost-select`.

# 0.7.4 (April 29, 2016)

* **Added** support for placeholder text on `frost-select` via `placeholder` property.

# 0.7.3 (April 29, 2016)

* **Added** more test coverage for `frost-checkbox`.

# 0.7.2 (April 28, 2016)

* **Fixed** issue with `selectedValue` not changing when `data` property changes in `frost-select`.

# 0.7.1 (April 28, 2016)

* **Fixed** issue with `frost-select` and a `selected` index of zero.

# 0.7.0 (April 26, 2016)

* **Fixed** issue where `frost-checkbox` could be checked/unchecked via keyboard events when it is disabled.

# 0.6.5 (April 26, 2016)

* **Fixed** focus state of `frost-checkbox`.

# 0.6.4 (April 25, 2016)

* **Changed** some `let` variables to `const` variables.

# 0.6.3 (April 25, 2016)

* Trigger a version bump.

# 0.6.2 (April 25, 2016)

* **Fixed** alignment issues.

# 0.6.1 (April 25, 2016)

* **Changed** some `const` variables to `let` variables.

# 0.6.0 (April 22, 2016)

* **Added** support for `tabindex` property on `frost-password`, `frost-text`, and `frost-textarea`.

# 0.5.2 (April 22, 2016)

**Added** `ember-truth-helpers` to blueprints to fix issue with `ember install ember-frost-core`.

# 0.5.1 (April 21, 2016)

* **Added** `id` to `frost-password`.

# 0.5.0 (April 20, 2016)

* **Fixed** demo by changing `locationType` to `hash` in environment config.

# 0.4.0 (April 20, 2016)

* **Added** support to `frost-checkbox` for being toggled via spacebar.

# 0.3.2 (April 19, 2016)

* Trigger a version bump.

# 0.3.1 (April 19, 2016)

* **Added** new design, `app-bar`, to `frost-button`.

# 0.3.0 (April 18, 2016)

* **Changed** `frost-checkbox` to use `one-way-checkbox` instead of `one-way-input`.
* **Fixed** `frost-checkbox` to capture spacebar key press.

# 0.2.2 (April 14, 2016)

* **Added** first batch of snippets.
* **Fixed** `onFocus` properties on components so consumer can process focus events without disrupting original focus event handlers.

# 0.2.1 (April 13, 2016)

* **Added** support for tabbing into a `frost-checkbox`.
* **Added** `onBlur` property to `frost-checkbox` so consumer can process blur events.

# 0.2.0 (April 13, 2016)

* **Added** `onBlur` property to `frost-password`, `frost-select`, `frost-text`, and `frost-textarea` so consumer can process blur events.

# 0.1.4 (April 13, 2016)

* **Added** `perfect-scrollbar` to blueprints to fix `ember install ember-frost-core`.
* **Fixed** height setup.

# 0.1.3 (April 13, 2016)

* **Added** `frost-scroll` component.

# 0.1.2 (April 13, 2016)

* **Fixed** `frost-checkbox` to update when `checked` property changes.

# 0.1.1 (April 12, 2016)

* **Added** blueprints to improve dependency management when installing via `ember install ember-frost-core`.
* **Removed** explicit width from `frost-text`.

# 0.1.0 (April 11, 2016)

* **Changed** Mirage to get `namespace` from environment config.

# 0.0.24 (April 10, 2016)

* **Removed** max width from `frost-text`.

# 0.0.23 (April 08, 2016)

* **Fixed** styles in templates to silence cross-site scripting warnings.

# 0.0.22 (April 05, 2016)

* **Fixed** size of `frost-multi-select`.
* **Fixed** margin styling issues in demo.

# 0.0.21 (April 05, 2016)

* **Fixed** DOM in `frost-checkbox` demo.

# 0.0.20 (April 03, 2016)

* **Fixed** styling of demo for Frost guide.

# 0.0.19 (March 31, 2016)

* **Added** font to project.

# 0.0.18 (March 31, 2016)

* **Fixed** demo and API documentation.

# 0.0.16 (March 31, 2016)

* **Added** `frost-loading` component.

# 0.0.15 (March 30, 2016)

* **Added** new design, `info-bar`, to `frost-button`.
* **Added** new design, `in-line`, to `frost-link`.
* **Fixed** demo and API documentation.
* **Removed** icons.

# 0.0.14 (March 30, 2016)

* **Added** `frost-multi-select` and `frost-select` components.

# 0.0.13 (March 29, 2016)

* **Fixed** demo app styles to align with Frost guide.

# 0.0.12 (March 28, 2016)

* **Added** new design, `info-bar`, to `frost-link`.

# 0.0.11 (March 28, 2016)

* **Fixed** Frost guide directories.

# 0.0.10 (March 24, 2016)

* Trigger version bump.

# 0.0.9 (March 24, 2016)

* **Added** API documentation for `frost-button`.
* **Fixed** styling of `frost-button`.

# 0.0.8 (March 24, 2016)

* **Added** `frost-link` component.

# 0.0.7 (March 24, 2016)

* **Added** styling from `ember-frost-css-core`.
* **Added** styling from `ember-frost-theme`.

# 0.0.6 (March 24, 2016)

* **Added** `frost-password` and `frost-textarea` components.

# 0.0.5 (March 24, 2016)

* **Fixed** styling in demo.

# 0.0.4 (March 24, 2016)

* **Changed** where code is located within repository.

# 0.0.3 (March 24, 2016)

* **Added** `frost-button` component.

# 0.0.2 (March 23, 2016)

* **Added** `frost-checkbox` component.

# 0.0.1 (March 23, 2016)

* Scaffolded new addon.
* **Added** `frost-icon` and `frost-text` components.
