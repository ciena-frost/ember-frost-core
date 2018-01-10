/**
 * Unit test for the CssMixin
 */
import {expect} from 'chai'
import {setupComponentTest} from 'ember-mocha'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

describe('Unit / Mixin / css', function () {
  let component, sandbox

  setupComponentTest('css-component')

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    component = this.subject()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should have classNameBindings set to include "css"', function () {
    expect(component.get('classNameBindings')).to.include('css')
  })

  it('should default "css" to the component name', function () {
    expect(component.get('css')).to.equal('css-component')
  })

  describe('.getComponentName()', function () {
    let componentName
    beforeEach(function () {
      componentName = component.getComponentName()
    })

    it('should strip the junk from toString()', function () {
      expect(componentName).to.equal('css-component')
    })
  })

  describe('.init()', function () {
    beforeEach(function () {
      sandbox.stub(component, 'maybeClearClassNameBindings')
      component.init()
    })

    it('should call .maybeClearClassNameBindings()', function () {
      expect(component.maybeClearClassNameBindings).to.have.callCount(1)
    })
  })

  describe('.maybeClearClassNameBindings()', function () {
    describe('when "tagName" is set', function () {
      beforeEach(function () {
        component.set('tagName', 'div')
        component.maybeClearClassNameBindings()
      })

      it('should leave "classNameBindings" alone', function () {
        expect(component.get('classNameBindings')).to.include('css')
      })
    })

    describe('when "tagName" is not blank', function () {
      beforeEach(function () {
        component.set('tagName', '')
        component.maybeClearClassNameBindings()
      })

      it('should remove "classNameBindings"', function () {
        expect(component.get('classNameBindings')).to.eql([])
      })
    })
  })
})
