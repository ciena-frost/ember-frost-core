# 0.25.4

* **Added** `npm-install-security-check` as a dependency to make consumers more security conscious.

# 0.25.3
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

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
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

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
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 0.21.1

* **Fixed** bug in `treeForAddon` that can affect consumers.

# 0.21.0
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 0.20.0
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 0.19.2
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

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
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 0.16.0
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 0.15.0
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 0.14.1
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 0.14.0
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

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
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

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
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 0.9.1
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

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
