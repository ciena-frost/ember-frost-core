import Ember from 'ember'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-radio-group'

const {
  computed,
  get
} = Ember

export default Ember.Component.extend(PropTypeMixin, {
  // == Properties  ============================================================
  classNames: ['frost-radio-group'],
  layout,

  propTypes: {
    inputs: PropTypes.arrayOf(PropTypes.shape({
      disabled: PropTypes.bool,
      label: PropTypes.string,
      required: PropTypes.bool,
      size: PropTypes.string,
      value: PropTypes.string.isRequired
    })),
    hook: PropTypes.string,
    id: PropTypes.string,
    selectedValue: PropTypes.string,
    onChange: PropTypes.func
  },

  getDefaultProps () {
    return {
      id: null,
      value: null
    }
  },

  // == Computed properties  ===================================================
  /**
   * Set the default values for the inputs.
   * @param {array} inputs a list of inputs
   * @returns {array} an array of inputs with default values set
   */
  meshedInputs: computed('inputs', function () {
    const inputs = get(this, 'inputs') || []
    return inputs.map((input) => {
      input.size = input.size || 'small'
      return input
    })
  })
})
