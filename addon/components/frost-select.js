import _ from 'lodash'
import Ember from 'ember'
const {A, Component, get, run, typeOf} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-select'
import Redux from 'npm:redux'
import {
  selectItem,
  closeDropDown,
  openDropDown,
  selectHover,
  moveHoverNext,
  moveHoverPrev,
  mouseHoverItem,
  clickArrow,
  updateSearchText,
  resetDropDown,
  selectValue
} from '../actions/frost-select'

import reducer from '../reducers/frost-select'

/**
 * Map of human readable keys to their key codes
 * @type {Object}
 */
const keyCodes = {
  backspace: 8,
  down: 40,
  enter: 13,
  esc: 27,
  up: 38,
  tab: 9
}

const ATTR_MAP_DELIM = '->'
// TODO: add jsdoc
function isAttrDifferent (newAttrs, oldAttrs, attributeName) {
  newAttrs = newAttrs || {}
  oldAttrs = oldAttrs || {}

  let oldValue = get(oldAttrs, attributeName + '.value')
  let newValue = get(newAttrs, attributeName + '.value')

  return !_.isEqual(oldValue, newValue)
}

/** Hook for handling outside element click
 * @param {Object} event - JQuery event object
 */
function handleOutsideClick (event) {
  const $target = Ember.$(event.target)
  if (!$target.closest(this.$()).length) {
    this.onOutsideClick()
  }
}

