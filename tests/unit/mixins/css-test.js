/**
 * Unit test for the CssMixin
 */
import {expect} from 'chai'
import Ember from 'ember'
const {Component} = Ember
import PropTypesMixin from 'ember-prop-types'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import CssMixin from 'ember-frost-core/mixins/css'

const CssComponent = Component.extend(PropTypesMixin, CssMixin, {
  toString () {
    return '<app-name@component:component-name::ember555>'
  }
})

describe('Unit / Mixin / css', function () {
  let component, sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    component = CssComponent.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('has classNameBindings set to include "css"', function () {
    expect(component.get('classNameBindings')).to.include('css')
  })

  it('defaults "css" to the component name', function () {
    expect(component.get('css')).to.equal('component-name')
  })

  describe('.getComponentName()', function () {
    let componentName
    beforeEach(function () {
      componentName = component.getComponentName()
    })

    it('should strip the junk from toString()', function () {
      expect(componentName).to.equal('component-name')
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
        expect(component.get('classNameBindings')).to.equal(undefined)
      })
    })
  })
})
