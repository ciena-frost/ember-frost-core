/* jshint expr:true */
import { expect } from 'chai'
import { describeComponent } from 'ember-mocha'
import PropTypeMixin from 'ember-prop-types'
import {
  beforeEach,
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

    it('has the expect Mixins', function () {
      expect(
        PropTypeMixin.detect(component),
        'PropTypeMixin Mixin is present'
      ).to.be.true
    })
  }
)
