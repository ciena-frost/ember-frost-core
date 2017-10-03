/**
 * Component definition for the frost-select-outlet component
 */

import layout from '../templates/components/frost-select-outlet'
import Component from './frost-component'
import {PropTypes} from 'ember-prop-types'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,
  tagName: '',

  // == PropTypes =============================================================

  propTypes: {
    // options
    name: PropTypes.string

    // state
  },

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
