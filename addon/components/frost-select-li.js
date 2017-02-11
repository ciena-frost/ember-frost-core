/**
 * Component definition for the frost-select-li component
 */
import Ember from 'ember'
const {on, typeOf, run: {scheduleOnce}} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-select-li'
import {trimLongDataInElement} from '../utils/text'
import Component from './frost-component'

const regexEscapeChars = '-[]/{}()*+?.^$|'.split('')

export default Component.extend({
  // == Dependencies ==========================================================
  // == Keyword Properties ====================================================

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

      return Ember.String.htmlSafe(label)
    }

    return data && data.label || ''
  },

  @readOnly
  @computed('data')
  fullText: function (data) {
    if (typeOf(data) !== 'object') return ''
    return data.label || ''
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

  // == Lifecycle Hooks =======================================================s

  didRender () {
    scheduleOnce('sync', this, function () {
      const $text = this.$('.frost-select-list-item-text')
      const filter = this.get('filter')

      trimLongDataInElement($text.get(0))

      if (filter) {
        const pattern = new RegExp(filter, 'gi')
        const textWithMatch = $text.text().replace(pattern, '<u>$&</u>')
        $text.html(textWithMatch)
      }
    })
  },

  // == Actions ===============================================================
  actions: {}
})
