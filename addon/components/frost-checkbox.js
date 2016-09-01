import Ember from 'ember'
const {Component, isEmpty, run, typeOf} = Ember
import computed from 'ember-computed-decorators'
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
    label: PropTypes.string,
    size: PropTypes.string
  },

  getDefaultProps () {
    return {
      autofocus: false,
      checked: false,
      disabled: false,
      label: '',
      size: 'small'
    }
  },

  // == Computed properties  ===================================================

  @computed('id')
  /**
   * Get input ID
   * @param {String} id - ID to use for input
   * @returns {String} input ID
   */
  inputId (id) {
    id = id || this.elementId
    return `${id}_input`
  },

  // == Functions =============================================================

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

  /* Ember.Component method */
  didInsertElement () {
    if (this.get('autofocus')) {
      run.next('render', () => {
        this.$('input').focus()
      })
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
          id: isEmpty(id) ? this.get('id') : id,
          value: this.$('input').prop('checked')
        })
      }
    }
  }
})
