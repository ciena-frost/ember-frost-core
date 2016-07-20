import { 
  SELECT_ITEM, 
  SELECT_HOVER, 
  CLOSE_DROPDOWN,
  RESET_DROPDOWN 
} from '../actions/frost-select'
import { CLEAR_SELECTION } from '../actions/frost-multi-select'
import selectReducer, { filterItems } from './frost-select'

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
    return`${selectedCount} items selected`
  }
}

function close (state) {
  return {
    open: false,
    hoveredItem: null
  }
}
function selectItem (state, selectedItem) {
  let selectedItems
  if (state.selectedItems.indexOf(selectedItem) >= 0) {
    selectedItems = _.without(state, selectedItem)
  } else {
    selectedItems = _.clone(state.selectedItems)
    selectedItems.push(selectedItem)
  }
  return {
    selectedItems
  }
}

export default function reducer (state, action) {
  let nextState
  switch (action.type) {
    case SELECT_ITEM:
    case SELECT_HOVER:
      nextState = selectItem(state, action.itemIndex)
      break
    case CLEAR_SELECTION:
      nextState = {
        selectedItems: []
      }
      break
    case CLOSE_DROPDOWN:
      nextState = close()
      break
    case RESET_DROPDOWN:
      nextState = _.assign(initialState(), _.pick(action.state, _.negate(_.isUndefined)))
      nextState.baseItems = action.state.baseItems
      nextState.displayItems = filterItems(nextState, '')
      break
  }

  if (nextState === undefined) {
    nextState = selectReducer(state, action)
  } else {
    nextState.lastAction = action.type
    nextState = _.defaults(nextState, state)
  }
  if (nextState.prompt === undefined) {
    nextState.prompt = promptFromItems(nextState.baseItems, nextState.selectedItems)
  }
  return nextState
}