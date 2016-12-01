/* jshint expr:true */
import { expect } from 'chai'
import Ember from 'ember'
const {
  run
} = Ember
import { describeComponent } from 'ember-mocha'
import PropTypeMixin from 'ember-prop-types'
import {
  beforeEach,
  describe,
  it
} from 'mocha'
import SpreadMixin from 'ember-spread'

describeComponent(
  'frost-radio-button',
  'Unit: FrostRadioButtonComponent',
  {
    unit: true
  },
  function () {
    let component

    beforeEach(function () {
      component = this.subject({
        _setupAssertions: function () {
          return
        },
        value: 'testValue'
      })
    })

    it('includes className frost-radio-button', function () {
      expect(component.classNames).to.include('frost-radio-button')
    })

    it('sets default property values correctly', function () {
      expect(
        component.get('checked'),
        'checked: false'
      ).to.be.false

      expect(
        component.get('disabled'),
        'disabled: false'
      ).to.be.false

      expect(
        component.get('required'),
        'required: false'
      ).to.be.false

      expect(
        component.get('tabindex'),
        'tabindex: 0'
      ).to.eql(0)

      expect(
        component.get('size'),
        'size: small'
      ).to.eql('small')

      expect(
        component.get('groupId'),
        'groupId: null'
      ).to.be.null

      expect(
        component.get('selectedValue'),
        'selectedValue: null'
      ).to.be.null
    })

    it('has the expect Mixins', function () {
      expect(
        PropTypeMixin.detect(component),
        'PropTypeMixin Mixin is present'
      ).to.be.true

      expect(
        SpreadMixin.detect(component),
        'SpreadMixin Mixin is present'
      ).to.be.true
    })

    it('sets dependent keys correctly', function () {
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

      it('is set to true when "selectedValue" is equal to "value"', function () {
        run(() => component.set('selectedValue', selectedValue))

        expect(
          component.get('checked'),
          'checked: true'
        ).to.be.true
      })

      it('is set to false when "selectedValue" is NOT equal to "value"', function () {
        run(() => {
          component.set('selectedValue', selectedValue)
          component.set('value', 'newTestValue')
        })

        expect(
          component.get('checked'),
          'checked: false'
        ).to.be.false
      })
    })

    it('"tabindex" set to "-1" when "disabled" is set to true', function () {
      run(() => component.set('disabled', true))

      expect(
        component.get('tabindex'),
        'tabindex: -1'
      ).to.eql(-1)
    })

    describe('"hook" computed property', function () {
      it('is set when "receivedHook" is not set', function () {
        expect(
          component.get('hook'),
          'hook: -button-my-value'
        ).to.eql('-button')
      })

      it('is set when "receivedHook" is set', function () {
        const receivedHook = 'my-hook'

        run(() => {
          component.set('receivedHook', receivedHook)
        })

        expect(
          component.get('hook'),
          'hook: my-hook-button-my-value'
        ).to.eql(`${receivedHook}-button`)
      })
    })

    describe('"hookQualifiers" computed property', function () {
      it('is empty when "value" is not set', function () {
        run(() => {
          component.set('value', null)
        })

        expect(
          component.get('hookQualifiers'),
          'hookQualifiers: undefined'
        ).to.eql(undefined)
      })

      it('is set when "value" is set', function () {
        const value = 'my-value'

        run(() => component.set('value', value))

        expect(
          component.get('hookQualifiers').value,
          `hookQualifiers: {value: ${value}}`
        ).to.eql(value)
      })
    })

    describe('keyPress', function () {
      it('"onChange" not called when "disabled" is set', function () {
        run(() => {
          component.set('disabled', true)
        })

        const keyPressed = component.keyPress({keyCode: 13})

        expect(
          keyPressed,
          'onChange not called'
        ).to.be.undefined
      })

      it('"onChange" not called when "checked" is set', function () {
        run(() => {
          component.set('checked', true)
        })

        const keyPressed = component.keyPress({keyCode: 13})

        expect(
          keyPressed,
          'onChange not called'
        ).to.be.undefined
      })
    })
  }
)
