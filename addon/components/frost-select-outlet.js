/**
 * Component definition for the frost-select-outlet component
 */
import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import SpreadMixin from 'ember-spread'

import layout from '../templates/components/frost-select-outlet'

export default Component.extend(SpreadMixin, PropTypeMixin, {
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,
  tagName: '',

  // == PropTypes =============================================================

  /**
   * Properties for this component. Options are expected to be (potentially)
   * passed in to the component. State properties are *not* expected to be
   * passed in/overwritten.
   */
  propTypes: {
    // options
    name: PropTypes.string,

    // state

    // keywords
    layout: PropTypes.any,
    tagName: PropTypes.string
  },

  /** @returns {Object} the default property values when not provided by consumer */
  getDefaultProps () {
    return {
      name: 'frost-select'
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

  actions: {
  }
})
