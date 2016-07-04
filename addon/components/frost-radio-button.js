import Ember from 'ember'
import layout from '../templates/components/frost-radio-button'
export default Ember.Component.extend({
  classNames: ['frost-radio-button'],
  layout,
  group: Ember.computed.alias('parentView.id'),
  onChange: Ember.computed.alias('parentView.onChange'),
  init () {
    this._super(...arguments)
    Ember.assert(
      `${this.toString()} must be initialized in the yield block of 'frost-radio-group'`,
      /frost-radio-group/.test(this.parentView.toString()))
  },
  actions: {
    handleChange (value) {
      this.get('targetObject').send(this.get('onChange'), value)
    }
  }
})
