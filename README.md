# ember-frost-core

[![Travis][ci-img]][ci-url] [![Coveralls][cov-img]][cov-url] [![NPM][npm-img]][npm-url] ![Ember][ember-img]

 * [Installation](#installation)
 * [Components](#components)
 * [Contributing](#contributing)

## Installation

```bash
ember install ember-frost-core
```

## Components

The following components are available when you install ember-frost-core

* [frost-bookends](docs/frost-bookends.md)
* [frost-button](docs/frost-button.md)
* [frost-checkbox](docs/frost-checkbox.md)
* [frost-expand](docs/frost-expand.md)
* [frost-theme](docs/frost-css.md)
* [frost-icon](docs/frost-icons.md)
* [frost-link](docs/frost-link.md)
* [frost-loading](docs/frost-loading.md)
* [frost-password](docs/frost-password.md)
* [frost-radio-group](docs/frost-radio.md)
* [frost-scroll](docs/frost-scroll.md)
* [frost-select](docs/frost-select.md)
* [frost-text](docs/frost-text.md)
* [frost-textarea](docs/frost-textarea.md)
* [frost-toggle](docs/frost-toggle.md)

## Development

### Setup

```bash
git clone git@github.com:ciena-frost/ember-frost-core.git
cd ember-frost-core
npm install ember-cli-sass && npm install --ignore-scripts && bower install
```

### Development Server

A dummy application for development is available under `ember-frost-core/tests/dummy`.
To run the server run `ember server` (or `npm start`) from the root of the repository and
visit the app at http://localhost:4200.

### Testing

Run `npm test` from the root of the project to run linting checks as well as execute the test suite
and output code coverage.

### Test Helpers


The following test helpers are provided at `ember-frost-core/test-support/<frost-component-name|utils>` to assist with writing tests for code that uses frost components:

* [frost-button](addon-test-support/frost-button.js)
* [frost-select](addon-test-support/frost-select.js)
* [frost-text](addon-test-support/frost-text.js)
* [utils](addon-test-support/utils.js)

[ci-img]: https://img.shields.io/travis/ciena-frost/ember-frost-core.svg "Travis CI Build Status"
[ci-url]: https://travis-ci.org/ciena-frost/ember-frost-core
[cov-img]: https://img.shields.io/coveralls/ciena-frost/ember-frost-core.svg "Coveralls Code Coverage"
[cov-url]: https://coveralls.io/github/ciena-frost/ember-frost-core
[ember-img]: https://img.shields.io/badge/ember-2.4+-green.svg "Ember 2.4+"
[npm-img]: https://img.shields.io/npm/v/ember-frost-core.svg "NPM Version"
[npm-url]: https://www.npmjs.com/package/ember-frost-core
