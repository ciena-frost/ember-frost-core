import Ember from 'ember'
import _ from 'lodash/lodash'
import layout from '../templates/components/frost-textarea'

export default Ember.Component.extend({
  classNames: ['frost-textarea'],
  attributeBindings: ['autofocus', 'placeholder', 'disabled', 'readonly', 'cols', 'rows'],
  layout: layout,

  showClear: false,

  oninput: Ember.on('input', function (e) {
    if (_.isFunction(this.attrs['onInput'])) {
      Ember.run.next(this, function () {
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

  actions: {
    clear: function () {
      this.set('value', '')
      this.$('textarea').focus()
      this.$('textarea').val('')
      this.set('showClear', false)
      this.$('textarea').trigger('input')
    }
  }
})
