import Ember from 'ember'
const {
  Component,
  computed
} = Ember

export default Component.extend({
  attributeBindings: [
    'checked',
    'disabled',
    'value',
    'type'
  ],
  classNames: ['frost-radio-button-input'],
  tagName: 'input',
  type: 'radio',

  checked: computed('groupValue', 'value', function () {
    return this.get('groupValue') === this.get('value')
  }),

  init () {
    this._super(...arguments)
    Ember.assert(
      `${this.toString()} must be initialized in the yield block of 'frost-radio-button'`,
      /frost-radio-button/.test(this.parentView.toString()))
  },

  change (event) {
    if (this.onChange && typeof this.onChange === 'function') {
      this.onChange(this.parentView._createEvent(event, event.target))
    }
  }
})
