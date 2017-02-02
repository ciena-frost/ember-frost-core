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

import {expect} from 'chai'
import Ember from 'ember'
const {$, RSVP, run, typeOf} = Ember // eslint-disable-line
import {$hook} from 'ember-hook'

import {expectToggleClass} from './utils'

const assign = Object.assign || Ember.assign || Ember.merge // eslint-disable-line

/* eslint-disable complexity */
/**
 * Verify select exists with expected state
 * @param {jQuery|String} select - name of Ember hook or jQuery instance
 * @param {FrostSelectState} state - expected select state
 */
export function expectWithState (select, state) {
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
      $('.frost-select-list-item-focused .frost-select-list-item-text').data('text'),
      'is focused on expected item'
    )
      .to.equal(state.focusedItem)
  }

  const $emptyMessage = $('.frost-select-dropdown-empty-msg')

  if (state.items && state.items.length !== 0) {
    const labels = $('.frost-select-dropdown li')
      .toArray()
      .map((element) => $(element).find('.frost-select-list-item-text').data('text'))

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
 * Filter frost-select
 * @param {String} filter - filter to apply to select
 */
export function filter (filter) {
  $('.frost-select-dropdown .frost-text-input')
    .val(filter)
    .trigger('input')
}

/**
 * Open frost-select dropdown
 * @param {String} hook - frost-select hook
 */
export function open (hook) {
  // In a real browser when you click on the select with your mouse a
  // focusin event is fired on the component. However when using jQuery's
  // click() method the focusin is not fired so we are programitcally
  // triggering that in this test.
  $hook('select').click().trigger('focusin')
}

/**
 * Select item in select dropdown at given index
 * NOTE: using done() instead of Promise based because promised based causes
 * select to lose focus for some reason. This may have something to with with
 * how mocha is handling done vs promise returns.
 * @param {String} hook - frost-select hook
 * @param {Number} index - index of item to select
 * @param {Function} done - mocha done callback
 */
export function selectItemAtIndex (hook, index, done) {
  $hook(`${hook}-item`, {index}).trigger('mousedown')
  run.next(() => {
    done()
  })
}
