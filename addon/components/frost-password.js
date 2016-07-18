// import _ from 'lodash'
import Ember from 'ember'
const {
  Component,
  on,
  run
} = Ember
import FrostEvents from '../mixins/frost-events'
import layout from '../templates/components/frost-password'
// import computed, {readOnly} from 'ember-computed-decorators'

export default Component.extend(FrostEvents, {

  // == Properties ============================================================

  attributeBindings: [
    'type'
  ],
  classNames: [
    'frost-password-input'
  ],
  classNameBindings: [
    'revealable'
  ],
  layout,
  revealable: false,
  revealed: false,
  type: 'password',
  $capsLockWarning: null,
  $revealButton: null,

  // == Events ================================================================

  didInsertElement() {
    if (this.revealable) {
      run.schedule('render', this, function () {
        const revealButton = $(`
          <span class='frost-password-reveal'>
            Show
          </span>
        `)

        revealButton.click(() => {
          this.onReveal()
        })

        this.$().after(revealButton)
        this.set('$revealButton', revealButton)
      })
    }

    run.schedule('render', this, function() {
      this.$().wrap(`<div class='frost-password'></div>`)

      const clearButton = $(`
        <svg class='frost-text-clear' tabindex=-1 fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      `)

      clearButton.click(() => {
        this.onClear()
      })

      this.$().after(clearButton)
      this.set('$clearButton', clearButton)

      const capsLockWarning = $(`
        <span class='frost-password-caps-warning'>
          Caps on
        </span>
      `)

      this.get('$clearButton').after(capsLockWarning)
      this.set('$capsLockWarning', capsLockWarning)

       const nativeCapsLockWarningOverlay = $(`
        <span class='frost-password-native-caps-warning-overlay' />
      `)

      this.get('$capsLockWarning').after(nativeCapsLockWarningOverlay)
    })
  },

  _focusOut: on('focusOut', function(event) {
    this._super(...arguments)
    this.get('$capsLockWarning').css('opacity', 0)
  }),

  _keyDown: Ember.on('keyDown', function (e) {
    var s = e || window.e
    if (s.which === 20 || s.keyCode === 20) {
      this.get('$capsLockWarning').css('opacity', 1)
    }
  }),

  _keyPress: Ember.on('keyPress', function(event) {
    const c = String.fromCharCode(event.which || event.keyCode)
    if ((c.toUpperCase() === c && c.toLowerCase() !== c && !event.shiftKey) ||
      (c.toUpperCase() !== c && c.toLowerCase() === c && event.shiftKey)) {
      this.get('$capsLockWarning').css('opacity', 1)
    }
  }),

  _keyUp: Ember.on('keyUp', function (e) {
    var s = e || window.e
    if (s.which === 20 || s.keyCode === 20) {
      this.get('$capsLockWarning').css('opacity', 0)
    }
  }),

  // == Functions ==============================================================

  onReveal() {
    this.toggleProperty('revealed')
    this.set('type', this.get('revealed') ? 'text' : 'password')
    if (this.get('revealed')) {
      this.get('$revealButton').text('Hide')
      this.$().focus()
    } else {
      this.get('$revealButton').text('Show')
      this.$().focus()
    }
  }

})
