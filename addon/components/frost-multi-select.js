/**
 * Component definition for the frost-mult-select component
 */
import PropTypeMixin from 'ember-prop-types'
import SpreadMixin from 'ember-spread'

import FrostSelect from './frost-select'

export default FrostSelect.extend(SpreadMixin, PropTypeMixin, {
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  // == PropTypes =============================================================

  /** @returns {Object} the default property values when not provided by consumer */
  getDefaultProps () {
    return {
      multiselect: true
    }
  }

  // == Computed Properties ===================================================

  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================
})
