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

import {expect} from 'chai'
import Ember from 'ember'
const {$, typeOf} = Ember // eslint-disable-line
import {$hook} from 'ember-hook'

import {expectDisabledState} from './utils'

const assign = Object.assign || Ember.assign || Ember.merge // eslint-disable-line

/**
 * Verify text input exists with expected state
 * @param {jQuery|String} input - name of Ember hook or jQuery instance
 * @param {FrostTextState} state - expected input state
 */
export function expectWithState (input, state) {
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
 * Get list of text inputs
 * @returns {jQuery} text inputs
 * @param {FrostTextState} state - find inputs with state
 */
export function find (state) {
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
