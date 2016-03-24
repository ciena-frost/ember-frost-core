import Ember from 'ember'
import layout from '../templates/components/frost-password'
import _ from 'lodash'

export default Ember.Component.extend({
  layout: layout,
  classNames: ['frost-password'],
  classNameBindings: ['revealable'],
  isCapsOn: false,
  isRevealerVisible: false,
  revealable: false,
  revealed: false,
  revealIcon: 'frost/show',
  type: 'password',

  focusOut: Ember.on('focusOut', function () {
    this.set('isCapsOn', false)
  }),
  keyDown: Ember.on('keyDown', function (e) {
    var s = e || window.e
    if (this.get('isCapsOn') === false && (s.which === 20 || s.keyCode === 20)) {
      this.set('isCapsOn', true)
    }
  }),
  keyUp: Ember.on('keyUp', function (e) {
    var s = e || window.e
    if (this.get('isCapsOn') === true && (s.which === 20 || s.keyCode === 20)) {
      this.set('isCapsOn', false)
    }
  }),
  keyPressed: Ember.on('keyPress', function (e) {
    var s = String.fromCharCode(e.which || e.keyCode)   // IE support
    if ((s.toUpperCase() === s && s.toLowerCase() !== s && !e.shiftKey) ||
      (s.toUpperCase() !== s && s.toLowerCase() === s && e.shiftKey)) { // caps is on
      this.set('isCapsOn', true)
    }
  }),

  isCapsAndReveal: Ember.computed('isCapsOn', 'isRevealerVisible', 'revealable', function () {
    return this.get('revealable') && this.get('isCapsOn') && this.get('isRevealerVisible')
  }),

  actions: {
    onInput (args) {
      this.set('isRevealerVisible', args.value.length > 0)
      if (_.isFunction(this.get('onInput'))) {
        this.get('onInput')(args)
      }
    },
    toggleReveal () {
      this.toggleProperty('revealed')
      this.set('type', this.get('revealed') ? 'text' : 'password')
      this.set('revealIcon', this.get('revealed') ? 'frost/hide' : 'frost/show')
    }
  }
})
