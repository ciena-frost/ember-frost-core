# ember-frost-checkbox <br />

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
