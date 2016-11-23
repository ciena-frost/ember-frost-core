/**
 * Component definition for the frost-checkbox component
 */
import Ember from 'ember'
const {Component, get, isEmpty, run, set, typeOf} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-checkbox'

export default Component.extend(PropTypeMixin, {
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  classNameBindings: ['size'],
  classNames: ['frost-checkbox'],
  layout,

  // == PropTypes =============================================================

  /**
   * Properties for this component. Options are expected to be (potentially)
   * passed in to the component. State properties are *not* expected to be
   * passed in/overwritten.
   */
  propTypes: {
    // options
    autofocus: PropTypes.bool,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    hook: PropTypes.string,
    inputId: PropTypes.string,
    label: PropTypes.string,
    size: PropTypes.string,

    // state

    // keywords
    classNameBindings: PropTypes.arrayOf(PropTypes.string),
    classNames: PropTypes.arrayOf(PropTypes.string),
    layout: PropTypes.any
  },

  /** @returns {Object} the default property values when not provided by consumer */
  getDefaultProps () {
    return {
      // options
      autofocus: false,
      checked: false,
      disabled: false,
      inputId: null,
      label: '',
      size: 'small'
    }
  },

  // == Functions =============================================================

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

  // == DOM Events ============================================================

  /**
   * Handle the focusIn event
   * @params {Event} e - the event being handled
   */
  _onFocus: Ember.on('focusIn', function (e) {
    // If an onFocus handler is defined, call it
    if (this.attrs.onFocus) {
      this.attrs.onFocus()
    }
  }),

  /**
   * Handle the keypress event
   * @param {Event} e - the event being handled
   * @returns {Boolean|undefined} false if we want to stop propagation
   */
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

  // == Lifecycle Hooks =======================================================

  /* Ember.Component method */
  didInsertElement () {
    if (get(this, 'autofocus')) {
      run.next('render', () => {
        this.$('input').focus()
      })
    }
  },

  /* Ember.Component method */
  init () {
    this._super(...arguments)
    this._setInputId()
  },

  // == Actions ===============================================================

  actions: {
    /**
     * Handle the blur event, calling passed in handler if provided
     */
    onBlur () {
      const onBlur = get(this, 'onBlur')

      if (onBlur) {
        onBlur()
      }
    },

    /**
     * Handle the change event on the checkbox, calling onInput if provided
     */
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
