/**
 * Component definition for the frost-select-li component
 */
import Ember from 'ember'
const {Component} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-select-li'

const regexEscapeChars = '-[]/{}()*+?.^$|'.split('')

export default Component.extend(PropTypeMixin, {
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  tagName: 'li',
  layout,

  // == PropTypes =============================================================

  /**
   * Properties for this component. Options are expected to be (potentially)
   * passed in to the component. State properties are *not* expected to be
   * passed in/overwritten.
   */
  propTypes: {
    // options
    data: PropTypes.object.isRequired,
    filter: PropTypes.string,
    hook: PropTypes.string.isRequired,
    multiselect: PropTypes.bool,
    onItemOver: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
  },

  /** @returns {Object} the default property values when not provided by consumer */
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

  // == Functions =============================================================

  // == DOM Events ============================================================

  // FIXME: jsdoc
  _onMouseDown: Ember.on('mouseDown', function (e) {
    e.preventDefault() // Prevent dropdown overlay from receiving click
    const data = this.get('data')
    this.get('onSelect')(data.value)
  }),

  // FIXME: jsdoc
  _onMouseEnter: Ember.on('mouseEnter', function () {
    const data = this.get('data')
    this.get('onItemOver')(data)
  }),

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================
  actions: {}
})
