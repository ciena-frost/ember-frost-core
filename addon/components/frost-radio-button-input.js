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
      const eventClone = Ember.$.Event(null, event)
      const targetClone = Ember.$.clone(event.target)
      targetClone.id = this.groupId
      eventClone.target = targetClone
      this.onChange(eventClone)
    }
  }
})
