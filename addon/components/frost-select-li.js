import Ember from 'ember'
const {Component, typeOf} = Ember
import layout from '../templates/components/frost-select-li'
import FrostEvents from '../mixins/frost-events'

export default Component.extend(FrostEvents, {
  tagName: 'li',
  layout,

  // == Events ================================================================

  click (event) {
    event.stopPropagation()
    const data = this.get('data')
    const onSelect = this.get('onSelect')
    if (typeOf(onSelect) === 'function') {
      onSelect(data)
    }
  },
  mouseEnter () {
    const data = this.get('data')
    const onItemOver = this.get('onItemOver')
    if (typeOf(onItemOver) === 'function') {
      onItemOver(data)
    }
  }
})
