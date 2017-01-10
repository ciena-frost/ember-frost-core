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

  it('defaults "css" to the component name', function () {
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
      sandbox.stub(component, 'setClassNameBindings')
      component.init()
    })

    it('should call .setClassNameBindings()', function () {
      expect(component.setClassNameBindings).to.have.callCount(1)
    })
  })

  describe('.setClassNameBindings()', function () {
    describe('when "tagName" is set', function () {
      beforeEach(function () {
        component.set('tagName', 'div')
        component.setClassNameBindings()
      })

      it('has classNameBindings set to include "css"', function () {
        expect(component.get('classNameBindings')).to.include('css')
      })
    })

    describe('when "tagName" is not blank', function () {
      beforeEach(function () {
        component.set('tagName', '')
        component.setClassNameBindings()
      })

      it('should have empty "classNameBindings"', function () {
        expect(component.get('classNameBindings')).to.eql([])
      })
    })

    describe('when other "classNameBindings" are present', function () {
      beforeEach(function () {
        component.set('tagName', 'div')
        component.set('classNameBindings', ['foo', 'bar'])
        component.setClassNameBindings()
      })

      it('should merge the "classNameBindings"', function () {
        expect(component.get('classNameBindings')).to.include('css')
        expect(component.get('classNameBindings')).to.include('foo')
        expect(component.get('classNameBindings')).to.include('bar')
      })
    })
  })
})
