[ci-img]: https://img.shields.io/travis/ciena-frost/ember-frost-textarea.svg "Travis CI Build Status"
[ci-url]: https://travis-ci.org/ciena-frost/ember-frost-textarea

[cov-img]: https://img.shields.io/coveralls/ciena-frost/ember-frost-textarea.svg "Coveralls Code Coverage"
[cov-url]: https://coveralls.io/github/ciena-frost/ember-frost-textarea

[npm-img]: https://img.shields.io/npm/v/ember-frost-textarea.svg "NPM Version"
[npm-url]: https://www.npmjs.com/package/ember-frost-textarea

[![Travis][ci-img]][ci-url] [![Coveralls][cov-img]][cov-url] [![NPM][npm-img]][npm-url]

# ember-frost-textarea
the drop-down select widget to rule them all

 * [Installation](#Installation)
 * [API](#API)
 * [Examples](#Examples)
 * [Contributing](#Contributing)

## Installation
```
ember install ember-frost-textarea
```

## API
| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `autofocus` | `boolean` |`true`| puts autofocus on the object |
|  |  |`false`| ***default***|
| `classNameBindings` | `string` |`error`| shows the object in error state |
| `disabled` | `boolean` |`true`| shows the object as disabled |
|  |  |`false`| ***default***|
| `readonly` | `boolean` |`true`| object is not editable |
|  |  |`false`| ***default***|
| `cols` | `integer` |`<num-of-cols>`| specifies the number of columns for the object |
| `rows` | `integer` |`<num-of-rows>`| specifies the number of rows for the object |
| `value` | `string` |`<textarea-text>`| default string that the object will display |
| `onInput` | `string` |`<action-name>`| triggers associated action when text is entered |

## Examples
### autofocus
```handlebars
{{frost-textarea id='basic' autofocus=true}}
```

### classNameBindings - error
```handlebars
{{frost-textarea id='error' classNameBindings='error'}}
```

### disabled
```handlebars
{{frost-textarea id='disabled' disabled=true}}
```

### readonly and value
```handlebars
{{frost-textarea id='read-only' readonly=true value='Read only textarea'}}
```

### cols and rows
```handlebars
{{frost-textarea id='columns-rows' cols='80' rows='6'}}
```

### onInput
```handlebars
{{frost-textarea id='action' onInput=(action 'update')}}
```

## Development
### Setup
```
git clone git@github.com:ciena-frost/ember-frost-textarea.git
cd ember-frost-textarea
npm install && bower install
```

### Development Server
A dummy application for development is available under `ember-frost-textarea/tests/dummy`.
To run the server run `ember server` (or `npm start`) from the root of the repository and
visit the app at http://localhost:4200.

### Testing
Run `npm test` from the root of the project to run linting checks as well as execute the test suite
and output code coverage.
