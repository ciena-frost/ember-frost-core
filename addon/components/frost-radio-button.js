import Ember from 'ember'
const {
  $,
  Component,
  computed,
  get,
  typeOf
} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-radio-button'
import {cloneEvent} from '../utils/utils'

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

  /**
   * Determine checked state
   * @param {String} selectedValue - which radio button in the group is selected
   * @param {String} value - radio button value
   * @returns {Boolean} whether this radio button is checked or not
   */
  checked: computed('selectedValue', 'value', function () {
    const selectedValue = get(this, 'selectedValue')
    const value = get(this, 'value')

    return selectedValue === value
  }),

  /**
   * Determine hook name for radio-button
   * @param {String} receivedHook - hook received from parent
   * @returns {String} the concatenated hook name
   */
  hook: computed('receivedHook', function () {
    const radioGroupHook = get(this, 'receivedHook') || ''
    return `${radioGroupHook}-button`
  }),

  /**
   * Determine hook qualifiers for radio-button
   * @param {String} value - radio button's value
   * @returns {String} the hook qualifiers
   */
  hookQualifiers: computed('value', function () {
    const value = get(this, 'value') || ''
    return {value: value}
  }),

  /**
   * Determine tabindex value
   * @param {Boolean} disabled - is this button disabled
   * @returns {Number} the tabindex value
   */
  tabindex: computed('disabled', function () {
    return get(this, 'disabled') ? -1 : 0
  }),

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
