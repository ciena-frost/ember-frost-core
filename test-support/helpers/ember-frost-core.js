import {expect} from 'chai'
import Ember from 'ember'
const {$, typeOf} = Ember
import {$hook} from 'ember-hook'

const assign = Object.assign || Ember.assign || Ember.merge

/**
 * @typedef {Object} FrostButtonState
 * @property {Boolean} [disabled=false] - whether or not button is disabled
 * @property {String} [icon] - name of button icon
 * @property {String} [pack="frost"] - name of icon pack for button's icon
 * @property {String} [text] - button text
 */

 /**
  * @typedef {Object} FrostSelectState
  * @property {Boolean} [disabled=false] - whether or not select is disabled
  * @property {Boolean} [error=false] - whether or not select has error
  * @property {Boolean} [focused] - whether or not select is focused
  * @property {Number} [tabIndex=0] - tab index of root element
  */

/**
 * @typedef {Object} FrostTextState
 * @property {String} [align="left"] - text alignment
 * @property {Boolean} [disabled=false] - whether or not input is disabled
 * @property {Boolean} [error=false] - whether or not input is in error state
 * @property {String} [placeholder] - placeholder text
 * @property {Number} [tabIndex=0] - tab index
 * @property {String} [type='text'] - input type
 * @property {String} [value] - value of input
 */

/**
 * Expect element to have disabled state
 * @param {jQuery} $element - element
 * @param {Boolean} disabled - disabled
 * @param {String} [type='element'] - type of element
 */
function expectDisabledState ($element, disabled, type = 'element') {
  expect(
    $element.is(':disabled'),
    `${type} is ${disabled ? 'disabled' : 'enabled'}`
  )
    .to.equal(disabled)
}

/**
 * Expect class on element depending on boolean state
 * @param {jQuery} $element - element to check for class on
 * @param {String} className - name of class
 * @param {Boolean} state - whether or not class should be present
 */
function expectToggleClass ($element, className, state) {
  expect(
    $element.hasClass(className),
    `${state ? 'has' : 'does not have'} ${className} class`
  )
    .to.equal(state)
}

/**
 * Click on element
 * @param {jQuery|String} element - name of Ember hook or jQuery instance
 */
export function click (element) {
  const $element = typeOf(element) === 'string' ? $hook(element) : element
  $element.click()
}

/**
 * Verify button exists with expected state
 * @param {jQuery|String} button - name of Ember hook or jQuery instance
 * @param {FrostButtonState} state - expected button state
 */
export function expectButtonWithState (button, state) {
  const defaults = {
    disabled: false,
    pack: 'frost'
  }

  const $button = typeOf(button) === 'string' ? $hook(button) : button
  state = assign(defaults, state)

  expectDisabledState($button, state.disabled, 'button')

  if (state.icon && state.pack) {
    expect(
      $button.find(`.frost-icon-${state.pack}-${state.icon}`),
      'button has expected icon'
    )
      .to.have.length(1)
  }

  if (state.text) {
    expect(
      $button.find('.text:not(.icon-text)').text().trim(),
      'button has expected text'
    )
      .to.equal(state.text)
  }
}

/**
 * Verify select exists with expected state
 * @param {jQuery|String} select - name of Ember hook or jQuery instance
 * @param {FrostSelectState} state - expected select state
 */
export function expectSelectWithState (select, state) {
  const defaults = {
    disabled: false,
    error: false,
    tabIndex: 0
  }

  const $select = typeOf(select) === 'string' ? $hook(select) : select
  state = assign(defaults, state)

  expect(
    $select.hasClass('frost-select'),
    'has frost-select class'
  )
    .to.equal(true)

  expectToggleClass($select, 'disabled', state.disabled)
  expectToggleClass($select, 'error', state.error)

  expect(
    $select.prop('tabindex'),
    'has expected tab index'
  )
    .to.equal(state.disabled ? -1 : state.tabIndex)

  if ('focused' in state) {
    expectToggleClass($select, 'focused', state.focused)
  }
}

/**
 * Verify text input exists with expected state
 * @param {jQuery|String} input - name of Ember hook or jQuery instance
 * @param {FrostTextState} state - expected input state
 */
export function expectTextInputWithState (input, state) {
  const defaults = {
    align: 'left',
    disabled: false,
    error: false,
    tabIndex: 0,
    type: 'text'
  }

  const $input = typeOf(input) === 'string' ? $hook(input) : input
  state = assign(defaults, state)

  expect(
    $input.hasClass(state.align),
    'input has correct text alignment'
  )
    .to.equal(true)

  expectDisabledState($input, state.disabled, 'input')

  expect(
    $input.hasClass('error'),
    `input ${state.error ? 'has' : 'does not have'} error class`
  )
    .to.equal(state.error)

  ;[
    'placeholder',
    'tabIndex',
    'type'
  ]
    .forEach((key) => {
      if (state[key]) {
        expect(
          $input.prop(key),
          `input as expected ${key}`
        )
          .to.equal(state[key])
      }
    })

  if (state.value) {
    expect(
      $input.val(),
      'input has expected value'
    )
      .to.equal(state.value)
  }
}

/**
 * Fill in an element
 * @param {jQuery|String} element - name of Ember hook or jQuery instance
 * @param {String} value - value to fill in
 */
export function fillIn (element, value) {
  const $element = typeOf(element) === 'string' ? $hook(element) : element
  $element.val(value).trigger('input')
}

/**
 * Get list of buttons
 * @returns {jQuery} buttons
 */
export function findButtons () {
  return $('.frost-button')
}

/**
 * Get list of text inputs
 * @returns {jQuery} text inputs
 * @param {FrostTextState} state - find inputs with state
 */
export function findTextInputs (state) {
  let $inputs = $('.frost-text input')

  if (typeOf(state) !== 'object') {
    return $inputs
  }

  return $inputs.filter((index, input) => {
    if (
      ('disabled' in state && input.disabled !== state.disabled) ||
      ('type' in state && input.type !== state.type)
    ) {
      return false
    }

    return true
  })
}

/**
 * Remove focus from element
 * @param {jQuery|String} element - name of Ember hook or jQuery instance
 */
export function focusout (element) {
  const $element = typeOf(element) === 'string' ? $hook(element) : element
  $element.focusout()
}

export default {
  click,
  expectButtonWithState,
  expectSelectWithState,
  expectTextInputWithState,
  fillIn,
  findButtons,
  findTextInputs,
  focusout
}
