import {
  SELECT_ITEM,
	CLICK_ARROW,
  CLOSE_DROPDOWN,
  SELECT_HOVER,
	HOVER_NEXT,
	HOVER_PREV,
	MOUSE_HOVER,
	SEARCH_TEXT,
  SELECT_VALUE,
  RESET_DROPDOWN
} from '../actions/frost-select'
import _ from 'lodash'
const SELECTED_CLASS = 'selected'
const HOVERED_CLASS = 'hovered'
const INITIAL_STATE = {
  placeholder: '',
  prompt: '',
  error: false,
  disabled: false,
  open: false,
  filteredItems: [],
  baseItems: [],
  hoveredItem: null,
  selectedItem: null,
  lastAction: null
}

function promptFromItem (baseItems, selectedItem) {
  return baseItems[selectedItem].label
}

function close (state) {
  let prompt = ''

  // Set prompt
  if (state.selectedItem !== null) {
    prompt = promptFromItem(state.baseItems, state.selectedItem)
  }

  return {
    prompt,
    open: false
  }
}

function select (state, itemIndex) {
  // Set selected value
  let nextState = {
    selectedItem: itemIndex,
    filteredItems: state.baseItems,
    baseItems: state.baseItems
  }
  // Close list
  const closeState = close(nextState)

  return _.assign(nextState, closeState)
}

function findIndexByValue (baseItems, itemValue) {
  return _.findIndex(baseItems, (item) => _.isEqual(item.value, itemValue))
}

function setHover (state, itemIndex) {
  const filteredItems = _.map(state.filteredItems, function (item) {
    let className
    if (item.index === itemIndex) {
      className = HOVERED_CLASS
    } else {
      className = ''
    }
    return _.defaults({className}, item)
  })
  return {
    open: true,
    hoveredItem: itemIndex,
    filteredItems
  }
}

function filterItems ({baseItems, selectedItem, hovered}, text) {
  const lowerCaseFilter = (text || '').toLowerCase()

  return _.chain(baseItems)
  .map(function (item, index, list) {
    const lowerCaseLabel = (item.label || '').toLowerCase()
    const labelMatchesFilter = lowerCaseLabel.indexOf(lowerCaseFilter) !== -1

    if (text && !labelMatchesFilter) {
      return null
    }
    const classNames = []
    const itemIsHovered = index === hovered || list.length === 1
    const itemIsSelected = selectedItem === item.index

    if (itemIsSelected) {
      classNames.push(SELECTED_CLASS)
    }

    if (itemIsHovered) {
      classNames.push(HOVERED_CLASS)
    }
    const className = classNames.join(' ')

    return {
      className,
      index,
      label: item.label,
      value: item.value
    }
  })
  .filter() // Filters out undefined/null
  .value()
}

export default function reducer (state, action) {
  let nextState
  switch (action.type) {
    case SELECT_ITEM:
      nextState = select(state, action.itemIndex)
      break
    case SELECT_HOVER:
      nextState = select(state, state.selectedItem)
      break
    case CLICK_ARROW:
      // Toggle
      nextState = state.open ? close(state) : {open: true}
      break
    case CLOSE_DROPDOWN:
      nextState = close(state)
      break
    case HOVER_NEXT:
      // Set hover (hovered + 1)
      let nextItem
      if (state.open === false) {
        nextState.selectedItem = 0
      } else {
        nextState.selectedItem = (state.selectedItem + 1) % state.displayItems.length
      }
      nextState = setHover(state, nextItem)
      break
    case HOVER_PREV:
      // Set hover (hovered - 1)
      let prevItem
      if (state.open === false) {
        prevItem = -1
      } else {
        prevItem = state.hoveredItem - 1
      }
      if (nextItem < 0) {
        prevItem = state.displayItems.length - 1
      }
      nextState = setHover(state, prevItem)
      break
    case MOUSE_HOVER:
      // Set hover (mouse hovered index)
      nextState = setHover(state, action.itemIndex)
      break
    case SEARCH_TEXT:
      nextState = {
        open: true,
      // Set prompt
        prompt: action.text,
      // Filter list
        displayItems: filterItems(state, action.text)
      }
      break
    case SELECT_VALUE:
      const selectedIndex = findIndexByValue(state.baseItems, action.value)
      nextState = select(state, selectedIndex)
      break
    case RESET_DROPDOWN:
      nextState = _.clone(INITIAL_STATE)
      nextState.baseItems = state.baseItems
      break
    case '@@redux/INIT':
      nextState = {}
      break
    default:
      nextState = {}
      console.warn(`frost-select: Unrecognized action type "${action.type}"`)
  }

  nextState.lastAction = action.type

  return _.defaults(nextState, state)
}
