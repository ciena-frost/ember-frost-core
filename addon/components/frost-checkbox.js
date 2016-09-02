import Ember from 'ember'
const {Component, isEmpty, run, typeOf} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-checkbox'

export default Component.extend(PropTypeMixin, {
  // == Dependencies ==========================================================

  // == Properties ============================================================

  classNames: ['frost-checkbox'],
  classNameBindings: ['size'],
  layout,

  propTypes: {
    autofocus: PropTypes.bool,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    hook: PropTypes.string,
    inputId: PropTypes.string,
    label: PropTypes.string,
    size: PropTypes.string
  },

  getDefaultProps () {
    return {
      autofocus: false,
      checked: false,
      disabled: false,
      inputId: null,
      label: '',
      size: 'small'
    }
  },

  // == Computed properties  ===================================================

  // == Functions =============================================================

  /* Ember.Component method */
  didInsertElement () {
    if (this.get('autofocus')) {
      run.next('render', () => {
        this.$('input').focus()
      })
    }
  },

  init () {
    this._super(...arguments)
    this._setInputId()
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

  /**
   * Set unique inputId that will be set on label and input element
   * @private
   * @returns {undefined}
   */
  _setInputId () {
    if (!this.get('inputId')) {
      this.set('inputId', `${this.get('elementId')}_input`)
    }
  },

  // == Events ================================================================

  _onFocus: Ember.on('focusIn', function (e) {
    // If an onFocus handler is defined, call it
    if (this.attrs.onFocus) {
      this.attrs.onFocus()
    }
  }),

  // == Actions ===============================================================

  actions: {
    onBlur () {
      const onBlur = this.get('onBlur')

      if (onBlur) {
        onBlur()
      }
    },

    input () {
      let id = this.get('value')
      if (typeOf(this.attrs['onInput']) === 'function') {
        this.attrs['onInput']({
          id: isEmpty(id) ? this.get('elementId') : id,
          value: this.$('input').prop('checked')
        })
      }
    }
  }
})
