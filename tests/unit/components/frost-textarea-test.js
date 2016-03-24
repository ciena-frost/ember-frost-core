const expect = chai.expect

import {describeComponent} from 'ember-mocha'
import {beforeEach, it} from 'mocha'

describeComponent(
  'frost-textarea',
  'FrostTextareaComponent',
  {},
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it('includes className frost-textarea', function () {
      expect(component.classNames).to.include('frost-textarea')
    })
  }
)
