/**
 * Component definition for the numeric selection field component
 */
import layout from '../templates/components/frost-numeric-select'
import Component from './frost-component'
import Ember from 'ember'
import {PropTypes} from 'ember-prop-types'
import computed, {readOnly} from 'ember-computed-decorators'
const {isPresent} = Ember

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================
  layout,

  // == PropTypes =============================================================

  propTypes: {    // options
    align: PropTypes.string,
    isHookEmbedded: PropTypes.bool,
    receivedHook: PropTypes.string,
    tabindex: PropTypes.number,
    type: PropTypes.string,
    isArrowVisible: PropTypes.bool,
    isAllowInputNegative: PropTypes.bool,
    isAllowUseDownButtonToNegative: PropTypes.bool,
    showError: PropTypes.bool,
    errorMessage: PropTypes.string,
    class: PropTypes.string,

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
    value: PropTypes.string,
    title: PropTypes.string

    // state
  },

  getDefaultProps () {
    return {
      // options
      align: 'left',
      autocapitalize: 'off',
      autocorrect: 'off',
      autofocus: false,
      isArrowVisible: false,
      isAllowInputNegative: true,
      isAllowUseDownButtonToNegative:false,
      showError: false,
      errorMessage: 'Cannot input invalid character',
      isHookEmbedded: false,
      required: false,
      spellcheck: false,
      tabindex: 0,
      type: 'text'
    }
  },

  // == Functions =============================================================

  _isNumberKey (e) {
    let decimalExist = this.get('value') && this.get('value').indexOf('.') >=0
    let charCode = (e.which) ? e.which : e.keyCode

    if(!this.get('isAllowInputNegative')){
      if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57)) {
          return false
       } else if (charCode == 46 && decimalExist) {//check if user can enter decimal point
         return false
       }
      return true
    } else {
      if (charCode == 45 && !this.get('value')) {//check if user can enter negative symbol
        return true
      } else if (charCode == 46 && decimalExist) {
        return false
      } else if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
         return false

      return true
    }
  },

  //calculate how many digit a value has
  _calculateDigit (value) {
    return value.slice(value.indexOf('.')+1).length
  },

  //set calculated and properly formated value
  _setCalculatedValue (value, numberOfDigit) {
    if(this.$('input').val().indexOf('.') > -1) {
      this.set('value', value.toFixed(numberOfDigit).toString())
    } else {
      this.set('value', value.toString())
    }
  },

  // == Computed Properties ===================================================
  /**
   * Determine which scss class should be used
   * @param {boolean} isArrowVisible - if the user allow displaying the up and down arrow buttons
   * @returns {string} - a scss class name
   */
  @computed('isArrowVisible')
  class (isArrowVisible) {
    return isArrowVisible ? 'frost-numeric-select-button' : 'frost-numeric-select'
  },

  // == Lifecycle Hooks =======================================================
  init () {
    this._super(...arguments)
    this.set('receivedHook', this.get('hook'))
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
          this.set('showError', true)
          event.preventDefault();
      }
      else {
        this.set('showError', false)
      }
    },

    _onInput (event) {
      if (isPresent(this.get('_eventProxy.input'))) {
        // Add id and value for legacy support
        event.id = this.get('elementId')
        event.value = event.target.value
        this._eventProxy.input(event)
      }
    },
    _onPlusClick (event) {
      if (this.$('input').val()){
        //calculate how many digit a value has
        let numberOfDigit = this._calculateDigit(this.$('input').val())
        var value = parseFloat(this.get('value'))+1

        if (!this.get('isAllowUseDownButtonToNegative')) {
          if(value >= 0)
            this._setCalculatedValue(value,numberOfDigit)
        } else {
          this._setCalculatedValue(value,numberOfDigit)
        }
      }
    },
    _onMinusClick (event) {
      if (this.$('input').val()){
        let numberOfDigit = this._calculateDigit(this.$('input').val())
        let value = parseFloat(this.get('value'))-1

        if (!this.get('isAllowUseDownButtonToNegative')) {
          if(value >= 0)
            this._setCalculatedValue(value,numberOfDigit)
        } else {
          this._setCalculatedValue(value,numberOfDigit)
        }
      }
    }
  }
})
