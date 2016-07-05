import Ember from 'ember'

export default Ember.Component.extend({
  tagName: 'input',
  type: 'radio',
  classNames: ['frost-radio-button-input'],
  attributeBindings: [
    'checked',
    'disabled',
    'name',
    'required',
    'type',
    'value'
  ],
  checked: Ember.computed('group', 'value', function () {
    let isChecked = this.get('group') === this.get('value')
    this.parentView.set('checked', isChecked)
    return isChecked
  }).readOnly(),
  init () {
    this._super(...arguments)
    Ember.assert(
      `${this.toString()} must be initialized in the yield block of 'frost-radio-button'`,
      /frost-radio-button/.test(this.parentView.toString()))
  },
  change () {
    this._super(...arguments)
    let value = this.get('value')

    if (this.get('group') !== value) {
      this.set('group', value)
      Ember.run.next(() => {
        this.sendAction('onChange', value)
      })
    }
  }
})
