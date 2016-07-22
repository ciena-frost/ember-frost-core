export const SELECT_ITEM = 'SELECT_ITEM'
export const SELECT_HOVER = 'SELECT_HOVER'
export const CLICK_ARROW = 'CLICK_ARROW'
export const HOVER_NEXT = 'HOVER_NEXT'
export const HOVER_PREV = 'HOVER_PREV'
export const MOUSE_HOVER = 'MOUSE_HOVER'
export const SEARCH_TEXT = 'SEARCH_TEXT'
export const CLOSE_DROPDOWN = 'CLOSE_DROPDOWN'
export const OPEN_DROPDOWN = 'OPEN_DROPDOWN'
export const RESET_DROPDOWN = 'RESET_DROPDOWN'
export const SELECT_VALUE = 'SELECT_VALUE'

/**
 * @typedef {Object} Action An action object
 * @property {string} type The type of action
 */

/**
 * Utility for creating immutable action objects
 *
 * @export
 * @param {string} action Action type of the object
 * @returns {Action} The action object
 */
export function simpleAction (action) {
  return {
    get type () {
      return action
    }
  }
}

/**
 * Select an item based on an index
 *
 * @export
 * @param {number} itemIndex Index of the item to select
 * @returns {Action} Select item action
 */
export function selectItem (itemIndex) {
  return {
    type: SELECT_ITEM,
    itemIndex
  }
}

export function selectHover () {
  return {
    type: SELECT_HOVER
  }
}

export function closeDropDown () {
  return {
    type: CLOSE_DROPDOWN
  }
}

export const openDropDown = simpleAction(OPEN_DROPDOWN)

export function clickArrow () {
  return {
    type: CLICK_ARROW
  }
}

export function moveHoverNext () {
  return {
    type: HOVER_NEXT
  }
}

export function moveHoverPrev () {
  return {
    type: HOVER_PREV
  }
}

/**
 * Sets the hovered item to a specified index
 *
 * @export
 * @param {number} itemIndex Item to hover
 * @returns {Action} Set mouse hover action
 */
export function mouseHoverItem (itemIndex) {
  return {
    type: MOUSE_HOVER,
    itemIndex
  }
}

/**
 * Updates the search text of the dropdown
 *
 * @export
 * @param {string} text Text to search on
 * @returns {Action} Update search text action with the given text
 */
export function updateSearchText (text) {
  return {
    type: SEARCH_TEXT,
    text
  }
}

/**
 * Select an item by its value
 *
 * @export
 * @param {any} value Value to select
 * @returns {Action} Select value action
 */
export function selectValue (value) {
  return {
    type: SELECT_VALUE,
    value
  }
}

/**
 * Update the state with external properties
 *
 * @export
 * @param {object} state Hash of state properties to reset
 * @returns {Action} Reset dropdown action
 */
export function resetDropDown (state) {
  return {
    type: RESET_DROPDOWN,
    state
  }
}