export default Component.extend(PropTypeMixin, {
  // ==========================================================================
  // Dependencies
  // ==========================================================================

  // ==========================================================================
  // Properties
  // ==========================================================================

  attributeBindings: ['tabIndex'],
  classNames: ['frost-select'],
  classNameBindings: ['focus', 'shouldOpen:open', 'disabled', 'hasError:error'],
  stateProperties: [
    'open',
    'prompt',
    'disabled',
    'displayItems',
    'error'
  ],
  stateAttributes: [
    'disabled',
    'data->baseItems',
    'placeholder',
    'error',
    'selected->selectedItem'
  ],
  layout,

  propTypes: {
    autofocus: PropTypes.bool,
    data: PropTypes.array,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    filter: PropTypes.string,
    hook: PropTypes.string,
    hovered: PropTypes.number,
    maxListHeight: PropTypes.number,
    renderTarget: PropTypes.string,
    selected: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.number
    ]),
    selectedValue: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.bool,
      PropTypes.number,
      PropTypes.null,
      PropTypes.object,
      PropTypes.string
    ]),
    tabIndex: PropTypes.number,
    width: PropTypes.number
  },

  getDefaultProps () {
    return {
      autofocus: false,
      disabled: false,
      error: false,
      hovered: -1,
      maxListHeight: 400,
      renderTarget: 'frost-select',
      selected: A([]),
      tabIndex: -1,
      width: 200
    }
  },

  // ==========================================================================
  // Computed Properties
  // ==========================================================================

  @readOnly
  @computed('maxListHeight')
  /**
   * Get inline style for container
   * Note: This must be a computed property rather than in a SASS file because the
   * value is dependent on properties passed in by the consumer.
   * @param {Number} maxListHeight - maximum height at which list should render
   * @returns {String} container style
   */
  containerStyle (maxListHeight) {
    return Ember.String.htmlSafe(`max-height: ${maxListHeight}px`)
  },

  @readOnly
  @computed('data', 'displayItems')
  /**
   * Flag for if the user has typed something that doesn't match any options
   * @param {Array<Item>} data - all the possible items
   * @param {Object[]} displayItems - the current items being displayed
   * @returns {Boolean} true if in error state
   */
  invalidFilter (data, displayItems) {
    return (
      Array.isArray(data) &&
      Array.isArray(displayItems) &&
      data.length > 0 &&
      displayItems.length === 0
    )
  },

  @readOnly
  @computed('error', 'invalidFilter')
  /**
   * Computed flag for if consumer flagged us as having an error, or if the user has typed
   * something bad.
   * @param {Boolean} error - true if consumer has flagged that an error exists
   * @param {Boolean} invalidFilter - true if the user has typed something that doesn't match an option
   * @returns {Boolean} true if either error condition occured
   */
  hasError (error, invalidFilter) {
    return error || invalidFilter
  },

  @readOnly
  @computed('invalidFilter', 'shouldDisableDropDown', 'open')
  /**
   * Determine if drop-down should open
   * @param {Boolean} invalidFilter - did the user goof?
   * @param {Boolean} shouldDisableDropDown - computed flag for whether opening the drop-down should be disabled
   * @param {Boolean} open - TODO: what is this?
   * @returns {Boolean} true if we should open
   */
  shouldOpen (invalidFilter, shouldDisableDropDown, open) {
    return !invalidFilter && !shouldDisableDropDown && open
  },

  @readOnly
  @computed('invalidFilter', 'disabled')
  /**
   * Determine if we should disable opening the drop-down
   * @param {Boolean} invalidFilter - did the user goof?
   * @param {Boolean} disabled - are we in a disabled state?
   * @returns {Boolean} true if opening should be disabled
   */
  shouldDisableDropDown (invalidFilter, disabled) {
    return invalidFilter || disabled
  },

  @readOnly
  @computed('width')
  /**
   * Compute the style attribute based on width
   * @param {Number} width - the width property
   * @returns {String} the computed style attribute
   */
  style (width) {
    return `width: ${width}px`
  },

  // ==========================================================================
  // Functions
  // ==========================================================================

  /** obvious */
  bindDropdownEvents () {
    this._handleOutsideClick = handleOutsideClick.bind(this)
    Ember.$(document).on('click', this._handleOutsideClick)
  },

  /* eslint-disable complexity */
  /* Ember.Component method */
  didReceiveAttrs ({newAttrs, oldAttrs}) {
    newAttrs = newAttrs || {}
    oldAttrs = oldAttrs || {}

    this._super(...arguments)
    const stateAttrs = this.get('stateAttributes')

    let reduxAttrs = _.chain(stateAttrs)
    .map((attrName) => {
      const split = _.filter(attrName.split(ATTR_MAP_DELIM))
      let attrValue
      if (split.length > 1) {
        attrValue = this.get(split[0])
        attrName = split[1]
      } else {
        attrValue = this.get(attrName)
      }

      return [attrName, attrValue]
    })
    .filter(([name, value]) => value !== undefined)
    .fromPairs()
    .value()

    const dataChanged = isAttrDifferent(newAttrs, oldAttrs, 'data')
    const selectedChanged = isAttrDifferent(newAttrs, oldAttrs, 'selected')
    const selectedValueChanged = isAttrDifferent(newAttrs, oldAttrs, 'selectedValue')

    if (!(selectedChanged || selectedValueChanged || dataChanged)) {
      reduxAttrs = _.omit(reduxAttrs, ['selectedItem', 'selectedItems'])
    }
    this.get('reduxStore').dispatch(resetDropDown(reduxAttrs))

    // If frost-select instance is being reused by consumer but context is cleared make
    // make sure to actually clear input (noticed when used in conjunction with dialog
    // components that don't destroy DOM when closed and re-opened)
    if (
      selectedValueChanged &&
      ('selectedValue' in newAttrs) &&
      (newAttrs.selectedValue.value === undefined || newAttrs.selectedValue.value === '')
    ) {
      this.selectOptionByValue(null)
      return
    }

    if (selectedValueChanged || (dataChanged && get(newAttrs, 'selectedValue.value'))) {
      this.selectOptionByValue(newAttrs.selectedValue.value)
    } else if (selectedChanged || (dataChanged && get(newAttrs, 'selected.value'))) {
      let selected = this.get('selected')

      if (typeOf(selected) === 'number') {
        selected = [selected]
      } else if (!Array.isArray(selected)) {
        selected = []
      }
    }
  },
  /* eslint-enable complexity */

  // TODO: add jsdoc
  getValues () {
    const state = this.get('reduxStore').getState()
    return [state.baseItems[state.selectedItem].value]
  },
  keyDown (event) {
    const reduxStore = this.get('reduxStore')
    switch (event.which) {
      case keyCodes.tab:
        reduxStore.dispatch(closeDropDown)
        break
    }
  },
  /* eslint-disable complexity */
  // TODO: add jsdoc
  keyUp (event) {
    const reduxStore = this.get('reduxStore')
    switch (event.which) {
      // escape key or tab key, close the dropdown
      case keyCodes.esc:
        event.preventDefault()
        reduxStore.dispatch(closeDropDown)
        break
      // enter + spacebar, choose selected
      case keyCodes.enter:
        reduxStore.dispatch(selectHover)
        break

      // up arrow
      case keyCodes.up:
        event.preventDefault()
        reduxStore.dispatch(moveHoverPrev)
        break

      // down arrow, open the dropdown if necessary, select next
      case keyCodes.down:
        event.preventDefault()
        reduxStore.dispatch(moveHoverNext)
        break

      // backspace
      case keyCodes.backspace:
        event.preventDefault()
    }
  },
  /* eslint-enable complexity */

  /**
   * Notify parent of currently selected values by calling the onChange callback
   * with the values of the currently selected indices
   * @param {Number[]} selected - the selected indices
   */
  notifyOfChange () {
    const onChange = this.get('onChange')
    if (onChange) {
      const values = this.getValues()
      onChange(values)
    }
  },

  /** Handler for click outside of an element
   */
  onOutsideClick () {
    this.get('reduxStore').dispatch(closeDropDown)
  },

  // TODO: add jsdoc
  selectOptionByValue (selectedValue) {
    this.get('reduxStore').dispatch(selectValue(selectedValue))
  },

  /** obvious */
  unbindDropdownEvents () {
    Ember.$(document).off('click', this._handleOutsideClick)
  },

  /** Ember.Component method */
  willDestroyElement () {
    this.unbindDropdownEvents()
  },

  setUpReduxStore () {
    const reduxStore = Redux.createStore(reducer)
    this.set('reduxStore', reduxStore)
    return reduxStore
  },

  subscribe (reduxStore) {
    reduxStore.subscribe(() => {
      const state = reduxStore.getState()

      const wasOpen = this.get('open')

      const newProps = _.pick(state, this.get('stateProperties'))

      run(() => {
        this.setProperties(newProps)
      })

      switch (state.lastAction) {
        case 'SELECT_HOVER':
        case 'SELECT_ITEM':
          this.notifyOfChange()
          break
      }
      if (!wasOpen && newProps.open) {
        this.bindDropdownEvents()
      } else if (wasOpen && !newProps.open) {
        this.unbindDropdownEvents()
      }
    })
  },

  init () {
    this._super(...arguments)
    this.subscribe(this.setUpReduxStore())
  },

  didInsertElement () {
    this.set('$element', this.$())
  },

  // ==========================================================================
  // Events
  // ==========================================================================

  // ==========================================================================
  // Actions
  // ==========================================================================

  actions: {
    // TODO: add jsdoc
    onBlur (event) {
      this.set('focus', false)

      const onBlur = this.get('onBlur')

      if (onBlur) {
        onBlur(event)
      }
    },

    // TODO: add jsdoc
    onChange (event) {
      const target = event.currentTarget || event.target
      const onInput = this.get('onInput')
      if (typeOf(onInput) === 'function') {
        onInput(target.value)
      } else {
        this.get('reduxStore').dispatch(updateSearchText(target.value))
      }
    },

    // TODO: add jsdoc
    onClickArrow (event) {
      event.preventDefault()
      const reduxStore = this.get('reduxStore')
      reduxStore.dispatch(clickArrow)
    },

    // TODO: add jsdoc
    onFocus () {
      this.get('reduxStore').dispatch(openDropDown)
      // If an onFocus event handler is defined, call it
      if (this.attrs.onFocus) {
        this.attrs.onFocus()
      }
      return false
    },

    // TODO: add jsdoc
    onItemOver (data) {
      this.get('reduxStore').dispatch(mouseHoverItem(data.index))
      return false
    },

    // TODO: add jsdoc
    onSelect (data) {
      this.get('reduxStore').dispatch(selectItem(data.index))
    }
  }
})
