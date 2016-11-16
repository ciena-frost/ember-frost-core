import Ember from 'ember'
const {
  $,
  Component,
  get,
  typeOf
} = Ember
import computed from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-radio-button'
import Events from '../utils/events'
const {cloneEvent} = Events

export default Component.extend(PropTypeMixin, {
  // == Properties  ============================================================
  attributeBindings: [
    'tabindex'
  ],
  classNames: [
    'frost-radio-button'
  ],
  classNameBindings: [
    'checked',
    'disabled',
    'required',
    'size'
  ],
  layout,

  propTypes: {
    // Group properties
    groupId: PropTypes.string,
    selectedValue: PropTypes.string,
    receivedHook: PropTypes.string,
    // Radio properties
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    hook: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    size: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func
  },

  getDefaultProps () {
    return {
      // Group properties
      groupId: null,
      selectedValue: null,
      // Radio properties
      disabled: false,
      required: false,
      size: 'small',
      value: null
    }
  },

  // == Computed properties  ===================================================

  @computed('selectedValue', 'value')
  /**
   * Determine checked state
   * @param {String} selectedValue - which radio button in the group is selected
   * @param {String} value - radio button value
   * @returns {Boolean} whether this radio button is checked or not
   */
  checked (selectedValue, value) {
    return selectedValue === value
  },

  @computed('value', 'receivedHook')
  /**
   * Determine hook name for radio-button
   * @param {String} value - radio button's value
   * @param {String} receivedHook - hook received from parent
   * @returns {String} the concatenated hook name
   */
  hook (value, receivedHook) {
    const radioGroupHook = receivedHook || ''
    return `${radioGroupHook}-button-${value}`
  },

  @computed('disabled')
  /**
   * Determine tabindex value
   * @param {Boolean} disabled - is this button disabled
   * @returns {Number} the tabindex value
   */
  tabindex (disabled) {
    return disabled ? -1 : 0
  },

  // == Functions ===============================================================

  _changeTarget (event, target) {
    const e = cloneEvent(event, target)

    const groupdId = get(this, 'groupId')
    if (groupdId) {
      e.target.id = get(this, 'groupId')
    }

    return e
  },

  // == Events ===============================================================
  /* eslint-disable complexity */
  keyPress (event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      if (get(this, 'disabled') || get(this, 'checked')) {
        return
      }
      const onChange = get(this, 'onChange')
      if (onChange && typeOf(onChange === 'function')) {
        onChange(this._changeTarget(event, $(event.target).find('input')[0]))
      }
    }
  },
  /* eslint-enable complexity */

  change (event) {
    const onChange = get(this, 'onChange')
    if (onChange && typeOf(onChange === 'function')) {
      onChange(this._changeTarget(event, event.target))
    }
  }
})
