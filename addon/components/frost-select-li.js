import Ember from 'ember';
import layout from '../templates/components/frost-select-li';
import FrostEvents from '../mixins/frost-events'

export default Ember.Component.extend(FrostEvents, {
  tagName: 'li',
  layout
});
