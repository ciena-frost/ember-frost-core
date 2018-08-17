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

  describe('focus out component', function () {
    it('should clear filter when nothing selected', function () {
      component.setProperties({
        opened: true,
        focused: true,
        filter: 'Spiderman'
      })
      component.trigger('focusOut')
      expect(component.getProperties('focused', 'filter', 'opened')).to.deep.equal({
        focused: false,
        filter: '',
        opened: false
      })
    })

    it('should clear filter and item selected when backspaced all the way', function () {
      component.setProperties({
        opened: true,
        focused: true,
        filter: '',
        internalSelectedItem: {label: 'Spiderman', value: 'Peter Parker'},
        selectedValue: {label: 'Spiderman', value: 'Peter Parker'}
      })

      component.trigger('focusOut')

      expect(component.getProperties('focused', 'filter', 'opened', 'internalSelectedItem')).to.deep.equal({
        focused: false,
        filter: '',
        opened: false,
        internalSelectedItem: undefined
      })
    })

    it('should set filter to item selected when changed but not select', function () {
      component.setProperties({
        filter: 'Spider',
        internalSelectedItem: {label: 'Spiderman', value: 'Peter Parker'}
      })
      component.trigger('focusOut')

      expect(component.getProperties('focused', 'filter', 'opened', 'internalSelectedItem')).to.deep.equal({
        focused: false,
        filter: 'Spiderman',
        opened: false,
        internalSelectedItem: {label: 'Spiderman', value: 'Peter Parker'}
      })
    })
  })
})
