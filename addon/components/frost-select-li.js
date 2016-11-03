import Ember from 'ember'
const {Component} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-select-li'

const regexEscapeChars = '-[]/{}()*+?.^$|'.split('')

export default Component.extend(PropTypeMixin, {
  // == Properties ============================================================

  tagName: 'li',
  layout,

  propTypes: {
    data: PropTypes.object.isRequired,
    filter: PropTypes.string,
    hook: PropTypes.string.isRequired,
    multiselect: PropTypes.bool,
    onItemOver: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('data', 'filter')
  label (data, filter) {
    if (filter) {
      // Make sure special chars are escaped in filter so we can use it as a
      // regular expression pattern
      filter = filter.replace(`[${regexEscapeChars.join('\\')}]`, 'g')

      const pattern = new RegExp(filter, 'gi')
      const label = data.label.replace(pattern, '<u>$&</u>')

      return Ember.String.htmlSafe(label)
    }

    return data && data.label || ''
  },

  // == Events ================================================================

  _onMouseDown: Ember.on('mouseDown', function (e) {
    e.preventDefault() // Prevent dropdown overlay from receiving click
    const data = this.get('data')
    this.get('onSelect')(data.value)
  }),

  _onMouseEnter: Ember.on('mouseEnter', function () {
    const data = this.get('data')
    this.get('onItemOver')(data)
  })
})
