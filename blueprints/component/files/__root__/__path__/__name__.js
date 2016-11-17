/**
 * Component definition for the <%= dasherizedModuleName %> component
 */

import Ember from 'ember'
const {Component} = Ember
import PropTypesMixin, {PropTypes} from 'ember-prop-types'
import computed, {readOnly} from 'ember-computed-decorators'

import layout from '<%= templatePath %>'

export default Component.extend(PropTypesMixin, {
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
    hook: PropTypes.string.isRequired,

    // state

    // keywords
    layout: PropTypes.any
  },

  /** @returns {Object} the default property values when not provided by consumer */
  getDefaultProps () {
    return {
      // options

      // state
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('hook')
  /**
   * A pretty silly computed property just as an example of one
   * it appends '-' to the hook
   * @param {String} hook - the hook for this component
   * @returns {String} a hook prefix suitable for use within the template
   */
  hookPrefix (hook) {
    return `${hook}-`
  },

  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

  actions: {
  }
})
