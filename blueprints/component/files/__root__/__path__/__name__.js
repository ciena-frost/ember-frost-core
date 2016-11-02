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

  // == Properties ============================================================

  /**
   * Properties for this component. Public properties are expected to be
   * (potentially) passed in to the component. Private properties are *not*
   * expected to be passed in/overwritten.
   */
  propTypes: {
    // public
    hook: PropTypes.string,

    // private
    layout: PropTypes.any
  },

  /**
   * @returns {Object} the default property values for this component
   */
  getDefaultProps () {
    return {
      // public
      hook: '<%= camelizedModuleName %>',

      // private
      layout
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

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

  actions: {
  }
})
