import Ember from 'ember'
import FrostEvents from '../mixins/frost-events'

const {
  Component,
  computed
} = Ember

export default Component.extend(FrostEvents, {
  // == Properties =============================================================
  attributeBindings: [
    'checked',
    'disabled',
    'value',
    'type'
  ],
  classNames: ['frost-radio-button-input'],
  excludeEvents: ['onChange'],
  tagName: 'input',
  type: 'radio',
  
  // == Computed properties ====================================================
  checked: computed('groupValue', 'value', function () {
    return this.get('groupValue') === this.get('value')
  }),
  
  // == Functions ==============================================================
  init () {
    this._super(...arguments)

    let assert = `${this.toString()} must be initialized in the yield block of 'frost-radio-button'`
    let cond = /frost-radio-button/.test(this.parentView.toString())
    Ember.assert(assert, cond)
  },
  change (event) {
    if (this.onChange && typeof this.onChange === 'function') {
      this.onChange(this.parentView._createEvent(event, event.target))
    }
  }
})
