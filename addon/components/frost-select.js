import _ from 'lodash'
import Ember from 'ember'
const {A, Component} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-select'

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
  @computed('data')
  /**
   * Create items from passed-in data
   * @param {Array<Item>} data - the possible value data passed in
   * @returns {Array<ListItem>} the items
   */
  items (data) {
    return data.map((item, index) => {
      return {
        className: '',
        index,
        label: item.label,
        value: item.value
      }
    })
  },

  @readOnly
  @computed('items', 'selected', 'hovered', 'filter')
  /**
   * Get items to display in UI
   * @param {Array<ListItem>} items - the possible items
   * @param {Array<Number>} selected - the array of selected indices
   * @param {Number} hovered - index currently being hovered over (or -1)
   * @param {String} filter - search filter
   * @returns {Array<ListItem>} items to display
   */
  displayItems (items, selected, hovered, filter) {
    return this.filterItems(items, filter)
      .map((item, index, list) => {
        const classNames = []
        const itemIsHovered = index === hovered || list.length === 1
        const itemIsSelected = selected.indexOf(item.index) !== -1

        if (itemIsSelected) {
          classNames.push('selected')
          item.selected = true
        }

        if (itemIsHovered) {
          classNames.push('hover')
        }

        item.className = classNames.join(' ')

        return item
      })
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
  @computed('selected')
  /**
   * Build the prompt based on the selected item(s)
   * @param {Number[]} selected - the selected indices
   * @returns {String} the prompt
   */
  prompt (selected) {
    const data = this.get('data')
    const filter = this.get('filter')
    let prompt = ''

    if (filter !== undefined) {
      prompt = filter
    } else {
      let selectedItem = data[selected[0]]
      if (selectedItem) {
        prompt = selectedItem.label
      }
    }
    return prompt
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
  chooseHovered () {
    let displayItem = this.get('displayItems')[this.get('hovered')]
    this.select(displayItem.index)
  },

  // TODO: add jsdoc
  closeList () {
    this.setProperties({open: false, filter: undefined, hovered: -1})
    this.inputElement().val(this.get('prompt'))
    this.unbindDropdownEvents()
  },

  // TODO: add jsdoc
  getLabel (item) {
    return item.label
  },

  /**
   * Get list of items with label matching filter
   * @param {Array<ListItem>} items - items to filter
   * @param {String} filter - filter to match items label against
   * @returns {Array<ListItem>} filtered items
   */
  filterItems (items, filter) {
    const lowerCaseFilter = (filter || '').toLowerCase()

    return items
      .map((item, index, list) => {
        const lowerCaseLabel = (this.getLabel(item) || '').toLowerCase()
        const labelMatchesFilter = lowerCaseLabel.indexOf(lowerCaseFilter) !== -1

        if (filter && !labelMatchesFilter) {
          return null
        }

        return {
          index,
          label: this.getLabel(item),
          value: item.value
        }
      })
      .filter((item) => item !== null)
  },

  // TODO: add jsdoc
  getValues (selected = this.get('selected')) {
    return selected.map((selectedIndex) => {
      return this.get('data')[selectedIndex].value
    })
  },

  // TODO: add jsdoc
  hoverNext () {
    let hovered = this.get('hovered')
    if (hovered === this.get('displayItems').length - 1) {
      hovered = 0
    } else {
      hovered += 1
    }
    this.set('hovered', hovered)
  },

  // TODO: add jsdoc
  hoverPrev () {
    let hovered = this.get('hovered')
    if (hovered === 0) {
      hovered = this.get('displayItems').length - 1
    } else {
      hovered -= 1
    }
    this.set('hovered', hovered)
  },

  // TODO: add jsdoc
  inputElement () {
    return this.$('input')
  },

  /** Key down event handler
   * @param {JQuery.Event} event - event object
   */
  keyDown (event) {
    // if tab is pushed - close list
    if (event.which === keyCodes.tab) {
      if (this.get('open')) {
        this.closeList()
      }
    }
  },

  // TODO: add jsdoc
  keyUp (event) {
    switch (event.which) {
      // escape key or tab key, close the dropdown
      case keyCodes.esc:
        event.stopPropagation()
        if (this.get('open')) {
          this.toggle(event)
        }
        break

      // enter + spacebar, choose selected
      case keyCodes.enter:
        this.chooseHovered()
        break

      // up arrow
      case keyCodes.up:
        event.preventDefault()
        this.hoverPrev()
        break

      // down arrow, open the dropdown if necessary, select next
      case keyCodes.down:
        event.preventDefault()
        if (!this.get('open')) {
          this.openList()
        }
        this.hoverNext()
        break

      // backspace
      case keyCodes.backspace:
        event.preventDefault()
        if (!this.get('open')) {
          this.openList()
        }
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

  /* obvious */
  openList () {
    this.set('open', true)
    this.bindDropdownEvents()
  },

  /** Handler for click outside of an element
   */
  onOutsideClick () {
    this.closeList()
  },

  // TODO: add jsdoc
  search (term) {
    const items = this.get('items')
    let valid = this.filterItems(items, term)
    let newProps = {filter: term, hovered: -1}
    this.setProperties(newProps)
    if (valid.length === 1) {
      this.hoverNext()
    }
  },

  // TODO: add jsdoc
  select (index) {
    let selected = index === null ? [] : [index]
    let values = this.getValues(selected)
    this.set('selected', selected)

    if (this.get('open')) {
      this.closeList()
    }

    if (this.get('onChange') && _.isFunction(this.get('onChange'))) {
      this.get('onChange')(values)
    }
  },

  // TODO: add jsdoc
  selectOptionByValue (selectedValue) {
    if (selectedValue === null) {
      this.select(null)
      return
    }

    // Find index
    let valueIndex = _.findIndex(this.get('items'), (item) => _.isEqual(item.value, selectedValue))

    if (valueIndex >= 0) { // Make sure we actually found the value
      this.select(valueIndex)
    }
  },

  // TODO: add jsdoc
  toggle (event) {
    event.preventDefault()
    if (this.get('shouldDisableDropDown')) {
      return
    }

    if (this.get('open')) {
      this.closeList()
      return
    }
    this.openList()
  },

  /** obvious */
  unbindDropdownEvents () {
    Ember.$(document).off('click', this._handleOutsideClick)
  },

  /** Ember.Component method */
  willDestroyElement () {
    this.unbindDropdownEvents()
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
    },

    // TODO: add jsdoc
    onChange (event) {
      const target = event.currentTarget || event.target
      const onInput = this.get('onInput')
      if (_.isFunction(onInput)) {
        onInput(target.value)
      } else {
        this.search(target.value)
      }
    },

    // TODO: add jsdoc
    onClickArrow (event) {
      this.toggle(event)
    },

    // TODO: add jsdoc
    onFocus () {
      this.openList()
      this.set('focus', true)
      // If an onFocus event handler is defined, call it
      if (this.attrs.onFocus) {
        this.attrs.onFocus()
      }
      return false
    },

    // TODO: add jsdoc
    onItemOver (event) {
      event.stopImmediatePropagation()
      let target = event.target
      let index = parseInt(target.getAttribute('data-index'), 10)
      this.set('hovered', index)
      return false
    },

    // TODO: add jsdoc
    onSelect (event) {
      event.stopPropagation()
      let target = event.currentTarget || event.target
      let index = parseInt(target.getAttribute('data-index'), 10)
      this.select(index)
    }
  }
})
