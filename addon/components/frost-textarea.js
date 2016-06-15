import Ember from 'ember'
const {Component, run} = Ember
import _ from 'lodash/lodash'

export default Component.extend({
  classNames: ['frost-textarea'],
  attributeBindings: ['autofocus', 'placeholder', 'disabled', 'readonly', 'cols', 'rows'],

  showClear: false,
  tabindex: 0,

  oninput: Ember.on('input', function (e) {
    if (_.isFunction(this.attrs['onInput'])) {
      run.next(this, function () {
        this.attrs['onInput']({
          id: this.get('id'),
          value: e.target.value
        })
      })
    }

    if (e.target.value.length > 0) {
      this.set('showClear', true)
    } else {
      this.set('showClear', false)
    }
  }),

  _onFocus: Ember.on('focusIn', function () {
    // If an onFocus handler is defined, call it
    if (this.attrs.onFocus) {
      this.attrs.onFocus()
    }
  }),

  actions: {
    clear: function () {
      this.set('value', '')
      this.$('textarea').focus()
      this.$('textarea').val('')
      this.set('showClear', false)
      this.$('textarea').trigger('input')
    },

    onBlur () {
      const onBlur = this.get('onBlur')

      if (onBlur) {
        onBlur()
      }
    }
  }
})
