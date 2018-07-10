import {expect} from 'chai'
import Ember from 'ember'
const {typeOf} = Ember // eslint-disable-line
import {$hook} from 'ember-hook'

/**
 * Click on element
 * @param {jQuery|String} element - name of Ember hook or jQuery instance
 */
export function click (element) {
  const $element = typeOf(element) === 'string' ? $hook(element) : element
  $element.click()
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
 * Remove focus from element
 * @param {jQuery|String} element - name of Ember hook or jQuery instance
 */
export function focusout (element) {
  const $element = typeOf(element) === 'string' ? $hook(element) : element
  $element.focusout()
}

/**
 * Expect element to have disabled state
 * @param {jQuery} $element - element
 * @param {Boolean} disabled - disabled
 * @param {String} [type='element'] - type of element
 */
export function expectDisabledState ($element, disabled, type = 'element') {
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
export function expectToggleClass ($element, className, state) {
  if (state === undefined) {
    return
  }

  expect(
    $element.hasClass(className),
    `${state ? 'has' : 'does not have'} ${className} class`
  )
    .to.equal(state)
}
