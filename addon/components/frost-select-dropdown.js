import Ember from 'ember'
const {$, Component, get} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-select-dropdown'

const BORDER_HEIGHT = 1
const UP_ARROW_HEIGHT = 10

export default Component.extend(PropTypeMixin, {
  layout,
  tagName: '',

  PropTypes: {
    element: PropTypes.object.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    left: PropTypes.number,
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
      left: 0,
      top: 0,
      width: 0
    }
  },

  @readOnly
  @computed('bottom', 'left', 'top', 'width')
  listStyle (bottom, left, top, width) {
    if (bottom !== 'auto') {
      bottom = `${bottom}px`
    }

    if (top !== 'auto') {
      top = `${top}px`
    }

    const style = [
      `bottom:${bottom}`,
      `left:${left}px`,
      `top:${top}`,
      `width:${width}px`
    ]
      .join(';')

    return Ember.String.htmlSafe(style)
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
    const bottom = $(window).height() - top + $(document).scrollTop()

    if (bottom === this.get('bottom')) {
      return {}
    }

    return {
      bottom,
      top: 'auto'
    }
  },

  _positionBelowInput (height, top) {
    // Make sure dropdown is rendered below input and we leave space for arrow
    // that connects dropdown to input
    top = top + height + UP_ARROW_HEIGHT + BORDER_HEIGHT - $(document).scrollTop()

    if (top === this.get('top')) {
      return {}
    }

    return {
      bottom: 'auto',
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

    if (Object.keys(props).length !== 0) {
      this.setProperties(props)
    }
  },

  didReceiveAttrs (attrs) {
    const $element = get(attrs, 'newAttrs.element.value')

    if ($element) {
      this._updatePosition($element)
    }
  },

  didInsertElement () {
    this._updateHandler = () => {
      const $element = get(this.attrs, 'element.value')

      if ($element) {
        this._updatePosition($element)
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
