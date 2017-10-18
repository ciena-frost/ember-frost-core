/**
 * Component definition for the frost-checkbox component
 */

import {on} from '@ember/object/evented'
import {run} from '@ember/runloop'
import {isEmpty} from '@ember/utils'

import layout from '../templates/components/frost-checkbox'
import Component from './frost-component'
import {PropTypes} from 'ember-prop-types'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  classNameBindings: ['size'],
  layout,

  // == PropTypes =============================================================

  propTypes: {
    // options
    autofocus: PropTypes.bool,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    inputId: PropTypes.string,
    label: PropTypes.string,
    size: PropTypes.string

    // state
  },

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
    if (!this.get('inputId')) {
      this.set('inputId', `${this.get('elementId')}_input`)
    }
  },

  // == DOM Events ============================================================

  /**
   * Handle the focusIn event
   * @params {Event} e - the event being handled
   */
  _onFocus: on('focusIn', function (e) {
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
      if (this.get('disabled') !== true) {
        this.$('input').prop('checked', !this.$('input').prop('checked'))
        this.send('input')
      }
      e.preventDefault()
      e.stopPropagation()
      return false
    }
  },

  // == Lifecycle Hooks =======================================================

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

  // == Actions ===============================================================

  actions: {
    /**
     * Handle the blur event, calling passed in handler if provided
     */
    onBlur () {
      if (this.onBlur) {
        this.onBlur()
      }
    },

    /**
     * Handle the change event on the checkbox, calling onInput if provided
     */
    input () {
      let id = this.get('value')
      if (this.onInput) {
        this.onInput({
          id: isEmpty(id) ? this.get('elementId') : id,
          value: this.$('input').prop('checked')
        })
      }
    }
  }
})
