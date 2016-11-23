/**
 * Component definition for frost-radio-group component
 */
import Ember from 'ember'
const {Component} = Ember
import computed from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-radio-group'

export default Component.extend(PropTypeMixin, {
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  classNames: ['frost-radio-group'],
  layout,

  // == PropTypes =============================================================

  /**
   * Properties for this component. Options are expected to be (potentially)
   * passed in to the component. State properties are *not* expected to be
   * passed in/overwritten.
   */
  propTypes: {
    // options
    hook: PropTypes.string,
    id: PropTypes.string,
    inputs: PropTypes.arrayOf(PropTypes.shape({
      disabled: PropTypes.bool,
      label: PropTypes.string,
      required: PropTypes.bool,
      size: PropTypes.string,
      value: PropTypes.string.isRequired
    })),
    selectedValue: PropTypes.string,
    onChange: PropTypes.func,

    // state

    // keywords
    classNames: PropTypes.arrayOf(PropTypes.string),
    layout: PropTypes.any
  },

  /** @returns {Object} the default property values when not provided by consumer */
  getDefaultProps () {
    return {
      // options
      id: null,
      inputs: [],
      value: null

      // state
    }
  },

  // == Computed Properties ===================================================

  @computed('inputs')
  /**
   * Set the default values for the inputs.
   * @param {array} inputs a list of inputs
   * @returns {array} an array of inputs with default values set
   */
  meshedInputs (inputs) {
    return inputs.map((input) => {
      input.size = input.size || 'small'
      return input
    })
  },

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

  actions: {
  }
})
