const SELECT_ITEM = 'SELECT_ITEM'
const CLICK_ARROW = 'CLICK_ARROW'
const HOVER_NEXT = 'HOVER_NEXT'
const HOVER_PREV = 'HOVER_PREV'
const MOUSE_HOVER = 'MOUSE_HOVER'
const SEARCH_TEXT = 'SEARCH_TEXT'

export function selectItem () {
  return {
    type: SELECT_ITEM
  }
}

export function clickArrow () {
  return {
    type: CLICK_ARROW
  }
}

export function setValue () {
  return {
    type: ''
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

export function mouseHoverItem (item) {
  return {
    MOUSE_HOVER,
    item
  }
}

export function updateSearchText (text) {
  return {
    SEARCH_TEXT,
    text
  }
}
