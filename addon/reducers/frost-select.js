import Ember from 'ember'

const assign = Ember.assign || Object.assign || Ember.merge

import {
  SELECT_ITEM,
	CLICK_ARROW,
  CLOSE_DROPDOWN,
  OPEN_DROPDOWN,
  SELECT_HOVER,
	HOVER_NEXT,
	HOVER_PREV,
	MOUSE_HOVER,
	SEARCH_TEXT,
  SELECT_VALUE,
  RESET_DROPDOWN
} from '../actions/frost-select'
import _ from 'lodash'
export const SELECTED_CLASS = 'selected'
export const HOVERED_CLASS = 'hover'

const INITIAL_STATE = {
  placeholder: '',
  prompt: '',
  error: false,
  disabled: false,
  open: false,
  displayItems: [],
  baseItems: [],
  hoveredItem: null,
  selectedItem: null,
  lastAction: null
}

/**
 * A selectable item
 * @typedef {Object} SelectItem
 * @property {any} value Value to use when the item is selected
 * @property {string} label Display text of the item
 */

/**
 * Item to display in the dropdown list of a frost-select component
 * @typedef {Object} SelectDisplayItem
 * @property {any} value Value to use when the item is selected
 * @property {string} label Display text of the item
 * @property {number} index Index of the item in the main list
 * @property {string} className CSS class string to apply to the item's element
 */

/**
 * A redux state object for a frost-select component
 * @typedef {Object} FrostSelectState
 * @property {string} placeholder Text to use as placeholder when no value is selected
 * @property {string} prompt Text that reflects the current selected value
 * @property {boolean} error True if this input is in an error state
 * @property {boolean} disabled True if this input is disabled
 * @property {boolean} open True if the dropdown menu of the current select is open
 * @property {SelectDisplayItem[]} displayItems Items to display and associated
 * @property {SelectItem[]} baseItems
 * @property {number} hoveredItem
 * @property {number} selectedItem
 * @property {string} lastAction
 */

/**
 * Create a prompt based on the currently selected item
 * @param {any} baseItems The complete list of items
 * @param {number} selectedItem index of the selected item
 * @returns {string} Calculated prompt for the selected item to display in input
 */
function promptFromItem (baseItems, selectedItem) {
  return baseItems[selectedItem].label
}

/**
 * Close the select dropdown menu
 * @param {FrostSelectState} state State to close
 * @returns {object} Partial state object that is closed
 */
function close (state) {
  let prompt = ''

  // Set prompt
  if (state.selectedItem !== null) {
    prompt = promptFromItem(state.baseItems, state.selectedItem)
  }

  return {
    prompt,
    open: false,
    hoveredItem: null
  }
}

/**
 * Select a item given its index in the master list of items (baseItems)
 * @param {FrostSelectState} state Current state of the component
 * @param {number} itemIndex Index of the item in baseItems that we want to select
 * @returns {object} A new state object with the selected item
 */
function select (state, itemIndex) {
  // Set selected value
  let nextState = {
    selectedItem: itemIndex,
    displayItems: updateClassNames(filterItems(state.baseItems, itemIndex, state.hoveredItem, ''), null, itemIndex),
    baseItems: state.baseItems
  }
  // Close list
  const closeState = close(nextState)

  return assign(nextState, closeState)
}

/**
 * Find the index on the item based on its value.
 * @param {SelectItem[]} baseItems The list to search through
 * @param {any} itemValue The value of the item we are looking for
 * @returns {number} The index of the first item with the given value, or -1 if the list does not contain an object with the desired value
 */
function findIndexByValue (baseItems, itemValue) {
  return _.findIndex(baseItems, (item) => _.isEqual(item.value, itemValue))
}

/**
 * Generates a CSS class string based on which item is hovered and which item is selected
 * @export
 * @param {number} index Index of the desired item
 * @param {number} hoveredItem Index of the hovered item.
 * @param {number} selectedItem Index of the selected item
 * @returns {string} A CSS class name string for the item
 */
export function itemClassNames (index, hoveredItem, selectedItem) {
  const classNames = []

  if (selectedItem === index) {
    classNames.push(SELECTED_CLASS)
  }

  if (index === hoveredItem) {
    classNames.push(HOVERED_CLASS)
  }
  return classNames.join(' ')
}

/**
 * Updates the items in the display items list to have the correct CSS classnames
 * @param {any} displayItems List of display items to update (NOTE: The items in this list are mutated by this function)
 * @param {any} hoveredItem The item currently being hovered
 * @param {any} selectedItem The item that is currently selected
 * @returns {SelectDisplayItem[]} The transformed list of display items
 */
function updateClassNames (displayItems, hoveredItem, selectedItem) {
  (displayItems || []).forEach(function (item, index, list) {
    const className = itemClassNames(item.index, hoveredItem, selectedItem, list.length)
    Ember.set(item, 'className', className)
  })
  return displayItems
}

