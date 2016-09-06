import _ from 'lodash'
import Ember from 'ember'
const {
  A: EmberArray,
  Component,
  get,
  set,
  typeOf
 } = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import FrostEventsProxy from '../mixins/frost-events-proxy'

import layout from '../templates/components/frost-select'
import Redux from 'npm:redux'
import {
  selectItem,
  closeDropDown,
  openDropDown,
  selectHover,
  moveHoverNext,
  moveHoverPrev,
  mouseHoverItem,
  clickArrow,
  updateSearchText,
  resetDropDown,
  selectValue
} from '../actions/frost-select'

import reducer from '../reducers/frost-select'

/**
 * Map of human readable keys to their key codes
 * @type {Object}
 */
const keyCodes = {
  backspace: 8,
  down: 40,
  enter: 13,
  esc: 27,
  up: 38,
  tab: 9
}

const ATTR_MAP_DELIM = '->'
// TODO: add jsdoc
function isAttrDifferent (newAttrs, oldAttrs, attributeName) {
  newAttrs = newAttrs || {}
  oldAttrs = oldAttrs || {}

  let oldValue = get(oldAttrs, attributeName + '.value')
  let newValue = get(newAttrs, attributeName + '.value')

  return newValue !== undefined && !_.isEqual(oldValue, newValue)
}

/** Hook for handling outside element click
 * @param {Object} event - JQuery event object
 */
function handleOutsideClick (event) {
  const $target = Ember.$(event.target)
  if (!$target.closest(this.$()).length) {
    this.onOutsideClick()
  }
}

