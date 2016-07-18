export const CLICK_ITEM = 'CLICK_ITEM'
export const SELECT_HOVER = 'SELECT_HOVER'
export const CLICK_ARROW = 'CLICK_ARROW'
export const HOVER_NEXT = 'HOVER_NEXT'
export const HOVER_PREV = 'HOVER_PREV'
export const MOUSE_HOVER = 'MOUSE_HOVER'
export const SEARCH_TEXT = 'SEARCH_TEXT'

export function clickItem (itemIndex) {
  return {
    type: SELECT_ITEM,
    itemIndex
  }
}

export function selectHover(params) {
  return {
    type: PRESS_ENTER
  }
}

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
    MOUSE_HOVER,
    itemIndex
  }
}

export function updateSearchText (text) {
  return {
    SEARCH_TEXT,
    text
  }
}

function simpleAction(action) {
  return function (){
    return {
      type: action
    }
  }
}