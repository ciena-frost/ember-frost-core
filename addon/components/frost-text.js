import _ from 'lodash'
import Ember from 'ember'
const {Component} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import layout from '../templates/components/frost-text'

export default Component.extend({
  // ==========================================================================
  // Dependencies
  // ==========================================================================

  // ==========================================================================
  // Properties
  // ==========================================================================

  attributeBindings: [
    'align',
    'autofocus',
    'disabled',
    'placeholder',
    'readonly',
    'type',
    'value'
  ],
  classNames: ['frost-text'],
  classNameBindings: [
    'center',
    'right'
  ],
  layout,
  tabindex: 0,

  // ==========================================================================
  // Computed Properties
  // ==========================================================================

  @readOnly
  @computed('align')
  /**
   * Determine whether or not text alignment is center
   * @param {[type]} align - text alignment
   * @returns {Boolean} whether or not text alignment is center
   */
  center (align) {
    return align === 'center'
  },

  @readOnly
  @computed('align')
  /**
   * Determine whether or not text alignment is right
   * @param {String} align - text alignment
   * @returns {Boolean} whether or not text alignment is right
   */
  right (align) {
    return align === 'right'
  },

  @readOnly
  @computed('disabled', 'value')
  /**
   * Determine whether or not to show button for clearing out text field
   * @param {Boolean} disabled - whether or not input is disabled
   * @param {String} value - value of text field
   * @returns {Boolean} whether or not to show button for clearing out text field
   */
  showClear (disabled, value) {
    return !disabled && Boolean(value)
  },

  // ==========================================================================
  // Functions
  // ==========================================================================

  // ==========================================================================
  // Events
  // ==========================================================================

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

  // ==========================================================================
  // Actions
  // ==========================================================================

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
