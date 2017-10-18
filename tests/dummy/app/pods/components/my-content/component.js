/**
 * Component definition for the my-content component
 */

import layout from './template'

import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,

  // == PropTypes =============================================================

  propTypes: {
    // options
    tall: PropTypes.bool,

    // state
    ipsumText: PropTypes.string
  },

  getDefaultProps () {
    return {
      // options
      tall: false,

      // state
      ipsumText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi' +
        'ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit' +
        'in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
        'Excepteur sint occaecat cupidatat non proident, ' +
        'sunt in culpa qui officia deserunt mollit anim id est laborum.'
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
