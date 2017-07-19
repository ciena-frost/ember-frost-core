/**
 * Component definition for the frost-ajax-error-page component
 */
import layout from '../templates/components/frost-ajax-error-page'
import Component from './frost-component'
import {PropTypes} from 'ember-prop-types'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,

  // == PropTypes =============================================================

  /**
   * Properties for this component. Options are expected to be (potentially)
   * passed in to the component. State properties are *not* expected to be
   * passed in/overwritten.
   */
  propTypes: {
    // options
    description: PropTypes.string.isRequired,
    suggestion: PropTypes.string,
    errorCode: PropTypes.number.isRequired,
    errorTitle: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    errorDetails: PropTypes.string.isRequired
    // state
  },

  /** @returns {Object} the default property values when not provided by consumer */
  getDefaultProps () {
    return {
      // options
      suggestion: '',
      // state
      showDetails: false
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

  actions: {
    onChangeHandler (expanded) {
      this.set('showDetails', expanded)
    }
  }
})
