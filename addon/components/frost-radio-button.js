/**
 * Component definition for the frost-radio-button component
 */
import layout from '../templates/components/frost-radio-button'
import {cloneEvent} from '../utils'
import Component from './frost-component'
import Ember from 'ember'
import computed, {readOnly} from 'ember-computed-decorators'
import {PropTypes} from 'ember-prop-types'
const {$} = Ember

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  attributeBindings: [
    'tabindex'
  ],

  classNameBindings: [
    'checked',
    'disabled',
    'required',
    'size'
  ],

  layout,

  // == PropTypes =============================================================

  propTypes: {
    // options
    // Group properties
    groupId: PropTypes.string,
    selectedValue: PropTypes.string,
    receivedHook: PropTypes.string,
    // Radio properties
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    required: PropTypes.bool,
    size: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func

    // state
  },

  getDefaultProps () {
    return {
      // Radio properties
      disabled: false,
      required: false,
      size: 'small'
    }
  },

  // == Computed properties  ===================================================

  @computed('selectedValue', 'value')
  /**
   * Determine checked state
   * TODO: make compued property readOnly
   * @param {String} selectedValue - which radio button in the group is selected
   * @param {String} value - radio button value
   * @returns {Boolean} whether this radio button is checked or not
   */
  checked (selectedValue, value) { // eslint-disable-line
    return selectedValue === value
  },

  @computed('receivedHook')
  /**
   * Determine hook name for radio-button
   * TODO: make computed property readOnly
   * @param {String} receivedHook - hook received from parent
   * @returns {String} the concatenated hook name
   */
  hook (receivedHook) { // eslint-disable-line
    const radioGroupHook = receivedHook || ''
    return `${radioGroupHook}-button`
  },

  @readOnly
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

  @readOnly
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

    const groupdId = this.get('groupId')
    if (groupdId) {
      e.target.id = this.get('groupId')
    }

    return e
  },

  // == Events ===============================================================
  /* eslint-disable complexity */
  // FIXME: jsdoc
  keyPress (event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      if (this.get('disabled') || this.get('checked')) {
        return
      }

      if (this.onChange) {
        this.onChange(this._changeTarget(event, $(event.target).find('input')[0]))
      }
    }
  },
  /* eslint-enable complexity */

  // FIXME: jsdoc
  change (event) {
    if (this.onChange) {
      this.onChange(this._changeTarget(event, event.target))
    }
  }
})
