/**
 * @typedef {Object} FrostButtonState
 * @property {Boolean} [disabled=false] - whether or not button is disabled
 * @property {String} [icon] - name of button icon
 * @property {String} [pack="frost"] - name of icon pack for button's icon
 * @property {String} [text] - button text
 */

import {assign, merge} from '@ember/polyfills'
import {typeOf} from '@ember/utils'

import {expect} from 'chai'
import {$hook} from 'ember-hook'
import $ from 'jquery'

import {expectDisabledState} from './utils'

const objectAssign = Object.assign || assign || merge // eslint-disable-line

/**
 * Verify button exists with expected state
 * @param {jQuery|String} button - name of Ember hook or jQuery instance
 * @param {FrostButtonState} state - expected button state
 */
export function expectWithState (button, state) {
  const defaults = {
    disabled: false,
    pack: 'frost'
  }

  const $button = typeOf(button) === 'string' ? $hook(button) : button
  state = objectAssign(defaults, state)

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
 * Get list of buttons
 * @returns {jQuery} buttons
 */
export function find () {
  return $('.frost-button')
}
