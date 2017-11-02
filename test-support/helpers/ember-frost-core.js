import Ember from 'ember'
const {$, typeOf} = Ember // eslint-disable-line
import {$hook} from 'ember-hook'

const assign = Object.assign || Ember.assign || Ember.merge // eslint-disable-line

import {
  expectWithState as _expectButtonWithState,
  find as _findButtons
} from './ember-frost-core/frost-button'

import {
  expectWithState as _expectSelectWithState,
  filter as _filterSelect
} from './ember-frost-core/frost-select'

import {
  expectWithState as _expectTextInputWithState,
  find as _findTextInputs
} from './ember-frost-core/frost-text'

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

// TODO: Remove these as part of next major release, expecting consumers to
// import {expectWithState} from 'dummy/tests/helpers/ember-frost-core/frost-select'
// instead so we don't have to manange this import/re-export madness.
export const expectButtonWithState = _expectButtonWithState
export const expectSelectWithState = _expectSelectWithState
export const expectTextInputWithState = _expectTextInputWithState
export const filterSelect = _filterSelect
export const findButtons = _findButtons
export const findTextInputs = _findTextInputs

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
