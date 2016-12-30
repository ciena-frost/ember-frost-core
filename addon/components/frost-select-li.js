/**
 * Component definition for the frost-select-li component
 */
import Ember from 'ember'
const {String: EmberString, on} = Ember

import computed, {readOnly} from 'ember-computed-decorators'
import {PropTypes} from 'ember-prop-types'

import Component from './frost-component'
import layout from '../templates/components/frost-select-li'

const regexEscapeChars = '-[]/{}()*+?.^$|'.split('')

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
    hook: PropTypes.string.isRequired,
    multiselect: PropTypes.bool,
    onItemOver: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {}
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('data', 'filter')
  // FIXME: jsdoc
  label (data, filter) {
    if (filter) {
      // Make sure special chars are escaped in filter so we can use it as a
      // regular expression pattern
      filter = filter.replace(`[${regexEscapeChars.join('\\')}]`, 'g')

      const pattern = new RegExp(filter, 'gi')
      const label = data.label.replace(pattern, '<u>$&</u>')

      return EmberString.htmlSafe(label)
    }

    return data && data.label || ''
  },

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

  // == Actions ===============================================================
  actions: {}
})
