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
  * @property {String} [focusedItem] - label of focused item
  * @property {String} [items] - list of item labels present in dropdown
  * @property {Boolean} [opened=false] - whether or not select is opened
  * @property {Number} [tabIndex=0] - tab index of root element
  * @property {String} [text=''] - text in select for describing what is selected
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
  if (state === undefined) {
    return
  }

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

/* eslint-disable complexity */
/**
 * Verify select exists with expected state
 * @param {jQuery|String} select - name of Ember hook or jQuery instance
 * @param {FrostSelectState} state - expected select state
 */
export function expectSelectWithState (select, state) {
  const defaults = {
    disabled: false,
    error: false,
    opened: false,
    tabIndex: 0,
    text: ''
  }

  const $select = typeOf(select) === 'string' ? $hook(select) : select
  state = assign(defaults, state)

  expect(
    $select.hasClass('frost-select'),
    'has frost-select class'
  )
    .to.equal(true)

  expectToggleClass($select, 'frost-select-disabled', state.disabled)
  expectToggleClass($select, 'frost-select-error', state.error)
  expectToggleClass($select, 'frost-select-focused', state.focused)
  expectToggleClass($select, 'frost-select-opened', state.opened)

  expect(
    $select.prop('tabindex'),
    'has expected tab index'
  )
    .to.equal(state.disabled ? -1 : state.tabIndex)

  if (state.focusedItem) {
    expect(
      $('.frost-select-list-item-focused').text().trim(),
      'is focused on expected item'
    )
      .to.equal(state.focusedItem)
  }

  const $emptyMessage = $('.frost-select-dropdown-empty-msg')

  if (state.items && state.items.length !== 0) {
    const labels = $('.frost-select-dropdown li')
      .toArray()
      .map((element) => element.textContent.trim())

    expect(labels, 'has expected items').to.eql(state.items)
    expect($emptyMessage, 'does not show empty message').to.have.length(0)
  } else if (state.opened) {
    expect($emptyMessage, 'shows empty message').to.have.length(1)
  }

  expect(
    $select.find('.frost-select-text').text().trim(),
    'has expected text'
  )
    .to.equal(state.text)
}
/* eslint-disable complexity */

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
