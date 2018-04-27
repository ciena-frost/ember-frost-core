# 8.2.1 (2018-04-19)

* Closes #543 - Disabled checkbox no longer displays pointer cursor when disabled

# 8.2.0 (2018-04-17)
* **Added** frost-autocomplete



# 8.1.1 (2018-04-16)

* Updated _utils/frost-icon-svg.js_ to include default `copyAttrs` configuration option for `svgstore`

# 8.1.0 (2018-04-13)

* Added `isChevronOnlyClickTrigger` and `labelComponent` props to `frost-expand`


# 8.0.0 (2018-04-13)

* Removed this addon from being responsible for building other addon's (within the Frost family) icon packs and instead require them to be responsible for doing so themselves.
* Applications are now also responsible for building their own icon packs - this addon is only responsible for itself, just like any other addon.
* Removed the `ember-frost-icon-pack` keyword from _package.json_
* Removed the `ember-frost-icon-pack` property from _package.json_
* Created a fork of `ember-cli-svgstore` and installed it in this addon.
* Created _utils/frost-icon-svg.js_ utility to assist addons with the building of their own icon packs.
* Renamed _/svgs_ folder to _/frost-icon-svgs_
* Refactored "find parent" logic to use `this._findHost()`
* Updated `frost-icons` documentation to demonstrate new way of managing/creating icon packs
* Updated the dummy app's method of displaying the frost icon pack to align with new approach in _utils/frost-icon-svg.js_ utility


# 7.0.0 (2018-03-09)
* **Updated** pull request template
* **Added** issue template
* **Updated** to `pr-bumper` version `3`
* **Updated** to node 8
* **Added** slack integration
* **Updated** `ember-frost-test` to `^4.0.1`
* **Updated** `ember-test-utils` to `^8.1.1`
* **Updated** `ember-cli-frost-blueprints` to `^5.0.2`
* **Updated** `ember-prop-types` to `^7.0.1`
* **Updated** `ember-spread` to `^5.0.0`
* **Updated** helper `array.js` to use `array.slice()`
* **Removed** helper `ehook.js` app export and tests since it is now provided by `ember-hook`
* **Removed** ignoring of `package-lock.json` file
* **Added** `package-lock.json` file
* **Updated** Travis CI scripts to allow non-exact node version

# 6.0.1 (2018-03-08)
* Pass down hookQualifier on `frost-button`

# 6.0.0 (2018-02-13)

* **Removed** `blueprint-helper.js`, related tests and mention in `README.md`
* **Removed** `chalk`, `child-process-promise`, `promise`, and `semver` NPM dependencies
* **Updated** test helpers to now be provided from `addon-test-support`. For example, test helpers previously available at `dummy/tests/helpers/ember-frost-core/<frost-select>` are now available via `ember-frost-core/test-support/<frost-select>`
* **Updated** add information to `README.md` about test helpers

# 5.1.1 (2018-01-10)
* updated to reflect UX spec.



# 5.1.0 (2018-01-10)
* Add `onClear` functionality to both frost-text, and frost-textarea

# 5.0.0 (2018-01-04)
* Remove `ember-cli-path-utils`
* Remove `frost-guide-custom-routing`
* Remove `npm-install-security-check`
* Pin `ember-cli-sass` NPM dependency to `7.1.1`
* Pin `ember-computed-decorators` NPM dependency to `0.3.0`
* Pin `ember-concurrency` NPM dependency to `0.7.19`
* Pin `ember-hook` NPM dependency to `1.4.2`
* Pin `ember-inflector` Bower dependency to `1.3.1`
* Pin `highlightjs` Bower dependency to `9.12.0`
* Update `broccoli-babel-transpiler` NPM dependency to `^5.7.2`
* Update `ember-browserify` NPM devDependency to `^1.2.0`
* Update `ember-prop-types` NPM dependency to `^6.0.1`
* Upgrade `broccoli-autoprefixer` NPM dependency to `^5.0.0`
* Upgrade `broccoli-funnel` NPM dependency to `^2.0.1`
* Upgrade `broccoli-merge-trees` NPM dependency to `^2.0.0`
* Upgrade `broccoli-svgstore` NPM dependency to `^0.4.2`
* Upgrade `ember-frost-test` NPM devDependency to `^4.0.0`
* Upgrade `ember-cli-frost-blueprints` NPM devDependency to `^5.0.1`
* Upgrade `ember-spread` NPM dependency to `^4.0.1`
* Install `bower` NPM devDependency at ^1.8.2
* Move `Faker` Bower dependency to devDependencies
* Move `pretender` Bower dependency to devDependencies
* Remove useLintTree ember-cli-mocha build configuration
* Remove _package-lock.json_ until officially support Node 8

  

