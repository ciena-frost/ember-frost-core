import {expect} from 'chai'
import Ember from 'ember'
const {run} = Ember
import {describeComponent} from 'ember-mocha'
import PropTypeMixin from 'ember-prop-types'
import {beforeEach, describe, it} from 'mocha'

describeComponent(
  'frost-textarea',
  'Unit: FrostTextareaComponent',
  {
    unit: true
  },
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it('includes className frost-textarea', function () {
      expect(component.classNames).to.include('frost-textarea')
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
        component.get('tabindex'),
        'tabindex: 0'
      ).to.be.eql(0)

      expect(
        component.get('cols'),
        'cols: null'
      ).to.be.null

      expect(
        component.get('rows'),
        'rows: null'
      ).to.be.null

      expect(
        component.get('placeholder'),
        'placeholder: null'
      ).to.be.null

      expect(
        component.get('readonly'),
        'readonly: false'
      ).to.be.false

      expect(
        component.get('wrap'),
        'wrap: soft'
      ).to.be.eql('soft')

      expect(
        component.get('form'),
        'form: null'
      ).to.be.null

      expect(
        component.get('value'),
        'value: null'
      ).to.be.null
    })

    it('has the expect Mixins', function () {
      expect(
        PropTypeMixin.detect(component),
        'PropTypeMixin Mixin is present'
      ).to.be.true
    })

    describe('when onBlur property is omitted', function () {
      beforeEach(function () {
        run(() => {
          component.set('onBlur', undefined)
        })
      })

      it('does not throw an error when onBlur action is triggered', function () {
        expect(function () {
          component.get('actions.onBlur').call(component)
        }).not.to.throw(Error)
      })
    })

    it('sets dependent keys correctly', function () {
      const showClearDependentKeys = [
        'disabled',
        'readonly',
        'value'
      ]

      expect(
        component.showClear._dependentKeys,
        'Dependent keys are correct for showClear()'
      ).to.eql(showClearDependentKeys)
    })

    describe('"showClear" computed property', function () {
      it('is set to "true" when disabled=false, value exists and readonly=false', function () {
        const disabled = false
        const value = 'value'
        const readonly = false

        run(() => {
          component.set('disabled', disabled)
          component.set('value', value)
          component.set('readonly', readonly)
        })

        expect(
          component.get('showClear'),
          'showClear: true'
        ).to.be.true
      })

      it('is set to "false" when disabled=true, value exists and readonly=false', function () {
        const disabled = true
        const value = 'value'
        const readonly = false

        run(() => {
          component.set('disabled', disabled)
          component.set('value', value)
          component.set('readonly', readonly)
        })

        expect(
          component.get('showClear'),
          'showClear: false'
        ).to.be.false
      })

      it('is set to "false" when disabled=false, value does not exist and readonly=false', function () {
        const disabled = false
        const readonly = false

        run(() => {
          component.set('disabled', disabled)
          component.set('readonly', readonly)
        })

        expect(
          component.get('showClear'),
          'showClear: false'
        ).to.be.false
      })

      it('is set to "false" when disabled=true, value does not exist and readonly=false', function () {
        const disabled = true
        const readonly = false

        run(() => {
          component.set('disabled', disabled)
          component.set('readonly', readonly)
        })

        expect(
          component.get('showClear'),
          'showClear: false'
        ).to.be.false
      })

      it('is set to "false" when disabled=true, value does not exist and readonly=true', function () {
        const disabled = true
        const readonly = true

        run(() => {
          component.set('disabled', disabled)
          component.set('readonly', readonly)
        })

        expect(
          component.get('showClear'),
          'showClear: false'
        ).to.be.false
      })

      it('is set to "false" when disabled=true, value exists and readonly=true', function () {
        const disabled = true
        const value = 'value'
        const readonly = true

        run(() => {
          component.set('disabled', disabled)
          component.set('value', value)
          component.set('readonly', readonly)
        })

        expect(
          component.get('showClear'),
          'showClear: false'
        ).to.be.false
      })

      it('is set to "false" when disabled=false, value does not exist and readonly=true', function () {
        const disabled = false
        const readonly = true

        run(() => {
          component.set('disabled', disabled)
          component.set('readonly', readonly)
        })

        expect(
          component.get('showClear'),
          'showClear: false'
        ).to.be.false
      })

      it('is set to "false" when disabled=false, value exists and readonly=true', function () {
        const disabled = false
        const value = 'value'
        const readonly = true

        run(() => {
          component.set('disabled', disabled)
          component.set('value', value)
          component.set('readonly', readonly)
        })

        expect(
          component.get('showClear'),
          'showClear: false'
        ).to.be.false
      })
    })
  }
)
