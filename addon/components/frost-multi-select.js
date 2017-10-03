/**
 * Component definition for the frost-mult-select component
 */

import FrostSelect from './frost-select'

export default FrostSelect.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  // == PropTypes =============================================================

  getDefaultProps () {
    return {
      css: 'frost-select', // the multi-select uses the same base class as frost-select
      multiselect: true
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================
  actions: {}
})
