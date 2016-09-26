import Ember from 'ember'
const {Component} = Ember
import layout from '../templates/components/frost-toggle-label'

export default Component.extend({
  layout: layout,
  attributeBindings: [
    'for'
  ],

  classNameBindings: [
    'disabled',
    'size'
  ],

  classNames: ['frost-toggle-button'],
  tagName: 'label'
})
