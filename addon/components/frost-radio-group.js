import Ember from 'ember'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-radio-group'

export default Ember.Component.extend(PropTypeMixin, {
  classNames: ['frost-radio-group'],
  layout,

  propTypes: {
    hook: PropTypes.string
  },

  getDefaultProps () {
    return {}
  }
})
