/**
 * Component definition for the frost-select-li component
 */
import Ember from 'ember'
const {get, on} = Ember
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-select-li'
import Component from './frost-component'

const regexEscapeChars = '-[]/{}()*+?.^$|'.split('')

// FIXME: jsdoc
function getLabel (data, filter) {
  if (filter) {
    // Make sure special chars are escaped in filter so we can use it as a
    // regular expression pattern
    filter = filter.replace(`[${regexEscapeChars.join('\\')}]`, 'g')

    const pattern = new RegExp(filter, 'gi')
    const label = data.label.replace(pattern, '<u>$&</u>')

    return Ember.String.htmlSafe(label)
  }

  return data && data.label || ''
}

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  tagName: 'li',
  layout,

  // == PropTypes =============================================================

  propTypes: {
    // options
    data: PropTypes.object.isRequired,
    filter: PropTypes.string,
    multiselect: PropTypes.bool,
    onItemOver: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {}
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================

  // == DOM Events ============================================================

  // FIXME: jsdoc
  _onMouseDown: on('mouseDown', function (e) {
    e.preventDefault() // Prevent dropdown overlay from receiving click
    const data = this.get('data')
    this.get('onSelect')(data.value)
  }),

  // FIXME: jsdoc
  _onMouseEnter: on('mouseEnter', function () {
    const data = this.get('data')
    this.get('onItemOver')(data)
  }),

  // == Lifecycle Hooks =======================================================

  didReceiveAttrs (attrs) {
    const data = get(attrs, 'newAttrs.data')
    const filter = get(attrs, 'newAttrs.filter.value')
    const newLabel = getLabel(data, filter)
    const oldLabel = this.get('label')

    if (newLabel !== oldLabel) {
      this.set('label', newLabel)
    }
  },

  // == Actions ===============================================================
  actions: {}
})
