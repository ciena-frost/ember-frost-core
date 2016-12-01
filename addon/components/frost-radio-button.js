/**
 * Component definition for the frost-radio-button component
 */
import Ember from 'ember'
const {$, Component, get, typeOf} = Ember
import computed from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import SpreadMixin from 'ember-spread'

import layout from '../templates/components/frost-radio-button'
import {cloneEvent} from '../utils'

export default Component.extend(SpreadMixin, PropTypeMixin, {
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

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

  // == PropTypes =============================================================

  /**
   * Properties for this component. Options are expected to be (potentially)
   * passed in to the component. State properties are *not* expected to be
   * passed in/overwritten.
   */
  propTypes: {
    // options
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
    onChange: PropTypes.func,

    // state

    // keywords
    attributeBinding: PropTypes.arrayOf(PropTypes.string),
    classNameBinding: PropTypes.arrayOf(PropTypes.string),
    classNames: PropTypes.arrayOf(PropTypes.string),
    layout: PropTypes.any
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

  @computed('receivedHook')
  /**
   * Determine hook name for radio-button
   * @param {String} receivedHook - hook received from parent
   * @returns {String} the concatenated hook name
   */
  hook (receivedHook) {
    const radioGroupHook = receivedHook || ''
    return `${radioGroupHook}-button`
  },

  @computed('value')
  /**
   * Determine hook qualifiers for radio-button
   * @param {String} value - radio button's value
   * @returns {String} the hook qualifiers
   */
  hookQualifiers (value) {
    if (value) {
      return {value}
    }
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

  // FIXME: jsdoc
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
  // FIXME: jsdoc
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

  // FIXME: jsdoc
  change (event) {
    const onChange = get(this, 'onChange')
    if (onChange && typeOf(onChange === 'function')) {
      onChange(this._changeTarget(event, event.target))
    }
  }
})
