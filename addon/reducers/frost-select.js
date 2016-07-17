import _ from 'lodash'

const INITIAL_STATE = {
  placeholder: '',
  disabled: false,
  open: false,
  filteredItems: [],
  baseItems: [],
  hoveredItem: null
}

export function reducer (state, action) {
  let nextState = {}
  switch (action.type) {
    default:
      nextState = state
  }

  return nextState
}
