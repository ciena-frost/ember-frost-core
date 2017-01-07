/**
 * Component definition for frost-radio-group component
 */
import layout from '../templates/components/frost-radio-group'
import Component from './frost-component'
import computed, {readOnly} from 'ember-computed-decorators'
import {PropTypes} from 'ember-prop-types'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,

  // == PropTypes =============================================================

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
    onChange: PropTypes.func

    // state
  },

  getDefaultProps () {
    return {
      // options
      inputs: [],
      value: null

      // state
    }
  },

  // == Computed Properties ===================================================

  @readOnly
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
