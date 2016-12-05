/**
 * Component definition for the frost-loading component
 */
import {PropTypes} from 'ember-prop-types'

import Component from './frost-component'
import layout from '../templates/components/frost-loading'

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