# 4.1.0 (2017-12-21)

* Add object helper to fix https://github.com/emberjs/ember.js/issues/14738

# 4.0.5 (2017-12-21)

* **Fixed** dropdown not updating with new select items

# 4.0.4 (2017-12-13)

* Change semver range of `ember-resolver` to align with other repos

# 4.0.3 (2017-12-12)

* Float `ember-disable-prototype-extensions` _devDependency_ to bring inline with semver range of other repos

# 4.0.2 (2017-12-06)

* Remove unneeded _blueprints_ folder that should have been removed in #522

# 4.0.1 (2017-12-01)

* Move `ember-hook` from `devDependencies` to `dependencies`


# 4.0.0 (2017-11-30)

* Closes #520
  * Removes dependencies being installed via `afterInstall()` hook in blueprint.
  * Moved `ember-computed-decorators` from _devDependencies_ to _dependencies_ in _package.json_
  * Moved `ember-concurrency` from _devDependencies_ to _dependencies_  in _package.json_
  * Moved `ember-elsewhere` from _devDependencies_ to _dependencies_  in _package.json_
  * Moved `ember-prop-types` from _devDependencies_ to _dependencies_  in _package.json_
  * Moved `ember-spread` from _devDependencies_ to _dependencies_  in _package.json_
  * Moved `ember-truth-helpers` from _devDependencies_ to _dependencies_  in _package.json_


# 3.1.0 (2017-11-08)

* Added optional falseValue and trueValue properties to `frost-checkbox`


# 3.0.1 (2017-11-06)
* Fix frost-select-dropdown breaking in tests because `autorun loop is disabled`

# 3.0.0 (2017-11-02)

## WARNING: THIS REVERTS EMBER CLI 2.16.2 BACK TO 2.12.3

We apologize for this change. Unfortunately, due to the internal needs of our organization this became a required action.

The 2.16.2 changes are now located in the `ember-cli-2.16.2` branch and will hopefully be contained in a versioned release again in the future.

