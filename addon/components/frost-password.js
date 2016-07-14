// import _ from 'lodash'
import Ember from 'ember'
const {
  on,
  run
} = Ember
import FrostText from 'ember-frost-core/components/frost-text'
// import computed, {readOnly} from 'ember-computed-decorators'

export default FrostText.extend({

  // == Properties ============================================================

  attributeBindings: [
    'type'
  ],
  classNames: [
    'frost-password'
  ],
  revealable: false,
  revealed: false,
  type: 'password',
  $capsLockWarning: null,
  $revealButton: null,

  // == Events ================================================================

  didInsertElement() {
    this._super(...arguments)

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
      const capsLockWarning = $(`
        <span class='frost-password-caps-warning'>
          Caps on
        </span>
      `)

      this.get('$clearButton').after(capsLockWarning)
      this.set('$capsLockWarning', capsLockWarning)
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
