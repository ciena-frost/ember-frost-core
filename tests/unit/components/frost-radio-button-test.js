import {expect} from 'chai'
import Ember from 'ember'
const {run} = Ember
import Component from 'ember-frost-core/components/frost-component'
import {unit} from 'ember-test-utils/test-support/setup-component-test'
import {beforeEach, describe, it} from 'mocha'

const test = unit('frost-radio-button')
describe(test.label, function () {
  test.setup()

  let component

  beforeEach(function () {
    component = this.subject({
      _setupAssertions: function () {},
      hook: 'myRadioButton',
      value: 'testValue'
    })
  })

  it('should set default property values correctly', function () {
    expect(
      component.get('checked'),
      'checked: false'
    ).to.equal(false)

    expect(
      component.get('disabled'),
      'disabled: false'
    ).to.equal(false)

    expect(
      component.get('required'),
      'required: false'
    ).to.equal(false)

    expect(
      component.get('tabindex'),
      'tabindex: 0'
    ).to.eql(0)

    expect(
      component.get('size'),
      'size: small'
    ).to.eql('small')
  })

  it('should extend the commone frost component', function () {
    expect(
      component instanceof Component,
      'is instance of Frost Component'
    ).to.equal(true)
  })

  it('should set dependent keys correctly', function () {
    const checkedDependentKeys = [
      'selectedValue',
      'value'
    ]

    const tabindexDependentKeys = [
      'disabled'
    ]

    expect(
      component.checked._dependentKeys,
      'Dependent keys are correct for checked()'
    ).to.eql(checkedDependentKeys)

    expect(
      component.tabindex._dependentKeys,
      'Dependent keys are correct for tabindex()'
    ).to.eql(tabindexDependentKeys)
  })

  describe('"checked" computed property', function () {
    const selectedValue = 'testValue'

    it('should set to true when "selectedValue" is equal to "value"', function () {
      run(() => component.set('selectedValue', selectedValue))

      expect(
        component.get('checked'),
        'checked: true'
      ).to.equal(true)
    })

    it('should set to false when "selectedValue" is NOT equal to "value"', function () {
      run(() => {
        component.set('selectedValue', selectedValue)
        component.set('value', 'newTestValue')
      })

      expect(
        component.get('checked'),
        'checked: false'
      ).to.equal(false)
    })
  })

  it('should "tabindex" set to "-1" when "disabled" is set to true', function () {
    run(() => component.set('disabled', true))

    expect(
      component.get('tabindex'),
      'tabindex: -1'
    ).to.eql(-1)
  })

  describe('"hookQualifiers" computed property', function () {
    it('should set when "value" is set', function () {
      const value = 'my-value'

      run(() => component.set('value', value))

      expect(
        component.get('hookQualifiers').value,
        `hookQualifiers: {value: ${value}}`
      ).to.eql(value)
    })
  })

  describe('keyPress', function () {
    it('should "onChange" not called when "disabled" is set', function () {
      run(() => {
        component.set('disabled', true)
      })

      const keyPressed = component.keyPress({keyCode: 13})

      expect(
        keyPressed,
        'onChange not called'
      ).to.equal(undefined)
    })

    it('should "onChange" not called when "checked" is set', function () {
      run(() => {
        component.set('checked', true)
      })

      const keyPressed = component.keyPress({keyCode: 13})

      expect(
        keyPressed,
        'onChange not called'
      ).to.equal(undefined)
    })
  })
})
