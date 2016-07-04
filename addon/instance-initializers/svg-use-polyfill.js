import svg4everybody from 'npm:svg4everybody'
import Ember from 'ember'
const {ENV} = Ember
export function initialize () {
  if (ENV.iconPacks && ENV.iconPacks.inline) {
    svg4everybody({
      nosvg: true, // shiv <svg> and <use> elements and use image fallbacks
      polyfill: true // polyfill <use> elements for External Content
    })
  } else {
    svg4everybody()
  }
}

export default {
  name: 'svg-use-polyfill',
  initialize
}
