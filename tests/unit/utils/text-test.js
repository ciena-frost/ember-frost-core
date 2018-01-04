import {expect} from 'chai'
import Ember from 'ember'
const {$} = Ember
import {trimDataToFit, trimLongDataInElement} from 'ember-frost-core/utils/text'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

describe('Unit / Utils / text', () => {
  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('.trimDataToFit()', function () {
    it('should not throw an error when text is undefined', function () {
      expect(() => {
        trimDataToFit(undefined, 300)
      }).not.to.throw()
    })

    it('should not throw an error when text is empty', function () {
      expect(() => {
        trimDataToFit('', 300)
      }).not.to.throw()
    })

    it('should return original text when width is wider than text width', function () {
      const text = 'my text'
      expect(trimDataToFit(text, 5000)).to.equal(text)
    })
  })

  describe('.trimLongDataInElement()', function () {
    describe('when initial text fits within element', function () {
      let $element, text

      beforeEach(function () {
        text = 'The quick brown fox'
        $element = $(`<div data-text="${text}">${text}</div>`).appendTo('body')
        $element.css({
          font: 'normal normal normal 10px/14px Arial'
        })
      })

      afterEach(function () {
        $element.remove()
      })

      describe('when text fits within element', function () {
        beforeEach(function () {
          $element.width(200)
        })

        it('should not trim text or set title', function () {
          expect(trimLongDataInElement($element.get(0))).to.equal(null)
        })
      })

      describe('when text does not fit within element', function () {
        beforeEach(function () {
          $element.width(80)
        })

        it('should trim text and sets title', function () {
          const result = trimLongDataInElement($element.get(0))

          expect(result.text.indexOf('The')).to.eql(0)
          expect(result.text.indexOf('…')).not.to.eql(-1)
          expect(result.text.indexOf('fox')).to.eql(result.text.length - 3)
          expect(result.tooltip).to.equal(text)
        })
      })
    })

    describe('when initial text does not fit within element', function () {
      let $element, text

      beforeEach(function () {
        text = 'The quick brown fox'
        $element = $(`<div data-text="${text}">${text}</div>`).appendTo('body')
        $element.css({
          font: 'normal normal normal 10px/14px Arial'
        })

        // perform initial trimming of text
        $element.width(80)
        const initial = trimLongDataInElement($element.get(0))
        $element.text(initial.text).prop('title', initial.tooltip)
      })

      afterEach(function () {
        $element.remove()
      })

      it('should trim text', function () {
        let currentText = $element.text()

        expect(currentText.indexOf('The')).to.eql(0)
        expect(currentText.indexOf('…')).not.to.eql(-1)
        expect(currentText.indexOf('fox')).to.eql(currentText.length - 3)
      })

      it('should have title', function () {
        expect($element).to.have.prop('title', text)
      })

      describe('when text fits within element', function () {
        beforeEach(function () {
          $element.width(200)
        })

        it('should set text back to full text and unsets tooltip', function () {
          const result = trimLongDataInElement($element.get(0))
          expect(result.text).to.equal(text)
          expect(result.tooltip).to.equal('')
        })
      })

      describe('when trimmed text remains the same', function () {
        beforeEach(function () {
          $element.width(80)
        })

        it('should not update text or tooltip', function () {
          expect(trimLongDataInElement($element.get(0))).to.equal(null)
        })

        it('should have same trimmed text', function () {
          let currentText = $element.text()

          expect(currentText.indexOf('The')).to.eql(0)
          expect(currentText.indexOf('…')).not.to.eql(-1)
          expect(currentText.indexOf('fox')).to.eql(currentText.length - 3)
        })

        it('should have same title', function () {
          expect($element).to.have.prop('title', text)
        })
      })
    })
  })
})
