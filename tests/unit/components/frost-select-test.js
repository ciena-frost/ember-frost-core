/**
 * Unit test for the frost-select component
 */
import Ember from 'ember'
import {expect} from 'chai'

import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import {unit} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'
const {run} = Ember
const test = unit('frost-select')
describe(test.label, function () {
  test.setup()

  let component, sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('fires onInput after debounce period', function () {
    it('waits until after debounce period', function (done) {
      const onInput = sinon.spy(function (value) {
        expect(value).to.equal('hello')
      })
      const component = this.subject({
        hook: 'myHook',
        onInput,
        debounceInterval: 200
      })
      component.actions.filterInput.call(component, {
        target: {
          value: 'hello'
        }
      })
      expect(onInput.called).to.equal(false)
      run.later(function () {
        expect(onInput.called).to.equal(true)
        done()
      }, 250)
    })
  })
})