/**
 * Set the hover state on a given item
 * @param {FrostSelectState} state Current state of the frost-select component
 * @param {number} itemIndex Index of the hovered item.
 * @returns {Object} A partial state object with the new hovered items
 */
function setHover (state, itemIndex) {
  return {
    open: true,
    hoveredItem: itemIndex,
    displayItems: updateClassNames(state.displayItems, itemIndex, state.selectedItem)
  }
}

/**
 * Filter the base list of items by their label compared to a string
 * @param  {SelectItems[]} baseItems List of the items for this dropdown
 * @param  {number} selectedItem INdex of the selected item
 * @param  {number} hoveredIndex Index of the hovered item
 * @param  {string} text Text to filter the list by
 * @returns {object[]} Items which meet the filtering requirement
 */
export function filterItems (baseItems, selectedItem, hoveredIndex, text) {
  const lowerCaseFilter = (text || '').toLowerCase()

  return _.chain(baseItems)
  .map(function (item, index) {
    const lowerCaseLabel = (item.label || '').toLowerCase()
    const labelMatchesFilter = lowerCaseLabel.indexOf(lowerCaseFilter) !== -1

    if (text && !labelMatchesFilter) {
      return null
    }
    return {
      index,
      label: item.label,
      value: item.value
    }
  })
  .filter()// Filters out undefined/null
  .map(function (item, index, list) {
    const className = itemClassNames(index, hoveredIndex, selectedItem, list.length)
    item.className = className
    return item
  })
  .value()
}
/**
 * Reducer for the frost-select component. Transitions the select's current state to the next state based on a given action.
 * @export
 * @param {FrostSelectState} state The current state of the select component
 * @param {object} action Action object containing a 'type' property speficying the type of action
 * @returns {object} Next state of the select
 */
export default function reducer (state, action) {
  let nextState
  switch (action.type) {
    case SELECT_ITEM:
      nextState = select(state, action.itemIndex)
      break
    case SELECT_HOVER:
      if (state.hoveredItem === null) {
        return state
      }
      nextState = select(state, state.hoveredItem)
      break
    case CLICK_ARROW:
      // Toggle
      nextState = state.open ? close(state) : {open: true}
      break
    case CLOSE_DROPDOWN:
      nextState = close(state)
      break
    case OPEN_DROPDOWN:
      let hoverState
      if ((action.itemIndex === undefined || action.itemIndex === null) && state.displayItems.length === 1) {
        hoverState = setHover(state, 0)
      }
      nextState = assign({
        open: true
      }, hoverState)
      break
    case HOVER_NEXT:
      // Set hover (hovered + 1)
      let nextItem
      if (state.open === false || state.hoveredItem === null) {
        nextItem = 0
      } else {
        nextItem = (state.hoveredItem + 1) % state.displayItems.length
      }
      nextState = setHover(state, nextItem)
      break
    case HOVER_PREV:
      // Set hover (hovered - 1)
      let prevItem
      if (state.open === false || state.hoveredItem === null) {
        prevItem = -1
      } else {
        prevItem = state.hoveredItem - 1
      }
      if (prevItem < 0) {
        prevItem = state.displayItems.length - 1
      }
      nextState = setHover(state, prevItem)
      break
    case MOUSE_HOVER:
      // Set hover (mouse hovered index)
      nextState = setHover(state, action.itemIndex)
      break
    case SEARCH_TEXT:
      let hoveredItem = null
      let displayItems = filterItems(state.baseItems, state.selectedItem, hoveredItem, action.text)

      if (displayItems.length === 1) {
        hoveredItem = 0
        displayItems = updateClassNames(displayItems, 0, state.selectedItem)
      }

      nextState = {
        open: true,
      // Set prompt
        prompt: action.text,
      // Filter list
        hoveredItem,
        displayItems
      }
      break
    case SELECT_VALUE:
      const selectedIndex = findIndexByValue(state.baseItems, action.value)
      if (selectedIndex >= 0) {
        nextState = select(state, selectedIndex)
      } else {
        nextState = {
          prompt: ''
        }
      }
      break
    case RESET_DROPDOWN:
      nextState = _.defaults(_.pickBy(action.state, _.negate(_.isUndefined)), state)
      if (Array.isArray(nextState.selectedItem)) {
        nextState.selectedItem = nextState.selectedItem[0]
      }
      if (nextState.selectedItem < 0) {
        nextState.selectedItem = null
      }
      nextState.displayItems = filterItems(nextState.baseItems, nextState.selectedItem, nextState.hoveredItem, '')
      if (nextState.selectedItem) {
        nextState.prompt = promptFromItem(nextState.baseItems, nextState.selectedItem)
      }
      break
    case '@@redux/INIT':
      nextState = _.clone(INITIAL_STATE)
      break
    default:
      nextState = {}
      console.warn(`frost-select: Unrecognized action type "${action.type}"`)
  }

  nextState.lastAction = action.type

  return _.defaults(nextState, state)
}
