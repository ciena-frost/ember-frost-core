import Ember from 'ember';
import layout from '../templates/components/frost-radio-button';
export default Ember.Component.extend({
  layout,
  actions: {
    handleChange (value) {
      this.get('targetObject').send(this.get('changed'), value)
    }
  }
});
