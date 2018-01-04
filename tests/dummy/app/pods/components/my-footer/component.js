/**
 * Component definition for the my-footer component
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
    onCancel: PropTypes.func,
    onSave: PropTypes.func

    // state
  },

  getDefaultProps () {
    return {
      // options
      onCancel: function () {},
      onSave: function () {}

      // state
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
