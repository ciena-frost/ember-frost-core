import Ember from 'ember'
const {$, Component, get, run} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {task, timeout} from 'ember-concurrency'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-select-dropdown'

const BORDER_HEIGHT = 1
const ARROW_HEIGHT = 10
const ARROW_WIDTH = 25
const FPS = 1000 / 60 // Update at 60 frames per second
const WINDOW_SPACE = 20

export default Component.extend(PropTypeMixin, {
  layout,
  tagName: '',

  PropTypes: {
    $element: PropTypes.object.isRequired,
    bottom: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    left: PropTypes.number,
    maxHeight: PropTypes.number,
    onCheck: PropTypes.func,
    onClear: PropTypes.func,
    onItemOver: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    receivedHook: PropTypes.string.isRequired,
    selectedItems: PropTypes.arrayOf(PropTypes.number),
    top: PropTypes.number,
    width: PropTypes.number
  },

  getDefaultProps () {
    return {
      bottom: 0,
      left: 0,
      maxHeight: 0,
      top: 0,
      width: 0
    }
  },

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

    $(window).on('resize', this._updateHandler)
    $(document).on('scroll', this._updateHandler)
  },

  willDestroyElement () {
    $(window).off('resize', this._updateHandler)
    $(document).off('scroll', this._updateHandler)
  }
})
