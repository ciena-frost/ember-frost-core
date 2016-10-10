import Ember from 'ember'
const {Component} = Ember
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
  @computed('left', 'top', 'width')
  listStyle (left, top, width) {
    const style = [
      `left:${left}px`,
      `top:${top}px`,
      `width:${width}px`
    ]
      .join(';')

    return Ember.String.htmlSafe(style)
  },

  didReceiveAttrs () {
    const element = this.get('element').first()
    const offset = element.offset()
    const props = {}
    const left = offset.left
    const top = offset.top + element.height() + UP_ARROW_HEIGHT + BORDER_HEIGHT
    const width = element.width()

    if (left !== this.get('left')) {
      props.left = left
    }

    if (top !== this.get('top')) {
      props.top = top
    }

    if (width !== this.get('width')) {
      props.width = width
    }

    if (Object.keys(props).length !== 0) {
      this.setProperties(props)
    }
  }
})
