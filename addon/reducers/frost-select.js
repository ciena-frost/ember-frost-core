import {
  SELECT_ITEM,
	CLICK_ARROW,
  SELECT_HOVER,
	HOVER_NEXT,
	HOVER_PREV,
	MOUSE_HOVER,
	SEARCH_TEXT
} from '../actions/frost-select'
import _ from 'lodash'

const INITIAL_STATE = {
  placeholder: '',
  prompt: '',
  disabled: false,
  open: false,
  filteredItems: [],
  baseItems: [],
  hoveredItem: null,
  selectedItem: null,
  lastAction: null
}

function promptFromItem () {
  
}

function close () {

}

export function reducer (state, action) {
  let nextState = {}
  switch (action.type) {
    case SELECT_ITEM:
      // Close list
      nextState.open = false
      // Set selected value
      nextState.selectedItem = action.itemIndex
      // Set prompt
      nextState.filteredItems = state.baseItems
      break
    case CLICK_ARROW:
      //Toggle 
      nextState.open = !state.open
      //Set prompt
      break
    case HOVER_NEXT:
      // Set hover (hovered + 1)
      if (state.open === false) {
        nextState.open = true
        state.selectedItem = 0
      } else {
        nextState.selectedItem = (state.selectedItem + 1) % state.displayItems.length
      }
      break
    case HOVER_PREV:
      // Set hover (hovered - 1)
      let nextItem
      if (state.open === false) {
        nextState.open = true
        nextItem = -1
      } else {
        nextItem = state.selectedItem - 1
      }
      if (nextItem < 0) {
        nextItem = state.displayItems.length - 1
      }
      break
    case MOUSE_HOVER:
      // Set hover (mouse hovered index)
      nextState.hoveredItem = action.itemIndex
      break
    case SEARCH_TEXT:
      nextState.open = true
      // Set prompt
      nextState.prompt = action.text
      // Filter list
      break
    default:
      nextState = state
  }

  nextState.lastAction = action.type

  return _.defaults(nextState, state)
}
