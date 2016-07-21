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
  SELECTED_CLASS,
  HOVERED_CLASS
} from './frost-select'
import Ember from 'ember'
import _ from 'lodash'

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

function close () {
  return {
    open: false,
    hoveredItem: null
  }
}

function addClassNames (index, selected, hoveredItem) {
  const className = []
  if (index === hoveredItem) {
    className.push(HOVERED_CLASS)
  }
  if (selected) {
    className.push(SELECTED_CLASS)
  }

  return className.join(' ')
}

function updateDisplayItems (displayItems, selectedItems, hoveredItem) {
  _.each(displayItems, function (item) {
    const selected = selectedItems.indexOf(item.index) >= 0
    Ember.set(item, 'selected', selected)
    Ember.set(item, 'className', addClassNames(item.index, selected, hoveredItem))
  })
  return displayItems
}

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

function itemsFromValue (baseItems, value) {
  if (!_.isArray(value)) {
    value = [value]
  }
  return _.chain(value)
  .map((value) => {
    return _.findIndex(baseItems, (item) => _.isEqual(item.value, value))
  })
  .filter((val) => (val >= 0))
  .value()
}

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
      const selectedItems = []
      nextState = {
        selectedItems,
        displayItems: updateDisplayItems(state.displayItems, selectedItems, state.hoveredItem)
      }
      break
    case CLOSE_DROPDOWN:
      nextState = close()
      break
    case CLICK_ARROW:
      nextState = state.open ? close() : {open: true}
      break
    case RESET_DROPDOWN:
      nextState = _.assign(initialState(), _.pick(action.state, _.negate(_.isUndefined)))
      nextState.baseItems = action.state.baseItems
      nextState.displayItems = updateDisplayItems(filterItems(nextState, '') || [], nextState.selectedItems, nextState.hoveredItem)
      break
  }

  if (nextState === undefined) {
    nextState = selectReducer(state, action)
    nextState.displayItems = updateDisplayItems(nextState.displayItems, nextState.selectedItems, nextState.hoveredItem)
  } else {
    nextState.lastAction = action.type
    nextState = _.defaults(nextState, state)
  }
  nextState.prompt = promptFromItems(nextState.baseItems, nextState.selectedItems)
  delete nextState.selectedItem

  return nextState
}
