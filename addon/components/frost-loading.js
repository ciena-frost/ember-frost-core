/**
 * Component definition for the frost-loading component
 */
import layout from '../templates/components/frost-loading'
import Component from './frost-component'
import {PropTypes} from 'ember-prop-types'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,

  // == PropTypes =============================================================

  propTypes: {
    // options
    type: PropTypes.string

    // state
  },

  getDefaultProps () {
    return {
      type: 'ripple'
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
