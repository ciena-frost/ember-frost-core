import _ from 'lodash'
import Ember from 'ember'
import layout from '../templates/components/frost-text'

export default Ember.Component.extend({
  attributeBindings: ['autofocus', 'placeholder', 'disabled', 'readonly', 'value', 'type'],
  classNames: ['frost-text'],
  layout: layout,

  showClear: false,

  onChange: Ember.on('input', function (e) {
    const id = this.get('id')
    const value = e.target.value
    const onInput = this.get('onInput')

    if (_.isFunction(onInput)) {
      onInput({id, value})
    }
    if (e.target.value.length > 0) {
      this.set('showClear', true)
    } else {
      this.set('showClear', false)
    }
  }),

  onFocus: Ember.on('focusIn', function (e) {
    e.target.select()
  }),

  actions: {
    clear: function () {
      this.set('value', '')
      this.$('input').focus()
      this.$('input').val('')
      this.set('showClear', false)
      this.$('input').trigger('input')
    }
  }
})
