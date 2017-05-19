/**
 * Component definition for the frost-error component
 */
import layout from '../templates/components/frost-error'
import Component from './frost-component'
import {PropTypes} from 'ember-prop-types'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,
  tagName: 'div',

  // == PropTypes =============================================================

  /**
   * Properties for this component. Options are expected to be (potentially)
   * passed in to the component. State properties are *not* expected to be
   * passed in/overwritten.
   */
  propTypes: {
    // options
    description: PropTypes.string,
    suggestion: PropTypes.string,
    errorCode: PropTypes.number,
    errorTitle: PropTypes.string,
    errorMessage: PropTypes.string,
    errorDetails: PropTypes.string,
    showDetails: PropTypes.bool
    // state
  },

  /** @returns {Object} the default property values when not provided by consumer */
  getDefaultProps () {
    return {
      // options
      description: '',
      suggestion: '',
      errorCode: -1,
      errorTitle: '',
      errorMessage: '',
      errorDetails: '',
      showDetails: false
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
