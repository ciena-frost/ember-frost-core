import _ from 'lodash'
import Ember from 'ember'
const {Component} = Ember
import computed, {readOnly} from 'ember-computed-decorators'

export default Component.extend({
  // ==========================================================================
  // Dependencies
  // ==========================================================================

  // ==========================================================================
  // Properties
  // ==========================================================================

  classNames: ['frost-password'],
  classNameBindings: ['revealable'],
  isCapsOn: false,
  isRevealerVisible: false,
  revealable: false,
  revealed: false,
  revealIcon: 'show',
  tabindex: 0,
  type: 'password',

  // ==========================================================================
  // Computed Properties
  // ==========================================================================

  @readOnly
  @computed('isCapsOn', 'isRevealerVisible', 'revealable')
  isCapsAndReveal (isCapsOn, isRevealerVisible, revealable) {
    return revealable && isCapsOn && isRevealerVisible
  },

  // ==========================================================================
  // Functions
  // ==========================================================================

  // ==========================================================================
  // Events
  // ==========================================================================

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

  _onFocus: Ember.on('focusIn', function (e) {
    // If an onFocus handler is defined, call it
    if (this.attrs.onFocus) {
      this.attrs.onFocus()
    }
  }),

  // ==========================================================================
  // Actions
  // ==========================================================================

  actions: {
    onBlur () {
      const onBlur = this.get('onBlur')

      if (onBlur) {
        onBlur()
      }
    },

    onInput (args) {
      this.set('isRevealerVisible', args.value.length > 0)
      if (_.isFunction(this.get('onInput'))) {
        this.get('onInput')(args)
      }
    },
    toggleReveal () {
      this.toggleProperty('revealed')
      this.set('type', this.get('revealed') ? 'text' : 'password')
      this.set('revealIcon', this.get('revealed') ? 'hide' : 'show')
    }
  }
})
