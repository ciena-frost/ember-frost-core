import Ember from 'ember'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-radio-group'

export default Ember.Component.extend(PropTypeMixin, {
  classNames: ['frost-radio-group'],
  layout,

  propTypes: {
    hook: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string,
    inputs: PropTypes.arrayOf(PropTypes.shape({
      disabled: PropTypes.bool,
      label: PropTypes.string,
      value: PropTypes.string
    }))
  },

  getDefaultProps () {
    return {
      id: null,
      value: null
    }
  }
})
