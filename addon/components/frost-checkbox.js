import Ember from 'ember'
const {Component, isEmpty, run} = Ember
import computed from 'ember-computed-decorators'
import _ from 'lodash/lodash'

export default Component.extend({
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
  keyPress (e) {
    if (e.keyCode === 32) {
      if (this.get('disabled') !== true) {
        this.$('input').prop('checked', !this.$('input').prop('checked'))
        this.send('input')
      }
      e.preventDefault()
      e.stopPropagation()
      return false
    }
  },
  didInsertElement () {
    if (this.get('autofocus')) {
      run.next('render', () => {
        this.$('input').focus()
      })
    }
  },

  @computed('id')
  inputId (id) {
    id = id || this.elementId
    return `${id}_input`
  },

  _onFocus: Ember.on('focusIn', function (e) {
    // If an onFocus handler is defined, call it
    if (this.attrs.onFocus) {
      this.attrs.onFocus()
    }
  }),

  actions: {
    onBlur () {
      const onBlur = this.get('onBlur')

      if (onBlur) {
        onBlur()
      }
    },

    input () {
      let id = this.get('value')
      if (_.isFunction(this.attrs['onInput'])) {
        this.attrs['onInput']({
          id: isEmpty(id) ? this.get('id') : id,
          value: this.$('input').prop('checked')
        })
      }
    }
  }
})
