import _ from 'lodash'
import Ember from 'ember'
const {Component} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-textarea'

export default Component.extend(PropTypeMixin, {
  // == Dependencies ==========================================================

  // == Properties ============================================================

  attributeBindings: [
    'autofocus',
    'cols',
    'disabled',
    'placeholder',
    'readonly',
    'rows'
  ],
  classNames: ['frost-textarea'],
  layout,

  propTypes: {
    autofocus: PropTypes.bool,
    cols: PropTypes.number,
    disabled: PropTypes.bool,
    hook: PropTypes.string,
    placeholder: PropTypes.string,
    readonly: PropTypes.bool,
    rows: PropTypes.number,
    tabindex: PropTypes.number
  },

  getDefaultProps () {
    return {
      autofocus: false,
      disabled: false,
      readonly: false,
      tabindex: 0
    }
  },

  // == Computed Properties ===================================================

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

  // == Functions =============================================================

  // == Events ================================================================

  oninput: Ember.on('input', function (e) {
    const onInput = this.attrs['onInput']

    if (_.isFunction(onInput)) {
      onInput({
        id: this.get('id'),
        value: e.target.value
      })
    }
  }),

  _onFocus: Ember.on('focusIn', function () {
    // If an onFocus handler is defined, call it
    if (this.attrs.onFocus) {
      this.attrs.onFocus()
    }
  }),

  // == Actions ===============================================================

  actions: {
    clear: function () {
      this.set('value', '')
      this.$('textarea').focus()
      this.$('textarea').val('')
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
