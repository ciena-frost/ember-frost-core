import chai from 'chai'
const expect = chai.expect
import sinon from 'sinon'
import {
  describeComponent
} from 'ember-mocha'
import {
  beforeEach,
  afterEach,
  it
} from 'mocha'

describeComponent(
  'frost-url-input',
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

    it('includes className frost-url-input', function () {
      expect(component.classNames).to.include('frost-url-input')
    })
  }
)
