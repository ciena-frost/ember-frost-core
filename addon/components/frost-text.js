import _ from 'lodash'
import Ember from 'ember'
const {Component} = Ember
import computed from 'ember-computed-decorators'

export default Component.extend({
  attributeBindings: ['align', 'autofocus', 'placeholder', 'disabled', 'readonly', 'value', 'type'],
  classNames: ['frost-text'],
  classNameBindings: ['right', 'center'],
  tabindex: 0,

  onChange: Ember.on('input', function (e) {
    const id = this.get('id')
    const value = e.target.value
    const onInput = this.get('onInput')

    if (_.isFunction(onInput)) {
      onInput({id, value})
    }
  }),

  _onFocus: Ember.on('focusIn', function (e) {
    // Selects the text when the frost-text field is selected
    e.target.select()
    // If an onFocus handler is defined, call it
    if (this.attrs.onFocus) {
      this.attrs.onFocus()
    }
  }),

  @computed('value')
  showClear (value) {
    return Boolean(value)
  },

  init () {
    this._super(...arguments)
    this.setProperties({
      center: this.get('align') === 'center',
      right: this.get('align') === 'right'
    })
  },

  actions: {
    clear: function () {
      this.set('value', '')
      this.$('input').focus()
      this.$('input').val('')
      this.$('input').trigger('input')
    },

    onBlur () {
      const onBlur = this.get('onBlur')

      if (onBlur) {
        onBlur()
      }
    }
  }
})
