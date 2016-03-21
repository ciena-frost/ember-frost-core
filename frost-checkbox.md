[ci-img]: https://img.shields.io/travis/ciena-frost/ember-frost-checkbox.svg "Travis CI Build Status"
[ci-url]: https://travis-ci.org/ciena-frost/ember-frost-checkbox

[cov-img]: https://img.shields.io/coveralls/ciena-frost/ember-frost-checkbox.svg "Coveralls Code Coverage"
[cov-url]: https://coveralls.io/github/ciena-frost/ember-frost-checkbox

[npm-img]: https://img.shields.io/npm/v/ember-frost-checkbox.svg "NPM Version"
[npm-url]: https://www.npmjs.com/package/ember-frost-checkbox

# ember-frost-checkbox <br /> [![Travis][ci-img]][ci-url] [![Coveralls][cov-img]][cov-url] [![NPM][npm-img]][npm-url]

 * [Installation](#installation)
 * [API](#api)
 * [Examples](#examples)
 * [Development](#development)

## Installation
```
ember install ember-frost-checkbox
```

## API

| Attribute   | Type | Value | Description |
| ----------- | ---- | ----- | ----------- |
| `onInput`   |`string` | `<action-name>` | The action callback to call when the value of the checkbox changes as the user clicks |

## Examples

```
{{#frost-checkbox
  id='myCheckbox'
  onInput=(action 'value')}}My checkbox
{{/frost-checkbox}}
```

```javascript
value (attrs) {
  console.log(attrs.id + ' - ' + attrs.value)
}
```

## Development
### Setup
```
git clone git@github.com:ciena-frost/ember-frost-checkbox.git
cd ember-frost-checkbox
npm install && bower install
```

### Development Server
A dummy application for development is available under `ember-frost-checkbox/tests/dummy`.
To run the server run `ember server` (or `npm start`) from the root of the repository and
visit the app at http://localhost:4200.

### Testing
Run `npm test` from the root of the project to run linting checks as well as execute the test suite
and output code coverage.
