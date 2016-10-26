import {expect} from 'chai'
import sinon from 'sinon'
import {describeComponent} from 'ember-mocha'
import {afterEach, beforeEach, it} from 'mocha'

describeComponent(
  'frost-text',
  'FrostTextComponent', {
    unit: true
  },
  function () {
    let component, sandbox

    beforeEach(function () {
      component = this.subject()
      sandbox = sinon.sandbox.create()
    })

    afterEach(function () {
      sandbox.restore()
    })

    it('includes className frost-text', function () {
      expect(component.classNames).to.include('frost-text')
    })
  }
)
