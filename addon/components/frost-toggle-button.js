import _ from 'lodash'
import Ember from 'ember'
const {computed, Component, ViewUtils} = Ember
import layout from '../templates/components/frost-toggle-button'

export default Component.extend({
  layout: layout,

  classNames: ['frost-toggle-button'],

  attributeBindings: [
    'toggled',
    'disabled',
    'value'
  ],

  classNameBindings: [
    'disabled'
  ],

  size: 'medium',
  toggled: false,

  init() {
    this._super(...arguments);

    const toggled = this.toggled;
    if ((typeof toggled === 'boolean' && toggled === true ) ||
      (typeof toggled === 'string' && toggled === 'true')) {
      this.set('toggled', true)
    }
  },

  // UX requirement: label need hold the value
  _onLabel: computed('onLabel', function() {
    const onLabel = this.get('onLabel');
    if (onLabel && typeof onLabel === 'string') {
      return onLabel
    }
    return true
  }),

  _offLabel: computed('offLabel', function() {
    const offLabel = this.get('offLabel');
    if(offLabel && typeof offLabel === 'string') {
      return offLabel
    }
    return false
  }),

  _onValue: computed('onValue', '_onLabel', function() {
    const onValue = this.get('onValue')
    return onValue ? onValue : this.get('_onLabel')
  }),

  _offValue: computed('offValue', '_offLabel', function() {
    const offValue = this.get('offValue')
    return offValue ? offValue : this.get('_offLabel')
  }),

  _value: computed('onValue', 'offValue', 'toggled', function() {
    return this.get('toggled') ? this.get('_onValue') : this.get('_offValue')
  }),

  click(e) {
    if (!ViewUtils.isSimpleClick(event)) {
      return true
    }

    e.stopPropagation();
    e.preventDefault();

    if(this.get('disabled')) {
      return
    }
    this.toggleProperty('toggled');
    const toggled = this.get('toggled')
    const action = 'onToggle'

    if (this.attrs[action] && this.attrs[action].update) {
      this.attrs[action].update(toggled);
      return true;
    } else if (this.attrs[action]) {
      return this.attrs[action]({toggled: toggled, value: this.get('_value')});
    }
  }
})