# 2.0.2 (2017-10-25)
* **Updated** version of `ember-decorators`
* **Removed** code setting babel plugins inside `index.js` since it is no longer needed for `ember-decorators'


# 2.0.1 (2017-10-25)
* **Updated** to ensure that the `included` method's `this._super` call is properly bound to the context (fixes ember-decorators/ember-decorators#173).

# 2.0.0 (2017-10-18)
* **Updated** testing dependencies
* **Updated** to Ember CLI 2.16.2 and babel 6
* **Updated** to using ember-decorators which replaces ember-computed-decorators
* **Updated** dependencies
* **Updated** pr-bumber to version 3
* **Updated** CONTRIBUTING.md file
* **Updated** to using Ember Javascript Modules API https://github.com/ember-cli/ember-rfc176-data
* **Updated** blueprints to latest versions of dependencies
* **Updated** to use chrome headless in Travis CI
* **Updated** to using Node 8.1.2 NPM 5
* **Added** eslint-plugin-ember to enforce Ember Javascript Modules API syntax
* **Removed** running of code coverage until issue is resolved with ember-cli-code-coverage: https://github.com/kategengler/ember-cli-code-coverage/issues/133
* **Removed** running of ember-try its-2.12 scenario until issue is resolved: https://github.com/ember-cli/ember-try/issues/148
* **Updated** blueprint helper tests to be commented out since in babel 6 CommonJS files are converted to AMD (which needs import of require) and then being transpiled.

# 1.24.0 (2017-10-16)
- Update colors to match Frost Visual Style Guide 1.624 (2017-09-12).  Added colors include named alarm colors, status colors, yellows, and browns.  Some colors were fixed to match the most recent versions.

# 1.23.13 (2017-09-12)

* Use ember-cli-notifications v4.2.1 - 4.2.0 was using a beta version of ember-css-modules


# 1.23.12 (2017-09-11)
* **Added** an optional **mouseenter** event for the ps-container to update which can then remove or add scrollbars


# 1.23.11 (2017-08-17)

* **Reduced** the height of buttons within an info bar from 75px to 60px
* **Added** a right margin of 5px to buttons within an info bar to give them space from their right boundary
* **Added** a 5px padding to the left and right sides of the info bar buttons so that the text of the buttons is not pushed right up against the boundary of the button
* **Removed** padding on the text within the info bar
* **Reduced** the bottom margin on the SVG elements in buttons within an info bar from 10px to 5px

# 1.23.10 (2017-08-10)
* **Updated** pin `ember-elsewhere` to pre-babel 6 version


# 1.23.9 (2017-08-10)
* **Updated** packages to reflect Ember CLI 2.12.x versions
* **Updated** blueprints to match devDependency versions


# 1.23.8 (2017-08-09)
 * **Updated** the pink and lilac color palettes for better contrast


# 1.23.7 (2017-08-08)

* **Updated** dependency versions to match verions currently being installed
* **Updated** `ember-cli-htmlbars-inline-precompile` to pin to version `0.3.12` until ember-cli/ember-cli-htmlbars-inline-precompile#90 is resolved. (See issue: https://github.com/ciena-frost/ember-frost-core/issues/488)
* **Updated** `ember-cli-build.js` to `includePolyfill: true` for `ember-cli-babel` as part of issue: https://github.com/ciena-frost/ember-frost-core/issues/488

# 1.23.6 (2017-07-20)

* The JQuery creation of a canvas element was behaving oddly in some apps on Firefox.

# 1.23.5 (2017-07-19)

* **Added** Indigo, pink and lilac-4 to the color scheme


# 1.23.4 (2017-07-14)

* update svg foreverbody
  * Fixes issues with `linearGradients` rendering


# 1.23.3 (2017-07-10)

* **Fixed** tests
* **Removed** `ember-release` from `.travis.yml`


# 1.23.2 (2017-07-07)
* **Fixed** transpilation issue for ember-cli < 12.0.0


# 1.23.1 (2017-07-05)
* **Upgrade** to ember 2.12.3

# 1.23.0 (2017-06-28)
 * fix frost-scroll content size being reduced by calling perfect-scrollbar `update` when renders
   * Fixes BPSO-54864




# 1.22.5 (2017-06-27)
* Added x-axis scroll event handlers to frost-scroll
* Added tests for new scroll events

# 1.22.4 (2017-06-19)

Added style rules for the hover state of the frost-toggle button switch. The switch will now turn a light blue color when the user mouses over the toggle. If the toggle is disabled, the switch will not change color. 

# 1.22.3 (2017-06-05)
* **Removed** unneeded dependencies left over from when blueprints were moved to another repo: https://github.com/ciena-frost/ember-frost-core/pull/457/files
* **Updated** ember-try config to correct syntax for `default`.

# 1.22.2 (2017-06-01)
  * Fix select search by escaping regex special characters. Fixes https://github.com/ciena-frost/ember-frost-core/issues/455

# 1.22.1 (2017-05-31)
* **Updated** the lgrey colours


# 1.22.0 (2017-05-31)

* **Added** `frost-expand` component and `frost-error` component


# 1.21.3 (2017-05-30)

 * **Moved** `ember-cli-frost-blueprints` from `dependencies` in `package.json` to being installed as a blueprint. It turns out that [`ember-cli` cheats w.r.t. `ember-cli-legacy-blueprints`](https://github.com/ember-cli/ember-cli/blob/v2.8.0/lib/models/project.js#L347) and so we can't follow that pattern (of just making it an `npm` dep). 

# 1.21.2 (2017-05-30)

* **Updated** `ember-cli-forst-blueprints` to `1.x`


# 1.21.1 (2017-05-26)
* Set notification z-index to appear above modals


# 1.21.0 (2017-05-26)
* **Removed** blueprints for generating tests, they are now provided by `ember-cli-frost-blueprints`
* **Added** `ember-cli-frost-blueprints` to the `dependencies` so that the same blueprints are still available to consumers of this addon. 
* **Fixed** [#374](https://github.com/ciena-frost/ember-frost-core/issues/374) by doing the above. 

# 1.20.1 (2017-05-17)
* **Updated** `ember` from `bower.json` to `ember-source` from `package.json`
* **Updated** ember-try config matrix for `ember-source`
* **Updated** `ember-cli-shims` to the npm package instead of the bower package
* **Updated** path to the test resolver
* **Updated** path to `ember-template-compiler` needed for `frost-events-tests.js` integration tests
* **Removed** unneeded mocha packages from bower that are now included



# 1.20.0 (2017-05-11)

* **Added** missing export of `windowUtils` inside `utils` that's exported from `addon/index.js`. Consumers can now import the `windowUtils` without needing to know the   path in the filesystem:
  ```js
  import {utils} from 'ember-frost-core'
  const {windowUtils} = utils
  ``` 
  instead of
  ```js
  import windowUtils from 'ember-frost-core/utils/window'
  ```
 * **Added** `frost-link` test helpers to `addon-test-support`, specifically just a `stubRouteService` helper method to allow consumers of `frost-link` to check the routes passed into it. 
* **Cleaned** up the integration tests for `frost-link` a little. 



# 1.19.1 (2017-05-11)

* **Added** onClick callback for frost-select


# 1.19.0 (2017-05-10)

* **Added** `frost-bookends` component, implementing the pattern used by `ember-frost-modal` for a fixed header/footer with scrolling content in between. Complete with the shadow effect on the header/footer when content is scrolled beneath it. One notable difference between the styling of `frost-bookends` and that of `ember-frost-modal` is the lack of transparency in the footer, with content scrolling beneath it. This was intentional, as directed by UX (@baconC)
* **Refactored** tests for `frost-password` to make them a little DRYer, and added a test (currently only in Chrome) for the feature that maintains selected text across reveal toggles. 


# 1.18.0 (2017-05-04)

* **added** ability to pass specific options to frost-scroll


# 1.17.0 (2017-04-27)

* **Upgraded** to `ember-test-utils@4.x`
* **Upgraded** to `ember-cli-code-coverage@0.3.12` (using a pinned `ember-code-snippet@1.7.0` so as to avoid overwriting `require` and breaking `ember-cli-code-coverage`)
* **Enabled** code coverage gating in PRs. 
* **Added** `onToggle` callback which is called with the new value whenever toggled
* **Deprecated** `onClick` callback, which wasn't handling raw functions very well when going through the event proxy
* **Fixed** [#439](https://github.com/ciena-frost/ember-frost-core/issues/439) Properly handle falsy `trueValue`/`falseValue` when `trueLabel`/`falseLabel` are set


# 1.16.0 (2017-04-27)
- Added secondary labels in select #281 



# 1.15.0 (2017-04-25)
- Consume broccoli-autoprefixer


# 1.14.6 (2017-04-21)
- Bumped ember-elsewhere version

# 1.14.5 (2017-04-21)

* **Fixed** a typo that was introducing exponents in an if statement for no good reason.


# 1.14.4 (2017-04-20)

* **Fixed** a typo that was introducing exponents in an if statement for no good reason.


# 1.14.3 (2017-04-11)
- Fix positioning of `:after` selector in firefox

### Chrome
![screen shot 2017-03-30 at 5 15 54 pm](https://cloud.githubusercontent.com/assets/7063255/24526565/9803c9d0-156c-11e7-84cd-2ce7456a3e0b.png)

![screen shot 2017-03-30 at 5 16 31 pm](https://cloud.githubusercontent.com/assets/7063255/24526576/a393fb6c-156c-11e7-8e5e-4c4ed4d9fc58.png)

### Firefox

<img width="138" alt="screen shot 2017-03-30 at 5 16 52 pm" src="https://cloud.githubusercontent.com/assets/7063255/24526606/b49b185a-156c-11e7-9ddc-0ca8d5f2b097.png">
<img width="144" alt="screen shot 2017-03-30 at 5 16 56 pm" src="https://cloud.githubusercontent.com/assets/7063255/24526605/b49a95f6-156c-11e7-9502-cd1db080b2d1.png">

Closes #224 

# 1.14.2 (2017-04-11)
- Revert changes to reimplement strategy


# 1.14.1 (2017-04-11)
- treeForPublic might not exist, check if it is there before attempting to merge
- Fix logic surrounding fetch request resolved, so load icons based on cached asset map

# 1.14.0 (2017-04-10)
- Resolve icon assets async

# 1.13.0 (2017-04-10)
* **Added** blueprint helper
* **Modified** blueprint to check if package to install already exists


# 1.12.1 (2017-04-10)

* **Fixes** small mem leak by cleaning up event listeners on `frost-select-list`.


# 1.12.0 (2017-03-30)
* adds `width` property to the `frost-select` component interface.  works by explicitly overriding any width/min/max width on that `frost-select` instance to explicitly set a desired width.


# 1.11.2 (2017-03-21)
- Get travis to build to gh-pages
- Update license
- Add CONTRIBUTING.md to .github directory

Closes #409 


# 1.11.1 (2017-03-21)
- Fix tabbing not dismissing dropdown

Closes #388 


# 1.11.0 (2017-03-17)

* **Fixed** #348 - Added info, warning and error icons
* **Modified** dependency to `ember-cli` from `^2.11.0` to `~2.11.0`


# 1.10.0
- Added `debounceInterval` into `frost-select`

# 1.9.8

Fix button shifting when clicked


# 1.9.7

* **Fixed** pr-bumper configuration
* From a previously unpublished PR:
  * **Added** wrapLabels attribute to frost-select, which disables the text trimming for frost-select option labels and allows them to wrap.


# 1.9.6

* **Fixed** a bug causing frost-select's onSelect callback to trigger multiple times after filtering

# 1.9.5

* **Fixed** issues with Firefox and updated CI to test against Firefox as well as Chrome.


# 1.9.4

* **Fixed** performance issues with select by managing more the list items DOM instead of having Ember do so. This results in a lot list DOM manipulations going on which means less reflow.


# 1.9.3

* fix for scroll error in modals.


# 1.9.2

* **Fixed** performance regression in `frost-select` that was introduced when adding text trimming.


# 1.9.1

* **Fixed** build to publish.

# 1.9.0

* **Added** some aria attributes to `frost-select` in order to make it a little bit more accessibility friendly.

* **Updated** testem to use custom reporter for better DX.

* **Updated** linting to leverage new linting tools provided by `ember-test-utils` which gives us the following
output:

  <img width="602" alt="screen shot 2017-02-07 at 10 46 33 pm" src="https://cloud.githubusercontent.com/assets/422902/22726266/70ca4fae-ed87-11e6-9048-ceaae7de790d.png">


# 1.8.3
- css mixin `getComponentName` returns clean className for nested components


# 1.8.2
* **Updated** `ember-spread` from devDependency to a dependency
* **Removed** `ember-spread` from the blueprint


# 1.8.1

* **Updated** integration and unit tests to remove the deprecated use of `describeComponent()`


# 1.8.0

* **Added** ellipsis in middle of select item labels when the text is trimmed instead of at the end as well as show
the full label on mouseover. Prior to this change there was no way to see the full label when it is too wide.

* **Added** new `open()` and `selectItemAtIndex()` test helpers for `frost-select` which can be used like so (in
  example the hook for the select being tested is `mySelect`):

  ```js
  import {
    expectWithState as expectSelectWithState,
    open,
    selectItemAtIndex
  } from 'dummy/tests/helpers/ember-frost-core/frost-select'

  // before below test can run you'd need to render whatever DOM is necessary for your test

  describe('when select opened', function () {
    beforeEach(function () {
      open('mySelect')
    })

    describe('when first item selected', function () {
      beforeEach(function (done) {
        selectItemAtIndex('mySelect', 0, done)
      })

      it('renders as expected', function () {
        expectSelectWithState('mySelect', {
          focused: true,
          opened: false,
          text: 'My first item'
        })
      })
    })
  })
  ```


# 1.7.6

* **Fixed** import path in the `helper-addon` blueprint


# 1.7.5

* **Fixed** bug that relied on Ember prototype extensions in `frost-link` and brought in
`ember-disable-prototype-extensions` to prevent this kind of issue in the future.
* **Upgraded** to Ember 2.11.

# 1.7.4

* Fixed frost-link to support providing text via name properties, positional params or the yield block


# 1.7.3

* in frost text:
* removed null default value for maxLength, since that is propType.number, and the null default isn't needed
* changed null default values to empty string for properties that are propType.string

# 1.7.2

* **Fixed** bug when trying to use `frost-text` with `type="number"`. The error that was occurring was:

  ```
  Uncaught DOMException: Failed to set the 'selectionDirection' property on 'HTMLInputElement': The input element's type ('number') does not support selection.
  ```


# 1.7.1

* **Addedd** missing acceptance tests to visit remaining routes in demo app to ensure all pages continue to load
without issue.
* **Fixed** deprecation warning about modifying property twice in one render (which became an error in Ember 2.10).
* **Fixed** select route in demo.


# 1.7.0

* **Fixed** bug in `frost-link` where text wasn't showing up when using `routes` or `routeNames` options while using
an inline `frost-link`.
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
With the addition of `ember-frost-test` as a dependency, the `ember-frost-core` blueprint must be run when updating to
this version. You can do so with `ember g ember-frost-core`

* **Added** `ember-frost-test` as a dependency
* **Added** `addon-import` base blueprint to be used by future `-addon` blueprints (taken right out of `emberjs`
* **Removed** `component-test` blueprint as it's now provided by `ember-frost-test`
* **Added** `controller` blueprint
* **Added** `helper`, and `helper-addon` blueprints
* **Added** `mixin` blueprint
* **Added** `service` blueprint
* **Added** `util` blueprint

# 1.3.11

* **Enabled** new settings for `ember-prop-types` to throw errors instead of log warnings in tests and dummy app as
well as work with `ember-spread`.
* **Fixed** `ember-prop-type` warnings by adding missing required properties in tests and fixing invalid values in
`getDefaultProps()`.


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

* Performed minor cleanup with `npm run eslint --- --fix` while running latest
[eslint-config-frost-standard](https://github.com/ciena-frost/eslint-config-frost-standard) which includes new rules
from [eslint-plugin-ember-standard](https://github.com/ciena-blueplanet/eslint-plugin-ember-standard) and
[eslint-plugin-ocd](https://github.com/ciena-blueplanet/eslint-plugin-ocd).


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

* Updated frost-link to accept named parameters in addition to position parameters, which unblocks the `spread` use
case



# 1.2.3

* **Added** missing `ember-prop-types: ^3.0.0` to blueprints when installing `ember-frost-core`



# 1.2.2

* **Upgraded** `ember-cli-mocha` which pulls in a newer `ember-mocha` and deprecates `describeComponent` (PR coming in
  the next couple days to refactor our tests accordingly)
* **Fixed** `CssMixin` test to test against a real component defined in the dummy app so that we catch when the
`toString()` format changes.


# 1.2.1

* **Fixed** a bug where the `addon/index.js` had a typo w.r.t. a module name and thus threw an error whenever anyone
tried to import anything directly from `ember-frost-core`.

# 1.2.0

* **Added** `extends` helper to allow adding properties to a pojo (for use with `hookQualifiers`. Will add docs to
  `README.md` in next PR
* **Added** `ehook` helper to allow setting hookQualifiers as a POJO and not just key/value pairs (only useful until
  [this pr](https://github.com/Ticketfly/ember-hook/pull/35) is merged). Will add docs to `README.md` in next PR
* **Added** `CssMixin` - will add docs in `README.md` in next PR
* **Added** `Component` base class `addon/components/frost-component.js` to easily include all desired/required mixins
for our components (`CssMixin`, `HookMixin`, `PropTypesMixin`, and `SpreadMixin` currently).
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
- **UPDATED/ADDED** test suite for frost-button, frost-checkbox, frost-events, frost-icon, frost-link, frost-loading,
frost-password, frost-radio-button, frost-group, frost-scroll, frost-text, frost-textarea, frost-toggle, utils
- **UPDATED** README for frost-button, frost-checkbox, frost-events, frost-icon, frost-link, frost-loading,
frost-password, frost-radio-button, frost-group, frost-scroll, frost-text, frost-textarea, frost-toggle
- **UPDATED/ADDED** demo app for frost-button, frost-checkbox, frost-icon, frost-link, frost-loading, frost-password,
frost-radio-button, frost-group, frost-scroll, frost-text, frost-textarea, frost-toggle
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
* **Removed** `ember-browserify` and `svg4everybody` npm dependencies in favor of including `svg4everybody` via
`vendor` directory.

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
 * **Added** a `component-test` generator which uses `mocha` and `ember-test-utils`. It also sets up `sinon`
 automatically and has a failing test to make developers add a real test.
 * **Added** a `component-addon` generator which does the re-export of a component in the `app` directory, basically
 the same as the default generator, minus the `;` at the end.
 * **Added** a `PULL_REQUEST_TEMPLATE.md` file to help contributors remember to put version-bump comments and
 changelog messages in their PR descriptions.

# 0.30.2

* Updated ember-hook selector for frost-select-dropdown input

# 0.30.1

* **Fixed** `frost-select` to not depend on prototype extensions.

# 0.30.0

* Rewrote `frost-select` from the ground up to make it keyboard friendly and fix all of the issues we have been
having with it. However I kept the same component API so consuming apps should still just work. CSS selectors did
change though which will break any overriding CSS and tests that depend on the old selectors.

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

* **Updated** `frost-select` dropdown to update at 60 fps and stop using `element` property as it causes conflicts in
Ember 2.9 beta 3.

# 0.28.1

* **Added** `frost-select-outlet` and documented it.

# 0.28.0

* **Added** [ember-elsewhere](https://github.com/ef4/ember-elsewhere) as a new dependency.
* **Changed** `frost-select` and `frost-multi-select` to render dropdown elsewhere in the DOM, using
`ember-elsewhere`, in order to make them more flexible.
* **Changed** minimum Ember version from `2.1` to `2.3` since `ember-elsewhere` doesn't appear to work on versions
prior to `2.3`.

# 0.27.4
* select value and prompt is now clearable by setting the 'selectedValue' property to an empty string in the
consuming context

# 0.27.3

* The unselected text in the `frost-select` drop down menu is now a darker color.

# 0.27.2

* Pressing enter to select an item when there is no item hovered will no longer reset the selected value or cause an
error
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

- **Changed** from `ember-lodash` to `ember-lodash-shim`. This means upgrading from `lodash` version `3.x` to version
`4.x` which could impact consumers relying on [things removed](https://github.com/lodash/lodash/wiki/Changelog#v400)
in `lodash` version `4.0.0`.

# 0.20.0

- **Added** Consumers can now use 'hook' attr of core components to enable easier testing with addons like
ember-cli-page-object

# 0.19.2

Fixed how negative indices are handled by frost-select.

# 0.19.1

* **Fixed** components that use `ember-prop-types` to work as expected in integration tests by explicitly consuming
the `ember-prop-types` mixin instead of relying on the initializer which isn't executed in an integration test
environment.

# 0.19.0
The select input widgets now use redux.

# 0.18.1

* **Fixed** `frost-textarea`'s `onInput` handler to propagate change immediately to consumer rather than wait for
another Ember run loop to pass.

# 0.18.0

## Text/Password native event support
- Mapped all available DOM events to Frost events (e.g. focusIn -> onFocusIn) see the demo for a full list
- Event hooks respond with native DOM events instead of {id, value} object, this is still supported as a legacy
usage, but please switch (no way to detect when the legacy attributes are used unfortunately)
- Deprecated `onFocus` (replaced by `onFocusIn`)
- Deprecated `onBlur` (replaced by `onFocusOut`)
- Removed the `excludedEvents` property from the FrostEvents mixin, this is covered automatically when local events
are present

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
 * **Fixes** a bug in `frost-select` where the options popover was closed whenever someone typed into the input (when
   `selectedValue` is passed in as props).
 * **Updated** `eslint` within the project to `3.x`
 * **Added** some linting rules for `mocha` (via an update to `eslint-config-frost-standard`)
 * **Updated** `tests/` directory to no longer specify an `.eslintrc` with `globals` that shouldn't actually be
 globals.

# 0.17.2

Added ember-code-snippets to allow demo documentation to reference the code as the sample text.  Cleaned up the
button demo as an example.

# 0.17.1

Fixed the text clear icon to only append to the DOM on insertion of the text field (was occurring on every
  render/re-render)

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

Reverted a move of component templates from the addon to app directory as this change broke downstream component
extensions

# 0.11.16

* **Fixed** issue with `frost-select` and consumer clearing `selectedValue` but DOM not clearing input.

# 0.11.15

* Cleaned up `frost-select` code to try and make more maintainable.

# 0.11.14

* **Fixed** issue with `isChecked` computed property of `frost-checkbox` being `readOnly`.
* **Updated** `frost-select` to use `ember-prop-types`.

# 0.11.13

* **Added** section comments in components for *dependencies*, *properties*, *computed properties*, *functions*,
*events*, and *actions*.
* **Fixed** bug where disabled text input with text could be cleared as clear icon was present when it shouldn't be.
* **Updated** components to use `ember-computed-decorators`.
* **Updated** `frost-icon` and `frost-link` to use `ember-prop-types`.

# 0.11.12

* **Added** `unit: true` to all unit tests to explicitly mark them as unit tests.
* **Moved** templates to `app/` directory so consumers can override them if they wish.
* Started using destructuring for Ember properties such as `const {Component} = Ember` instead of using
`Ember.Component`.

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

Fixed a broken build when a consuming app doesn't specify an application icon pack and doesn't contain the legacy
`public/svgs` icons path

# 0.11.4

Duplicated the icons in the `frost` icon pack - duplicates now exist in the legacy `frost/<icon>` nested paths and
new `<icon>` flat path.  This allows icons from the `frost` icon pack to be migrated off the deprecated nested
paths. The nested duplicates will be removed in release 1.0.

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

Added the icon pack feature to `frost-icon`, see the documentation at
http://ciena-frost.github.io/ember-frost-core/#/icons for details

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
* **Fixed** `onFocus` properties on components so consumer can process focus events without disrupting original focus
event handlers.

# 0.2.1 (April 13, 2016)

* **Added** support for tabbing into a `frost-checkbox`.
* **Added** `onBlur` property to `frost-checkbox` so consumer can process blur events.

# 0.2.0 (April 13, 2016)

* **Added** `onBlur` property to `frost-password`, `frost-select`, `frost-text`, and `frost-textarea` so consumer can
process blur events.

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
