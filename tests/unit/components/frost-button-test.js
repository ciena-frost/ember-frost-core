import {expect} from 'chai'
import {describeComponent} from 'ember-mocha'
import {beforeEach, afterEach, it, describe} from 'mocha'

describeComponent.only(
  'frost-button',
  'FrostButtonComponent',
  {
    unit: true
  },
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it('includes className frost-button', function () {
      expect(component.classNames).to.include('frost-button')
    })

    describe('._getOnClickHandler()', function () {
      beforeEach(function () {
        component.attrs = {}
      })

      afterEach(function () {
        component.attrs = null
      })

      it('returns handler when onClick attribute is a function', function () {
        component.attrs.onClick = function () {}
        expect(component._getOnClickHandler()).to.be.a('function')
      })

      it('returns handler when onClick attribute is an mutable cell object', function () {
        component.attrs.onClick = {
          value: function () {}
        }
        expect(component._getOnClickHandler()).to.be.a('function')
      })

      it('doesn\'t return handler when onClick is empty', function () {
        component.attrs.onClick = undefined
        expect(component._getOnClickHandler()).to.be.an('undefined')
      })

      it('doesn\'t return handler when onClick is empty object', function () {
        component.attrs.onClick = {}
        expect(component._getOnClickHandler()).to.be.an('undefined')
      })
    })
  }
)
