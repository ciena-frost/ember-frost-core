import Ember from 'ember'
const {
  Component,
  get,
  set,
  typeOf
} = Ember

import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-radio-button'
import computed from 'ember-computed-decorators'

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
    hook: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool
  },

  getDefaultProps () {
    return {
      disabled: false,
      required: false
    }
  },

  // == Computed properties  ===================================================
  @computed('parentView.id')
  groupId: {
    get (id) {
      return id
    },
    set (value) {
      set(this, 'parentView.id', value)
    }
  },
  @computed('parentView.value')
  groupValue: {
    get (value) {
      return value
    },
    set (value) {
      set(this, 'parentView.value', value)
    }
  },
  @computed('parentView.onChange')
  onChange: {
    get (onChange) {
      return onChange
    },
    set (value) {
      set(this, 'parentView.onChange', value)
    }
  },
  @computed('parentView.value', 'value')
  checked (groupValue, value) {
    return groupValue === value
  },
  @computed('disabled')
  tabindex (disabled) {
    return disabled ? -1 : 0
  },

  // == Functions ===============================================================

  _createEvent (_event, _target) {
    let event = Ember.$.Event(this, null, _event)
    let target = Ember.$.clone(_target)
    target.id = get(this, 'groupId')
    event.target = target
    return event
  },

  // == Events ===============================================================

  didInsertElement () {
    this._super(...arguments)
    Ember.assert(
      `${this.toString()} must be initialized inside of 'frost-radio-group'`,
      /frost-radio-group/.test(get(this, 'parentView').toString()))
    Ember.assert(
      `${this.toString()} must be initialized with a 'value' property`,
      get(this, 'value')
    )
  },
  // fix for Ember 2.8 on application destroy
  willDestroyElement () {
    set(this, 'parentView', null)
  },
  keyPress (e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      if (get(this, 'disabled') || get(this, 'checked')) {
        return
      }
      const onChange = get(this, 'onChange')
      if (typeOf(onChange) === 'function') {
        onChange(this._createEvent(e, this.$(e.target).find('input')[0]))
      }
    }
  },
  change (event) {
    const onChange = get(this, 'onChange')
    if (typeOf(onChange) === 'function') {
      onChange(this._createEvent(event, event.target))
    }
  }
})
