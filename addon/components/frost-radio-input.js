import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'input',
  type: 'radio',

  // value - required
  // group - required

  // disabled - optional
  // name - optional
  // required - optional
  // radioClass - string
  // radioId - string

  defaultLayout: null, // ie8 support

  attributeBindings: [
    'checked',
    'disabled',
    'name',
    'required',
    'type',
    'value'
  ],

  checked: computed('group', 'value', function() {
    return this.get('group') === this.get('value');
  }).readOnly(),

  sendChangedAction() {
    this.sendAction('changed', this.get('value'));
  },

  change() {
    let value = this.get('value');
    let group = this.get('group');

    if (group !== value) {
      this.set('group', value); // violates DDAU
      Ember.run.once(this, 'sendChangedAction');
    }
  }
});
