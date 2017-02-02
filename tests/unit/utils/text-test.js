import {expect} from 'chai'
import Ember from 'ember'
const {$} = Ember
import {afterEach, beforeEach, describe, it} from 'mocha'

import {trimDataToFit, trimLongDataInElement} from 'ember-frost-core/utils/text'

describe('Unit / Utils / text', () => {
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
})
