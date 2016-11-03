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
        component.get('hook'),
        'hook: undefined'
      ).to.be.undefined

      expect(
        component.get('size'),
        'size: small'
      ).to.eql('small')
    })

    it('has the expect Mixins', function () {
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

      const groupIdDependentKeys = [
        'parentView.id'
      ]

      const groupValueDependentKeys = [
        'parentView.value'
      ]

      const onChangeDependentKeys = [
        'parentView.onChange'
      ]

      const tabindexDependentKeys = [
        'disabled'
      ]

      expect(
        component.checked._dependentKeys,
        'Dependent keys are correct for checked()'
      ).to.eql(checkedDependentKeys)

      expect(
        component.groupId._dependentKeys,
        'Dependent keys are correct for groupId()'
      ).to.eql(groupIdDependentKeys)

      expect(
        component.groupValue._dependentKeys,
        'Dependent keys are correct for groupValue()'
      ).to.eql(groupValueDependentKeys)

      expect(
        component.onChange._dependentKeys,
        'Dependent keys are correct for onChange()'
      ).to.eql(onChangeDependentKeys)

      expect(
        component.tabindex._dependentKeys,
        'Dependent keys are correct for tabindex()'
      ).to.eql(tabindexDependentKeys)
    })

    describe('"checked" computed property', function () {
      const parentView = Ember.Object.create({
        'value': 'testValue'
      })

      it('is set to true when "groupValue" is equal to "value"', function () {
        run(() => component.set('parentView', parentView))

        expect(
          component.get('checked'),
          'checked: true'
        ).to.be.true
      })

      it('is set to false when "groupValue" is NOT equal to "value"', function () {
        run(() => {
          component.set('parentView', parentView)
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
  }
)
