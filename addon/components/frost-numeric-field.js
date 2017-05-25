/**
 * Component definition for the numeric selection field component
 */
import Ember from 'ember'
const {isPresent} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-numeric-field'
import Component from './frost-component'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================
  layout,

  // == PropTypes =============================================================

  propTypes: {
    // options
    align: PropTypes.string,
    tabindex: PropTypes.number,
    type: PropTypes.string,
    isIncrementControlVisible: PropTypes.bool,
    allowNegativeValues: PropTypes.bool,
    errorMessage: PropTypes.string,
    class: PropTypes.string,

    // Setting these as part of establishing an inital value
    autocapitalize: PropTypes.string,
    autofocus: PropTypes.bool,
    autocorrect: PropTypes.string,
    form: PropTypes.string,
    maxlength: PropTypes.number,
    placeholder: PropTypes.string,
    readonly: PropTypes.bool,
    required: PropTypes.bool,
    selectionDirection: PropTypes.string,
    spellcheck: PropTypes.bool,
    value: PropTypes.string.isRequired,
    title: PropTypes.string,

    // state
    _internalErrorMessage: PropTypes.string,
    _errorMessage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    _decreaseButtonDisable: PropTypes.bool,
    _increaseButtonDisable: PropTypes.bool
  },

  getDefaultProps () {
    return {
      // options
      align: 'left',
      autocapitalize: 'off',
      autocorrect: 'off',
      autofocus: false,
      isIncrementControlVisible: false,
      allowNegativeValues: false,
      isHookEmbedded: false,
      readonly: false,
      required: false,
      spellcheck: false,
      tabindex: 0,
      type: 'text'
    }
  },

  // == Functions =============================================================

  _isNumberKey (e) {
    const value = this.get('value')
    let decimalExist = value && value.indexOf('.') >= 0
    let charCode = e.which || e.keyCode
    let returnValue = true
    if (this.get('allowNegativeValues')) {
      /* check if user can enter negative symbol*/

      /* get the cursor position to see if the negative sign is placed at the front of the numbers */
      let cursorPos = this.$()[0].getElementsByTagName('input')[0].selectionStart
      if (String.fromCharCode(charCode) === '-' && cursorPos === 0) {
        return true
      }
      return returnValue && this.checkIfKeyInvalid(charCode, decimalExist)
    } else {
      return returnValue && this.checkIfKeyInvalid(charCode, decimalExist)
    }
  },

  checkIfKeyInvalid (charCode, decimalExist) {
    if (String.fromCharCode(charCode) === '.' && decimalExist) {
      return false
    } else if (String.fromCharCode(charCode) !== '.' && charCode > 31 &&
      (String.fromCharCode(charCode) < '0' || String.fromCharCode(charCode) > '9')) {
      return false
    } else {
      return true
    }
  },

 /** calculate how many digit a value has
  * @param {string} value - value of the input
  * @returns {number} - number of digits
 */
  _calculateDigit (value) {
    return value.slice(value.indexOf('.') + 1).length
  },

  /** calculate how many digit a value has
    * @param {string} value - value of the input
    * @param {number} numberOfDigit - number of digit
 */
  _setCalculatedValue (value, numberOfDigit) {
    if (this.get('value').indexOf('.') > -1) {
      this.set('value', value.toFixed(numberOfDigit).toString())
    } else {
      this.set('value', value.toString())
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('isIncrementControlVisible')
  /**
   * Determine which scss class should be used
   * @param {boolean} isIncrementControlVisible - if the user allow displaying the up and down arrow buttons
   * @returns {string} - a scss class name
   */
  class (isIncrementControlVisible) {
    return isIncrementControlVisible ? 'field-input arrow-visible' : 'field-input'
  },

  @readOnly
  @computed('value', 'allowNegativeValues')
  /**
   * Determine if the decrease button should be disabled
   * @param {string} value - if the value was less or equal to zero, the decrease button will be disabled
   * @param {bool} allowNegativeValues - if the user is allowed to enter negative numbers, the button will be enabled
   * @returns {bool} - set decrease button disabled
   */
  _decreaseButtonDisable (value, allowNegativeValues) {
    return (parseFloat(value) <= 0 && !allowNegativeValues) || !value
  },

  @readOnly
  @computed('value')
  /**
   * Determine if the increase button should be disabled
   * @param {string} value - if the value was less or equal to zero, the decrease button will be disabled
   * @returns {bool} - set increase button disabled
   */
  _increaseButtonDisable (value) {
    return !value
  },

  @readOnly
  @computed('errorMessage', '_internalErrorMessage')
  /**
   * Determine if the decrease button should be disabled
   * @param {string} errorMessage - custom error message
   * @param {string} _internalErrorMessage - default error message
   * @returns {bool} {string} - if error message exist, return message, otherwise return false
   */
  _errorMessage (errorMessage, _internalErrorMessage) {
    if (errorMessage && isPresent(_internalErrorMessage)) {
      return errorMessage
    } else if (isPresent(_internalErrorMessage)) {
      return _internalErrorMessage
    } else {
      return false
    }
  },

  // == Lifecycle Hooks =======================================================
  init () {
    this._super(...arguments)
    if (this.get('isHookEmbedded')) {
      this.set('hook', '')
    }
  },
  // == Actions ===============================================================

  actions: {
    _onKeyPress (event) {
      if (!this._isNumberKey(event)) {
        this.set('_internalErrorMessage', 'Input must be numeric')
        event.preventDefault()
      } else {
        this.set('_internalErrorMessage', '')
      }
    },

    _onInput (event) {
      if (isPresent(this.get('_eventProxy.input'))) {
        this._eventProxy.input(event)
      }
    },

    _onFocusOut (event) {
      /* Check if there is a decimal point at the end of the value */
      if (this.get('value').slice(-1) === '.') {
        this.set('_internalErrorMessage', 'Input can not end with decimal point')
      }
    },

    _onPlusClick (event) {
      /** calculate how many digit a value has */
      let numberOfDigit = this._calculateDigit(this.get('value'))
      var value = parseFloat(this.get('value')) + 1

      this._setCalculatedValue(value, numberOfDigit)
    },

    _onMinusClick (event) {
      let numberOfDigit = this._calculateDigit(this.get('value'))
      let value = parseFloat(this.get('value')) - 1
      if ((!this.get('allowNegativeValues') && (value >= 0)) || (this.get('allowNegativeValues'))) {
        this._setCalculatedValue(value, numberOfDigit)
      }
    }
  }
})
