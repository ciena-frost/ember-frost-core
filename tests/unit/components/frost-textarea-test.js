import {expect} from 'chai'
import Ember from 'ember'
const {run} = Ember
import FrostEventsProxy from 'ember-frost-core/mixins/frost-events-proxy'
import {describeComponent} from 'ember-mocha'
import PropTypeMixin from 'ember-prop-types'
import {beforeEach, describe, it} from 'mocha'
import SpreadMixin from 'ember-spread'

describeComponent(
  'frost-textarea',
  'Unit: FrostTextAreaComponent',
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
      ).to.equal(false)

      expect(
        component.get('cols'),
        'cols: null'
      ).to.equal(null)

      expect(
        component.get('disabled'),
        'disabled: false'
      ).to.equal(false)

      expect(
        component.get('form'),
        'form: null'
      ).to.equal(null)

      expect(
        component.get('isClearEnabled'),
        'isClearEnabled: false'
      ).to.equal(false)

      expect(
        component.get('isClearVisible'),
        'isClearVisible: false'
      ).to.equal(false)

      expect(
        component.get('placeholder'),
        'placeholder: null'
      ).to.equal(null)

      expect(
        component.get('readonly'),
        'readonly: false'
      ).to.equal(false)

      expect(
        component.get('rows'),
        'rows: null'
      ).to.equal(null)

      expect(
        component.get('tabindex'),
        'tabindex: 0'
      ).to.be.eql(0)

      expect(
        component.get('value'),
        'value: null'
      ).to.equal(null)

      expect(
        component.get('wrap'),
        'wrap: soft'
      ).to.be.eql('soft')
    })

    it('has the expect Mixins', function () {
      expect(
        PropTypeMixin.detect(component),
        'PropTypeMixin Mixin is present'
      ).to.equal(true)

      expect(
        FrostEventsProxy.detect(component),
        'FrostEventsProxy is present'
      ).to.equal(true)

      expect(
        SpreadMixin.detect(component),
        'SpreadMixin Mixin is present'
      ).to.equal(true)
    })

    describe('when keyUp property is omitted', function () {
      beforeEach(function () {
        run(() => component.set('keyUp', undefined))
      })

      it('does not throw an error when keyUp action is triggered', function () {
        expect(
          function () {
            component.get('actions.keyUp').call(component)
          },
          'error not triggered by keyup()'
        ).not.to.throw(Error)
      })
    })
  }
)
