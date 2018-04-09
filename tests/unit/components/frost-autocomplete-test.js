import {expect} from 'chai'
import {unit} from 'ember-test-utils/test-support/setup-component-test'
import {beforeEach, describe, it} from 'mocha'

const test = unit('frost-autocomplete')
describe(test.label, function () {
  test.setup()

  let component

  beforeEach(function () {
    component = this.subject({
      hook: 'myAutocomplete'
    })
  })

  it('should not set focused index with no items', function () {
    const focusedIndex = component.get('focusedIndex')
    component._setFocusedIndex(true)
    expect(focusedIndex).to.equal(component.get('focusedIndex'))
  })

  it('should not set focused index with no items', function () {
    component.get('items')
    expect(component.get('items').length).to.equal(0)
  })
})
