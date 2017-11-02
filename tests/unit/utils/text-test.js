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
        })

        it('does not trim text or set title', () => {
          expect(trimLongDataInElement($element.get(0))).to.equal(null)
        })
      })

      describe('when text does not fit within element', () => {
        beforeEach(() => {
          $element.width(80)
        })

        it('trims text and sets title', () => {
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

      beforeEach(() => {
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
        })

        it('sets text back to full text and unsets tooltip', () => {
          const result = trimLongDataInElement($element.get(0))
          expect(result.text).to.equal(text)
          expect(result.tooltip).to.equal('')
        })
      })

      describe('when trimmed text remains the same', () => {
        beforeEach(() => {
          $element.width(80)
        })

        it('does not update text or tooltip', function () {
          expect(trimLongDataInElement($element.get(0))).to.equal(null)
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
