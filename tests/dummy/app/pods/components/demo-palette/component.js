/* global $ */
import Component from '@ember/component'

function hex (x) {
  return parseInt(x).toString(16).slice(-2)
}

function rgb2hex (rgb) {
  if (/^#[0-9A-F]{6}$/i.test(rgb)) {
    return rgb
  }

  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
  const hexResult = rgb.slice(1)
    .map((value) => value === '0' ? '00' : hex(value))
    .join('')

  return `#${hexResult}`
}

export default Component.extend({
  didRender () {
    this.$('.swatch .content:nth-child(2)').each((i, el) => {
      const $el = $(el)
      const color = rgb2hex($el.css('background-color'))
      $el.text(color)
    })
  }
})
