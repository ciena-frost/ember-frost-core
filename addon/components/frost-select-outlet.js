import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-select-outlet'

export default Component.extend(PropTypeMixin, {
  layout,
  tagName: '',

  propTypes: {
    name: PropTypes.string
  },

  getDefaultProps () {
    return {
      name: 'frost-select'
    }
  }
})
