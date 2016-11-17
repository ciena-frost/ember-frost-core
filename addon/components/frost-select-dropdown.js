/**
 * Component definition for frost-select-dropdown component
 */
import Ember from 'ember'
const {$, Component, get} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {task, timeout} from 'ember-concurrency'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-select-dropdown'
import {keyCodes} from '../utils'
const {DOWN_ARROW, ENTER, ESCAPE, UP_ARROW} = keyCodes

const BORDER_HEIGHT = 1
const ARROW_HEIGHT = 12
const ARROW_WIDTH = 25
const FPS = 1000 / 60 // Update at 60 frames per second
const WINDOW_SPACE = 20

export default Component.extend(PropTypeMixin, {
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
    receivedHook: PropTypes.string.isRequired,
    selectedItems: PropTypes.arrayOf(PropTypes.object),

    // state
    bottom: PropTypes.number,
    focusedIndex: PropTypes.number,
    left: PropTypes.number,
    maxHeight: PropTypes.number,
    top: PropTypes.number,
    width: PropTypes.number,

    // keywords
    layout: PropTypes.any,
    tagName: PropTypes.string
  },

  /** @returns {Object} the default property values when not provided by consumer */
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
  // FIXME: jsdoc
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
  // FIXME: jsdoc
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
  // FIXME: jsdoc
  renderItems (focusedIndex, items, selectedItems) {
    if (!items) {
      return []
    }

    return items.map((item, index) => {
      const classNames = ['frost-select-list-item']
      const value = get(item, 'value')
      const isSelected = selectedItems.find((item) => item.value === value) !== undefined

      if (index === focusedIndex) {
        classNames.push('frost-select-list-item-focused')
      }

      if (isSelected) {
        classNames.push('frost-select-list-item-selected')
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
  // FIXME: jsdoc
  showEmptyMessage (items) {
    return !items || items.length === 0
  },

  // == Functions =============================================================

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
    const focusedIndex = this.get('focusedIndex')
    const items = this.get('items')
    const newFocusedIndex = (
      upArrow ? Math.max(0, focusedIndex - 1) : Math.min(items.length - 1, focusedIndex + 1)
    )

    if (newFocusedIndex !== undefined && newFocusedIndex !== focusedIndex) {
      this.set('focusedIndex', newFocusedIndex)

      const $focusedListItem = $('.frost-select-list-item').eq(newFocusedIndex)

      if (newFocusedIndex === 0) {
        $('.frost-select-dropdown')[0].scrollTop = 0
      } else {
        $focusedListItem[0].scrollIntoView(upArrow)
      }
    }
  },

  // FIXME: jsdoc
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

  // FIXME: jsdoc
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

  // FIXME: jsdoc
  _updatePosition ($element) {
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

    if (
      Object.keys(props).length !== 0 &&
      !this.get('isDestroyed') &&
      !this.get('isDestroying')
    ) {
      this.setProperties(props)
    }
  },

  // == Tasks =================================================================

  // FIXME: jsdoc
  updateTask: task(function * () {
    this._isUpdating = true

    while (Date.now() - this._lastInteraction < 250) {
      const $element = get(this.attrs, '$element.value')

      if ($element) {
        this._updatePosition($element)
      }

      yield timeout(FPS)
    }

    this._isUpdating = false
  }),

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  /* Ember.Component method */
  didReceiveAttrs (attrs) {
    const $element = get(attrs, 'newAttrs.$element.value')

    if ($element) {
      this._updatePosition($element)
    }
  },

  /* Ember.Component method */
  didInsertElement () {
    $('.frost-select-dropdown .frost-text-input').focus() // Focus on filter

    this._updateHandler = () => {
      this._lastInteraction = Date.now()

      if (!this._isUpdating) {
        this.get('updateTask').perform()
      }
    }

    this._keyDownHandler = (e) => {
      if ([DOWN_ARROW, UP_ARROW].indexOf(e.keyCode) !== -1) {
        e.preventDefault() // Keep arrow keys from scrolling document
        this._handleArrowKey(e.keyCode === UP_ARROW)
      }

      switch (e.keyCode) {
        case ENTER:
          const items = this.get('items') || []
          const focusedIndex = this.get('focusedIndex')
          this.send('selectItem', items[focusedIndex].value)
          return

        case ESCAPE:
          this.get('onClose')()
          return
      }
    }

    $(window).on('resize', this._updateHandler)
    $(document).on('scroll', this._updateHandler)
    $(document).on('keydown', this._keyDownHandler)
  },

  /* Ember.Component method */
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
    focusOnItem (item) {
      const value = get(item, 'value')
      const items = this.get('items')

      if (!items) {
        return
      }

      for (let i = 0; i < items.length; i++) {
        if (get(items[i], 'value') === value) {
          this.set('focusedIndex', i)
          break
        }
      }
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

      this.get('onSelect')(selectedValue)

      // When multiselect the checkbox for selected item gets focus so we need
      // to put focus back on filter text input
      $('.frost-select-dropdown .frost-text-input').focus()
    }
  }
})
