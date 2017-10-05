import {run} from '@ember/runloop'
import {expect} from 'chai'
import Component from 'ember-frost-core/components/frost-component'
import {unit} from 'ember-test-utils/test-support/setup-component-test'
import {beforeEach, describe, it} from 'mocha'

const test = unit('frost-radio-group')
describe(test.label, function () {
  test.setup()

  let component

  beforeEach(function () {
    component = this.subject({
      hook: 'myRadioGroup'
    })
  })

  it('should set default property values correctly', function () {
    expect(
      component.get('inputs'),
      'inputs: []'
    ).to.be.eql([])

    expect(
      component.get('value'),
      'value: null'
    ).to.equal(null)
  })

  it('should extend the commone frost component', function () {
    expect(
      component instanceof Component,
      'is instance of Frost Component'
    ).to.equal(true)
  })

  describe('"meshedInputs" computed property', function () {
    it('should not be set when inputs is not set', function () {
      expect(
        component.get('meshedInputs'),
        '"meshedInputs" is returning an empty list'
      ).to.eql([])
    })

    it('should be set when inputs is set', function () {
      const inputs = [{
        value: 'test', label: 'test'
      }]

      run(() => component.set('inputs', inputs))

      expect(
        component.get('meshedInputs')[0].size,
        'default size is set in "meshedInputs"'
      ).to.eq('small')
    })
  })
})
