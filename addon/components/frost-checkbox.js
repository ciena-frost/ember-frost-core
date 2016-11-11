import Ember from 'ember'
const {
  Component,
  get,
  isEmpty,
  run,
  set,
  typeOf
} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-checkbox'

export default Component.extend(PropTypeMixin, {
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

  // == Functions =============================================================

  /* Ember.Component method */
  didInsertElement () {
    if (get(this, 'autofocus')) {
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
      if (get(this, 'disabled') !== true) {
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
    if (!get(this, 'inputId')) {
      set(this, 'inputId', `${get(this, 'elementId')}_input`)
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
      const onBlur = get(this, 'onBlur')

      if (onBlur) {
        onBlur()
      }
    },

    input () {
      let id = get(this, 'value')
      if (typeOf(get(this, 'onInput')) === 'function') {
        get(this, 'onInput')({
          id: isEmpty(id) ? get(this, 'elementId') : id,
          value: this.$('input').prop('checked')
        })
      }
    }
  }
})
