import _ from 'lodash'
import Ember from 'ember'
const {Component, Logger, ViewUtils} = Ember
import {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-toggle-button'

export default Component.extend({
  layout: layout,

  size: 'medium',
  checked: false,

  init() {
    this._super(...arguments);

    const checked = this.checked;
    if ((typeof checked === 'boolean' && checked === true ) ||
      (typeof checked === 'string' && checked === 'true')) {
      this.set('checked', true)
    }
  },

  _value: Ember.computed('value', 'checked', function() {
    if (!this.get('checked')) {
      return
    }
    return this.get('value') || true
  }),

  themeClass: Ember.computed('theme', function () {
    var theme = this.get('theme') || 'default';

    return 'frost-toggle-' + theme;
  }),

  click(e) {

    if (!ViewUtils.isSimpleClick(event)) {
      return true
    }

    e.stopPropagation();
    e.preventDefault();

    this.toggleProperty('checked');
    const checked = this.get('checked')
    const action = 'onClick'

    if (this.attrs[action] && this.attrs[action].update) {
      this.attrs[action].update(checked);
      return true;
    } else if (this.attrs[action]) {
      return this.attrs[action]({checked: checked, value: this.get('_value')});
    }
  }
})
