// import _ from 'lodash'
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
    'revealable'
  ],
  layout,
  revealable: false,
  revealed: false,
  $capsLockWarning: null,

  // == Computed properties  ===================================================

  @computed('revealed')
  revealMessage(revealed) {
    return revealed ? 'Hide' : 'Show'
  },

  @computed('revealed')
  type(revealed) {
    return revealed ? 'text' : 'password'
  },

  // // == Events ================================================================

  // didInsertElement() {
  //     const capsLockWarning = $(`
  //       <span class='frost-password-caps-warning'>
  //         Caps on
  //       </span>
  //     `)

  //     this.get('$clearButton').after(capsLockWarning)
  //     this.set('$capsLockWarning', capsLockWarning)

  //      const nativeCapsLockWarningOverlay = $(`
  //       <span class='frost-password-native-caps-warning-overlay' />
  //     `)

  //     this.get('$capsLockWarning').after(nativeCapsLockWarningOverlay)
  //   })
  // },

  // _focusOut: on('focusOut', function(event) {
  //   this._super(...arguments)
  //   this.get('$capsLockWarning').css('opacity', 0)
  // }),

  // _keyDown: Ember.on('keyDown', function (e) {
  //   var s = e || window.e
  //   if (s.which === 20 || s.keyCode === 20) {
  //     this.get('$capsLockWarning').css('opacity', 1)
  //   }
  // }),

  // _keyPress: Ember.on('keyPress', function(event) {
  //   const c = String.fromCharCode(event.which || event.keyCode)
  //   if ((c.toUpperCase() === c && c.toLowerCase() !== c && !event.shiftKey) ||
  //     (c.toUpperCase() !== c && c.toLowerCase() === c && event.shiftKey)) {
  //     this.get('$capsLockWarning').css('opacity', 1)
  //   }
  // }),

  // _keyUp: Ember.on('keyUp', function (e) {
  //   var s = e || window.e
  //   if (s.which === 20 || s.keyCode === 20) {
  //     this.get('$capsLockWarning').css('opacity', 0)
  //   }
  // }),

  // == Actions ================================================================

  actions: {
    toggleReveal() {
      this.toggleProperty('revealed')
      const $input = this.$('input').get(0)
      $input.focus()
      // Move the cursor to the end of the input
      run.next(this, function() {
        $input.selectionStart = $input.selectionEnd = 10000
      })
    }
  }
})
