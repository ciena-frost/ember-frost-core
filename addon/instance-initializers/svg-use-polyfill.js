import svg4everybody from 'npm:svg4everybody'
import config from 'ember-get-config'
export function initialize () {
  if (config.iconPacks && config.iconPacks.inline) {
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
