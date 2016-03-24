/* global $ */
import Ember from 'ember'

function hex (x) {
  return parseInt(x).toString(16).slice(-2)
}

function rgb2hex (rgb) {
  if (/^#[0-9A-F]{6}$/i.test(rgb)) {
    return rgb
  }

  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)

  return `#${hex(rgb[1])}${hex(rgb[2])}${hex(rgb[3])}`
}

export default Ember.Component.extend({
  didRender () {
    this.$('.swatch .content:nth-child(2)').each((i, el) => {
      const $el = $(el)
      const color = rgb2hex($el.css('background-color'))
      $el.text(color)
    })
  }
})
