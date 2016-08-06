import Ember from 'ember'
import layout from '../templates/components/frost-select-li'
import FrostEvents from '../mixins/frost-events'
import _ from 'lodash'

export default Ember.Component.extend(FrostEvents, {
  tagName: 'li',
  layout,
  click (event) {
    event.stopPropagation()
    const data = this.get('data')
    const onSelect = this.get('onSelect')
    if (_.isFunction(onSelect)) {
      onSelect(data)
    }
  },
  mouseEnter () {
    const data = this.get('data')
    const onItemOver = this.get('onItemOver')
    if (_.isFunction(onItemOver)) {
      onItemOver(data)
    }
  }
})
