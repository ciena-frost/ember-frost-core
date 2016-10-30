import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-select-li'

export default Component.extend(PropTypeMixin, {
  // == Properties ============================================================

  tagName: 'li',
  layout,

  propTypes: {
    data: PropTypes.object.isRequired,
    hook: PropTypes.string.isRequired,
    onItemOver: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
  },

  // == Events ================================================================

  _onMouseDown: Ember.on('mouseDown', function (e) {
    const data = this.get('data')
    this.get('onSelect')(data.value)
  }),

  _onMouseEnter: Ember.on('mouseEnter', function () {
    const data = this.get('data')
    this.get('onItemOver')(data)
  })
})
