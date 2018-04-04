/**
 * Component definition for frost-select-dropdown component
 */
import Ember from 'ember'
import computed, {readOnly} from 'ember-computed-decorators'
import {task, timeout} from 'ember-concurrency'
import {PropTypes} from 'ember-prop-types'

import '../polyfills/replaceWith'
import layout from '../templates/components/frost-autocomplete-dropdown'
import {keyCodes} from '../utils'
import {trimLongDataInElement} from '../utils/text'
import Component from './frost-component'

const {$, deprecate, get, merge, run} = Ember
const {ENTER, ESCAPE, TAB} = keyCodes

const FPS = 1000 / 60 // Update at 60 frames per second
const WINDOW_SPACE = 20

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================
  classNameBindings: [
    'wrapLabels:frost-autocomplete-wrap-labels'
  ],
  layout,

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
    wrapLabels: PropTypes.bool,
    isLoading: PropTypes.bool,

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
      filterType: 'startsWith',

      // state
      bottom: 0,
      focusedIndex: 0,
      left: 0,
      maxHeight: 0,
      top: 0,
      width: 0
    }
  },

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
    ].join(';')

    return Ember.String.htmlSafe(style)
  },

  @readOnly
  @computed('focusedIndex', 'items', 'selectedItems')
  /**
   * Get render items
   * @param {Number} focusedIndex - index of focused item
   * @param {Object[]} items - items to render in select dropdown
   * @param {Object[]} selectedItems - items that are currently selected
   * @returns {Object[]} render items
   */
  renderItems (focusedIndex, items, selectedItems) {
    if (!items) {
      return [{}]
    }

    return items.map((item, index) => {
      const classNames = ['frost-autocomplete-list-item']
      const value = get(item, 'value')
      const isSelected = selectedItems.find((item) => item.value === value) !== undefined

      if (isSelected) {
        classNames.push('frost-autocomplete-list-item-selected')
      }

      if (index === focusedIndex) {
        classNames.push('frost-autocomplete-list-item-focused')
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
          run(() => {
            if (this.isDestroyed || this.isDestroying) return
            const item = this.get(`items.${index}`)
            this.set('focusedIndex', index)
            this.send('selectItem', item)
          })
        })
        .mouseenter(() => {
          run(() => {
            if (this.isDestroyed || this.isDestroying) return
            this.set('focusedIndex', index)
          })
        })
    })
  },

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

  _getRegexPattern (filter) {
    if (this.filterType === 'startsWith') {
      // 'b' in bruce banner would only affect the 'b' in bruce
      return new RegExp('^[ \n\r]*' + filter.replace(/[.*+?^${}()|[\]\\]/, '\\$&'), 'i')
    }
    // 'r' in bruce banner would affect both the 'r' in bruce as well as in banner
    return new RegExp(filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
  },

  /* eslint-disable complexity */
  _handleArrowKey (upArrow) {
    let focusedIndex = this.get('focusedIndex')

    const items = this.get('items')
    const newFocusedIndex = (
      upArrow ? Math.max(0, focusedIndex - 1) : Math.min(items.length - 1, focusedIndex + 1)
    )

    if (newFocusedIndex !== undefined && newFocusedIndex !== focusedIndex) {
      const listItems = document.querySelectorAll('.frost-autocomplete-list-item')
      const newFocusedListItem = listItems[newFocusedIndex]

      this.set('focusedIndex', newFocusedIndex)

      if (newFocusedIndex === 0) {
        document.getElementById('frost-autocomplete-list').scrollTop = 0
      } else if (newFocusedListItem.scrollIntoViewIfNeeded) {
        newFocusedListItem.scrollIntoViewIfNeeded(false)
      } else {
        newFocusedListItem.scrollIntoView(upArrow)
      }
    }
  },
  /* eslint-enable complexity */

  _handleEnterKey () {
    const items = this.get('items') || []
    const focusedIndex = this.get('focusedIndex')
    this.send('selectItem', items[focusedIndex])
  },

  /**
   * Get necessary property values for positioning dropdown above select
   * @param {Number} top - top position of select
   * @returns {Object} property values
   */
  _positionAboveInput (top) {
    const bottom = $(window).height() - top + $(document).scrollTop() - 1

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
    top = top + height - $(document).scrollTop() - 1

    if (top === this.get('top')) {
      return {}
    }

    return {
      bottom: 'auto',
      maxHeight: $(window).height() - top - WINDOW_SPACE,
      top
    }
  },

  /**
   * Unbind event listeners to items in dropdown
   * @param {HTMLElement} dropdownListElement - dropdown list element (ul)
   */
  _removeListItemEventListeners (dropdownListElement) {
    const listItemElements = dropdownListElement.querySelectorAll('li')

    Array.from(listItemElements).forEach((li, index) => {
      $(li)
        .off('mousedown')
        .off('mouseenter')
    })
  },

  /* eslint-disable complexity */
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
    const dropdownListElement = document.getElementById('frost-autocomplete-list')
    const clonedDropdownListElement = dropdownListElement.cloneNode(true)
    const clonedTextElements = clonedDropdownListElement.querySelectorAll('.frost-autocomplete-list-item-text')
    const textElements = dropdownListElement.querySelectorAll('.frost-autocomplete-list-item-text')
    const scrollTop = dropdownListElement.scrollTop
    const wrapLabels = this.get('wrapLabels')
    const updateText = (texElements, clonedTextElements) => {
      Array.from(texElements).forEach((textElement, index) => {
        if (!wrapLabels) {
          const clonedTextElement = clonedTextElements[index]
          const updatedData = trimLongDataInElement(clonedTextElement)

          if (updatedData) {
            textElement.textContent = updatedData.text
            textElement.setAttribute('title', updatedData.tooltip)
          }
        }

        if (filter) {
          const pattern = this._getRegexPattern(filter)
          const textWithMatch = textElement.textContent.replace(pattern,
            "<span class='frost-autocomplete-list-item-text-highlight'>$&</span>")

          // If rendered text has changed, update it
          if (textElement.innerHTML !== textWithMatch) {
            textElement.innerHTML = textWithMatch
          }
        }
      })
    }

    this._removeListItemEventListeners(dropdownListElement)

    dropdownListElement.replaceWith(clonedDropdownListElement)

    updateText(textElements, clonedTextElements)

    clonedDropdownListElement.replaceWith(dropdownListElement)

    this._addListItemEventListeners(dropdownListElement)

    // Make sure we scroll back to where the user was
    document.getElementById('frost-autocomplete-list').scrollTop = scrollTop
  },

  // == Tasks =================================================================

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

  didReceiveAttrs () {
    const $element = this.get('$element')
    let props = {}

    if ($element) {
      props = merge(props, this._updatePosition($element))
    }

    const receivedHook = this.get('receivedHook')

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
    $('.frost-autocomplete-dropdown .frost-text-input').focus() // Focus on filter

    this._updateHandler = () => {
      run(() => {
        if (this.isDestroyed || this.isDestroying) return
        this._lastInteraction = Date.now()

        if (!this._isUpdating) {
          this.get('updateTask').perform()
        }
      })
    }

    /* eslint-disable complexity */
    this._keyDownHandler = (e) => {
      run(() => {
        if (this.isDestroyed || this.isDestroying) return

        switch (e.keyCode) {
          case ENTER:
            this._handleEnterKey()
            return

          case ESCAPE:
            this.get('onClose')()
            return

          case TAB:
            this.get('onClose')()
        }
      })
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
    const dropdownListElement = document.getElementById('frost-autocomplete-list')
    this._removeListItemEventListeners(dropdownListElement)
    $(window).off('resize', this._updateHandler)
    $(document).off('scroll', this._updateHandler)
    $(document).off('keydown', this._keyDownHandler)
  },
  // == Actions ===============================================================

  actions: {
    mouseDown (e) {
      // This keeps the overlay from swallowing clicks on the clear button
      e.preventDefault()
    },

    selectItem (item) {
      this.get('onSelect')(item)
    }
  }
})
