/**
 * Component definition for frost-select-dropdown component
 */
import Ember from 'ember'
const {$, deprecate, get, merge} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {task, timeout} from 'ember-concurrency'
import {PropTypes} from 'ember-prop-types'

import '../polyfills/replaceWith'
import layout from '../templates/components/frost-select-dropdown'
import {keyCodes} from '../utils'
import {trimLongDataInElement} from '../utils/text'
import Component from './frost-component'

const {DOWN_ARROW, ENTER, ESCAPE, UP_ARROW} = keyCodes

const BORDER_HEIGHT = 1
const ARROW_HEIGHT = 12
const ARROW_WIDTH = 25
const FPS = 1000 / 60 // Update at 60 frames per second
const WINDOW_SPACE = 20

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,
  tagName: '',

  // == PropTypes =============================================================

  /**
   * Properties for this component. Options are expected to be (potentially)
   * passed in to the component. State properties are *not* expected to be
   * passed in/overwritten.
   */
  propTypes: {
    // options
    $element: PropTypes.object.isRequired,
    filter: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    multiselect: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onFilterInput: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    receivedHook: PropTypes.string,
    selectedItems: PropTypes.arrayOf(PropTypes.object),

    // state
    bottom: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    focusedIndex: PropTypes.number,
    left: PropTypes.number,
    maxHeight: PropTypes.number,
    top: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    width: PropTypes.number
  },

  getDefaultProps () {
    return {
      // options

      // state
      bottom: 0,
      focusedIndex: 0,
      left: 0,
      maxHeight: 0,
      top: 0,
      width: 0
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('bottom', 'left', 'maxHeight', 'top', 'width')
  /**
   * Get inline style to properly position dropdown relative to select input
   * @param {Number} bottom - bottom position of dropdown
   * @param {Number} left - left position of dropdown
   * @param {Number} maxHeight - max height of dropdown
   * @param {Number} top - top position of dropdown
   * @param {Number} width - width of dropdown
   * @returns {Handlebars.SafeString} position style/CSS for dropdown
   */
  listStyle (bottom, left, maxHeight, top, width) {
    if (bottom !== 'auto') {
      bottom = `${bottom}px`
    }

    if (top !== 'auto') {
      top = `${top}px`
    }

    const style = [
      `bottom:${bottom}`,
      `left:${left}px`,
      `max-height:${maxHeight}px`,
      `top:${top}`,
      `width:${width}px`
    ]
      .join(';')

    return Ember.String.htmlSafe(style)
  },

  @readOnly
  @computed('bottom', 'left', 'top', 'width')
  /**
   * Get inline style to properly position arrow that connects dropdown to
   * @param {Number} bottom - bottom position of arrow
   * @param {Number} left - left position of arrow
   * @param {Number} top - top position of arrow
   * @param {Number} width - width of arrow
   * @returns {Handlebars.SafeString} position style/CSS for arrow
   */
  arrowStyle (bottom, left, top, width) {
    const style = [
      `left:${left + (width - ARROW_WIDTH) / 2}px`
    ]

    if (bottom === 'auto') {
      style.push(`top:${top - ARROW_HEIGHT + BORDER_HEIGHT}px`)
    } else {
      style.push(`bottom:${bottom - ARROW_HEIGHT + BORDER_HEIGHT}px`)
    }

    return Ember.String.htmlSafe(style.join(';'))
  },

  @readOnly
  @computed('focusedIndex', 'items', 'selectedItems')
  /**
   * Get render items
   * @param {Number} focusedIndex - index of focused item
   * @param {Array<Object>} items - items to render in select dropdown
   * @param {Array<Object>} selectedItems - items that are currently selected
   * @returns {Array<Object>} render items
   */
  renderItems (focusedIndex, items, selectedItems) {
    if (!items) {
      return []
    }

    return items.map((item, index) => {
      const classNames = ['frost-select-list-item']
      const value = get(item, 'value')
      const isSelected = selectedItems.find((item) => item.value === value) !== undefined

      if (isSelected) {
        classNames.push('frost-select-list-item-selected')
      }

      if (index === focusedIndex) {
        classNames.push('frost-select-list-item-focused')
      }

      return {
        className: classNames.join(' '),
        label: get(item, 'label'),
        selected: isSelected,
        value: get(item, 'value')
      }
    })
  },

  @readOnly
  @computed('items')
  /**
   * Whether or not to show message for when no items are present
   * @param {Array<Object>} items - items
   * @returns {Boolean} whether or not to show empty message
   */
  showEmptyMessage (items) {
    return !items || items.length === 0
  },

  // == Functions =============================================================

  /**
   * Bind event listeners to items in dropdown
   * @param {HTMLElement} dropdownListElement - dropdown list element (ul)
   */
  _addListItemEventListeners (dropdownListElement) {
    const listItemElements = dropdownListElement.querySelectorAll('li')

    Array.from(listItemElements).forEach((li, index) => {
      $(li)
        .mousedown(() => {
          if (this.isDestroyed || this.isDestroying) return
          const value = this.get(`items.${index}.value`)
          this.set('focusedIndex', index)
          this.send('selectItem', value)
        })
        .mouseenter(() => {
          if (this.isDestroyed || this.isDestroying) return
          this.set('focusedIndex', index)
        })
    })
  },

  // FIXME: jsdoc
  _getElementDimensionsAndPosition ($element) {
    const height = $element.height()
    const offset = $element.offset()
    const top = offset.top

    return {
      center: {
        x: height / 2 + top
      },
      height,
      left: offset.left,
      top,
      width: $element.width()
    }
  },

  // FIXME: jsdoc
  _handleArrowKey (upArrow) {
    let focusedIndex = this.get('focusedIndex')

    const items = this.get('items')
    const newFocusedIndex = (
      upArrow ? Math.max(0, focusedIndex - 1) : Math.min(items.length - 1, focusedIndex + 1)
    )

    if (newFocusedIndex !== undefined && newFocusedIndex !== focusedIndex) {
      const listItems = document.querySelectorAll('.frost-select-list-item')
      const newFocusedListItem = listItems[newFocusedIndex]

      this.set('focusedIndex', newFocusedIndex)

      if (newFocusedIndex === 0) {
        document.getElementById('frost-select-list').scrollTop = 0
      } else if (newFocusedListItem.scrollIntoViewIfNeeded) {
        newFocusedListItem.scrollIntoViewIfNeeded(false)
      } else {
        newFocusedListItem.scrollIntoView(upArrow)
      }
    }
  },

  // FIXME: jsdoc
  _handleEnterKey () {
    const items = this.get('items') || []
    const focusedIndex = this.get('focusedIndex')
    this.send('selectItem', items[focusedIndex].value)
  },

  /**
   * Get necessary property values for positioning dropdown above select
   * @param {Number} top - top position of select
   * @returns {Object} property values
   */
  _positionAboveInput (top) {
    const bottom = $(window).height() - top + $(document).scrollTop() + ARROW_HEIGHT + BORDER_HEIGHT

    if (bottom === this.get('bottom')) {
      return {}
    }

    return {
      bottom,
      maxHeight: $(window).height() - bottom - WINDOW_SPACE,
      top: 'auto'
    }
  },

  /**
   * Get necessary property values for positioning dropdown below select
   * @param {Number} height - height of select
   * @param {Number} top - top position of select
   * @returns {Object} property values
   */
  _positionBelowInput (height, top) {
    // Make sure dropdown is rendered below input and we leave space for arrow
    // that connects dropdown to input
    top = top + height + ARROW_HEIGHT + BORDER_HEIGHT - $(document).scrollTop()

    if (top === this.get('top')) {
      return {}
    }

    return {
      bottom: 'auto',
      maxHeight: $(window).height() - top - WINDOW_SPACE,
      top
    }
  },

  /* eslint-disable complexity */
  // FIXME: jsdoc
  _updatePosition ($element) {
    if (this.isDestroyed || this.isDestroying) return {}

    $element = $element.first()

    const {center, height, left, top, width} = this._getElementDimensionsAndPosition($element)
    const windowCenterX = $(window).height() / 2 + $(document).scrollTop()
    const props = (
      center.x > windowCenterX ? this._positionAboveInput(top) : this._positionBelowInput(height, top)
    )

    if (left !== this.get('left')) {
      props.left = left
    }

    if (width !== this.get('width')) {
      props.width = width
    }

    return props
  },
  /* eslint-enable complexity */

  _updateText () {
    const filter = this.get('filter')
    const dropdownListElement = document.getElementById('frost-select-list')
    const clonedDropdownListElement = dropdownListElement.cloneNode(true)
    const clonedTextElements = clonedDropdownListElement.querySelectorAll('.frost-select-list-item-text')
    const textElements = dropdownListElement.querySelectorAll('.frost-select-list-item-text')
    const scrollTop = dropdownListElement.scrollTop

    dropdownListElement.replaceWith(clonedDropdownListElement)

    Array.from(textElements).forEach((textElement, index) => {
      const clonedTextElement = clonedTextElements[index]
      const updatedData = trimLongDataInElement(clonedTextElement)

      if (updatedData) {
        textElement.textContent = updatedData.text
        textElement.setAttribute('title', updatedData.tooltip)
      }

      if (filter) {
        const pattern = new RegExp(filter, 'gi')
        const textWithMatch = textElement.textContent.replace(pattern, '<u>$&</u>')

        // If rendered text has changed, update it
        if (textElement.innerHTML !== textWithMatch) {
          textElement.innerHTML = textWithMatch
        }
      }
    })

    clonedDropdownListElement.replaceWith(dropdownListElement)

    this._addListItemEventListeners(dropdownListElement)

    // Make sure we scroll back to where the user was
    document.getElementById('frost-select-list').scrollTop = scrollTop
  },

  // == Tasks =================================================================

  // FIXME: jsdoc
  updateTask: task(function * () {
    this._isUpdating = true

    while (Date.now() - this._lastInteraction < 250) {
      const $element = get(this.attrs, '$element.value') || get(this.attrs, '$element')

      if ($element) {
        const props = this._updatePosition($element)
        this.setProperties(props)
      }

      yield timeout(FPS)
    }

    this._isUpdating = false
  }),

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  didReceiveAttrs (attrs) {
    const $element = get(attrs, 'newAttrs.$element.value')
    let props = {}

    if ($element) {
      props = merge(props, this._updatePosition($element))
    }

    const receivedHook = get(attrs, 'newAttrs.receivedHook.value')

    if (receivedHook && receivedHook !== this.get('hook')) {
      deprecate(
        'receivedHook has been deprecated in favor of hook',
        false,
        {
          id: 'receivedHook-deprecated',
          until: '2.0.0'
        }
      )

      props.hook = receivedHook
    }

    if (Object.keys(props).length !== 0) {
      this.setProperties(props)
    }
  },

  didInsertElement () {
    $('.frost-select-dropdown .frost-text-input').focus() // Focus on filter

    this._updateHandler = () => {
      this._lastInteraction = Date.now()

      if (!this._isUpdating) {
        this.get('updateTask').perform()
      }
    }

    /* eslint-disable complexity */
    this._keyDownHandler = (e) => {
      if (this.isDestroyed || this.isDestroying) return

      if ([DOWN_ARROW, UP_ARROW].indexOf(e.keyCode) !== -1) {
        e.preventDefault() // Keep arrow keys from scrolling document
        this._handleArrowKey(e.keyCode === UP_ARROW)
      }

      switch (e.keyCode) {
        case ENTER:
          this._handleEnterKey()
          return

        case ESCAPE:
          this.get('onClose')()
          return
      }
    }
    /* eslint-enable complexity */

    $(window).on('resize', this._updateHandler)
    $(document).on('scroll', this._updateHandler)
    $(document).on('keydown', this._keyDownHandler)
  },

  didRender () {
    this._super(...arguments)
    this._updateText()
  },

  willDestroyElement () {
    $(window).off('resize', this._updateHandler)
    $(document).off('scroll', this._updateHandler)
    $(document).off('keydown', this._keyDownHandler)
  },

  // == Actions ===============================================================

  actions: {
    // FIXME: jsdoc
    clear (e) {
      this.get('onSelect')([])

      // Focus is now on clear all button so we need to put focus back on the
      // filter text input
      $('.frost-select-dropdown .frost-text-input').focus()
    },

    // FIXME: jsdoc
    mouseDown (e) {
      // This keeps the overlay from swallowing clicks on the clear button
      e.preventDefault()
    },

    // FIXME: jsdoc
    selectItem (value) {
      // Single select
      if (!this.get('multiselect')) {
        this.get('onSelect')([value])
        return
      }

      // Multi-select
      const selectedValue = this.get('selectedItems').map((item) => item.value)
      const index = selectedValue.indexOf(value)

      if (index === -1) {
        selectedValue.push(value)
      } else {
        selectedValue.splice(index, 1)
      }

      this.rerender()

      this.get('onSelect')(selectedValue)

      // When multiselect the checkbox for selected item gets focus so we need
      // to put focus back on filter text input
      $('.frost-select-dropdown .frost-text-input').focus()
    }
  }
})
