import {expect} from 'chai'
import {describeComponent} from 'ember-mocha'
import {
  beforeEach,
  it
} from 'mocha'
import PropTypeMixin from 'ember-prop-types'
import SpreadMixin from 'ember-spread'

describeComponent(
  'frost-loading',
  'Unit: FrostLoadingComponent',
  {
    unit: true
  },
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it('includes className frost-loading', function () {
      expect(component.classNames).to.include('frost-loading')
    })

    it('sets default property values correctly', function () {
      expect(
        component.get('type'),
        'type: "ripple"'
      ).to.eql('ripple')
    })

    it('has the expected Mixins', function () {
      expect(
        PropTypeMixin.detect(component),
        'PropTypeMixin Mixin is present'
      ).to.be.true

      expect(
        SpreadMixin.detect(component),
        'SpreadMixin Mixin is present'
      ).to.be.true
    })
  }
)
