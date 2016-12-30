import {expect} from 'chai'
import Component from 'ember-frost-core/components/frost-component'
import {describeComponent} from 'ember-mocha'
import {
  beforeEach,
  it
} from 'mocha'

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

    it('sets default property values correctly', function () {
      expect(
        component.get('type'),
        'type: "ripple"'
      ).to.eql('ripple')
    })

    it('extends the commone frost component', function () {
      expect(
        component instanceof Component,
        'is instance of Frost Component'
      ).to.equal(true)
    })
  }
)
