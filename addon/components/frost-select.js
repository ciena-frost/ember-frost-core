import _ from 'lodash'
import Ember from 'ember'
import computed, {readOnly} from 'ember-computed-decorators'
import layout from '../templates/components/frost-select'

// TODO: Add typedefs for items

// TODO: add jsdoc
function isAttrDifferent (newAttrs, oldAttrs, attributeName) {
  let oldValue = _.get(oldAttrs, attributeName + '.value')
  let newValue = _.get(newAttrs, attributeName + '.value')

  if (newValue !== undefined && !_.isEqual(oldValue, newValue)) {
    return true
  }
  return false
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

const TAB_KEY = 9
const ESC_KEY = 27
const ENTER_KEY = 13
const UP_KEY = 38
const DOWN_KEY = 40
const BACKSPACE_KEY = 8

export default Ember.Component.extend({

  // ==========================================================================
  // Dependencies
  // ==========================================================================

  // ==========================================================================
  // Properties
  // ==========================================================================

  attributeBindings: ['tabIndex'],
  classNames: ['frost-select'],
  classNameBindings: ['focus', 'shouldOpen:open', 'disabled', 'hasError:error'],
  disabled: false,
  error: false,
  hovered: -1,
  filter: undefined,
  layout,
  maxListHeight: 400,
  tabIndex: -1,
  width: 200,

  // ==========================================================================
  // Computed Properties
  // ==========================================================================

  @readOnly

  @computed('maxListHeight')
  containerStyle (maxListHeight) {
    return Ember.String.htmlSafe(`max-height: ${maxListHeight}px`)
  },

  @readOnly
  @computed('items', 'selected', 'hovered', 'filter')
  /**
   * Get the display items
   * @param {Object[]} items - the possible items
   * @param {Number[]} selected - the array of selected indices
   * @param {Number} hovered - index currently being hovered over (or -1)
   * @param {String} filter - search filter
   * @returns {Object[]} the display items
   */
  displayItems (items, selected, hovered, filter) {
    const result = []
    const valid = this.getValid(filter)

    valid.forEach((validItem, index, list) => {
      let className = ''
      if (selected.indexOf(validItem.index) !== -1) {
        className += ' selected'
        validItem.selected = true
      }

      if (index === hovered || list.length === 1) {
        className += ' hover'
      }

      validItem.className = className
      result.push(validItem)
    })

    return result
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
  @computed('data', 'displayItems')
  /**
   * Flag for if the user has typed something that doesn't match any options
   * @param {Object[]} data - all the possible items
   * @param {Object[]} displayItems - the current items being displayed
   * @returns {Boolean} true if in error state
   */
  invalidFilter (data, displayItems) {
    return _.isArray(data) && (data.length > 0) && _.isArray(displayItems) && (displayItems.length === 0)
  },

  @readOnly
  @computed('data')
  /**
   * Create items from passed-in data
   * @param {Object[]} data - the possible value data passed in
   * @returns {Object[]} the items
   */
  items (data) {
    return data.map((item, index) => {
      return {
        label: item.label,
        value: item.value,
        index,
        classNames: ''
      }
    })
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

  /* Ember.Component method */
  init () {
    this._super(...arguments)

    if (this.get('selected') === undefined) {
      this.set('selected', [])
    }
  },

  /** obvious */
  bindDropdownEvents () {
    const _handleOutsideClick = handleOutsideClick.bind(this)
    Ember.$(document).on('click', _handleOutsideClick)
    this.set('handleOutsideClick', _handleOutsideClick)
  },

  /* Ember.Component method */
  didReceiveAttrs (attrs) {
    this._super(...arguments)
    if (isAttrDifferent(attrs.newAttrs, attrs.oldAttrs, 'selectedValue')) {
      this.selectOptionByValue(attrs.newAttrs.selectedValue.value)
    } else if (isAttrDifferent(attrs.newAttrs, attrs.oldAttrs, 'selected')) {
      let selected = this.get('selected')

      selected = selected && (_.isArray(selected) || _.isNumber(selected)) ? [].concat(selected) : []
      this.set('selected', selected)
    }
  },

  // TODO: add jsdoc
  chooseHovered () {
    let displayItem = this.get('displayItems')[this.get('hovered')]
    this.select(displayItem.index)
  },

  // TODO: add jsdoc
  click (event) {
    // event.preventDefault()
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

  // TODO: add jsdoc
  getValid (filter) {
    let valid = []
    this.get('items').forEach((item, index, list) => {
      if (!filter || this.getLabel(item).toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        valid.push({
          index,
          value: item.value,
          label: this.getLabel(item)
        })
      }
    })
    return valid
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
    if (event.which === TAB_KEY) {
      if (this.get('open')) {
        this.closeList()
      }
    }
  },

  // TODO: add jsdoc
  keyUp (event) {
    switch (event.which) {

      // escape key or tab key, close the dropdown
      case ESC_KEY:
        event.stopPropagation()
        if (this.get('open')) {
          this.toggle(event)
        }
        break

      // enter + spacebar, choose selected
      case ENTER_KEY:
        this.chooseHovered()
        break

      // up arrow
      case UP_KEY:
        event.preventDefault()
        this.hoverPrev()
        break

      // down arrow, open the dropdown if necessary, select next
      case DOWN_KEY:
        event.preventDefault()
        if (!this.get('open')) {
          this.openList()
        }
        this.hoverNext()
        break

      // backspace
      case BACKSPACE_KEY:
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
    let valid = this.getValid(term)
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
    const _handleOutsideClick = this.get('handleOutsideClick')
    Ember.$(document).off('click', _handleOutsideClick)
  },

  /** Ember.willDestroyElement method */
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
