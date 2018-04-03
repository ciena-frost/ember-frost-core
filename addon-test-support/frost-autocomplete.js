import {expect} from 'chai'
import Ember from 'ember'
const {$, assign, typeOf} = Ember
import {$hook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'

/**
 * Verify select exists with expected state
 * @param {jQuery|String} select - name of Ember hook or jQuery instance
 * @param {AutoCompleteState} state - expected selection state
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
    $select.hasClass('frost-autocomplete'),
    'has frost-select class'
  )
    .to.equal(true)

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

  validateState(state)
}

function validateState (state) {
  const $emptyMessage = $('.frost-select-dropdown-empty-msg')

  if (state.items && state.items.length !== 0) {
    const labels = $('.frost-autocomplete-dropdown li')
      .toArray()
      .map((element) => $(element).find('.frost-select-list-item-text').data('text'))

    expect(labels, 'has expected items').to.eql(state.items)
    expect($emptyMessage, 'does not show empty message').to.have.length(0)
  } else if (state.opened) {
    expect($emptyMessage, 'shows empty message').to.have.length(1)
  }
}

/**
 * Open frost-autocomplete dropdown
 * @param {String} [hook='select'] - frost-autocomplete hook
 * @returns {Promise} the resolved promise from ember-test-helpers/wait
 */
export function open (hook = 'autocomplete-text-input') {
  // In a real browser when you click on the select with your mouse a
  // focusin event is fired on the component. However when using jQuery's
  // click() method the focusin is not fired so we are programitcally
  // triggering that in this test.
  $hook(hook).click().trigger('focusin')
  return wait()
}

/**
 * Close frost-autocomplete dropdown
 * @param {String} [hook='select'] - frost-autocomplete hook
 * @returns {Promise} the resolved promise from ember-test-helpers/wait
 */
export function close (hook = 'autocomplete-text-input') {
  $hook(hook).trigger('focusout')
  return wait()
}
