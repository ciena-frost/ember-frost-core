import Ember from 'ember'
const {
  Component,
  computed
} = Ember
const {
  readOnly
} = computed
import layout from '../templates/components/frost-radio-button'

export default Component.extend({
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
  // TODO PropTypes
  required: false,
  disabled: false,

  groupId: readOnly('parentView.id'),
  groupValue: readOnly('parentView.value'),
  onChange: readOnly('parentView.onChange'),

  checked: computed('groupValue', 'value', function () {
    return this.get('groupValue') === this.get('value')
  }),

  tabindex: Ember.computed('disabled', function () {
    return this.get('disabled') ? -1 : 0
  }),

  init () {
    this._super(...arguments)
    Ember.assert(
      `${this.toString()} must be initialized in the yield block of 'frost-radio-group'`,
      /frost-radio-group/.test(this.parentView.toString()))
    Ember.assert(
      `${this.toString()} must be initialized with a 'value' property`,
      this.get('value')
    )
  },
  keyPress (e) {
    e.preventDefault()
    e.stopPropagation()
    
    let event = Ember.$.Event(null, e)
    let target = Ember.$.clone(Ember.$(e.target).find('input')[0])
    let change = this.get('onChange')
   
    if (e.keyCode === 13) {
      if (!this.get('disabled')) {
        this.set('parentView.value', this.get('value'))
        target.id = this.get('groupId')
        event.target = target
        if (change && typeof change === 'function') {
          change(event)
        }
      }
    }
    return false
  }
})
