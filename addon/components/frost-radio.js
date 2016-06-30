import Ember from 'ember';

const { computed } = Ember;
import layout from '../templates/components/frost-radio';

export default Ember.Component.extend({
  tagName: '',
  layout,
  // value - passed in, required, the value for this radio button
  // group - passed in, required, the currently selected value

  // optionally passed in:
  // disabled - boolean
  // required - boolean
  // name - string
  // radioClass - string
  // radioId - string

  // polyfill hasBlock for ember versions < 1.13
  hasBlock: computed.bool('template').readOnly(),

  joinedClassNames: computed('classNames', function() {
    let classNames = this.get('classNames');
    if (classNames && classNames.length && classNames.join) {
      return classNames.join(' ');
    }
    return classNames;
  }),

  checked: computed('group', 'value', function() {
    return this.get('group') === this.get('value');
  }).readOnly(),

  actions: {
    changed(newValue) {
      this.sendAction('changed', newValue);
    }
  }
});
