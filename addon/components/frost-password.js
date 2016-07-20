import Ember from 'ember'
const {
  Component,
  on,
  run
} = Ember
import FrostEventsProxy from '../mixins/frost-events-proxy'
import layout from '../templates/components/frost-password'
import computed from 'ember-computed-decorators'

export default Component.extend(FrostEventsProxy, {

  // == Properties ============================================================

  classNames: [
    'frost-password'
  ],
  classNameBindings: [
    'isCapsOn',
    'revealable'
  ],
  isCapsOn: false,
  isRevealed: false,
  layout,
  revealable: false,
  tabindex: 0,

  // == Computed properties  ===================================================

  @computed('isRevealed')
  revealMessage (isRevealed) {
    return isRevealed ? 'Hide' : 'Show'
  },

  @computed('isRevealed')
  type (isRevealed) {
    return isRevealed ? 'text' : 'password'
  },

  // == Events ================================================================

  _focusOut: on('focusOut', function (event) {
    // this._super(...arguments)
    this.set('isCapsOn', false)
  }),

  _keyDown: Ember.on('keyDown', function (e) {
    var s = e || window.e
    if (s.which === 20 || s.keyCode === 20) {
      this.set('isCapsOn', true)
    }
  }),

  _keyPress: Ember.on('keyPress', function (event) {
    const c = String.fromCharCode(event.which || event.keyCode)
    if ((c.toUpperCase() === c && c.toLowerCase() !== c && !event.shiftKey) ||
      (c.toUpperCase() !== c && c.toLowerCase() === c && event.shiftKey)) {
      this.set('isCapsOn', true)
    }
  }),

  _keyUp: Ember.on('keyUp', function (e) {
    var s = e || window.e
    if (s.which === 20 || s.keyCode === 20) {
      this.set('isCapsOn', false)
    }
  }),

  // == Actions ===============================================================

  actions: {
    toggleReveal () {
      this.toggleProperty('isRevealed')
      const $input = this.$('input').get(0)
      $input.focus()
      // Move the cursor to the end of the input
      run.next(this, function () {
        $input.selectionStart = $input.selectionEnd = 10000
      })
    }
  }
})
