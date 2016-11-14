import {expect} from 'chai'
import Ember from 'ember'
const {run} = Ember
import FrostEventsProxy from 'ember-frost-core/mixins/frost-events-proxy'
import {describeComponent} from 'ember-mocha'
import PropTypeMixin from 'ember-prop-types'
import {
  beforeEach,
  describe,
  it
} from 'mocha'

describeComponent(
  'frost-toggle',
  'Unit: FrostToggleComponent',
  {
    unit: true
  },
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it('includes className frost-toggle', function () {
      expect(component.classNames).to.include('frost-toggle')
    })

    it('sets default property values correctly', function () {
      expect(
        component.get('autofocus'),
        'autofocus: false'
      ).to.be.false

      expect(
        component.get('disabled'),
        'disabled: false'
      ).to.be.false

      expect(
        component.get('_trueLabel'),
        '_trueLabel: true'
      ).to.be.true

      expect(
        component.get('_falseLabel'),
        '_falseLabel: false'
      ).to.be.false

      expect(
        component.get('hook'),
        'hook: "undefined"'
      ).to.be.undefined

      expect(
        component.get('size'),
        'size: "undefined"'
      ).to.eql('medium')
    })

    it('sets dependent keys correctly', function () {
      const _trueValueDependentKeys = [
        'trueValue',
        '_trueLabel'
      ]

      const _falseValueDependentKeys = [
        'falseValue',
        '_falseLabel'
      ]

      const _isToggledDependentKeys = [
        'value'
      ]

      expect(
        component._trueValue._dependentKeys,
        'Dependent keys are correct for _trueValue()'
      ).to.eql(_trueValueDependentKeys)

      expect(
        component._falseValue._dependentKeys,
        'Dependent keys are correct for _falseValue()'
      ).to.eql(_falseValueDependentKeys)

      expect(
        component._isToggled._dependentKeys,
        'Dependent keys are correct for _isToggled()'
      ).to.eql(_isToggledDependentKeys)
    })

    it('has the expected Mixins', function () {
      expect(
        PropTypeMixin.detect(component),
        'PropTypeMixin Mixin is present'
      ).to.be.true

      expect(
        FrostEventsProxy.detect(component),
        'FrostEventsProxy Mixin is present'
      ).to.be.true
    })

    describe('_preferBoolean()', function () {
      it('returns boolean true when passed string "true"', function () {
        expect(
          component._preferBoolean('true'),
          'returned boolean true'
        ).to.be.true
      })

      it('returns boolean false when passed string "false"', function () {
        expect(
          component._preferBoolean('false'),
          'returned boolean false'
        ).to.be.false
      })

      it('returns value passed when not string "false" or "true"', function () {
        expect(
          component._preferBoolean('test'),
          'passed value is returned'
        ).to.eql('test')
      })
    })

    describe('_trueValue computed property', function () {
      it('returns "trueValue" when set', function () {
        run(() => component.set('trueValue', 'testValue'))

        expect(
          component.get('_trueValue'),
          '_trueValue successfully set to trueValue'
        ).to.eql('testValue')
      })

      it('returns "_trueLabel" when set', function () {
        run(() => component.set('_trueLabel', 'testLabel'))

        expect(
          component.get('_trueLabel'),
          '_trueValue successfully set to _trueLabel'
        ).to.eql('testLabel')
      })
    })

    describe('_falseValue computed property', function () {
      it('returns "falseValue" when set', function () {
        run(() => component.set('falseValue', 'testValue'))

        expect(
          component.get('_falseValue'),
          '_falseValue successfully set to falseValue'
        ).to.eql('testValue')
      })

      it('returns "_falseLabel" when set', function () {
        run(() => component.set('_falseLabel', 'testLabel'))

        expect(
          component.get('_falseValue'),
          '_falseValue successfully set to _falseLabel'
        ).to.eql('testLabel')
      })
    })

    describe('_isToggled computed property', function () {
      it('returns true when value is toggled on', function () {
        run(() => {
          component.set('_trueValue', 'testValueOn')
          component.set('value', 'testValueOn')
        })

        expect(
          component.get('_isToggled'),
          '_isToggled returns true'
        ).to.be.true
      })

      it('returns false when value is toggled off', function () {
        run(() => {
          component.set('_trueValue', 'testValueOn')
          component.set('value', 'testValueOff')
        })

        expect(
          component.get('_isToggled'),
          '_isToggled returns false'
        ).to.be.false
      })
    })
  }
)
