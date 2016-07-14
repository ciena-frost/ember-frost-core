import Ember from 'ember'
const {
  TextField,
  isEmpty,
  observer,
  on,
  run,
  $
} = Ember
import FrostEvents from '../mixins/frost-events'
import computed from 'ember-computed-decorators'



export default TextField.extend(FrostEvents, {

  // == Properties =============================================================

  align: 'left',
  attributeBindings: [
    'style'
  ],
  classNames: [
    'frost-text'
  ],
  tabindex: 0,

  // == Computed properties ====================================================

  @computed('align')
  style (align) {
    return Ember.String.htmlSafe(`text-align: ${CSS.escape(align)}`)
  },

  // == Events =================================================================

  didInsertElement() {
    run.schedule('render', this, function () {
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
    })
  },

  _focusIn: on('focusIn', function() {
    this.set('_focused', true)
  }),

  _focusOut: on('focusOut', function(event) {
    this.set('_focused', false)
  }),

  // == Observers  =============================================================

  showClear: observer('value', '_focused', function() {
    if (!this._focused) {
      this.$().next('.frost-text-clear').css('opacity', 0)
      run.later(this, function() {
        this.$().next('.frost-text-clear').css('pointer-events', 'none')
      }, 200)
      return
    }

    if (isEmpty(this.value)) {
      this.$().next('.frost-text-clear').css('opacity', 0)
      run.later(this, function() {
        this.$().next('.frost-text-clear').css('pointer-events', 'none')
      }, 200)
    } else {
      this.$().next('.frost-text-clear').css('opacity', 1)
      run.later(this, function() {
        this.$().next('.frost-text-clear').css('pointer-events', 'auto')
      }, 200)
    }
  }),

  // == Functions ==============================================================

  onClear() {
    this.$().focus()
    this.$().val('')
    this.$().trigger('input')
  }
})
