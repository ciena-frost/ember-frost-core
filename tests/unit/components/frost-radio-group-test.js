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
  'frost-radio-group',
  'Unit: FrostRadioGroupComponent',
  {
    unit: true
  },
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it('includes className frost-radio-group', function () {
      expect(component.classNames).to.include('frost-radio-group')
    })

    it('sets default property values correctly', function () {
      expect(
        component.get('hook'),
        'hook: undefined'
      ).to.be.undefined

      expect(
        component.get('id'),
        'id: null'
      ).to.be.null

      expect(
        component.get('inputs'),
        'inputs: []'
      ).to.be.eql([])

      expect(
        component.get('value'),
        'value: null'
      ).to.be.null

      expect(
        component.get('selectedValue'),
        'selectedValue: undefined'
      ).to.be.undefined
    })

    it('has the expect Mixins', function () {
      expect(
        PropTypeMixin.detect(component),
        'PropTypeMixin Mixin is present'
      ).to.be.true
    })

    describe('"meshedInputs" computed property', function () {
      it('is not set when inputs is not set', function () {
        expect(
          component.get('meshedInputs'),
          '"meshedInputs" is returning an empty list'
        ).to.be.empty
      })

      it('is set when inputs is set', function () {
        const inputs = [{
          value: 'test', label: 'test'
        }]

        run(() => component.set('inputs', inputs))

        expect(
          component.get('meshedInputs')[0].size,
          'default size is set in "meshedInputs"'
        ).to.eq('small')
      })
    })
  }
)
