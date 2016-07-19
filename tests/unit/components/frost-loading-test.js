import {expect} from 'chai'
import {describeComponent} from 'ember-mocha'
import {beforeEach, it} from 'mocha'

describeComponent(
  'frost-loading',
  'FrostLoadingComponent',
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
  }
)