export default Component.extend(FrostEventsProxy, PropTypeMixin, {
  // ==========================================================================
  // Dependencies
  // ==========================================================================

  // ==========================================================================
  // Properties
  // ==========================================================================

  attributeBindings: ['tabIndex'],
  classNames: ['frost-select'],
  classNameBindings: ['shouldOpen:focus', 'shouldOpen:open', 'disabled', 'hasError:error'],
  stateProperties: [
    'open',
    'prompt',
    'disabled',
    'displayItems',
    'error'
  ],
  stateAttributes: [
    'disabled',
    'data->baseItems',
    'placeholder',
    'error',
    'selected->selectedItem'
  ],
  layout,

  propTypes: {
    autofocus: PropTypes.bool,
    data: PropTypes.array,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    filter: PropTypes.string,
    hook: PropTypes.string,
    hovered: PropTypes.number,
    maxListHeight: PropTypes.number,
    selected: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.number
    ]),
    selectedValue: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.bool,
      PropTypes.number,
      PropTypes.null,
      PropTypes.object,
      PropTypes.string
    ]),
    tabIndex: PropTypes.number,
    width: PropTypes.number
  },

  getDefaultProps () {
    return {
      autofocus: false,
      disabled: false,
      error: false,
      hovered: -1,
      maxListHeight: 400,
      selected: EmberArray(),
      tabIndex: -1,
      width: 200
    }
  },

  // ==========================================================================
  // Computed Properties
  // ==========================================================================

  @readOnly
  @computed('maxListHeight')
  /**
   * Get inline style for container
   * Note: This must be a computed property rather than in a SASS file because the
   * value is dependent on properties passed in by the consumer.
   * @param {Number} maxListHeight - maximum height at which list should render
   * @returns {String} container style
   */
  containerStyle (maxListHeight) {
    return Ember.String.htmlSafe(`max-height: ${maxListHeight}px`)
  },

  @readOnly
  @computed('data', 'displayItems')
  /**
   * Flag for if the user has typed something that doesn't match any options
   * @param {Array<Item>} data - all the possible items
   * @param {Object[]} displayItems - the current items being displayed
   * @returns {Boolean} true if in error state
   */
  invalidFilter (data, displayItems) {
    return (
      Array.isArray(data) &&
      Array.isArray(displayItems) &&
      data.length > 0 &&
      displayItems.length === 0
    )
  },

  @readOnly
  @computed('error', 'invalidFilter')
  /**
   * Computed flag for if consumer flagged us as having an error, or if the user has typed
   * something bad.
   * @param {Boolean} error - true if consumer has flagged that an error exists
   * @param {Boolean} invalidFilter - true if the user has typed something that doesn't match an option
   * @returns {Boolean} true if either error condition occured
   */
  hasError (error, invalidFilter) {
    return error || invalidFilter
  },

  @readOnly
  @computed('invalidFilter', 'shouldDisableDropDown', 'open')
  /**
   * Determine if drop-down should open
   * @param {Boolean} invalidFilter - did the user goof?
   * @param {Boolean} shouldDisableDropDown - computed flag for whether opening the drop-down should be disabled
   * @param {Boolean} open - TODO: what is this?
   * @returns {Boolean} true if we should open
   */
  shouldOpen (invalidFilter, shouldDisableDropDown, open) {
    return !invalidFilter && !shouldDisableDropDown && open
  },

  @readOnly
  @computed('invalidFilter', 'disabled')
  /**
   * Determine if we should disable opening the drop-down
   * @param {Boolean} invalidFilter - did the user goof?
   * @param {Boolean} disabled - are we in a disabled state?
   * @returns {Boolean} true if opening should be disabled
   */
  shouldDisableDropDown (invalidFilter, disabled) {
    return invalidFilter || disabled
  },

  @readOnly
  @computed('width')
  /**
   * Compute the style attribute based on width
   * @param {Number} width - the width property
   * @returns {String} the computed style attribute
   */
  style (width) {
    return `width: ${width}px`
  },

  // ==========================================================================
  // Functions
  // ==========================================================================

  /** obvious */
  bindDropdownEvents () {
    this._handleOutsideClick = handleOutsideClick.bind(this)
    Ember.$(document).on('click', this._handleOutsideClick)
  },

  /* Ember.Component method */
  didReceiveAttrs ({newAttrs, oldAttrs}) {
    newAttrs = newAttrs || {}
    oldAttrs = oldAttrs || {}

    this._super(...arguments)
    const stateAttrs = get(this, 'stateAttributes')

    const reduxAttrs = _.chain(stateAttrs)
    .map((attrName) => {
      const split = _.filter(attrName.split(ATTR_MAP_DELIM))
      let attrValue
      if (split.length > 1) {
        attrValue = get(this, split[0])
        attrName = split[1]
      } else {
        attrValue = get(this, attrName)
      }

      return [attrName, attrValue]
    })
    .filter(([name, value]) => value !== undefined)
    .fromPairs()
    .value()

    get(this, 'reduxStore').dispatch(resetDropDown(reduxAttrs))

    const dataChanged = isAttrDifferent(newAttrs, oldAttrs, 'data')
    const selectedChanged = isAttrDifferent(newAttrs, oldAttrs, 'selected')
    const selectedValueChanged = isAttrDifferent(newAttrs, oldAttrs, 'selectedValue')

    // If frost-select instance is being reused by consumer but context is cleared make
    // make sure to actually clear input (noticed when used in conjunction with dialog
    // compoonents that don't destroy DOM when closed and re-opened)
    if (selectedValueChanged && ('selectedValue' in newAttrs) && (newAttrs.selectedValue.value === undefined)) {
      this.selectOptionByValue(null)
      return
    }

    if (selectedValueChanged || (dataChanged && get(newAttrs, 'selectedValue.value'))) {
      this.selectOptionByValue(newAttrs.selectedValue.value)
    } else if (selectedChanged || (dataChanged && get(newAttrs, 'selected.value'))) {
      let selected = get(this, 'selected')

      if (typeOf(selected) === 'number') {
        selected = [selected]
      } else if (!Array.isArray(selected)) {
        selected = []
      }
    }
  },

  // TODO: add jsdoc
  getValues () {
    const state = get(this, 'reduxStore').getState()
    return [state.baseItems[state.selectedItem].value]
  },
  keyDown (event) {
    const reduxStore = get(this, 'reduxStore')
    switch (event.which) {
      case keyCodes.tab:
        reduxStore.dispatch(closeDropDown)
        break
    }
  },
  // TODO: add jsdoc
  keyUp (event) {
    const reduxStore = get(this, 'reduxStore')
    switch (event.which) {
      // escape key or tab key, close the dropdown
      case keyCodes.esc:
        event.preventDefault()
        reduxStore.dispatch(closeDropDown)
        break
      // enter + spacebar, choose selected
      case keyCodes.enter:
        reduxStore.dispatch(selectHover)
        break

      // up arrow
      case keyCodes.up:
        event.preventDefault()
        reduxStore.dispatch(moveHoverPrev)
        break

      // down arrow, open the dropdown if necessary, select next
      case keyCodes.down:
        event.preventDefault()
        reduxStore.dispatch(moveHoverNext)
        break

      // backspace
      case keyCodes.backspace:
        event.preventDefault()
    }
  },

  /**
   * Notify parent of currently selected values by calling the onChange callback
   * with the values of the currently selected indices
   * @param {Number[]} selected - the selected indices
   */
  notifyOfChange () {
    const onChange = get(this, 'onChange')
    if (onChange) {
      const values = this.getValues()
      onChange(values)
    }
  },

  /** Handler for click outside of an element
   */
  onOutsideClick () {
    set(this, 'open', false)
    get(this, 'reduxStore').dispatch(closeDropDown)
  },

  // TODO: add jsdoc
  selectOptionByValue (selectedValue) {
    get(this, 'reduxStore').dispatch(selectValue(selectedValue))
  },

  /** obvious */
  unbindDropdownEvents () {
    Ember.$(document).off('click', this._handleOutsideClick)
  },

  /** Ember.Component method */
  willDestroyElement () {
    this.unbindDropdownEvents()
  },

  setUpReduxStore () {
    const reduxStore = Redux.createStore(reducer)
    set(this, 'reduxStore', reduxStore)
    return reduxStore
  },

  subscribe (reduxStore) {
    reduxStore.subscribe(() => {
      const state = reduxStore.getState()

      const newProps = _.pick(state, get(this, 'stateProperties'))

      this.setProperties(newProps)

      switch (state.lastAction) {
        case 'SELECT_HOVER':
        case 'SELECT_ITEM':
          this.notifyOfChange()
          break
      }
      const wasOpen = get(this, 'open')

      if (!wasOpen && newProps.open) {
        this.bindDropdownEvents()
      } else if (wasOpen && !newProps.open) {
        this.unbindDropdownEvents()
      }
    })
  },

  init () {
    this._super(...arguments)
    this.subscribe(this.setUpReduxStore())
  },

  // ==========================================================================
  // Events
  // ==========================================================================
  focusIn (event) {
    get(this, 'reduxStore').dispatch(openDropDown)

    const onFocusIn = get(this, '_eventProxy.focusIn')

    if (onFocusIn) {
      onFocusIn(event)
    }
  },
  focusOut (event) {
    get(this, 'reduxStore').dispatch(closeDropDown)

    const onFocusOut = get(this, '_eventProxy.focusOut')

    if (onFocusOut) {
      onFocusOut(event)
    }
  },
  // ==========================================================================
  // Actions
  // ==========================================================================
  actions: {
    // TODO: add jsdoc
    onChange (event) {
      const target = event.currentTarget || event.target

      const onInput = get(this, 'onInput')
      if (typeOf(onInput) === 'function') {
        onInput(target.value)
      } else {
        get(this, 'reduxStore').dispatch(updateSearchText(target.value))
      }
    },
    // TODO: add jsdoc
    onItemOver (data) {
      get(this, 'reduxStore').dispatch(mouseHoverItem(data.index))
      return false
    },

    // TODO: add jsdoc
    onSelect (data) {
      get(this, 'reduxStore').dispatch(selectItem(data.index))
    }
  }
})
