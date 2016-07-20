import _ from 'lodash'
import Ember from 'ember'
const {A, Component} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {PropTypes} from 'ember-prop-types'
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
 * @typedef {Object} Item
 * @property {String} label - user friendly text for item
 * @property {Boolean|Number|String|Object} value - value of item
 */

/**
 * @typedef {Object} ListItem
 * @property {String} className - className to apply to item's DOM
 * @property {Number} index - location of item in list of items
 * @property {String} label - user friendly text for item
 * @property {Boolean|Number|String|Object} value - value of item
 */

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

// TODO: add jsdoc
function isAttrDifferent (newAttrs, oldAttrs, attributeName) {
  let oldValue = _.get(oldAttrs, attributeName + '.value')
  let newValue = _.get(newAttrs, attributeName + '.value')
  return newValue !== undefined && !_.isEqual(oldValue, newValue)
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

export default Component.extend({
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
    'displayItems'
  ],
  layout,

  propTypes: {
    autofocus: PropTypes.bool,
    data: PropTypes.array,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    filter: PropTypes.string,
    hovered: PropTypes.number,
    maxListHeight: PropTypes.number,
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
      _.isArray(data) &&
      _.isArray(displayItems) &&
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

  /* Ember.Component method */
  didReceiveAttrs ({newAttrs, oldAttrs}) {
    this._super(...arguments)

    const dataChanged = isAttrDifferent(newAttrs, oldAttrs, 'data')
    const selectedChanged = isAttrDifferent(newAttrs, oldAttrs, 'selected')
    const selectedValueChanged = isAttrDifferent(newAttrs, oldAttrs, 'selectedValue')

    // If frost-select instance is being reused by consumer but context is cleared make
    // make sure to actually clear input (noticed when used in conjunction with dialog
    // compoonents that don't destroy DOM when closed and re-opened)
    if ('selectedValue' in newAttrs && newAttrs.selectedValue.value === undefined) {
      this.selectOptionByValue(null)
      return
    }

    if (selectedValueChanged || (dataChanged && _.get(newAttrs, 'selectedValue.value'))) {
      this.selectOptionByValue(newAttrs.selectedValue.value)
    } else if (selectedChanged || (dataChanged && _.get(newAttrs, 'selected.value'))) {
      let selected = this.get('selected')

      if (_.isNumber(selected)) {
        selected = [selected]
      } else if (!_.isArray(selected)) {
        selected = []
      }

      this.set('selected', selected)
    }
  },

  // TODO: add jsdoc
  getValues () {
    const state = this.get('reduxStore').getState()
    return [state.baseItems[state.selectedItem].value]
  },

  // TODO: add jsdoc
  keyUp (event) {
    const reduxStore = this.get('reduxStore')
    switch (event.which) {
      // escape key or tab key, close the dropdown
      case keyCodes.esc:
        event.preventDefault()
        reduxStore.dispatch(closeDropDown())
        break
      case keyCodes.tab:
        //reduxStore.dispatch(closeDropDown())
        break
      // enter + spacebar, choose selected
      case keyCodes.enter:
        reduxStore.dispatch(selectHover())
        break

      // up arrow
      case keyCodes.up:
        event.preventDefault()
        reduxStore.dispatch(moveHoverPrev())
        break

      // down arrow, open the dropdown if necessary, select next
      case keyCodes.down:
        event.preventDefault()
        reduxStore.dispatch(moveHoverNext())
        break

      // backspace
      case keyCodes.backspace:
        event.preventDefault()
    }
  },

  /**
   * Notify parent of currently selected values by calling the onChange callback
   * with the values of the currently selected indices
   * @param {Number[]} selected - the selected indices
   */
  notifyOfChange (selected) {
    const onChange = this.get('onChange')
    if (onChange) {
      const values = this.getValues(selected)
      onChange(values)
    }
  },

  /** Handler for click outside of an element
   */
  onOutsideClick () {
    this.get('reduxStore').dispatch(closeDropDown())
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
      // if (newProps.prompt === 'Raekwon') debugger
      this.setProperties(newProps)

      switch (state.lastAction) {
        case 'SELECT_HOVER':
        case 'SELECT_ITEM':
          const values = this.getValues()
          if (this.get('onChange') && _.isFunction(this.get('onChange'))) {
            this.get('onChange')(values)
          }
          break
      }
      if (!wasOpen && newProps.open) {
        this.bindDropdownEvents()
      } else if (wasOpen && !newProps.open) {
        this.unbindDropdownEvents()
      }
      console.log(state)
    })
    const selectedItem = this.get('selected')
    reduxStore.dispatch(resetDropDown({
      placeholder: this.get('placeholder'),
      baseItems: this.get('data'),
      error: this.get('error'),
      selectedItem: _.isArray(selectedItem) ? selectedItem[0] : selectedItem,
      disabled: this.get('disabled')
    }))
  },

  init () {
    this._super(...arguments)
    this.subscribe(this.setUpReduxStore())
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
        onBlur()
      }
      //this.get('reduxStore').dispatch(closeDropDown())
    },

    // TODO: add jsdoc
    onChange (event) {
      const target = event.currentTarget || event.target
      const onInput = this.get('onInput')
      if (_.isFunction(onInput)) {
        onInput(target.value)
      } else {
        this.get('reduxStore').dispatch(updateSearchText(target.value))
      }
    },

    // TODO: add jsdoc
    onClickArrow (event) {
      event.preventDefault()
      const reduxStore = this.get('reduxStore')
      reduxStore.dispatch(clickArrow())
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
