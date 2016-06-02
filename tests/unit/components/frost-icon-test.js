const expect = chai.expect

import {describeComponent} from 'ember-mocha'
import {beforeEach, it} from 'mocha'

describeComponent(
  'frost-icon',
  'FrostIconComponent',
  {},
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it('does not wrap template with element', function () {
      expect(component.tagName).to.equal('svg')
    })
  }
)
