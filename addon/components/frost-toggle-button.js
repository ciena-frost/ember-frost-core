import Ember from 'ember'
const {computed, Component, ViewUtils} = Ember
import layout from '../templates/components/frost-toggle-button'
import FrostEventsProxy from '../mixins/frost-events-proxy'

export default Component.extend(FrostEventsProxy, {
  layout: layout,

  classNames: ['frost-toggle-button'],

  attributeBindings: [
    'toggled',
    'disabled'
  ],

  classNameBindings: [
    'disabled'
  ],

  size: 'medium',
  toggled: false,

  init () {
    this._super(...arguments)

    const toggled = this.toggled
    Ember.assert(`The value passed to ${this.toString()}{toggled} must be boolean`,
      typeof toggled === 'boolean' || 'undefined')
    if (toggled) {
      this.set('toggled', true)
    }
  },

  // UX requirement: label need hold the value
  _onLabel: computed('onLabel', function () {
    const onLabel = this.get('onLabel')
    if (onLabel && typeof onLabel === 'string') {
      return onLabel
    }
    return true
  }),

  _offLabel: computed('offLabel', function () {
    const offLabel = this.get('offLabel')
    if (offLabel && typeof offLabel === 'string') {
      return offLabel
    }
    return false
  }),

  _onValue: computed('onValue', '_onLabel', function () {
    const onValue = this.get('onValue')
    return onValue || this.get('_onLabel')
  }),

  _offValue: computed('offValue', '_offLabel', function () {
    const offValue = this.get('offValue')
    return offValue || this.get('_offLabel')
  }),

  _value: computed('onValue', 'offValue', 'toggled', function () {
    return this.get('toggled') ? this.get('_offValue') : this.get('_onValue')
  }),

  click (e) {
    if (!ViewUtils.isSimpleClick(e)) {
      return true
    }

    e.stopPropagation()
    e.preventDefault()

    if (this.get('disabled')) {
      return
    }
    this.toggleProperty('toggled')
    const toggled = this.get('toggled')
    // when button is toggled (toggled === true), the state of button is false.
    const buttonState = !toggled
    const action = 'onToggle'

    if (this.attrs[action] && this.attrs[action].update) {
      this.attrs[action].update(toggled)
      return true
    } else if (this.attrs[action] && typeof this.attrs[action] === 'function') {
      return this.attrs[action]({toggled: buttonState, value: this.get('_value')})
    }
  }
})
