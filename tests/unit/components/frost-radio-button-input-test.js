/* jshint expr:true */
import {expect} from 'chai'
import Ember from 'ember'
const {run} = Ember
import {describeComponent} from 'ember-mocha'
import PropTypeMixin from 'ember-prop-types'
import FrostEvents from 'ember-frost-core/mixins/frost-events'
import {
  beforeEach,
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
        'checked: false'
      ).to.be.false

      expect(
        component.get('disabled'),
        'disabled: false'
      ).to.be.false

      expect(
        component.get('groupValue'),
        'groupValue: null'
      ).to.be.null

      expect(
        component.get('hook'),
        'hook: undefined'
      ).to.be.undefined

      expect(
        component.get('tagName'),
        'tagName: "input"'
      ).to.eql('input')

      expect(
        component.get('type'),
        'type: "radio"'
      ).to.eql('radio')
    })

    it('has the expected Mixins', function () {
      expect(
        FrostEvents.detect(component),
        'FrostEvents Mixin is present'
      ).to.be.true

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

    it('"checked" set to true when "groupValue" is equal to "value"', function () {
      run(() => component.set('groupValue', 'testValue'))

      expect(
        component.get('checked'),
        'checked: true'
      ).to.be.true
    })
  }
)
