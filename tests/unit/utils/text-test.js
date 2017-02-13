import {expect} from 'chai'
import Ember from 'ember'
const {$} = Ember
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import {trimDataToFit, trimLongDataInElement} from 'ember-frost-core/utils/text'

const jQueryProto = Object.getPrototypeOf($('body'))

describe('Unit / Utils / text', () => {
  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('.trimDataToFit()', () => {
    it('does not throw an error when text is undefined', () => {
      expect(() => {
        trimDataToFit(undefined, 300)
      }).not.to.throw()
    })

    it('does not throw an error when text is empty', () => {
      expect(() => {
        trimDataToFit('', 300)
      }).not.to.throw()
    })

    it('returns original text when width is wider than text width', () => {
      const text = 'my text'
      expect(trimDataToFit(text, 5000)).to.equal(text)
    })
  })

  describe('.trimLongDataInElement()', () => {
    describe('when initial text fits within element', function () {
      let $element, text

      beforeEach(() => {
        text = 'The quick brown fox'
        $element = $(`<div data-text="${text}">${text}</div>`).appendTo('body')
        $element.css({
          font: 'normal normal normal 10px/14px Arial'
        })
      })

      afterEach(() => {
        $element.remove()
      })

      describe('when text fits within element', () => {
        beforeEach(() => {
          $element.width(200)
          trimLongDataInElement($element.get(0))
        })

        it('does not trim text', () => {
          expect($element).to.have.text(text)
        })

        it('does not set title', () => {
          expect($element).to.have.prop('title', '')
        })
      })

      describe('when text does not fit within element', () => {
        beforeEach(() => {
          $element.width(80)
          trimLongDataInElement($element.get(0))
        })

        it('trims text', () => {
          let currentText = $element.text()

          expect(currentText.indexOf('The')).to.eql(0)
          expect(currentText.indexOf('…')).not.to.eql(-1)
          expect(currentText.indexOf('fox')).to.eql(currentText.length - 3)
        })

        it('sets title to full text', () => {
          expect($element).to.have.prop('title', text)
        })
      })
    })

    describe('when initial text does not fit within element', function () {
      let $element, text

      beforeEach(() => {
        text = 'The quick brown fox'
        $element = $(`<div data-text="${text}">${text}</div>`).appendTo('body')
        $element.css({
          font: 'normal normal normal 10px/14px Arial'
        })

        // perform initial trimming of text
        $element.width(80)
        trimLongDataInElement($element.get(0))
      })

      afterEach(() => {
        $element.remove()
      })

      it('has trimmed text', () => {
        let currentText = $element.text()

        expect(currentText.indexOf('The')).to.eql(0)
        expect(currentText.indexOf('…')).not.to.eql(-1)
        expect(currentText.indexOf('fox')).to.eql(currentText.length - 3)
      })

      it('has title', () => {
        expect($element).to.have.prop('title', text)
      })

      describe('when text fits within element', () => {
        beforeEach(() => {
          $element.width(200)
          trimLongDataInElement($element.get(0))
        })

        it('sets text back to full text', () => {
          expect($element).to.have.text(text)
        })

        it('unsets the title', () => {
          expect($element).to.have.prop('title', '')
        })
      })

      describe('when trimmed text remains the same', () => {
        beforeEach(() => {
          $element.width(80)
          sandbox.spy(jQueryProto, 'prop')
          sandbox.spy(jQueryProto, 'text')
          trimLongDataInElement($element.get(0))
        })

        it('does not update text', function () {
          expect(jQueryProto.text.callCount).to.equal(0)
        })

        it('does not update title', function () {
          expect(jQueryProto.prop.callCount).to.equal(0)
        })

        it('has same trimmed text', () => {
          let currentText = $element.text()

          expect(currentText.indexOf('The')).to.eql(0)
          expect(currentText.indexOf('…')).not.to.eql(-1)
          expect(currentText.indexOf('fox')).to.eql(currentText.length - 3)
        })

        it('has same title', () => {
          expect($element).to.have.prop('title', text)
        })
      })
    })
  })
})
