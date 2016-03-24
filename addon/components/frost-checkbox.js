import Ember from 'ember'
import layout from '../templates/components/frost-checkbox'
import _ from 'lodash/lodash'

export default Ember.Component.extend({
  layout: layout,
  classNames: ['frost-checkbox'],
  classNameBindings: ['size'],

  didInitAttrs () {
    const checked = this.attrs ? this.attrs.checked : false
    this.set('isChecked', checked)

    const checkboxSize = this.get('size')
    switch (checkboxSize) {
      case 'large':
        this.set('size', 'large')
        break
      case 'medium':
        this.set('size', 'medium')
        break
      default:
        this.set('size', 'small')
        break
    }
  },

  didInsertElement () {
    if (this.get('autofocus')) {
      Ember.run.next('render', () => {
        this.$('input').focus()
      })
    }
  },

  inputId: Ember.computed('id', function () {
    const id = this.get('id') || this.elementId
    return `${id}_input`
  }),

  actions: {
    input () {
      let id = this.get('value')

      if (_.isFunction(this.attrs['onInput'])) {
        this.attrs['onInput']({
          id: Ember.isEmpty(id) ? this.get('id') : id,
          value: this.$('input').prop('checked')
        })
      }
    }
  }
})
