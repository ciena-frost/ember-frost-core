import computed from 'ember-computed-decorators'
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
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-radio-button'

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
    'required'
  ],
  layout,

  propTypes: {
    disabled: PropTypes.bool,
    hook: PropTypes.string,
    required: PropTypes.bool
  },

  getDefaultProps () {
    return {
      disabled: false,
      required: false
    }
  },

  // == Computed properties  ===================================================

  groupId: readOnly('parentView.id'),
  groupValue: readOnly('parentView.value'),
  onChange: readOnly('parentView.onChange'),

  @computed('groupValue', 'value')
  /**
   * Determine state of checked
   * @param {String} groupValue - which radio button in the group is set
   * @param {String} value - is this radio button selected
   * @returns {Boolean} whether this radio button is checked
   */
  checked (groupValue, value) {
    return groupValue === value
  },

  @computed('disabled')
  /**
   * Determine tabindex setting
   * @param {String} disabled - component disabled state
   * @returns {String} whether this radio button is checked
   */
  tabindex (disabled) {
    return disabled ? '-1' : '0'
  },

  // == Functions ===============================================================

  _createEvent (_event, _target) {
    let event = $.Event(null, _event)
    let target = $.clone(_target)
    target.id = get(this, 'groupId')
    event.target = target
    return event
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
    assert(
      `${this.toString()} must be initialized with a 'value' property`,
      get(this, 'value')
    )
  },

  keyPress (e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      if (get(this, 'disabled') || get(this, 'groupValue') === get(this, 'value')) {
        return
      }
      let change = get(this, 'onChange')
      if (change && typeOf(change) === 'function') {
        change(this._createEvent(e, $(e.target).find('input')[0]))
      }
    }
  },

  change (event) {
    const onChange = get(this, 'onChange')
    if (onChange && typeOf(onChange) === 'function') {
      onChange(this._createEvent(event, event.target))
    }
  }
})
