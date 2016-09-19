import {expect} from 'chai'
import Ember from 'ember'
const {run} = Ember
import {describeComponent} from 'ember-mocha'
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
      ).to.equal(0)
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

    it('passes tabindex to the underlying field', function () {
      component.set('tabindex', -1)
      expect(
        component.tabindex,
        'tabindex: -1'
      ).to.equal(-1)

      expect(
        this.$('textarea').prop('tabindex'),
        'tabindex: -1'
      ).to.equal(-1)
    })

    describe('"showClear" computed property', function () {
      it('is set to "true" when "disabled" is set to false and "value" exist', function () {
        const disabled = false
        const value = "value"

        run(() => {
          component.set('disabled', disabled)
          component.set('value', value)
        })

        expect(
          component.get('showClear'),
          'showClear: true'
        ).to.be.true
      })

      it('is set to "false" when "disabled" is set to true and "value" exist', function () {
        const disabled = true
        const value = "value"

        run(() => {
          component.set('disabled', disabled)
          component.set('value', value)
        })

        expect(
          component.get('showClear'),
          'showClear: false'
        ).to.be.false
      })
      
      it('is set to "false" when "disabled" is set to false and "value" deos not exist', function () {
        const disabled = false
        
        run(() => {
          component.set('disabled', disabled)
        })

        expect(
          component.get('showClear'),
          'showClear: false'
        ).to.be.false
      })

      it('is set to "false" when "disabled" is set to true and "value" deos not exist', function () {
        const disabled = true
        
        run(() => {
          component.set('disabled', disabled)
        })

        expect(
          component.get('showClear'),
          'showClear: false'
        ).to.be.false
      })
    })
  }
)