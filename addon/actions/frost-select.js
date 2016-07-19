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

export const  openDropDown = simpleAction (OPEN_DROPDOWN)

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

export function mouseHoverItem (itemIndex) {
  return {
    type: MOUSE_HOVER,
    itemIndex
  }
}

export function updateSearchText (text) {
  return {
    type: SEARCH_TEXT,
    text
  }
}

export function simpleAction (action) {
  return {
    get type () {
      return action
    }
  }
}

export function selectValue (value) {
  return {
    type: SELECT_VALUE,
    value
  }
}

export function resetDropDown () {
  return {
    type: RESET_DROPDOWN
  }
}
