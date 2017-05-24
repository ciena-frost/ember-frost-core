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
    showError: PropTypes.bool,
    errorMessage: PropTypes.string,
    class: PropTypes.string,
    decreaseButtonDisable: PropTypes.bool,
    increaseButtonDisable: PropTypes.bool,

    // Setting these as part of establishing an inital value
    autocapitalize: PropTypes.string,
    autofocus: PropTypes.bool,
    autocorrect: PropTypes.string,
    form: PropTypes.string,
    maxlength: PropTypes.number,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    selectionDirection: PropTypes.string,
    spellcheck: PropTypes.bool,
    value: PropTypes.string.isRequired,
    title: PropTypes.string,

    // state
    _numericErrorMessage: PropTypes.string,
    _errorMessage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ])
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
      showError: false,
      isHookEmbedded: false,
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
    let symbolCharCode = {
      dash: 45,
      period: 46,
      unitSeperator: 31,
      number_0: 48,
      number_9: 57
    }
    let returnValue = true
    if (this.get('allowNegativeValues')) {
      /* check if user can enter negative symbol*/

      /* get the cursor position to see if the negative sign is placed at the front of the numbers */
      let cursorPos = this.$()[0].getElementsByTagName('input')[0].selectionStart
      if (charCode === symbolCharCode.dash && cursorPos === 0) {
        return true
      }
      return returnValue && this.checkIfKeyInvalid(symbolCharCode.period, symbolCharCode.dash,
        symbolCharCode.number_0, symbolCharCode.number_9, symbolCharCode.unitSeperator, charCode, decimalExist)
    } else {
      return returnValue && this.checkIfKeyInvalid(symbolCharCode.period, symbolCharCode.dash,
        symbolCharCode.number_0, symbolCharCode.number_9, symbolCharCode.unitSeperator, charCode, decimalExist)
    }
  },

  checkIfKeyInvalid (period, dash, number0, number9, unitSeperator, charCode, decimalExist) {
    if (charCode === period && decimalExist) {
      return false
    } else if (charCode !== period && charCode > unitSeperator &&
      (charCode < number0 || charCode > number9)) {
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
  decreaseButtonDisable (value, allowNegativeValues) {
    return (parseFloat(value) <= 0 && !allowNegativeValues) || !value
  },

  @readOnly
  @computed('value')
  /**
   * Determine if the increase button should be disabled
   * @param {string} value - if the value was less or equal to zero, the decrease button will be disabled
   * @returns {bool} - set increase button disabled
   */
  increaseButtonDisable (value) {
    return !value
  },

  @readOnly
  @computed('errorMessage', '_numericErrorMessage')
  /**
   * Determine if the decrease button should be disabled
   * @param {string} errorMessage - custom error message
   * @param {string} _numericErrorMessage - default error message
   * @returns {bool} {string} - if error message exist, return message, otherwise return false
   */
  _errorMessage (errorMessage, _numericErrorMessage) {
    if (errorMessage) {
      return errorMessage
    } else if (isPresent(_numericErrorMessage)) {
      return _numericErrorMessage
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
    keyUp (value, event) {
      if (isPresent(this.get('_eventProxy.keyUp'))) {
        this._eventProxy.keyUp(event)
      }
    },

    _onKeyPress (event) {
      if (!this._isNumberKey(event)) {
        this.set('_numericErrorMessage', 'Input must be numeric')
        event.preventDefault()
      } else {
        this.set('_numericErrorMessage', '')
      }
    },

    _onInput (event) {
      this.set('value', event.target.value)
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
