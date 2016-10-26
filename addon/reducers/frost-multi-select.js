import {
  SELECT_ITEM,
  SELECT_HOVER,
  SELECT_VALUE,
  CLOSE_DROPDOWN,
  RESET_DROPDOWN,
  CLICK_ARROW
} from '../actions/frost-select'
import { CLEAR_SELECTION } from '../actions/frost-multi-select'
import selectReducer, {
  filterItems,
  itemClassNames
} from './frost-select'
import Ember from 'ember'
import _ from 'lodash'

/**
 * A selectable item
 * @typedef {Object} MultiSelectItem
 * @property {any} value Value to use when the item is selected
 * @property {string} label Display text of the item
 */

/**
 * Item to display in the dropdown list of a frost-select component
 * @typedef {Object} MultiSelectDisplayItem
 * @property {any} value Value to use when the item is selected
 * @property {string} label Display text of the item
 * @property {number} index Index of the item in the main list
 * @property {string} className CSS class string to apply to the item's element
 * @property {boolean} selected True if this item is in the list of selected items
 */

/**
 * A redux state object for a frost-multi-select component
 * @typedef {Object} FrostMultiSelectState
 * @property {string} placeholder Text to use as placeholder when no value is selected
 * @property {string} prompt Text that reflects the current selected value
 * @property {boolean} error True if this input is in an error state
 * @property {boolean} disabled True if this input is disabled
 * @property {boolean} open True if the dropdown menu of the current select is open
 * @property {MultiSelectDisplayItem[]} displayItems Items to display and associated
 * @property {MultiSelectItem[]} baseItems
 * @property {number} hoveredItem
 * @property {number[]} selectedItems
 * @property {string} lastAction The name of the action
 */

/**
 * Creates an object to use as the initial state of a multi-select-component
 *
 * @returns {FrostMultiSelectState} Inital state of the multi-select component
 */
function initialState () {
  return {
    placeholder: '',
    prompt: '',
    error: false,
    disabled: false,
    open: false,
    displayItems: [],
    baseItems: [],
    hoveredItem: null,
    selectedItems: [],
    lastAction: null
  }
}

/**
 * Creates a prompt from the multi-select's selected items
 *
 * @param {SelectItem[]} baseItems The list of items we can select from
 * @param {number[]} selectedItems A list of the indicies of the selected items
 * @returns {string} A prompt to display
 */
function promptFromItems (baseItems, selectedItems) {
  if (selectedItems === null || selectedItems === undefined) {
    return ''
  }
  const selectedCount = selectedItems.length
  if (selectedCount < 1) {
    return ''
  } else if (selectedCount < 3) {
    return _.chain(selectedItems)
      .map(item => baseItems[item].label)
      .join(', ').value()
  } else {
    return `${selectedCount} items selected`
  }
}

/**
 * Creates a new closed state
 *
 * @returns {Object} A partial state object that is closed
 */
function close () {
  return {
    open: false,
    hoveredItem: null
  }
}

/**
 * Update state of display items
 *
 * @param {MultiSelectDisplayItems} displayItems Display items to update
 * @param {number[]} selectedItems List of indices of the selected items
 * @param {number} hoveredItem Item that is currently hovered
 * @returns {MultiSelectDisplayItem[]} The updated list of display items
 */
function updateDisplayItems (displayItems, selectedItems, hoveredItem) {
  _.forEach(displayItems, function (item) {
    let selected = false
    let selectedIndex = null
    if (selectedItems.indexOf(item.index) >= 0) {
      selected = true
      selectedIndex = item.index
    }
    Ember.set(item, 'selected', selected)
    Ember.set(item, 'className', itemClassNames(item.index, hoveredItem, selectedIndex))
  })
  return displayItems
}

/**
 * Create a new state object with a new selectedItem
 *
 * @param {FrostMultiSelectState} state Current multi-select component state
 * @param {number} selectedItem Index of the item that was selected
 * @returns {Object} New partial state object with updated display item list
 */
function selectItem (state, selectedItem) {
  let selectedItems
  let displayItems
  if (state.selectedItems.indexOf(selectedItem) >= 0) {
    selectedItems = _.without(state.selectedItems, selectedItem)
  } else {
    selectedItems = _.clone(state.selectedItems)
    selectedItems.push(selectedItem)
  }
  if (state.displayItems.length < state.baseItems.length) {
    displayItems = _.map(state.baseItems, function ({label, value}, index) {
      return { label, value, index }
    })
  } else {
    displayItems = state.displayItems
  }
  return {
    selectedItems,
    displayItems: updateDisplayItems(displayItems, selectedItems, state.hoveredItem)
  }
}

/**
 * Find the indices of the given values.
 *
 * @param {MultiSelectItem[]} baseItems List of items in this component
 * @param {(any[]|any)} value An array of values to select
 * @returns {number[]} List of indices of the selected items
 */
function itemsFromValue (baseItems, value) {
  if (!Array.isArray(value)) {
    value = [value]
  }
  return _.chain(value)
  .map((value) => {
    return _.findIndex(baseItems, (item) => _.isEqual(item.value, value))
  })
  .filter((val) => (val >= 0))
  .value()
}

/* eslint-disable complexity */
/**
 * Reducer for the multi-select component
 *
 * @export
 * @param {FrostMultiSelectState} state Current state of the component
 * @param {object} action Action object containing a 'type' property speficying the type of action
 * @returns {FrostMultiSelectState} The next state for the component
 */
export default function reducer (state, action) {
  let nextState
  switch (action.type) {
    case SELECT_ITEM:
      nextState = selectItem(state, action.itemIndex)
      break
    case SELECT_HOVER:
      nextState = selectItem(state, state.hoveredItem)
      break
    case SELECT_VALUE:
      nextState = {
        selectedItems: itemsFromValue(state.baseItems, action.value)
      }
      break
    case CLEAR_SELECTION:
      nextState = {
        selectedItems: []
      }
      break
    case CLOSE_DROPDOWN:
      nextState = close()
      break
    case CLICK_ARROW:
      nextState = state.open ? close() : {open: true}
      break
    case RESET_DROPDOWN:
      nextState = _.defaults(_.pickBy(action.state, _.negate(_.isUndefined)), state)
      nextState.displayItems =
        filterItems(nextState.baseItems, nextState.selectedItem, nextState.hoveredItem, '') || []
      break
    case '@@redux/INIT':
      nextState = initialState()
      break
  }

  if (nextState === undefined) {
    nextState = selectReducer(state, action)
  } else {
    nextState.lastAction = action.type
    nextState = _.defaults(nextState, state)
  }
  nextState.displayItems = updateDisplayItems(nextState.displayItems, nextState.selectedItems, nextState.hoveredItem)
  nextState.prompt = promptFromItems(nextState.baseItems, nextState.selectedItems)
  delete nextState.selectedItem

  return nextState
}
/* eslint-enable complexity */
