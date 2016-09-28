/* jshint expr:true */
import {expect} from 'chai'
import Ember from 'ember'
const {run} = Ember
import {describeComponent} from 'ember-mocha'
import PropTypeMixin from 'ember-prop-types'
import {
  beforeEach,
  describe,
  it
} from 'mocha'

describeComponent(
  'frost-radio-button-input',
  'Unit: FrostRadioButtonInputComponent',
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

    it('includes className frost-radio-button-input', function () {
      expect(component.classNames).to.include('frost-radio-button-input')
    })

    it('sets default property values correctly', function () {
      expect(
        component.get('checked'),
        'checked: "false"'
      ).to.be.false

      expect(
        component.get('disabled'),
        'disabled: "false"'
      ).to.be.false

      expect(
        component.get('groupValue'),
        'groupValue: null'
      ).to.be.null

      expect(
        component.get('hook'),
        'hook: "undefined"'
      ).to.be.undefined

      expect(
        component.get('tagName'),
        'tagName: input'
      ).to.eql('input')

      expect(
        component.get('type'),
        'type: radio'
      ).to.eql('radio')

      expect(
        component.get('value'),
        'value: testValue'
      ).to.eql('testValue')
    })

    it('has the expected Mixins', function () {
      expect(
        PropTypeMixin.detect(component),
        'PropTypeMixin Mixin is present'
      ).to.be.true
    })

    it('sets dependent keys correctly', function () {
      const checkedDependentKeys = [
        'groupValue',
        'value'
      ]

      expect(
        component.checked._dependentKeys,
        'Dependent keys are correct for checked()'
      ).to.eql(checkedDependentKeys)
    })

    describe('"checked" computed property', function () {
      it('is set to true when "groupValue" is equal to "value"', function () {
        const groupValue = 'testValue'

        run(() => component.set('groupValue', groupValue))

        expect(
          component.get('checked'),
          'checked: true'
        ).to.be.true
      })

      it('is set to false when "groupValue" is NOT equal to "value"', function () {
        const groupValue = 'differentTestValue'

        run(() => component.set('groupValue', groupValue))

        expect(
          component.get('checked'),
          'checked: false'
        ).to.be.false
      })
    })
  }
)
