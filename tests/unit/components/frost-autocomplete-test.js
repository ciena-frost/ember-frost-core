import {expect} from 'chai'
import wait from 'ember-test-helpers/wait'
import {unit} from 'ember-test-utils/test-support/setup-component-test'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

const test = unit('frost-autocomplete')
describe(test.label, function () {
  test.setup()

  let component, sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    component = this.subject({
      hook: 'myAutocomplete'
    })
  })

  afterEach(function () {
    sandbox.restore()
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

  describe('runNext', function () {
    let functionSpy = sinon.spy()

    beforeEach(function () {
      functionSpy.reset()
      component._runNext(functionSpy)
      return wait()
    })

    it('should be able to runNext', function () {
      expect(functionSpy.called, 'functionSpy() was called').to.equal(true)
    })
  })
})
