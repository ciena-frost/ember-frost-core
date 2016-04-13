import Ember from 'ember'
import computed from 'ember-computed-decorators'
import layout from '../templates/components/frost-checkbox'
import _ from 'lodash/lodash'

export default Ember.Component.extend({
  layout: layout,
  classNames: ['frost-checkbox'],
  classNameBindings: ['sizeClass'],

  @computed('checked')
  /**
   * Determine whether or not input should be checked
   * @param {Boolean|null|undefined} checked - desired checked state
   * @returns {Boolean} whether or not input should be checked
   */
  isChecked (checked) {
    return [null, undefined, false].indexOf(checked) === -1
  },

  @computed('size')
  /**
   * Get class for setting input size
   * @param {String} size - desired size
   * @returns {String} size class (defaults to small if not provided)
   */
  sizeClass (size) {
    return size || 'small'
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
