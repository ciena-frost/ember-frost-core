import Ember from 'ember'
const {
  Component,
  get,
  isEmpty,
  set,
  typeOf
} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-textarea'

export default Component.extend(PropTypeMixin, {
  // == Dependencies ==========================================================

  // == Properties ============================================================
  classNames: ['frost-textarea'],
  layout,

  propTypes: {
    autofocus: PropTypes.bool,
    cols: PropTypes.string,
    disabled: PropTypes.bool,
    form: PropTypes.string,
    hook: PropTypes.string,
    placeholder: PropTypes.string,
    readonly: PropTypes.bool,
    rows: PropTypes.string,
    tabindex: PropTypes.string,
    value: PropTypes.string,
    wrap: PropTypes.string
  },

  getDefaultProps () {
    return {
      autofocus: false,
      disabled: false,
      readonly: false,
      tabindex: '0',

      cols: null,
      form: null,
      rows: null,
      placeholder: null,
      wrap: null,
      value: null
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('disabled', 'readonly', 'value')
  /**
   * Determine whether or not to show button for clearing out text field
   * @param {Boolean} disabled - whether or not input is disabled
   * @param {Boolean} readonly - whether or not input is readonly
   * @param {String} value - value of text field
   * @returns {Boolean} whether or not to show button for clearing out text field
   */
  showClear (disabled, readonly, value) {
    return !disabled && !isEmpty(value) && !readonly
  },

  // == Functions =============================================================

  // == Events ================================================================

  oninput: Ember.on('input', function (e) {
    const onInput = this.attrs['onInput']

    if (typeOf(onInput) === 'function') {
      onInput({
        id: get(this, 'id'),
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
      set(this, 'value', '')
      this.$('textarea').focus()
      this.$('textarea').val('')
      this.$('textarea').trigger('input')
    },

    onBlur () {
      const onBlur = get(this, 'onBlur')

      if (onBlur) {
        onBlur()
      }
    }
  }
})
