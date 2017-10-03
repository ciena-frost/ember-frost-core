/**
 * Unit test for the CssMixin
 */

import {expect} from 'chai'
import {setupComponentTest} from 'ember-mocha'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

describe('Unit / Mixin / css-nested', function () {
  let component, sandbox
  const expectedName = 'foo-bar'
  setupComponentTest('baz/foo-bar')

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    component = this.subject()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('has classNameBindings set to include "css"', function () {
    expect(component.get('classNameBindings')).to.include('css')
  })

  it('defaults "css" to the component name', function () {
    expect(component.get('css')).to.equal(expectedName)
  })

  describe('.getComponentName()', function () {
    let componentName
    beforeEach(function () {
      componentName = component.getComponentName()
    })

    it('should extract a className from a nested component', function () {
      expect(componentName).to.equal(expectedName)
    })
  })
})
