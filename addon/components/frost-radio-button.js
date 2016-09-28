import Ember from 'ember'
const {
  Component,
  computed
} = Ember
const {
  readOnly
} = computed
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

  checked: computed('groupValue', 'value', function () {
    return this.get('groupValue') === this.get('value')
  }),

  tabindex: Ember.computed('disabled', function () {
    return this.get('disabled') ? '-1' : '0'
  }),

  // == Functions ===============================================================

  _createEvent (_event, _target) {
    let event = Ember.$.Event(null, _event)
    let target = Ember.$.clone(_target)
    target.id = this.get('groupId')
    event.target = target
    return event
  },

  // == Events ===============================================================

  init () {
    this._super(...arguments)
    this._setupAssertions()
  },

  _setupAssertions () {
    Ember.assert(
      `${this.toString()} must be initialized in the yield block of 'frost-radio-group'`,
      /frost-radio-group/.test(this.parentView.toString()))
    Ember.assert(
      `${this.toString()} must be initialized with a 'value' property`,
      this.get('value')
    )
  },

  keyPress (e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      if (this.get('disabled') || this.get('groupValue') === this.get('value')) {
        return
      }
      let change = this.get('onChange')
      if (change && typeof change === 'function') {
        change(this._createEvent(e, Ember.$(e.target).find('input')[0]))
      }
    }
  },

  change (event) {
    const onChange = this.get('onChange')
    if (onChange && typeof onChange === 'function') {
      onChange(this._createEvent(event, event.target))
    }
  }
})
