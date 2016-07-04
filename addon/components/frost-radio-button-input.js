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
    return this.get('group') === this.get('value')
  }).readOnly(),

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
