import Ember from 'ember'
const {$, Component, get} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {task, timeout} from 'ember-concurrency'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-select-dropdown'
import keyCodes from '../utils/keycodes'
const {DOWN_ARROW, ENTER, ESCAPE, UP_ARROW} = keyCodes

const BORDER_HEIGHT = 1
const ARROW_HEIGHT = 10
const ARROW_WIDTH = 25
const FPS = 1000 / 60 // Update at 60 frames per second
const WINDOW_SPACE = 20

export default Component.extend(PropTypeMixin, {
  // == Properties ============================================================

  layout,
  tagName: '',

  propTypes: {
    // Public
    $element: PropTypes.object.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    receivedHook: PropTypes.string.isRequired,
    selectedItems: PropTypes.arrayOf(PropTypes.object),

    // Private
    bottom: PropTypes.number,
    focusedIndex: PropTypes.number,
    left: PropTypes.number,
    maxHeight: PropTypes.number,
    onCheck: PropTypes.func,
    top: PropTypes.number,
    width: PropTypes.number
  },

  getDefaultProps () {
    return {
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
  arrowStyle (bottom, left, top, width) {
    const style = [
      `left:${left + (width - ARROW_WIDTH) / 2}px`
    ]

    if (bottom === 'auto') {
      style.push(`top:${top - ARROW_HEIGHT + BORDER_HEIGHT}px`)
    } else {
      style.push(`bottom:${bottom - ARROW_HEIGHT - BORDER_HEIGHT}px`)
    }

    return Ember.String.htmlSafe(style.join(';'))
  },

  @readOnly
  @computed('focusedIndex', 'items')
  renderItems (focusedIndex, items) {
    if (!items) {
      return []
    }

    return items.map((item, index) => {
      const classNames = ['frost-select-list-item']

      if (index === focusedIndex) {
        classNames.push('frost-select-list-item-focused')
      }

      return {
        className: classNames.join(' '),
        label: get(item, 'label'),
        value: get(item, 'value')
      }
    })
  },

  // == Functions =============================================================

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

  _handleArrowKey (upArrow) {
    const focusedIndex = this.get('focusedIndex')
    const items = this.get('items')
    const newFocusedIndex = (
      upArrow ? Math.max(0, focusedIndex - 1) : Math.min(items.length - 1, focusedIndex + 1)
    )

    if (newFocusedIndex !== undefined && newFocusedIndex !== focusedIndex) {
      this.set('focusedIndex', newFocusedIndex)
    }
  },

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

  // == Events ================================================================

  didReceiveAttrs (attrs) {
    const $element = get(attrs, 'newAttrs.$element.value')

    if ($element) {
      this._updatePosition($element)
    }
  },

  didInsertElement () {
    this._updateHandler = () => {
      this._lastInteraction = Date.now()

      if (!this._isUpdating) {
        this.get('updateTask').perform()
      }
    }

    this._keyDownHandler = (e) => {
      e.preventDefault() // Keep arrow keys from scrolling document

      if ([DOWN_ARROW, UP_ARROW].indexOf(e.keyCode) !== -1) {
        this._handleArrowKey(e.keyCode === UP_ARROW)
      }

      switch (e.keyCode) {
        case ENTER:
          const items = this.get('items') || []
          const focusedIndex = this.get('focusedIndex')
          this.get('onSelect')(items[focusedIndex].value)
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

  willDestroyElement () {
    $(window).off('resize', this._updateHandler)
    $(document).off('scroll', this._updateHandler)
    $(document).off('keydown', this._keyDownHandler)
  },

  // == Actions ===============================================================

  actions: {
    clear () {
      this.get('onSelect')(null)
    },

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
    }
  }
})
