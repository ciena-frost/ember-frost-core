import Ember from 'ember'
const {
  $,
  assert,
  Component,
  computed: {
    readOnly
  },
  get,
  typeOf
} = Ember
import computed from 'ember-computed-decorators'
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
    disabled: PropTypes.bool,
    hook: PropTypes.string,
    required: PropTypes.bool,
    size: PropTypes.string,
    value: PropTypes.string.isRequired
  },

  getDefaultProps () {
    return {
      disabled: false,
      required: false,
      size: 'small',
      value: null
    }
  },

  // == Computed properties  ===================================================

  groupId: readOnly('parentView.id'),
  groupValue: readOnly('parentView.value'),
  onChange: readOnly('parentView.onChange'),

  @computed('groupValue', 'value')
  /**
   * Determine checked state
   * @param {String} groupValue - which radio button in the group is set
   * @param {String} value - is this radio button selected
   * @returns {Boolean} whether this radio button is checked
   */
  checked (groupValue, value) {
    return groupValue === value
  },

  @computed('value')
  /**
   * Determine hook name for radio-button
   * @param {String} value - radio button's value
   * @returns {String} the concatenated hook name
   */
  hook (value) {
    const radioGroupHook = get(this, 'parentView.hook')
    if (radioGroupHook) {
      return `${radioGroupHook}-button-${value}`
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

  _changeTarget (event, target) {
    const e = cloneEvent(event, target)
    e.target.id = get(this, 'groupId')
    return e
  },

  // == Events ===============================================================

  init () {
    this._super(...arguments)
    this._setupAssertions()
  },

  _setupAssertions () {
    assert(
      `${this.toString()} must be initialized in the yield block of 'frost-radio-group'`,
      /frost-radio-group/.test(this.parentView.toString()))
  },

/* eslint-disable complexity */
  keyPress (event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      if (get(this, 'disabled') || get(this, 'groupValue') === get(this, 'value')) {
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
