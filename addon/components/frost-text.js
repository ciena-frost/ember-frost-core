import computed from 'ember-computed-decorators'
import Ember from 'ember'
const {
  Component,
  isEmpty,
  observer,
  on,
  run,
  $
} = Ember
import FrostEventsProxy from '../mixins/frost-events-proxy'
import layout from '../templates/components/frost-text'

export default Component.extend(FrostEventsProxy, {

  // // == Properties =============================================================

  // align: 'left',
  // attributeBindings: [
  //   'style'
  // ],
  // classNames: [
  //   'frost-text-input'
  // ],
  layout,
  // tabindex: 0,
  type: 'text',
  // $clearButton: null,

  // // == Computed properties ====================================================

  // @computed('align')
  // style(align) {
  //   return Ember.String.htmlSafe(`text-align: ${CSS.escape(align)}`)
  // },

  // // == Events =================================================================

  // didInsertElement() {
  //   run.schedule('render', this, function () {
  //     this.$().wrap(`<div class='frost-text'></div>`)

  //     const clearButton = $(`
  //       <svg class='frost-text-clear' tabindex=-1 fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
  //         <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  //         <path d="M0 0h24v24H0z" fill="none"/>
  //       </svg>
  //     `)

  //     clearButton.click(() => {
  //       this.onClear()
  //     })

  //     this.$().after(clearButton)
  //     this.set('$clearButton', clearButton)
  //   })
  // },

  // _focusIn: on('focusIn', function() {
  //   this.set('_focused', true)
  // }),

  // _focusOut: on('focusOut', function(event) {
  //   this.set('_focused', false)
  // }),

  // // == Observers  =============================================================

  // showClear: observer('value', '_focused', function() {
  //   if (!this._focused) {
  //     this.get('$clearButton').css('opacity', 0)
  //     run.later(this, function() {
  //       this.get('$clearButton').css('pointer-events', 'none')
  //     }, 200)
  //     return
  //   }

  //   if (isEmpty(this.value)) {
  //     this.get('$clearButton').css('opacity', 0)
  //     run.later(this, function() {
  //       this.get('$clearButton').css('pointer-events', 'none')
  //     }, 200)
  //   } else {
  //     this.get('$clearButton').css('opacity', 1)
  //     run.later(this, function() {
  //       this.get('$clearButton').css('pointer-events', 'auto')
  //     }, 200)
  //   }
  // }),

  // // == Functions ==============================================================

  // onClear() {
  //   this.$().focus()
  //   this.$().val('')
  //   this.$().trigger('input')
  // }

  // == Actions ================================================================

  // Setting 'keyUp' directly on the {{input}} helper overwrites
  // Ember's TextSupport keyUp property, which means that other
  // TextSupport events (i.e. 'enter' and 'escape') don't fire.
  // To avoid this, we use the TextSupport 'key-up' event and
  // proxy the event to the keyUp handler.
  actions: {
    keyUp(value, event) {
      this._eventProxy.keyUp(event)
    }
  }
})
