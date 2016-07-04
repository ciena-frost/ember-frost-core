import Ember from 'ember'
import layout from '../templates/components/frost-radio-button'
export default Ember.Component.extend({
  classNames: ['frost-radio-button'],
  classNameBindings: [
    'checked',
    'disabled',
    'required'
  ],
  attributeBindings: ['tabindex'],
  layout,
  required: false,
  disabled: false,
  tabindex: Ember.computed('disabled', function () {
    return this.get('disabled') ? -1 : 0
  }),
  group: Ember.computed.alias('parentView.id'),
  onChange: Ember.computed.alias('parentView.onChange'),
  init () {
    this._super(...arguments)
    Ember.assert(
      `${this.toString()} must be initialized in the yield block of 'frost-radio-group'`,
      /frost-radio-group/.test(this.parentView.toString()))
    Ember.assert(
      `${this.toString()} must be initialized with a truthey 'value' property`,
      this.get('value')
    )
  },
  actions: {
    onChange (value) {
      let handler = this.get('onChange')
      if (handler && typeof handler === 'function') {
        handler(value)
      }
    }
  }
})
