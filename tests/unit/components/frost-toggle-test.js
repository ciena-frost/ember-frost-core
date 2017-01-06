import {expect} from 'chai'
import Ember from 'ember'
const {run} = Ember
import Component from 'ember-frost-core/components/frost-component'
import FrostEventsProxy from 'ember-frost-core/mixins/frost-events-proxy'
import * as utils from 'ember-frost-core/utils'
import {describeComponent} from 'ember-mocha'
import {beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

describeComponent(
  'frost-toggle',
  'Unit: FrostToggleComponent',
  {
    unit: true
  },
  function () {
    let component

    beforeEach(function () {
      component = this.subject({
        _setupAssertion: function () {},
        hook: 'myToggle'
      })
    })

    it('sets default property values correctly', function () {
      expect(
        component.get('disabled'),
        'disabled: false'
      ).to.equal(false)

      expect(
        component.get('_trueLabel'),
        '_trueLabel: true'
      ).to.equal(true)

      expect(
        component.get('_falseLabel'),
        '_falseLabel: false'
      ).to.equal(false)

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

    it('extends the commone frost component', function () {
      expect(
        component instanceof Component,
        'is instance of Frost Component'
      ).to.equal(true)
    })

    it('has the expected Mixins', function () {
      expect(
        FrostEventsProxy.detect(component),
        'FrostEventsProxy Mixin is present'
      ).to.equal(true)
    })

    describe('_preferBoolean()', function () {
      it('returns boolean true when passed string "true"', function () {
        expect(
          component._preferBoolean('true'),
          'returned boolean true'
        ).to.equal(true)
      })

      it('returns boolean false when passed string "false"', function () {
        expect(
          component._preferBoolean('false'),
          'returned boolean false'
        ).to.equal(false)
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
        ).to.equal(true)
      })

      it('returns false when value is toggled off', function () {
        run(() => {
          component.set('_trueValue', 'testValueOn')
          component.set('value', 'testValueOff')
        })

        expect(
          component.get('_isToggled'),
          '_isToggled returns false'
        ).to.equal(false)
      })
    })

    describe('_changeTarget()', function () {
      it('sets toggled state to "false"', function () {
        const cloneEventStub = sinon.stub(utils, 'cloneEvent').returns({
          target: {value: null}
        })

        run(() => {
          component.set('_trueValue', 'testValueOn')
          component.set('value', 'testValueOn')
          component.set('_falseValue', 'testValueOff')
        })

        expect(
          component._changeTarget({}, {}),
          'target object is set to "false" toggled state'
        ).to.eql({
          target: {
            state: false,
            value: 'testValueOff'
          }
        })

        expect(
          cloneEventStub.called,
          'cloneEvent() method is called'
        ).to.equal(true)

        utils.cloneEvent.restore()
      })

      it('sets toggled state to "true"', function () {
        sinon.stub(utils, 'cloneEvent').returns({
          target: {value: null}
        })

        run(() => {
          component.set('_trueValue', 'testValueOn')
          component.set('value', 'testValueOff')
          component.set('_falseValue', 'testValueOff')
        })

        expect(
          component._changeTarget({}, {}),
          'target object is set to "true" toggled state'
        ).to.eql({
          target: {
            state: true,
            value: 'testValueOn'
          }
        })
        utils.cloneEvent.restore()
      })
    })
  }
)
